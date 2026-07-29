import { Swap3DClient, TARGET_FORMATS } from "@swap3d/sdk";

export async function POST(request) {
  const apiKey = process.env.SWAP3D_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "SWAP3D_API_KEY is not configured." }, { status: 500 });
  }

  const form = await request.formData();
  const file = form.get("file");
  const targetFormat = String(form.get("targetFormat") || "glb");

  if (!(file instanceof File) || !TARGET_FORMATS.includes(targetFormat)) {
    return Response.json({ error: "A valid file and target format are required." }, { status: 400 });
  }

  const client = new Swap3DClient({ apiKey });
  const job = await client.createConversion({
    file,
    fileName: file.name,
    targetFormat,
  });

  return Response.json(job, { status: 202 });
}
