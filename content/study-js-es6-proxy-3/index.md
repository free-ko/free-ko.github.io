---
emoji: ๐จโ๐ป
title: handler, trap, target
date: '2021-11-26 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐   handler, trap, target
</h1>

<br>

## 1. target

- `Proxy` ๋์ ์ค๋ธ์ ํธ ์
  - `Array, Object` ๋ฑ์ ์ฌ์ฉํ  ์ ์์
- `const obj = new Proxy(target, {})` ํํ์์ ์ฒซ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ `target`์ ์์ฑํจ
- ์ด๋ ๊ฒ `Proxy` ์ธ์คํด์ค๋ฅผ ์์ฑํ๋ฏ๋ก `Proxy` ์ธ์คํด์ค์ `target`์ด ์ฐ๊ฒฐ๋จ

<br>

## 2. trap, handler

- `trap` : `Operating System`์์ ์ฌ์ฉํ๋ ์ฉ์ด๋ก ์คํ ์ค์ธ ํ๋ก๊ทธ๋จ์ ์ด์์ด ๋ฐ์ํ์ ๋ ์คํ์ ์ค๋จํ๊ณ  ์ฌ์ ์ ์ ์๋ ์ ์ด๋ก ์ ํ
- ๊ฐ์ด๋ฐ ์ฌ๋์ด ๋ฐฅ์ ๋ฐ์ ์์  ์์ ์๋ ์์ ๋ฅผ ๊ฐ์ด ๊ฑด๋ค ์ค๋ค๋ฉด `Porxy`์ ์์ ๋ฅผ ๊ฑด๋ค์ฃผ๋ ์ฝ๋๊ฐ ํ์ํจ ์ด๊ฒ์ด `Proxy` ๋ฅผ ์ฌ์ฉํ๋ ๋ชฉ์ ์

  ```tsx
  const target = { food: '๋ฐฅ' };
  const hanlder = {
    get(target, key) {
      return target[key] + '.์์ ';
    },
    set(target, key) {},
  };

  const middle = new Proxy(target, handler);
  const left = middle.food;

  console.log(left); // ๋ฐฅ, ์์ 

  // 1. trap๊ณผ handler๋ฅผ ๋๋ต์ ์ผ๋ก ์ดํด ๋ด
  // 2. get()์ด getter์ด๊ณ  set()์ด setter()์
  // 3. get()๊ณผ set()์ trap์ด๋ผ๊ณ  ํจ
  // 4. middle.food๋ฅผ ์คํํ๋ฉด [[Get]] ๋์ ์ get() ํธ๋ฉ์ ์คํํจ
  // 5. target[key]๋ target์ [[Get]]์ด ์คํ๋จ, target[key] ๊ฐ์ด '๋ฐฅ'์ด๋ฏ๋ก '๋ฐฅ, ์์ '๋ฅผ ๋ฐํํจ
  ```

- `const handler = {...}`
  - ์ค๋ธ์ ํธ์ `get(), set()`์ด ์์
  - `handler`๋ฅผ ํธ๋ค๋ฌ ์ค๋ธ์ ํธ๋ผ๊ณ  ํ๋ฉฐ ์ฝ์นญ์ผ๋ก ํธ๋ค๋ฌ๋ผ๊ณ  ๋ถ๋ฆ

<br>

## 3. Proxy Trap

![proxy trap](1.png)

- `enumerate()`
  - ES6์๋ ์์๋๋ ES7์์ `deprecated`

```toc

```
