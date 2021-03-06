---
emoji: ๐จโ๐ป
title: ํจ์ํ ํ๋ก๊ทธ๋๋ฐ - ์์๋ฅผ ํตํด ๋ณต์ต
date: '2022-01-26 08:20:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

## ์ง๊ธ๊น์ง ํ์ตํ ํจ์๋ค

```tsx
const curry = (f) => (a, ..._) => (_.length ? f(a, ..._) : (..._) => f(a, ..._));

const map = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
});

const filter = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
});

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
});

const go = (...args) => reduce((a, f) => f(a), args);

const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);
```

<br>
<br>

## ์ด ์๋ ๊ตฌํ๊ธฐ

```tsx
const products = [
  {name: '๋ฐํํฐ', price: 15000, quantity: 1},
  {name: '๊ธดํํฐ', price: 20000, quantity: 2},
  {name: 'ํธ๋ํฐ์ผ์ด์ค', price: 15000, quantity: 3},
  {name: 'ํ๋ํฐ', price: 30000, quantity: 4},
  {name: '๋ฐ์ง', price: 25000, quantity: 5}
];

go(
	products,
	map(p => p.quantity);    // [1,2,3,4,5]
	reduce((a,b) => a + b),  // 15
)

// ์ฝ๋ ์ ๋ฆฌ
const add = (a, b) => a + b;

// ์ด ์๋
const total_quantity = product => go(product,
	map(p => p.quantity),
	reduce(add);

// Pipe ์ ์ฉ
const total_quantity = pipe(
	map(p => p.quantity),
	reduce(add);

console.log(total_quantity(products));  // 15

```

<br>
<br>

## ์ด ๊ธ์ก ๊ตฌํ๊ธฐ

```tsx
const products = [
  {name: '๋ฐํํฐ', price: 15000, quantity: 1},
  {name: '๊ธดํํฐ', price: 20000, quantity: 2},
  {name: 'ํธ๋ํฐ์ผ์ด์ค', price: 15000, quantity: 3},
  {name: 'ํ๋ํฐ', price: 30000, quantity: 4},
  {name: '๋ฐ์ง', price: 25000, quantity: 5}
];

const total_price = pipe(
	map(p => p.price * p.quantity),
	reduce(a

console.log(total_price(products));  // 345000
```

<br>
<br>

## ๋ฆฌํฉํ ๋ง ํด๋ณด๊ธฐ

- `total_quantity`, `total_price` ๋ด๋ถ์ map ํจ์ ์ธ์์ ์ ๋ฌํ๋ ๋ถ๋ถ์ ์ ์ธํ๊ณ ๋ ๋์ผํ ์ฝ๋
- ํ์ฌ, `map` ํจ์ ์คํ ํ `reduce` ์คํํ๋ ๊ณผ์ ์ด ํน์  ๋๋ฉ์ธ(products)์ ์์กดํ๊ณ  ์์
- ๊ฒฐ๊ตญ `total_quantity`, `total_price` ์ ํน์  ๋๋ฉ์ธ(products)์ ์ํ ์ฝ๋ ์
- ์ถ์ํ ๋ ๋ฒจ์ ๋์ฌ, ๋ง์ ๊ณณ์ ์ฌ์ฉํ  ์ ์๋๋ก ๋ฆฌํฉํ ๋ง ์งํ

```tsx
const products = [
  { name: '๋ฐํํฐ', price: 15000, quantity: 1 },
  { name: '๊ธดํํฐ', price: 20000, quantity: 2 },
  { name: 'ํธ๋ํฐ์ผ์ด์ค', price: 15000, quantity: 3 },
  { name: 'ํ๋ํฐ', price: 30000, quantity: 4 },
  { name: '๋ฐ์ง', price: 25000, quantity: 5 },
];

// ์ฒซ ๋ฒ์งธ ์ธ์๋ก ํจ์๋ฅผ ๋ฐ์์ ์ธ๋ถ์์ ์์ํ๋ ๋ฐฉ์
// ์ฆ, ํ๋ผ๋ฏธํฐ์ ์ ๋ฌํ  ๋ ๊ฒฐ์ ํ  ์ ์๋๋ก ๋ฆฌํฉํ ๋ง ๊ฐ๋ฅ
const sum = (f, iter) => go(iter, map(f), reduce(add));

// ์ด ์๋
const total_quantity = (products) => sum((p) => p.quantity, products);

// ์ด ๊ธ์ก
const total_price = (products) => sum((p) => p.price * p.quantity, products);
```

<br>
<br>

## ์ปค๋ง์ ์ด์ฉํด ๋ ๋ฆฌํฉํ ๋ง ํด๋ณด๊ธฐ

```tsx
const sum = curry((f, iter) => go(iter, map(f), reduce(add)));

// curry์ผ๋ก sumํจ์๋ฅผ ๊ฐ์ธ๊ฒ ๋๋ฉด
// ๋ฐ์์ฒ๋ผ ์คํ ๊ฐ๋ฅ
const total_quantity = (products) => sum((p) => p.quantity)(products);

// ์ฆ, products๋ฅผ ๋ฐ๋ ํจ์๊ฐ
// ๋ฐ๋ก sum์ด ๋ฆฌํดํ๋ ํจ์์ products๋ฅผ ์ ๋ฌํ๊ณ ๋ง ์๊ธฐ ๋๋ฌธ์
// products๋ฅผ ๋ฐ๋ ์๋ฆฌ์ sum(p => p.quantity) ์ด ์ฝ๋๋ฅผ ๋์ ํด์ ํ๊ฐํด๋
// ๋๊ฐ์ด ๋์ ํจ
const total_quantity = sum((p) => p.quantity);
```

- ๋ค๋ฅธ ๋๋ฉ์ธ์์๋ ์ฌ์ฉ

```tsx
// sum์ ๋ค๋ฅธ ๋๋ฉ์ธ์์๋ ์ฌ์ฉ ๊ฐ๋ฅ ํ๊ธฐ๋๋ฌธ์
// ์ถ์ํ ๋ ๋ฒจ์ด ๋์
sum((user) => user.age, [{ age: 30 }, { age: 20 }, { age: 10 }]);
```

<br>
<br>

## ํจ์ํ ํ๋ก๊ทธ๋๋ฐ์ผ๋ก HTMLแแฉ แแฎแฏแแงแจํ๊ธฐ

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>HTML ์ถ๋ ฅํด๋ณด๊ธฐ - ์ฅ๋ฐ๊ตฌ๋</title>
  </head>

  <body>
    <div id="cart"></div>
  </body>
</html>
```

- `JS`๋ฅผ ํตํด์ HTML ๋๋๋ง
- ํํ๋ฆฟ ๋ฆฌํฐ๋ด์ ํตํด์ ๋์ ์ผ๋ก ํํ
- `Sum`์ด๋ผ๋ ํจ์๋ฅผ ํตํด ๋ค์ํ ๊ณณ์์ ์ฌ์ฉ ๊ฐ๋ฅ
- `Reduce`๋ฅผ ํตํด HTML์ ํ๋์ ๋ฌธ์์ด๋ก ํฉ์นจ

```tsx
const products = [
  { name: '๋ฐํํฐ', price: 15000, quantity: 1, is_selected: true },
  { name: '๊ธดํํฐ', price: 20000, quantity: 2, is_selected: false },
  { name: 'ํธ๋ํฐ์ผ์ด์ค', price: 15000, quantity: 3, is_selected: true },
  { name: 'ํ๋ํฐ', price: 30000, quantity: 4, is_selected: false },
  { name: '๋ฐ์ง', price: 25000, quantity: 5, is_selected: false },
];

const add = (a, b) => a + b;

const sum = curry((f, iter) => go(iter, map(f), reduce(add)));

const total_quantity = sum((p) => p.quantity);

const total_price = sum((p) => p.price * p.quantity);

document.querySelector('#cart').innerHTML = `
    <table>
      <tr>
        <th></th>
        <th>์ํ ์ด๋ฆ</th>
        <th>๊ฐ๊ฒฉ</th>
        <th>์๋</th>
        <th>์ด ๊ฐ๊ฒฉ</th>
      </tr>
      ${go(
        products,
        sum(
          (p) => `
          <tr>
            <td><input type="checkbox" ${p.is_selected ? 'checked' : ''}></td>
            <td>${p.name}</td>
            <td>${p.price}</td>
            <td><input type="number" value="${p.quantity}"></td>
            <td>${p.price * p.quantity}</td>
          </tr>
      `,
        ),
      )}
      <tr>
        <td colspan="3">ํฉ๊ณ</td>
        <td>${total_quantity(filter((p) => p.is_selected, products))}</td>
        <td>${total_price(filter((p) => p.is_selected, products))}</td>
      </tr>
    </table>
  `;
```

<br>

<br>
<br>

## ๋๋์ 

์ด๋ฒ ํ์ต์ ํตํด ํจ์ํ ํ๋ก๊ทธ๋๋ฐ์ผ๋ก HTML์ ์ถ๋ ฅํ๋ ๋ด์ฉ์ ํ์ตํ๋ฉด์ ์ถ์ํ๊ฐ ๋๋ค๋ ์๋ฏธ๊ฐ ์ด๋ค ๊ฒ์ธ์ง ๋ค์ ํ๋ฒ ์๊ฒ ๋์๋ค. ๊ฒฐ๊ตญ ์ฝ๋๋ฅผ ์ฌ ์ฌ์ฉํ  ์ ์๋ ๋ฒ์๊ฐ ๋์ ์๋ก ํจ์จ์ ์ด๊ณ  ์์ฐ์ ์ผ๋ก ์ผ ํ  ์ ์๋ค๋ ๊ฒ๋ ๊นจ๋ซ๊ฒ ๋์๋ค. ๋ ์ ๋๋ก ํ์ตํด์ ์ค๋ฌด์์ ์ ์ฉํ  ์ ์๋๋ก ํด์ผ ๊ฒ ๋ค.

<br>

### ์ฐธ๊ณ 

```js
์ ์ธ๋๋์ ํจ์ํ ํ๋ก๊ทธ๋๋ฐ๊ณผ JS ES6+ ๊ฐ์

```

```toc

```
