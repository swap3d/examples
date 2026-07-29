import assert from "node:assert/strict";
import test from "node:test";
import { TARGET_FORMATS } from "@swap3d/sdk";

test("the example consumes SDK-generated target formats", () => {
  assert.ok(TARGET_FORMATS.includes("glb"));
});
