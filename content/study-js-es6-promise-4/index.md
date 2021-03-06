---
emoji: ๐จโ๐ป
title: Promise - resolve(), thenable, reject()
date: '2021-12-18 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  Promise -  resolve(), thenable, reject()
</h1>

<br>

## 1. resolve()

- ์ฑ๊ณต(fullfilled) ์ํ์ `Promise` ์ธ์คํด์ค๋ฅผ ์์ฑํ์ฌ ๋ฐํ

  - `Promise.resolve()` ํํ๋ก ์์ฑํจ
  - ํ๋ผ๋ฏธํฐ ๊ฐ์ ๋ฐ๋ผ ์์ฑ ๋ฐฉ๋ฒ์ด ๋ค๋ฆ

- ํ๋ผ๋ฏธํฐ์ ๊ฐ์ ์์ฑํ๋ฉด ํ๋ผ๋ฏธํฐ ๊ฐ์ผ๋ก `Promise` ์ธ์คํด์ค๋ฅผ ์์ฑํ์ฌ ๋ฐํ

  ```tsx
  const obj = Promise.resolve(['sports', 'music']);

  obj.then((value) => {
    console.log(value);
  });

  console.log('๋');

  // 1. resolve() ํ๋ผ๋ฏธํฐ์ ๊ฐ์ ์์ฑํ์, ๊ฐ์ ํ๋๋ง ์์ฑํ  ์ ์์ผ๋ฏ๋ก ๋ค์๋ฅผ ์์ฑํ๋ ค๋ฉด Array, Object ๋ฑ์ ์ฌ์ฉํด์ผ ํจ
  // 2. new ์ฐ์ฐ์๋ฅผ ์ฌ์ฉํ์ง ์์ง๋ง Promise ์ธ์คํด์ค๋ฅผ ์์ฑํ์ฌ ๋ฐํํจ, ์ฑ๊ณต(fulfilled) ์ํ๋ก ์ค์ ํจ
  // 3. ์ฑ๊ณต ์ํ์ด๋ฏ๋ก then()์ ์ฒซ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ ํจ์๊ฐ ํธ์ถ๋จ

  // [์คํ๊ฒฐ๊ณผ]
  // ๋
  // ["sports", "music"]
  ```

- ํ๋ผ๋ฏธํฐ์ `Promise` ์ธ์คํด์ค๋ฅผ ์์ฑํ๋ฉด ํ๋ผ๋ฏธํฐ์ `Promise` ์ธ์คํด์ค์ ๊ฐ์ ์ฌ์ฉํ์ฌ `Promise` ์ธ์คํด์ค๋ฅผ ์์ฑํ์ฌ ๋ฐํ

  ```tsx
  const obj = Promise.resolve(['sports', 'music']);

  Promise.resolve(obj).then((param) => {
    console.log(param);
  });

  // 1. Promise.resolve(obj) resolve() ํ๋ผ๋ฏธํฐ์ Promise ์ธ์คํด์ค๋ฅผ ์์ฑํ์
  // 2. Promise ์ธ์คํด์ค๋ฅผ ์์ฑํ์ฌ ๋ฐํํจ ์ฑ๊ณต ์ํ๋ก ์ค์ ํจ
  // 3. then((param) => {console.log(param)}; obj ์ธ์คํด์ค์ resolve() ํ๋ผ๋ฏธํฐ ๊ฐ์ด param์ ์ค์ ๋จ

  // [์คํ๊ฒฐ๊ณผ]
  // ["sports", "music"]
  ```

<br>

## 2. thenable

- `Promise.resolve()` ํ๋ผ๋ฏธํฐ์ `then()`์ ์์ฑํ ํํ

  ```tsx
  const obj = Promise.resolve({
    then(resolve, reject) {
      resolve([1, 2]);
    },
  });

  obj.then((value) => {
    console.log(value);
  });

  console.log('๋');

  // 1. const obj = Promise.resolve({...}); resolve() ํ๋ผ๋ฏธํฐ์ then(){...}์ ์์ฑํ์, Promise ์ธ์คํด์ค๋ฅผ ์์ฑํ์ฌ ๋ฐํํจ, then()์ ์คํํ์ง ์๊ณ  ์๋๋ก ์ด๋
  // 2. obj.then((value) => {console.log(value)}); then()์ ์คํํ์ง ์์
  // 3. console.log("๋")์ ์คํํจ
  // 4. ์ด์ด์ Promise.resolve()์ then()์ ์คํํจ
  // 5. then(resolve, reject){ resolve([1,2])}); resolve([1,2])๋ฅผ ํธ์ถํ๋ฉฐ ์๋ then()์ ์ฒซ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ ํจ์๊ฐ ์คํ๋จ
  // 6. obj.then((value) => {console.log(value)}); resolve([1,2])์ [1,2]๊ฐ value์ ์ค์ ๋จ

  // ์คํ๊ฒฐ๊ณผ
  // ๋
  // [1,2]
  ```

<br>

## 3.reject()

- ์คํจ(reject) ์ํ์ Promise ์ธ์คํด์ค๋ฅผ ์์ฑํ์ฌ ๋ฐํํจ

  - `Promise.reject()` ํํ๋ก ์์ฑํจ

- ํ๋ผ๋ฏธํฐ์ `reject` ์ฌ์ ๋ฅผ ์์ฑํจ

- `then()` ์ ์ฐ๊ฒฐํ ํํ

  ```tsx
  const obj = Promise.reject('์คํจ');

  obj.then(
    (value) => console.log(value),
    (value) => console.log(value),
  );

  // 1. const obj = Promise.reject("์คํจ"); new ์ฐ์ฐ์๋ฅผ ์ฌ์ฉํ์ง ์์ง๋ง Promise ์ธ์คํด์ค๋ฅผ ์์ฑํ์ฌ ๋ฐํํจ, ์คํจ(reject) ์ํ๋ก ์ค์ ํจ
  // 2. ์คํจ ์ํ์ด๋ฏ๋ก then()์ ๋ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ ํจ์๊ฐ ํธ์ถ๋จ
  // 3. obj.then( , (value) => console.log(value)}); Promise.reject("์คํจ")์์ "์คํจ"๊ฐ value์ ์ค์ ๋จ

  // ์คํ๊ฒฐ๊ณผ
  // ์คํจ
  ```

- `catch()` ๋ฅผ ์ฐ๊ฒฐํ ํํ

  ```tsx
  const obj = new Error('์๋ฌ ๋ฐ์');

  Promise.reject(obj).catch((error) => console.log(error.message));

  console.log('๋');

  // 1. const obj = new Error("์๋ฌ ๋ฐ์"); Error ์ธ์คํด์ค๋ฅผ ์์ฑํจ
  // 2. Promise.reject(obj) obj ์ธ์คํด์ค๋ฅผ ์ฌ์ฉํ์ฌ Promise ์ธ์คํด์ค๋ฅผ ์์ฑํจ, reject()๋ฅผ ์คํํ์ง ์์
  // 3. console.log("๋")์ ์คํํจ
  // 4. Promise.reject(obj)๋ฅผ ์คํํ๋ฉฐ catch()๊ฐ ํธ์ถ๋จ
  // 5. catch((error) => console.log(error.message)); obj ์ธ์คํด์ค๊ฐ error์ ์ค์ ๋จ

  // ์คํ๊ฒฐ๊ณผ
  // ๋
  // ์๋ฌ ๋ฐ์
  ```

```toc

```
