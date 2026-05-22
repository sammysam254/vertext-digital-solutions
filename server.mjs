// Node server for Render. Serves dist/netlify static files + /api/public/* via shared handler.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, resolve } from "node:path";
import { handleApi } from "./scripts/api-handler.mjs";

const ROOT = resolve(process.cwd(), "dist/netlify");
const PORT = process.env.PORT || 10000;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".xml": "application/xml",
  ".txt": "text/plain",
};

async function readBody(req) {
  return new Promise((res, rej) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => res(Buffer.concat(chunks).toString("utf8")));
    req.on("error", rej);
  });
}

async function serveStatic(pathname) {
  const candidates = [pathname, pathname.endsWith("/") ? pathname + "index.html" : pathname + "/index.html", pathname + ".html"];
  for (const rel of candidates) {
    const filePath = join(ROOT, rel.replace(/^\/+/, ""));
    if (!filePath.startsWith(ROOT)) continue;
    try {
      const s = await stat(filePath);
      if (s.isFile()) {
        const body = await readFile(filePath);
        return { status: 200, headers: { "content-type": MIME[extname(filePath)] || "application/octet-stream" }, body };
      }
    } catch {}
  }
  // SPA fallback
  try {
    const body = await readFile(join(ROOT, "index.html"));
    return { status: 200, headers: { "content-type": "text/html; charset=utf-8" }, body };
  } catch {
    return { status: 404, headers: { "content-type": "text/plain" }, body: "Not found" };
  }
}

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (url.pathname.startsWith("/api/public/")) {
      const headers = {};
      for (const [k, v] of Object.entries(req.headers)) headers[k.toLowerCase()] = Array.isArray(v) ? v.join(",") : v;
      const body = ["POST", "PUT", "DELETE", "PATCH"].includes(req.method) ? await readBody(req) : "";
      const result = await handleApi(req.method, url.pathname, headers, body);
      res.writeHead(result.status, result.headers);
      res.end(result.body);
      return;
    }
    const result = await serveStatic(url.pathname);
    res.writeHead(result.status, result.headers);
    res.end(result.body);
  } catch (e) {
    console.error(e);
    res.writeHead(500); res.end("Server error");
  }
}).listen(PORT, () => console.log(`Vertext server listening on :${PORT}`));
