---
emoji: ๐จโ๐ป
title: Symbol.match
date: '2021-10-29 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐ Symbol.match
</h1>

<br>

## 1. Well-Known Symbol

- Well-Known Symbol์ ์ง์ํ๋ String ๋ฉ์๋

  - `match()`
  - `replace()`
  - `search()`
  - `split()`

- `String.prototype.match()`

  - ๋ฌธ์์ด์ ํจํด์ ๋งค์นํ๊ณ 
  - ๋งค์น๋ ๊ฒฐ๊ณผ๋ฅผ ๋ฐฐ์ด๋ก ๋ฐํ

    ```tsx
    const result = 'Sports'.match(/s/);

    console.log(result); // [s]

    // 1. ๋ฌธ์์ด "Sports"์ ํจํด /s/๋ฅผ ๋งค์นํฉ๋๋ค. ์ฒ์ S๋ ๋๋ฌธ์์ด๋ฏ๋ก ๋งค์น๊ฐ ๋์ง ์์ง๋ง ๋ s๋ ์๋ฌธ์์ด๋ฏ๋ก ๋งค์น๊ฐ ๋จ
    // 2. ๋งค์น๋ ๊ฒฐ๊ณผ๋ฅผ ๋ฐฐ์ด๋ก ๋ฐํ
    ```

<br>

## 2. Symbol.match()

- `Symbol.match()`

  - ๊ฐ๋ฐ์ ์ฝ๋๋ฅผ ํจ์ ๋ธ๋ก์ ์์ฑ
  - `String.prototype.match()` ๋์ ์ `Symbol.match()` ๋์ ์ `Symbol.match()`๊ฐ ์คํ๋จ

    ```tsx
    const sports = {
      base: 'ball',
      [Symbol.match](value) {
        return this.base.indexOf(value) < 0 ? '์์' : '์์';
      },
    };

    console.log('al'.match(sports)); // ์์

    // 1. 'ball'์ 'al'์ด ์์ผ๋ฉด '์์'์ ๋ฐํํ๊ณ  ์์ผ๋ฉด '์์'์ ๋ฐํํจ
    // 2. 'al'.match(sports)
    // 3. sports ์ค๋ธ์ ํธ์์ Symbol.match ์์ฑ ์ฒดํฌ ์์ผ๋ฉด String.prototype.match()๋ฅผ ํธ์ถํ๊ณ  ์์ผ๋ฉด Symbol.match()๋ฅผ ํธ์ถ ํจ
    // 4. Symbol.match(value)๋ฅผ ํธ์ถํ๋ฉด์ 'al'๋ฅผ ํ๋ผ๋ฏธํฐ ๊ฐ์ผ๋ก ๋๊ฒจ ์ค
    ```

- `Symbol.match = false`

  - `//`๋ฅผ ํจํด์ผ๋ก ์ธ์ํ์ง ์๊ณ  ๋ฌธ์์ด๋ก ์ธ์

    ```tsx
    try {
      '/book/'.startsWith(/book/);
    } catch {
      console.log('์ ๊ท ํํ์์ผ๋ก ์ฒ๋ฆฌ');
    }

    let check = /book/;
    check[Symbol.match] = false;

    console.log('/book/'.startsWith(check));

    // 1. ํ๋ผ๋ฏธํฐ /book/์ ํจํด์ผ๋ก ์ฒ๋ฆฌ ํจ, ์ ๊ท ํํ์์ ์ฌ์ฉํ  ์ ์์ผ๋ฏ๋ก ์๋ฌ ๋ฐ์
    // 2. check[Symbol.match] = false; ์ ๊ท ํํ์์ผ๋ก ์ธ์ํ์ง ์๋๋ก ์ค์ 
    // 3. "/book/".startWith(check) ํ๋ผ๋ฏธํฐ check ๊ฐ์ ๋ฌธ์์ด๋ก ์ธ์ ํจ
    // 4. endsWith()๋ ๊ฐ์

    // ์คํ ๊ฒฐ๊ณผ
    // ์ ๊ท ํํ์์ผ๋ก ์ฒ๋ฆฌ
    // true
    ```

- ๋ฉ์๋๋ฅผ ์ค๋ฒ๋ผ์ด๋ ํ๋ ๊ฒ์ด๋ฏ๋ก ๋ฉ์๋์ ์๋งจํฑ์ ์ ์งํด์ผ ํจ

```toc

```
