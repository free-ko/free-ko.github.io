---
emoji: 👨‍💻
title: 진수, EPSILON
date: '2021-09-16 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  진수, EPSILON: Number.EPSILON, 진수
</h1>

<br>

## 1. Number.EPSLON

- `Number.EPSILON`
  - 아주 작은 값
  - 2.220446049250313080847263361816E-16
  - 또는 2^-52
- 사용 사례

  - 미세한 값 차이 형태

  ```tsx
  const total = 0.1 + 0.2;

  console.log(total); // 0.3000000000000000004
  console.log(total === 0.3); // false
  ```

  1. JS가 부동소수점 처리를 하기 때문(IEEE 74)
  2. 이처럼 미세한 값 차이로 일치하지 않을 때 `EPSILON`을 사용

  - 미세한 값 차이를 같은 값으로 간주

  ```tsx
  const value = Math.abs(0.1 + 0.2 - 0.3);

  console.log(value < Number.EPSILON); // true
  ```

  - 값 차이가 `Number.EPSILON`보다 작으면 `true`를 반환`

  - `0 / 0`으로 `NaN`가 되는 것을 방지

  ```tsx
  console.log(0 / 0); // NaN

  const value = 0 / (0 + Number.EPSILON);

  console.log(value);
  ```

  - `(0 + Number.EPSILON)` 처럼 작은 값을 더해 나누면 `0`이 됨

<br>

## 2. 진수

- Binary(2진수)

  - `0b0101`, `0B0101` 형태로 작성
  - 숫자 `0` 다음에 `b/B` 작성하고 이어서 `0` 또는 `1`로 값을 작성

  ```tsx
  const value = 0b111;

  console.log(value); // 7

  // 1 + 2 + 4
  ```

- Octal(8진수)

  - `0O0105` 형태로 작성
  - 숫자 `0` 다음에 영문 `o/O` 작성하고 이어서 `0~7`로 값을 작성
  - ES3는 첫 자리에 영문 `o/O` 작성

  ```tsx
  const value = 0o1111;

  console.log(value);

  // 1 + 8 + 64
  ```

```toc

```
