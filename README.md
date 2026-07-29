# Swap3D Examples

Runnable server-side examples for the
[Swap3D developer API](https://swap3d.studio/developer-api) and
[`@swap3d/sdk`](https://github.com/swap3d/swap3d-js).

## Examples

| Example | Purpose |
| --- | --- |
| [Node.js conversion](node-convert) | Convert one local model and download the result. |
| [Batch conversion](batch-convert) | Convert every supported model in a directory with bounded concurrency. |
| [Next.js server route](nextjs-server-route) | Keep the API key on the server while accepting browser uploads. |

## Requirements

- Node.js 20 or newer
- A Swap3D API key from the [dashboard](https://swap3d.studio/dashboard/api)

Install dependencies from the repository root:

```shell
npm install
```

Run an example with the API key in the process environment:

```shell
SWAP3D_API_KEY=<your-api-key> npm run convert --workspace node-convert -- \
  ./model.obj glb ./model.glb
```

Never put `SWAP3D_API_KEY` in browser code, public environment variables, or
committed files.

## License

Apache-2.0. See [LICENSE](LICENSE) and [NOTICE](NOTICE).
