---
emoji: 👨‍💻
title: 함수형 프로그래밍 - Iterable 구현, Iterable/Iterator 프로토콜 정의
date: '2022-01-13 19:31:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

## Iterable 구현, Iterable/Iterator 프로토콜 정의

```tsx
const iterable = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      next() {
        return i == 0 ? { done: true } : { value: i--, done: false };
      },
    };
  },
};
```

<br>

## 적용

```tsx
const iterator = iterable[Symbol.iterator]();
console.log(iterator.next()); // {value: 3, done: false};
console.log(iterator.next()); // {value: 2, done: false};
console.log(iterator.next()); // {value: 1, done: false};
console.log(iterator.next()); // {done: true};

// iterable에 iterator가 구현되어 있기 때문에
// for..of문에 들어가 사용가능하며
// for..of문 안에서 [Symbol.iterator]() 메서드가 실행되며 객체가 리턴됨
// 위의 const iterator와 같음
// 그리고 내부적으로 next()를 실행하면서 a에 value 값을 넣음
for (const a of iterable) console.log(a); // 3,2,1
```

<br>

## Well-Formed Iterator

- 잘 구현된 `Iterator`는 `next()`메서드를 실행한 이후에 `for`문을 들어가면 그 이후에 값이 순회되어짐
- 그러나 위에서 구현한 `[Symbol.iterator]()`는 그렇지 못함

```tsx
const arr = [1, 2, 3];
const iterator = arr[Symbol.iterator]();

iterator.next();

for (const a of iterator) console.log(a); // 2, 3
```

- Iterator가 자기 자신을 반환하는 `[Symbol.iterator]()` 메서드를 가지고 있을 때 `well-formed Iterator`이라고 할 수 있음

```tsx
console.log(iterator[Symbol.iterator]() === iterator); // true
```

- 기존에 사용자 정의로 만든 Iterable에 코드 추가
- 어디에서든 `iterator`를 만들었을 때 이전까지 진행되었던 자신의 상태에서 `next()`메서드를 호출 했을 때 다음 값이 나올 수 있도록 가능함
- 즉 이것이 `well-formed Iterator`

```tsx
const iterable = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      next() {
        return i == 0 ? { done: true } : { value: i--, done: false };
      },
      // 자기 자신을 return 할 수 있도록 코드 추가
      // Iterator로 Iterable이 될 수 있도록 함
      [Symbol.iterator]() {
        return this;
      },
    };
  },
};

for (const a of iterator) console.log(a); // 3,2,1
for (const a of iterable) console.log(a); // 3,2,1
```

<br>

## 다른 곳에서도 Iterator, Iterable 프로토콜을 따르고 있음

```tsx
for (const a of document.querySelectorAll('*')) log(a);
const all = document.querySelectorAll('*');
let iter3 = all[Symbol.iterator]();

log(iter3.next()); // {value: html, done:false}
log(iter3.next()); // {value: head, done:false}
log(iter3.next()); // {value: script, done:false}
```

<br>

## 전개 연산자

- 전개 연산자도 Iterable, Iterator 프로토콜을 따르고 있음

```tsx
const a = [1, 2];

console.log([...a, ...[3, 4]]); // [1,2,3,4]

a[Symbol.iterator] = null;

console.log([...a, ...[3, 4]]); // a is not iterable
```

<br>

## 느낀점

이터러블이 무엇인지, 이터레이터가 왜 있어야 하는지 그리고 `for..of`문이 작동되는 원인 등 모르는 것 을 알게 되었다.
처음에는 익숙하지 어렵다고 느껴졌지만 천천히 공부를 하니 조금씩 이해가 가기 시작하였다.
JS 함수형 프로그래밍관련 강의들 2번째 듣는 거여서 그런지, 지금 배우는 이터러블에 대한 내용을 알아야 함수형 프로그래밍을 잘 할 수 있다는 사실을 다시 한번 느끼게 되었다.

<br>

### 참고

```js
유인동님의 함수형 프로그래밍과 JS ES6+ 강의

```

```toc

```
