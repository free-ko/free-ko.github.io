---
emoji: 👨‍💻
title: Proxy 논리, Proxy 모습
date: '2021-11-25 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋   Proxy 논리, Proxy 모습
</h1>

<br>

## Proxy 논리

- 식당에서 3명이 식사 하고 있는 모습에서 왼쪽 사람이 오른쪽 사람 앞의 밥을 가져오려 함
  - 왼쪽 사람이 가운데 사람에게 밥을 달라고 말하고
  - 가운데 사람이 오른쪽 사람에게 말하면
  - 오른쪽 → 가운데 → 왼쪽 순서로 밥을 받을 수 있음
- 이 모습에서 가운데 사람이 `Proxy`
  - 왼쪽 사람의 말을 받아 오른쪽 사람에게 말하고
  - 오른쪽 사람에게 밥을 받아 왼쪽 사람에게 전달 함
- 이와 같이 `Proxy` 는 중간에서 대리 역할을 함
- 왼쪽 사람이 오른쪽 사람에게 직접 말하고 밥을 받으면 `Proxy` 가 필요하지 않음

- 가운데 사람을 거쳐서 받는 모습을 JS로 표현하면

  ```tsx
  const target = { food: '밥' };
  const middle = new Proxy(target, {});
  const left = middle.food;

  console.log(left); // 밥

  // 1. target은 오른쪽 사람이고 food는 프로퍼티 키이며, 밥은 프로퍼티 값임
  // 2. Proxy 인스턴스를 생성하여 middle에 할당 함, middle이 가운데 사람이며 target을 알 수 있음
  // 3. const left = middle.food 왼쪽 사람이 가운데 사람에게 밥을 달라는 것과 가운데 사람이 오른쪽 사람에게 밥을 달라고 하는 것임
  // 4. 할당 연산자(=)는 오른쪽 사람이 준 밥을 받아 왼쪽 사람에게 건네주는 것임
  // 5. lef는 왼쪽 사람임
  ```

  - `middle.food`가 실행되면 `Proxy`의 `getter`가 호출되며 `Proxy`에서 `target`의 `getter`를 호출하면서 `"food"`를 파라미터로 넘겨 줌
  - `new Proxy()` 파라미터에 `target` 을 작성하므로 `middle`에서 `target`을 알 수 있음

- `target`의 `[[Get]]` 이 `food` 값을 구해 `middle`로 반환하고 `middle`로 반환된 값을 `left`에 할당 함
- 이렇게 `Proxy` 가 가운데에서 대리 역할을 함

```toc

```
