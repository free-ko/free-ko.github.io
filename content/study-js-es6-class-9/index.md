---
emoji: ๐จโ๐ป
title: this ์ฐธ์กฐ, Generator
date: '2021-11-23 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  this ์ฐธ์กฐ, Generator
</h1>

<br>

## 1. this ์ฐธ์กฐ

- `์ธ์คํด์ค.๋ฉ์๋()` ํํ๋ก ํธ์ถํ๋ฉด ๋ฉ์๋์์ `this`๊ฐ ์ธ์คํด์ค๋ฅผ ์ฐธ์กฐ ํจ
- `static` ๋ฉ์๋์์ `this` ๋ ๋ฉ์๋๊ฐ ์ํ ํด๋์ค๋ฅผ ์ฐธ์กฐํจ

  ```tsx
  class Point {
    static setPoint(point) {
      this.value = vapoint;
    }
  }

  Point.setPoint(100);

  console.log(Point.value); // 100
  console.log(new Point().value); // undefined

  // 1. class Point ์์ง์ด class ํค์๋๋ฅผ ๋ง๋๋ฉด ํด๋์ค ์ค๋ธ์ ํธ๋ฅผ ๋ง๋ฌ
  // 2. this.value = point; this๊ฐ ๋ฉ์๋๋ฅผ ํธ์ถํ ์ค๋ธ์ ํธ๋ฅผ ์ฐธ์กฐํจ, ์ฆ this๊ฐ Point ํด๋์ค๋ฅผ ์ฐธ์กฐํ๋ฏ๋ก Point ํด๋์ค์ {valeu: 100} ํํ๋ก ์ค์ ๋จ
  // 3. Point.value Point ํด๋์ค์์ value ๊ฐ์ ๊ตฌํ๊ฒ ๋๋ฉฐ 100์ด ๋ฐํ๋จ
  // 4. new Point().value Point ์ธ์คํด์ค๋ฅผ ์์ฑํ๊ณ  value ๊ฐ์ ๊ตฌํ๋ฉด undefined ๋ฐํ๋จ
  // 5. Point ํด๋์ค์ ์ค์ ๋ value ํ๋กํผํฐ๋ ์์ฑํ ์ธ์คํด์ค์ ํฌํจ๋์ง ์์
  ```

- `static property`

  ```tsx
  class Point {
    static value = 100;
  }

  console.log(Point.value); // 100

  Point.bonnus = 300;

  console.log(Point.bonnus); // 300
  console.log(new Point().value); // undefined

  // 1. static value = 100; ๊ฐ์ static property์ ์ค์ ํจ
  // 2. ES2020 ๊ธฐ์ค์ผ๋ก ์คํ ์ ์ ๋จ๊ณ์ ํ์ง๋ง ๋๋ถ๋ถ์ ๋ธ๋ผ์ฐ์ ์์ ์ง์ ํจ
  // 3. Point.value Point ํด๋์ค์ static ํ๋กํผํฐ๋ก ๊ฐ์ ๊ตฌํจ
  // 4. Point.bonnus = 300; Point ํด๋์ค์ static ํ๋กํผํฐ๋ก ์ค์ ๋๋ฉฐ {bonnus: 300} ํํ์
  // 5. Point.bonnus Point ํด๋์ค์ static ํ๋กํผํฐ๋ก ๊ฐ์ ๊ตฌํจ
  // 6. new Point().value Point ์ธ์คํด์ค๋ฅผ ์์ฑํ๊ณ  value ๊ฐ์ ๊ตฌํ๋ฉด undefined๊ฐ ๋ฐํ๋จ
  // 7. Point ํด๋์ค์ static ํ๋กํผํฐ๋ ์์ฑํ ์ธ์คํด์ค์ ํฌํจ๋์ง ์์
  ```

- `constructor`์์ `this.construcotr` ๋ ์์ฑํ๋ ์ธ์คํด์ค๊ฐ ์๋๋ผ ํด๋์ค ์ค๋ธ์ ํธ๋ฅผ ์ฐธ์กฐ ํจ

  ```tsx
  class Point {
    constructor() {
      console.log(this.constructor.get());
    }
    static get() {
      return 100;
    }
  }

  new Point(); // 100

  // this.constructor.get() thisconstructor๊ฐ Point ํด๋์ค๋ฅผ ์ฐธ์กฐํ๋ฏ๋ก static ๋ฉ์๋๋ฅผ ํธ์ถํ  ์ ์์
  ```

  <br>

## 2. Generator

- ํด๋์ค์ ์ ๋๋ ์ดํฐ ํจ์๋ `prototype`์ ์ฐ๊ฒฐ๋จ, ์ธ์คํด์ค๋ก ํธ์ถํด์ผ ํจ

  ```tsx
  class Point {
    getPoint() {
      yield 10;
      yield 20;
    }
  }

  const gen = new Point();
  const obj = gen.getPoint();

  console.log(obj.next());
  console.log(obj.next());
  console.log(obj.next());

  // 1. const obj = gen.getPoint(); ์ธ์คํด์ค์ ์ ๋๋ ์ดํฐ ํจ์๋ฅผ ํธ์ถํ๋ฉด ์ดํฐ๋ ์ดํฐ ์ค๋ธ์ ํธ๋ฅผ ์์ฑํ์ฌ ๋ฐํ
  // 2. obj.next()๋ฅผ ์คํํ  ๋๋ง๋ค yield์์ ์คํ๊ฒฐ๊ณผ ์ฒ๋ผ ๋ฐํํจ

  // ์คํ๊ฒฐ๊ณผ
  // {value: 10, done: false}
  // {value: 20, done: false}
  // {value: undefined, done: true}
  ```

```toc

```
