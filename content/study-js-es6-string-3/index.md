---
emoji: ๐จโ๐ป
title: ์์/๋ ์ฒดํฌ ๋ณต์ 
date: '2021-09-20 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  startsWith(), endsWith(), repeat(), includes(), raw()
</h1>

<br>

## 1. startsWith()

- ๋์ ๋ฌธ์์ด์ด

  - ์ฒซ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ ๋ฌธ์์ด๋ก ์์ํ๋ฉด `true`, ์๋๋ฉด `false` ๋ฐํ
  - ์ ๊ท ํํ์ ์ฌ์ฉ ๋ถ๊ฐ

  ```tsx
  const target = 'ABC';

  console.log(target.startsWith('AB')); // true
  console.log(target.startsWith('BC')); // false

  console.log(/^AB/.test(target)); // true
  ```

- ๋ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ

  - ์ ํ์ด๋ฉฐ, ๋น๊ต ์์ ์ธ๋ฑ์ค ์์ฑ

  ```tsx
  const target = 'ABCD';

  console.log(target.startsWith('BC', 1)); // true
  console.log(target.startsWith('BC', 2)); // false
  ```

<br>

## 2. endsWith()

- ๋์ ๋ฌธ์์ด์ด

  - ์ฒซ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ ๋ฌธ์์ด๋ก ๋๋ฉด `true`, ์๋๋ฉด `false` ๋ฐํ

  ```tsx
  const target = 'ABC';

  console.log(target.endsWith('AB')); // true
  console.log(target.endsWith('BC')); // false

  console.log(/BC$/.test(target)); // true
  ```

- ๋ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ

  - ์ ํ์ด๋ฉฐ, ์ฌ์ฉํ  ๋ฌธ์์ด ๊ธธ์ด ์ง์ 

  ```tsx
  const target = 'ABC';

  console.log(target.endsWith('AB', 2)); // true

  // 1. "AB"๋ก ๋๋์ง ์์์ง๋ง
  // 2. ๋์ ๋ฌธ์์ด์ 3์๋ฆฌ๊ฐ ์๋ 2์๋ฆฌ๋ฅผ ์ฌ์ฉํ๋ฏ๋ก ์ฆ, "AB"๋ง ์ฌ์ฉํ๋ฏ๋ก true๋ฅผ ๋ฐํ
  ```

<br>

## 3.repeat()

- ๋์ ๋ฌธ์์ด์ ํ๋ผ๋ฏธํฐ์ ์์ฑํ ์ ๋งํผ ๋ณต์ , ์ฐ๊ฒฐํ์ฌ ๋ฐํ

```tsx
const target = 'ABC';

console.log(target.repeat(3)); // ABCABCABC
console.log(target.repeat(0)); // ""
console.log(target.repeat()); // ""
console.log(target.repeat(2.7)); // ABCABC

// 1. ํ๋ผ๋ฏธํฐ๋ฅผ ์์ฑํ์ง ์๊ฑฐ๋ 0์ ์์ฑํ๋ฉด ๋น ๋ฌธ์์ด์ ๋ฐํ
// 2. 2.7์์ 0.7์ ๋ฌด์ํ๊ณ  2๋ฅผ ์ฌ์ฉ ํจ
```

<br>

## 4. includes()

- ๋์ ๋ฌธ์์ด์

  - ์ฒซ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ ๋ฌธ์์ด์ด ์์ผ๋ฉด `true` ์์ผ๋ฉด `false` ๋ฐํ

  ```tsx
  const target = "123";
  console.log(target.includes("1"));  // true;

  console.log(target.includes(12));   // true;
  console.log(target.includes("13");  // false
  ```

  - ๋ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ(์ ํ)
    - ๋น๊ต ์์ ์ธ๋ฑ์ค ์์ฑ

  ```tsx
  const target= "ABC";
  console.log(target.includes("A", 1));   // false

  try {
  	result = traget.includes(/^A/);
  } catch(2) {
  	console.log("์ ๊ท ํํ์ ์ฌ์ฉ ๋ถ๊ฐ");
  }

  // 1. "A"๊ฐ ์์ง๋ง 0๋ฒ ์ธ๋ฑ์ค์ ์์
  // 2. 1๋ฒ ์ธ๋ฑ์ค๋ถํฐ ๋น๊ตํ๋ฏ๋ก ์กด์ฌ ํ์ง ์์
  ```

```toc

```
