import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

const root = process.cwd();
const deployConfigPath = resolve(root, ".wrangler/deploy/config.json");
const pagesOutputDir = resolve(root, "dist/cloudflare-pages");

function fail(message) {
  console.error(`[cloudflare-pages] ${message}`);
  process.exit(1);
}

if (!existsSync(deployConfigPath)) {
  fail("Missing .wrangler/deploy/config.json. Run `vite build` before preparing Pages output.");
}

const deployConfig = JSON.parse(readFileSync(deployConfigPath, "utf8"));
if (!deployConfig.configPath) {
  fail("Cloudflare build output did not include an entry worker config path.");
}

const workerConfigPath = resolve(dirname(deployConfigPath), deployConfig.configPath);
if (!existsSync(workerConfigPath)) {
  fail(`Missing built worker config at ${relative(root, workerConfigPath)}.`);
}

const workerConfig = JSON.parse(readFileSync(workerConfigPath, "utf8"));
const workerBuildDir = dirname(workerConfigPath);
const workerEntry = workerConfig.main ? resolve(workerBuildDir, workerConfig.main) : undefined;
const assetsDir = workerConfig.assets?.directory
  ? resolve(workerBuildDir, workerConfig.assets.directory)
  : undefined;

if (!workerEntry || !existsSync(workerEntry)) {
  fail("Missing built worker entry. The Cloudflare Pages function cannot be created.");
}

if (!assetsDir || !existsSync(assetsDir)) {
  fail("Missing built static assets directory. The Cloudflare Pages output cannot be created.");
}

rmSync(pagesOutputDir, { recursive: true, force: true });
mkdirSync(pagesOutputDir, { recursive: true });
cpSync(assetsDir, pagesOutputDir, { recursive: true });
cpSync(workerBuildDir, pagesOutputDir, { recursive: true });
cpSync(workerEntry, join(pagesOutputDir, "_worker.js"));
rmSync(join(pagesOutputDir, "wrangler.json"), { force: true });

writeFileSync(
  join(pagesOutputDir, "_routes.json"),
  JSON.stringify({ version: 1, include: ["/*"], exclude: [] }, null, 2),
);

console.log(`[cloudflare-pages] Prepared Pages output at ${relative(root, pagesOutputDir)}`);