const path  = require("path");
const WebpackSprocketsRailsManifestPlugin = require("webpack-sprockets-rails-manifest-plugin");
const babelLoader = require("./loaders/babel");
const fontLoader = require("./loaders/font");
const cssLoader = require("./loaders/css");

const config = {
  context: path.resolve(__dirname, ".."),

  entry: {
    "webpack-application": "./entries/webpack-application/index.js"
  },

  output: {
    path: path.resolve(__dirname, "../../public/assets"),
    filename: "[name].js"
  },

  resolve: {
    modules: [
      path.resolve(__dirname, "../node_modules")
    ]
  },

  plugins: [
    new WebpackSprocketsRailsManifestPlugin()
  ],

  resolve: {
    extensions: [".jsx", ".js", ".json"]
  },

  module: {
    rules: [
      babelLoader,
      fontLoader,
      cssLoader
    ]
  }
};

module.exports = config;
