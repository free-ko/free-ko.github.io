---
emoji: ๐จโ๐ป
title: yield ๋ถํ  ํ ๋น, for-of ๋ฐ๋ณต
date: '2021-10-15 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  yield ๋ถํ  ํ ๋น, for-of ๋ฐ๋ณต
</h1>

## 1. yield ๋ถํ  ํ ๋น

```tsx
function* sports() {
  return [yield yield];
}

const obj = sports();

console.log(obj.next()); // {value: undefined, done: false}
console.log(obj.next(10)); // {value: 10, done: false}

const last = obj.next(20);

console.log(last); // {value: [20], done: true}
console.log(last.value); // [20]
```

- ๋๊ดํธ`[ ]` ์์ ๋ค์์ `yield` ์์ฑ
  - `return [yield yield];`
- `next()`, `next(10)` ํธ์ถ
  - `yield` ๋ฅผ ์ฐ์ํด์ ์์ฑํ ๊ฒ๊ณผ ๊ฐ์
  - `yield` ๋ฅผ 2๊ฐ ๋ชจ๋ ์ํํ์ผ๋ฏ๋ก ๋ ์ด์ ์ฒ๋ฆฌํ  `yield` ๊ฐ ์์
- ์ธ ๋ฒ์งธ `next(20)` ํธ์ถ
  - ํ๋ผ๋ฏธํฐ ๊ฐ : 20
  - `return [yield, yield]`์์
  - `{value: [20], done: true}` ํํ๋ก ๋ฐํ
  - `[20]`์ฒ๋ผ `[ ]` ์์ ํ๋ผ๋ฏธํฐ ๊ฐ 20์ ๋ฃ์ด์ ๋ฐํ
- `console.log()` ์ `{value: Array(1)}` ํํ๋ก ํ์๋์ง๋ง ๊ฐ๋์ฑ์ ์ํด ํธ์ง ํจ

<br>

## 2. for-of ๋ฌธ์ผ๋ก ๋ฐ๋ณต

```tsx
function* sports(count) {
  while (true) {
    yield ++count;
  }
}

for (let point of sports(10)) {
  console.log(point);
  if (point > 12) {
    break;
  }
}

// 11
// 12
// 13
```

- `for-of` ๋ฌธ์ผ๋ก ์ ๋๋ ์ดํฐ๋ฅผ ๋ฐ๋ณต ํธ์ถ
- ์ฒ์ `for-of` ๋ฌธ์ ์์ํ๋ฉด
  - `sports(10)` ์ผ๋ก ์ ๋๋ ์ดํฐ ์ค๋ธ์ ํธ๋ฅผ ์์ฑํจ
  - ์ ๋๋ ์ดํฐ ์ค๋ธ์ ํธ์ 10์ด ์ค์ ๋จ
  - ์์ฑํ ์ ๋๋ ์ดํฐ ์ค๋ธ์ ํธ๋ฅผ ์ ์ฅํ  ๋ณ์๊ฐ ์์ผ๋ฉฐ ์์ง ๋ด๋ถ์ ์ ์ฅํจ
  - `const engine = sports(10);` ๊ณผ ๊ฐ์ผ๋ฉฐ `engine`์ด ์์ง ๋ด๋ถ์ ์ด๋ฆ์ผ๋ก ๊ฐ์ ํจ
- ๋ค์ `sports*()` ๋ฅผ ํธ์ถ ํจ
  - `engine.next()` ์ ๊ฐ์ง๋ง ๋ฐํ ๊ฐ์ด ๋ค๋ฆ
  - `while(true){ yield ++count }`๋ฅผ ์คํ ํจ
  - `{value: 11, done: false}` ๋ฅผ ๋ฐํํ์ง ์๊ณ  `value` ๋ง `point` ๋ณ์์ ์ค์ ํจ
- `{done: true}` ๋ก ์ข๋ฃ ์ฒ๋ฆฌ๋ฅผ ํ  ์ ์์ผ๋ฏ๋ก
  - `break;` ๋ฅผ ์ฌ์ฉํ์ฌ ์ข๋ฃ์์ผ์ผ ํจ
- `for-of` ๋ธ๋ก์ ์คํํจ
  - 11์ ์ถ๋ ฅ ํจ
  - `value` ๊ฐ์ด 11์ด๋ฏ๋ก ๋ค์ `for-of` ๋ฌธ์ ์ํ
  - `while(true){ yield ++count}` ๋ฅผ ์ํ
- ์ด๋ ๊ฒ `break;` ๋ฅผ ๋ง๋  ๋ ๊น์ง
  - ๋ฐ๋ณตํ์ฌ `yield ++count;` ๋ฅผ ์คํ ํจ

<br>

```toc

```
