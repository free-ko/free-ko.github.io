---
emoji: ๐จโ๐ป
title: Object ๋ณํ
date: '2021-09-25 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  Object ๋ณํ: entries(), values(), fromEntries(), getOwnPropertyDescriptors()
</h1>

<br>

## 1. entries()

- ์ด๊ฑฐ ๊ฐ๋ฅํ ์ค๋ธ์ ํธ์ `{key: value}`๋ฅผ `[[key, value]]` ํํ๋ก ๋ณํ

  ```tsx
  const obj = { music: '์์', book: '์ฑ' };
  const list = Object.entries(obj);

  for (let keyValue of list) {
    console.log(keyValue);
  }

  // 1. list๋ ์ดํฐ๋ฌ๋ธ ์ค๋ธ์ ํธ ์
  // 2. [[key, value]] ํํ๋ฅผ Map ํํ๋ผ๊ณ  ๋ถ๋ฆ
  // ๊ฒฐ๊ณผ : [music, ์์], [book, ์ฑ]
  ```

- ์์ฑํ ์์๊ฐ ๋ฐ๋๋ ๊ฒฝ์ฐ

  ```tsx
  const obj = { 10: '์ญ', book: '์ฑ', 7: '์น ' };
  const list = Object.entries(obj);

  for (let keyValue of list) {
    console.log(keyValue);
  }

  // 1. ์์ [์ฝ๋ 1]์ฒ๋ผ key๊ฐ ์๋ฌธ์์ผ ๋๋ key๊ฐ์ ๋ถ๋ฅํ์ง ์๊ณ  ์์ฑํ ๋๋ก ๋ฐํ
  // 2. ๋ฐ๋ฉด, [์ฝ๋ 2]์ฒ๋ผ ์ซ์์ ๋ฌธ์๊ฐ ์์ฌ ์์ผ๋ฉด ์ซ์, ๋ฌธ์ ์์๋ก ๋ถ๋ฅํจ
  // ๊ฒฐ๊ณผ
  // [7, ์น ]
  // [10, ์ญ]
  // [book, ์ฑ]
  ```

- ๋ฌธ์์ด์ ๋ฌธ์ ํ๋์ฉ ๋ถ๋ฆฌ

  ```tsx
  const list = Object.entries('ABC');

  for (let keyValue of list) {
    console.log(keyValue);
  }

  // 1. ๋ฌธ์์ด์ ๋ฌธ์ ํ๋์ฉ ๋ถ๋ฆฌ ํ๋ฉฐ
  // 2. ์ธ๋ฑ์ค๋ฅผ key ๊ฐ์ผ๋ก ์ฌ์ฉ ํจ
  // ๊ฒฐ๊ณผ
  // [0, A]
  // [1, B]
  // [2, C]
  ```

<br>

## 2. values()

- ์ด๊ฑฐ ๊ฐ๋ฅํ ์ค๋ธ์ ํธ์ `{key: value}`๋ฅผ `[value1, value2]` ํํ๋ก ๋ณํ

  ```tsx
  const obj = { music: '์์', book: '์ฑ' };
  const list = Object.values(obj);

  for (let value of list) {
    console.log(value);
  }

  // ์์
  // ์ฑ
  ```

- ์์ฑํ ์์๊ฐ ๋ฐ๋๋ ๊ฒฝ์ฐ

  ```tsx
  const obj = { 10: '์ญ', book: '์ฑ', 7: '์น ' };
  const list = Object.values(obj);

  for (let keyValue of list) {
    console.log(value);
  }

  // 1. ์์ [์ฝ๋ 1]์ฒ๋ผ key๊ฐ ์๋ฌธ์์ผ ๋๋ key๊ฐ์ ๋ถ๋ฅํ์ง ์์ง๋ง
  // 2. ๋ฐ๋ฉด, [์ฝ๋ 2]์ฒ๋ผ ์ซ์์ ๋ฌธ์๊ฐ ์์ฌ ์์ผ๋ฉด ์ซ์, ๋ฌธ์ ์์๋ก ๋ถ๋ฅํจ
  // ๊ฒฐ๊ณผ
  // ์น 
  // ์ญ
  // ์ฑ
  ```

- ๋ฌธ์์ด์ ๋ฌธ์ ํ๋์ฉ ๋ถ๋ฆฌ

  ```tsx
  const list = Object.entries('ABC');

  for (let keyValue of list) {
    console.log(keyValue);
  }

  // 1. ๋ฌธ์์ด์ ๋ฌธ์ ํ๋์ฉ ๋ถ๋ฆฌ
  // ๊ฒฐ๊ณผ
  // A
  // B
  // C
  ```

<br>

## 3. fromEntires()

- `[[key, value]]` ํํ๋ฅผ `{key: value}` ํํ๋ก ๋ณํ

  ```tsx
  const list = [
    ['one', 10],
    ['two', 20],
  ];
  const obj = Object.fromEntries(list);

  console.log(obj);

  // {one: 10, two: 20}
  ```

- ํ๋กํผํฐ ํค ๊ฐ์ด ๊ฐ์ผ๋ฉด ๊ฐ ๋์ฒด

  ```tsx
  const list = [
    ['one', 10],
    ['one', 20],
  ];
  const obj = Object.fromEntries(list);

  console.log(obj);

  // {one: 20}
  ```

<br>

## 4. getOwnPropertyDescriptors()

- `Object`์ ํ๋กํผํฐ ๋์คํฌ๋ฆฝํฐ๋ฅผ ๋ฐํ

  - ๋ฐ์ดํฐ ๋์คํฌ๋ฆฝํฐ

  ```tsx
  const obj = { music: '์์' };
  const des = Object.getOwnPropertyDescriptors(obj);

  for (let name in des.music) {
    consolel.log(name + ': ' + des.music[name]);
  }

  // value: ์์
  // writable: true
  // enumerable: true
  // configurable: true
  ```

  - ์ก์ธ์ค ๋์คํฌ๋ฆฝํฐ

  ```tsx
  const obj = {
    get music() {},
  };

  const des = Object.getOwnPropertyDescriptors(obj);

  for (let name in des.music) {
    console.log(name + ': ' + des.music[name]);
  }

  // get: get music() {}
  // set: undefined
  // enumerable: true
  // configurable: true
  ```

  - ์์๋ฐ์ ์ค๋ธ์ ํธ๋ ๋ฐํํ์ง ์์

```toc

```
