---
emoji: ๐จโ๐ป
title: ํจ์ํ ํ๋ก๊ทธ๋๋ฐ - ์ ๋๋ ์ดํฐ
date: '2022-01-14 19:31:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

## ์ ๋๋ ์ดํฐ

- Iterator์ด์ Iterable์ ์์ฑํ๋ ํจ์
- Iterator๋ฅผ returnํ๋ ํจ์

```tsx
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

let iter = gent();
console.log(iter[Symbol.iterator]); // [Symbol.iterator]()๋ฅผ ๊ฐ์ง๊ณ  ์์
console.log(iter[Symbol.iterator]() === iter); // true
console.log(iter.next()); // {value:1, done:false}
```

- ๋ํ Well-Formed-Iterator์(Iterator๋ฅผ ๋ฆฌํดํ๋๋ฐ ๊ทธ ๊ฒ์ด ์๊ธฐ ์์ ๊ณผ ๋์ผ)
- ๊ทธ๋์ ์ํ ๊ฐ๋ฅ

```tsx
for (const a of gen()) console.log(a); // 1,2,3
```

- ์ํ๋ฅผ ํ  ๋ ๋ฌธ์ฅ์ผ๋ก ํํ ๊ฐ๋ฅ

```tsx
function* gen() {
  yield 1;
  if (false) yield 2;
  yield 3;
}

let iter = gent();
for (const a of gen()) console.log(a); // 1,3
```

โ> ์ด๋ ๊ฒ๋๋ฉด JS์์ ์ ๋๋ ์ดํฐ ๋ด๋ถ ๋ฌธ์ฅ์ ํตํด ์ํํ  ์ ์๋๋ก ๋ง๋ค ์ ์์

โ> ์ฆ, ๋ค์ํ ๊ฐ๋ค์ ์ ๋๋ ์ดํฐ๋ฅผ ํตํด์ ์ํํ  ์ ์๋๋ก ํ  ์ ์์

<br>

## ์ฃผ์ ์ฌํญ

- ์ ๋๋ ์ดํฐ์ return๊ฐ์ ๋ช์ํ  ์ ์์ง๋ง
- ์ํํ  ๋์๋ ๋์ค์ง ์์

```tsx
function* gen() {
  yield 1;
  yield 2;
  yield 3;

  return 100;
}

for (const a of gen()) console.log(a); // 1,2,3
```

<br>

## ์ ๋๋ ์ดํฐ๋ฅผ ํตํด ํ์๋ง ์ํํ๋ ์ฝ๋ ์์ฑ

```tsx
function* infinity(i) {
  while (true) yield i++;
}

function* limit(l, iter) {
  for (const a of iter) {
    yield a;
    if (a == l) return;
  }
}

function* odds(l) {
  for (const a of limit(l, infinity(1))) {
    if (a % 2) yield a;
  }
}

for (const a of odds(40)) log(a);
```

<br>

## for...of, แแฅแซแแข แแงแซแแกแซแแก, แแฎแแฉ แแฎแซแแข, แแกแแฅแแต แแงแซแแกแซแแก

- Iterable, Iterator ํ๋กํ ์ฝ์ ์งํค๊ณ  ์๋ ๊ฒ๋ค์ ํตํด ์ฌ์ฉ์ ์ ์ ์ดํฐ๋ ์ดํฐ ํ์ฉ

```tsx
log(...odds(10));
log([...odds(10), ...odds(20)]);

const [head, ...tail] = odds(5);
log(head);
log(tail);

const [a, b, ...rest] = odds(10);
log(a);
log(b);
log(rest);
```

<br>

## ๋๋์ 

์ ๋๋ ์ดํฐ๋ฅผ ํตํด ์ํํ  ์ ์๋๋ก ์ฝ๋๋ฅผ ์์ฑํ  ์ ์๋๋๋ ์ฌ์ค๊ณผ ์ผ๋ฐ์ ์ธ ์ํ๊ฐ ์๋ ํน์  ์กฐ๊ฑด์ ๋ถ์ฌํด ์ํ๊ฐ ๊ฐ๋ฅํ๋ค๋ ์ฌ์ค์ด ์ฌ๋ฐ๊ฒ ๋ค๊ฐ์๋ค. ์ด๋ฅผ ํตํด ์กฐ๊ธ ๋ ํจ์จ์ ์ผ๋ก ์ํํ  ์ ์๋ค๋ ์ฌ์ค์ ์๊ฒ๋์ด์ ์ข์๋ค.

<br>

### ์ฐธ๊ณ 

```js
์ ์ธ๋๋์ ํจ์ํ ํ๋ก๊ทธ๋๋ฐ๊ณผ JS ES6+ ๊ฐ์

```

```toc

```
