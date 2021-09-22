---
emoji: 👨‍💻
title: is() - JS 값 비교
date: '2021-09-22 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  is() - JS에서 값 비교 방법
</h1>

<br>

## is()

- 두 개의 파라미터 값과 값 타입을 비교

  - 같으면 `true`, 아니면 `false`

  ```tsx
  const result = Object.is(10, '10');
  console.log(result); // false

  const one = {},
    two = {};
  console.log(Object.is(one, two)); // false
  ```

<br>

- 오브젝트 비교 목적이 아님

  - `[ ]`와 `[ ]` 비교, `{ }`와 `{ }`비교는 `false`

- JS 값 비교 방법

  - 값과 타입까지 모두 비교: `===`
  - 타입은 비교하지 않고 값만 비교: `==`

  ```tsx
  console.log(undefined == null); // true
  console.log(undefined === null); // false
  console.log(Object.is(undefined, null)); // false
  ```

<br>

- `Object.is()`와 `===` 비교 차이

  - NaN 비교

  ```tsx
  console.log(NaN === NaN); // false
  console.log(Object.is(NaN, NaN)); // true;
  console.log(NaN === 0 / 0); // false;
  console.log(Object.is(NaN, 0 / 0)); // true
  ```

  - +0과 -0 비교

  ```tsx
  console.log(0 === -0); // true
  console.log(Object.is(0, -0)); // false
  ```

  - 활용한 형태

  ```tsx
  function check(data) {
    if (Object.is(typeof data, 'object')) {
      console.log(data);
    } else {
      console.log('object 타입이 아님');
    }
  }

  check({ value: 10 });
  check(200);
  ```

```toc

```
