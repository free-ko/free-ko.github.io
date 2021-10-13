---
emoji: 👨‍💻
title: yield 반복, 다수의 yield 처리
date: '2021-10-14 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  yield 반복, 다수의 yield 처리
</h1>

<br>

## 1. yield 반복

```tsx
let status = true;

function* sports() {
  let count = 0;
  while (status) {
    yield ++count;
  }
}

const obj = sports();

console.log(obj.next()); // {value: 1, done: false}
console.log(obj.next()); // {value: 2, done: false}

status = false;
console.log(obj.next()); // {value: undefined, done: true}
```

- `yield` 를 반복하는 형태 임
- `let status = ture;`
  - `while()` 문을 제어하기 위한 상태 값
- 첫 번 째 `next()` 호출
  - `let count = 0;` 을 실행하여 `count` 변수에 0을 설정 함
  - 누적 값을 구하기 위한 것
- `while(statu) { yield ++count; }`
  - `satus` 가 `true` 이므로 `yeild` 를 수행 함
  - `{ value: 1, done: false }` 반환
- 두 번째 `next()` 를 호출 함
  - `status` 가 `true`이므로 `yield`를 수행 함
- 세 번째 `next()` 를 호출 함
  - `status`가 `false`이므로 `yield ++count;` 를 수행하지 않음
  - `{ value: undefined, done: true }` 반환
  - `{ done: true }` 이므로 이터레이터를 더 이상 사용 할 수 없음

<br>

## 2. 다수의 yield 처리

```tsx
function* sports() {
  return yield yield yield;
}

const obj = sports();

console.log(obj.next()); // {value: undefined, done: false}
console.log(obj.next(10)); // {value: 10, done: false}
console.log(obj.next(20)); // {value: 20, done: false}
console.log(obj.next(30)); // {value: 30, done: true}
```

- 한 줄에 다수의 `yeild`와 `return` 작성
  - `return yield yield yield;`
- 첫 번째 `next()` 호출
  - 첫 번째 `yield`를 소행 함
  - `yield`에 반환 값이 없으므로 `{ value: undefined, done: false }` 반환
- 두 번째 `next(10)` 호출
  - 파라미터 값 : 10
  - 두 번째 `yield`를 수행 함
  - 함수에 파라미터 값을 받을 변수가 없으면 파라미터 넘겨준 값을 반환
  - `{ value: 10, done: false }`
- 세 번째 `next(20)` 호출
  - 파라미터 값 : 20
  - 세 번째 `yeild` 를 수행 함
  - 함수에 파라미터 값을 받을 변수가 없으므로 파라미터로 넘겨 준 값을 반환
  - `{ value: 20, done: false }` 반환
- 네 번째 `next(30)` 호출
  - 파라미터 값: 30
  - 처리할 `yield` 가 없으므로 `done: true` 반환
  - `return`문을 작성했으므로 파라미터로 넘겨 준 값을 반환 `{ value: 30, done: true }` 반환
- `return` 문을 작성하지 않으면
  - 30이 아닌 `undefined` 반환 `{value: undefined, done: true}`

```toc

```
