---
emoji: ๐จโ๐ป
title: Symbol ์ฌ์ฉ ํํ
date: '2021-10-20 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  Symbol ์ฌ์ฉ ํํ
</h1>

<br>

## Symbol ์ฌ์ฉ ํํ

- `Object` ํ๋กํผํฐ ํค๋ก ์ฌ์ฉ

  - `Symbol` ๊ฐ์ด ์ ์ผํ๋ฏ๋ก ์ค๋ณต๋์ง ์์
  - `symbol-keyed property` ๋ผ๊ณ  ๋ถ๋ฆ

    ```tsx
    const sym = Symbol('์ค๋ช');
    const obj = { [sym]: 100 };

    // 1. const obj = {[sym]j: 100};
    // 2. Symbol ๊ฐ์ Object์ ํ๋กํผํฐ ํค๋ก ์ฌ์ฉํ์
    // 3. [sym]์ฒ๋ผ ๋๊ดํธ ์์ Symbol()๋ก ํ ๋นํ ๋ณ์ ์ด๋ฆ์ ์์ฑ ํจ
    // 4. ์ด๋ฅผ symbol-keyed property๋ผ๊ณ  ๋ถ๋ฆ
    ```

  - ํ๋กํผํฐ ๊ฐ ์ถ์ถ ๋ฐฉ๋ฒ

    ```tsx
    const sym = Symbol('์ค๋ช');
    const obj = { [sym]: 100 };

    console.log(obj[sym]); // 100
    console.log(obj.sym); // undefined

    // 1. obj[sym] Symbol() ๊ฒฐ๊ณผ๋ฅผ ํ ๋นํ sym์ ํ๋กํผํฐ ํค๋ก ์ฌ์ฉํ์ฌ ๊ฐ์ ๊ตฌํจ
    // 2. ํ๋กํผํฐ ๊ฐ์ธ 100์ด ์ถ๋ ฅ ๋จ
    // 3. obj.sym undefined๊ฐ ์ถ๋ ฅ๋๋ฉฐ obj[sym] ํํ๋ฅผ ์ฌ์ฉํด์ผ ํจ
    ```

- `Object` ์์ ํจ์ ์ด๋ฆ์ผ๋ก ์ฌ์ฉ

  ```tsx
  const sym = Symbol('ํจ์ ์ด๋ฆ');
  const obj = {
    [sym](param) {
      return apram;
    },
  };

  console.log(obj[sym](200)); // 200

  // 1. [sym](param){} ํํ๋ก ํจ์๋ฅผ ์ ์ํ๊ณ 
  // 2. obj[sym](200) ํํ๋ก ํธ์ถํจ
  ```

- `for-in` ๋ฌธ์์ ์ฌ์ฉ

  - `Symbol`์ด ์ด๊ฑฐ๋์ง ์์
  - `[[Enumerable]]: false` ์ด๊ธฐ ๋๋ฌธ

    ```tsx
    const obj = {
      [Symbol('100')]: 100,
      two: 200,
    };

    for (let key in obj) {
      console.log(key);
    }

    // 1. Object์ Symbol-keyed ํ๋กํผํฐ๋ฅผ ์ฌ์ฉํ์ฌ ํ๋กํผํฐ ๊ฐ์ ์์ฑํ์
    // 2. for-in ๋ฌธ์ผ๋ก ์ด๊ฑฐ๋์ง ์์, ์๋ฌ๊ฐ ๋์ง ์์
    // ์คํ ๊ฒฐ๊ณผ
    // two
    ```

- `Object.getOwnPropertySymbols()`๋ก ์ด๊ฑฐ ๊ฐ๋ฅ
- `for-of` ๋ฌธ์์ ์ฌ์ฉ

  - ๋ฐฐ์ด ์์ `Symbol()` ์์ฑ

    ```tsx
    const list = [Symbol('100')];
    for (let value of list) {
      console.log(value);
    }

    // ์คํ๊ฒฐ๊ณผ
    Symbol(100);
    ```

- `JSON.stringify()` ์์ ์ฌ์ฉ

  - `Symbol` ๊ฐ์ด ๋ฌธ์์ด๋ก ๋ณํ๋์ง ์์

    ```tsx
    const sym = Symbol('JSON');
    const result = JSON.stringify({ [sym]: 'ABC' });

    console.log(result); // {}

    // 1. JSON.stringify()๋ Object์ ํ๋กํผํฐ ํค์ ๊ฐ์ {"key": "value"} ํํ๋ก ๋ณํ ํจ
    // 2. Symbol์ ๋ณํ์์ ์ ์ธ ๋จ
    // 3. ์ด๊ฒ์ Symbol ๊ฐ์ ์ธ๋ถ์ ๋ธ์ถํ์ง ์๊ธฐ ์ํด์ ์
    // 4. ๋น ์ค๋ธ์ ํธ๊ฐ ๋ฐํ๋จ
    ```

```toc

```
