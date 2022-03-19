---
emoji: 👨‍💻
title: 함수형 프로그래밍 - 안전한 합성
date: '2022-03-19 15:32:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

# ✅ 목표

- 안전한 코드 합성이란 무엇인지 알아보자!

<br>

## 👋 map으로 안전하게 합성하기

### 안전하지 않은 합성 함수

- 정의한 함수를 합성하여 사용할 때, 밑에 코드에서 인자는 무조건 숫자가 들어와야 함
- 숫자가 아닌 값이 들어오면, 값이 안나옴
- 즉, 안전하지 않음

```tsx
const f = (x) => x + 10;
const g = (x) => x - 5;
const fg = (x) => f(g(x));

_.go(10, fg, console.log);

_.go([], fg, console.log); // NaN
```

<br>

### 안전한 합성 함수

- 그러나 `L.map`에 합성한 함수를 넣어주면, 합성 함수 인자에 숫자가 아닌 값이 들어와도 `NaN`이 나오지 않음

```tsx
const f = (x) => x + 10;
const g = (x) => x - 5;
const fg = (x) => f(g(x));

_.go([], L.map(fg), _.each(console.log));

_.go([10], L.map(fg), _.each(console.log));
```

<br>

## 👋 find 대신 L.filter 써보기

### find사용

- 문장식으로 복잡하게 표현
- 만약에 `user`안에 `name`이 `BB`가 없다면 밑에 코드 결과는 `undefined`를 던지게 됨

```tsx
const users = [
  { name: 'AA', age: 35 },
  { name: 'BB', age: 26 },
  { name: 'CC', age: 28 },
  { name: 'CC', age: 34 },
  { name: 'EE', age: 23 },
];

const user = _.find((u) => u.name == 'BB', users);

if (user) {
  console.log(user.age);
}
```

<br>

### L.filter 사용

- 한 표현식으로 간단하게 표현 가능
- 안전한 코드 작성 가능
- 함수 합성 순서 변경 가능
- 시간 복잡도 더 빠름

```tsx
const users = [
  { name: 'AA', age: 35 },
  { name: 'BB', age: 26 },
  { name: 'CC', age: 28 },
  { name: 'CC', age: 34 },
  { name: 'EE', age: 23 },
];

_.each(
  console.log,
  L.take(
    1,
    L.filter((u) => (u.name = 'BB'), users),
  ),
);

_.go(
  users,
  L.filter((u) => u.name == 'AA'),
  L.map((u) => u.age),
  L.take(1),
  _.each(console.log),
);
```

<br>
<br>

## 👍 느낀점

나도 업무를 하면서 특정 함수를 작성할 때, 하나의 상황만 고려해 함수를 작성하는 경우가 많았다.

이번 학습을 통해, 내가 지금까지 작업한 것들이 얼마나 위험한지 알게 되었으며, 추상화 즉 코드의 안정성에 대해 깊게 생각해 보는 시간이였다.

<br>

## 참고

```js
유인동님의 함수형 프로그래밍과 JS ES6+ 강의

```

```toc

```
