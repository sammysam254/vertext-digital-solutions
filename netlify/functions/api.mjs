// Netlify Function entry — handles /api/public/* via netlify.toml redirect.
import { handleApi } from "../../scripts/api-handler.mjs";

export default async (request) => {
  const url = new URL(request.url);
  const headers = {};
  request.headers.forEach((v, k) => { headers[k.toLowerCase()] = v; });
  const body = ["POST", "PUT", "DELETE", "PATCH"].includes(request.method) ? await request.text() : "";
  const result = await handleApi(request.method, url.pathname, headers, body);
  return new Response(result.body, { status: result.status, headers: result.headers });
};

export const config = { path: "/api/public/*" };
