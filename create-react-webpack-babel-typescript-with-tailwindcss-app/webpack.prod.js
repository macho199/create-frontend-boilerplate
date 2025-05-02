const { merge } = require("webpack-merge");
const common = require("./webpack.config.js");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env) => {
  return merge(common(env), {
    mode: "production",
    optimization: {
      minimize: true,
      minimizer: [
        new CssMinimizerPlugin(), // CSS 압축을 위한 플러그인 추가
        new TerserPlugin(),
      ],
    },
  });
}
