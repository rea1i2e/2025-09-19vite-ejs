import { defineConfig } from "vite";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import { resolve } from "node:path";
import { globSync } from "glob";
import liveReload from "vite-plugin-live-reload";
import sassGlobImports from "vite-plugin-sass-glob-import";

// src配下のHTMLを全部取得
const htmlFiles = globSync("src/**/*.html");

export default defineConfig({
  root: "./src",
  server: {
    open: true, // 自動でブラウザを開く
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true, // ビルド前に中身を削除
    rollupOptions: {
      // input: {about: resolve(__dirname, 'src/about/index.html'),} // 手動で書く場合はこうなる
      input: Object.fromEntries(
        htmlFiles.map(file => [
          // "about/index" みたいなキーを自動生成
          file.replace(/^src\//, "").replace(/\.html$/, ""), // キー名を作る：src/about/index.html -> about/index
          resolve(__dirname, file)
        ])
      )
    },
  },
  plugins: [
    ViteEjsPlugin({
      siteName: "ViteEJS検証2025-09-19",
    }),
    liveReload(["**/*.ejs"]),
    sassGlobImports(),
  ],
});
