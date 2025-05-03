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
      historyApiFallback: true, // React Router가 관리하는 경로를 처리할 수 있도록 모든 요청을 index.html로 리다이렉트 합니다.
    },
  });
}
