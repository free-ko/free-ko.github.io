---
emoji: 👨‍💻
title: Bit 연산자 - OR 연산자, AND 연산자, XOR 연산자
date: '2021-12-26 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  Bit 연산자 - OR 연산자, AND 연산자, XOR 연산자
</h1>

<br>

## 1. 바이너리 비트 연산자

- `Binary Bitwise Operator` 개요

  - 왼쪽과 오른쪽에 피 연산자가 있는 2항 연산자

    ```tsx
    console.log(2 | 5); // 7

    // 1. | 가 연산자이고 왼쪽과 오른쪽은 피연산자임
    ```

  - 왼쪽과 오른쪽 피연산자 값을 비트로 변환하여 연산함
  - 비트로 연산하므로 처리 속도가 빠름

<br>

## 2. 비트 OR연산자

- 연산자 기호 : `|`
- 피연산자 한쪽이라도 1이면 1로 처리

  ```tsx
  console.log(2 | 5);

  // 1. 양쪽 비트에서 하나라도 1이면 1이 됨
  // 2. (4 + 2 + 1)은 7임
  ```

<br>

## 3. 비트 AND 연산자

- 연산자 기호 : `&`
- 피연산자 한 쪽이라도 0이면 0이 되고 양쪽이 모두 1이면 1이 됨

  ```tsx
  console.log(3 & 5);

  // 1. 0번 비트만 1이 되며, 1이 출력됨
  ```

<br>

## 4. 비트 XOR 연산자

- 연산자 기호 : `^`
- 피연산자 양쪽 값이 같으면 0이 되고 하나만 1이면 1이 됨

  ```tsx
  console.log(3 ^ 5);

  // 1. 하나라도 1이면 1이 되므로
  // 2. (4+2)의 값은 6임
  ```

```toc

```
