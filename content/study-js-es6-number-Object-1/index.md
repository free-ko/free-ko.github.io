---
emoji: 👨‍💻
title: IEEE 754, 64비트 구성, 값을 구하는 방법, Number 상수
date: '2021-09-15 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  IEEE 754, 64비트 구성, 값을 구하는 방법, Number 상수
</h1>

<br>

## 1. IEEE 754

- IEEE (Institute of Electrical and Electronics Engineers)
  - JS는 IEEE 754에 정의된 64비트 부동 소수점으로 수를 처리
    - double-precision floating-point format numbers
    - 64비트로 최솟값과 최댓값을 처리
- 정수와 실수를 구분하지 않음
  - 1을 1.0으로 처리
  - 1과 1.2를 더할 수 있음

<br>

## 2. 64비트 구성

- 사인 비트
  - 63: 1비트
  - 값이 0이면 양수, 1이면 음수
- 지수
  - 52 ~ 62 : 11비트
- 가수
  - 0 ~51 : 52비트 + 1(사인 비트): 53비트

<br>

## 3. 값을 구하는 방법

- 비트 값은 `0` 아니면 `1`
- 2^x승 값을 더해 값을 구함
  - 0비트 부터 1, 1, 1이면
  - 1(2^0) + 2(2^1) + 4 = 7

<br>

## 4. Number 상수

- `safe integer`란 지수(e)를 사용하지 않고 나타낼 수 있는 값
  - 2의 64승이 아닌 2의 53승
- `Number.MAX_SAFE_INTEGER` : safe integer 최댓값

  ```tsx
  console.log(Number.MAX_SAFE_INTEGER);

  console.log(Math.pow(2, 53) - 1);

  // 값이 동일 함
  // 9007199254740991
  ```

- `Number.MIN_SAFE_INTEGER` : safe integer 최솟값

  ```tsx
  console.log(Number.MIN_SAFE_INTEGER);

  console.log(-Math.pow(2, 53) - 1);

  // 값이 동일 함
  // -9007199254740991
  ```

```toc

```
