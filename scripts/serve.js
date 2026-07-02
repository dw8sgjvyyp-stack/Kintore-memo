const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..", "outputs");
const port = Number(process.env.PORT || 5179);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml"
};

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://127.0.0.1:${port}`);
  const requestedPath = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const filePath = path.resolve(root, `.${requestedPath}`);

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  const finalPath = fs.existsSync(filePath) ? filePath : path.join(root, "index.html");
  const ext = path.extname(finalPath).toLowerCase();
  response.writeHead(200, { "Content-Type": types[ext] || "application/octet-stream" });
  fs.createReadStream(finalPath).pipe(response);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`筋トレMEMO Pro is running at http://127.0.0.1:${port}`);
});
