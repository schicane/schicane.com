import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
const root = resolve("out");
const types = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".svg": "image/svg+xml",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".json": "application/json",
  ".png": "image/png",
  ".woff2": "font/woff2",
};
http
  .createServer(async (req, res) => {
    try {
      const url = new URL(req.url, "http://localhost");
      let file = resolve(root, "." + decodeURIComponent(url.pathname));
      if (file !== root && !file.startsWith(root + sep)) {
        res.writeHead(403).end();
        return;
      }
      let info;
      try {
        info = await stat(file);
      } catch {}
      if (info?.isDirectory()) {
        if (!url.pathname.endsWith("/")) {
          res
            .writeHead(308, { Location: url.pathname + "/" + url.search })
            .end();
          return;
        }
        file = resolve(file, "index.html");
      }
      let data;
      try {
        data = await readFile(file);
      } catch {
        res.statusCode = 404;
        file = resolve(root, "404.html");
        data = await readFile(file);
      }
      res.setHeader(
        "Content-Type",
        types[extname(file)] ?? "application/octet-stream",
      );
      res.end(data);
    } catch {
      res.writeHead(500).end("Preview error");
    }
  })
  .listen(3000, "127.0.0.1", () =>
    console.log("[preview] Static export: http://127.0.0.1:3000"),
  );
