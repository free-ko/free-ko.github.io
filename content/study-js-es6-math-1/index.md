---
emoji: 👨‍💻
title: Math 오브젝트
date: '2021-10-06 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  Math 오브젝트
</h1>

<br>

## 1. Math 오브젝트

- ES5까지는 수학 계산 처리에 부족했으나
  - ES6에서 수학 계산용 함수가 많이 추가됨
  - 특히, 머신러닝/딥러닝에 대응 할 수 있게 됨
- 일반적으로 수학 계산을 사용하지 않으므로 개요 중심으로 다룸

<br>

## 2. 정수, 제곱근, 사인

- `Math.trunc()`

  - 소수를 제외한 정수 반환

    ```tsx
    console.log(Math.trunc(12.56) Math.floor(12.56)) // 12, 12
    console.log(Math.trunc(-12.56) Math.ceil(12.56)) // -12, -12
    console.log(Math.trunc("45.67") Math.floor(true)) // 45, 1

    // 값이 양수이면 Math.floor()와 같고
    // 값이 음수이면 Math.ceil()과 같음
    // 우선, Number 타입으로 변환후 결과값으로 함수를 실행 함
    ```

- `Math.sign()`

  - 값의 보후에 해당하는 값

    ```tsx
    console.log(Math.sign(5), Math.sign(-5)); // 1, -1
    console.log(Math.sign(0), Math.sign('123')); // 0, 1

    // 값이 양수이면 1을, 아니면 -1을 반환
    // +0 또는 -0이면 0을 반환
    // Number 타입으로 변환하여 실행
    ```

- `Math.hypot()` : 제곱근

  - 각 파라미터 값을 제곱하여 합산하고
  - 합한 값의 제곱근을 반환

    ```tsx
    console.log(Math.hypot(3, 4)); // 5
    console.log(Math.hypot(-7)); // 7

    // 3의 제곱은 9이고, 4의 제곱은 16 (9+16) = 25
    // 25의 제곱근을 구하면 5
    // 파라미터가 하나일 때는 Math.abs()와 같음
    ```

- `Math.cbrt()` : 세제곱근

<br>

## 3. Hyperbolic(쌍곡)

- `Math.sinh()` : 쌍곡 사인
- `Math.asinh()` : 쌍곡 아크사인
- `Math.cosh()` : 쌍곡 코사인
- `Math.acosh()` : 쌍곡 아크코사인
- `Math.tanh()` : 쌍곡 탄젠트
- `Math.atanh()` : 쌍곡 아크탄젠트

<br>

## 4. 로그

- `Math.log2()` : 2를 밑으로 한 로그 값
- `Math.log10()` : 10를 밑으로 한 로그 값
- `Math.log1p()` : `Math.log(1 + 파라미터 값)`
- `Math.expm1()`
  - 자연 로그 상수(e)의 x승 -1
  - x는 파라미터 값, `(Math.exp(x) - 1)`과 같음

<br>

## 5. 32비트 계산

- Emscripten에 대처하기 위한 것
- C, C++를 JS로 컴파일 하기 위한 방법
- `Math.imul()`
  - 곱한 값을 32비트로 반환
- `Math.clz32()`
  - 32비트 값에서 비트 값이 0인 수
- `Math.fround()`
  - 32 비트 유동 소수 값으로 변환, 반올림

```toc

```
