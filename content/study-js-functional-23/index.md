---
emoji: ๐จโ๐ป
title: ํจ์ํ ํ๋ก๊ทธ๋๋ฐ - ์ฌ์ฉ์ ์ ์ ๊ฐ์ฒด๋ฅผ ์ดํฐ๋ฌ๋ธ ํ๋ก๊ทธ๋๋ฐ์ผ๋ก
date: '2022-03-19 15:54:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

# โ ๋ชฉํ

- ์ฌ์ฉ์ ์ ์ ๊ฐ์ฒด๋ฅผ ์ดํฐ๋ฌ๋ธ ํ๋ก๊ทธ๋๋ฐ ํ๋ ๊ฒ์ด ๋ฌด์ธ์ธ์ง ์์๋ณด์!

<br>

## ๐ Mapํจ์๋ฅผ ํตํด ์ดํฐ๋ฌ๋ธ ํ๋ก๊ทธ๋๋ฐ

### ๋ด์ฅ ๋ Map ํจ์

- ๋ฏธ๋ฆฌ ๋ด์ฅ๋ Mapํจ์๋ฅผ ํตํด ์ดํฐ๋ฌ๋ธ ํ๋ก๊ทธ๋๋ฐ ๊ฐ๋ฅ
- `entries(),` `keys()`, `values()` ์ฌ์ฉ ๊ฐ๋ฅ

```tsx
let m = new Map();

m.set('a', 1);
m.set('b', 2);
m.set('c', 3);

// MpaIterator
// {"a" => 1, "b" => 2, "c" => 3}
console.log(m[Symbol.iterator]());

console.log([...m.entries()]);
console.log([...m.keys()]);
console.log([...m.values()]);
```

<br>

### ์ดํฐ๋ฌ๋ธ ํ๋ก๊ทธ๋๋ฐ

```tsx
let m = new Map();

m.set('a', 1);
m.set('b', 2);
m.set('c', 3);

_.go(
  m,
  L.filter(([k, v]) => v % 2),
  _.each(console.log),
);
```

<br>

## ๐ Setํจ์๋ฅผ ํตํด ์ดํฐ๋ฌ๋ธ ํ๋ก๊ทธ๋๋ฐ

```tsx
let s = new Set();
s.add(10);
s.add(20);
s.add(30);

const add = (a, b) => a + b;

console.log(_.reduce(add, s));
```

<br>

## ๐ ํด๋์ค๋ฅผ ํตํด ์ดํฐ๋ฌ๋ธ ํ๋ก๊ทธ๋๋ฐ

### Model, Collection

```tsx
class Model {
  constructor(attrs = {}) {
    this._attrs = attrs;
  }

  get(k) {
    return this._attrs[k];
  }

  set(k, v) {
    this._attrs[k] = v;
    return this;
  }
}

class Collection {
  constructor(models = []) {
    this._models = models;
  }

  at(idx) {
    return this._models[idx];
  }

  add(model) {
    this._models.push(model);
    return this;
  }
}
```

<br>

### ์ฌ์ฉ

```tsx
const coll = new Collection();

coll.add(new Model({ id: 1, name: 'AA' }));
coll.add(new Model({ id: 3, name: 'BB' }));
coll.add(new Model({ id: 5, name: 'CC' }));

console.log(coll.at(2).get('name'));
console.log(coll.at(1).get('id'));
```

<br>

### Collection ์ ๋๋ ์ดํฐ ์ฌ์ฉ ์ 

```tsx
const coll = new Collection();

coll.add(new Model({ id: 1, name: 'AA' }));
coll.add(new Model({ id: 3, name: 'BB' }));
coll.add(new Model({ id: 5, name: 'CC' }));

_.go(
  L.range(3),
  L.map((i) => coll.at(i)),
  L.map((m) => m.get('name')),
  _.each(console.log),
);
```

<br>

### Collection ์ ๋๋ ์ดํฐ ์ ์ฉ

- Class์ ์ดํฐ๋ฌ๋ธ๋ก ์ํํ  ์ ์๋๋ก ์ ์ฉํจ

```tsx
// ์ ์ฉ1
class Collection {
	...
	*[Syombol.iterator]() {
		yield *this._models;
	}
}

// ์ ์ฉ2
class Collection {
	...
	*[Syombol.iterator]() {
		return this._models[Symbol.iterator]();
	}
}

// ์ ๋ค๋ ์ดํฐ ์ฌ์ฉ
_.go(
  coll,
  L.map(m => m.get('name')),
  _.each(console.log));

_.go(
  coll,
  _.each(m => m.set('name', m.get('name').toLowerCase())));
```

<br>

## ๐ Product, Products - ๋ฉ์๋๋ฅผ ํจ์ํ์ผ๋ก ๊ตฌํํ๊ธฐ

```tsx
class Model {
  constructor(attrs = {}) {
    this._attrs = attrs;
  }

  get(k) {
    return this._attrs[k];
  }

  set(k, v) {
    this._attrs[k] = v;
    return this;
  }
}

class Collection {
  constructor(models = []) {
    this._models = models;
  }

  at(idx) {
    return this._models[idx];
  }

  add(model) {
    this._models.push(model);
    return this;
  }
}

const add = (a, b) => a + b;
const addAll = _.reduce(add);

class Products extends Collection {
  getPrices() {
    return L.map((p) => p.get('price'), this);
  }

  totalPrice() {
    return addAll(this.getPrices());
  }
}

const products = new Products();
products.add(new Product({ id: 1, price: 10000 }));
console.log(products.totalPrice());

products.add(new Product({ id: 3, price: 25000 }));
console.log(products.totalPrice());

products.add(new Product({ id: 5, price: 35000 }));
console.log(products.totalPrice());
```

<br>
<br>

## ๐ ๋๋์ 

์ฌ์ฉ์ ์ ์๋ก ๊ฐ์ฒด๋ฅผ ๋ง๋ค์ด์ ์ดํฐ๋ฌ๋ธ ์ฆ, ํจ์ํ ํ๋ก๊ทธ๋๋ฐ์ ํ๋ ๋ฐฉ๋ฒ์ ํ์ตํ๊ฒ ๋์์ต๋๋ค.
์ด๋ฒ ๊ธฐํ์ ํ์ตํ ๋ด์ฉ์ ์๋ฌด์ ์ ์ฉํด ๋ด์ผ๊ฒ ์ต๋๋ค.

<br>

## ์ฐธ๊ณ 

```js
์ ์ธ๋๋์ ํจ์ํ ํ๋ก๊ทธ๋๋ฐ๊ณผ JS ES6+ ๊ฐ์

```

```toc

```
