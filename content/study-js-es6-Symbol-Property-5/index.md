---
emoji: ๐จโ๐ป
title: Symbol.species ์ค๋ฒ๋ผ์ด๋
date: '2021-10-25 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  Symbol.species ์ค๋ฒ๋ผ์ด๋
</h1>

<br>

## Species ์ค๋ฒ๋ผ์ด๋

- `Symbol.species` ๋ `static` ์ฝ์ธ์ ํ๋กํผํฐ ์ด๋ฉฐ `getter` ๋ง ์๊ณ  `setter` ๋ ์์

  ```tsx
  class Sports extends Array {
  	statice get [Symbol.species](){
  		return Array;
  	}
  };

  const obj = new Sports(10, 20)
  ```

- `Symbol.species` ๋ฅผ ์ฌ์ฉํ  ์ ์๋ ๋นํธ์ธ ์ค๋ธ์ ํธ

  - Array, Map, Set, RegExp
  - Promise, ArrayBuffer, TypedArray

- ๋นํธ์ธ ์ค๋ธ์ ํธ๋ฅผ ์์๋ฐ์ `class`์ `Symbol.species` ๋ฅผ ์์ฑํ๋ฉด ๋นํธ์ธ ์ค๋ธ์ ํธ์ `@@species`๊ฐ ์ค๋ผ์ด๋ ๋จ
- ์ธ์คํด์ค ๋ฐ๊พธ๊ธฐ

  ```tsx
  class Sports extends Array {
  	statice get [Symbol.species](){
  		return Array;
  	}
  };

  const one = new Sports(10, 20, 30);
  console.log(one instanceof Sports);  // true

  const two = one.slice(1, 2);
  console.log(two instanceof Array);   // true
  console.log(two instanceof Sports);  // false
  ```

  - `class Sports extends Array{}`
    - ๋นํธ์ธ `Array` ์ค๋ธ์ ํธ๋ฅผ ์์ ๋ฐ์
  - `statice get [Symbol.species](){ return Array; }`
    - ๋นํธ์ธ`Array` ์ค๋ธ์ ํธ์ `@@species`๋ฅผ ์ค๋ฒ๋ผ์ด๋ ํจ
  - `const one = new Sports(10, 20, 30);`
    - ์ธ์คํด์ค๋ฅผ ์์ฑํจ
    - ํ๋ผ๋ฏธํฐ ๊ฐ์ด ์ธ์คํด์ค์ ์ค์  ๋จ
  - `one instanceof Sports`
    - `Sports` ๋ก `one` ์ ๋ง๋ค์์ผ๋ฏ๋ก `true` ์ถ๋ ฅ
  - `const two = one.slice(1,2);`
    - `Array` ์ค๋ธ์ ํธ๋ฅผ ์์ ๋ฐ์์ผ๋ฏ๋ก `one` ์ธ์คํด์ค๋ก `slice()`๋ฅผ ํธ์ถ ํ  ์ ์์
    - `slice()` ๋์์ ์ธ์คํด์ค์ ์ค์ ๋ [10, 20, 30]
    - ์ธ์คํด์ค๋ฅผ ๋ฐํํ๋ฉฐ ๋ฐํ๋๋ ์ธ์คํด์ค์ `slice()` ๊ฒฐ๊ณผ๋ฅผ ์ค์ ํจ
  - `Symbol.species()` ๋ก ์ค๋ฒ๋ผ์ด๋ ํ์ผ๋ฏ๋ก
    - `static get [Symbol.species](){}` ๊ฐ ํธ์ถ ๋จ
    - ํธ์ถ์ ์ฌ์ฉํ `one` ์ธ์คํด์ค ํํ๋ฅผ ๋ฐํํ์ง ์๊ณ  `Array` ์ธ์คํด์ค๋ฅผ ๋ฐํํจ
    - ์ด์ฒ๋ผ `Symbol.species()`๋ก ๋ฐํํ  ์ธ์คํด์ค๋ฅผ ๋ณ๊ฒฝํ  ์ ์์
  - `two instanceof Array`
    - `two` ์ธ์คํด์ค์๋ `Array` ์ธ์คํด์ค๊ฐ ํ ๋น๋์ด ์์ผ๋ฉฐ
    - `Array` ์ค๋ธ์ ํธ๋ก ๋ง๋ค์์ผ๋ฏ๋ก `true` ์ถ๋ ฅ
  - `two instacne of Sports`
    - `Sports` ๊ฐ ์๋๋ผ `Array` ์ค๋ธ์ ํธ๋ก `two` ์ธ์คํด์ค๋ฅผ ๋ง๋ค์์ผ๋ฏ๋ก `false` ์ถ๋ ฅ

```toc

```
