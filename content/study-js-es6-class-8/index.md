---
emoji: ๐จโ๐ป
title: Built-in ์ค๋ธ์ ํธ ์์, Object ์์, Image ์ค๋ธ์ ํธ ์์, Audio ์ค๋ธ์ ํธ ์์
date: '2021-11-22 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  Built-in ์ค๋ธ์ ํธ ์์, Object ์์, Image ์ค๋ธ์ ํธ ์์, Audio ์ค๋ธ์ ํธ ์์
</h1>

<br>

## 1. Built-in ์ค๋ธ์ ํธ ์์

- ๋นํธ์ธ ์ค๋ธ์ ํธ๋ฅผ ์์๋ฐ์ ์ ์์

  - ์ธ์คํด์ค๊ฐ ๋นํธ์ธ ์ค๋ธ์ ํธ์ ํน์ง์ ๊ฐ๊ฒ ๋๋ฉฐ `this` ๋ก ๋นํธ์ธ ์ค๋ธ์ ํธ์ ์ ๊ทผํ  ์ ์์
  - `extends` ํค์๋๋ก ๊ตฌํํจ

    ```tsx
    class Point extends Array {
    	constructor() {
    		super();
    	}

    	getTotal() {
    		let total = 0;
    		for (const value of this) {
    			total += value;
    		};
    		retru total;
    	}
    }

    const obj = new Point();
    obj.push(10,20,30);

    console.log(obj.getTotal());   // 60

    // 1. ๋นํธ์ธ Array ์ค๋ธ์ ํธ๋ฅผ ์์๋ฐ์
    // 2. ๋นํธ์ธ ์ค๋ธ์ ํธ์ constructor๋ฅผ ํธ์ถ ํจ, ์์ฑํ๋ ์ธ์คํด์ค์ __proto__.__proto__์ Array.prototype์ ๋ฉ์๋๊ฐ ์ค์ ๋จ
    // 3. obj๊ฐ Point ์ธ์คํด์ค์ด์ง๋ง Array ์ค๋ธ์ ํธ๋ฅผ ์์ ๋ฐ์์ผ๋ฏ๋ก push() ๋ฉ๋ชจ์ค๋ฅผ ํธ์ถ ํ  ์ ์์
    // 4. ์ธ์คํด์ค ํ๋กํผํฐ๋ก {0: 10, 1: 20, 2: 30, length:3}์ด ์ค์ ๋จ
    // 5. obj์ [10, 20, 30]์ด ์์ผ๋ฉฐ obj.__proto__์ getTotal()์ด ์๊ณ  obj.__proto__.__proto__์ Array ์ค๋ธ์ ํธ์ ๋ฉ์๋๊ฐ ์์ผ๋ฏ๋ก ๊ฐ๊ณผ ๋ฉ์๋๋ฅผ ๋ชจ๋ ์ฌ์ฉํ  ์ ์์
    // 6. this๊ฐ obj ์ธ์คํด์ค๋ฅผ ์ฐธ์กฐํ์ฌ Array [10, 20, 30]์ ์ดํฐ๋ฌ๋ธ ์ค๋ธ์ ํธ์ด๋ฏ๋ก for-of๋ก ๋ฐ๋ณต ํ  ์ ์์
    ```

- ์ฝ๋ ํ๋ก์ธ์ค

  - `class Point extends Array {...}`
  - `const obj = new Point()`
  - `constructor() { super() }`
  - `obj.push(10, 20, 30)`
  - `obj.getTotal()`
  - `for (const value of this) {...}`

<br>

## 2. Object ์์

- `Object`๋ ํด๋์ค๊ฐ ์๋๋ฏ๋ก ๋ค๋ฅธ `Object`๋ฅผ ์์ ๋ฐ์ ์ ์์ง๋ง ์์ ๋ฐ์ผ๋ฉด `__proto__` ๊ตฌ์กฐ๊ฐ ๋๋ ๊ฒ์ ํ์ฉํ์ฌ ์์์ ๊ตฌํ ํ  ์ ์์
- `Object` ์์

  - `Object.setPrototypeOf()`๋ก `__proto__` ๊ตฌ์กฐ๋ฅผ ๋ง๋ฌ

  ```tsx
  const Book = {
    getTitle() {
      console.log('Book');
    },
  };

  const Point = {
    getTitle() {
      super.getTitle();
    },
  };

  Object.setPrototypeOf(Point, Book);

  Point.getTitle(); // Book

  // 1. Book๊ณผ Point๋ Object์, getTitle()์ ํจ์์ด๋ฉฐ ๊ฐ Object์ ์์
  // 2. Object.setPrototypeOf(Point, Book); Point์ getTitle()์ด ์๊ณ  Point.__proto__์ Book์ getTitle()์ด ์๋ ๊ตฌ์กฐ๊ฐ ๋จ
  // 3. Point.getTitle(); Point ์ค๋ธ์ ํธ์ getTitle()์ด ํธ์ถ ๋จ
  // 4. super.getTitle(); super()๊ฐ ์๋๋ผ super์
  // 5. super๋ ํ ๋จ๊ณ ์๋์ __proto__๋ฅผ ์ฐธ์กฐํจ, ์๋๋ __proto__์ ์ฐ๊ฒฐ๋์ด ์๋ค๋ ๋ป Book ์ค๋ธ์ ํธ์ getTitle()์ ํธ์ถ ํจ
  ```

<br>

## 3. Image ์ค๋ธ์ ํธ ์์

- `Image` ์ค๋ธ์ ํธ ์์ ์ฝ๋

  ```tsx
  class Home extends Image {
    constructor() {
      super();
    }

    setAttr() {
      this.src = '../../image/rainbow.png';
      this.alt = '์ง๊ณผ ๋๋ฌด๊ฐ ์๊ณ ' + '๋ฌด์ง๊ฐ๊ฐ ์๋ ๋ชจ์ต';
      this.title = '๋ฌด์ง๊ฐ';
    }
  }

  const obj = new Home();
  obj.setAttr();

  documnet.querySelector('#show').appendChild(obj);
  ```

- `super();`
  - `Image` ์ค๋ธ์ ํธ์ `constructor`๋ฅผ ํธ์ถ
- `this.src`, `this.alt`, `this.title`
  - `Image` ์ค๋ธ์ ํธ๋ฅผ `this`๋ก ์ฐธ์กฐ
  - `Image` ์์ฑ์ ๊ฐ์ ํ ๋น ํจ

<br>

## 4. Audio ์ค๋ธ์ ํธ ์์

- `Audio` ์ค๋ธ์ ํธ ์์

  ```tsx
  class Music extends Audio {
    constructor() {
      super();
    }

    setAttr(src, controls, muted, loop) {
      this.src = src;
      this.controls = controls;
      this.muted = muted;
      this.loop = loop;
    }
  }

  const obj = new Music();
  const src = '../../image/Beet5.png';
  obj.setAttr(src, true, true, true);

  doccument.querySelector('#show').appendChild(obj);
  ```

- `super()`
  - `Audio` ์ค๋ธ์ ํธ์ `constructor`๋ฅผ ํธ์ถ
- `this.src`, `this.controls`
  - `Audio` ์ค๋ธ์ ํธ๋ฅผ `this`๋ก ์ฐธ์กฐ
  - `Audio` ์์ฑ์ ๊ฐ์ ํ ๋นํจ
  - ํ๋ผ๋ฏธํฐ ๊ฐ์ ๋ฐ์ ์์ฑ๊ฐ์ ์ค์ ํ๋ฉด ๋ฒ์ฉ ํด๋์ค๋ก ์ฌ์ฉํ  ์ ์์

```toc

```
