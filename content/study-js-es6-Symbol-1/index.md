---
emoji: ๐จโ๐ป
title: primitive ๊ฐ, wrapper ์ค๋ธ์ ํธ
date: '2021-10-18 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  primitive ๊ฐ, wrapper ์ค๋ธ์ ํธ
</h1>

## 1. Primitive ๊ฐ

- JS์์ `Primitive` ๊ฐ์ ์ค๋ธ์ ํธ๊ฐ ์๋๋ผ ๊ฐ์ด๋ฉฐ ํจ์๋ฅผ ๊ฐ๊ณ  ์์ง ์์
- `const num = 100;` ์ ํ ๋นํ๋ฉด
  - `num` ๋ณ์์ 100๋ง ํ ๋น๋๋ฉฐ ์๋ฌด๊ฒ๋ ์ฒจ๋ถ๋์ง ์์
  - 100์ด `primitive` ๊ฐ
- ES5์ `primitive` ๊ฐ ํ์
  - `string`, `number`, `boolean`, `null`, `undefined`
- ES6์์ `symbol` ํ์์ถ๊ฐ

<br>

## 2. Wrapper ์ค๋ธ์ ํธ

- `wrapper` ์ค๋ธ์ ํธ๋?
  - ํ๋ฆฌ๋ฏธํฐ๋ธ ๊ฐ์ด ํฌํจ๋ ์ค๋ธ์ ํธ
  - `wrapper` ์ค๋ธ์ ํธ์๋ ๋ฉ์๋๊ฐ ์์
- `wrapper` ์ค๋ธ์ ํธ๊ฐ ์๋ ํ๋ฆฌ๋ฏธํฐ๋ธ ๊ฐ ํ์
  - stiring : String, number : Number ์ค๋ธ์ ํธ
  - boolean : Boolean, symbol : Symbol ์ค๋ธ์ ํธ
- `const obj = new String(100);`

  - obj ์ธ์คํด์ค์ `[[PrimitiveValue]]` ์ 100์ด ์ค์ ๋จ
  - `[[PrimitiveValue]]` ํํ

  ```tsx
  const sports = new String(100);

  /*
  	1. ์ค๋ฅธ์ชฝ์ sports๋ฅผ ํผ์น๋ฉด

  	2. [[PrimitiveValue]]: "100"์ด ์์
          - [[PrimitiveValue]]๊ฐ ํ๋ฆฌ๋ฏธํฐ๋ธ ๊ฐ์ ๋ํ๋ด๋
          - ํ๋กํผํฐ ์ด๋ฆ์ด๋ฉฐ, "100"์ด ํ๋กํผํฐ ๊ฐ

  	3. sports๊ฐ wrapper ์ค๋ธ์ ํธ ์
  */

  const sym = Symbol{"ABC");

  /*
  	1. sports๋ฅผ ํผ์น๋ฉด [[PrimitiveValue]]๊ฐ ํ์ ๋์ง๋ง

  	2. sym์ ํผ์น  ์๊ฐ ์์ผ๋ฉฐ
        - [[PrimitiveValue]]๊ฐ ํ์๋์ง ์์

  	3. ๊ทธ๋ ๋ค๊ณ  Symbol์ Primitive ๊ฐ์ด ์๋ ๊ฒ์ด ์๋๋ฉฐ

  	4. ์ด๊ฒ์ Symbol์ Primitive ๊ฐ์
  	- ์ธ๋ถ์ ๋ธ์ถ์ํค์ง ์๋ ํน์ฑ ๋๋ฌธ
  */
  ```

- `undefined`, `null`์ `wrapper` ์ค๋ธ์ ํธ ์์

```toc

```
