import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// Make your Vite site load faster & boost SEO performance; Webfont DL -Vite Plugin
import { ViteWebfontDownload } from "vite-plugin-webfont-dl";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), ViteWebfontDownload()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      // work around for ocktokit:
      // https://github.com/octokit/octokit.js/issues/2126#issuecomment-1005023857
      "node-fetch": "isomorphic-fetch",
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "@/assets/scss/main.scss";
        @import "@/assets/scss/colors.scss";
        `,
      },
    },
  },
});
