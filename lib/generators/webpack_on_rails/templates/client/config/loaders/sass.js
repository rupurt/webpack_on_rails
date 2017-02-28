const cssLoader = require("./css");

const sassLoader = Object.assign({}, cssLoader);
sassLoader.test = /\.scss$/;
sassLoader.use.push({ loader: "sass-loader" });

module.exports = sassLoader;
