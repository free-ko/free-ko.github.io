---
emoji: ๐จโ๐ป
title: Symbol.iterator, Array.prototype[@@iterator], Object ์ดํฐ๋ ์ด์
date: '2021-10-27 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  Symbol.iterator, Array.prototype[@@iterator], Object ์ดํฐ๋ ์ด์
</h1>

<br>

## 1. iterator

- `@@iterator`๊ฐ ์๋ ๋นํธ์ธ ์ค๋ธ์ ํธ

  - String, Array, Map, Set, TypedArray

- ๋นํธ์ธ Object์๋ `@@iterator`๊ฐ ์์ง๋ง ๊ฐ๋ฐ์ ์ฝ๋๋ก ์์ฑํ  ์ ์์

<br>

## 2. Array.prototype[@@iterator]

- `Array` ์ค๋ธ์ ํธ์ `[Symbol.iterator]()`๋ฅผ ํธ์ถํ๋ฉด

  - ์ดํฐ๋ ์ดํฐ ์ค๋ธ์ ํธ ๋ฐํ

    ```tsx
    const list = [10, 20];
    const obj = list[Symbol.iterator]();

    console.log(obj.next()); // {value: 10, done: false}
    console.log(obj.next()); // {value: 20, done: false}
    console.log(obj.next()); // {value: undefined, done: true}
    ```

  - `next()` ๋ก ๋ฐฐ์ด ์๋ฆฌ๋จผํธ ๊ฐ์ ํ๋์ฉ ๊ตฌํ  ์ ์์

<br>

## 3. String.prototype[@@iterator]

- `String` ์ค๋ธ์ ํธ์ `[Symbol.iterator]()`๋ฅผ ํธ์ถํ๋ฉด

  - ์ดํฐ๋ ์ดํฐ ์ค๋ธ์ ํธ ๋ฐํ

    ```tsx
    const list = '1A';
    const obj = list[Symbol.iterator]();

    console.log(obj.next()); // {value: 1, done: false}
    console.log(obj.next()); // {value: A, done: false}
    console.log(obj.next()); // {value: undefined, done: true}
    ```

  - `next()` ๋ก ๋ฌธ์์ด์์ ๋ฌธ์๋ฅผ ํ๋์ฉ ๊ตฌํ  ์ ์์

 <br>

## 4. Object ์ดํฐ๋ ์ด์

- ๋นํธ์ธ `Object` ์๋ `Symbol.iterator` ๊ฐ ์์

  - `Symbol.iterator` ๊ฐ ๋ฐ๋ณต์ ์ฒ๋ฆฌํ๋ฏ๋ก
  - `Object์ Symbol.iterator` ๋ฅผ ์์ฑํ๋ฉด ๋ฐ๋ณตํ  ์ ์์

    ```tsx
    const obj = {
      [Symbol.iterator]() {
        return {
          count: 0,
          maxCount: this.maxCount,
          next() {
            if (this.count < this.maxCount) {
              return { value: this.count++, done: false };
            }
            return { value: undefined, done: true };
          },
        };
      },
    };

    obj.maxCount = 2;
    for (const value of obj) {
      console.log(value);
    }

    // ์คํ๊ฒฐ๊ณผ
    // 0
    // 1
    ```

- ์์ง์ด `for-of` ๋ฌธ์ ์์ํ๋ฉด
  - ๋จผ์  `obj`์์ `[Symbol.iterator]` ๊ฒ์, ์ด๋ฅผ ์ํด obj์ `[Symbol.iterator]` ์์ฑ
- `for(const result of obj)` ๋ฅผ ์ฒ์ ์คํํ  ๋
  - `obj` ์ `[Symbol.iterator]()` ๊ฐ ํธ์ถ๋๋ฉด `return{}` ๋ฌธ์ ์ํ
  - `obj.maxCount = 2;` ๋ก ๋ฐ๋ณต ํ์ ์ ์

```toc

```
