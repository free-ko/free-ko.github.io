---
emoji: 👨‍💻
title: Unicode, ES5 호환성
date: '2021-09-18 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  Unicode, ES5 호환성
</h1>

<br>

## 1. Unicode

- 유니코드는 U+0031 형태
- 코드 포인트
  - `0031`이 코드 포인트
  - 문자 코드라고도 부름
  - 코드 포인트로 `문자/이모지` 등을 표현
  - 4자리 이상의 UTF-16진수 형태
- 110만개 정도 표현
  - U+0000 ~ U+10FFFF
- Plane(평면)
  - 코드 포인트 전체를 17개 plane으로 나눔
  - 하나의 plane은 65535(U+FFFF)개
- 첫 번째 Plane
  - BMP(Basic Multillingual Plane) 라고 부름
  - 일반적인 문자(연문자, 숫자)가 여기에 속함
  - 한글의 코드 포인트도 여기에 속함
- 첫 번째 Plane을 제외한 Plane
  - Supplementary Plane, Astral Plane이라고 부름
  - 5자리 이상의 코드 포인트를 표현할 수 있음
  - ES6+에서 지원
- 이스케이프 시퀀스(Escape Sequence)

  - 역슬래시와 16진수로 값을 작성
  - 이를 16진수 이스케이프 시퀀스라고 부름

  ```tsx
  const escape = '₩₩x31₩x32₩x33';

  console.log(escaep); // 123
  console.log('₩₩'); // \
  ```

- 유니코드 이스케이프 시퀀스

  - Unficode Escape Sequence
  - 이스케이프 시퀀스를 유니코드로 작성한 형태

  ```tsx
  const escape = '₩₩x31₩x32₩x33';
  console.log(escaep); // 123

  const unicode = '₩u0034₩u0035₩u0036';
  console.log(unicode); // 456
  ```

- UES 값 범위

  - UTF-16진수로 U+0000에서 U+FFFF까지 사용 가능

- ES5 문제
  - U+FFFF 보다 큰 코드 포인트는 어떻게 작성할 것인가?
- 유니코드 코드 포인트 이스케이프

  - 코드 포인트 값에 관계 없이 사용할 수 있는 형태 필요
  - `₩u{31}`, `₩u{1f418}` 형태

  ```tsx
  const unicode = '₩u0034₩u0035₩u0036';
  console.log(unicode); // 456

  const es6 = '₩u{34}₩u{35}₩u{36}';
  console.log(es6); // 456

  console.log('₩u{1f418}'); // 코끼리 이모지
  ```

  <br>

  ## 2. ES5 호환성

  - Surrogate Pair

    - `₩u{1f418}` 형탵를 ES5에서 사용 불가
    - ES5에서는 두 개의 유니코드 이스케이프 시퀀스 사용
    - 이를 `Surrogate pair`라고 함

    ```tsx
    const pair = '₩uD83D₩uDC18';

    console.log(pair); // 코끼리 이모지
    ```

  - 유니코드 사용의 참조 사항
    - 브라우저, 스마트폰에 따라 표시되는 문자 모습이 다름

```toc

```
