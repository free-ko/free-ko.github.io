---
emoji: ๐จโ๐ป
title: constructor, constructor ๋ฐํ
date: '2021-11-18 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  constructor, constructor ๋ฐํ
</h1>

<br>

## 1. constructor

- `constructor`๋ ์์ฑ์๋ก ์ธ์คํด์ค๋ฅผ ์์ฑํ๊ณ  ์ด๊ธฐํ ํจ
- ES5๊น์ง๋ `constructor` ๋ฅผ ์์ฑํ  ์ ์์์ผ๋ ES6๋ถํฐ๋ ์์ฑ ํ  ์ ์์

  ```tsx
  class Point {
    constructor(point) {
      this.point = point;
    }
  }

  const obj = new Point(100);

  // ์ธ์คํด์ค ์์ฑ ๋ฐฉ๋ฒ
  // 1. new ์ฐ์ฐ์๊ฐ Point ํด๋์ค ์ค๋ธ์ ํธ์ constructor๋ฅผ ํธ์ถ ํจ, ํ๋ผ๋ฏธํฐ ๊ฐ์ธ 100์ constructor๋ก ๋๊ฒจ์ค
  // 2. ์์ง์ ๋น ์ค๋ธ์ ํธ{}๋ฅผ ์์ฑํจ ์ด๊ฒ์ด ์ธ์คํด์ค ์
  // 3. ์ธ์คํด์ค์ ํ๋กํผํฐ ์ด๋ฆ๊ณผ ๊ฐ์ ์ค์ ํ์ฌ ์ธ์คํด์ค ๊ตฌ์กฐ๋ฅผ ๋ง๋ฌ(ex. __proto__, __proto__.constructor ๋ฑ)
  // 4. construcotr ๋ธ๋ก์ ์ฝ๋๋ฅผ ์คํ ํจ
  // 5. this๊ฐ ์์ฑํ ์ธ์คํด์ค๋ฅผ ์ฐธ์กฐํจ, ์ธ์คํด์ค{}๋ฅผ ๋จผ์  ์์ฑํ๋ฏ๋ก this๋ก ์ฐธ์กฐํ  ์ ์์
  // 6. point๋ ์ธ์คํด์ค ํ๋กํผํฐ๊ฐ ๋จ(point ํ๋ผ๋ฏธํฐ ๊ฐ์ด 100์ด ๋จ)
  // 7. ์์ฑํ ์ธ์คํด์ค๋ฅผ ๋ฐํ ํจ
  ```

<br>

## 2. constructor ๋ฏธ์์ฑ

- `constructor` ๋ฅผ ์์ฑํ์ง ์์ ์ํ์์ `new` ์ฐ์ฐ์๋ก ์ธ์คํด์ค๋ฅผ ์์ฑํ๋ฉด
- `porototype`์ ์ฐ๊ฒฐ๋ `constructor`๊ฐ ํธ์ถ ๋จ

  ```tsx
  class Point {
    setPoint(point) {
      this.point = point;
    }
  }

  const obj = new Point();
  obj.setPoint(100);

  // 1. ์์ง์ด class ํค์๋๋ฅผ ๋ง๋ Point ํด๋์ค ์ค๋ธ์ ํธ๋ฅผ ์์ฑํ  ๋ constructor์์ ํด๋์ค ์ ์ฒด๋ฅผ ์ฐธ์กฐํ๋๋ก ํ๊ฒฝ์ ๋ง๋ฌ
  // 2. constructor๋ฅผ ์์ฑํ์ง ์์ผ๋ฉด prototype.constructor๋ฅผ ์ฌ์ฉํ๋ฏ๋ก ์ธ์คํด์ค๋ฅผ ์์ฑํ  ์ ์์ง๋ง ์ธ์คํด์ค์ ์ด๊น๊ฐ์ ์ค์ ํ  ์ ์์
  // 3. ํด๋์ค์ constructor๋ฅผ ์์ฑํ๋ฉด protytpe.constructor๋ฅผ ์ค๋ฒ๋ผ์ด๋ ํ๊ฒ ๋จ
  ```

<br>

## 3. constructor ๋ฐํ

- `constructor` ์ `return` ์ ์์ฑํ์ง ์์ผ๋ฉด ์์ฑํ ์ธ์คํด์ค๋ฅผ ๋ฐํ ํจ
- `constructor` ์์ `Number`, `String`์ ๋ฐํ ํ๋ฉด ์ด๋ฅผ ๋ฌด์ํ๊ณ  ์ธ์คํด์ค๋ฅผ ๋ฐํ ํจ

  ```tsx
  class Point {
    constructor(point) {
      this.point = point;
      return point;
    }
  }

  const obj = new Point(100);

  console.log(obj.point); // 100
  console.log(obj instanceof Point); // true

  // 1. return point; constructor์์ ํ๋ผ๋ฏธํฐ๋ก ๋ฐ์ Number ํ์์ 100์ ๋ฐํ ํจ
  // 2. ์ด๋, 100์ ๋ฐํํ์ง ์๊ณ  ์์ฑํ ์ธ์คํด์ค๋ฅผ ๋ฐํํจ
  // 3. console.log(obj.point) obj๊ฐ ์ธ์คํด์ค์ด๋ฏ๋ก ํ๋กํผํฐ๋ก ๊ฐ์ ๊ตฌํ  ์ ์์
  // 4. console.log(obj instanceof Point); obj๊ฐ Point ํด๋์ค๋ก ๋ง๋  ์ธ์คํด์ค์ด๋ฏ๋ก true๊ฐ ์ถ๋ ฅ๋จ
  ```

- `constructor` ์์ `Object`๋ฅผ ๋ฐํ ํ๋ฉด ์ธ์คํด์ค๋ฅผ ๋ฐํํ์ง ์๊ณ  `Object` ๋ฐํ

  ```tsx
  class Point {
    constructor(point) {
      return { point: point };
    }
  }

  const obj = new Point(100);

  console.log(obj); // {point: 100}
  console.log(obj instanceof Point); // false

  // 1. return {point: point}; constructor์์ Objet๋ฅผ ๋ฐํํจ
  // 2. ์์ฑํ ์ธ์คํด์ค๋ฅผ ๋ฐํํ์ง ์๊ณ  return ํํ์์ ๊ฒฐ๊ณผ๋ฅผ ๋ฐํ ํจ
  // 3. console.log(obj); returnํ Object๊ฐ ์ถ๋ ฅ๋จ
  // 4. console.log(obj instanceof Point); obj๊ฐ Point์ผ๋ก ๋ง๋  ์ธ์คํด์ค๊ฐ ์๋๋ฏ๋ก false๊ฐ ์ถ๋ ฅ๋จ
  ```

```toc

```
