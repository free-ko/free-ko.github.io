---
emoji: ๐จโ๐ป
title: __proto__์ ๋ฉ์๋ ์ถ๊ฐ
date: '2021-09-26 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  __proto__์ ๋ฉ์๋ ์ถ๊ฐ
</h1>

<br>

## ๋ฉ์๋ ์ถ๊ฐ

- `__proto__` ์ `function`์ ์ถ๊ฐํ๋ฉด

  - `prototype`์ ์ค์ ๋๋ฉฐ
  - ๋ฉ์๋๋ก ์ถ๊ฐํ๋ ๊ฒ๊ณผ ๊ฐ์
  - `__proto__`์ ์ถ๊ฐํ ํ์ `prototype` ๋ชจ์ต

  ```tsx
  function Book(param) {
    this.point = param;
  }

  Book.prototype.getPoint = function () {
    return this.point;
  };

  const obj = new Book(100);

  // __proto__์ ๋ฉ์๋๋ฅผ ์ถ๊ฐ ํจ
  obj.__proto__.setPoint = function (param) {
    this.point = param;
  };

  /*
  	1. obj๋ฅผ ํผ์น๋ฉด __proto__์ setPoint๊ฐ ํ์๋จ
  
  	2. Book.prototype์ ํผ์น๋ฉด setPoint๊ฐ ํ์๋จ
  */

  /*
  	1. ์ด๋ ๊ฒ ํ์๊ฐ ๋๋ ๊ฒ์
  	- __proto__์ ๋ฉ์๋๋ฅผ ์ถ๊ฐํ๋ฉด, __proto__์ ์ถ๊ฐํ์ง ์๊ณ 
  	- prototype์ ์ถ๊ฐํ๊ธฐ ๋๋ฌธ
  
  	2. __proto__์ ์ฐ๊ฒฐ๋์ด ํ์๋ ๊ฒ์
  	- ๋๋ฒ๊น ํด์์ ๊ฐ๋์ฑ์ ์ํด
  	- prototype์ ์ฐ๊ฒฐ๋ ๋ฉ์๋๋ฅผ ํ์ํ ๊ฒ
  */
  ```

- ์ถ๊ฐํ ๋ฉ์๋๋ฅผ ์ธ์คํด์ค์ ๊ณต์ 

  ```tsx
  function Book(param) {
    this.point = param;
  }

  Book.prototype.getPoint = function () {
    return this.point;
  };

  const obj = new Book(100);

  // beforeObj ์ธ์คํด์ค๋ฅผ ์์ฑํจ
  const beforeObj = new Book(100);

  // __proto__์ ๋ฉ์๋๋ฅผ ์ถ๊ฐํจ
  obj.__proto__.setPoint = function (param) {
    this.point = param;
  };

  // ์๋ก์ด ์ธ์คํด์ค๋ฅผ ์์ฑํจ
  const afterObj = new Book(300);

  /*
  	1. setPoint()๊ฐ ์ธ์คํด์ค์ ํ ๋น๋๋ฏ๋ก
  	- ๋ฉ์๋๋ก ํธ์ถํ  ์ ์์
  */

  beforeObj.setPoint(700);
  /*
  	1. beforeObj ์ธ์คํด์ค๋
  	- setPoint() ๋ฉ์๋๋ฅผ ์ถ๊ฐํ๊ธฐ ์ ์ ์ธ์คํด์ค๋ฅผ ๋ง๋ค์์ง๋ง
  
  	2. prototpye sharing(๊ณต์ )์ผ๋ก ์ธํด
  	- ์ถ๊ฐ๋ ๋ฉ์๋๋ฅผ ์ฌ์ฉํ  ์ ์์
  
  	3. setPoint()๊ฐ ํธ์ถ๋๋ฉด
  	- Book.prototype์์ setPoint์ ์กด์ฌ ์ฌ๋ถ๋ฅผ ์ฒดํฌํ๊ณ 
  	- ์์ผ๋ฉด __proto__๊ฐ ์๋๋ผ Book.prototype์
  	- setPoint()๋ฅผ ํธ์ถํ๊ธฐ ๋๋ฌธ
  */
  ```

```toc

```
