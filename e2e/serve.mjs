// MODULE: E2E
// ROLE: Zero-dependency static server for out/ (Playwright webServer + `npm start`)
// DEPENDENCIES: node:http, node:fs, node:path
// OWNER: Dylan / Claude

// WHY: mirrors GitHub Pages closely enough for tests (dir → index.html, unknown → 404.html)
// and runs anywhere Node does: Windows, the dev container, and CI.

import fs from "node:fs";
import http from "node:http";
import path from "node:path";

const ROOT = path.resolve("out");
const PORT = Number(process.env.PORT ?? 4173);
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
};

function resolveFile(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const target = path.normalize(path.join(ROOT, decoded));
  if (!target.startsWith(ROOT)) return null; // path traversal
  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
    const index = path.join(target, "index.html");
    return fs.existsSync(index) ? index : null;
  }
  return fs.existsSync(target) ? target : null;
}

http
  .createServer((req, res) => {
    const file = resolveFile(req.url ?? "/");
    const status = file ? 200 : 404;
    const body = file ?? path.join(ROOT, "404.html");
    res.writeHead(status, { "content-type": TYPES[path.extname(body)] ?? "application/octet-stream" });
    fs.createReadStream(body).pipe(res);
  })
  .listen(PORT, () => console.log(`Serving out/ at http://localhost:${PORT}`));
