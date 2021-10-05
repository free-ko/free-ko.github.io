---
emoji: 👨‍💻
title: keys(), values()
date: '2021-10-05 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  keys(), values()
</h1>

<br>

## 1. keys()

- `Array` 오브젝트를 `Array` 이터레이터 오브젝트로 생성, 반환
  - `entries()`와 같으며
  - `[key, value]` 형태에서 `value`는 반환하지 않고 `key`만 반환
- 배열 인덱스가 `key`가 됨

  ```tsx
  const iterator = ['A', 'B'].keys();
  console.og(iterator.next()); // {value: 0, done: false}
  console.og(iterator.next()); // {value: 1, done: false}
  console.og(iterator.next()); // {valude: undefined, done: true}

  // 1. 생성한 Array 이터레이터 오브젝트는 [key] 형태임
  // 2. value에 인덱스가 설정됨
  ```

  <br>

  ```tsx
  const iterator = ['A', 'B'].keys();

  for (const property of iterator) {
    console.log(property);
  }

  // 1. key만 설정되므로 값이 하나, 따라서 분할 할당을 하지 않아도 됨
  // 결과 : 0, 1
  ```

<br>

## 2. values()

- `Array` 오브젝트를 `Array` 이터레이터 오브젝트로 생성, 반환
- `[key, value]` 형태에서 `value`는 반환하고 `key` 반환하지 않음
- 배열의 엘리먼트 값이 `value`가 됨

  ```tsx
  const iterator = ['A', 'B'].values();
  console.og(iterator.next()); // {value: A, done: false}
  console.og(iterator.next()); // {value: B, done: false}
  console.og(iterator.next()); // {valude: undefined, done: true}

  // 1. 생성한 Array 이터레이터 오브젝트는 [value] 형태임

  const iterator = ['A', 'B'].values();

  for (const property of iterator) {
    console.log(property);
  }

  // 1. value만 설정되므로 값이 하나
  // 결과 : A, B
  ```

- `[Symbol.iterator]()` 사용

  ```tsx
  const check = Array.prototype.values === Array.prototype[Symbol.iterator];

  console.log(check); // true

  const iterator = ['A', 'B'][Symbol.iterator]();

  for (const property of iterator) {
    console.log(property); // A, B
  }

  // 1. Array.prototype.values()와 Array.prototype[Symbol.iterator]가 같음
  // 2. 따라서 values() 대신에 [Symbol.iterator]()를 사용해도 결과가 같음
  ```

- 값이 연동 됨

  ```tsx
  let list = ['A', 'B'];
  let iterator = list.values();

  list[0] = '연동';

  console.log(iterator.next()); // {value: 연동, done: false}
  console.log(iterator.next()); // {value: B, done: false}

  // Array 이터레이터 오브젝트에서 배열의 메모리 주소를 참조하므로 값이 연동 됨
  ```

```toc

```
