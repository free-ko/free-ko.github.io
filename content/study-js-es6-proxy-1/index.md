---
emoji: 👨‍💻
title: Proxy, 기본 오퍼레이션 논리
date: '2021-11-24 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  Proxy, 기본 오퍼레이션 논리
</h1>

<br>

## 1.Proxy

- `Proxy`의 사전적 의미 : 대리, 대신
- `Proxy` : 기본 오퍼레이션을 중간에 가로채어 오퍼레이션을 대리, 대신하여 실행함
- 가로 채어 실행하더라도 전체 괘도를 벗어날 수 없으므로 오퍼레이션을 완전하게 바꿀 수는 없음
- 그럼 무엇을 대리하고 대신 할까?

<br>

## 2. 기본 오퍼레이션

- 커피를 주문하는 기본 오퍼레이션은 주문을 받는 카운터로 가서 커피를 주문함, 카운터가 커피를 내려 줌

- 이 모습을 `JS` 코드로 표현하면

  ```tsx
  const counter = {order: "커피};
  const 주문자 = counter.order;

  console.log(주문자);   // 커피

  // 1. order는 커피를 주문하는 것으로 프로퍼티 key에 해당함
  // 2. counter는 주물을 받는 카운터리며 {order: "커피"}를 갖고 있음, 즉 주문을 받을 수 있으며 커피를 갖고 있음
  // 3. 카운터에게 커피를 주문하면 주문자에게 "커피"를 내주게 됨
  // 4. JS로 counter.order를 실행하면 "커피"가 반환됨
  // 5. 함수를 호출하지 않고 프로퍼티로 값을 구했으며 이것은 getter임
  // 6. 즉, getter를 실행하면 값이 반환됨, 이것이 기본 오퍼레이션
  ```

- 여기서 중요한 것은
  - `counter.order` 가 `getter` 가 되는 논리 임
  - `getter`를 호출하면 `value` 가 반환되는 근거는 무엇이냐는 것임

<br>

## 3. 기본 오퍼레이션 논리

- `const counter = {order: "커피"}`
  - `counter.order` 를 실행하면 "커피"를 구하는 행위를 해야 함
  - 즉, 값을 구하는 메소드가 필요함
- 이때, 엔진은 `getter` 기능을 가진 내부 메소드 `[[Get]]` 을 호출함

  ```tsx
  const target = { order: '커피' };
  const value = target.order;

  console.log(value); // 커피

  // 1. getter를 스펙에서 [[Get]]으로 표기 함
  // 2. target.order를 실행하면 target 오브젝트의 __proto__에 있는 [[Get]]을 호출 함
  // 3. [[Get]]을 호출하면서 파라미터 값으로 "order"를 넘겨 줌
  // 4. [[Get]] 메소드가 order를 프로퍼티 키로 하여 프로퍼티 값을 구해 반환 함
  // 5. 이것이 기본 오퍼레이션 임
  ```

- ES6에 `[[Get]]` 처럼 기본 오퍼레이션을 제공하는 13개의 내부 메소드가 있음
- `ECMAScript` 스펙의 기본 오퍼레이션

```toc

```
