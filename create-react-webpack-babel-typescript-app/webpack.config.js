// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// module.exports = (env) => {
//   return {
//     entry: './src/index.tsx',
//     output: {
//       path: path.resolve(__dirname, 'dist'),
//       filename: 'bundle.js',
//     },
//     resolve: {
//       extensions: ['.tsx', '.ts', '.jsx', '.js'],
//       alias: {
//         '@': path.resolve(__dirname, 'src'),
//       },
//     },
//     module: {
//       rules: [
//         {
//           test: /\.(ts|tsx)$/,
//           exclude: /node_modules/,
//           loader: 'babel-loader',
//         },
//         {
//           test: /\.css$/i,
//           use: [env.production ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
//         },
//         {
//           test: /\.(jpg|jpeg|png|gif)$/,
//           exclude: /node_modules/,
//           use: 'file-loader',
//         },
//       ],
//     },
//     plugins: [
//       new HtmlWebpackPlugin({
//         template: './public/index.html',
//       }),
//       env.production ? new BundleAnalyzerPlugin() : '', // BundleAnalyzerPlugin 추가
//       env.production ? new MiniCssExtractPlugin() : '', // MiniCssExtractPlugin 추가
//     ],
//   };
// };

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env = {}) => {
  const isProd = !!env.production;

  return {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      clean: true, // dist 폴더 정리
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
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
          use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
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
