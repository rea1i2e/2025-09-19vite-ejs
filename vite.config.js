import { defineConfig } from "vite";
import htmlImagesModule from "vite-plugin-html-images";
const htmlImages = htmlImagesModule.default || htmlImagesModule;
import imagemin from "unplugin-imagemin/vite";
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
        htmlFiles.map((file) => [
          // "about/index" みたいなキーを自動生成
          file.replace(/^src\//, "").replace(/\.html$/, ""), // キー名を作る：src/about/index.html -> about/index
          resolve(__dirname, file),
        ])
      ),
      output: {
        // JS の出力先
        entryFileNames: "assets/js/[name]-[hash].js",
        chunkFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          // 画像は dist/assets/images/ に
          if (/\.(png|jpe?g|webp|avif|svg|gif)$/i.test(assetInfo.name ?? "")) {
            return "assets/images/[name]-[hash][extname]";
          }
          // CSS は dist/assets/css/
          if (/\.css$/i.test(assetInfo.name ?? "")) {
            return "assets/css/[name]-[hash][extname]";
          }
          // それ以外は dist/assets/ に
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
  plugins: [
    // HTML内の <img>/<source> を解析し、?width= などのクエリ指定で
    // 変換(リサイズ/format/quality)してURLを書き換える
    htmlImages({
      // 必要に応じて
      outputPath: "assets/images", // 生成物の出力先
      // defaultExt: 'webp',       // format未指定時の既定など
    }),

    // 生成物をビルド時に圧縮（元のpng/jpgも含め圧縮）
    imagemin({
      apply: "build", // devでは動かさない（安定化）
      mode: "sharp", // ← Squoosh で落ちるなら sharp が安定
      filter: (
        file // ← 触るファイルを限定
      ) => /\.(png|jpe?g|webp|avif)$/i.test(file),
      compress: {
        jpg: { quality: 75 },
        jpeg: { quality: 75 },
        png: { quality: 75 },
        webp: { quality: 75 },
        avif: { quality: 50 },
      },
    }),
    ViteEjsPlugin({
      siteName: "ViteEJS検証2025-09-19",
    }),
    liveReload(["src/**/*.ejs"]),
    sassGlobImports(),
  ],
});
