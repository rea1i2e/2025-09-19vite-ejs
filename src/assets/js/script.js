console.log("script.js");

// ② 自作CSS（上書きやデザイン調整はここに）
import '../scss/style.scss';

// ① ライブラリのCSSを先に（あとから自作CSSで上書きできるように）
import '@splidejs/splide/dist/css/splide.min.css';

// ③ Splide 本体
import Splide from '@splidejs/splide';

// ④ 初期化（DOMが読めたらでOK）
document.addEventListener('DOMContentLoaded', () => {
  new Splide('#slider1', {
    type: 'loop',
    perPage: 1,
    autoplay: true,
    interval: 3000,
    pauseOnHover: true,
    arrows: true,
    pagination: true,
  }).mount();
});
