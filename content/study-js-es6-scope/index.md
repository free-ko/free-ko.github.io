---
emoji: ๐จโ๐ป
title: function ๋ธ๋ก, try-catch, switch-case
date: '2021-08-31 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐ ๋ธ๋ก ์ค์ฝํ ์ ํ
</h1>

<br>

## 1) function ๋ธ๋ก

- `function name() {}`๋ ๋ธ๋ก ์ค์ฝํ
- `function` ์๊ณผ ๋ฐ์

  - ๊ฐ์ ์ด๋ฆ์ `let` ๋ณ์ ์ ์ธ ๊ฐ๋ฅ
  - ์ค์ฝํ๊ฐ ๋ค๋ฅด๊ธฐ ๋๋ฌธ
  - ๊ทธ๋์ ๋ฐ์ `sports`์ ์์ `sports`๋ ๋ค๋ฅด๊ฒ ์ ์ฅ๋์ด ์์

  ```tsx
  let sports = '์ถ๊ตฌ';

  function show() {
    let sports = '๋๊ตฌ';
    console.log('์:', sports);
  }

  show();

  console.log('๋ฐ:', sports);

  // ์ : ๋๊ตฌ
  // ๋ฐ : ์ถ๊ตฌ
  ```

- `function` ๋ฐ์ `let` ๋ณ์๋ฅผ

  - `function` ์์์ ์ฌ์ฉ ๊ฐ๋ฅ(`ํด๋ก์ `)

  ```tsx
  let sports = '์ถ๊ตฌ';

  function show() {
    console.log(sports);
  }

  show(); // ์ถ๊ตฌ
  ```

<br>

## 2) try-catch

- `try-catch` ๋ฌธ๋ ๋ธ๋ก ์ค์ฝํ
- `try` ๋ธ๋ก `{}` ๊ธฐ์ค์ผ๋ก

  - ์๊ณผ ๋ฐ์ ๊ฐ์ ์ด๋ฆ์ `let` ๋ณ์ ์ ์ธ ๊ฐ๋ฅ

  ```tsx
  let sports = '์ถ๊ตฌ';

  try {
    let sports = '๋๊ตฌ';
    console.log('์:', sports);
  } catch (e) {}

  console.log('๋ฐ:', sports);

  // ์ : ๋๊ตฌ
  // ๋ฐ : ์ถ๊ตฌ
  ```

  1. `try` ๋ธ๋ก์ ์๊ณผ ๋ฐ์ `let sports`๋ฅผ ์ ์ธํ์ผ๋ฉฐ
  2. ์๊ณผ ๋ฐ์ด ์ค์ฝํ๊ฐ ๋ค๋ฅด๋ฏ๋ก ๋ณ์ซ๊ฐ์ด ๊ฐ๊ฐ ์ค์ ๋จ

- `catch()`์์ `try` ๋ฐ์ ๋ณ์ ์ฌ์ฉ

  ```tsx
  let sports = '์ถ๊ตฌ';

  try {
    let sports = '๋๊ตฌ';

    console.log('์:', sports);
    abc = error;
  } catch (e) {
    console.log('catch:', sports);
  }

  console.log('๋ฐ:', sports);

  // ์: ๋๊ตฌ
  // catch: ์ถ๊ตฌ
  // ๋ฐ: ์ถ๊ตฌ
  ```

  1. `let sports = "๋๊ตฌ";` `try` ๋ธ๋ก์์ ๊ฐ์ ํ ๋น
  2. `abc = error;` `error` ๋ณ์๊ฐ ์์ผ๋ฏ๋ก ์๋ฌ๊ฐ ๋ฐ์
  3. `console.log("catch:", sports)` `try` ๋ธ๋ก ์์์ ์ ์ธํ `sports` ๊ฐ์ ์ถ๋ ฅํ์ง ์๊ณ  `try` ๋ฐ์ `sports` ๊ฐ์ ์ถ๋ ฅ ํจ

<br>

## 3) switch-case

- `switch `๋ฌธ๋ ๋ธ๋ก ์ค์ฝํ
- `switch` ๋ธ๋ก ๊ธฐ์ค์ผ๋ก
  - ๊ฐ์ ์ด๋ฆ์ `let` ๋ณ์ ์์ฑ ๋ถ๊ฐ
  - `case`, `default`๋ ๋ธ๋ก ์ค์ฝํ๊ฐ ์๋

```tsx
let item = 1;

switch (item) {
  case 1:
    let sports;
    break;
  case 2:
  // let sports;
  default:
    console.log(sports);
}
```

1. `// let sports`
2. `switch` ๋ธ๋ก ์์์ `let`์ ์ฌ์ฉํ์ฌ ์ ์ธํ ๋ณ์๊ฐ ์๋๋ฐ ๋ค์ `let`์ ์ฌ์ฉํ์ฌ ๋ณ์๋ฅผ ์ ์ธํ๋ฏ๋ก ์๋ฌ๊ฐ ๋ฐ์
3. ๊ทธ๋์ ์ฃผ์์ผ๋ก ์ฒ๋ฆฌ
4. ์๋ฌ๋ ์คํํ  ๋ ์๊ธฐ์ง ์๊ณ  ์ปดํ์ผ ํ  ๋ ์๋ฌ๊ฐ ๋ฐ์ํจ

```toc

```
