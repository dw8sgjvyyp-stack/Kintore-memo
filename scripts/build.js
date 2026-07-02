const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const root = path.resolve(__dirname, "..");
const source = path.join(root, "outputs");
const target = path.join(root, "dist");
const encodedAppPattern = /^app\.gz\.b64(?:\.\d{2})?\.txt$/;
const encodedChunkPattern = /^app\.gz\.b64\.\d{2}\.txt$/;

function copyDirectory(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const sourcePath = path.join(from, entry.name);
    const targetPath = path.join(to, entry.name);
    if (entry.isDirectory()) copyDirectory(sourcePath, targetPath);
    else fs.copyFileSync(sourcePath, targetPath);
  }
}

function readEncodedAppBundle() {
  const chunkFiles = fs
    .readdirSync(source)
    .filter(fileName => encodedChunkPattern.test(fileName))
    .sort();

  if (chunkFiles.length > 0) {
    return chunkFiles.map(fileName => fs.readFileSync(path.join(source, fileName), "utf8")).join("");
  }

  const singleFile = path.join(source, "app.gz.b64.txt");
  return fs.existsSync(singleFile) ? fs.readFileSync(singleFile, "utf8") : null;
}

function restoreAppBundle() {
  const encoded = readEncodedAppBundle();
  if (!encoded) return;

  const compressed = Buffer.from(encoded.replace(/\s/g, ""), "base64");
  const appSource = zlib.gunzipSync(compressed);
  fs.writeFileSync(path.join(target, "app.js"), appSource);

  for (const fileName of fs.readdirSync(target)) {
    if (encodedAppPattern.test(fileName)) fs.rmSync(path.join(target, fileName), { force: true });
  }
}

if (!fs.existsSync(source)) {
  throw new Error("outputs directory is missing. Build cannot continue.");
}

fs.rmSync(target, { recursive: true, force: true });
copyDirectory(source, target);
restoreAppBundle();
console.log(`Built static PWA to ${path.relative(root, target)}`);
