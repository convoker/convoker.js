import { defineConfig } from "tsdown";

export default defineConfig({
  entry: [
    "./src/index.ts",
    "./src/input/index.ts",
    "./src/command/index.ts",
    "./src/color/index.ts",
    "./src/prompt/index.ts",
    "./src/prompt/raw.ts",
  ],
  dts: true,
  sourcemap: true,
});
