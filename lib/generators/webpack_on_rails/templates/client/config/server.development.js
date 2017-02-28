const webpack = require("webpack");
const config = require("./shared");
const sassLoader = require("./loaders/sass");

config.output.publicPath = "http://localhost:8080/assets/";

function devServerEntries() {
  var entry = {};

  Object.keys(config.entry).forEach((key) => {
    var existing = config.entry[key];
    var entries = (existing instanceof Array) ? existing.slice() : Array.of(existing);

    entry[key] = entries.concat([
      "webpack-dev-server/client?http://localhost:8080",
      "webpack/hot/only-dev-server"
    ]);
  });

  return entry;
}
config.entry = devServerEntries();

config.plugins.unshift(new webpack.HotModuleReplacementPlugin());

config.module.rules.push(sassLoader);

config.devServer = {
  contentBase: config.output.path,
  publicPath: config.output.publicPath,
  hot: true,
  inline: true
};

config.devtool = "inline-eval-cheap-source-map";

module.exports = config;
