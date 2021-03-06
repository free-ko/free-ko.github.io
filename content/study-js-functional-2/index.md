---
emoji: ๐จโ๐ป
title: ํจ์ํ ํ๋ก๊ทธ๋๋ฐ - Iterable ๊ตฌํ, Iterable/Iterator ํ๋กํ ์ฝ ์ ์
date: '2022-01-13 19:31:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

## Iterable ๊ตฌํ, Iterable/Iterator ํ๋กํ ์ฝ ์ ์

```tsx
const iterable = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      next() {
        return i == 0 ? { done: true } : { value: i--, done: false };
      },
    };
  },
};
```

<br>

## ์ ์ฉ

```tsx
const iterator = iterable[Symbol.iterator]();
console.log(iterator.next()); // {value: 3, done: false};
console.log(iterator.next()); // {value: 2, done: false};
console.log(iterator.next()); // {value: 1, done: false};
console.log(iterator.next()); // {done: true};

// iterable์ iterator๊ฐ ๊ตฌํ๋์ด ์๊ธฐ ๋๋ฌธ์
// for..of๋ฌธ์ ๋ค์ด๊ฐ ์ฌ์ฉ๊ฐ๋ฅํ๋ฉฐ
// for..of๋ฌธ ์์์ [Symbol.iterator]() ๋ฉ์๋๊ฐ ์คํ๋๋ฉฐ ๊ฐ์ฒด๊ฐ ๋ฆฌํด๋จ
// ์์ const iterator์ ๊ฐ์
// ๊ทธ๋ฆฌ๊ณ  ๋ด๋ถ์ ์ผ๋ก next()๋ฅผ ์คํํ๋ฉด์ a์ value ๊ฐ์ ๋ฃ์
for (const a of iterable) console.log(a); // 3,2,1
```

<br>

## Well-Formed Iterator

- ์ ๊ตฌํ๋ `Iterator`๋ `next()`๋ฉ์๋๋ฅผ ์คํํ ์ดํ์ `for`๋ฌธ์ ๋ค์ด๊ฐ๋ฉด ๊ทธ ์ดํ์ ๊ฐ์ด ์ํ๋์ด์ง
- ๊ทธ๋ฌ๋ ์์์ ๊ตฌํํ `[Symbol.iterator]()`๋ ๊ทธ๋ ์ง ๋ชปํจ

```tsx
const arr = [1, 2, 3];
const iterator = arr[Symbol.iterator]();

iterator.next();

for (const a of iterator) console.log(a); // 2, 3
```

- Iterator๊ฐ ์๊ธฐ ์์ ์ ๋ฐํํ๋ `[Symbol.iterator]()` ๋ฉ์๋๋ฅผ ๊ฐ์ง๊ณ  ์์ ๋ `well-formed Iterator`์ด๋ผ๊ณ  ํ  ์ ์์

```tsx
console.log(iterator[Symbol.iterator]() === iterator); // true
```

- ๊ธฐ์กด์ ์ฌ์ฉ์ ์ ์๋ก ๋ง๋  Iterable์ ์ฝ๋ ์ถ๊ฐ
- ์ด๋์์๋  `iterator`๋ฅผ ๋ง๋ค์์ ๋ ์ด์ ๊น์ง ์งํ๋์๋ ์์ ์ ์ํ์์ `next()`๋ฉ์๋๋ฅผ ํธ์ถ ํ์ ๋ ๋ค์ ๊ฐ์ด ๋์ฌ ์ ์๋๋ก ๊ฐ๋ฅํจ
- ์ฆ ์ด๊ฒ์ด `well-formed Iterator`

```tsx
const iterable = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      next() {
        return i == 0 ? { done: true } : { value: i--, done: false };
      },
      // ์๊ธฐ ์์ ์ return ํ  ์ ์๋๋ก ์ฝ๋ ์ถ๊ฐ
      // Iterator๋ก Iterable์ด ๋  ์ ์๋๋ก ํจ
      [Symbol.iterator]() {
        return this;
      },
    };
  },
};

for (const a of iterator) console.log(a); // 3,2,1
for (const a of iterable) console.log(a); // 3,2,1
```

<br>

## ๋ค๋ฅธ ๊ณณ์์๋ Iterator, Iterable ํ๋กํ ์ฝ์ ๋ฐ๋ฅด๊ณ  ์์

```tsx
for (const a of document.querySelectorAll('*')) log(a);
const all = document.querySelectorAll('*');
let iter3 = all[Symbol.iterator]();

log(iter3.next()); // {value: html, done:false}
log(iter3.next()); // {value: head, done:false}
log(iter3.next()); // {value: script, done:false}
```

<br>

## ์ ๊ฐ ์ฐ์ฐ์

- ์ ๊ฐ ์ฐ์ฐ์๋ Iterable, Iterator ํ๋กํ ์ฝ์ ๋ฐ๋ฅด๊ณ  ์์

```tsx
const a = [1, 2];

console.log([...a, ...[3, 4]]); // [1,2,3,4]

a[Symbol.iterator] = null;

console.log([...a, ...[3, 4]]); // a is not iterable
```

<br>

## ๋๋์ 

์ดํฐ๋ฌ๋ธ์ด ๋ฌด์์ธ์ง, ์ดํฐ๋ ์ดํฐ๊ฐ ์ ์์ด์ผ ํ๋์ง ๊ทธ๋ฆฌ๊ณ  `for..of`๋ฌธ์ด ์๋๋๋ ์์ธ ๋ฑ ๋ชจ๋ฅด๋ ๊ฒ ์ ์๊ฒ ๋์๋ค.
์ฒ์์๋ ์ต์ํ์ง ์ด๋ ต๋ค๊ณ  ๋๊ปด์ก์ง๋ง ์ฒ์ฒํ ๊ณต๋ถ๋ฅผ ํ๋ ์กฐ๊ธ์ฉ ์ดํด๊ฐ ๊ฐ๊ธฐ ์์ํ์๋ค.
JS ํจ์ํ ํ๋ก๊ทธ๋๋ฐ๊ด๋ จ ๊ฐ์๋ค 2๋ฒ์งธ ๋ฃ๋ ๊ฑฐ์ฌ์ ๊ทธ๋ฐ์ง, ์ง๊ธ ๋ฐฐ์ฐ๋ ์ดํฐ๋ฌ๋ธ์ ๋ํ ๋ด์ฉ์ ์์์ผ ํจ์ํ ํ๋ก๊ทธ๋๋ฐ์ ์ ํ  ์ ์๋ค๋ ์ฌ์ค์ ๋ค์ ํ๋ฒ ๋๋ผ๊ฒ ๋์๋ค.

<br>

### ์ฐธ๊ณ 

```js
์ ์ธ๋๋์ ํจ์ํ ํ๋ก๊ทธ๋๋ฐ๊ณผ JS ES6+ ๊ฐ์

```

```toc

```
