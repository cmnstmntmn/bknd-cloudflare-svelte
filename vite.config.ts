import tailwindcss from "@tailwindcss/vite";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
// import tsconfigPaths from "vite-tsconfig-paths";
// import { devFsVitePlugin } from "bknd/adapter/cloudflare";

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/lib/paraglide",
    }),
    // devFsVitePlugin({ configFile: "config.ts" }),
    // tsconfigPaths(),
  ],
  server: {
    fs: {
      allow: ["."],
    },
  },
  build: {
    minify: true,
  },
});
