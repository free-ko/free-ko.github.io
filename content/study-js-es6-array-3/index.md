---
emoji: ๐จโ๐ป
title: Generic
date: '2021-10-02 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  Generic
</h1>

<br>

## Generic

- ์คํ์์ ์๋ ๋ฌธ์ฅ์ ๋ณผ ์ ์์
  - `copyWithin function is intentionally(์๋์ ) generic`
  - ES7 ์คํ, 22.1.3.3 `copyWithin()`
  - `MDN copyWithin()`

<br>

- `generic` ์ฌ์ฉ ํํ

  ```tsx
  const like = { 0: 10, 1: 20, 2: 30, length: 3 };

  console.log(Array.prototype.copyWithin.call(like, 1, 0));
  // {0: 10, 1: 20, 2: 30, length: 3};

  // 1. call()์ ์ฒซ๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ Array-like๋ฅผ ์์ฑํ์ผ๋ฉฐ, Array-like ํ์์ Object์
  // 2. copyWithin()์ด Array ๋ฉ์๋์ด๋ฏ๋ก Array๋ฅผ ๋๊ฒจ์ฃผ์ด์ผ ํ๋๋ฐ Array-like๋ฅผ ๋๊ฒจ์ฃผ์ด๋ ์ฒ๋ฆฌ๊ฐ ๋จ
  // 3. ์ด๊ฒ์ด Generic์, copyWithin()์ Generic ํจ์ ์
  // 4. ๋ฐฐ์ด๋ก ๋ฐํํ์ง ์๊ณ  ๋์ ์ค๋ธ์ ํธ ํํ๋ก ๋ฐํํจ
  ```

<br>

- `generic`์ ๋ปํ๋ ๊ฒ์?
  - `copyWithin()`์ด `Array` ๋ฉ์๋์ด๋ฏ๋ก `Array` ์ค๋ธ์ ํธ๊ฐ ์ฒ๋ฆฌ ๋์์ด์ง๋ง
  - `generic`์ `Array` ์ค๋ธ์ ํธ๊ฐ ์๋ `Array-like`, `iterable object`๋ฅผ ์ฒ๋ฆฌํ  ์ ์๋ค๋ ๊ฒ์ ๋ปํจ

```toc

```
