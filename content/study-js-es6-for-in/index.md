---
emoji: 👨‍💻
title: for-of, for-in for-of 차이, for-of Object
date: '2021-09-12 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 for-of, for-in for-of 차이, for-of Object
</h1>

<br>

## 1. For-Of

- `Syntax: for (variable of iterable) { }`
- 이터러블 오브젝트를 반복

  ```tsx
  const list = [1, 2, 3];

  for (let k = 0; k < list.length; k++) {
    console.log(list[k]);
  }

  for (let value of list) {
    console.log(value);
  }
  ```

- Iterable

  - 이터러블 오브젝트를 작성
  - 표현식을 작성하면 평가 결과를 사용

- Variable

  - 변수 이름 작성
  - 이터러블 오브젝트를 반복할 때마다 Variable에 값이 할당됨

- 배열

  - 배열을 반복하면서 엘리먼트를 하나씩 전개

  ```tsx
  for (let value of [1, 2, 3]) {
    console.log(value);
  }
  ```

- String

  - 문자열을 반복하면서 문자를 하나씩 전개

  ```tsx
  for (let value of 'ABC') {
    console.log(value);
  }

  // A
  // B
  // C
  ```

- NodeList

  - NodeList를 반복하면서 엘리먼트를 하나씩 전개

  ```html
  <ul>
    <li class="show">첫 번째</li>
    <li class="show">두 번째</li>
    <li class="show">세 번째</li>
  </ul>
  ```

  ```tsx
  const nodes = document.querySelectorAll('.show');

  for (let node of nodes) {
    console.log(node.textContent);
  }

  // 첫 번째
  // 두 번째
  // 세 번째
  ```

<br>

## 2. For-in, For-of의 차이

- for-in

  - 열거 가능한 프로퍼티가 대상
  - `{key: value}` 형태는 디폴트가 `enumerable: true`
  - `Object.defineProperty()`는 디폴트가 `enumerable: false`

  ```tsx
  const obj = {};

  Object.definedProperties(obj, {
    sports: {
      enumerable: false,
      value: '스포츠',
    },

    book: {
      enumerable: true,
      value: '책',
    },
  });

  for (let item in obj) {
    console.log(item + ': ' + obj[item]);
  }

  // book: 책
  ```

- for-of
  - 이터러블 오브젝트가 대상
  - Object는 전개되지 않음
  - Property의 프로퍼티도 전개되지 않음

<br>

## 3. for-of, Object

- Object는 이터러블 오브젝트가 아니므로 for-of 사용 불가
- Object를 `for-of`로 전개할 수 있는 방법

  - `Object.keys()`로 프로퍼티 이름을 배열로 만들고
  - 만든 배열을 `for-of`로 전개

  ```tsx
  const sports = {
    soccer: '축구',
    baseball: '야구',
  };

  const keyList = Object.keys(sports);

  for (let key of keyList) {
    console.log(key + ': ' + sports[key]);
  }

  // soccer: 축구
  // baseball: 야구
  ```

```toc

```
