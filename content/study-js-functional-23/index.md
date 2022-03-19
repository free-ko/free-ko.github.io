---
emoji: 👨‍💻
title: 함수형 프로그래밍 - 사용자 정의 객체를 이터러블 프로그래밍으로
date: '2022-03-19 15:54:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

# ✅ 목표

- 사용자 정의 객체를 이터러블 프로그래밍 하는 것이 무언인지 알아보자!

<br>

## 👋 Map함수를 통해 이터러블 프로그래밍

### 내장 된 Map 함수

- 미리 내장된 Map함수를 통해 이터러블 프로그래밍 가능
- `entries(),` `keys()`, `values()` 사용 가능

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

### 이터러블 프로그래밍

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

## 👋 Set함수를 통해 이터러블 프로그래밍

```tsx
let s = new Set();
s.add(10);
s.add(20);
s.add(30);

const add = (a, b) => a + b;

console.log(_.reduce(add, s));
```

<br>

## 👋 클래스를 통해 이터러블 프로그래밍

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

### 사용

```tsx
const coll = new Collection();

coll.add(new Model({ id: 1, name: 'AA' }));
coll.add(new Model({ id: 3, name: 'BB' }));
coll.add(new Model({ id: 5, name: 'CC' }));

console.log(coll.at(2).get('name'));
console.log(coll.at(1).get('id'));
```

<br>

### Collection 제너레이터 사용 전

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

### Collection 제너레이터 적용

- Class에 이터러블로 순회할 수 있도록 적용함

```tsx
// 적용1
class Collection {
	...
	*[Syombol.iterator]() {
		yield *this._models;
	}
}

// 적용2
class Collection {
	...
	*[Syombol.iterator]() {
		return this._models[Symbol.iterator]();
	}
}

// 제네레이터 사용
_.go(
  coll,
  L.map(m => m.get('name')),
  _.each(console.log));

_.go(
  coll,
  _.each(m => m.set('name', m.get('name').toLowerCase())));
```

<br>

## 👋 Product, Products - 메서드를 함수형으로 구현하기

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

## 👍 느낀점

사용자 정의로 객체를 만들어서 이터러블 즉, 함수형 프로그래밍을 하는 방법을 학습하게 되었습니다.
이번 기회에 학습한 내용을 업무에 적용해 봐야겠습니다.

<br>

## 참고

```js
유인동님의 함수형 프로그래밍과 JS ES6+ 강의

```

```toc

```
