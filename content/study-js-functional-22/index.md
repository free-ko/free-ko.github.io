---
emoji: 👨‍💻
title: 함수형 프로그래밍 - 객체를 이터러블 프로그래밍으로 다루기
date: '2022-03-19 15:41:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

# ✅ 목표

- 객체를 이터러블 프로그래밍으로 작업한다는 것은 어떤 의미 일까?

<br>

## 👋 L.values() 구현

### 기존 values()

- `Object.values`는 즉시 배열로 만들어 놓고 시작함

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

- 필요한 만큼만 배열로 만들어서, 추출해 사용(코드 평가를 지연)
- 즉, 밑에 `take`에서 2개만 꺼내기 때문에 `obj1`에서 2개만 배열로 만들어서 사용
- 또한, 객체 값이 많아 지거나, 로직이 복잡할 경우에는 밑에 코드가 위의 코드보다 유리함

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

## 👋 L.entries() 구현

- 지연적인 함수를 구현하게 되면, 어떤 값이 들어오던지 간에 이터러블 프로그래밍 가능

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

## 👋 L.keys() 구현

```tsx
L.keys = function* (obj) {
  for (const k in obj) {
    yield k;
  }
};

_.go(obj1, L.keys, _.each(console.log));
```

<br>

## 👋 어떠한 값이든 이터러블 프로그래밍으로 다루기

- 이터러블로 이터러블 프로그래밍 가능
- 객체를 제너레이터를 이용해, 이터레이터로 만들어서 이터러블 프로그래밍 가능
- 어떤 제너레이터든 이터레이터로 만들어서 이터러블 프로그래밍 가능

```tsx
const g1 = function* (stop) {
  let i = -1;
  while (++i < stop) {
    yield 10;
    if (false) yield 20 + 30;
    yield 30;
  }
};

// L.take로 어디까지 평가할 것인지 컨트롤 가능
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

## 👋 object 함수 만들기

- 다형성이 넓음

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

### reduce하나로 Object 함수 만들기

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

### 참고

- `Map` 을 통해 m을 만든후, `JSON.stringify()` 하게되면 값이 사라짐
- 예를 들어, `Map`을 통해 오브젝트로 서버에게 전달할려면, 오브젝트로 만들어야 함

```tsx
let m = new Map();
m.set('a', 10);
m.set('b', 20);
m.set('c', 30);

JSON.stringify(m); // "{}"
```

- 밑에 코드에서 `m` 이 이터러블을 지원하기 때문에, `object`함수에서는 `m`값이 사라지지 않음
- 왜냐하면, `m` 안에 있는 코드를 평가하면 밑에 처럼 배열 값이 존재함
- 또한, Map함수로 만들 경우 `values()`, `keys()` 함수를 지원함

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

## 👋 mapObject 함수 만들기

### 결과

```tsx
console.log(mapObject((a) => a + 10, { a: 1, b: 2, c: 3 }));

// 결과
// { a: 11, b: 12, c: 13 }
```

<br>

### 함수형적 사고

- 먼저 객체를 받아서, `entries` 함수 결과처럼 배열로 만들어서 이터러블로 다룸

```tsx
console.log(mapObject(a => a + 10, { a: 1, b: 2, c: 3 }));

[['a', 1], ['b', 2], ['c', 3]]

[['a', 11], ['b', 12], ['c', 13]]

{ a: 11 } ...

{ a: 11, b: 12, c: 13 }
```

<br>

### mapObject 함수

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

// 결과
// { a: 11, b: 12, c: 13 }
```

<br>

## 👋 pick 함수 만들기

### 결과

```tsx
const obj2 = { a: 1, b: 2, c: 3, d: 4, e: 5 };

console.log(pick(['b', 'c', 'z'], obj2));
// { b: 2, c: 3 }
```

<br>

### pick 함수

- 사용하는 쪽에 맞게 함수를 만드는 것이 좋음
- 즉, pick에 들어오는 인자를 순회하면서 해당 값을 추출

```tsx
// 파이프라인 표현
const pick = (ks, obj) =>
  _.go(
    ks,
    _.map((k) => [k, obj[k]]),
    object,
  );

// 다른 표현
const pick = (ks, obj) => object(_.map((k) => [k, obj[k]], ks));
```

<br>

### Undefined 제거

- 런타임 즉, 코드를 실행하는 과정에서 결과가 `undefined` 값이 나오지 않도록 해야 좋음
- 예를 들어 서버에 `const data = {a: 2, b: 3, c: undefined}` 값을 전달 할 때
- `JSON.stringify(data)` 처리 하게 되면 `“{a: 2, b: 3}"` 로 처리가 됨
- 즉, 서버에서 처리할 수도 없고 프론트에서도 값을 받을 수도 없음
- 단, 로직 상에서 `undefined`을 처리하는 것은 괜찮음

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

## 👋 indexBy 함수 만들기

### Find 함수를 통해 특정 값 추출

- `Find` 함수를 통해서 특정 값을 추출할려면, 모든 값을 순회해야 됨

```tsx
const users = [
  { id: 5, name: 'AA', age: 35 },
  { id: 10, name: 'BB', age: 26 },
  { id: 19, name: 'CC', age: 28 },
  { id: 23, name: 'CC', age: 34 },
  { id: 24, name: 'EE', age: 23 },
];

// 사용
_.find((u) => u.id == 19, users);
```

<br>

### indexBy 함수를 통해 특정값 추출

- 순회하지 않고, 바로 `index`로 값을 추출
- 즉, `find`보다 성능이 좋음

```tsx
const users = [
  { id: 5, name: 'AA', age: 35 },
  { id: 10, name: 'BB', age: 26 },
  { id: 19, name: 'CC', age: 28 },
  { id: 23, name: 'CC', age: 34 },
  { id: 24, name: 'EE', age: 23 }
];

// 무언가 새로운 이터레이터를 만들기 위해서는 reduce가 필요
_.indexBy = (f, iter) =>
  _.reduce((obj, a) => (obj[f(a)] = a, obj), {}, iter);

_.indexBy(u => u.id, users);

// 결과
{
	5: { id: 5, name: 'AA', age: 35 },
	10: { id: 10, name: 'BB', age: 26 },
	19: { id: 19, name: 'CC', age: 28 },
	23: { id: 23, name: 'CC', age: 34 },
	24: { id: 24, name: 'EE', age: 23 },
}
```

<br>

## 👋 indexBy 된 값을 filter 하기

- 기존 `indexBy` 결과는 이터러블이 아니기 때문에 순회가 되지 않아 필터처리가 힘듬

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

## 👍 느낀점

JS에서 제공하는 Object 내부 함수를 지연적인 함수형 프로그래밍으로 만드는 학습을 통해, 지연적 코드 평가에 대한 이해하는 시간을 가졌습니다.

<br>

## 참고

```js
유인동님의 함수형 프로그래밍과 JS ES6+ 강의

```

```toc

```
