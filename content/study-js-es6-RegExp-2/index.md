---
emoji: ๐จโ๐ป
title: y ํ๋๊ทธ
date: '2021-10-08 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  y ํ๋๊ทธ
</h1>

<br>

## y ํ๋๊ทธ

- `lastIndex` ์์น์ ๋งค์น

  ```tsx
  const vlaue = 'AABBA',
    obj = /A/y;

  console.log(obj.test(value) + ': ' + obj.lastIndex);
  console.log(obj.test(value) + ': ' + obj.lastIndex);
  console.log(obj.test(value) + ': ' + obj.lastIndex);

  // 1. g ํ๋๊ทธ๋ฅผ ์ฌ์ฉํ์ง ์์
  // 2. obj.test(value) A๊ฐ ๋งค์น๋์ด true๊ฐ ์ถ๋ ฅ๋จ
  // 3. lastIndex์ ๋ํดํธ ๊ฐ์ด 0์ด๋ฏ๋ก 0๋ฒ ์ธ๋ฑ์ค์ A์ ๋งค์นํ ๊ฒ
  // 4. obj.lastIndex 1์ด ์ถ๋ ฅ๋๋ฉฐ, ๋งค์น๋ ์ธ๋ฑ์ค์ 1์ ๋ํ ๊ฐ, y ํ๋๊ทธ๋ ๋งค์น๊ฐ ๋๋ฉด lastIndex์ 1์ ๋ํจ
  // 5. obj.test(vlaue) A๊ฐ ๋งค์น๋์ด ture๊ฐ ์ถ๋ ฅ๋จ, 1๋ฒ ์ธ๋ฑ์ค์ A์ ๋งค์นํ ๊ฒ
  // 6. obj.lastIndex 2๊ฐ ์ถ๋ ฅ๋๋ฉฐ ๋งค์น๋ ์ธ๋ฑ์ค์ 1์ ๋ํ ๊ฐ์
  // 7. obj.test(value) A๊ฐ ๋งค์น๋์ง ์์ false๊ฐ ์ถ๋ ฅ๋จ
  // 8. 4๋ฒ ์ธ๋ฑ์ค์ A๊ฐ ์์ง๋ง 2๋ฒ ์ธ๋ฑ์ค์ ๋งค์นํ๋ฉฐ 2๋ฒ ์ธ๋ฑ์ค ๊ฐ์ด B์ด๋ฏ๋ก ๋งค์น๋์ง ์์
  // 9. obj.lastIndex ๋งค์น๋์ง ์์ผ๋ฉด lastIndex ๊ฐ์ด 0์ด ๋จ

  // ๊ฒฐ๊ณผ
  // true: 1
  // true: 2
  // false: 0
  ```

  - `lastIndex` ๋ถํฐ๊ฐ ์๋๋ผ `lastIndex` ์์น์ ๋งค์น
  - ๋งค์น๋๋ฉด `lastIndex` ๊ฐ์ด 1์ฆ๊ฐ
  - `const value = "AABBA"`, `obj = /A/y`

  <br>

- `lastIndex` ๊ฐ์ ์ง์ ํ  ์ ์์

  ```tsx
  const vlaue = 'AABBA',
    obj = /A/y;
  console.log(obj.sticky); // true

  obj.lastIndex = 4;
  console.log(obj.test(value) + ': ' + obj.lastIndex); // true: 5

  // 1. obj.sticky yํ๋๊ทธ๋ฅผ ์ฌ์ฉํ๋ฉด sticky ํ๋กํผํฐ์ true๊ฐ ์ค์ ๋จ
  // 2. obj.lastIndex = 4 lastIndex ํ๋กํผํฐ ๊ฐ์ 4๋ฅผ ํ ๋นํ์ผ๋ฏ๋ก 4๋ฒ ์ธ๋ฑ์ค์ ๋ฌธ์์ ๋งค์นํ๊ฒ ๋จ
  // 3. obj.test(target) 4๋ฒ ์ธ๋ฑ์ค์ A๊ฐ ์์ผ๋ฏ๋ก ๋งค์น๊ฐ ๋์ด true๊ฐ ์ถ๋ ฅ๋จ
  // 4. obj.lastIndex 1์ด ์ฆ๊ฐ๋ 5๊ฐ ์ถ๋ ฅ ๋จ
  ```

  - `sticky` ํ๋กํผํฐ์ `true` ์ค์ 

```toc

```
