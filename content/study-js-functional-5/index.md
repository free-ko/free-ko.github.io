---
emoji: 👨‍💻
title: 함수형 프로그래밍 - Filter함수
date: '2022-01-20 08:31:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

## 명령형 코드의 Filter 함수

```tsx
const under20000 = [];

for (const p of products) {
  if (p.pirce < 20000) {
    under20000.push(p);
  }
}
```

<br>

## filter 함수

- 이터러블을 받아서(순회를 하면서)
- 특정 함수를 인자로 받아, 함수 조건에 맞는 대상만 filter처리 후 return 진행

```tsx
const filter = (f, iter) => {
  const res = [];

  for (const a of iter) {
    if (f(a)) {
      res.push(a);
    }
  }
};
```

<br>

## filter 함수 사용

```tsx
const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
];

log(...filter((p) => p.price < 20000, products));
/*
	{name: '반팔티', price: 15000},
	{name: '핸드폰케이스', price: 15000}
*/
```

- 내부(밑에 배열)에 있는 다형성은 인자로 들어오는 보조함수로 지원을 받고
- 외부의 경우 이터러블 프로토콜을 따르는 것으로 다형성을 지원 받을 수 있음
- 그래서 filter역시도, 많은 다형성을 갖을 수 있음

```tsx
console.log(filter((n) => n % 2, [1, 2, 3, 4]));
// [1,3]

log(
  filter(
    (n) => n % 2,
    (function* () {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
    })(),
  ),
);

// [1,3,5]
```

<br>
<br>

## 느낀점

Filter 함수 내부 구조를 알게 되었고 이터러블 프로토콜을 따르는 함수를 순회를 통해, Filter함수 적용해서 다양한 로직을 만들 수 있을 거라는 생각이 들었다.

<br>

### 참고

```js
유인동님의 함수형 프로그래밍과 JS ES6+ 강의

```

```toc

```
