import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./src/index.ts", "./src/global.ts", "./src/utils.ts"],
  format: ["esm", "cjs"],
  dts: {
    sourcemap: true,
  },
  sourcemap: true,
});
