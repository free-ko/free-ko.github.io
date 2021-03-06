---
emoji: ๐จโ๐ป
title: Map ์ค๋ธ์ ํธ ํํ, new Map()
date: '2021-11-01 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  Map ์ค๋ธ์ ํธ ํํ, new Map()
</h1>

## 1. Map ์ค๋ธ์ ํธ

- Map ์ค๋ธ์ ํธ `key`์ `value`์ ์ปฌ๋ ์
- Map ์ค๋ธ์ ํธ ํํ

  - `[key, value]` ํํ์ฒ๋ผ
  - ๋๊ดํธ ์์ `key`์ `value`๋ฅผ ์์ฑ

    ```tsx
    const obj = new Map([
      ['key', 'value'],
      [{ book: 200 }, '์ค๋ธ์ ํธ'],
      [100, 'Number'],
    ]);

    for (let keyValue of obj) {
      console.log(keyValue);
    }

    // ์คํ ๊ฒฐ๊ณผ
    // [key, value]
    // [{book: 200}, ์ค๋ธ์ ํธ]
    // [100, Number]
    ```

  - ๋ค์ํ ํ์์ `key`๋ก ์ฌ์ฉํ  ์ ์์

- Map์ key ์ฒ๋ฆฌ
  - `for-of` ๋ฌธ์์ ์์ฑํ ์์๋๋ก ์ฝํ์ง

<br>

## 2. new Map()

- Map ์ธ์คํด์ค๋ฅผ ์์ฑํ์ฌ ๋ฐํ

  - ํ๋ผ๋ฏธํฐ์ ์ดํฐ๋ฌ๋ธ ์ค๋ธ์ ํธ ์์ฑ

    ```tsx
    const obj = new Map([
      ['key', 'value'],
      [100, 'Number'],
    ]);

    console.log(obj); // {}
    console.log(typeof obj); // object

    // 1. ํ๋ผ๋ฏธํฐ๋ฅผ ๋ฐฐ์ด ์์ ๋ฐฐ์ด๋ก ์์ฑํจ ๋๊ดํธ []๊ฐ 2๊ฐ์
    // 2. 100์ด key์ด๊ณ  "Number"๊ฐ Value์
    // 3. new ์ฐ์ฐ์๋ฅผ ์ฌ์ฉํ์ง ์์ผ๋ฉด TypeError
    // 4. ํ๋ผ๋ฏธํฐ๋ฅผ ์์ฑํ์ง ์์๋ ๋จ
    // 5. ์ธ์คํด์ค๋ฅผ ์์ฑํ๋ฏ๋ก ํ์์ object
    ```

  - Same-Value-Zero ๋น๊ต ์๊ณ ๋ฆฌ์ฆ

    - key ๊ฐ์ ๋น๊ต

      ```tsx
      const obj = new Map([
        [100, 'Number'],
        ['100', 'String'],
      ]);

      for (let [key, value] of obj) {
        console.log(`${key} : ${value}`);
      }

      // 1. 100๊ณผ '100'์ ํ์์ด ๋ค๋ฆ

      // ์คํ ๊ฒฐ๊ณผ
      // 100 : Number
      // 100 : String
      ```

    - key ๊ฐ์ด ๊ฐ์ผ๋ฉด Value๊ฐ ๋์ฒด๋จ

      ```tsx
      const obj = new Map([
        [100, '์ฒซ ๋ฒ์งธ'],
        ['100', '๋ ๋ฒ์งธ'],
      ]);

      for (let [key, value] of obj) {
        console.log(`${key} : ${value}`);
      }

      // 1. key ๊ฐ์ด ํ์๊น์ง ๊ฐ์ผ๋ฉด value๊ฐ ๋์ฒด๋จ

      // ์คํ ๊ฒฐ๊ณผ
      // 100 : ๋ ๋ฒ์งธ
      ```

  - ์๋ชป ์์ฑํ ํํ

    ```tsx
    try {
      new Map(['one', 1]);
    } catch {
      console.og('[[one, 1]]');
    }

    const obj = new Map([{ five: 5 }]);

    for (let [key, value] of obj) {
      console.log(`${key} : ${value}`);
    }

    // 1. new Map(["one", 1]) ๋๊ดํธ 2๊ฐ๋ฅผ ์์ฑํด์ผ ํจ
    // 2. new Map([{five: 5}]) key๋ง ์์ฑํ๋ฉด, ์๋ฌ๊ฐ ๋ฐ์ํ์ง ์์ง๋ง key์ value์ undefined๊ฐ ์ค์ ๋จ

    // ์คํ๊ฒฐ๊ณผ
    // [[one, 1]]
    // undefined : undefined
    ```

```toc

```
