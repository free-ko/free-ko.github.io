---
emoji: 👨‍💻
title: async/await - Symbol.asyncIterator,  Symbol.iterator와 차이
date: '2021-12-24 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  async/await - Symbol.asyncIterator,  Symbol.iterator와 차이
</h1>

<br>

## 1. Symbol.asyncIterator

- `Symbol.asyncIterator` 는 `for-await-of`에 대응하는 `Well-known Symbol`이면 비동기로 반복을 실행 함
- `Well-known Symbol` 은 12개임
- `Symbol.iterator` 와 차이
- `Symbol.asyncIterator()` 를 호출하면 `AsyncIterator` 인스턴스를 생성하여 반환함
- 생성한 인스턴스의 `next()`를 호출하면 `{value: 값, done: false}` 형태로 반환하며 이 값을 `Promise.resolve()` 의 파라미터 값으로 사용함
- `for-await-of` 로 반복함
- `Symbol.asyncIterator` 와 제너레이터 함수

  ```tsx
  async function* point() {
    yield 10;
  }

  const gen = point();

  console.log(gen[Symbol.toStringTag]);
  console.log(gen[Symbol.asyncIterator]);
  console.log(gen[Symbol.asyncIterator]().next);

  // 1. const gen = point(); AsyncGenerator 인스턴스를 생성하여 반환함
  // 2. gen[Symbol.toStringTag], AsyncGenerator를 출력함
  // 3. gen[Symbol.asyncIterator, gen 인스턴스의 Symbol.asyncIterator를 출력하며 함수가 출력됨
  // 4. gen[Symbol.asyncIterator]().next, asyncIterator 인스턴스를 생성하여 반환하며 인스턴스에는 next()가 있음

  // 실행결과
  // AsyncGenerator
  // function[Symbol.asyncIterator]() { [native code] }
  // function next() { [native code] }
  ```

- `for-await-of` 반복

  ```tsx
  async function* point() {
    yield 10;
    yield 20;
  }

  const gen = point();

  async function show() {
    for await (const point of gen) {
      console.log(point);
    }
  }

  show();

  // 1. for await (const point of gen) {...}, gen은 AsyncGenerator 인스턴스 임 gen의 Symbol.asyncIterator()를 호출함
  // 2. AsyncIterator 인스턴스를 생성하여 반환하며 인스턴스의 next()를 호출함
  // 3. yield 10을 { value: 10, done: false }로 반환하며 Promise.resolve(param)의 파라미터 값으로 사용하여 for-await-of로 보냄
  // 4. { value: 10 }에서 10을 point에 설정함

  // 실행결과
  // 10
  // 20
  ```

```toc

```
