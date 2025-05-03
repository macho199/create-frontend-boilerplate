const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = (env = {}) => {
  return merge(common({ ...env, production: false }), {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map', // 빠른 rebuild용 소스맵
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      port: 3000,
      hot: true,
      open: true,
      historyApiFallback: true, // React Router 대응
    },
    plugins: [
      new ReactRefreshWebpackPlugin(), // Fast Refresh 지원
    ],
  });
};
