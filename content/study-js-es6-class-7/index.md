---
emoji: ๐จโ๐ป
title: super ํค์๋, constructor ํธ์ถ
date: '2021-11-21 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  super ํค์๋, constructor ํธ์ถ
</h1>

<br>

## 1. super ํค์๋

- ์ํผ ํด๋์ค์ ์๋ธ ํด๋์ค์ ๊ฐ์ ์ด๋ฆ์ ๋ฉ์๋๊ฐ ์์ผ๋ฉด ์๋ธ ํด๋์ค์ ๋ฉ์๋๊ฐ ํธ์ถ ๋จ
- `super` ํค์๋๋ฅผ ์ฌ์ฉํ์ฌ ์ํผ ํด๋์ค์ ๋ฉ์๋๋ฅผ ํธ์ถ ํ  ์ ์์
- `super.getTitle()` ์ ํํ

  ```tsx
  class Book {
    getTitle() {
      console.log('์ํผ');
    }
  }

  class Point extends Book {
    getTitle() {
      super.getTitle();
      console.log('์๋ธ');
    }
  }

  new Point().getTitle();

  // 1. new Point.getTitle() ์ธ์คํด์ค๋ฅผ ์์ฑํ๊ณ  getTitle()์ ํธ์ถํ๋ฉด ์๋ธ ํด๋์ค์ ๋ฉ์๋๊ฐ ํธ์ถ ๋จ
  // 2. super.getTitle() super ํค์๋๊ฐ ์ํผ ํด๋์ค๋ฅผ ์ฐธ์กฐํ๋ฏ๋ก ์ํผ ํด๋์ค์ getTitle()์ด ํธ์ถ๋จ

  // ์คํ๊ฒฐ๊ณผ
  // ์ํผ
  // ์๋ธ
  ```

<br>

## 2. constructor ํธ์ถ

- ์๋ธ์ ์ํผ์ `constructor`๋ฅผ ๋ชจ๋ ์์ฑํ์ง ์์ผ๋ฉด ๋ํดํธ `constructor`๊ฐ ํธ์ถ ๋จ

  ```tsx
  class Book {
    setTitle(title) {
      this.title = title;
    }
  }

  class Point extends Book {}

  const obj = new Point();

  obj.setTitle('์ฑ');
  console.log(obj.title);

  // 1. Point ํด๋์ค์ constructor๋ฅผ ์์ฑํ์ง ์์ผ๋ฉด Point.prototype.constructor๊ฐ ํธ์ถ๋จ
  // 2. ์ด์ด์ Book ํด๋์ค์ constructor๊ฐ ํธ์ถํจ, Book ํด๋์ค์ constructor๋ฅผ ์์ฑํ์ง ์์ผ๋ฉด Book.prototype.constructor๊ฐ ํธ์ถ ๋จ
  // 3. ์ฆ, ๊ฐ ํด๋์ค์ constructor๋ฅผ ํธ์ถํ๋ฉฐ ํด๋์ค์ construcotr๋ฅผ ์์ฑํ์ง ์์ผ๋ฉด ํด๋์ค์ prototype.constructor๊ฐ ํธ์ถ ๋จ

  // ์คํ๊ฒฐ๊ณผ
  // ์ฑ
  ```

<br>

- ์๋ธ์ ์์ฑํ์ง ์๊ณ  `super`์๋ง ์์ฑํ๋ฉด ํ๋ผ๋ฏธํฐ ๊ฐ์ `super`๋ก ๋๊ฒจ ์ค

  ```tsx
  class Book {
    constructor(title) {
      this.title = title;
    }
  }

  class Point extends Book {}

  const obj = new Point('์ฑ');
  console.log(obj.title);

  // ์๋ธ์ prototype.constructor๊ฐ ํธ์ถ๋จ, ์ด์ด์ ์ํผ์ constructor๋ฅผ ํธ์ถํ๋ฉด์ ํ๋ผ๋ฏธํฐ ๊ฐ์ธ "์ฑ"์ ํ๋ผ๋ฏธํฐ๋ก ๋๊ฒจ ์ค

  // ์คํ ๊ฒฐ๊ณผ
  // ์ฑ
  ```

<br>

- ์๋ธ์๋ ์์ฑํ๊ณ  `super`์ ์์ฑํ์ง ์์ผ๋ฉด ์๋ฌ๊ฐ ๋ฐ์ํจ

  ```tsx
  class Book {
    setTitle(title) {
      this.title = title;
    }
  }

  class Point extends Book {
    // constructor(point) {
    //     this.point = point;
    //  };
  }

  const obj = new Point(100);

  // ์๋ธ์ constructor๋ฅผ ์์ฑํ๋ฉด ์ํผ์๋ constructor๋ฅผ ์์ฑํด์ผ ํจ
  ```

  <br>

- ์๋ธ์ ์ํผ์ `constructor`๋ฅผ ๋ชจ๋ ์์ฑํ๋ฉด ์๋ธ์์ `super()`๋ก ํธ์ถํด์ผ ํจ

  ```tsx
  class Book {
    constructor(title) {
      this.title = title;
    }
  }

  class Point extends Book {
    constructor(title, point) {
      super(title);
      this.point = point;
    }
  }

  const obj = new Point('์ฑ', 100);

  console.log(`${obj.title}, ${obj.point}`);

  // 1. super(title); ์ํผ์ constructor๋ฅผ ํธ์ถํ๋ฉฐ title ํ๋ผ๋ฏธํฐ ๊ฐ์ ํ๋ผ๋ฏธํฐ๋ก ๋๊ฒจ ์ค
  // 2. ์ด๋ ๊ฒ ๋ช์์ ์ผ๋ก ์ํผ์ constructor๋ฅผ ํธ์ถํด์ผ ํจ
  // 3. ์๋ธ์ constructor์์ this๋ฅผ ์ฌ์ฉํ๋ฉด this๋ฅผ ์ฌ์ฉํ๊ธฐ ์ ์ super()๋ฅผ ํธ์ถํด์ผ ํจ

  // ์คํ๊ฒฐ๊ณผ
  // ์ฑ 100
  ```

```toc

```
