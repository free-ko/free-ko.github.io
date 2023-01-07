---
emoji: 👨‍💻
title: 함수형 프로그래밍 - CallBack과 Promise 차이
date: '2022-02-10 12:18:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

# 🤫 callback과 Promise

## 목표

- `callback` 방식을 살펴봄
- `promise`는 `callback` 어떤점이 다른 것인지 살펴봄
- 함수형 프로그래밍과 연관되어서, `promise`가 어떤 가치를 가지고 어떻게 다른지, 어떻게 활용해야 하는지 살펴봄

<br>

## JS에서 비동기 동시정 프로그래밍을 하는 방법 2가지

1. 오랫동안 사용했던 `callback` 패턴
2. `promise`를 기반으로 한 `promise 메서드 체인`을 통해 함수를 합성하는 방법과 `async - await`와 함께 사용하는 방법

<br>

<br>

## CallBack

```tsx
function add10(a, callback) {
  setTimeout(() => callback(a + 10), 100);
}

add10(5, (res) => {
  log(res);
});
```

<br>

## Promise 적용

- Promise를 만들어서 return함
- `return`한다는 의미가 중요함

```tsx
function add20(a) {
  return new Promise((resolve) => setTimeout(() => resolve(a + 20), 100));
}

add20(5).then(log);
```

<br>

## CallBack과 Promise의 가독성 차이

- 함수를 연속적으로 실행시켰을 때 발생
- 특히, CallBack함수의 깊이가 계속 깊어지기도 하고, 코드 가독성면에서도 떨어짐

```tsx
// CallBack
add10(5, (res) => {
  add10(res, (res) => {
    add10(res, (res) => {
      // log(res);
    });
  });
});

// Promise
add20(5).then(add20).then(add20).log();
```

<br>

## 비동기를 값으로 만드는 Promise

- 일반적으로 CallBack함수와 Promise 함수의 차이가 코드 가독성 부분도 있지만,
- Promise가 CallBack과 다른 점은 일급으로 비동기 상황을 일급 값으로 다룬 다는 점이 가장 중요하게 다름
- Promise Class를 통해 만들어진 인스턴스를 반환함, 이 때의 값은 `대기, 성공, 실패`를 다루는 일급 값으로 이루어져 있음
- 특정한 값으로 리턴하는 것이 아닌, `대기 상태로 값을 리턴`하는 것이 CallBack과 다름
- 이점이 가장 중요함

<br>

## CallBack 함수 비동기 상황

- 콜백함수는 비동기적인 상황을 `코드`로만 표현됨

```tsx
// CallBack
add10(5, (res) => {
  add10(res, (res) => {
    add10(res, (res) => {
      // log(res);
    });
  });
});
```

<br>

## Promise 비동기 상황

- Promise는 비동기적인 상황을 `값`으로 만들어서 리턴하고 있다는 사실이 콜백 함수와 다르고 아주 중요함

```tsx
// Promise
add20(5).then(add20).then(add20).log();
```

<br>

## CallBack과 Promise 비동기 코드 차이

- 밑에 코드에서 변수 a,b 값이 다름
- b는 `Promise 인스턴스` 값으로 나오지만, a는 `undefined`가 나옴
- b는 계속적으로 비동기적인 상황을 `값`으로 갖으므로써(일급함수) 계속적인 작업을 할 수 있음

```tsx
function add10(a, callback) {
  setTimeout(() => callback(a + 10), 100);
}

const a = add10(5, (res) => {
  add10(res, (res) => {
    add10(res, (res) => {
      log(res);
    });
  });
});

console.log(a);

function add20(a) {
  return new Promise((resolve) => setTimeout(() => resolve(a + 20), 100));
}

const b = add20(5).then(add20).then(add20);

console.log(b);
```

<br>
<br>

## 느낀점

어렴풋이 알고 있었던 콜백함수와 Promise의 차이를 알게되는 좋은 시간이였다.
특히 막연하게 사용하고 있었던 Promise에 대한 개념을 확실히 알게되어서 실무에서 Promise를 사용할 때, 학습한 내용을 기반으로 사고하며 개발을 할 수 있어 좋았다.

<br>
<br>

## 참고

```js
유인동님의 함수형 프로그래밍과 JS ES6+ 강의

```

```toc

```
