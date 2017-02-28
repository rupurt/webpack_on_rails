const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  test: /\.scss$/,
  use: ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: [
      {
        loader: "css-loader",
        options: {
          modules: true
        }
      },
      {
        loader: "sass-loader",
        options: {
          modules: true
        }
      }
    ]
  })
};
