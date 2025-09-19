import { defineConfig } from 'vite';

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        'index': 'src/index.html',
        'about': 'src/about/index.html',
        'scripts/main': 'src/assets/scripts/main.js',
        'scripts/pages/index/index': 'src/assets/scripts/pages/index/index.js',
        'scripts/pages/about/index': 'src/assets/scripts/pages/about/index.js',
        'styles/main': 'src/assets/styles/main.css',
        'styles/pages/index/index': 'src/assets/styles/pages/index/style.css',
        'styles/pages/about/index': 'src/assets/styles/pages/about/style.css',
      },
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      },
    },
  }
});