# create-react-webpack-babel-app

## 1. 프로젝트 초기화

```bash
# package.json 생성

$ mkdir create-react-webpack-babel-app
$ cd create-react-webpack-babel-app

$ npm init -y
```

## 2. 필수 패키지 설치

```bash
# React, ReactDOM 설치
$ npm install react react-dom

# Babel 관련 패키지 설치
$ npm install -D babel-loader @babel/core @babel/preset-env @babel/preset-react

# Webpack 관련 패키지 설치
$ npm install -D webpack webpack-cli webpack-merge webpack-dev-server html-webpack-plugin style-loader css-loader file-loader
```

## 3. 설정 파일 생성

```js
// .babelrc

{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

```js
// webpack.config.js

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
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
        loader: "babel-loader"
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
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
  ],
  target: "web", // 브라우저에서 작동하는 코드로 설정
};
```

```js
// webpack.dev.js

const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.config.js");

module.exports = merge(common, {
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
```

```js
// webpack.prod.js

const { merge } = require("webpack-merge");
const common = require("./webpack.config.js");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(), // js compressor
    ],
  },
});
```

## 4. React로 작성된 예제 파일 생성

```js
// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'

const rootNode = document.getElementById('root');

ReactDOM.createRoot(rootNode).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

```js
// src/App.js

import React, { useState } from "react";

const App = () => {
  const [state, setState] = useState(0);

  const btnOnClickEventHandler = () => {
    setState((prev) => {
      return prev + 1;
    });
  };

  return (
    <div>
      <button onClick={btnOnClickEventHandler}>{state}</button>
    </div>
  );
};

export default App;
```

```css
// src/index.css

body {
  background-color: #e2e8f0;
}
```

```html
// public/index.html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React App</title>
  </head>
  <body><div id="root"></div></body>
</html>
```

## 5. scripts 추가 및 실행

```js
// package.json

"scripts": {
  "build": "webpack --mode=production --progress",
  "start": "webpack serve --open --mode=development --progress" 
},
```

```bash
$ npm start // 개발
$ npm run build // 빌드
```

## 6. webpack-bundle-analyzer 패키지 설치

```bash
$ npm install -D webpack-bundle-analyzer
```

```js
// webpack.config.js

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
module.exports = {
  plugins: [
    new BundleAnalyzerPlugin(), // BundleAnalyzerPlugin 추가
  ],
}
```

## 7. 번들링 시 css 파일 분리

```bash
$ npm install -D mini-css-extract-plugin
```

웹팩 설정 파일에서 플러그인 추가 및 설정

```js
// webpack.config.js

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin(), // MiniCssExtractPlugin 추가
  ],
}
```

## 8. 번들링 시 css minify 

```bash
$ npm install -D css-minimizer-webpack-plugin
```

```js
// webpack.prod.js

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), // CSS 압축을 위한 플러그인 추가
    ],
  },
}
```
