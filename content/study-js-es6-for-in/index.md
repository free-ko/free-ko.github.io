---
emoji: ๐จโ๐ป
title: for-of, for-in for-of ์ฐจ์ด, for-of Object
date: '2021-09-12 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐ for-of, for-in for-of ์ฐจ์ด, for-of Object
</h1>

<br>

## 1. For-Of

- `Syntax: for (variable of iterable) { }`
- ์ดํฐ๋ฌ๋ธ ์ค๋ธ์ ํธ๋ฅผ ๋ฐ๋ณต

  ```tsx
  const list = [1, 2, 3];

  for (let k = 0; k < list.length; k++) {
    console.log(list[k]);
  }

  for (let value of list) {
    console.log(value);
  }
  ```

- Iterable

  - ์ดํฐ๋ฌ๋ธ ์ค๋ธ์ ํธ๋ฅผ ์์ฑ
  - ํํ์์ ์์ฑํ๋ฉด ํ๊ฐ ๊ฒฐ๊ณผ๋ฅผ ์ฌ์ฉ

- Variable

  - ๋ณ์ ์ด๋ฆ ์์ฑ
  - ์ดํฐ๋ฌ๋ธ ์ค๋ธ์ ํธ๋ฅผ ๋ฐ๋ณตํ  ๋๋ง๋ค Variable์ ๊ฐ์ด ํ ๋น๋จ

- ๋ฐฐ์ด

  - ๋ฐฐ์ด์ ๋ฐ๋ณตํ๋ฉด์ ์๋ฆฌ๋จผํธ๋ฅผ ํ๋์ฉ ์ ๊ฐ

  ```tsx
  for (let value of [1, 2, 3]) {
    console.log(value);
  }
  ```

- String

  - ๋ฌธ์์ด์ ๋ฐ๋ณตํ๋ฉด์ ๋ฌธ์๋ฅผ ํ๋์ฉ ์ ๊ฐ

  ```tsx
  for (let value of 'ABC') {
    console.log(value);
  }

  // A
  // B
  // C
  ```

- NodeList

  - NodeList๋ฅผ ๋ฐ๋ณตํ๋ฉด์ ์๋ฆฌ๋จผํธ๋ฅผ ํ๋์ฉ ์ ๊ฐ

  ```html
  <ul>
    <li class="show">์ฒซ ๋ฒ์งธ</li>
    <li class="show">๋ ๋ฒ์งธ</li>
    <li class="show">์ธ ๋ฒ์งธ</li>
  </ul>
  ```

  ```tsx
  const nodes = document.querySelectorAll('.show');

  for (let node of nodes) {
    console.log(node.textContent);
  }

  // ์ฒซ ๋ฒ์งธ
  // ๋ ๋ฒ์งธ
  // ์ธ ๋ฒ์งธ
  ```

<br>

## 2. For-in, For-of์ ์ฐจ์ด

- for-in

  - ์ด๊ฑฐ ๊ฐ๋ฅํ ํ๋กํผํฐ๊ฐ ๋์
  - `{key: value}` ํํ๋ ๋ํดํธ๊ฐ `enumerable: true`
  - `Object.defineProperty()`๋ ๋ํดํธ๊ฐ `enumerable: false`

  ```tsx
  const obj = {};

  Object.definedProperties(obj, {
    sports: {
      enumerable: false,
      value: '์คํฌ์ธ ',
    },

    book: {
      enumerable: true,
      value: '์ฑ',
    },
  });

  for (let item in obj) {
    console.log(item + ': ' + obj[item]);
  }

  // book: ์ฑ
  ```

- for-of
  - ์ดํฐ๋ฌ๋ธ ์ค๋ธ์ ํธ๊ฐ ๋์
  - Object๋ ์ ๊ฐ๋์ง ์์
  - Property์ ํ๋กํผํฐ๋ ์ ๊ฐ๋์ง ์์

<br>

## 3. for-of, Object

- Object๋ ์ดํฐ๋ฌ๋ธ ์ค๋ธ์ ํธ๊ฐ ์๋๋ฏ๋ก for-of ์ฌ์ฉ ๋ถ๊ฐ
- Object๋ฅผ `for-of`๋ก ์ ๊ฐํ  ์ ์๋ ๋ฐฉ๋ฒ

  - `Object.keys()`๋ก ํ๋กํผํฐ ์ด๋ฆ์ ๋ฐฐ์ด๋ก ๋ง๋ค๊ณ 
  - ๋ง๋  ๋ฐฐ์ด์ `for-of`๋ก ์ ๊ฐ

  ```tsx
  const sports = {
    soccer: '์ถ๊ตฌ',
    baseball: '์ผ๊ตฌ',
  };

  const keyList = Object.keys(sports);

  for (let key of keyList) {
    console.log(key + ': ' + sports[key]);
  }

  // soccer: ์ถ๊ตฌ
  // baseball: ์ผ๊ตฌ
  ```

```toc

```
