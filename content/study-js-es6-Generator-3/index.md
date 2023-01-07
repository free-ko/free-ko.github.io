---
emoji: 👨‍💻
title: yield 키워드
date: '2021-10-12 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  yield 키워드
</h1>

<br>

## 1. Yield

- `Syntax: [returnValue] = yield [표현식];`

- `yield` 키워드 사용 형태

  ```tsx
  function* sports(one) {
    yield one + 10;
    yield;
    const value = yield one + 50;
  }

  const obj = sports(30);

  console.log(obj.next()); // {value: 40, done: false}
  console.log(obj.next()); // {value: undefined, done: false}
  console.log(obj.next()); // {value: 80, done: false}
  console.log(obj.next(200)); // {value: undefined, done: true}
  ```

  - `next()`로 호출할 때 마다 하나씩 실행

- `yield` 키워드는 제너레이터 함수 실행을 멈추거나 다시 실행할 때 사용

  - `yield` 오른쪽의 표현식을 평가하고 결과를 반환
  - 표현식을 작성하지 않으면 `undefined` 반환

- `[returnValue]` 오른쪽의 평가 결과가 설정되지 않고 다음 `next()` 에서 파라미터로 넘겨준 값이 설정됨

- `yield` 표현식을 평가하면 호출한 곳으로 `{value: 값, done: true/false}` 반환

  ```tsx
  function* sports(one) {
    yield one;
    const check = 20;
  }

  const obj = sports(10);
  console.log(obj.next()); // {value: 10, done: false}
  console.log(obj.next()); // {value: undefined, done: true}

  // 1. obj.next() 호출 yield one; 실행, {value: 10, done: false} 반환
  // 2. obj.next() 호출 check = 20;을 실행하지만, yield 처리가 아니므로 {value: undefined, done: false}반환
  // 3. 이 상태에서 계속 next()를 호출하면 {value: undefined, done: true} 반환
  // 4. 함수를 호출할 수 있지만 함수가 실행되지 않음
  ```

- `value` 값
  - `yield` 표현식의 평가 결과 설정
  - `yield`를 실행하지 못하면 `undefined`
- `done` 값
  - `yeild` 를 실행하면 `false`
  - `yeild` 를 실행하지 못하면 `true`

<br>

## 2. Yield 정리

```tsx
function* sports(one) {
  let two = yield one;
  let param = yield one + two;
  yield param + one;
}

const obj = sports(10);

console.log(obj.next()); // {value: 10, done: false}
console.log(obj.next()); // {value: NaN, done: false}
console.log(obj.next(20)); // {value: 30, done: false}
console.log(obj.next()); // {value: undefined, done: true}
```

1. `function* sports(one){}`
   - 제너레이터 함수를 선언
   - 3개의 `yield`를 작성함
2. `const obj = sports(10);`
   - 제너레이터 오브젝트를 생성함
   - 파라미터 값, 10이 `one`에 설정됨
3. 첫 번째의 `obj.next()` 를 호출 함
   - `let two = yield one`이 실행됨
   - `one`의 값인 10을 반환함
   - `two` 변수에 10을 할당하지 않음
4. 두 번째의 `obj.next()`를 호출 함
   - `next()` 에 파라미터 값을 작성하지 않았으므로 `two` 변수에 `undefined`가 설정됨
   - `let param = yield one + two` 를 실행
   - `two` 변수 값이 `undefined`이므로 `NaN`를 반환
5. 세 번째의 `obj.next(20)`를 호출 함
   - 파라미터 값 20이 바로 앞의 `param` 변수에 설정됨
   - `yield param + one` 을 실행함
   - 20 + 10을 반환 함
6. 네 번째의 `obj.next()` 를 호출 함
   - 실행할 `yield`가 없으므로 더 이상 처리하지 않으며
   - 끝이라는 것을 나타내는 `done: true`를 반환 함

```toc

```
