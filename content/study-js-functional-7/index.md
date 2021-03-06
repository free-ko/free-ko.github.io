---
emoji: ๐จโ๐ป
title: ํจ์ํ ํ๋ก๊ทธ๋๋ฐ - Map, Filter, Reduce ์ค์ฒฉ ์ฌ์ฉ
date: '2022-01-22 18:22:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

## Map, filter, Reduce ์ ๋ฆฌ

```js
const map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
};

const filter = (f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
};

const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
};
```

<br>

## ํจ์ํ ํ๋ก๊ทธ๋๋ฐ ์ฌ๊ณ 

- **products์์ ๊ฐ๊ฒฉ์ด 20,000๋ง์ ๋ฏธ๋ง์ธ ๊ฐ๊ฒฉ์ ํฉ์น๊ณ  ์ถ๋ค๊ณ  ์น๋ฉด**
- `reduce`ํจ์์ ์ฒซ๋ฒ ์งธ ์ธ์๋ก ๋ค์ด์ค๋ `add`๋ผ๋ ํจ์๋ฅผ ํตํด, ๋ ๋ฒ์งธ ์ธ์์ ๋ฐฐ์ด ์์ ๊ฐ๋ค์ด ํฉ์ฐ๋จ
- ์ฆ, ๋ฐ์ ์ฝ๋๋ฅผ ๋ณด๋ฉด, ๋ ๋ฒ์งธ ์ธ์์ 20,000์ ๋ฏธ๋ง์ ๊ฐ๋ค์ด ๋ฐฐ์ด๋ก ๋ค์ด์์ผ ํ๋ค๊ณ  ์๊ฐํด์ผ ํจ

```tsx
const products = [
  {name: '๋ฐํํฐ', price: 15000},
  {name: '๊ธดํํฐ', price: 20000},
  {name: 'ํธ๋ํฐ์ผ์ด์ค', price: 15000},
  {name: 'ํ๋ํฐ', price: 30000},
  {name: '๋ฐ์ง', price: 25000}
];

const add = (a, b) => a + b;

reduce(add, [a,b,c,d..])
```

- filterํจ์๋ฅผ ํตํด 20,000์ ๋ฏธ๋ง์ ์ํ์ ๋ฐฐ์ด๋ก `return`ํ๋ ์ฝ๋๋ฅผ ์์ฑํ๋ฉด ๋จ

```tsx
reduce(
  add,
  filter((p) => p.price < 20000, products),
);

// filter(p => p.price < 20000, products) ๊ฒฐ๊ณผ๊ฐ ๋ฐ์ ๋ฐฐ์ด
/* [
		{name: '๋ฐํํฐ', price: 15000},
	  {name: 'ํธ๋ํฐ์ผ์ด์ค', price: 15000},
		]
*/
```

<br>

## ์ ๋ฆฌ

- ๋จธ๋ฆฌ ์์ผ๋ก ๋ฏธ๋ฆฌ ์ด๋ ํ ๊ฒฐ๊ณผ๊ฐ ์ฌ์ง ์๊ฐ์ ํ๊ณ , ๊ทธ ๊ฒฐ๊ณผ ๊ฐ์ด ๋ฐฐ์ด์ด๋ผ๋ฉด ๋ฐฐ์ด์ ๋ฆฌํดํ๋ ํจ์๋ฅผ ์ ์ ํ๊ฒ ์ฌ์ฉํด์ผ ํจ
- ๋ฐ์์ ์๋ก ์ฌ๋ผ์ค๋ฉด์ ์ฝ๋๊ฐ ๋์๋๊ธฐ ๋๋ฌธ์, ๋ฐ์์ ์๋ก ์ฝ๋๋ฅผ ์ฝ์ด์ผ ํจ

```tsx
const products = [
  { name: '๋ฐํํฐ', price: 15000 },
  { name: '๊ธดํํฐ', price: 20000 },
  { name: 'ํธ๋ํฐ์ผ์ด์ค', price: 15000 },
  { name: 'ํ๋ํฐ', price: 30000 },
  { name: '๋ฐ์ง', price: 25000 },
];

const add = (a, b) => a + b;

reduce(
  add,
  map(
    (p) => p.price,
    filter((p) => p.price < 20000, products),
  ),
);

reduce(
  add,
  filter(
    (n) => n >= 20000,
    map((p) => p.price, products),
  ),
);
```

<br>
<br>

## ๋๋์ 

ํจ์ํ ํ๋ก๊ทธ๋๋ฐ์ ์ธ ์ฌ๊ณ ๋ฅผ ์กฐ๊ธ์ด๋๋ง ์๊ฒ ๋์๋ค. ๋ํ ์ด๋ ๊ฒ ์ฝ๋๋ฅผ ์ค์ฒฉ์ผ๋ก ์ฌ์ฉํ๋ฉด์๋ ๊ฐ๋์ฑ ์ข๊ฒ ์ฝ๋๋ฅผ ์งค ์ ์์์ ๋๋ผ์ ๋ค.
๋ํ API๋ฅผ ํตํด ์ป์ด์ง๋ ํน์  ๋ฐ์ดํฐ๋ฅผ ๋ชจ๋ธ๋ง ํ๊ธฐ ์ฌ์ธ๊ฑฐ๋ผ๋ ์๊ฐ๋ ๋ค์๋ค.

<br>

### ์ฐธ๊ณ 

```js
์ ์ธ๋๋์ ํจ์ํ ํ๋ก๊ทธ๋๋ฐ๊ณผ JS ES6+ ๊ฐ์

```

```toc

```
