---
emoji: ๐จโ๐ป
title: WeakMap ์ค๋ธ์ ํธ ๋ฉ์๋ - get(), set(), has(), delete()
date: '2021-11-07 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  WeakMap ์ค๋ธ์ ํธ ๋ฉ์๋: get(), set(), has(), delete()
</h1>

<br>

## 1. get()

- `WeakMap` ์ธ์คํด์ค์์

  - key ๊ฐ์ด ๊ฐ์ value ๋ฐํ
  - ์กด์ฌํ์ง ์์ผ๋ฉด `undefined` ๋ฐํ

  ```tsx
  const fn = () => {};
  const obj = new WeakMap([[fn, 'ํจ์']]);

  console.log(obj.get(fn)); // ํจ์
  ```

<br>

## 2. set()

- `WeakMap` ์ธ์คํด์ค์ key, value ์ค์ 

  ```tsx
  const fn = function(){};
  const obj = new WeakMap([
  	[fn, "ํจ์]
  ]);

  console.log(obj.get(fn));  // ํจ์

  obj.set(fn, "ํจ์ ๋ณ๊ฒฝ");
  console.log(obj.get(fn));  // ํจ์ ๋ณ๊ฒฝ
  ```

- ์ฒซ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ key๋ก ์ฌ์ฉํ  ์ค๋ธ์ ํธ ์์ฑ
  - string๊ณผ ๊ฐ์ ํ๋ฆฌ๋ฏธํฐ๋ธ ๊ฐ ์ฌ์ฉ ๋ถ๊ฐ
- ๋ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ๋ ๊ฐ
  - ์ฒซ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ ์ค๋ธ์ ํธ์ ๋ํ ๊ฐ?
  - ์ค๋ธ์ ํธ ๊ตฌ๋ถ ๋ฑ์ ์ฉ๋, ์ค๋ธ์ ํธ์ ๋ฐ๋ผ ์ฐ๋ํ๋ ํจ์ ๋ฑ๋ก

<br>

## 3. has()

- `WeakMap` ์ธ์คํด์ค์์

  - key์ ์กด์ฌ ์ฌ๋ถ ๋ฐํ
  - ์กด์ฌํ๋ฉด `true`, ์๋๋ฉด `false` ๋ฐํ

    ```tsx
    const obj = {};
    const weakObj = new WeakMap([[obj, '์ค๋ธ์ ํธ']]);

    console.log(weakObj.has(obj)); // true
    ```

<br>

## 4. delete()

- `WeakMap` ์ธ์คํด์ค์์

  - key์ ์ผ์นํ๋ `entry` ์ญ์ 

    ```tsx
    const fn = function () {};
    const obj = new WeakMap([[fn, 'ํจ์']]);

    console.log(obj.delete(fn)); // true
    console.log(obj.has(fn)); // false
    ```

  - ์ญ์ ๋ฅผ ์ฑ๊ณตํ๋ฉด `true` ๋ฐํ
  - ์ญ์ ๋ฅผ ์คํจํ๋ฉด `false` ๋ฐํ

```toc

```
