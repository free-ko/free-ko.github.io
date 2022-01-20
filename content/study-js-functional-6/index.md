---
emoji: 👨‍💻
title: 함수형 프로그래밍 - Reduce 함수
date: '2022-01-21 08:11:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

## 하나의 값으로 누적 하는 예시

```tsx
const nums = [1, 2, 3, 4, 5];

const total = 0;
for (const n of nums) {
  total = total + n;
}

console.log(total); // 15
```

<br>

## 기본 Reduce 사용 예시

```tsx
const add = (a, b) => a + b;

console.log(reduce(add, 0, [1, 2, 3, 4, 5])); // 15
```

- `reduce`는 재귀적으로 인자로 들어온 함수를, 계속 실행하면서 하나의 값으로 만들어야 함

```tsx
const add = (a, b) => a + b;

console.log(reduce(add, 0, [1, 2, 3, 4, 5])); // 15

add(add(add(add(add(0, 1), 2), 3), 4), 5);
```

<br>

## Reduce 함수 내부 구조

```tsx
const reduce = (f, acc, iter) => {
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
};
```

<br>

## 누적 값을 인자로 받지 않았을 경우

- JS에서는 위의 인자중 `acc` 값이 들어오지 않아도 값이 축적되도록 구현되어 있음

```tsx
console.log(reduce(add, [1, 2, 3, 4, 5]));

// JS가 밑에 처럼 acc 인자를 넣지 않으면 밑에 처럼 변환시킴
console.log(reduce(add, 1, [2, 3, 4, 5]));
```

- 누적하는 값이 `reduce` 함수 인자로 들어오지 않았을 경우
- 내부에서 `iterator`를 만들어서 배열의 첫 번째 값을 셋팅
- 단순히 `배열[0]`으로 접근하지 않고, 내부 원리로 초기값을 셋팅

```tsx
reduce(add, [1, 2, 3, 4, 5]);

// 위의 함수처럼 인자가 들어올 경우
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

## Reduce 사용 예시

```tsx
const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
];

reduce((total_price, product) => total_price + product.price, 0, products);
```

<br>
<br>

## 느낀점

Reduce함수 내부 구조 코드를 직접 구현하면서 Reduce 함수의 작동원리를 알게 되었음, 또한 Reduce함수를 통해 다양한 값을 추출할 수 있다고 생각함

<br>

### 참고

```js
유인동님의 함수형 프로그래밍과 JS ES6+ 강의

```

```toc

```
