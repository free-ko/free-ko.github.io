---
emoji: 👋
title: 'Babel에 대해'
date: '2023-12-29 08:05:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## Babel이란

- babel은 source-to-source compiler로, ES6 버전 이상의 JavaScript 코드를 ES5 코드로 변환하는 구문 변환(syntax transform)을 수행.
- JavaScript 언어를 컴퓨터 수준의 기계어로 바꾸는 것이 아니라 같은 레벨의 언어를 형태만 변환하는 것이므로 babel을 트랜스파일러(transpiler)라고 부르기도 하지만, 넓은 의미에서 컴파일러(compiler)라고 알려져 있음.
- babel 덕분에 개발자들은 최신 문법의 JavaScript로 편하게 개발을 할 수 있게 되었음

<br>

## Babel 트랜스파일링 과정

babel 컴파일 과정

- 파싱(parsing) 단계: babel이 소스코드를 파싱하여 AST를 생성(이때 생성되는 트리는 JSON 형태와 비슷). AST에서 각각의 노드들은 관계를 형성
- 변환(transform) 단계: AST를 브라우저가 지원하는 코드로 변환. 이때 개발자가 설정한 plugin과 preset들에 의해서 컴파일됨
- 생성(generate) 단계: AST를 코드로 출력

### AST란

AST(Abstract Syntax Tree)란 프로그래밍 언어의 문법에 따라 소스코드 구조를 표시하는 계층적 프로그램 표현. HTML을 파싱할 때도 사용됨. babel 플러그인은 babel 컴파일 단계에서 AST(Abstract Syntax Tree)를 변형하는 역할을 수행함. Babel은 플러그인이 변형시킨 AST를 가지고 타깃 코드를 생성함

<br>

## Babel config

- babel 설정 파일을 만들어주는 방법에는 babel.config.json과 .babelrc.json이 있음. 각각은 사용하는 경우가 조금 다름

### babel.config.json

- babel 설정 파일을 root 폴더에 생성함.
- 프로젝트 전체의 설정을 위해서 사용하며, 하나의 레포(monorepo)를 사용하고 있는 경우 권장됨.
- babel 6 까지는 .babelrc로 설정을 관리했지만, babel 7부터는 babel.config.json 파일을 사용하는 것을 권장함
- [babel 공식 문서](https://babeljs.io/docs/usage#configuration)에서 제공하는 babel.config.json 파일의 내용은 다음과 같음

  ```json
  {
    "presets": [
      [
        "@babel/env",
        {
          "targets": {
            "edge": "17",
            "firefox": "60",
            "chrome": "67",
            "safari": "11.1"
          }
        }
      ]
    ]
  }
  ```

### babel.config.json

- babel 설정을 해당 파일이 속한 package에만 적용함.
- 프로젝트의 일부에만 적용되는 설정 작성 시 사용하며, 특정 파일들에 대해서 컴파일을 할 때 유용함

### babel-loader

- webpack을 사용하고 있다면 babel을 webpack에서 실행시켜주는 도구인 babel-loader를 사용할 수 있음.
- babel-loader 설치 후 webpack config의 loader 목록에에 babel-loader를 넣고 필요한 옵션을 추가하면 됨.
- package.json에 명시한 scripts를 통해 webpack을 실행하면 번들링 과정에서 babel이 코드의 트랜스파일링을 진행함.
- node_modules는 트랜스파일링이 필요 없으므로 exclude 옵션으로 제외시켜 줌.

  ```js
  // webpack.config.js
  module.exports = {
    module: {
      rules: [
        {
          test: /\.(tsx|ts)$/,
          exclude: 'node_modules',
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
              plugins: ['@babel/plugin-transform-runtime', 'babel-plugin-styled-components'],
            },
          },
        },
      ],
    },
  };
  ```

  - [참고](https://webpack.js.org/loaders/babel-loader/)

<br>

## plugin과 presets

### plugin

- babel에서 코드의 변환은 plugin의 구성에 따라 결정됨.
- babel plugin은 babel 컴파일 단계에서 AST를 변형하는 역할을 함.
- babel은 plugin이 변형시킨 AST를 가지고 타겟 코드를 생성함
- [참고](https://tech.kakao.com/2020/12/01/frontend-growth-02/)

### presets

- preset은 plugin들의 집합임.
- plugin을 하나하나 추가해주는 대신, 적용할 규칙들을 그룹으로 묶은 preset으로 한번에 지정해줄 수 있음.
- 예를 들면 ES6 문법들을 모아둔 es2015 preset과 react에서 사용하는 문법들을 모아둔 react preset이 있음.
- preset들을 우선적으로 추가하고, 추가적으로 사용하고 싶은 plugin들을 기재해줌
- babel이 제공하는 공식 babel preset들은 아래와 같음
  - @babel/preset-env
  - @babel/preset-flow
  - @babel/preset-react
  - @babel/preset-typescript
- 이 중 @babel/preset-env은 타겟 환경에 필요한 구문 변환(syntax transform), 브라우저 폴리필(browser polyfill)을 제공하며, 나머지 항목들은 각각 flow, react, typescript 사용 시 babel에서 지원해주는 preset임
- [참고](https://babeljs.io/docs/en/babel-preset-env)

<br>

## 참고

- [Babel](https://babeljs.io/docs/usage)

```toc

```
