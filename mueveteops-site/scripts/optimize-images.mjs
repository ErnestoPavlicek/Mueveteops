import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import { join, parse } from "node:path";

const DIRS = ["public/images", "public/cases"];
const MAX_WIDTH = 1920;
const QUALITY = 80;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

let totalBefore = 0;
let totalAfter = 0;

for (const dir of DIRS) {
  for await (const file of walk(dir)) {
    if (!/\.png$/i.test(file)) continue;
    const { dir: d, name } = parse(file);
    const out = join(d, `${name}.webp`);
    const before = (await stat(file)).size;
    totalBefore += before;

    const img = sharp(file);
    const meta = await img.metadata();
    const pipeline = meta.width && meta.width > MAX_WIDTH
      ? img.resize({ width: MAX_WIDTH, withoutEnlargement: true })
      : img;

    await pipeline.webp({ quality: QUALITY, effort: 6 }).toFile(out);
    const after = (await stat(out)).size;
    totalAfter += after;
    const pct = ((1 - after / before) * 100).toFixed(1);
    console.log(
      `${file} → ${out}  ${(before / 1024 / 1024).toFixed(2)}MB → ${(
        after /
        1024 /
        1024
      ).toFixed(2)}MB  (-${pct}%)`
    );
  }
}

console.log(
  `\nTotal: ${(totalBefore / 1024 / 1024).toFixed(1)}MB → ${(
    totalAfter /
    1024 /
    1024
  ).toFixed(1)}MB  (-${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%)`
);
