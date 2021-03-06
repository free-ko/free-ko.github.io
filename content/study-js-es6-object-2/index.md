---
emoji: ๐จโ๐ป
title: ์ค๋ธ์ ํธ ๋ณต์ฌ - assign()
date: '2021-09-23 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  ์ค๋ธ์ ํธ ๋ณต์ฌ: assign(), ์ฒซ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ ์์ฑ, ๋ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ ์์ฑ
</h1>

<br>

## 1. assgin()

- ๋ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ ์ค๋ธ์ ํธ ํ๋กํฐํผ๋ฅผ

  - ์ฒซ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ ์ค๋ธ์ ํธ์ ๋ณต์ฌํ๊ณ  ์ฒซ ๋ฒ์งธ๋ฅผ ๋ฐํ
  - `own property`๋ง ๋ณต์ฌ

  ```tsx
  const sports = {
    event: '์ถ๊ตฌ',
    player: 11,
  };

  let dup = {};

  Object.assign(dup, sports);

  console.log(dup); // {event: ์ถ๊ตฌ, player: 11}
  ```

<br>

## 2. ์ฒซ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ ์์ฑ

```tsx
try {
  const obj = Object.assign(null, {});
} catch (e) {
  console.log('null ์์ฑ ๋ถ๊ฐ');
}
```

1. ์ฒซ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ๋ฅผ ์์ฑํ์ง ์๊ฑฐ๋ `null`, `undefined`๋ฅผ ์์ฑํ๋ฉด `TypeError`

- `Number`, `String`, `Symbol`, `Boolean` ๊ฐ ์์ฑ

```tsx
const obj = Object.assign(100);

console.log(obj.valueOf()); // 100
```

1. ์ฒซ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ `Number` ๋ฅผ ์์ฑํ๊ณ  ๋ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ๋ฅผ ์์ฑํ์ง ์์
2. `Number` ์ธ์คํด์ค๋ฅผ ์์ฑํ์ฌ ํ๋ผ๋ฏธํฐ ๊ฐ 100์ `[[PrimitiveValue]]`์ ์ค์  ํจ
3. ์์ฑํ ์ธ์คํด์ค๋ฅผ ๋ฐํํจ
4. `Boolean`, `String`, `Symbol`๋ ๊ฐ์ ๋ฐฉ๋ฒ์ผ๋ก ์ฒ๋ฆฌ

<br>

## 3. ๋ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ ์์ฑ

- ์ด๋ฌ ๊ฐ๋ฅ ์ค๋ธ์ ํธ ์์ฑ

  ```tsx
  let obj = {};
  Object.assign(obj, { ten: 10 });

  console.log(obj); // {ten: 10}

  const one = Object.create(
    {},
    {
      book: { value: 100, enumerable: false },
      sports: { value: 200, enumerable: true },
    },
  );

  Object.assign(obj, one);

  console.log(obj); // {ten: 10, sports: 200}
  ```

- ์ค๋ธ์ ํธ ๋ค์ ์์ฑ

  ```tsx
  const book = { title: '์ฑ' };
  const sports = { item: '์ถ๊ตฌ' };

  const obje = Object.assign({}, book, sports);

  console.log(obj); // {title: ์ฑ, item: ์ถ๊ตฌ}

  // 1. ๋ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ ์ดํ์ ์ฝค๋ง๋ก ๊ตฌ๋ถํ์ฌ ์ค๋ธ์ ํธ๋ฅผ ์์ฑํ  ์ ์์
  ```

- ๊ฐ์ ์์ฑ

  ```tsx
  let obj = { ten: 10 };
  Object.assign(obj, undefined, null, 200);

  console.log(obj); // {ten:10}

  const one = { un: undefined, nu: null };
  Object.assign(obj, one);

  console.log(obj); // {ten: 10, un: undefined, nu: null}

  // 1. ๊ฐ์ผ๋ก ์์ฑํ undefined, null, 200์ด ๋ณต์ฌ๋์ง ์์
  // 2. ์ด๊ฑฐ ๊ฐ๋ฅํ ์ค๋ธ์ ํธ๊ฐ ์๋๊ธฐ ๋๋ฌธ
  ```

- ๊ฐ๊ณผ ์ค๋ธ์ ํธ๋ฅผ ์์ฑ

  ```tsx
  const obj = Object.assign(100, { book: 200 });

  console.log(obj.valueOf()); // 100
  console.log(obj.book); // 200

  // 1. 100์ด๋ฏ๋ก Number ์ธ์คํด์ค๋ฅผ ์์ฑํจ
  // 2. ๋ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ๊ฐ Object์ด๋ฏ๋ก ์์ฑํ Number ์ธ์คํด์ค์ ๋ณต์ฌํจ
  // 3. Number ์ธ์คํด์ค์ Object๋ฅผ ๋ณต์ฌํ๋ ๊ฒ์ ๋ฐ์ดํฐ ํ์์ด ๋ง์ง ์์
  // 4. Object์ด๋ฏ๋ก ๋ณต์ฌ๊ฐ๋๋ค๋ ๊ฒ์ ์ค๋ชํ๊ธฐ ์ํ ๊ฒ
  ```

  - ๊ฐ์ด ์ค์ ๋ ์ธ์คํด์ค ํํ

  ```tsx
  'use strict';

  const obj = Object.assign(100, { book: 200 });

  /*
  	1. ์ค๋ฅธ์ชฝ obj๋ฅผ ํผ์น๋ฉด
  	- book: 200์ด ์์ผ๋ฉฐ Object์์ ์ฌ์ฉํ๋
  	- ํ๋กํผํฐ ํํ ์
  
  	2. __proto__์ Number ์ค๋ธ์ ํธ์ ๋ฉ์๋๊ฐ ์์
  
  	3. [[PrimitiveValue]]: 100
  	- ํ๋ฆฌ๋ฏธํฐ๋ธ ๊ฐ์ ๋ํ๋ด๋ฉฐ,
  	- ์ฒซ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ ์์ฑํ 100์
  */
  ```

```toc

```
