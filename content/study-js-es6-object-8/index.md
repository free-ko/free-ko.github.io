---
emoji: ๐จโ๐ป
title: setPrototypeOf() - ์ธ์คํด์ค ์ฌ์ฉ
date: '2021-09-26 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  setPrototypeOf() - ์ธ์คํด์ค ์ฌ์ฉ
</h1>

<br>

## setPorotytpeOf()

- ์ฒซ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ์`prototype`์ผ๋ก ๋ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ๋ฅผ ์ค์ 

  ```tsx
  let obj = { 0: 10, length: 1 };

  Object.setPrototypeOf(obj, Array.prototype);

  // 1. obj๋ ์ธ์คํด์ค์
  // 2. ์ธ์คํด์ค์๋ prototype์ด ์์ผ๋ฉฐ __proto__๊ฐ ์์ผ๋ฏ๋ก __proto__์ ์ค์ ํ๋ ๊ฒ๊ณผ ๊ฐ์
  ```

- ์ฒซ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ ์ธ์คํด์ค ์์ฑ

  - `setPrototypeOf()` ์คํ ํ ์ธ์คํด์ค ๊ตฌ์กฐ

  ```tsx
  const obj = { 0: 10, 1: 20, length: 2 };

  /*
  	1. Array-Like ์ค๋ธ์ ํธ์
  
  	2. ์ค๋ฅธ์ชฝ์ obj๋ฅผ ํผ์น๋ฉด
  	- prototype์ ์๊ณ  __proto__๋ง ์์
  	
  	3. ์ด๊ฒ์ ์ค๋ธ์ ํธ๊ฐ ์๋๋ผ
  	- Object.prototype์ ์ฐ๊ฒฐ๋ ๋ฉ์๋๋ก
  	- ์์ฑ๋ ์ธ์คํด์ค๋ฅผ ๋ปํจ
  
  	4. __proto__์ Object.prototype์ ์ฐ๊ฒฐ๋
  	- ๋ฉ์๋๊ฐ ์ค์ ๋์ด ์์ผ๋ฏ๋ก
  	- Array ์ค๋ธ์ ํธ์ ๋ฉ์๋๋ฅผ ์ฌ์ฉํ  ์ ์์
  */

  Object.setPrototypeOf(obj, Array.prototype);

  /*
  	1. obj์ __proto__์ Array.prototype์ ์ฐ๊ฒฐ๋
  	- ๋ฉ์๋๋ฅผ ์ค์ ํจ
  
  	2. ์ค๋ฅธ์ชฝ์ obj๋ฅผ ํผ์น๋ฉด
  	- Object.prototype์ ์ฐ๊ฒฐ๋ ๋ฉ์๋๊ฐ ์์ด์ง๊ณ 
  	- Array.prototype์ ์ฐ๊ฒฐ๋ ๋ฉ์๋๊ฐ ํ์๋จ
  
  	3. ์ค๋ช์ ์ํ ๊ฒ์ผ๋ก ์ผ๋ฐ์ ์ผ๋ก ์ด๋ ๊ฒ ์ฌ์ฉํ์ง ์์ง๋ง
  	- ์ด์ฒ๋ผ __proto__์ ์ค์ ๋ ๋ฉ์๋๋ฅผ ๋ฐ๊ฟ ์ ์์
  */

  const callBack = (element, index, all) => console.log(element);

  obj.forEach(callback);

  /*
  	1. obj๊ฐ ๋ฐฐ์ด์ด ์๋๋ฏ๋ก forEach()๋ฅผ ์ฌ์ฉํ  ์ ์์ง๋ง,
  	- ๋ฐ๋ก ์์์ __proto__์ Array.prototype์ ์ฐ๊ฒฐ๋
  	- ๋ฉ์๋๋ฅผ ์ค์ ํ์ผ๋ฏ๋ก ์ฌ์ฉํ  ์ ์์
  
  	2. ์ฝ๋ฐฑ ํจ์๊ฐ ํธ์ถ๋๋ฉด์ ๋ฐ๋ณตํ๊ฒ ๋จ
  	- console์ 10, 20์ถ๋ ฅ ๋จ
  */

  const check = Object.prototype;
  // Object.prototype์ด ๋ฐ๋์ง ์์
  ```

- ES5์ `getPrototypeOf()`๊ฐ ์์

```toc

```
