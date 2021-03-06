---
emoji: ๐จโ๐ป
title: WeakSet ์ค๋ธ์ ํธ ๊ฐ์, new WeakSet(), has(), add(), delete()
date: '2021-11-14 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  WeakSet ์ค๋ธ์ ํธ ๊ฐ์, new WeakSet(), has(), add(), delete()
</h1>

<br>

## 1. WeakSet ์ค๋ธ์ ํธ

- `Set` ์ค๋ธ์ ํธ์ ์ฐจ์ด

  - ์ค๋ธ์ ํธ๋ง `value` ๊ฐ์ผ๋ก ์ฌ์ฉํ  ์ ์์
  - `number` ๋ฑ์ ํ๋ฆฌ๋ฏธํฐ๋ธ ํ์ ์ฌ์ฉ ๋ถ๊ฐ

- ๊ฐ๋์ `WeakMap`๊ณผ ๊ฐ์

  - `value`๋ง ์์ฑํ๋ ๊ฒ์ด ๋ค๋ฆ
  - `value`์ ์ฐธ์กฐ๊ฐ ๋ฐ๋๋ฉด `GC` ๋์

- ์ง์ ๋ฉ์๋
  - `has()`, `add()`, `delete()`

<br>

## 2. new WeakSet()

- `WeakSet` ์ธ์คํด์ค ์์ฑ, ๋ฐํ

- ํ๋ผ๋ฏธํฐ

  - ๋๊ดํธ `[ ]` ์์ ์ค๋ธ์ ํธ ์์ฑ

  ```tsx
  const empty = new WeakSet();
  const sports = {};
  const obj = new WeakSet([
  	sports
  ]};

  // 1. ํ๋ผ๋ฏธํฐ๋ฅผ ์์ฑํ์ง ์์๋ ๋จ
  // 2. new ์ฐ์ฐ์๋ฅผ ์ฌ์ฉ ํจ
  ```

<br>

## 3. has()

- `WeakSet` ์ธ์คํด์ค์์ `value`์ ์กด์ฌ ์ฌ๋ถ ๋ฐํ

  - ์กด์ฌํ๋ฉด `true`, ์๋๋ฉด `false` ๋ฐํ

    ```tsx
    const fn = () => {};
    const obj = new WeakSet([
    	fn
    ]};

    console.log(obj.has(fn));   // true
    ```

<br>

## 4. add()

- `WeakSet` ์ธ์คํด์ค์ `value` ์ค์ 

  - ํ๋ผ๋ฏธํฐ์ `value` ๋ก ์ค์ ๋  ์ค๋ธ์ ํธ ์์ฑ

    ```tsx
    const obj = new WeakSet();
    const fn = () => {};
    obj.add(fn);

    console.log(obj.has(fn)); // true
    ```

<br>

## 5. delete()

- `WeakSet` ์ธ์คํด์ค์์ `value`์ ์ผ์นํ๋ ์๋ฆฌ๋จผํธ ์ญ์ 

  - ์ญ์  ์ฑ๊ณต์ด๋ฉด `true` ๋ฐํ

  - ์ญ์ ๋ฅผ ์คํจํ๋ฉด `false` ๋ฐํ

    ```tsx
    const fn = () => {};
    const obj = new WeakSet([fn]);

    console.log(obj.delete(fn)); // true
    console.log(obj.has(fn)); // false
    ```

<br>

```toc

```
