const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env = {}) => {
  const isProd = !!env.production;

  return {
    entry: './src/index.jsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      clean: true, // dist 폴더 정리
    },
    resolve: {
      extensions: ['.jsx', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: isProd
                ? {}
                : {
                    plugins: ['react-refresh/babel'], // dev에서만 활성화
                  },
            },
          ],
        },
        {
          test: /\.css$/i,
          use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(jpg|jpeg|png|gif)$/,
          exclude: /node_modules/,
          type: 'asset/resource', // 최신 방식
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        inject: 'body',
        scriptLoading: 'defer',
        minify: isProd && {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
        },
      }),
    ],
  };
};
