import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { Swap3DClient, TARGET_FORMATS } from "@swap3d/sdk";

const [inputPath, targetFormat = "glb", requestedOutput] = process.argv.slice(2);
const apiKey = process.env.SWAP3D_API_KEY;

if (!apiKey || !inputPath || !TARGET_FORMATS.includes(targetFormat)) {
  console.error(
    `Usage: SWAP3D_API_KEY=<key> npm run convert -- <input> <${TARGET_FORMATS.join("|")}> [output]`,
  );
  process.exit(1);
}

const outputExtension = targetFormat.replace(/2$/, "");
const outputPath =
  requestedOutput ||
  path.join(path.dirname(inputPath), `${path.parse(inputPath).name}.${outputExtension}`);
const client = new Swap3DClient({ apiKey });
const source = await readFile(inputPath);
const job = await client.createConversion({
  file: new Blob([source]),
  fileName: path.basename(inputPath),
  targetFormat,
});

console.log(`job: ${job.jobId}`);
const status = await client.waitForConversion(job.jobId, {
  onStatus: (current) => console.log(`status: ${current.status}`),
});

if (status.status !== "completed" || !status.result) {
  throw new Error(
    status.status === "expired"
      ? status.error.message
      : `Conversion ${status.status}: ${status.error || "no result"}`,
  );
}

const response = await client.download(status.result.downloadUrl);
await writeFile(outputPath, new Uint8Array(await response.arrayBuffer()));
console.log(`downloaded: ${outputPath}`);
