---
emoji: ๐จโ๐ป
title: Symbol.toPrimitive
date: '2021-10-26 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  Symbol.toPrimitive
</h1>

<br>

## toPrimitive

- ์ค๋ธ์ ํธ๋ฅผ ๋์ํ๋ `Primitive` ๊ฐ์ผ๋ก ๋ณํ
- ๋์, ๊ธฐ๋ํ๋ ํ์
  - number, string, default
  - ToPrimitive ์คํ
- ์ค๋ธ์ ํธ๋ฅผ ๋ฌธ์์ด์ ๋์
  ```tsx
  const point = { bonus: 100 };
  console.log(point.toString()); // [object Object]

  const book = {
    toString() {
      return '์ฑ';
    },
  };

  console.log(`${book}`); // ์ฑ

  // 1. ๋ฌธ์์ด ๋์์ toString()์ ์ฌ์ฉํจ
  // 2. point.toString() Object.prototype.toString()๊ฐ ํธ์ถ ๋จ
  // 3. `${book}` book ์ค๋ธ์ ํธ์ toString()์ด ํธ์ถ ๋จ
  ```
- ์ค๋ธ์ ํธ๋ฅผ ์ซ์์ ๋์
  ```tsx
  const point = {bonus: 100};
  console.log(point.valueOf());  // {bonus: 100}

  const book = {
  	toString() { return 70 }
  	valueOf() { return 30 }
  };

  console.log(book * 20);   // 600

  // 1. ์ซ์ ๋์์ valueOf()๋ฅผ ์ฌ์ฉํจ
  // 2. point.valueOf() Object.prototype.valueOf()๊ฐ ํธ์ถ ๋จ
  // 3. book * 20 book ์ค๋ธ์ ํธ์ valueOf()๊ฐ ํธ์ถ๋๋ฉฐ toString()์ด ํธ์ถ๋์ง ์์
  // 4. valueOf()๋ฅผ ์์ฑํ์ง ์์ผ๋ฉด toString()์ด ํธ์ถ๋จ
  ```
- `Symbol.toPrimitive()` ์ฌ์ฉ
  ```tsx
  const obj = {
    [Symbol.toPrimitive](hint) {
      return hint === 'number' ? 30 : hint === 'string' ? '์ฑ' : 'default';
    },
  };

  console.log(20 * obj); // 600
  console.log(`${obj}` + 100); // ์ฑ100
  console.log(obj + 50); // default50
  console.log('default' === obj); // true;
  ```

```toc

```
