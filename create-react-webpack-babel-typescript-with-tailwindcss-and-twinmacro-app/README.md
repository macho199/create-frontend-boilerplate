# create-react-webpack-babel-typescript-with-tailwindcss-and-twinmacro-app


## 1. 프로젝트 초기화

```bash
# package.json 생성

$ mkdir create-react-webpack-babel-typescript-app
$ cd create-react-webpack-babel-typescript-app

$ npm init -y
```

## 2. 필수 패키지 설치

```bash
# React, ReactDOM 설치
$ npm install react react-dom

# typescript, type-check, preset-typescript 설치
$ npm install -D typescript @babel/preset-typescript

# React, ReactDOM types 설치
$ npm install -D @types/node @types/react @types/react-dom

# Babel 관련 패키지 설치
$ npm install -D babel-loader @babel/core @babel/preset-env @babel/preset-react

# Webpack 관련 패키지 설치
$ npm install -D webpack webpack-cli webpack-merge webpack-dev-server html-webpack-plugin style-loader css-loader file-loader
```

## 3. 설정 파일 생성

```js
// .babelrc

{
  "presets": ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"]
}
```

```js
// webpack.config.js

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
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

```json
// tsconfig.json

{
  "compilerOptions": {
    "target": "es6",
    "jsx": "react",
    "module": "CommonJS",
    "esModuleInterop": true, // Commonjs방식으로 내보낸 모듈을 es모듈 방식으로 import로 가져옴
    "allowSyntheticDefaultImports": true, // export default 를 export 한 값들을 가지는 객체로 설정
    "forceConsistentCasingInFileNames": true, // 파일 이름에 일관된 대소문자 사용
    "sourceMap": true,
    "strict": true // 모든 엄격한 타입 검사 옵션을 활성화  alwaysStrict, strictNullChecks, strictBindCallApply, strictFunctionTypes, strictPropertyInitialization, noImplicitAny, noImplicitThis, useUnknownInCatchVariables
  },
  "include": ["src", "types"],
  "exclude": ["node_modules"]
}
```

## 4. React로 작성된 예제 파일 생성

```tsx
// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

```tsx
// src/App.tsx

import React, { useState } from "react";

const App = () => {
  const [state, setState] = useState<number>(0);

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
  "start": "webpack serve --open --mode=development --progress",
  "type-check": "tsc --noEmit",
  "type-check:watch": "npm run type-check -- --watch",
},
```

```bash
$ npm start // 개발
$ npm run type-check // 타입체커
$ npm run type-check:watch // 타입체커 와쳐
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

## 9. tailwind & twin.macro 설치

```bash
npm install @emotion/react @emotion/styled

npm install -D tailwindcss postcss postcss-loader

npm install -D @emotion/babel-preset-css-prop autoprefixer 

npm install -D twin.macro babel-plugin-twin babel-plugin-macros
```

```js
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

```js
// .postcss.config.js

module.exports = {
  plugins: [
    require("tailwindcss"), 
    require("autoprefixer")
  ],
};
```

```json
// edit babel config
// .babelrc

{
  "presets": [
    ["@babel/preset-react", { "runtime": "automatic" }],
    "@emotion/babel-preset-css-prop",
    "@babel/preset-typescript"
  ],
  "plugins": ["babel-plugin-twin", "babel-plugin-macros"]
}
```

```js
// postcss-loader 추가
// .webpack.config.js

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
};
```

```ts
// add twin type
// types/twin.d.ts

import "twin.macro";
import { css as cssImport } from "@emotion/react";
import styledImport from "@emotion/styled";
import { CSSInterpolation } from "@emotion/serialize";

declare module "twin.macro" {
  // The styled and css imports
  const styled: typeof styledImport;
  const css: typeof cssImport;
}

declare module "react" {
  // The tw and css prop
  interface DOMAttributes<T> {
    tw?: string;
    css?: CSSInterpolation;
  }
}
```

```tsx
// test!
// src/App.tsx

import React, { useState } from "react";
import tw, { TwStyle } from 'twin.macro'

const styles: TwStyle[] = [tw`p-5 bg-red-500`, tw`bg-red-300`]

const App = () => {
  const [state, setState] = useState<number>(0);

  const btnOnClickEventHandler = () => {
    setState((prev) => {
      return prev + 1;
    });
  };

  return (
    <div>
      <button css={[tw`bg-slate-500`, ...styles]} onClick={btnOnClickEventHandler}>{state}</button>
    </div>
  );
};

export default App;
```

## 10. 개발 서버 실행 및 타입 체크

```bash
$ npm start # 개발 서버 실행
$ npm run build # 빌드 실행
$ npm run type-check # 타입체크 실행
$ npm run type-check:watch # 타입체크 와처 실행
```