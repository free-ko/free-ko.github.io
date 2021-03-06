---
emoji: ๐จโ๐ป
title: Spread(์คํ๋ ๋)
date: '2021-09-06 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  let, const ์ฌ์ฉ ๊ธฐ์ค, spread, Array spread, String spread, Object spread, push(...spread)

</h1>

<br>

## 1. let, const ์ฌ์ฉ ๊ธฐ์ค

- `let` : ๋ณ๊ฒฝ ํ  ์ ์์
- `const` : ๋ณ๊ฒฝ ํ  ์ ์์
- `let`, `const` ๋ณ์์ ์๋งจํฑ์ ์ฐ์ ํ์ฌ ์ฌ์ฉ

  - ๊ฐ์ด ๋ณ๊ฒฝ๋๋ฉด `let`
  - ์ด๊น๊ฐ์ด ๋ณ๊ฒฝ๋์ง ์์ผ๋ฉด `const`

  ```tsx
  // let, const ์ฌ์ฉ ๊ธฐ์ค

  const list = [10, 20];

  let value = [10, 20];

  values.push(30, 40);

  for (let k = 0; k < list.length; k++) {}

  const book = (param) => param + 10;
  ```

<br>

## 2. Spread

- Syntax: `[...iterable]`
- `[...iterable]`

  - `[...]`์ฒ๋ผ [ ] ์์ ์ `(.)` 3๊ฐ๋ฅผ ์์ฑํ๊ณ 
  - ์ด์ด์ ์ดํฐ๋ฌ๋ธ ์ค๋ธ์ ํธ ์์ฑ

    ```tsx
    const list = [21, 22];

    console.log([11, ...list, 12]); // [11, 21, 22, 12]

    const obj = { key: 50 };

    console.log({ ...obj }); // {key: 50}
    ```

- ์ดํฐ๋ฌ๋ธ ์ค๋ธ์ ํธ๋ฅผ ํ๋์ฉ ์ ๊ฐ
- `{key: value}`์ `Object`๊ฐ ์ดํฐ๋ฌ๋ธ ์ค๋ธ์ ํธ๋ ์๋์ง๋ง ์ ๊ฐ ๊ฐ๋ฅ

<br>

## 3. Array Speard

- `Spread` ๋์ ๋ฐฐ์ด์ ์์ฑํ ์์น์ ์๋ฆฌ๋จธํธ ๋จ์๋ก ๋ถ๋ฆฌ(์ ๊ฐ)
- `Array Spread` ์์ฑ ํํ

  ```tsx
  const one = [21, 22];
  const two = [31, 32];
  const result = [11, ...one, 12, ...two];

  console.log(result); // [11, 21, 22, 12, 31, 32[
  console.log(result.length); // 6
  ```

  1. `...one` : `one` ๋ฐฐ์ด์ `[21, 22]`๋ฅผ ์๋ฆฌ๋จผํธ ๋จ์๋ก ๋ถ๋ฆฌ(์ ๊ฐ) ํจ
  2. `...two` : `two` ์์น์ `two` ๋ฐฐ์ด์ `[31, 32]`๋ฅผ ์๋ฆฌ๋จผํธ ๋จ์๋ก ๋ถ๋ฆฌ(์ ๊ฐ) ํจ

- ๊ฐ์ด ๋์ฒด๋์ง ์๊ณ  ์ ๊ฐ

  ```tsx
  const one = [11, 12];
  const result = [11, 12, ...one];

  console.log(result); // [11, 12, 11, 12]
  console.log(result.length); // 4
  ```

  - ์์ `11`๊ณผ `12`๊ฐ ์์ง๋ง ๊ฐ์ ๋์ฒดํ์ง ์๊ณ  `...`์ ์์ฑํ ์์น์ ์ ๊ฐ ํจ

<br>

## 4. String Spread

- `spread` ๋์ ๋ฌธ์์ด์ ์์ฑํ ์์น์ ๋ฌธ์ ๋จ์๋ก ์ ๊ฐ
- `String Spread` ์์ฑ ํํ

  ```tsx
  const target = 'ABC';

  console.log([...target]); // [A, B, C]
  ```

  1. `[...target];`
  2. `target`์ `"ABC"`๋ฅผ ๋ฌธ์ ๋จ์๋ก ๋ถ๋ฆฌํ์ฌ `...target` ์์น์ ์ค์ 

<br>

## 5. Object Spread

- `Spread` ๋์ `Object`๋ฅผ ์์ฑํ ์์น์ ํ๋กํผํฐ ๋จ์๋ก ์ ๊ฐ
- `Object Spread` ์์ฑ ํํ

  ```tsx
  const one = { key1: 11, key2: 22 };
  const result = { key3: 33, ...one };

  console.log(result);

  // {key3: 33, key1: 11, key2: 22}
  ```

  1. `...one` : `one` ์ค๋ธ์ ํธ์ ํ๋กํผํฐ๋ฅผ ์ ๊ฐ

- ํ๋กํผํฐ ์ด๋ฆ์ด ๊ฐ์ผ๋ฉด ๊ฐ ๋์ฒด

  ```tsx
  const one = { book: 10, music: 20 };
  const result = { book: 30, ...one };

  console.log(result); // {book: 10, music: 20}

  // const check = [...one];
  ```

  1. `{book: 30}`๊ณผ `{book: 10}`์์ ํ๋กํผํฐ ์ด๋ฆ์ด ๊ฐ์ผ๋ฏ๋ก 30์ด ๋ค์ ์์ฑํ `10`์ผ๋ก ๋์ฒด๋จ
  2. `Object`๋ ์ดํฐ๋ฌ๋ธ ์ค๋ธ์ ํธ๊ฐ ์๋๋ฏ๋ก `[...one]` ํํ๋ก ์์ฑํ๋ฉด ์๋ฌ๊ฐ ๋ฐ์

<br>

## 6. Push(...spread)

- `push()` ํ๋ผ๋ฏธํฐ์ `spread` ๋์ ์์ฑ
- ๋ฐฐ์ด ๋์ ๋์์ ๋ถ๋ฆฌํ์ฌ ์ฒจ๋ถ

  ```tsx
  let result = [21, 22];

  const five = [51, 52];

  result.push(...five);

  console.log(result); // [21, 22, 51, 52]

  result.push(...'abc');

  console.log(result); // [21, 22, 51, 52, a, b, c]
  ```

  1. `result` ๋ฐฐ์ด ๋์ ์ฒจ๋ถ
  2. ๋ฐฐ์ด์ด๋ฉด ์๋ฆฌ๋จผํธ๋ก ๋ถ๋ฆฌํ์ฌ ์ฒจ๋ถํ๊ณ  ๋ฌธ์์ด์ด๋ฉด ๋ฌธ์ ๋จ์๋ก ๋ถ๋ฆฌํ์ฌ ์ฒจ๋ถ

```toc

```
