const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },
    resolve: {
      extensions: [".jsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.css$/i,
          use: [env.production ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(jpg|jpeg|png|gif)$/,
          exclude: /node_modules/,
          use: "file-loader",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      env.production ? new BundleAnalyzerPlugin() : '', // BundleAnalyzerPlugin 추가
      env.production ? new MiniCssExtractPlugin() : '', // MiniCssExtractPlugin 추가
    ],
  };
};
