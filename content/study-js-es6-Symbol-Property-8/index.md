---
emoji: ๐จโ๐ป
title: Symbol.iterator์ ์ ๋๋ ์ดํฐ ํจ์ ์ฐ๊ฒฐ
date: '2021-10-28 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐ Symbol.iterator์ ์ ๋๋ ์ดํฐ ํจ์ ์ฐ๊ฒฐ
</h1>

<br>

## generator ํจ์ ์ฐ๊ฒฐ

- `Object{}` ์ `Symbol.iterator` ๋ฅผ ์์ฑํ๊ณ  `generator` ํจ์๋ฅผ ์ฐ๊ฒฐํ๋ฉด ๋ฐ๋ณต ํ  ๋๋ง๋ค `yield`๋ฅผ ์ํ

  ```tsx
  const obj = {};

  obj[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
  };

  console.log([...obj]);

  // 1. obj์ Symbol.iterator์ ์ ๋๋ ์ดํฐ ํจ์๋ฅผ ์ฐ๊ฒฐ ํจ
  // 2. [...obj]๋ฅผ ์คํํ๋ฉด obj์์ [Symbol.iterator]๋ฅผ ๊ฒ์ํจ
  // 3. ์กด์ฌํ๋ฏ๋ก [Symbol.iterator]()๋ฅผ ์คํํ๋ฉฐ ์ดํฐ๋ ์ดํฐ ์ค๋ธ์ ํธ๋ฅผ ์์ฑํ์ฌ ๋ฐํํจ
  // 4. yield๊ฐ ๋๋  ๋๊น์ง ๋ฐ๋ณตํ๋ฉด์ yield์์ ๋ฐํ๋ ๊ฐ์ ๋ฐฐ์ด์ ์ฒจ๋ถ ํจ

  // ์คํ๊ฒฐ๊ณผ
  // [1,2,3]
  ```

- ์ฐ๊ฒฐ ๊ตฌ์กฐ
  - `Symbol.iterator`์ `__proto__`์ ์ ๋๋ ์ดํฐ ์ค๋ธ์ ํธ๊ฐ ์๋ ๊ตฌ์กฐ
- ์ ๋๋ ์ดํฐ ์ค๋ธ์ ํธ์ ์ดํฐ๋ ์ดํฐ ์ค๋ธ์ ํธ๋ฅผ ์ฐ๊ฒฐํ์ฌ ๊ฐ์ `๊ณต์ ํ๋` ํํ

  ```tsx
  const gen = function* () {
    yield 10;
    yield 20;
  };

  const genObj = gen();
  console.log(genObj.next());

  const obj = genObj[Symbol.iterator]();
  console.log(obj.next());

  // 1. genObj.next() ์ฒซ ๋ฒ์งธ yield๋ฅผ ์ํํ์ฌ 10์ ๋ฐํ
  // 2. const obj = genObj[Symbol.iterator](); ์ ๋๋ ์ดํฐ ์ค๋ธ์ ํธ์ Symbol.iterator() ํธ์ถ, ์ดํฐ๋ ์ดํฐ ์ค๋ธ์ ํธ๋ฅผ ๋ฐํ
  // 3. obj.next() ์ ๋๋ ์ดํฐ ํจ์์์ ์ํํ๋ ์ฒซ ๋ฒ์งธ yield๋ ์ํํ์ง ์๊ณ  ๋ ๋ฒ์งธ yield๋ฅผ ์ํํ์ฌ ๊ฐ์ ๋ฐํ ํจ
  // 4. ์ดํฐ๋ ์ดํฐ ์ค๋ธ์ ํธ์์ yield ์ฒ๋ฆฌ๋ฅผ ๊ณต์ ํจ

  // ์คํ ๊ฒฐ๊ณผ
  // {value: 10, done: false}
  // {value: 20, done: false}
  ```

  - ์ ๋๋ ์ดํฐ ์ค๋ธ์ ํธ์ ์ดํฐ๋ ์ดํฐ ์ค๋ธ์ ํธ๊ฐ ํฌํจ๋ ๊ตฌ์กฐ

```toc

```
