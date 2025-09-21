// postcss.config.cjs
module.exports = {
  plugins: [
    require('autoprefixer')({}),
    require('postcss-sort-media-queries')({
      sort: 'mobile-first', // 小→大 の順で並べ替え＆同一条件をまとめる
    }),
  ],
};