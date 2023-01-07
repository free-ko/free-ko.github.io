---
emoji: 👨‍💻
title: 함수형 프로그래밍 - Map, Filter, Reduce 중첩 사용
date: '2022-01-22 18:22:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

## Map, filter, Reduce 정리

```js
const map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
};

const filter = (f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
};

const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
};
```

<br>

## 함수형 프로그래밍 사고

- **products에서 가격이 20,000만원 미만인 가격을 합치고 싶다고 치면**
- `reduce`함수의 첫번 째 인자로 들어오는 `add`라는 함수를 통해, 두 번째 인자에 배열 안의 값들이 합산됨
- 즉, 밑에 코드를 보면, 두 번째 인자에 20,000원 미만의 값들이 배열로 들어와야 한다고 생각해야 함

```tsx
const products = [
  {name: '반팔티', price: 15000},
  {name: '긴팔티', price: 20000},
  {name: '핸드폰케이스', price: 15000},
  {name: '후드티', price: 30000},
  {name: '바지', price: 25000}
];

const add = (a, b) => a + b;

reduce(add, [a,b,c,d..])
```

- filter함수를 통해 20,000원 미만의 상품을 배열로 `return`하는 코드를 작성하면 됨

```tsx
reduce(
  add,
  filter((p) => p.price < 20000, products),
);

// filter(p => p.price < 20000, products) 결과가 밑에 배열
/* [
		{name: '반팔티', price: 15000},
	  {name: '핸드폰케이스', price: 15000},
		]
*/
```

<br>

## 정리

- 머리 속으로 미리 어떠한 결과가 올지 생각을 하고, 그 결과 값이 배열이라면 배열을 리턴하는 함수를 적절하게 사용해야 함
- 밑에서 위로 올라오면서 코드가 동작되기 때문에, 밑에서 위로 코드를 읽어야 함

```tsx
const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
];

const add = (a, b) => a + b;

reduce(
  add,
  map(
    (p) => p.price,
    filter((p) => p.price < 20000, products),
  ),
);

reduce(
  add,
  filter(
    (n) => n >= 20000,
    map((p) => p.price, products),
  ),
);
```

<br>
<br>

## 느낀점

함수형 프로그래밍적인 사고를 조금이나마 알게 되었다. 또한 이렇게 코드를 중첩으로 사용하면서도 가독성 좋게 코드를 짤 수 있음에 놀라웠다.
또한 API를 통해 얻어지는 특정 데이터를 모델링 하기 쉬울거라는 생각도 들었다.

<br>

### 참고

```js
유인동님의 함수형 프로그래밍과 JS ES6+ 강의

```

```toc

```
