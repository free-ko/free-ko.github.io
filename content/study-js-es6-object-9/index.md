---
emoji: ๐จโ๐ป
title: setPrototypeOf() - prototype ์ฌ์ฉ
date: '2021-09-26 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  setPrototypeOf() - prototype ์ฌ์ฉ
</h1>

<br>

## setPorotytpeOf()

- ์ฒซ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ `prototype`์ ์์ฑ
- ์ฒซ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ `prototype`์
  - ๋ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ `prototype`์ ์ฐ๊ฒฐ๋ ํ๋กํผํฐ๋ฅผ ์ค์ 
- `prototype` ์ฐ๊ฒฐ ํ์ ์ธ์คํด์ค ๊ตฌ์กฐ

  ```tsx
  function Book() {}
  Book.prototype.getBook = function () {};

  function Point() {}
  Point.prototype.getPoint = function () {};

  Object.setPrototypeOf(Point.prototype, Book.prototype);
  /*
  	1. Point.prototype์
  	- Book.prototype์ ์ฐ๊ฒฐ๋ ํ๋กํผํฐ(๋ฉ์๋ ํฌํจ)๋ฅผ ์ค์ ํจ
  
  	2. Point.prototype์ ์ค์ ํ๋ฏ๋ก ์ด๊ฒ์ ํผ์น๋ฉด
  	- Book.prototype.getBook()์ด ์์ด์ผ ํ๋๋ฐ ์์
  
  	3. ๋ํ, Point.prototype์ ์ฐ๊ฒฐํ ๋ฉ์๋๊ฐ
  	- ์ง์์ง์ง ์๊ณ  ์ ์ง ๋จ 
  
  	4. ํํธ, Point.prototype.__proto__๋ฅผ ํผ์น๋ฉด
  	- getBook()์ด ํ์๋จ
  
  	5. setPrototypeOf() ํจ์ ์ด๋ฆ์ ๋์์ค๊ฐ
  	- prototype์ ์ค์ ํ๋ ๊ฒ์ฒ๋ผ ๋ณด์ด์ง๋ง
  	- prototype์ __proto__๋ฅผ ๋ง๋ค๊ณ  ์ฌ๊ธฐ์ ์ค์ ํจ
  
  	6. prototype์ ์ค์ ํ๋ฉด getPoint()๊ฐ ์ง์์ง๋ฏ๋ก
  	- Point์ ์์ฑ๋ ๋ฉ์๋๋ฅผ ์ฌ์ฉํ  ์ ์๊ฒ ๋จ
  
  	7. ์ด๋ฅผ ํผํ๊ธฐ ์ํด __proto__๋ฅผ ๋ง๋ค์ด ์ค์ ํ ๊ฒ
  
  	8. __proto__๋ก ๊ตฌ์กฐ์ ์ผ๋ก ๊ณ์ธต์ ๋ง๋ค์ด ์ค์ ํ๋ฏ๋ก 
  	- ๊ฐ์ ์ด๋ฆ์ ๋ฉ์๋๊ฐ ์๋๋ผ๋ ๋์ฒด๋์ง ์์
  	
  	9. ์๋ณ์ ํด๊ฒฐ์ ํ  ๋, __proto__ ์์๋ก ๊ฒ์ํ๋ฏ๋ก
  	- ๊ฐ์ ์ด๋ฆ์ ๋ฉ์๋๊ฐ ์์ ๋,
  	- ์์ ๋ฉ์๋๊ฐ ํธ์ถ ๋จ
  */

  const obj = new Point(300);
  /*
  	1. new Point(300)๋ฅผ ์คํํ๋ฉด
  	- Point.prototype์ ์ฐ๊ฒฐ๋ ๋ฉ์๋๋ก ์ธ์คํด์ค๋ฅผ ์์ฑํจ
  
  	2. ์ค๋ฅธ์ชฝ์ obj๋ฅผ ํผ์น๋ฉด
  	- obj.__proto__.proto__๊ตฌ์กฐ ์
  	- ์ด๊ฒ์ Point.prototype ๊ตฌ์กฐ์ ๊ฐ์
  
  	3. ์์ __proto__์ Point.prototype์ ์ฐ๊ฒฐ๋ ๋ฉ์๋๊ฐ ์ค์ ๋๊ณ 
  	- ์๋์ __proto__์ Book.prototype์ ์ฐ๊ฒฐ๋ ๋ฉ์๋๊ฐ ์ค์  ๋จ
  */
  ```

- ์์์ ์ํ ๋ชฉ์ ์ด๋ผ๋ฉด
  - `super` ๋ฑ์ ์์ ์ฒ๋ฆฌ ํค์๋๋ฅผ ์ ๊ณตํ๋
  - `Class`๋ฅผ ์ฌ์ฉํ๋ ๊ฒ์ด ์ข์

```toc

```
