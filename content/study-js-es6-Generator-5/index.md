---
emoji: ๐จโ๐ป
title: yield ๋ฐ๋ณต, ๋ค์์ yield ์ฒ๋ฆฌ
date: '2021-10-14 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  yield ๋ฐ๋ณต, ๋ค์์ yield ์ฒ๋ฆฌ
</h1>

<br>

## 1. yield ๋ฐ๋ณต

```tsx
let status = true;

function* sports() {
  let count = 0;
  while (status) {
    yield ++count;
  }
}

const obj = sports();

console.log(obj.next()); // {value: 1, done: false}
console.log(obj.next()); // {value: 2, done: false}

status = false;
console.log(obj.next()); // {value: undefined, done: true}
```

- `yield` ๋ฅผ ๋ฐ๋ณตํ๋ ํํ ์
- `let status = ture;`
  - `while()` ๋ฌธ์ ์ ์ดํ๊ธฐ ์ํ ์ํ ๊ฐ
- ์ฒซ ๋ฒ ์งธ `next()` ํธ์ถ
  - `let count = 0;` ์ ์คํํ์ฌ `count` ๋ณ์์ 0์ ์ค์  ํจ
  - ๋์  ๊ฐ์ ๊ตฌํ๊ธฐ ์ํ ๊ฒ
- `while(statu) { yield ++count; }`
  - `satus` ๊ฐ `true` ์ด๋ฏ๋ก `yeild` ๋ฅผ ์ํ ํจ
  - `{ value: 1, done: false }` ๋ฐํ
- ๋ ๋ฒ์งธ `next()` ๋ฅผ ํธ์ถ ํจ
  - `status` ๊ฐ `true`์ด๋ฏ๋ก `yield`๋ฅผ ์ํ ํจ
- ์ธ ๋ฒ์งธ `next()` ๋ฅผ ํธ์ถ ํจ
  - `status`๊ฐ `false`์ด๋ฏ๋ก `yield ++count;` ๋ฅผ ์ํํ์ง ์์
  - `{ value: undefined, done: true }` ๋ฐํ
  - `{ done: true }` ์ด๋ฏ๋ก ์ดํฐ๋ ์ดํฐ๋ฅผ ๋ ์ด์ ์ฌ์ฉ ํ  ์ ์์

<br>

## 2. ๋ค์์ yield ์ฒ๋ฆฌ

```tsx
function* sports() {
  return yield yield yield;
}

const obj = sports();

console.log(obj.next()); // {value: undefined, done: false}
console.log(obj.next(10)); // {value: 10, done: false}
console.log(obj.next(20)); // {value: 20, done: false}
console.log(obj.next(30)); // {value: 30, done: true}
```

- ํ ์ค์ ๋ค์์ `yeild`์ `return` ์์ฑ
  - `return yield yield yield;`
- ์ฒซ ๋ฒ์งธ `next()` ํธ์ถ
  - ์ฒซ ๋ฒ์งธ `yield`๋ฅผ ์ํ ํจ
  - `yield`์ ๋ฐํ ๊ฐ์ด ์์ผ๋ฏ๋ก `{ value: undefined, done: false }` ๋ฐํ
- ๋ ๋ฒ์งธ `next(10)` ํธ์ถ
  - ํ๋ผ๋ฏธํฐ ๊ฐ : 10
  - ๋ ๋ฒ์งธ `yield`๋ฅผ ์ํ ํจ
  - ํจ์์ ํ๋ผ๋ฏธํฐ ๊ฐ์ ๋ฐ์ ๋ณ์๊ฐ ์์ผ๋ฉด ํ๋ผ๋ฏธํฐ ๋๊ฒจ์ค ๊ฐ์ ๋ฐํ
  - `{ value: 10, done: false }`
- ์ธ ๋ฒ์งธ `next(20)` ํธ์ถ
  - ํ๋ผ๋ฏธํฐ ๊ฐ : 20
  - ์ธ ๋ฒ์งธ `yeild` ๋ฅผ ์ํ ํจ
  - ํจ์์ ํ๋ผ๋ฏธํฐ ๊ฐ์ ๋ฐ์ ๋ณ์๊ฐ ์์ผ๋ฏ๋ก ํ๋ผ๋ฏธํฐ๋ก ๋๊ฒจ ์ค ๊ฐ์ ๋ฐํ
  - `{ value: 20, done: false }` ๋ฐํ
- ๋ค ๋ฒ์งธ `next(30)` ํธ์ถ
  - ํ๋ผ๋ฏธํฐ ๊ฐ: 30
  - ์ฒ๋ฆฌํ  `yield` ๊ฐ ์์ผ๋ฏ๋ก `done: true` ๋ฐํ
  - `return`๋ฌธ์ ์์ฑํ์ผ๋ฏ๋ก ํ๋ผ๋ฏธํฐ๋ก ๋๊ฒจ ์ค ๊ฐ์ ๋ฐํ `{ value: 30, done: true }` ๋ฐํ
- `return` ๋ฌธ์ ์์ฑํ์ง ์์ผ๋ฉด
  - 30์ด ์๋ `undefined` ๋ฐํ `{value: undefined, done: true}`

```toc

```
