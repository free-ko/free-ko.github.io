---
emoji: ๐จโ๐ป
title: Proxy ๋ผ๋ฆฌ, Proxy ๋ชจ์ต
date: '2021-11-25 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐   Proxy ๋ผ๋ฆฌ, Proxy ๋ชจ์ต
</h1>

<br>

## Proxy ๋ผ๋ฆฌ

- ์๋น์์ 3๋ช์ด ์์ฌ ํ๊ณ  ์๋ ๋ชจ์ต์์ ์ผ์ชฝ ์ฌ๋์ด ์ค๋ฅธ์ชฝ ์ฌ๋ ์์ ๋ฐฅ์ ๊ฐ์ ธ์ค๋ ค ํจ
  - ์ผ์ชฝ ์ฌ๋์ด ๊ฐ์ด๋ฐ ์ฌ๋์๊ฒ ๋ฐฅ์ ๋ฌ๋ผ๊ณ  ๋งํ๊ณ 
  - ๊ฐ์ด๋ฐ ์ฌ๋์ด ์ค๋ฅธ์ชฝ ์ฌ๋์๊ฒ ๋งํ๋ฉด
  - ์ค๋ฅธ์ชฝ โ ๊ฐ์ด๋ฐ โ ์ผ์ชฝ ์์๋ก ๋ฐฅ์ ๋ฐ์ ์ ์์
- ์ด ๋ชจ์ต์์ ๊ฐ์ด๋ฐ ์ฌ๋์ด `Proxy`
  - ์ผ์ชฝ ์ฌ๋์ ๋ง์ ๋ฐ์ ์ค๋ฅธ์ชฝ ์ฌ๋์๊ฒ ๋งํ๊ณ 
  - ์ค๋ฅธ์ชฝ ์ฌ๋์๊ฒ ๋ฐฅ์ ๋ฐ์ ์ผ์ชฝ ์ฌ๋์๊ฒ ์ ๋ฌ ํจ
- ์ด์ ๊ฐ์ด `Proxy` ๋ ์ค๊ฐ์์ ๋๋ฆฌ ์ญํ ์ ํจ
- ์ผ์ชฝ ์ฌ๋์ด ์ค๋ฅธ์ชฝ ์ฌ๋์๊ฒ ์ง์  ๋งํ๊ณ  ๋ฐฅ์ ๋ฐ์ผ๋ฉด `Proxy` ๊ฐ ํ์ํ์ง ์์

- ๊ฐ์ด๋ฐ ์ฌ๋์ ๊ฑฐ์ณ์ ๋ฐ๋ ๋ชจ์ต์ JS๋ก ํํํ๋ฉด

  ```tsx
  const target = { food: '๋ฐฅ' };
  const middle = new Proxy(target, {});
  const left = middle.food;

  console.log(left); // ๋ฐฅ

  // 1. target์ ์ค๋ฅธ์ชฝ ์ฌ๋์ด๊ณ  food๋ ํ๋กํผํฐ ํค์ด๋ฉฐ, ๋ฐฅ์ ํ๋กํผํฐ ๊ฐ์
  // 2. Proxy ์ธ์คํด์ค๋ฅผ ์์ฑํ์ฌ middle์ ํ ๋น ํจ, middle์ด ๊ฐ์ด๋ฐ ์ฌ๋์ด๋ฉฐ target์ ์ ์ ์์
  // 3. const left = middle.food ์ผ์ชฝ ์ฌ๋์ด ๊ฐ์ด๋ฐ ์ฌ๋์๊ฒ ๋ฐฅ์ ๋ฌ๋ผ๋ ๊ฒ๊ณผ ๊ฐ์ด๋ฐ ์ฌ๋์ด ์ค๋ฅธ์ชฝ ์ฌ๋์๊ฒ ๋ฐฅ์ ๋ฌ๋ผ๊ณ  ํ๋ ๊ฒ์
  // 4. ํ ๋น ์ฐ์ฐ์(=)๋ ์ค๋ฅธ์ชฝ ์ฌ๋์ด ์ค ๋ฐฅ์ ๋ฐ์ ์ผ์ชฝ ์ฌ๋์๊ฒ ๊ฑด๋ค์ฃผ๋ ๊ฒ์
  // 5. lef๋ ์ผ์ชฝ ์ฌ๋์
  ```

  - `middle.food`๊ฐ ์คํ๋๋ฉด `Proxy`์ `getter`๊ฐ ํธ์ถ๋๋ฉฐ `Proxy`์์ `target`์ `getter`๋ฅผ ํธ์ถํ๋ฉด์ `"food"`๋ฅผ ํ๋ผ๋ฏธํฐ๋ก ๋๊ฒจ ์ค
  - `new Proxy()` ํ๋ผ๋ฏธํฐ์ `target` ์ ์์ฑํ๋ฏ๋ก `middle`์์ `target`์ ์ ์ ์์

- `target`์ `[[Get]]` ์ด `food` ๊ฐ์ ๊ตฌํด `middle`๋ก ๋ฐํํ๊ณ  `middle`๋ก ๋ฐํ๋ ๊ฐ์ `left`์ ํ ๋น ํจ
- ์ด๋ ๊ฒ `Proxy` ๊ฐ ๊ฐ์ด๋ฐ์์ ๋๋ฆฌ ์ญํ ์ ํจ

```toc

```
