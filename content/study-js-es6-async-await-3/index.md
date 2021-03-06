---
emoji: ๐จโ๐ป
title: async/await - Symbol.asyncIterator,  Symbol.iterator์ ์ฐจ์ด
date: '2021-12-24 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  async/await - Symbol.asyncIterator,  Symbol.iterator์ ์ฐจ์ด
</h1>

<br>

## 1. Symbol.asyncIterator

- `Symbol.asyncIterator` ๋ `for-await-of`์ ๋์ํ๋ `Well-known Symbol`์ด๋ฉด ๋น๋๊ธฐ๋ก ๋ฐ๋ณต์ ์คํ ํจ
- `Well-known Symbol` ์ 12๊ฐ์
- `Symbol.iterator` ์ ์ฐจ์ด
- `Symbol.asyncIterator()` ๋ฅผ ํธ์ถํ๋ฉด `AsyncIterator` ์ธ์คํด์ค๋ฅผ ์์ฑํ์ฌ ๋ฐํํจ
- ์์ฑํ ์ธ์คํด์ค์ `next()`๋ฅผ ํธ์ถํ๋ฉด `{value: ๊ฐ, done: false}` ํํ๋ก ๋ฐํํ๋ฉฐ ์ด ๊ฐ์ `Promise.resolve()` ์ ํ๋ผ๋ฏธํฐ ๊ฐ์ผ๋ก ์ฌ์ฉํจ
- `for-await-of` ๋ก ๋ฐ๋ณตํจ
- `Symbol.asyncIterator` ์ ์ ๋๋ ์ดํฐ ํจ์

  ```tsx
  async function* point() {
    yield 10;
  }

  const gen = point();

  console.log(gen[Symbol.toStringTag]);
  console.log(gen[Symbol.asyncIterator]);
  console.log(gen[Symbol.asyncIterator]().next);

  // 1. const gen = point(); AsyncGenerator ์ธ์คํด์ค๋ฅผ ์์ฑํ์ฌ ๋ฐํํจ
  // 2. gen[Symbol.toStringTag], AsyncGenerator๋ฅผ ์ถ๋ ฅํจ
  // 3. gen[Symbol.asyncIterator, gen ์ธ์คํด์ค์ Symbol.asyncIterator๋ฅผ ์ถ๋ ฅํ๋ฉฐ ํจ์๊ฐ ์ถ๋ ฅ๋จ
  // 4. gen[Symbol.asyncIterator]().next, asyncIterator ์ธ์คํด์ค๋ฅผ ์์ฑํ์ฌ ๋ฐํํ๋ฉฐ ์ธ์คํด์ค์๋ next()๊ฐ ์์

  // ์คํ๊ฒฐ๊ณผ
  // AsyncGenerator
  // function[Symbol.asyncIterator]() { [native code] }
  // function next() { [native code] }
  ```

- `for-await-of` ๋ฐ๋ณต

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

  // 1. for await (const point of gen) {...}, gen์ AsyncGenerator ์ธ์คํด์ค ์ gen์ Symbol.asyncIterator()๋ฅผ ํธ์ถํจ
  // 2. AsyncIterator ์ธ์คํด์ค๋ฅผ ์์ฑํ์ฌ ๋ฐํํ๋ฉฐ ์ธ์คํด์ค์ next()๋ฅผ ํธ์ถํจ
  // 3. yield 10์ { value: 10, done: false }๋ก ๋ฐํํ๋ฉฐ Promise.resolve(param)์ ํ๋ผ๋ฏธํฐ ๊ฐ์ผ๋ก ์ฌ์ฉํ์ฌ for-await-of๋ก ๋ณด๋
  // 4. { value: 10 }์์ 10์ point์ ์ค์ ํจ

  // ์คํ๊ฒฐ๊ณผ
  // 10
  // 20
  ```

```toc

```
