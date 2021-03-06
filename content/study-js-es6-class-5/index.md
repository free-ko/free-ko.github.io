---
emoji: ๐จโ๐ป
title: getter, setter, static ๋ฉ์๋, ํธ์ด์คํ
date: '2021-11-19 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  getter, setter, static ๋ฉ์๋, ํธ์ด์คํ
</h1>

<br>

## 1. getter

- `getter` ๋ ๋ฉ์๋๋ฅผ ํธ์ถํ์ฌ ๊ฐ์ ๊ตฌํจ

  - ๋ฉ์๋๋ฅผ ํธ์ถ ํ  ๋๋ `name()` ์ฒ๋ผ ์๊ดํธ`()` ๋ฅผ ์์ฑํ์ง๋ง `getter` ๋ ์๊ดํธ`()` ๋ฅผ ์์ฑํ์ง ์๊ณ  `name`๋ง ์์ฑํจ
  - ํ๋ผ๋ฏธํฐ๋ฅผ ์ฌ์ฉ ํ  ์ ์์

- ํด๋์ค์ `getter` ์์ฑํ๋ ๋ฐฉ๋ฒ

  ```tsx
  class Point {
    constructor(point) {
      this.point = point;
    }

    get getPoint() {
      return this.point;
    }
  }

  const obj = new Point(100);

  console.log(obj.getPoint); // 100

  // 1. get getPoint(){...} getter๋ ๋ฉ์๋ ์ด๋ฆ ์์ get์ ์์ฑํจ
  // 2. console.log(obj.getPoint) getter ์ด๋ฆ์ ์์ฑํ๋ฉด getter๊ฐ ํธ์ถ๋จ
  // 3. getter ์์ 100์ ๋ฐํ ํจ
  ```

<br>

## 2. setter

- `setter` ๋ ๋ฉ์๋๋ฅผ ํธ์ถํ์ฌ ๊ฐ์ ์ค์  ํจ

  - `setter`๋ `getter` ์ฒ๋ผ ์๊ดํธ`()` ๋ฅผ ์์ฑํ์ง ์๊ณ  ์ด๋ฆ๋ง ์์ฑํจ

- ํด๋์ค์ `setter` ์์ฑ ๋ฐฉ๋ฒ

  ```tsx
  class Point {
    set setPoint(point) {
      this.point = point;
    }
  }

  const obj = new Point();
  obj.setPoint = 100;

  console.log(obj.point); // 100

  // 1. set setPoint(point){...} setter๋ ๋ฉ์๋ ์ด๋ฆ ์์ set์ ์์ฑํจ
  // 2. obj.setPoint = 100; ๊ฐ์ setter์ ํ ๋นํ๋ฉด setter๊ฐ ํธ์ถ๋๋ฉฐ ํ ๋นํ๋ ๊ฐ 100์ ํ๋ผ๋ฏธํฐ๋ก ๋๊ฒจ์ค
  ```

<br>

## 3. static ๋ฉ์๋

- Syntax : `static name(){...}`

- `static` ๋ฉ์๋ ์์ฑ ๋ฐฉ๋ฒ

  ```tsx
  class Point {
    static getPoint() {
      return 100;
    }
  }

  console.log(Point.getPoint()); // 100

  // 1. static getPoint(){} ๋ฉ์๋ ์ด๋ฆ ์์ static์ ์์ฑํจ, ์ ์  ๋ฉ์๋๋ผ๊ณ  ๋ถ๋ฆ
  // 2. Point.getPoint() Point ํด๋์ค ์ด๋ฆ์ ์ด์ด์ getPoint()๋ฅผ ์์ฑํจ ๊ทธ๋ฌ๋ฉด getPoint()๊ฐ ํธ์ถ๋จ
  // 3. ์ธ์คํด์ค์ ๋ฉ์๋๋ก ํธ์ถํ์ง ์์
  // 4. ํธ์ถํ๋ ๋ฐฉ๋ฒ์ด ๋ค๋ฅด๋ฏ๋ก ES5์์๋ ํจ์์ ๋ฉ์๋๋ฅผ ๊ตฌ๋ถํ์ง๋ง ES6์์๋ static ๋ฉ์๋๋ก ๊ตฌ๋ถํด์ผ ํจ
  // 5. ํด๋์ค๋ง static์ ์ฌ์ฉํ  ์ ์์
  ```

- `static` ๋ฉ์๋์ ๊ตฌ์กฐ์  ํน์ง

  - `prototype` ์ด ์๋ ํด๋์ค์ ์ฐ๊ฒฐ๋๋ฉฐ ์์ฑํ ์ธ์คํด์ค์ ํ ๋น๋์ง ์์

    ```tsx
    class Point {
      static getPoint() {
        return 100;
      }
    }

    const obj = new Point();

    console.log(obj.getPoint); // undefined

    // 1. static getPoint(){...} ์์ง์ด Point ์ค๋ธ์ ํธ๋ฅผ ๋ง๋ค๋ฉด์ static ๋ฉ์๋๋ฅผ Function ์ค๋ธ์ ํธ๋ก ๋ง๋ฌ
    // 2. ๊ทธ๋ฌ๋ฏ๋ก Point.getPoint() ํํ๋ก ํธ์ถํ  ์ ์์
    // 3. const obj = new Point(); obj ์ธ์คํด์ค์ static ๋ฉ์๋๊ฐ ์ค์ ๋์ง ์์
    // 4. obj ์ธ์คํด์ค์ getPoint๊ฐ ์์ผ๋ฏ๋ก undefined๊ฐ ์ถ๋ ฅ๋จ
    ```

<br>

## 4. ํธ์ด์คํ

- ํด๋์ค๋ ํธ์ด์คํ ๋์ง ์์

  - `const`, `let` ๋ณ์์ฒ๋ผ `class` ํค์๋๊ฐ ์์ฑ๋ ์์น์์ ํด๋์ค ์ด๋ฆ ์ ์ธ๊ณผ ์ค๋ธ์ ํธ ์์ฑ์ ๋์์ ํ๊ธฐ ๋๋ฌธ

    ```tsx
    try {
      const obj = Point;
    } catch {
      console.log('ํธ์ด์คํ ๋ถ๊ฐ');
    }

    class Point {
      static getPoint() {
        return 100;
      }
    }

    console.log(Point.getPoint());

    // ์คํ ๊ฒฐ๊ณผ
    // ํธ์ด์คํ ๋ถ๊ฐ
    // 100
    ```

- `const obj = Point;` ์ฝ๋ ์๋์ `Point` ํด๋์ค๊ฐ ์์ง๋ง `Point` ๋ฅผ ์ฐธ์กฐํ์ง ๋ชปํ๋ฏ๋ก ์๋ฌ ๋ฐ์
- `Point.getPoint();`
  - ์ฝ๋ ์์์ `Point` ํด๋์ค๋ฅผ ์ค๋ธ์ ํธ๋ก ์์ฑํ๋ฏ๋ก `getPoint()` ๋ฅผ ํธ์ถํ  ์ ์์

<br>

## 5. new.target

- `[new.target](http://new.target)` ํ๋กํผํฐ๋ ํจ์ ๋๋ ์์ฑ์๊ฐ `new` ์ฐ์ฐ์๋ก ํธ์ถ๋ ์ฌ๋ถ๋ฅผ ๋ฐํํจ

- `new` ์ฐ์ฐ์๋ก `constructor`๋ฅผ ํธ์ถํ๋ฉด `new.target` ์ `constructor`๋ฅผ ์ฐธ์กฐ

  ```tsx
  class Point {
    constructor() {
      console.log(new.target.name);
    }
  }

  new Point();

  // 1. new Point() constructor๋ฅผ ํธ์ถํจ
  // 2. new.target.name constructor์์ new.target์ constructor๋ฅผ ์ฐธ์กฐํจ
  // 3. ๋ํ, constructor๊ฐ ํด๋์ค๋ฅผ ์ฐธ์กฐํ๋ฏ๋ก name ํ๋กํผํฐ ๊ฐ์ผ๋ก Point๊ฐ ์ถ๋ ฅ ๋จ
  ```

- ํจ์๋ก ํธ์ถํ๋ฉด `undefined` ๋ฐํ

  ```tsx
  function book() {
    console.log(new.target);
  }

  book();

  // 1. book() new ์ฐ์ฐ์๋ฅผ ์ฌ์ฉํ์ง ์๊ณ  ํธ์ถ ๋จ
  // 2. new.target ํจ์๋ก ํธ์ถ ํ๋ฉด new.target์ undefined๋ฅผ ๋ฐํ
  ```

```toc

```
