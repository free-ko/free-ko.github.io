---
emoji: 👨‍💻
title: yield* 표현식
date: '2021-10-17 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  yield* 표현식
</h1>

## `yield*`

- `Syntax: yield*` 표현식
- `yield*` 의 표현식에 따라 처리하는 방법이 다름
- `yield*`의 표현식이 배열

  - `next()` 로 호출할 때마다 배열의 엘리먼트를 하나씩 처리

  ```tsx
  function* sports() {
    yield* [10, 20];
  }

  const obj = sports();

  console.log(obj.next());
  console.log(obj.next());

  // 1. 첫 번째의 obj.next()를 호출하면 yield* [10,20]에서 10을 반환함 {value: 10, done: false} 반환
  // 2. 두 번째의 obj.next()를 호출하면 yield* [10,20]에서 20을 반환함 {value: 20, done: false} 반환
  // 3. yield*의 표현식이 배열이면 next()를 호출할 때마다 배열의 엘리먼트를 순서대로 반환함
  ```

<br>

- `yield*`의 표현식이 제너레이터 함수

  - 함수의 `yield`를 먼저 처리

  ```tsx
  function* point(count) {
    yield count + 5;
    yield count + 10;
  }

  function* sports(value) {
    yield* point(value);
    yield value + 20;
  }

  const obj = sports(10);

  console.log(obj.next()); // {value: 15, done: false}
  console.log(obj.next()); // {value: 20, done: false}
  console.log(obj.next()); // {value: 30, done: false}

  // 1. 첫 번째의 obj.next()를 호출하면 yield* point(value)를 실행합니다.
  // 2. yield*의 표현식에 함수를 작성했으므로 point(value)를 호출함, point()가 제너레이터 함수이므로 우선, 제너레이터 오브젝트를 생성함
  // 3. next()로 호출해야 yield가 수행되지만 자동적으로 point() 첫 번째의 yield count+5를 수행함, {value: 15, done: false} 반환
  // 4. 다시 point()를 호출한 곳에서 반환 값을 받아 반환함
  // 5. 두 번째의 obje.next()를 호출함 point()의 yield count +10를 실행 함 {value: 20, done: false} 반환
  // 6. 세 번째의 obj.next()를 호출함 point()의 yield를 모두 처리 했으므로 sports()의 yield value +20을 실행하며 {value: 30, done: false} 반환
  ```

<br>

- `yield*` 표현식에서 자신 호출

  - 재귀 호출

  ```tsx
  function* sports(point) {
    yield point;
    yield* sports(point + 10);
  }

  const obj = sports(10);

  console.log(obj.next()); // {value: 10, done: false}
  console.log(obj.next()); // {value: 20, done: false}
  console.log(obj.next()); // {value: 30, done: false}

  // 1. 첫 번째의 obj.next()를 호출하면 yield point를 실행 {value: 10, done: false} 반환
  // 2. 두 번째의 obj.next()를 호출함, yield* sports(point + 10)에서 자신을 호출 함, 첫 번째 줄의 yield point를 실행 {value: 20, done: false} 반환
  // 3. 세 번째의 obj.next()를 호출함, yield* sports(point + 10)에서 자신을 호출 함, 첫 번째 줄의 yield point를 실행 {value: 30, done: false} 반환
  // 4. 주의 : yield point가 없으면 무한 반복 함
  ```

```toc

```
