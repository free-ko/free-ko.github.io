---
emoji: ๐จโ๐ป
title: lastIndex
date: '2021-10-07 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  lastIndex
</h1>

<br>

## lastIndex

- ์ ๊ท ํํ์ ์ฌ์ฉ ํํ

  ```tsx
  const value = 'ABC';
  const obj = new RegExp('A', 'g');
  console.log(obj.text(value));

  const reg = /A/g;
  console.log(reg.test(value));

  // 1. const obj = new RegExp("A", "g"); RegExp ์ธ์คํด์ค๋ฅผ ์์ฑํจ
  // A๋ก ๋งค์น ๋์์ ๋งค์น ํจ
  // g ํ๋๊ทธ๋ ๋ชจ๋ ๋งค์น ํจ
  // 2. obj.text(value) obj์ ์ค์ ๋ A๋ฅผ ABC์ ๋งค์นํ๋ฉฐ A๊ฐ ์์ผ๋ฏ๋ก true๋ฅผ ๋ฐํ
  // 3. const reg = /A/g ์ ๊ท ํํ์ ๋ฆฌํฐ๋ด์ ์ฌ์ฉํ ํํ ์
  // new ์ฐ์ฐ์๋ฅผ ์ฌ์ฉํ์ง ์์์ ๋ฟ, 1๋ฒ๊ณผ ๊ฐ์
  ```

- ๋งค์น ์์ ์์น๋ฅผ
  - lastIndex ํ๋กํผํฐ์ ์ค์ 
  - ๋ํดํธ ๊ฐ : 0
- g ํ๋๊ทธ๋ฅผ ์ฌ์ฉํ๋ฉด

  - `lastIndex` ํ๋กํผํฐ ์์น๋ถํฐ ๋งค์น

    ```tsx
    const value = 'ABABAB',
      obj = /B/g;

    console.log(obj.test(value) + ': ' + obj.lastIndex); // true: 2
    console.log(obj.test(value) + ': ' + obj.lastIndex); // true: 4
    console.log(obj.test(value) + ': ' + obj.lastIndex); // false: 0

    // 1. obj.test(value) B๊ฐ ABABAB ์์ผ๋ฏ๋ก ๋งค์น๋๋ฉฐ true ๋ฐํ
    // 2. obj.lastIndex lastIndex ๊ฐ์ผ๋ก 2๊ฐ ์ถ๋ ฅ ๋จ
    // B๊ฐ ๋งค์น๋ ์ธ๋ฑ์ค๋ 1์ด๋ฉฐ 1์ ๋ํ ๊ฐ์
    // 2๊ฐ ๋ค์์ ๋งค์น๋ฅผ ์์ ํ  ์์น

    // 3. obj.test(value), lastIndex ๊ฐ์ด 2์ด๋ฏ๋ก ๋์ ๋ฌธ์์ด์ 2๋ฒ ์ธ๋ฑ์ค๋ถํฐ B๋ฅผ ๋งค์น ํจ
    // 4. obj.lastIndex lastIndex ๊ฐ์ผ๋ก 4๊ฐ ์ถ๋ ฅ ๋จ
    // B๊ฐ ๋งค์น๋ ์ธ๋ฑ์ค๋ 3์ด๋ฉฐ 1์ ๋ํ ๊ฐ
    // 5. g ํ๋๊ทธ๋ ๋งค์น๊ฐ ๋๋ฉด lastIndex ๊ฐ์ 1์ ๋ํจ

    // 6. obj.test(value) ๋์ ๋ฌธ์์ด์ 4๋ฒ ์ธ๋ฑ์ค๋ถํฐ B๋ฅผ ๋งค์นํ๋ฉฐ ๋งค์น๊ฐ ๋์ง ์์ false๊ฐ ์ถ๋ ฅ ๋จ
    // 7. obj.lastIndex ๋งค์น๊ฐ ๋์ง ์์ผ๋ฉด lastIndex ๊ฐ์ 0์ด ๋จ
    ```

- g ํ๋๊ทธ๋ฅผ ์ฌ์ฉํ์ง ์์ผ๋ฉด

  - `lastIndex` ํ๋กํผํฐ ๊ฐ์ด ๋ฐ๋์ง ์์

    ```tsx
    const value = 'ABABAB',
      obj = /B/;

    console.log(obj.test(value) + ': ' + obj.lastIndex); // true: 0
    console.log(obj.test(value) + ': ' + obj.lastIndex); // true: 0

    // 1. obj = /B/ gํ๋๊ทธ๋ฅผ ์ฌ์ฉํ์ง ์์์
    // 2. obj.test(value) B๊ฐ ABABAB์ ์์ผ๋ฏ๋ก ๋งค์น๋๋ฉฐ true ๋ฐํ
    // 3. obj.lastIndex lastIndex ๊ฐ์ด๋ฏ๋ก 0์ด ์ถ๋ ฅ ๋จ, 0์ ๋ํดํธ ๊ฐ์ผ๋ก ๊ฐ์ด ๋ฐ๋์ง ์์, g ํ๋๊ทธ๋ฅผ ์์ฑํ์ง ์์ผ๋ฉด ๊ฐ์ด ๋ฐ๋์ง ์์
    // 4. obj.test(value) ๋งค์น๊ฐ ๋์ด true๊ฐ ์ถ๋ ฅ๋จ
    // 5. obj.lastIndex lastIndex ๊ฐ์ผ๋ก 0์ด ์ถ๋ ฅ๋จ
    ```

  - lastIndex ๊ฐ์ ์ง์ ํด๋ ์ ์ฉ๋์ง ์๊ณ  0 ๋ฒ ์ธ๋ฑ์ค๋ถํฐ ๋ฐฐ์น

    ```tsx
    const value = 'ABABAB',
      obj = /B/g;
    console.log(obj.test(value) + ': ' + obj.lastIndex); // true: 0

    obj.lastIndex = 2;
    console.log(obj.test(value) + ': ' + obj.lastIndex); // true: 2
    console.log(obj.test(value) + ': ' + obj.lastIndex); // true: 2

    // 1. true: 0 ๋งค์น๊ฐ ๋์์ผ๋ฏ๋ก 1์ด ์ถ๋ ฅ ๋์ด์ผ ํจ
    // 2. obj.lastIndex = 2 lastIndex์ 2๋ฅผ ์ค์ ํ์ผ๋ฏ๋ก
    // 3. obj.test(value) 2๋ฒ ์ธ๋ฑ์ค๋ถํฐ ๋งค์น๋ฅผ ํด์ผ ํ์ง๋ง, 0๋ฒ ์ธ๋ฑ์ค๋ถํฐ ๋งค์น ํด์ผ ํจ
    // 4. 2๋ฒ ์ธ๋ฑ์ค๋ถํฐ ๋งค์นํ๋ฉด B๊ฐ ์์ผ๋ฏ๋ก  false๊ฐ ๋ฐํ๋จ
    ```

```toc

```
