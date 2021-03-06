---
emoji: ๐จโ๐ป
title: ํจ์ํ ํ๋ก๊ทธ๋๋ฐ - ์ง์ฐ์ฑ(flatten, flatMap)
date: '2022-02-07 08:34:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

# flattenํจ์

- `flatten` ํจ์ : 1์ฐจ์ ๋ฐฐ์ด๋ก ๋ง๋ค์ด์ฃผ๋ ํจ์

```tsx
console.log(flatten([1, 2], 3, 4, [5, 6])); // [1,2,3,4,5,6]
```

<br>

### L.flatten ํจ์ ๊ตฌํ

- ๋ฐฐ์ด์ ๊น์ด์ ์๊ด์์ด ํน์  ๋ฐฐ์ด ์์ ์๋ ๊ฐ์ iterator๋ก ๋ฆฌํดํ๋ ํจ์

```tsx
// a && .. ์ฐ์ฐ์ ํ๋ ์ด์ ๋
// ํน์๋ a ๊ฐ์ null์ด ๋ค์ด์ค๋ ๊ฒ์ ๋ฐฉ์งํ๊ธฐ ์ํด
// &&(And)์ฐ์ฐ์๋ฅผ ์ฌ์ฉํจ
const isIterable = (a) => {
  a && a[Symbol.iterator];
};

L.flatten = function* (iter) {
  for (const a of iter) {
    if (isIterable(a)) {
      for (const b of a) {
        yield b;
      }
    } else {
      yield a;
    }
  }
};
```

<br>

### yield \* ์ ํตํด L.flatten ํจ์ ๊ตฌํ

- `yield *iterable` ์ `for(const val of iterable) yield val;`๊ณผ ๊ฐ์

```tsx
const isIterable = (a) => {
  a && a[Symbol.iterator];
};

L.flatten = function* (iter) {
  for (const a of iter) {
    if (isIterable(a)) {
      yield* a;
    } else {
      yield a;
    }
  }
};
```

<br>

### L.flatten ํจ์ ์ฌ์ฉ

```tsx
const it = L.flatten([...[1, 2], 3, 4, ...[5, 6], ...[7, 8, 9]]);

console.log(it.next()); // {value: 1, done: false}
console.log(it.next()); // {value: 2, done: false}

console.log([...it]);   // [1,2,3,4,5,6,7,8,9]

console.log(take(3, L.flatten([...[1, 2], 3, 4, ...[5, 6], ...[7, 8, 9]])) // [1,2,3]
```

<br>

### L.flatten์ ํตํด ์ฆ์ ์ฝ๋ ํ๊ฐํ๋ flattenํจ์ ๊ตฌํ

```tsx
const flatten = pipe(L.flatten, takeAll);
```

<br>

### L.deepFlat

- ๊น์ Iterable์ ๋ชจ๋ ํผ์นจ

```tsx
L.deepFlat = function *f(iter) {
	for(const a of iter) {
		if(isIterable(a)) {
			yield *f(a);
		} else {
			yield a;
		}
	}
}

console.log([...L.deepFlat([1,[2,[3,4],[5]]]])])
```

<br>
<br>

# flatMap

- Map๊ณผ Flattenํจ์๋ฅผ ๋์์ ํ๋ ํจ์
- ์ต์  JS ๋ฌธ๋ฒ์ ์ถ๊ฐ๋จ
- ๊ธฐ๋ณธ์ ์ผ๋ก JS๊ฐ ์ง์ฐ์ ์ผ๋ก ๋์ํ์ง ์๊ธฐ ๋๋ฌธ์, `flatMap`ํจ์๊ฐ ๋ฑ์ฅํจ

<br>

### ๊ธฐ๋ณธ JS์์ ์ ๊ณตํ๋ flatMap์ฌ์ฉ

- ์ด ํจ์๋ ๋ง์ฐฌ๊ฐ์ง๋ก, ๋ฐฐ์ด์ ๋ค ๋ง๋ค์ด ๋๊ณ  ๊ทธ ๋ค์ ํจ์ ์คํ

```tsx
// [1,2,3,4,5,6,7]
log(
  [
    [1, 2],
    [3, 4],
    [5, 6, 7],
  ].flatMap((a) => a),
);

// [1,4,9,16,25,36,49]
log(
  [
    [1, 2],
    [3, 4],
    [5, 6, 7],
  ].flatMap((a) => a.map((a) => a * a)),
);

// ์์ ๊ฒฐ๊ณผ ๋์ผ
log(
  flatten(
    [
      [1, 2],
      [3, 4],
      [5, 6, 7],
    ].map((a) => a.map((a) => a * a)),
  ),
);
```

<br>

### L.flatMap ํจ์ ๊ตฌํ

```tsx
L.flatMap = curry(pipe(L.map, L.flatten));

const it = L.flatMap(
  map((a) => a * a),
  [
    [1, 2],
    [3, 4],
    [5, 6, 7],
  ],
);
log(it.next()); // {value:1, done: false}
log(it.next()); // {value:4, done: false}
log(it.next()); // {value:9, done: false}
log([...it]); // [1,4,9,16,25,36,49]

const it = L.flatMap((a) => a, [
  [1, 2],
  [3, 4],
  [5, 6, 7],
]);
log([...it]); // [1,2,3,4,5,6,7]
```

<br>

### ์ฆ์ํ๊ฐ, flatMap๊ตฌํ

```tsx
const flatMap = curry(pipe(L.map, flatten));

log(
  flatMap((a) => a, [
    [1, 2],
    [3, 4],
    [5, 6, 7],
  ]),
); // [1,2,3,4,5,6,7]
log(flatMap(L.range, [1, 2, 3])); // [0,0,1,0,1,2]

const it = L.flatMap(
  L.range,
  map((a) => a + 1, [1, 2, 3]),
);
log(it.next()); // {value:0, done: false}
log(it.next()); // {value:1, done: false}
log(it.next()); // {value:0, done: false}
log(it.next()); // {value:1, done: false}

log(
  take(
    3,
    L.flatMap(
      L.range,
      map((a) => a + 1, [1, 2, 3]),
    ),
  ),
); // [0,1,0]
```

<br>

### 2แแกแแฏแซ แแขแแงแฏ แแกแแฎแแต

```tsx
const arr = [
  [1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [9, 10],
];

go(
  arr,
  L.flatten,
  L.filter((a) => a % 2),
  L.map((a) => a * a),
  take(4),
  reduce(add),
  log,
);
```

<br>

### ์ดํฐ๋ฌ๋ธ แแฎแผแแตแท แแณแแฉแแณแแขแแตแผ แแตแฏแแฎแแฅแจแแตแซ แแฉแแณ

```tsx
const users = [
  {
    name: 'a',
    age: 21,
    family: [
      { name: 'a1', age: 53 },
      { name: 'a2', age: 47 },
      { name: 'a3', age: 16 },
      { name: 'a4', age: 15 },
    ],
  },
  {
    name: 'b',
    age: 24,
    family: [
      { name: 'b1', age: 58 },
      { name: 'b2', age: 51 },
      { name: 'b3', age: 19 },
      { name: 'b4', age: 22 },
    ],
  },
  {
    name: 'c',
    age: 31,
    family: [
      { name: 'c1', age: 64 },
      { name: 'c2', age: 62 },
    ],
  },
  {
    name: 'd',
    age: 20,
    family: [
      { name: 'd1', age: 42 },
      { name: 'd2', age: 42 },
      { name: 'd3', age: 11 },
      { name: 'd4', age: 7 },
    ],
  },
];

go(
  users,
  L.flatMap((u) => u.family),
  L.filter((u) => u.age > 20),
  L.map((u) => u.age),
  take(4),
  reduce(add),
  log,
);
```

<br>
<br>

## ๋๋์ 

๋ค์ ํจ์ํ ํ๋ก๊ทธ๋๋ฐ์ ๊ตฌํํด๋ณด๊ณ , ๋ ์ค๋ฌด์ ์ผ๋ก ์ฌ์ฉํ๋ ์ฐ์ต์ ํ์์ต๋๋ค.
๋ค์ ํ๋ฒ ๋๋ผ์ง๋ง ์ ๋ง ์ฝ๋ ๊ฐ๋์ฑ์ด ์ผ๋ฐ ํจ์ ์ฌ์ฉํ๋ ๊ฒ๋ณด๋ค ๋๋ค๋ ์ฌ์ค์ ๊นจ๋ฌ์์ต๋๋ค.
์ด๋ฒ ํ์ต์ ํตํด ์ค๋ฌด์ ์ฌ์ฉํ๋ ์ผ๋ฐ ํจ์๋ค์ ํจ์ํ ํจ์๋ก ๊ต์ฒดํ์ฌ ๊ฐ๋์ฑ๊ณผ ์ฑ๋ฅ์ ๋๋ ค์ผ๊ฒ ์ต๋๋ค.

<br>

### ์ฐธ๊ณ 

```js
์ ์ธ๋๋์ ํจ์ํ ํ๋ก๊ทธ๋๋ฐ๊ณผ JS ES6+ ๊ฐ์

```

```toc

```
