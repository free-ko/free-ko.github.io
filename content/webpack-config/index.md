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

## ✅ 타입 체킹 기능 사용

- babel은 ES6 코드를 ES5 이하의 문법으로 컴파일해주지만, 타입 체크는 해주지 않음.
- babel에서 기본으로 제공하는 @babel/preset-typescript preset은 타입스크립트 문법을 브라우저가 이해할 수 있게끔 해주는 역할만 수행할 뿐, 타입 체크를 해주지 않음
- 별도의 타입 체크를 위해 tsc와 같은 타입스크립트 컴파일러를 설치하여 타입 체크를 수행할 수 있지만, 그보다 webpack과의 결합도를 위해 fork-ts-checker-webpack-plugin을 적용 할 수 있음.
- fork-ts-checker-webpack-plugin은 babel 컴파일 과정에서 별도로 동작하여, 타입 체크와 babel 컴파일을 병렬적으로 수행할 수 있다는 장점이 있음.
- ts-loader를 사용하여 babel에서 타입 체크를 수행할 수 있지만, 혼자 트랜스파일링과 타입 체크를 모두 다 하게 되기 때문에 느리다는 단점이 있음. 공식 문서에서는 babel-loader의 사용을 권장함

<br>

## ✅ DefinePlugin

- 컴파일 타임에 사용할 값들을 지정해줌.
- 구체적으로는 production mode에서 사용할 환경변수들을 가져와 정의해줄 수 있음.
- Github Actions나 Jenkins 등 CI/CD를 도와주는 툴에 secret variable로 앱에서 사용하는 API key 등의 환경변수를 설정하고, 빌드 시점에 해당 환경에서 필요한 변수를 취득하여 앱에 적용해 줌.
- production mode에서 SENTRY의 DSN을 불러와 사용해주기 위해 작성.
- DefinePlugin의 key-value 쌍에서 key값은 항상 아래처럼 문자열로 감싸줘야 하며, value도 JSON.stringify로 바꿔줘야 함

```js
// webpack.config.js
// DefinePlugin과 유사하게 동작하지만, 환경 변수 전용으로 사용되는 EnvironmentPlugin이라는 플러그인도 있음

module.exports = {
  // ...
  plugins: [
    // ...
    new DefinePlugin({
      'process.env.SENTRY_DSN': JSON.stringify(process.env.SENTRY_DSN),
    }),
  ],
};
```

<br>

## 참고

```toc

```
