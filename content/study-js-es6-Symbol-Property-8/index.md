---
emoji: 👨‍💻
title: Symbol.iterator에 제너레이터 함수 연결
date: '2021-10-28 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 Symbol.iterator에 제너레이터 함수 연결
</h1>

<br>

## generator 함수 연결

- `Object{}` 에 `Symbol.iterator` 를 작성하고 `generator` 함수를 연결하면 반복 할 때마다 `yield`를 수행

  ```tsx
  const obj = {};

  obj[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
  };

  console.log([...obj]);

  // 1. obj의 Symbol.iterator에 제너레이터 함수를 연결 함
  // 2. [...obj]를 실행하면 obj에서 [Symbol.iterator]를 검색함
  // 3. 존재하므로 [Symbol.iterator]()를 실행하며 이터레이터 오브젝트를 생성하여 반환함
  // 4. yield가 끝날 때까지 반복하면서 yield에서 반환된 값을 배열에 첨부 함

  // 실행결과
  // [1,2,3]
  ```

- 연결 구조
  - `Symbol.iterator`의 `__proto__`에 제너레이터 오브젝트가 있는 구조
- 제너레이터 오브젝트에 이터레이터 오브젝트를 연결하여 값을 `공유하는` 형태

  ```tsx
  const gen = function* () {
    yield 10;
    yield 20;
  };

  const genObj = gen();
  console.log(genObj.next());

  const obj = genObj[Symbol.iterator]();
  console.log(obj.next());

  // 1. genObj.next() 첫 번째 yield를 수행하여 10을 반환
  // 2. const obj = genObj[Symbol.iterator](); 제너레이터 오브젝트의 Symbol.iterator() 호출, 이터레이터 오브젝트를 반환
  // 3. obj.next() 제너레이터 함수에서 수행했던 첫 번째 yield는 수행하지 않고 두 번째 yield를 수행하여 값을 반환 함
  // 4. 이터레이터 오브젝트에서 yield 처리를 공유함

  // 실행 결과
  // {value: 10, done: false}
  // {value: 20, done: false}
  ```

  - 제너레이터 오브젝트에 이터레이터 오브젝트가 포함된 구조

```toc

```
