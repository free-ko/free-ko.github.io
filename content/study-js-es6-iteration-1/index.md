---
emoji: 👨‍💻
title: 이터레이션
date: '2021-09-03 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 이터레이션, 이터레이션 프로토콜
</h1>

<br>

## 1. 이터레이션

- 이터레이션(Iteration)의 사전적 의미 : 반복

  - `for()`문의 반복 개념과 차이 있음

  ```tsx
  const list = [10, 20];

  for (let value of list) {
    console.log(value);
  }

  const obj = list[Symbol.iterator]();

  console.log(obj.next());
  console.log(obj.next());
  console.log(obj.next());

  // 10
  // 20
  // {value: 10, done: false}
  // {value: 20, done: false}
  // {value: undefined, done: true}
  ```

- 이터레이션을 위한 프로토콜(Protocol) 필요

  - 예: 통신 프로토콜(규약)
  - 데이터 송수신 프로토콜 정의
  - 어떻게 반복을 할 것인가에 대한 규약이 필요

- 즉, 이터레이션은 프로토콜을 갖고 있으며
  - 프로토콜에 따라 이터레이션 수행
  - 프로토콜이 구문과 빌트인이 아니므로 프로토콜에 맞으면 이터레이션 가능

<br>

## 2. 이터레이션 프로토콜

- 이터레이션 프로토콜(규약)은
- 오브젝트가 이터레이션 할 수 있는 구조이어야 하며

  - [10, 20]은 가능, 100은 불가능

  ```tsx
  const list = [10, 20];

  const obj = list[Symbol.iterator]();

  console.log(obj.next());
  console.log(obj.next());
  console.log(obj.next());

  // {value: 10, done: false}
  // {value: 20, done: false}
  // {value: undefined, done: true}
  ```

- 이터레이션 프로토콜 구분
  - 이터러블(iterable) 프로토콜 : 반복가능 한 것
  - 이터레이터(iterator) 프로토콜 : `obj.next()` 처럼 반복문을 실행시키는 것
    —> 이렇게 이터러블, 이터레이터를 규약하는 이유는? `확장성` 때문에
- 개발자 코드로 프로토콜을 맞추면 이터레이션 할 수 없는 오브젝트를 이터레이션 할 수 있도록 만들 수 있음

```toc

```
