import dummy4Srcset from "../images/dummy/dummy4.jpg?w=480;768;1200&format=webp;jpg&as=srcset";
const img = document.querySelector("#dummy4");
img.src = dummy4Srcset.split(",")[0].trim().split(" ")[0]; // 初期src
img.setAttribute("srcset", dummy4Srcset);
img.setAttribute("sizes", "100vw");
