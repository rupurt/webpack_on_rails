const webpack = require("webpack");
const config = require("./shared");
const CompressionPlugin = require("compression-webpack-plugin");
const sprocketsRailsManifestPlugin = require("./plugins/sprockets-rails-manifest.js");
const extractTextCssPlugin = require("./plugins/extract-text-css");
const extractTextSassLoader = require("./loaders/extract-text-sass");

config.output.filename = "[name]-[chunkhash].js";

config.plugins.unshift(
  extractTextCssPlugin
);
config.plugins.unshift(
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production")
    }
  })
);

config.plugins = config.plugins.concat([
  extractTextCssPlugin,

  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    mangle: false
  }),

  new CompressionPlugin({
    asset: "[path].gz[query]",
    algorithm: "gzip",
    test: /\.js$/,
    threshold: 10240,
    minRatio: 0.8
  }),

  sprocketsRailsManifestPlugin
]);

config.module.rules.push(extractTextSassLoader);

module.exports = config;
