---
emoji: 👨‍💻
title: Number 함수
date: '2021-09-17 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  Number 함수: isNaN(), isInteger(), isSafeInteger(), isFinite()
</h1>

<br>

## 1. isNaN()

- `NaN` 값의 여부를 체크

  - `NaN` 값이면 `true`, 아니면 `false` 반환

  ```tsx
  console.log(Number.isNaN('ABC'), isNaN('DEF')); // false, true
  console.log(Number.isNaN(NaN), isNaN(NaN)); // true, true,
  console.log(Number.isNaN(0 / 0), isNaN(0 / 0)); //  true, true,
  console.log(Number.isNaN('100'), isNaN('200')); // false, false,
  ```

  1. 글로벌 오브젝트의 `isNaN("DEF")` 값 타입이 `Number`가 아닌 것을 체크 함, `DEF`가 `String` 타입이므로 `true` 반환
  2. `NaN`와 `0 / 0` 은 값이 `NaN`이므로 `true`가 됨
  3. `Number.isNaN("ABC")` 값이 `NaN`가 아니므로 `false`가 됨
  4. 글로벌 오브젝트의 `isNaN("200")` 값을 숫자로 변환하고 그 결과로 비교 함, 변환한 값 `200`이 `Number` 이므로 `false` 반환

- NaN 체크 방법
  - `NaN === NaN` 결과가 `false`이므로 사용 불가
  - `isNaN()`, 글로벌 오브젝트
  - `Number.isNaN()`
  - `Object.is(NaN, NaN)` : `true`

<br>

## 2. isInteger()

- 파라미터 값이 `정수`이면 `true`, 아니면 `false` 반환
- 정수로 인식

  ```tsx
  console.log(Number.isInteger(0)); // true
  console.log(Number.isInteger(1.0)); // true
  console.log(Number.isInteger(1.01)); // false
  ```

- 정수가 아닌 것으로 인식

  ```tsx
  console.log(Number.isInteger('12')); // false
  console.log(Number.isInteger(true)); // false
  ```

  1. 값을 `Number`로 변환하여 체크하지 않음
  2. `Numbe`r로 변환하면, `"12"`와 `true`가 `Number`이므로 정수로 인식됨

<br>

## 3. isSafeInteger()

- 파라미터 값이 `sfae 정수`이면 `true` 아니면 `false` 반환
- `-(2의 53승 - 1)` ~ `+(2의 53승 -1)` : `true` 아니면 `false`

```tsx
const isSafe = Number.isSafeInteger;

console.log(isSafe(7.0)); // true
console.log(isSafe(Number.MAX_SAFE_INTEGER)); // true
console.log(isSafe(Number.MIN_SAFE_INTEGER)); // true

// 7.0은 정수이며, 값 범위에 속하므로 true
```

```tsx
const isSafe = Number.isSafeInteger;

console.log(isSafe(7.1)); // false
console.log(isSafe('100')); // false
console.log(isSafe(NaN)); // false
console.log(isSafe(Infinity)); // false

// 7.1은 정수가 아님
// 값을 Number로 반환하여 체크하지 않음
// Number로 변환하면, "100"이 Number이므로 정수로 인식
```

<br>

## 4. isFinite()

- 파라미터 값이 유한 값이면 `true` 아니면 `false`
- 글로벌 오브젝트의 `isFinite()`와 체크 결과가 다름

  ```tsx
  const num = Number.isFinite,
    global = isFinite;

  console.log(num(100), global(200)); // true, true
  console.log(num('70'), global('80')); // false, true
  console.log(num(true), global(true)); // false, true

  console.log(num(NaN), global(NaN)); // false, false
  console.log(num(undefined), global(undefined)); // false, false
  ```

- 함수는 오브젝트에 속해야 하므로 `Number`와 관련된 것은 `Number` 오브젝트의 함수 사용, 글로벌 오브젝트의 함수는 글로벌 사용이 목적

```toc

```
