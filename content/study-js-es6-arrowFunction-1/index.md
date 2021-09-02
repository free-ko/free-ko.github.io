---
emoji: 👨‍💻
title: Arrow Function 사용
date: '2021-09-02 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 Arrow Function, 함수 블록 사용, 파라미터 사용
</h1>

<br>

## 1) Arrow Function

- `Arrow`의 사전적 의미 : 화살, 화살표
- 코드 형태

  - `(param) => {함수 코드}`

  ```tsx
  const add = function (one, two) {
    return one + two;
  };

  console.log(add(1, 2)); // 3

  const total = (one, two) => {
    return one + two;
  };

  console.log(total(1, 2)); // 3
  ```

  1. `function` 키워드 대신에 화살표 `=>` 사용
  2. `=>`표 양쪽에 공백 작성 가능

- `function() {}`의 축약 형태이지만, 고려할 사항도 있음(`this` 참조가 다름)

<br>

## 2) 함수 블록 사용

- 함수 블록과 `return` 작성생략

  ```tsx
  const total = (one, two) => one + two;

  console.log((total(1,2)); // 3
  ```

  1. 함수 블록`{}`과 `return`을 생략한 형태로 `{ return one + two }`와 같음
  2. `=>` 앞에서 줄을 분리하면 `SyntaxError`
  3. `=>` 뒤에서는 개행 가능

- 함수 블록 `{}`만 작성한 형태

  ```tsx
  const total = (one) => {};

  console.log(total(1)); // undefined
  ```

  1. 함수 블록`{}`만 작성하면 `undefined` 반환
  2. 함수 블록에 `return`을 작성하지 않은 것과 같음
  3. `return`을 작성하지 않으면 `default`로 `undefined`를 반환 함
  4. 화살표가 함수이기 때문이 아니라 `JS` 문법임

- `{key: value}`를 반환하는 형태

  ```tsx
  const point = (param) => ({ book: param });
  const result = point('책');

  for (const key in result) {
    console.log(key + ': ' + result[key]);
  }

  // book: 책
  ```

  1. `{key: value}`를 소괄호()로 감싸면 `{key: value}`를 반환함
  2. 소괄호()을 작성하지 않으면 `undefined`를 반환함

<br>

## 3) 파라미터 사용

- 파라미터가 하나 일 때

  ```tsx
  const get = (param) => param + 20;

  console.log(get(10)); // 30
  ```

  1. 파라미터가 하나이면 `(param)`에서 소괄호를 생략할 수 있음
  2. `get(10)`에서 `10`이 `param`에 설정됨

- 파라미터가 없으면 소괄호만 작성

  ```tsx
  const get = () => 10 + 20;

  console.log(get()); // 30
  ```

  - 파라미터가 없으면 소괄호만 작성할 수 있음

  <br>

```toc

```
