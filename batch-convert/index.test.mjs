import assert from "node:assert/strict";
import test from "node:test";
import { SOURCE_EXTENSIONS } from "@swap3d/sdk";

test("the example consumes SDK-generated source extensions", () => {
  assert.ok(SOURCE_EXTENSIONS.includes("obj"));
});
