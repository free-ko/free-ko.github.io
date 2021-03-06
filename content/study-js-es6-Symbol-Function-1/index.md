---
emoji: ๐จโ๐ป
title: Symbol ํจ์ - for(), keyFor()
date: '2021-10-30 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐ Symbol ํจ์: for(), keyFor()
</h1>

## 1. for()

- ๊ธ๋ก๋ฒ `Symbol` ๋ ์ง์คํธ๋ฆฌ์

  - `{key: value}` ํํ๋ก `Symbol` ์ ์ ์ฅ

  - `ํ๋ผ๋ฏธํฐ()`์ ๋ฌธ์์ด์ด `Key`๊ฐ ๋๊ณ  `Symbol()`๋ก ์์ฑํ ๊ฐ์ด `value`๊ฐ ๋จ

    ```tsx
    const one = Symbol.for('sports');

    console.log(one); // Symbol(sports)

    // 1. {key: value} ํํ๋ก one์ ์ค์ ํจ, one์ด ๊ธ๋ก๋ฒ Symbol ๋ ์ง์คํธ๋ฆฌ์ ์ ์ฅ๋จ
    // 2. ํ๋ผ๋ฏธํฐ์ธ 'sports'๊ฐ key๊ฐ ๋๊ณ  Symbol()๋ก ์์ฑํ ๊ฐ์ด value๊ฐ ๋จ
    // 3. Symbol("sports") ํจ์์์ ํ๋ผ๋ฏธํฐ๊ฐ ์ฃผ์์ด์๋ ๊ฒ๊ณผ๋ ์ฐจ์ด๊ฐ ์์
    ```

  - `registry` : ๋ฑ๋ก, ๊ธฐ๋ก

- ๊ธ๋ก๋ฒ `Symbol` ๋ ์ง์คํธ๋ฆฌ๋ ๊ณต์  ์์ญ

  - ๋ค๋ฅธ ์ค๋ธ์ ํธ์์๋ ์ฌ์ฉ ๊ฐ๋ฅ
  - ๊ฐ์ `key`๊ฐ ์กด์ฌํ๋ฉด ๋ฑ๋ก๋ ๊ฐ์ ์ฌ์ฉ

    ```tsx
    const one = Symbol.for("sports");
    const two = Symbol.for("sports");

    console.log(one === two);  // true

    console.log(Symbol.for(true); // Symbol(true)

    // 1. one์ key ๊ฐ๊ณผ two์ key๊ฐ์ด ๊ฐ์ผ๋ฏ๋ก Symbol ๊ฐ์ ์์ฑํ์ง ์๊ณ  one์ ์ค์ ๋ ๊ฐ์ ์ฌ์ฉ
    // 2. one === two ๊ทธ๋์ ๋น๊ต ๊ฒฐ๊ณผ๊ฐ true๊ฐ ๋์ด
    // 3. Symbol.for(true) true๋ฅผ ๋ฌธ์์ด๋ก ๋ฐํํ์ฌ key ๊ฐ์ผ๋ก ์ฌ์ฉ
    ```

<br>

## 2. keyFor()

- ๊ธ๋ก๋ฒ `Symbol` ๋ ์ง์คํธ๋ฆฌ์์ `Symbol`์ `key` ๊ฐ์ ๊ตฌํจ

- ํ๋ผ๋ฏธํฐ์ `Symbol.for()` ๋ก ๋ฑ๋กํ `Symbol` ์์ฑ

  ```tsx
  const one = Symbol.for('book');
  const six = Symbol.keyFor(one);

  console.log(six); // book

  // 1. const six = Symbol.keyFor(one); ํ๋ผ๋ฏธํฐ์ ๊ธ๋ก๋ฒ Symbol ๋ ์ง์คํธ๋ฆฌ์ ๋ฑ๋กํ Symbol์ ์์ฑํจ
  // 2. one์ key ๊ฐ์ธ "book"์ ๋ฐํ
  ```

- `Symbol key` ๊ฐ์ด ์กด์ฌํ๋ฉด `key` ๊ฐ์ ๋ฐํํ๊ณ  ์กด์ฌํ์ง ์์ผ๋ฉด `Undefined` ๋ฐํ

```toc

```
