---
emoji: ๐จโ๐ป
title: Destructuring, Array ๋ถํ  ํ ๋น
date: '2021-09-08 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐ Destructuring, Array ๋ถํ  ํ ๋น
</h1>

<br>

## 1. Destructuring

- Destructuring Assignment
- ์ฌ์ ์  ์๋ฏธ
  - ~๊ตฌ์กฐ๋ฅผ ํ๊ดดํ๋ค.
  - ํ๊ดด, ํด์ฒด๋ ์๋ ๊ฒ์ด ์์ด์ง๋ ๋์์ค
  - ์ ๋ฐ์ดํฐ๋ ๋ณ๊ฒฝ๋์ง ์์
  - ์ด ๊ด์ ์์ ๋ณด๋ฉด ๋ถํ /๋ถ๋ฆฌ๊ฐ ๋ ๊น์

```tsx
let one, two, three;

const list = [1, 2, 3];

[one, two, three] = list;

console.log(one); // 1
console.log(two); // 2
console.log(three); // 3
console.log(list); // [1, 2, 3]
```

<br>

## 2. Array ๋ถํ  ํ ๋น

- ๋ฐฐ์ด์ ์๋ฆฌ๋จผํธ๋ฅผ ๋ถํ ํ์ฌ ํ ๋น(์ธ๋ฑ์ค์ ํด๋นํ๋ ๋ณ์์ ํ ๋น)

  ```tsx
  let one, two, three;

  [one, two, three] = [1, 2, 3];

  console.log(one); // 1
  console.log(two); // 2
  console.log(three); // 3
  ```

- ํ ๋น ๋ฐ์ ๋ณ์ ์๊ฐ ์ ์ ๊ฒฝ์ฐ

  ```tsx
  let one, two;

  [one, two] = [1, 2, 3];

  console.log(one); // 1
  console.log(two); // 2
  ```

  1. ์ผ์ชฝ์ ํ ๋น ๋ฐ์ ๋ณ์๊ฐ 2๊ฐ์ด๊ณ , ์ค๋ฅธ์ชฝ์ ๋ถํ  ํ ๋นํ  ๊ฐ์ด 3๊ฐ ์
  2. ์ผ์ชฝ์ ๋ณ์ ์ธ๋ฑ์ค์ ๋ง์ถ์ด ๊ฐ์ ํ ๋นํ๋ฏ๋ก 3์ ํ ๋น๋์ง ์์

- ํ ๋น ๋ฐ์ ๋ณ์ ์๊ฐ ๋ง์ ๊ฒฝ์ฐ

  ```tsx
  let one, two, three, four;

  [one, two, three, four] = [1, 2, 3];

  console.log(three); // 3
  console.log(four); // undefined
  ```

  1. ์ผ์ชฝ์ ํ ๋น ๋ฐ์ ๋ณ์๊ฐ 4๊ฐ์ด๊ณ  ์ค๋ฅธ์ชฝ์ ๋ถํ  ํ ๋นํ  ๊ฐ์ด 3๊ฐ ์
  2. ์ผ์ชฝ์ ๊ฐ์ ํ ๋นํ  ์ ์๋ ๋ณ์์ `undefined`๊ฐ ์ค์ ๋จ

- ๋ฐฐ์ด ์ฐจ์์ ๋ง์ถ์ด ๋ถํ  ํ ๋น

  ```tsx
  let one, two, three, four;

  [one, two, [three, four]] = [1, 2, [3, 4]];

  console.log([one, two, three, four]); // [1, 2, 3, 4]
  ```

- ๋งค์น๋๋ ์ธ๋ฑ์ค์ ๋ณ์๊ฐ ์์ผ๋ฉด ๊ฐ์ ํ ๋นํ์ง ์์

  ```tsx
  let one, two, three, four;

  [one, , , four] = [1, 2, 3, 4];

  console.log([one, two, three, four]); // [1, undefined, undefined, 4]
  ```

- Spread์ ๊ฐ์ด ์ฌ์ฉ

  - ๋๋จธ์ง๋ฅผ ์ ๋ถ ํ ๋น

    ```tsx
    let one, rest;

    [one, ...rest] = [1, 2, 3, 4];

    console.log(one); // 1
    console.log(rest); // [2, 3, 4];
    ```

    1. `one`์ 1์ ํ ๋นํ๊ณ 
    2. ๋๋จธ์ง 2, 3, 4๋ฅผ `rest`์ ํ ๋น ํจ, `[2, 3, 4]`์ฒ๋ผ ๋ฐฐ์ด๋ก ํ ๋นํจ
    3. `rest` ํ๋ผ๋ฏธํฐ๋ฅผ ํธ์ถ ๋ฐ๋ ํจ์์ ํ๋ผ๋ฏธํฐ์ ์์ฑํ์ง๋ง, ๋๋จธ์ง๋ผ๋ ์๋งจํฑ์ด ๊ฐํด์ ์ฝ๋์ฒ๋ผ ์ฌ์ฉํ๊ธฐ๋ ํจ
    4. ๋ถ๋ฆฌํ์ง ์๊ณ  ๊ฒฐํฉ๋ ์ํ๋ฅผ ์ค์ ํ๋ฏ๋ก ์ด๊ธ๋์ง ์์

- ์ธ๋ฑ์ค๋ฅผ ๋ฐ์ํ ๋๋จธ์ง ํ ๋น

  ```tsx
  let one, three, rest;

  [one, , three, ...rest] = [1, 2, 3, 4, 5];

  console.log(three); // 3
  console.log(rest); // [4, 5]
  ```

  1. `one`์ 1์ ํ ๋นํจ
  2. 2๋ ๊ฑด๋๋๊ณ  `three`์ 3์ ํ ๋น
  3. ๋๋จธ์ง `[4, 5]`๋ฅผ `rest`์ ํ ๋น

```toc

```
