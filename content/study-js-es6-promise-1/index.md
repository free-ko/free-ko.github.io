---
emoji: 👨‍💻
title: Promise - 개요, 처리 흐름, 상태
date: '2021-12-15 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  Promise 개요, Promise 처리 흐름, Promise 상태
</h1>

<br>

## 1. Promise 개요

- JS는 기본적으로 `동기`로실행
  - 실행이 끝나야 다음 코드를 실행함
- `Promise` 는 비동기로 처리(실행)함
  - 코드를 연속으로 처리(실행)하지 않고, 중간에 흐름이 끊어졌다가 연결된 코드를 처리 할 수 있는 환경이 되었을 때 실행함
  - 이를 위한 메커니즘을 갖고 있음
- `DOM` 스펙에서 `JS` 스펙으로 전환

<br>

## 2. Promise 처리 흐름

- `Promise` 처리(실행) 흐름 개요

  ```tsx
  const obj = new Promise((resovle, reject) => {
    resolve();
    console.log('Promise');
  });

  obj.then(
    (value) => {
      console.log('성공');
    },
    (reson) => {
      console.log('실패');
    },
  );

  console.log('마지막');

  // Promise
  // 마지막
  // 성공
  ```

- `new Promise()` 를 실행함
  - 파라미터의 함수를 실행함
  - `resolve()` 를 호출 하지 않음
  - `console.log("Promise")` 를 실행
  - `obj` 변수에 `Promise` 인스턴스 할당
- `obj.then()`을 실행하지 않음
- 마지막 줄의 `console.log("마지막")` 실행함
- `resolve()` 실행
  - `then()` 의 첫 번째 파라미터 함수 실행
  - `console.log("성공")` 실행

<br>

## 3. Promise 상태

- 상태는 3가지이며, 하나만 발생함
  - `pending, settled(fulfilled, rejected)`
- `pending` 상태

  - `new Promise()` 로 인스턴스 생성

    ```tsx
    const obj = new Promise((resolve, reject) => {
      resolve();
      console.log('pending');
    });

    obj.then(
      (value) => {
        console.log('성공');
      },
      (reson) => {
        console.log('실패');
      },
    );

    console.log('마지막');

    // pending
    // 마지막
    // 성공
    ```

- `settled` 상태

  - `pending`이 종료된 상태를 나타내며 `fulfilled`와 `rejected` 상태로 구분
  - 바인딩한 핸들러 함수가 호출됨

    ```tsx
    const obj = new Promise((resolve, reject) => {
      resolve();
      console.log('pending');
    });

    obj.then(
      (value) => {
        console.log('성공');
      },
      (reson) => {
        console.log('실패');
      },
    );

    console.log('마지막');

    // pending
    // 마지막
    // 성공
    ```

- `fulfilled(성공)` : `then()` 의 첫 번째 함수 호출
- `rejected(실패)` : `then()` 의 두 번째 함수 호출

```toc

```
