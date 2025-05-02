const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.config.js");

module.exports = (env) => {
  return merge(common(env), {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
      },
      port: 3000,
      hot: true,
    },
  });
}
