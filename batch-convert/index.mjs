import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import {
  SOURCE_EXTENSIONS,
  Swap3DClient,
  TARGET_FORMATS,
} from "@swap3d/sdk";

const [inputDir, outputDir, targetFormat = "glb"] = process.argv.slice(2);
const apiKey = process.env.SWAP3D_API_KEY;
const concurrency = Number.parseInt(process.env.SWAP3D_CONCURRENCY || "2", 10);

if (
  !apiKey ||
  !inputDir ||
  !outputDir ||
  !TARGET_FORMATS.includes(targetFormat) ||
  !Number.isSafeInteger(concurrency) ||
  concurrency < 1
) {
  console.error(
    `Usage: SWAP3D_API_KEY=<key> npm run convert -- <input-dir> <output-dir> <${TARGET_FORMATS.join("|")}>`,
  );
  process.exit(1);
}

const files = (await readdir(inputDir, { withFileTypes: true }))
  .filter((entry) => entry.isFile())
  .map((entry) => entry.name)
  .filter((name) => SOURCE_EXTENSIONS.includes(path.extname(name).slice(1).toLowerCase()));
const client = new Swap3DClient({ apiKey });
const queue = [...files];

await mkdir(outputDir, { recursive: true });

async function convertNext() {
  for (let fileName = queue.shift(); fileName; fileName = queue.shift()) {
    const inputPath = path.join(inputDir, fileName);
    const outputName = `${path.parse(fileName).name}.${targetFormat.replace(/2$/, "")}`;
    const outputPath = path.join(outputDir, outputName);
    const source = await readFile(inputPath);
    const job = await client.createConversion({
      file: new Blob([source]),
      fileName,
      targetFormat,
    });
    const status = await client.waitForConversion(job.jobId);

    if (status.status !== "completed" || !status.result) {
      console.error(`${fileName}: ${status.status}`);
      continue;
    }

    const response = await client.download(status.result.downloadUrl);
    await writeFile(outputPath, new Uint8Array(await response.arrayBuffer()));
    console.log(`${fileName} -> ${outputName}`);
  }
}

await Promise.all(
  Array.from({ length: Math.min(concurrency, files.length) }, () => convertNext()),
);
