import { defineConfig } from "vite";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import { resolve } from 'node:path';
import liveReload from "vite-plugin-live-reload";

export default defineConfig({
  root: "./src",
  server: {
    open: true, // 自動でブラウザを開く
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.html'),
        about: resolve(__dirname, 'src/about/index.html'),
      },
    },
  },
  plugins: [
    ViteEjsPlugin({
      siteName: "ViteEJS検証2025-09-19",
    }),
    liveReload([
      "**/*.ejs"
    ]),
  ],
});
