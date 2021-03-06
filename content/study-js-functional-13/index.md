---
emoji: ๐จโ๐ป
title: ํจ์ํ ํ๋ก๊ทธ๋๋ฐ - ์ง์ฐ์ฑ(take,find)
date: '2022-02-06 14:23:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

# queryStr แแกแทแแฎ แแกแซแแณแฏแแต

- ๊ฐ์ฒด๋ฅผ Query String์ผ๋ก ๋ง๋๋ ํจ์

```tsx
const queyrStr = obj => go(
	obj,
	Object.entries  // [["limit", 0],["offset", 10], ["type", "notice"]]
	map(([k, v]) => `${k}=${v}`)  // ["limit=10", "offset=10", "type=notice"]
	reduce((a, b) => `${a}&${b}`) // limit=10&offset=10&type=notice
);

log(queryStr({limit: 10, offset: 10, type: 'notice'}));
```

<br>

### pipeํจ์ ์ ์ฉ

```tsx
const queyrStr = obj => pipe(
	Object.entries
	map(([k, v]) => `${k}=${v}`)
	reduce((a, b) => `${a}&${b})
);
```

<br>

### ์ง์ฐ์ฑ ํจ์ ์ ์ฉ

- `Array.prototype.join` แแฉแแก `แแกแแงแผแแฅแผ`แแต แแฉแแแณแซ `join` แแกแทแแฎ
- ๋ฐ์ `join` ํจ์๋ ๋ฐฐ์ด์ด ์๋ ๊ณณ์์๋ ์ฌ์ฉ ๊ฐ๋ฅ

```tsx
const join = curry((sep = ',', iter) =>
  reduce((a, b) => `${a}${sep}${b}`, iter));

const queyrStr = obj => pipe(
	Object.entries
	map(([k, v]) => `${k}=${v}`)
	join('&')
);

// limit=10&offset=10&type=notice
log(queryStr({limit: 10, offset: 10, type: 'notice'}));

function *a() {
 yield 10;
 yield 11;
 yield 12;
 yield 13;
}

log(join(' - ', a()));  // 10 - 11 - 12 -13
```

- ์ง์ฐ์ฑ ํจ์ ์ ์ฉ

```tsx
L.entries = function* (obj) {
  for (const k in obj) yield [k, obj[k]];
};

const queryStr = pipe(
  L.entries,
  L.map(([k, v]) => `${k}=${v}`),
  join('&'),
);

log(queryStr({ limit: 10, offset: 10, type: 'notice' }));
```

<br>

# find

- `take` ํจ์๋ฅผ ํตํด ๊ฒฐ๊ณผ๋ฅผ ๋ง๋ค์ด ๋ด๋ ํจ์
- ํน์  ์กฐ๊ฑด์ ๋ง์กฑํ๋ ๊ฐ ์ค ์ฒซ ๋ฒ์งธ ๊ฐ๋ง ๊บผ๋ด๋ ํจ์

```tsx
const users = [
  { age: 32 },
  { age: 31 },
  { age: 37 },
  { age: 28 },
  { age: 25 },
  { age: 32 },
  { age: 31 },
  { age: 37 },
];

const fine = (f, iter) => go(iter, filter(f), take(1), ([a]) => a);

// {age: 28}
console.log(find((u) => u.age < 30, users));
```

<br>

### findํจ์ ์์ฌ์ด์ 

- filterํจ์ ์ฝ๋ ์คํ์ users์ ์๋ ๊ฐ๋ค์ ๋ค ์ํํ๊ฒ ๋จ
- ๊ทธ๋์ `L.filter`๋ฅผ ํธ์ถํ์ฌ, `L.filter` ๋ด๋ถ ์กฐ๊ฑด์ ๋ง์กฑํ๋ `users` ๊ฐ์
- `take`ํจ์๋ฅผ ํตํด ์ถ์ถํ๋๋ก ๋ณ๊ฒฝ

```tsx
const users = [
  { age: 32 },
  { age: 31 },
  { age: 37 },
  { age: 28 },
  { age: 25 },
  { age: 32 },
  { age: 31 },
  { age: 37 },
];

const fine = curry((f, iter) => go(iter, L.filter(f), take(1), ([a]) => a));

// {age: 28}
console.log(find((u) => u.age < 30)(users));

// 28
go(
  users,
  L.map((u) => u.age),
  find((n) => n < 30),
  log,
);
```

<br>

# L.map์ ํตํด ๊ธฐ์กด์ mapํจ์ ๊ฐ๊ฒฐํ๊ฒ ๋ง๋ค๊ธฐ

- ์ด ๋, `take` ํจ์ ์ฌ์ฉ

```tsx
const L = {};

const curry = (f) => (a, ..._) => (_.length ? f(a, ..._) : (..._) => f(a, ..._));

const go = (...args) => reduce((a, f) => f(a), args);

const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

L.map = curry(function* (f, iter) {
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    yield f(a);
  }
});

const map = curry((f, iter) => go(iter, L.map(f), take(Infinity)));

// [10,11,12,13]
console.log(map((a) => a + 10, L.range(4)));
```

<br>

### pipeํจ์ ์ ์ฉ

```tsx
const map = curry(pipe(L.map, take(Infinity)));

// [10, 11, 12, 13]
console.log(map((a) => a + 10, L.range(4)));
```

<br>

# L.filter์ ํตํด ๊ธฐ์กด์ filterํจ์ ๊ฐ๊ฒฐํ๊ฒ ๋ง๋ค๊ธฐ

- ์ด ๋, `take` ํจ์ ์ฌ์ฉ

```tsx
const L = {};

const curry = f =>
  (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

const go = (...args) => reduce((a, f) => f(a), args);

const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

L.filter = curry(function *(f, iter) {
	iter = iter[Symbol.iterator]();
	let cur;
	while(!(cur = iter.next()).done) {
		const a = cur.value;
		if(f(a)) {
			yield a;
		}
	}
}

const filter = curry(pipe(
	L.filter,
	take(Infinity)
));

// [1, 3]
console.log(filter(a => a % 2, range(4)));
```

<br>

# L.map, L.filter์ For๋ฌธ ์ ์ฉ

```tsx
L.map = curry(function *(f, iter) {
	for(const a of iter) {
		yield f(a);
	}
};

L.filter = curry(function *(f, iter) {
	for(const a of iter) {
		if(f(a)) {
			yield a;
		}
	}
}
```

<br>
<br>

## ๋๋์ 

๊ธฐ์กด์ ์ฌ์ฉํ๋ ํจ์๋ค์ ์ง์ฐ์ ์ผ๋ก ๊ตฌํํ๋ ํ์ต์ ํตํด, ํจ์์ ํ์ฅ์ ๊ฒฝํํ๋ ์๊ฐ์ ๊ฐ์ก์ต๋๋ค.
๋ํ ์ํ๋ ๊ฐ์ ์ถ์ถํ๊ธฐ์ํด ์ง์ฐ์ ์ผ๋ก ๊ตฌํํ ํจ์๋ฅผ ์ฌ์ฉํ๋ ๊ฒ์ด ์ฑ๋ฅ์ ์ผ๋ก ํจ์จ์ ์ด๋ผ๋ ๊ฒ์ ์๊ฒ๋์์ต๋๋ค.

<br>

### ์ฐธ๊ณ 

```js
์ ์ธ๋๋์ ํจ์ํ ํ๋ก๊ทธ๋๋ฐ๊ณผ JS ES6+ ๊ฐ์

```

```toc

```
