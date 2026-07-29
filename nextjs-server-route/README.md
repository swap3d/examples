# Next.js Server Route

This example sends a browser upload to a Next.js Route Handler. The Route
Handler calls Swap3D with the server-only `SWAP3D_API_KEY`.

```shell
SWAP3D_API_KEY=<your-api-key> npm run dev
```

Open `http://localhost:3000`, choose a supported model, and submit it. The
example returns job metadata immediately; production applications can store
the job ID and poll from a separate server route.
