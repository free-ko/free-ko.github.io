---
emoji: ๐จโ๐ป
title: yield* ํํ์
date: '2021-10-17 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  yield* ํํ์
</h1>

## `yield*`

- `Syntax: yield*` ํํ์
- `yield*` ์ ํํ์์ ๋ฐ๋ผ ์ฒ๋ฆฌํ๋ ๋ฐฉ๋ฒ์ด ๋ค๋ฆ
- `yield*`์ ํํ์์ด ๋ฐฐ์ด

  - `next()` ๋ก ํธ์ถํ  ๋๋ง๋ค ๋ฐฐ์ด์ ์๋ฆฌ๋จผํธ๋ฅผ ํ๋์ฉ ์ฒ๋ฆฌ

  ```tsx
  function* sports() {
    yield* [10, 20];
  }

  const obj = sports();

  console.log(obj.next());
  console.log(obj.next());

  // 1. ์ฒซ ๋ฒ์งธ์ obj.next()๋ฅผ ํธ์ถํ๋ฉด yield* [10,20]์์ 10์ ๋ฐํํจ {value: 10, done: false} ๋ฐํ
  // 2. ๋ ๋ฒ์งธ์ obj.next()๋ฅผ ํธ์ถํ๋ฉด yield* [10,20]์์ 20์ ๋ฐํํจ {value: 20, done: false} ๋ฐํ
  // 3. yield*์ ํํ์์ด ๋ฐฐ์ด์ด๋ฉด next()๋ฅผ ํธ์ถํ  ๋๋ง๋ค ๋ฐฐ์ด์ ์๋ฆฌ๋จผํธ๋ฅผ ์์๋๋ก ๋ฐํํจ
  ```

<br>

- `yield*`์ ํํ์์ด ์ ๋๋ ์ดํฐ ํจ์

  - ํจ์์ `yield`๋ฅผ ๋จผ์  ์ฒ๋ฆฌ

  ```tsx
  function* point(count) {
    yield count + 5;
    yield count + 10;
  }

  function* sports(value) {
    yield* point(value);
    yield value + 20;
  }

  const obj = sports(10);

  console.log(obj.next()); // {value: 15, done: false}
  console.log(obj.next()); // {value: 20, done: false}
  console.log(obj.next()); // {value: 30, done: false}

  // 1. ์ฒซ ๋ฒ์งธ์ obj.next()๋ฅผ ํธ์ถํ๋ฉด yield* point(value)๋ฅผ ์คํํฉ๋๋ค.
  // 2. yield*์ ํํ์์ ํจ์๋ฅผ ์์ฑํ์ผ๋ฏ๋ก point(value)๋ฅผ ํธ์ถํจ, point()๊ฐ ์ ๋๋ ์ดํฐ ํจ์์ด๋ฏ๋ก ์ฐ์ , ์ ๋๋ ์ดํฐ ์ค๋ธ์ ํธ๋ฅผ ์์ฑํจ
  // 3. next()๋ก ํธ์ถํด์ผ yield๊ฐ ์ํ๋์ง๋ง ์๋์ ์ผ๋ก point() ์ฒซ ๋ฒ์งธ์ yield count+5๋ฅผ ์ํํจ, {value: 15, done: false} ๋ฐํ
  // 4. ๋ค์ point()๋ฅผ ํธ์ถํ ๊ณณ์์ ๋ฐํ ๊ฐ์ ๋ฐ์ ๋ฐํํจ
  // 5. ๋ ๋ฒ์งธ์ obje.next()๋ฅผ ํธ์ถํจ point()์ yield count +10๋ฅผ ์คํ ํจ {value: 20, done: false} ๋ฐํ
  // 6. ์ธ ๋ฒ์งธ์ obj.next()๋ฅผ ํธ์ถํจ point()์ yield๋ฅผ ๋ชจ๋ ์ฒ๋ฆฌ ํ์ผ๋ฏ๋ก sports()์ yield value +20์ ์คํํ๋ฉฐ {value: 30, done: false} ๋ฐํ
  ```

<br>

- `yield*` ํํ์์์ ์์  ํธ์ถ

  - ์ฌ๊ท ํธ์ถ

  ```tsx
  function* sports(point) {
    yield point;
    yield* sports(point + 10);
  }

  const obj = sports(10);

  console.log(obj.next()); // {value: 10, done: false}
  console.log(obj.next()); // {value: 20, done: false}
  console.log(obj.next()); // {value: 30, done: false}

  // 1. ์ฒซ ๋ฒ์งธ์ obj.next()๋ฅผ ํธ์ถํ๋ฉด yield point๋ฅผ ์คํ {value: 10, done: false} ๋ฐํ
  // 2. ๋ ๋ฒ์งธ์ obj.next()๋ฅผ ํธ์ถํจ, yield* sports(point + 10)์์ ์์ ์ ํธ์ถ ํจ, ์ฒซ ๋ฒ์งธ ์ค์ yield point๋ฅผ ์คํ {value: 20, done: false} ๋ฐํ
  // 3. ์ธ ๋ฒ์งธ์ obj.next()๋ฅผ ํธ์ถํจ, yield* sports(point + 10)์์ ์์ ์ ํธ์ถ ํจ, ์ฒซ ๋ฒ์งธ ์ค์ yield point๋ฅผ ์คํ {value: 30, done: false} ๋ฐํ
  // 4. ์ฃผ์ : yield point๊ฐ ์์ผ๋ฉด ๋ฌดํ ๋ฐ๋ณต ํจ
  ```

```toc

```
