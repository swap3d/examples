# Batch Conversion

Convert supported files from one directory into another:

```shell
SWAP3D_API_KEY=<your-api-key> npm run convert -- \
  ./models ./converted glb
```

The example uses two concurrent conversions by default. Set
`SWAP3D_CONCURRENCY` to a positive integer to change the limit.
