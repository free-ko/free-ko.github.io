---
emoji: ๐จโ๐ป
title: is() - JS ๊ฐ ๋น๊ต
date: '2021-09-22 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  is() - JS์์ ๊ฐ ๋น๊ต ๋ฐฉ๋ฒ
</h1>

<br>

## is()

- ๋ ๊ฐ์ ํ๋ผ๋ฏธํฐ ๊ฐ๊ณผ ๊ฐ ํ์์ ๋น๊ต

  - ๊ฐ์ผ๋ฉด `true`, ์๋๋ฉด `false`

  ```tsx
  const result = Object.is(10, '10');
  console.log(result); // false

  const one = {},
    two = {};
  console.log(Object.is(one, two)); // false
  ```

<br>

- ์ค๋ธ์ ํธ ๋น๊ต ๋ชฉ์ ์ด ์๋

  - `[ ]`์ `[ ]` ๋น๊ต, `{ }`์ `{ }`๋น๊ต๋ `false`

- JS ๊ฐ ๋น๊ต ๋ฐฉ๋ฒ

  - ๊ฐ๊ณผ ํ์๊น์ง ๋ชจ๋ ๋น๊ต: `===`
  - ํ์์ ๋น๊ตํ์ง ์๊ณ  ๊ฐ๋ง ๋น๊ต: `==`

  ```tsx
  console.log(undefined == null); // true
  console.log(undefined === null); // false
  console.log(Object.is(undefined, null)); // false
  ```

<br>

- `Object.is()`์ `===` ๋น๊ต ์ฐจ์ด

  - NaN ๋น๊ต

  ```tsx
  console.log(NaN === NaN); // false
  console.log(Object.is(NaN, NaN)); // true;
  console.log(NaN === 0 / 0); // false;
  console.log(Object.is(NaN, 0 / 0)); // true
  ```

  - +0๊ณผ -0 ๋น๊ต

  ```tsx
  console.log(0 === -0); // true
  console.log(Object.is(0, -0)); // false
  ```

  - ํ์ฉํ ํํ

  ```tsx
  function check(data) {
    if (Object.is(typeof data, 'object')) {
      console.log(data);
    } else {
      console.log('object ํ์์ด ์๋');
    }
  }

  check({ value: 10 });
  check(200);
  ```

```toc

```
