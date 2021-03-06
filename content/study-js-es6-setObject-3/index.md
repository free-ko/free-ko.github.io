---
emoji: ๐จโ๐ป
title: Set๊ณผ ์ดํฐ๋ ์ดํฐ ์ค๋ธ์ ํธ - entries(), keys(), values(), Symbol.iterator()
date: '2021-11-12 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  Set๊ณผ ์ดํฐ๋ ์ดํฐ ์ค๋ธ์ ํธ - entries(), keys(), values(), Symbol.iterator()
</h1>

<br>

## 1. entries()

- `Set` ์ธ์คํด์ค๋ก ์ดํฐ๋ ์ดํฐ ์ค๋ธ์ ํธ ์์ฑ, ๋ฐํ

  - `Set` ์ธ์คํด์ค์ ์ค์ ๋ ์์๋ก ๋ฐํ
  - `next()`๋ก `[value, value]` ๋ฐํ

  ```tsx
  const obj = new Set(['one', () => {}]);

  const iterObj = obj.entries();

  console.log(iterObj.next()); // {value: [one, one], done: false}
  console.log(iterObj.next()); // {value: [() => {}, () => {}], done: false}
  console.log(iterObj.next()); // {value: undefined, done: true}
  ```

<br>

## 2. keys()

- `value` ๊ฐ `key` ๊ฐ ๋๋ฏ๋ก `keys()` ๋ ์๋ฏธ๊ฐ ์์
  - `Map` ์ค๋ธ์ ํธ์ ๋ง์ถ๊ธฐ ์ํ ๊ฒ
- `Set` ์ธ์คํด์ค์ `value` ๋ฅผ key๋ก ์ฌ์ฉํ์ฌ ์ดํฐ๋ ์ดํฐ ์ค๋ธ์ ํธ ์์ฑ, ๋ฐํ
  - `Set` ์ธ์คํด์ค์ ์ค์ ๋ ์์๋ก ๋ฐํ
- `next()` ๋ก `value(key)` ๋ฐํ

  ```tsx
  const obj = new Set(['one', () => {}]);

  const iterObj = obj.keys();

  console.log(iterObj.next()); // {value: one, done: false}
  console.log(iterObj.next()); // {value: () => {}, done: false}
  console.log(iterObj.next()); // {value: undefined, done: true}
  ```

<br>

## 3.values()

- `Set` ์ธ์คํด์ค์ `value` ๋ก ์ดํฐ๋ ์ดํฐ ์ค๋ธ์ ํธ ์์ฑ, ๋ฐํ
  - `Set` ์ธ์คํด์ค์ ์ค์ ๋ ์์๋ก ๋ฐํ
- `next()` ๋ก `value` ๋ฐํ

  ```tsx
  const obj = new Set(['one', () => {}]);

  const iterObj = obj.values();

  console.log(iterObj.next()); // {value: one, done: false}
  console.log(iterObj.next()); // {value: () => {}, done: false}
  console.log(iterObj.next()); // {value: undefined, done: true}
  ```

<br>

## 4. Symbol.iterator()

- `Set` ์ธ์คํด์ค๋ก ์ดํฐ๋ ์ดํฐ ์ค๋ธ์ ํธ ์์ฑ, ๋ฐํ

  - `Set.prototype.values()` ์ ๊ฐ์
  - `next()` ๋ก `value` ๋ฐํ

    ```tsx
    const obj = new Set(['one', () => {}]);

    const iterObj = obj[Symbol.iterator]();

    console.log(iterObj.next()); // {value: one, done: false}
    console.log(iterObj.next()); // {value: () => {}, done: false}
    console.log(iterObj.next()); // {value: undefined, done: true}
    ```

```toc

```
