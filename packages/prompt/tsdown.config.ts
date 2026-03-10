import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./src/index.ts", "./src/core/index.ts"],
  format: ["esm", "cjs"],
  dts: {
    sourcemap: true,
  },
  sourcemap: true,
});
