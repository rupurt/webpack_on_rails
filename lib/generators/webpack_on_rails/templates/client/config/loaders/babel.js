// https://github.com/babel/babel-loader#options

module.exports = {
  test: /\.jsx?$/,
  exclude: [/node_modules/],
  use: ["babel-loader"]
};
