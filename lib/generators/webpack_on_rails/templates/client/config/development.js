const webpack = require("webpack");
const extractTextCssPlugin = require("./plugins/extract-text-css");
const sprocketsRailsManifestPlugin = require("./plugins/sprockets-rails-manifest.js");
const extractTextSassLoader = require("./loaders/extract-text-sass");
const config = require("./shared");

config.plugins.unshift(extractTextCssPlugin);

config.plugins = config.plugins.push(sprocketsRailsManifestPlugin);

config.module.rules.push(extractTextSassLoader);

config.devtool = "inline-eval-cheap-source-map";

module.exports = config;
