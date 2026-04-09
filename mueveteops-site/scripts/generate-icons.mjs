import sharp from "sharp";
import pngToIco from "png-to-ico";
import { writeFile, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";

const SOURCE = resolve(import.meta.dirname, "../../logo-source.png.png");

async function resizeTransparent(size, outputPath) {
  const { data, info } = await sharp(SOURCE)
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Replace pure black pixels with transparent
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0) {
      data[i + 3] = 0;
    }
  }

  await mkdir(dirname(outputPath), { recursive: true });
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toFile(outputPath);

  console.log(`  ✓ ${outputPath} (${size}x${size})`);
}

async function main() {
  const root = resolve(import.meta.dirname, "..");

  console.log("Generating favicon.ico (32x32, black bg)...");
  const pngBuf = await sharp(SOURCE).resize(32, 32).png().toBuffer();
  const icoBuf = await pngToIco([pngBuf]);
  await writeFile(resolve(root, "src/app/favicon.ico"), icoBuf);
  console.log("  ✓ src/app/favicon.ico");

  console.log("Generating transparent PNGs...");
  await resizeTransparent(180, resolve(root, "src/app/apple-icon.png"));
  await resizeTransparent(192, resolve(root, "public/icon-192.png"));
  await resizeTransparent(512, resolve(root, "public/icon-512.png"));
  await resizeTransparent(40, resolve(root, "public/images/logo-nav.png"));

  console.log("\nDone! All icons generated.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
