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

## 참고

- [Babel](https://babeljs.io/docs/usage)

```toc

```
