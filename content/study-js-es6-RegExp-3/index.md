---
emoji: ๐จโ๐ป
title: u ํ๋๊ทธ, s ํ๋๊ทธ
date: '2021-10-09 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  u ํ๋๊ทธ, s ํ๋๊ทธ
</h1>

<br>

## 1. u ํ๋๊ทธ

- ์ ๊ท ํํ์์ ํจํด์ ์ ๋์ฝ๋์ ์ฝ๋ ํฌ์ธํธ๋ก ๋ณํํ์ฌ ๋งค์น

  ```tsx
  const obj = new RegExp('โฉu{31}โฉu{32}', 'u');

  console.log(obj.test('12')); // true
  console.log(obj.unicode); // true
  console.log(/โฉu{1f418}/u.test('์ฝ๋ผ๋ฆฌ์ด๋ชจ์ง')); // true

  // 1. new RegExp("โฉu{31}โฉu{32}", "u" ํจํด์ ์ฝ๋ ํฌ์ธํธ๋ก ๋ณํํ๊ณ  u flag๋ก ์ธ์คํด์ค๋ฅผ ์์ฑํจ
  // 2. obj.test("12") ๋งค์น๊ฐ ๋๋ฏ๋ก true๊ฐ ์ถ๋ ฅ
  // 3. obj.unicode unicode ํ๋กํผํฐ ๊ฐ์ด true๋ก ์ค์ ๋จ
  // 4. ์ด๋ชจ์ง๋ ๋งค์น ๊ฐ๋ฅ
  ```

- u ํ๋๊ทธ๋ฅผ ์ฌ์ฉํ์ง ์์ผ๋ฉด ์ฝ๋ ํฌ์ธํธ๋ฅผ ๋ฌธ์๋ก ๋งค์น

  ```tsx
  const result = /โฉu{31}โฉu{32}/.test('12');

  console.log(result);

  // 1. / ๋ค์์ ํ๋๊ทธ๋ฅผ ์์ฑํ์ง ์์์
  // 2. ํจํด์ ์ฝ๋ ํฌ์ธํธ๋ฅผ ์ผ๋ฐ ๋ฌธ์๋ก ๊ฐ์ฃผํ์ฌ 12์ ๋งค์นํ๋ฏ๋ก false๊ฐ ์ถ๋ ฅ๋จ
  ```

<br>

## 2. s ํ๋๊ทธ

- ์ ๊ท ํํ์์์ dot(์ .)์ ๋ชจ๋  ๋ฌธ์๋ฅผ ๋งค์นํ์ง๋ง ์ค๋ฐ๊ฟ ๋ฌธ์๋ ๋งค์น ํ์ง ์์
- S ํ๋๊ทธ๋ฅผ ์ฌ์ฉํ๋ฉด(ES2018) ์ค ๋ฐ๊ฟ ๋ฌธ์๋ฅผ ๋งค์น

  ```tsx
  const text = `line
  ์ค์ ๋ฐ๊ฟ`;

  // ์ด์  ๋ฐฉ๋ฒ
  console.log(/[โฉsโฉS]+/.test(text)); // true
  console.log(/[^]+/.test(text)); // true

  // sํ๋๊ทธ
  const obj = new RegExp('.+', 's');
  console.log(obj.test(text)); // true
  console.log(obj.dotAll); // true
  ```

  - dotAll ํ๋๊ทธ์ true ์ค์ 

- ์ค ๋ฐ๊ฟ ๋ฌธ์
  - U+000A Line Feed(LF)("\n")
  - U+000D Carriage Return(CR)("\r")
  - U+2028 Line Separator
  - U+2029 Paragraph Separator

```toc

```
