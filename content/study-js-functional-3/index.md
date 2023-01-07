---
emoji: 👨‍💻
title: 함수형 프로그래밍 - 제너레이터
date: '2022-01-14 19:31:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

## 제너레이터

- Iterator이자 Iterable을 생성하는 함수
- Iterator를 return하는 함수

```tsx
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

let iter = gent();
console.log(iter[Symbol.iterator]); // [Symbol.iterator]()를 가지고 있음
console.log(iter[Symbol.iterator]() === iter); // true
console.log(iter.next()); // {value:1, done:false}
```

- 또한 Well-Formed-Iterator임(Iterator를 리턴하는데 그 것이 자기 자신과 동일)
- 그래서 순회 가능

```tsx
for (const a of gen()) console.log(a); // 1,2,3
```

- 순회를 할 때 문장으로 표현 가능

```tsx
function* gen() {
  yield 1;
  if (false) yield 2;
  yield 3;
}

let iter = gent();
for (const a of gen()) console.log(a); // 1,3
```

—> 이렇게되면 JS에서 제너레이터 내부 문장을 통해 순회할 수 있도록 만들 수 있음

—> 즉, 다양한 값들을 제너레이터를 통해서 순회할 수 있도록 할 수 있음

<br>

## 주의 사항

- 제너레이터에 return값을 명시할 수 있지만
- 순회할 때에는 나오지 않음

```tsx
function* gen() {
  yield 1;
  yield 2;
  yield 3;

  return 100;
}

for (const a of gen()) console.log(a); // 1,2,3
```

<br>

## 제너레이터를 통해 홀수만 순회하는 코드 작성

```tsx
function* infinity(i) {
  while (true) yield i++;
}

function* limit(l, iter) {
  for (const a of iter) {
    yield a;
    if (a == l) return;
  }
}

function* odds(l) {
  for (const a of limit(l, infinity(1))) {
    if (a % 2) yield a;
  }
}

for (const a of odds(40)) log(a);
```

<br>

## for...of, 전개 연산자, 구조 분해, 나머지 연산자

- Iterable, Iterator 프로토콜을 지키고 있는 것들을 통해 사용자 정의 이터레이터 활용

```tsx
log(...odds(10));
log([...odds(10), ...odds(20)]);

const [head, ...tail] = odds(5);
log(head);
log(tail);

const [a, b, ...rest] = odds(10);
log(a);
log(b);
log(rest);
```

<br>

## 느낀점

제너레이터를 통해 순회할 수 있도록 코드를 작성할 수 있더나느 사실과 일반적인 순회가 아닌 특정 조건을 부여해 순회가 가능하다는 사실이 재밋게 다가왔다. 이를 통해 조금 더 효율적으로 순회할 수 있다는 사실을 알게되어서 좋았다.

<br>

### 참고

```js
유인동님의 함수형 프로그래밍과 JS ES6+ 강의

```

```toc

```
