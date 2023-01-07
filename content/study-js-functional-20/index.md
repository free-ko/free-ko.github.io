---
emoji: 👨‍💻
title: 함수형 프로그래밍 - 명령형 코드 습관 지우기
date: '2022-03-12 13:54:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

# Reduce함수 제대로 사용하기

## 목표

- 명령형 코드에서 `Reduce`함수가 만능이라고 생각하고 작성하는 습관을 지우자!

<br>

## Map 함수로 Reduce 제대로 사용하기

### 명령화

- reduce 콜백함수로 들어오는 `total + u.age`는 너무 구체적인 값들이 들어옴
- 그래서 함수명을 짓기도 애매하고, 재사용 되기 어려움

```tsx
const users = [
  { name: 'AA', age: 35 },
  { name: 'BB', age: 26 },
  { name: 'CC', age: 28 },
  { name: 'CC', age: 34 },
  { name: 'EE', age: 23 },
];

console.log(_.reduce((total, u) => total + u.age, 0, users));
```

### 추상화

- `L.map` 을 통해 배열로 결과를 만들어서 `add` 의 인자에 들어오는 값들의 타입을 동일하게 만듬
- 즉, `reduce`에 복잡한 함수를 쓰는 것보다
- `map`을 사용해서 하나의 타입 코드를 사용해서 간결하고 재사용되기 쉬운 코드를 사용하는것이 함수형 프로그래밍에 적합함
- 또한, 함수 조합성 측면에서도 유리함

```tsx
const users = [
  { name: 'AA', age: 35 },
  { name: 'BB', age: 26 },
  { name: 'CC', age: 28 },
  { name: 'CC', age: 34 },
  { name: 'EE', age: 23 },
];

const add = (a, b) => a + b;
console.log(
  _.reduce(
    add,
    L.map((u) => u.age, users),
  ),
);

// 리팩토링
const ages = L.map((u) => u.age);
console.log(_.reduce(add, ages(users)));
```

<br>

## Map, Filter 함수로 Reduce 제대로 사용하기 1

### Reduce에서 모든 로직 사용

- 코드가 깔끔해 보이는 거지, 사실 로직 측면에서는 조심스러움
- 또한, 로직을 추가 할 때, 복잡함

```tsx
const users = [
  { name: 'AA', age: 35 },
  { name: 'BB', age: 26 },
  { name: 'CC', age: 28 },
  { name: 'CC', age: 34 },
  { name: 'EE', age: 23 },
];

console.log(_.reduce((total, u) => (u.age >= 30 ? total : total + u.age), 0, users));
```

### Map, Filter 함수 이용

- 간결한 함수를 통해 조합해 나아가는 성격
- 특정 로직이 추가되어도 복잡하지 않음

```tsx
const users = [
  { name: 'AA', age: 35 },
  { name: 'BB', age: 26 },
  { name: 'CC', age: 28 },
  { name: 'CC', age: 34 },
  { name: 'EE', age: 23 },
];

console.log(
  _.reduce(
    add,
    L.map(
      (u) => u.age,
      L.filter((u) => u.age < 30, users),
    ),
  ),
);

console.log(
  _.reduce(
    add,
    L.filter(
      (n) => n < 30,
      L.map((u) => u.age, users),
    ),
  ),
);
```

<br>

## Map, Filter 함수로 Reduce 제대로 사용하기 2

### 명령형 함수

- `a=1&&c=CC&d=DD` 결과 값 만들기

```tsx
const obj1 = {
  a: 1,
  b: undefined,
  c: 'CC',
  d: 'DD',
};

function query1(obj) {
  let res = '';
  for (const k in obj) {
    const v = obj[k];
    if (v === undefined) continue;
    if (res != '') res += '&';
    res += k + '=' + v;
  }
  return res;
}
```

- 그러나 `i` 값에 의존하면서 코드 작성하는 것은 복잡함

```tsx
const obj1 = {
  a: 1,
  b: undefined,
  c: 'CC',
  d: 'DD',
};

function query2(obj) {
  return Object.entries(obj).reduce((query, [k, v], i) => {
    if (v === undefined) return query;
    return `${query}${i > 0 ? '&' : ''}${k}=${v}`;
  }, '');
}
```

### 함수형

```tsx
const obj1 = {
  a: 1,
  b: undefined,
  c: 'CC',
  d: 'DD',
};

const query3 = (obj) =>
  _.reduce(
    (a, b) => `${a}&${b}`,
    _.map(
      ([k, v]) => `${k}=${v}`,
      _.reject(([_, v]) => v === undefined, Object.entries(obj)),
    ),
  );
```

### 함수형에서 커리 적용

```tsx
const join = _.curry((sep, iter) => _.reduce((a, b) => `${a}${sep}${b}`, iter));

const query3 = (obj) =>
  join(
    '&',
    _.map(
      ([k, v]) => `${k}=${v}`,
      _.reject(([_, v]) => v === undefined, Object.entries(obj)),
    ),
  );
```

### Go함수 적용

```tsx
const join = _.curry((sep, iter) => _.reduce((a, b) => `${a}${sep}${b}`, iter));

const query4 = (obj) =>
  _.go(
    obj,
    Object.entries,
    _.reject(([_, v]) => v === undefined),
    _.map(join('=')),
    join('&'),
  );
```

### Pipe함수 적용

```tsx
const join = _.curry((sep, iter) => _.reduce((a, b) => `${a}${sep}${b}`, iter));

const query4 = _.pipe(
  Object.entries,
  L.reject(([_, v]) => v === undefined),
  L.map(join('=')),
  join('&'),
);
```

### queryToObject

```tsx
const split = _.curry((sep, str) => str.split(sep));

const queryToObject = _.pipe(
  split('&'),
  L.map(split('=')),
  L.map(([k, v]) => ({ [k]: v })),
  _.reduce(Object.assign),
);

console.log(queryToObject('a=1&c=CC&d=DD')); // {a: "1", c: "CC", d: "DD"}
```

<br>
<br>

## 느낀점

이번 학습을 통해 실무에서 내가 작성한 코드들이 얼마나 안정성이 부족한지 알게 되었다.

단순히 작동이 되는 것이 중요한 것이 아님을 알게 되어서, 다음 부터 코딩할 때 오늘 학습한 코드의 안정성에 대해 생각하면서 코드를 작성해야 겠다.

<br>

## 참고

```js
유인동님의 함수형 프로그래밍과 JS ES6+ 강의

```

```toc

```
