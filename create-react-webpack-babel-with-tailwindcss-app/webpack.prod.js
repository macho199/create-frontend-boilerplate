const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env = {}) => {
  return merge(common({ ...env, production: true }), {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
      minimize: true,
      minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
    },
    performance: {
      hints: false, // 번들 크기 경고 제거 (선택사항)
    },
    plugins: [new MiniCssExtractPlugin(), new BundleAnalyzerPlugin()],
  });
};
