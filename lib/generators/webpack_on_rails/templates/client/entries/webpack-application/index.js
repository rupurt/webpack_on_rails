import indexStyle from "./index.scss";

const main = document.createElement("div");
main.innerText = "Hi, I'm a Webpack application!";
main.className = indexStyle.webpackApplication;

document.body.appendChild(main);

const loading = document.querySelector(".loading");
loading.style.display = "none";
