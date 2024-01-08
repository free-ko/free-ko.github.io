---
emoji: 👋
title: 'webpack config 설정 알아보기'
date: '2024-01-07 11:19:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## ✅ webpack dev prod config 분리

- development와 production의 빌드 목표는 서로 다름.
- development에서는 강력한 소스 매핑, localhost 서버에서는 라이브 리로딩이나 HMR(Hot Module Replacement) 기능을 원함.
- production의 목표는 로드 시간을 줄이기 위해 번들 최소화, 가벼운 소스맵 및 에셋 최적화에 초점을 맞춰야 함. 공식 문서에서는 webpack 설정을 분리하여 작성하는 것을 권장하고 있음
- dev와 prod에서 공통으로 사용하는 설정들은 `webpack.common.js`에 작성하고, webpack-merge를 사용하여 common의 설정 내용을 dev와 prod에서 확장하여 사용할 수 있음

<br>

## ✅ babel/preset-env의 target browserslist 설정

- 앱을 만들 때 지원할 브라우저를 명시할 수 있음.
- ES6와 같은 최신 자바스크립트 문법을 사용할 때 browserslist를 명시해 주면, 트랜스파일러나 모듈 번들러가 현재 타겟으로 하는 브라우저를 알 수 있음.
- 최신 문법을 지원하지 않는 브라우저(IE 11버전 이하)를 그대로 사용한다면 별도의 polyfill을 설치해줘야 함.
- 현재 프로젝트에서는 크롬 50버전 이상 또는 전체 브라우저의 최신 2개의 버전을 지원하며, IE 11 버전 이하의 브라우저는 지원하지 않기로 했음.
- 전체 query 목록은 [여기](https://github.com/browserslist/browserslist#queries)서 확인할 수 있음.
- babel의 `@babel/preset-env` 설정에 browserslist를 명시해주는 방법도 있지만, 현재 패키지에서 확인하는 방법이 좋다고 생각하여 package.json에 작성 후 webpack에서 참조하도록 했음

```json
// package.json
{
  // ...
  "browserslist": "chrome > 50 or last 2 versions and not ie <= 11"
}
```

```js
// webpack.config.js
// browserslist 설정이 있다면 target 옵션은 디폴트로 해당 browserslist를 가리키게 됨.

module.exports = {
  // ...
  target: 'browserslist',
};
```

- `npx browserslist` 명령어를 통해 현재 앱에서 타겟 환경으로 지정한 브라우저와 그 버전을 명시한 목록을 볼 수 있음

<br>

## ✅ file-loader 대신 asset/resource

- file-loader 모듈은 개발 시 import/require 구문으로 사용되는 에셋 파일들을 번들 결과의 output 폴더에 생성해줌.
- webpack v5부터 deprecate되었으며, 현재는 asset/resource를 사용함.
- generator 옵션을 사용하여 번들 이후 생성될 파일의 이름을 설정해줄 수 있음.

```js
// webpack.config.js
module.exports = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/[name][ext]',
        },
      },
    ],
  },
};
```

<br>

## 참고

```toc

```
