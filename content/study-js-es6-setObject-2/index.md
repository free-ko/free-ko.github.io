---
emoji: ๐จโ๐ป
title: ๊ฐ  ์ค์ , ์ถ์ถ ๋ฉ์๋ - add(), has()
date: '2021-11-11 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  ๊ฐ  ์ค์ , ์ถ์ถ ๋ฉ์๋ - add(), has()
</h1>

<br>

## 1. add()

- `Set` ์ธ์คํด์ค ๋์ `value` ์ถ๊ฐ

  ```tsx
  let obj = new Set();
  obj.add('์ถ๊ตฌ').add('๋๊ตฌ');
  obj.add('์ถ๊ตฌ');

  for (let value of obj) {
    console.log(value);
  }

  // add()๋ฅผ ์คํํ ํ ์ธ์คํด์ค๋ฅผ ๋ฐํํ๋ฏ๋ก method chain ํํ๋ก add()๋ฅผ ์์ฑํ  ์ ์์
  // add()์์ "์ถ๊ตฌ"๊ฐ ์์ผ๋ฏ๋ก ์ฒจ๋ถ๋์ง ์์

  // ์คํ ๊ฒฐ๊ณผ
  // ์ถ๊ตฌ
  // ๋๊ตฌ
  ```

- ์ฌ์ฉ ํํ

  - ํจ์๋ฅผ ์์ฑํ์ฌ `value`๋ก ์ฌ์ฉ

    ```tsx
    let obj = new Set();
    obj.add(function sports() {
      return 100;
    });
    obj.add(function sports() {
      return 200;
    });

    for (let value of obj) {
      console.log(value);
    }

    // 1. ๊ฐ์ ์ด๋ฆ์ function์ ์์ฑํ ํํ
    // 2. Function ์ค๋ธ์ ํธ์ ๋ฉ๋ชจ๋ฆฌ ์ฃผ์๊ฐ ๋ค๋ฅด๋ฏ๋ก ์ด๋ฆ์ด ๊ฐ๋๋ผ๋ ์ค์ ๋จ
    // 3. for-of๋ก ์ ๊ฐ๋ value์ ํจ์๊ฐ ์ค์ ๋๋ฏ๋ก ํธ์ถํ  ์ ์์, ์ถ๋ ฅ๋ ๊ฐ์ ํจ์์์ return ๊ฐ์

    // ์คํ๊ฒฐ๊ณผ
    // 100
    // 200
    ```

  - `value`์ ์์ฑํ ํจ์ ์ด๋ฆ ์์ฑ

    ```tsx
    const sports = () => {
      return 100;
    };
    let obj = new Set();

    obj.add(sports);
    obj.add(sports);

    for (let value of obj) {
      console.log(value());
    }

    // 1. Function ์ค๋ธ์ ํธ๋ฅผ ์์ใํ ํ ํจ์ ์ด๋ฆ์ผ๋ก ๋ฑ๋กํ๋ฉด ํ๋๋ง ์ค์  ๋จ
    // 2. ์ด๊ฒ์ ํจ์ ์ด๋ฆ์ผ๋ก ์ฐธ์กฐํ๋ Function ์ค๋ธ์ ํธ์ ๋ฉใ๋ชจ๋ฆฌ ์ฃผ์๊ฐ ๊ฐ์ด ๋๋ฌธ

    // ์คํ ๊ฒฐ๊ณผ
    // 100
    ```

  - `Object`๋ฅผ `value`๋ก ์ฌ์ฉ

    ```tsx
    const sports = {
      ์ถ๊ตฌ: 11,
      ์ผ๊ตฌ: 9,
    };

    let obj = new Set();
    obj.add(sports);

    for (let value of obj) {
      console.log(value);
    }

    // ์คํ๊ฒฐ๊ณผ
    // { ์ถ๊ตฌ : 11, ์ผ๊ตฌ : 9 }
    ```

<br>

## 2. has()

- `Set` ์ธ์คํด์ค์์ ๊ฐ์ ์กด์ฌ ์ฌ๋ถ๋ฅผ ๋ฐํ

  - ์กด์ฌํ๋ฉด `true`, ์๋๋ฉด `false` ๋ฐํ

    ```tsx
    const sports = () => {};
    const obj = new Set([sports]);

    console.log(obj.has(sports)); // true
    console.log(obj.has('book')); // false
    ```

- `get()` ๋ฉ์๋๊ฐ ์์ผ๋ฏ๋ก
  - `has()` ๋ก ๊ฐ์ ์กด์ฌ ์ฌ๋ถ๋ฅผ ์ฒดํฌ ํ ํ ์กด์ฌํ๋ฉด ์ฒดํฌํ ๊ฐ์ ๊ฐ์ผ๋ก ์ฌ์ฉ

```toc

```
