module.exports = {
  test: /\.css$/,
  use: [
    "style-loader",
    {
      loader: "css-loader",
      options: {
        modules: true
      }
    }
  ]
};
