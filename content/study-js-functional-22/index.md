---
emoji: ๐จโ๐ป
title: ํจ์ํ ํ๋ก๊ทธ๋๋ฐ - ๊ฐ์ฒด๋ฅผ ์ดํฐ๋ฌ๋ธ ํ๋ก๊ทธ๋๋ฐ์ผ๋ก ๋ค๋ฃจ๊ธฐ
date: '2022-03-19 15:41:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

# โ ๋ชฉํ

- ๊ฐ์ฒด๋ฅผ ์ดํฐ๋ฌ๋ธ ํ๋ก๊ทธ๋๋ฐ์ผ๋ก ์์ํ๋ค๋ ๊ฒ์ ์ด๋ค ์๋ฏธ ์ผ๊น?

<br>

## ๐ L.values() ๊ตฌํ

### ๊ธฐ์กด values()

- `Object.values`๋ ์ฆ์ ๋ฐฐ์ด๋ก ๋ง๋ค์ด ๋๊ณ  ์์ํจ

```tsx
const obj1 = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
};

console.log(Object.values(obj1));
```

<br>

### L.values()

- ํ์ํ ๋งํผ๋ง ๋ฐฐ์ด๋ก ๋ง๋ค์ด์, ์ถ์ถํด ์ฌ์ฉ(์ฝ๋ ํ๊ฐ๋ฅผ ์ง์ฐ)
- ์ฆ, ๋ฐ์ `take`์์ 2๊ฐ๋ง ๊บผ๋ด๊ธฐ ๋๋ฌธ์ `obj1`์์ 2๊ฐ๋ง ๋ฐฐ์ด๋ก ๋ง๋ค์ด์ ์ฌ์ฉ
- ๋ํ, ๊ฐ์ฒด ๊ฐ์ด ๋ง์ ์ง๊ฑฐ๋, ๋ก์ง์ด ๋ณต์กํ  ๊ฒฝ์ฐ์๋ ๋ฐ์ ์ฝ๋๊ฐ ์์ ์ฝ๋๋ณด๋ค ์ ๋ฆฌํจ

```tsx
const obj1 = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
};

L.values = function* (obj) {
  for (const k in obj) {
    yield obj[k];
  }
};

_.go(
  obj1,
  L.values,
  L.map((a) => a + 10),
  L.take(2),
  _.reduce((a, b) => a + b),
  console.log,
);
```

<br>

## ๐ L.entries() ๊ตฌํ

- ์ง์ฐ์ ์ธ ํจ์๋ฅผ ๊ตฌํํ๊ฒ ๋๋ฉด, ์ด๋ค ๊ฐ์ด ๋ค์ด์ค๋์ง ๊ฐ์ ์ดํฐ๋ฌ๋ธ ํ๋ก๊ทธ๋๋ฐ ๊ฐ๋ฅ

```tsx
L.entries = function* (obj) {
  for (const k in obj) {
    yield [k, obj[k]];
  }
};

_.go(
  obj1,
  L.entries,
  L.filter(([_, v]) => v % 2),
  L.map(([k, v]) => ({ [k]: v })),
  _.reduce(Object.assign),
  console.log,
);
```

<br>

## ๐ L.keys() ๊ตฌํ

```tsx
L.keys = function* (obj) {
  for (const k in obj) {
    yield k;
  }
};

_.go(obj1, L.keys, _.each(console.log));
```

<br>

## ๐ ์ด๋ ํ ๊ฐ์ด๋  ์ดํฐ๋ฌ๋ธ ํ๋ก๊ทธ๋๋ฐ์ผ๋ก ๋ค๋ฃจ๊ธฐ

- ์ดํฐ๋ฌ๋ธ๋ก ์ดํฐ๋ฌ๋ธ ํ๋ก๊ทธ๋๋ฐ ๊ฐ๋ฅ
- ๊ฐ์ฒด๋ฅผ ์ ๋๋ ์ดํฐ๋ฅผ ์ด์ฉํด, ์ดํฐ๋ ์ดํฐ๋ก ๋ง๋ค์ด์ ์ดํฐ๋ฌ๋ธ ํ๋ก๊ทธ๋๋ฐ ๊ฐ๋ฅ
- ์ด๋ค ์ ๋๋ ์ดํฐ๋  ์ดํฐ๋ ์ดํฐ๋ก ๋ง๋ค์ด์ ์ดํฐ๋ฌ๋ธ ํ๋ก๊ทธ๋๋ฐ ๊ฐ๋ฅ

```tsx
const g1 = function* (stop) {
  let i = -1;
  while (++i < stop) {
    yield 10;
    if (false) yield 20 + 30;
    yield 30;
  }
};

// L.take๋ก ์ด๋๊น์ง ํ๊ฐํ  ๊ฒ์ธ์ง ์ปจํธ๋กค ๊ฐ๋ฅ
console.log([...L.take(3, g1(10))]);

_.each(console.log, g1(10));

_.go(
  g1(10),
  L.take(2),
  _.reduce((a, b) => a + b),
  console.log,
);
```

<br>

## ๐ object ํจ์ ๋ง๋ค๊ธฐ

- ๋คํ์ฑ์ด ๋์

```tsx
const a = [
  ['a', 1],
  ['b', 2],
  ['c', 3],
];
const b = { a: 1, b: 2, c: 3 };

const object = (entries) =>
  _.go(
    entries,
    L.map(([k, v]) => ({ [k]: v })),
    _.reduce(Object.assign),
  );

console.log(object(L.entries({ b: 2, c: 3 })));
```

<br>

### reduceํ๋๋ก Object ํจ์ ๋ง๋ค๊ธฐ

```tsx
const a = [
  ['a', 1],
  ['b', 2],
  ['c', 3],
];
const b = { a: 1, b: 2, c: 3 };

const object = (entries) => _.reduce((obj, [k, v]) => ((obj[k] = v), obj), {}, entries);

console.log(object(L.entries({ b: 2, c: 3 })));
```

<br>

### ์ฐธ๊ณ 

- `Map` ์ ํตํด m์ ๋ง๋ ํ, `JSON.stringify()` ํ๊ฒ๋๋ฉด ๊ฐ์ด ์ฌ๋ผ์ง
- ์๋ฅผ ๋ค์ด, `Map`์ ํตํด ์ค๋ธ์ ํธ๋ก ์๋ฒ์๊ฒ ์ ๋ฌํ ๋ ค๋ฉด, ์ค๋ธ์ ํธ๋ก ๋ง๋ค์ด์ผ ํจ

```tsx
let m = new Map();
m.set('a', 10);
m.set('b', 20);
m.set('c', 30);

JSON.stringify(m); // "{}"
```

- ๋ฐ์ ์ฝ๋์์ `m` ์ด ์ดํฐ๋ฌ๋ธ์ ์ง์ํ๊ธฐ ๋๋ฌธ์, `object`ํจ์์์๋ `m`๊ฐ์ด ์ฌ๋ผ์ง์ง ์์
- ์๋ํ๋ฉด, `m` ์์ ์๋ ์ฝ๋๋ฅผ ํ๊ฐํ๋ฉด ๋ฐ์ ์ฒ๋ผ ๋ฐฐ์ด ๊ฐ์ด ์กด์ฌํจ
- ๋ํ, Mapํจ์๋ก ๋ง๋ค ๊ฒฝ์ฐ `values()`, `keys()` ํจ์๋ฅผ ์ง์ํจ

```tsx
const object = (entries) => _.reduce((obj, [k, v]) => ((obj[k] = v), obj), {}, entries);

let m = new Map();

[...m[Symbol.iterator]()]; // [["a", 10], ["b", 20], ["c", 30]]

m.set('a', 10);
m.set('b', 20);
m.set('c', 30);

console.log(object(m)); // {a: 10, b: 20, c: 30}
```

<br>

## ๐ mapObject ํจ์ ๋ง๋ค๊ธฐ

### ๊ฒฐ๊ณผ

```tsx
console.log(mapObject((a) => a + 10, { a: 1, b: 2, c: 3 }));

// ๊ฒฐ๊ณผ
// { a: 11, b: 12, c: 13 }
```

<br>

### ํจ์ํ์  ์ฌ๊ณ 

- ๋จผ์  ๊ฐ์ฒด๋ฅผ ๋ฐ์์, `entries` ํจ์ ๊ฒฐ๊ณผ์ฒ๋ผ ๋ฐฐ์ด๋ก ๋ง๋ค์ด์ ์ดํฐ๋ฌ๋ธ๋ก ๋ค๋ฃธ

```tsx
console.log(mapObject(a => a + 10, { a: 1, b: 2, c: 3 }));

[['a', 1], ['b', 2], ['c', 3]]

[['a', 11], ['b', 12], ['c', 13]]

{ a: 11 } ...

{ a: 11, b: 12, c: 13 }
```

<br>

### mapObject ํจ์

```tsx
const object = (entries) => _.reduce((obj, [k, v]) => ((obj[k] = v), obj), {}, entries);

const mapObject = (f, obj) =>
  _.go(
    obj,
    L.entries,
    _.map(([k, v]) => [k, f(v)]),
    object,
  );

console.log(mapObject((a) => a + 10, { a: 1, b: 2, c: 3 }));

// ๊ฒฐ๊ณผ
// { a: 11, b: 12, c: 13 }
```

<br>

## ๐ pick ํจ์ ๋ง๋ค๊ธฐ

### ๊ฒฐ๊ณผ

```tsx
const obj2 = { a: 1, b: 2, c: 3, d: 4, e: 5 };

console.log(pick(['b', 'c', 'z'], obj2));
// { b: 2, c: 3 }
```

<br>

### pick ํจ์

- ์ฌ์ฉํ๋ ์ชฝ์ ๋ง๊ฒ ํจ์๋ฅผ ๋ง๋๋ ๊ฒ์ด ์ข์
- ์ฆ, pick์ ๋ค์ด์ค๋ ์ธ์๋ฅผ ์ํํ๋ฉด์ ํด๋น ๊ฐ์ ์ถ์ถ

```tsx
// ํ์ดํ๋ผ์ธ ํํ
const pick = (ks, obj) =>
  _.go(
    ks,
    _.map((k) => [k, obj[k]]),
    object,
  );

// ๋ค๋ฅธ ํํ
const pick = (ks, obj) => object(_.map((k) => [k, obj[k]], ks));
```

<br>

### Undefined ์ ๊ฑฐ

- ๋ฐํ์ ์ฆ, ์ฝ๋๋ฅผ ์คํํ๋ ๊ณผ์ ์์ ๊ฒฐ๊ณผ๊ฐ `undefined` ๊ฐ์ด ๋์ค์ง ์๋๋ก ํด์ผ ์ข์
- ์๋ฅผ ๋ค์ด ์๋ฒ์ `const data = {a: 2, b: 3, c: undefined}` ๊ฐ์ ์ ๋ฌ ํ  ๋
- `JSON.stringify(data)` ์ฒ๋ฆฌ ํ๊ฒ ๋๋ฉด `โ{a: 2, b: 3}"` ๋ก ์ฒ๋ฆฌ๊ฐ ๋จ
- ์ฆ, ์๋ฒ์์ ์ฒ๋ฆฌํ  ์๋ ์๊ณ  ํ๋ก ํธ์์๋ ๊ฐ์ ๋ฐ์ ์๋ ์์
- ๋จ, ๋ก์ง ์์์ `undefined`์ ์ฒ๋ฆฌํ๋ ๊ฒ์ ๊ด์ฐฎ์

```tsx
const pick = (ks, obj) =>
  _.go(
    ks,
    L.map((k) => [k, obj[k]]),
    L.reject(([k, v]) => v === undefined),
    object,
  );
```

<br>

## ๐ indexBy ํจ์ ๋ง๋ค๊ธฐ

### Find ํจ์๋ฅผ ํตํด ํน์  ๊ฐ ์ถ์ถ

- `Find` ํจ์๋ฅผ ํตํด์ ํน์  ๊ฐ์ ์ถ์ถํ ๋ ค๋ฉด, ๋ชจ๋  ๊ฐ์ ์ํํด์ผ ๋จ

```tsx
const users = [
  { id: 5, name: 'AA', age: 35 },
  { id: 10, name: 'BB', age: 26 },
  { id: 19, name: 'CC', age: 28 },
  { id: 23, name: 'CC', age: 34 },
  { id: 24, name: 'EE', age: 23 },
];

// ์ฌ์ฉ
_.find((u) => u.id == 19, users);
```

<br>

### indexBy ํจ์๋ฅผ ํตํด ํน์ ๊ฐ ์ถ์ถ

- ์ํํ์ง ์๊ณ , ๋ฐ๋ก `index`๋ก ๊ฐ์ ์ถ์ถ
- ์ฆ, `find`๋ณด๋ค ์ฑ๋ฅ์ด ์ข์

```tsx
const users = [
  { id: 5, name: 'AA', age: 35 },
  { id: 10, name: 'BB', age: 26 },
  { id: 19, name: 'CC', age: 28 },
  { id: 23, name: 'CC', age: 34 },
  { id: 24, name: 'EE', age: 23 }
];

// ๋ฌด์ธ๊ฐ ์๋ก์ด ์ดํฐ๋ ์ดํฐ๋ฅผ ๋ง๋ค๊ธฐ ์ํด์๋ reduce๊ฐ ํ์
_.indexBy = (f, iter) =>
  _.reduce((obj, a) => (obj[f(a)] = a, obj), {}, iter);

_.indexBy(u => u.id, users);

// ๊ฒฐ๊ณผ
{
	5: { id: 5, name: 'AA', age: 35 },
	10: { id: 10, name: 'BB', age: 26 },
	19: { id: 19, name: 'CC', age: 28 },
	23: { id: 23, name: 'CC', age: 34 },
	24: { id: 24, name: 'EE', age: 23 },
}
```

<br>

## ๐ indexBy ๋ ๊ฐ์ filter ํ๊ธฐ

- ๊ธฐ์กด `indexBy` ๊ฒฐ๊ณผ๋ ์ดํฐ๋ฌ๋ธ์ด ์๋๊ธฐ ๋๋ฌธ์ ์ํ๊ฐ ๋์ง ์์ ํํฐ์ฒ๋ฆฌ๊ฐ ํ๋ฌ

```tsx
const users = [
  { id: 5, name: 'AA', age: 35 },
  { id: 10, name: 'BB', age: 26 },
  { id: 19, name: 'CC', age: 28 },
  { id: 23, name: 'CC', age: 34 },
  { id: 24, name: 'EE', age: 23 },
];

_.indexBy = (f, iter) => _.reduce((obj, a) => ((obj[f(a)] = a), obj), {}, iter);

const user2 = _.indexBy((u) => u.id, users);

const users3 = _.go(
  users2,
  L.entries,
  L.filter(([_, { age }]) => age < 30),
  L.take(2),
  object,
);

console.log(users3[19]);
```

<br>
<br>

## ๐ ๋๋์ 

JS์์ ์ ๊ณตํ๋ Object ๋ด๋ถ ํจ์๋ฅผ ์ง์ฐ์ ์ธ ํจ์ํ ํ๋ก๊ทธ๋๋ฐ์ผ๋ก ๋ง๋๋ ํ์ต์ ํตํด, ์ง์ฐ์  ์ฝ๋ ํ๊ฐ์ ๋ํ ์ดํดํ๋ ์๊ฐ์ ๊ฐ์ก์ต๋๋ค.

<br>

## ์ฐธ๊ณ 

```js
์ ์ธ๋๋์ ํจ์ํ ํ๋ก๊ทธ๋๋ฐ๊ณผ JS ES6+ ๊ฐ์

```

```toc

```
