---
emoji: 👨‍💻
title: 함수형 프로그래밍 - Map함수
date: '2022-01-17 12:09:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

## Map함수의 구조

- 함수형 프로그래밍에서는 `인자`와 `return`값으로 소통하는 것을 권장
- `인자`는 보조 함수를 넣어서 사용
- `return` 값을 통해 다른 곳에서 사용

```tsx
const map = (fun, iter) => {
  const result = [];

  for (const a of iter) {
    // 수집할 값을 fun 함수를 통해 다양한 결과 값이 나올 수 있도록,
    // map함수 사용하는 사람에게 위임
    result.push(fun(a));
  }
};
```

<br>

### 이름만 추출

```tsx
const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
];
```

- Map 함수 사용X

```tsx
const names = [];

for (const p of products) {
  names.push(p.name);
}
```

- Map함수 사용O

```tsx
map(p => p.name, products));
```

<br>

### 가격만 추출

```tsx
const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
];
```

- Map 함수 사용X

```tsx
const prices = [];

for (const p of products) {
  prices.push(p.price);
}
```

- Map함수 사용O

```tsx
map(p => p.price, products));
```

<br>

## 느낀점

<br>

### 참고

```js
유인동님의 함수형 프로그래밍과 JS ES6+ 강의

```

```toc

```
