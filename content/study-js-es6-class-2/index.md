---
emoji: ๐จโ๐ป
title: Class ์ ์ธ, Class ๊ตฌ์กฐ - Class ์ ์ธ๋ฌธ, Class ํํ์
date: '2021-11-16 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  Class ์ ์ธ, Class ๊ตฌ์กฐ: Class ์ ์ธ๋ฌธ, Class ํํ์
</h1>

<br>

## 1. Class ์ ์ธ

- Syntax : `class Name { body }`

- ๋๋ฌธ์ Class๋ ๊ฐ๋์ ์ธ ํด๋์ค๋ฅผ ๋ปํ๊ณ  ์๋ฌธ์ class๋ ํค์๋ ์

- ํด๋์ค ์์ฑ ๋ฐฉ๋ฒ

  - `class` ํค์๋์ ์ด์ด ํด๋์ค ์ด๋ฆ ์์ฑํจ
  - ์ด๋ฆ์ ์ฒซ ๋ฌธ์๋ ๋๋ฌธ์๋ฅผ ์ฌ์ฉ ํจ(๊ฐ๋ฐ์๋ค ์ฌ์ด์ ๊ด๋ก)
  - ๋ธ๋ก `{ }` ์ ์์ฑํ๊ณ  ๋ธ๋ก ์์ ๋ฉ์๋๋ฅผ ์์ฑํจ

    ```tsx
    class Point {
      getPoint() {
        return 100;
      }
    }

    const obj = new Point();

    console.log(obj.getPoint()); // 100

    // 1. ์์ง์ด class ํค์๋๋ฅผ ๋ง๋๋ฉด ํด๋์ค ์ค๋ธ์ ํธ๋ฅผ ์์ฑํจ
    // 2. const obj = new Point();
    //   - new ์ฐ์ฐ์๋ฅผ ์ฌ์ฉํ์ฌ ์ธ์คํด์ค๋ฅผ ์์ฑํจ
    // 3. new ์ฐ์ฐ์๋ฅผ ์ฌ์ฉํ์ง ์๊ณ  Point()๋ฅผ ํธ์ถํ๋ฉด ์๋ฌ๊ฐ ๋ฐ์ํจ
    // 4. obj.getPoint() ์ธ์คํด์ค์ getPoint() ๋ฉ์๋๋ฅผ ํธ์ถ ํจ
    ```

<br>

## 2. Class ํํ์

- Syntax : `const/let Name = class { body }`

- ํด๋์ค ์์ฑ ๋ฐฉ๋ฒ

  - ๋ณ์ ์ด๋ฆ `Name`์ด ํด๋์ค ์ด๋ฆ์ด ๋จ
  - ๋ณ์์ `Class` ์ค๋ธ์ ํธ๋ฅผ ํ ๋นํ๋ ํํ ์
  - ๋ค๋ฅธ ๊ฒ์ ํด๋์ค ์ ์ธ๋ฌธ๊ณผ ๊ฐ์

    ```tsx
    const Point = class {
      getPoint() {
        return 100;
      }
    };

    const obj = new Point();

    console.log(obj.getPoint()); // 100

    // 1. ์์ง์ด class ํค์๋๋ฅผ ๋ง๋๋ฉด ํด๋์ค ์ค๋ธ์ ํธ๋ฅผ ์์ฑํ์ฌ Point ๋ณ์์ ํ ๋นํจ
    // 2. Point๊ฐ ํด๋์ค ์ด๋ฆ์ด ๋จ
    ```

- Class ํํ

  ```tsx
  const Point = class {
    getPoint() {
      return 100;
    }
  };

  /*
  	1. Point๋ฅผ ํผ์น๋ฉด
  		- ํ๋กํผํฐ, prototype, __proto__๊ฐ ์์
  
  	2. prototype์ ํผ์น๋ฉด
  		- constructor๊ฐ ์์ผ๋ฉฐ, getPoint()๊ฐ ์์
  
  	3. constructor๋ Point ํด๋์ค ์ ์ฒด๋ฅผ ์ฐธ์กฐ ํจ
  
  	4. ํด๋์ค์ ๋ฉ์๋๋ฅผ ์์ฑํ๋ฉด prototype์ ์ฐ๊ฒฐ๋จ
  		- Point.prototype.getPoint = function(){} ํํ๋ก ์์ฑํ ๊ฒ๊ณผ ๊ฐ์
  
  	5. __proto__ ์์ ๋นํธ์ธ Function ์ค๋ธ์ ํธ์ prototype์ ์ฐ๊ฒฐ๋ ๋ฉ์๋๋ฅผ ์ฐธ์กฐํจ
  */

  const obj = new Point();

  /*
  	1. Point ํด๋์ค๋ก ์ธ์คํด์ค๋ฅผ ์์ฑํจ
  	
  	2. obj๋ฅผ ํผ์น๋ฉด __proto__๊ฐ ์์ผ๋ฉฐ construtor์ getPoint()๊ฐ ์์
  
  	3. Point.prototype์ ์ฐ๊ฒฐ๋ ๋ฉ์๋๋ก
  		- ์ธ์คํด์ค๋ฅผ ์์ฑํ๊ณ 
  		- __proto__์์ ์ฐธ์กฐํ  ์ ์๋๋ก ๋ง๋ฌ
  */

  console.log(ojb.getPoint());

  /*
  	1. obj ์ธ์คํด์ค์ getPoint() ๋ฉ์๋๋ฅผ ํธ์ถํจ
  		- obj.__proto__์ ์ฐ๊ฒฐ๋ getPoint()๊ฐ ํธ์ถ ๋จ
  */
  ```

<br>

### โ const, let ์ฌ์ฉ ๊ธฐ์ค

1. `const` ์ฌ์ฉ : ๊ฐ์ด ๋์ฒด๋์ง ์์ ๊ฒฝ์ฐ(์ค๋ธ์ ํธ์ `ํ๋กํผํฐ๊ฐ` ๋ณ๊ฒฝ๋๋๋ผ๋ ์ค๋ธ์ ํธ `์์ฒด๊ฐ` ๋์ฒด๋์ง ์๋ ๊ฒ๋ ํฌํจ)

   ex) `Class`, `Array`, `์ธ์คํด์ค`

2. `let` ์ฌ์ฉ : ๊ฐ์ด ๋์ฒด๋๋ ๊ฒฝ์ฐ

<br>

### โ ํจ์, ๋ฉ์๋ ๊ธฐ์ค

1. ํจ์

   - ์ธ์คํด์ค๋ฅผ ์์ฑํ์ง ์๊ณ  ์ง์  ํธ์ถ

     ```tsx
     console.log(Array.isArray([])); // true

     const point = {
       getPoint() {
         return 100;
       },
     };

     console.log(point.getPoint()); // 100
     ```

2. ๋ฉ์๋

   - ์ธ์คํด์ค๋ฅผ ์ฌ์ฉํ์ฌ ํธ์ถํ๋ ํจ์๋ก `prototype`์ ์ฐ๊ฒฐ๋์ด ์์
   - ํด๋์ค์ ์์ฑํ ํจ์

     ```tsx
     class Point {
       getPoint() {
         return 100;
       }
     }

     const obj = new Point();
     console.log(obj.getPoint()); // 100

     // 1. getPoint๋ ์ง์  ํธ์ถ ํ  ์ ์๊ณ , ์ธ์คํด์ค๋ฅผ ์ฌ์ฉํ์ฌ ํธ์ถํด์ผ ํจ
     ```

   - `prototype`์ ์ฐ๊ฒฐ๋ `function`

     ```tsx
     const Point = function () {};

     Point.prototype.getPoint = function () {
       return 100;
     };

     const obj = new Point();
     console.log(obj.getPoint()); // 100

     // 1. Point.prototype.getPoint, prototype์ ์ฐ๊ฒฐ๋ ํจ์๋ ๋ฉ์๋ ์
     // 2. getPoint๋ฅผ ์ง์  ํธ์ถ ํ  ์๋ ์์ง๋ง ์ผ๋ฐ์ ์ผ๋ก ์ธ์คํด์ค๋ฅผ ์์ฑํ์ฌ ํธ์ถ ํจ
     ```

   - ๋นํธ์ธ ์ค๋ธ์ ํธ์ `prototype`์ ์ฐ๊ฒฐ๋ ํจ์

     ```tsx
     const list = [];

     list.push('์ฑ');

     console.log(list); // ["์ฑ"]

     // 1. push() ๋ฉ์๋๋ Array.prototype์ ์ฐ๊ฒฐ๋์ด ์์
     ```

```toc

```
