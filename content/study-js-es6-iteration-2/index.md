---
emoji: ๐จโ๐ป
title: ์ดํฐ๋ฌ๋ธ ์ค๋ธ์ ํธ, ํ๋กํ ์ฝ
date: '2021-09-04 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐ ์ดํฐ๋ฌ๋ธ ์ค๋ธ์ ํธ, ์ดํฐ๋ฌ๋ธ ํ๋กํ ์ฝ
</h1>

<br>

## 1. ์ดํฐ๋ฌ๋ธ ์ค๋ธ์ ํธ

### 1). ์ด๋ฌํฐ๋ธ ์ค๋ธ์ ํธ ๊ฐ๋

- ์ดํฐ๋ฌ๋ธ ํ๋กํ ์ฝ์ ๊ฐ๊ณ  ์๋ ์ค๋ธ์ ํธ
- ์คํ์์๋ `@@iterator()`๋ก ํ๊ธฐ
- ๋ฐ๋ณต ๊ตฌ์กฐ, `Symbol.iterator()`

  ```tsx
  const list = [10, 20];

  console.log(list[Symbol.iterator]); // function values() { [native code] }

  const obj = { one: 10, two: 20 };

  console.log(obj[Symbol.iterator]); // undefined
  ```

  1. `[ ]` ๋ฆฌํฐ๋ด๋ก ์์ฑํ `list`์ `Symbol.iterator`๊ฐ ์์ผ๋ฏ๋ก `Array`๋ ์ดํฐ๋ฌ๋ธ ์ค๋ธ์ ํธ ์
  2. `{ }` ๋ฆฌํฐ๋ด๋ก ์์ฑํ `obj`์ `Symbol.iterator`๊ฐ ์์ผ๋ฏ๋ก `Object`๋ ์ดํฐ๋ฌ๋ธ ์ค๋ธ์ ํธ๊ฐ ์๋
  3. `for` ๋ฌธ์ ๋ฐ๋ณต๊ณผ ์ดํฐ๋ ์ด์์ด ์ฐจ์ด๊ฐ ์๋ฏ์ด, `for - in`์ ์ด๊ฑฐ์ ์ดํฐ๋ ์ด์์ ์ฐจ์ด๊ฐ ์์

<br>

### 2). ์ดํฐ๋ฌ๋ธ ์ค๋ธ์ ํธ ๊ตฌ์กฐ

```tsx
'use strict';

const list = ['A', 'B'];

/*
  1. ์ค๋ฅธ์ชฝ list๋ฅผ ํผ์น๋ฉด __proto__๊ฐ ์์ผ๋ฉฐ __proto__๋ฅผ ํผ์น๋ฉด Array ์ค๋ธ์ ํธ์ ๋ฉ์๋๊ฐ ํ์๋จ

  2. ์๋๋ก ๋ด๋ ค๊ฐ๋ฉด Symbol(Symbol.iterator)๊ฐ ์์, ๋ฐ๋ผ์ Array ์ค๋ธ์ ํธ๋ ์ดํฐ๋ฌ๋ธ ์ค๋ธ์ ํธ ์

  3. ๋ํ Symbol(Symbol.iterator)๋ฅผ ํผ์น๋ฉด __proto__์ Function ์ค๋ธ์ ํธ ๋ฉ์๋๊ฐ ์ฐ๊ฒฐ๋์ด ์์
    - ์ฆ, Symbol.iterator๋ ํจ์ ์

  4. Symbol.iterator๊ฐ ํจ์ ์ด๋ฏ๋ก ํธ์ถ ํ  ์ ์์
*/
```

<br>

### 3). ์์ฒด ์ค๋ธ์ ํธ์๋ ์์ง๋ง

- ์ดํฐ๋ฌ๋ธ ์ค๋ธ์ ํธ๋ฅผ ์์๋ฐ์๋ ๋จ
- ์ฆ, `prototype chain(__proto__)`์ ์์ผ๋ฉด ๋จ
- ์๋ฅผ ๋ค์ด, `Array` ์ค๋ธ์ ํธ๋ฅผ ์์ ๋ฐ์ผ๋ฉด ์ดํฐ๋ฌ๋ธ ์ค๋ธ์ ํธ๊ฐ ๋จ

<br>

## 2. ์ดํฐ๋ฌ๋ธ ํ๋กํ ์ฝ

### 1). ์ดํฐ๋ฌ๋ธ ํ๋กํ ์ฝ ๊ฐ๋

- ์ค๋ธ์ ํธ๊ฐ ๋ฐ๋ณตํ  ์ ์๋ ๊ตฌ์กฐ์ด์ด์ผ ํจ
- `Symbol.iterator`๋ฅผ ๊ฐ๊ณ  ์์ด์ผ ํจ

```tsx
const list = [10, 20];

console.log(list[Symbol.iterator]);

// function values() { [native code] }
```

<br>

### 2). ์๋ ๋นํธ์ธ ์ค๋ธ์ ํธ๋

- ๋ํดํธ๋ก ์ดํฐ๋ฌ๋ธ ํ๋กํ ์ฝ์ ๊ฐ๊ณ  ์์
- ์ฆ `Symbol.iterator`๋ฅผ ๊ฐ๊ณ  ์์ -`Array`, `Argument`, `String`, `TypedArray`, `Map`, `Set`, `DOM NodeList`

```toc

```
