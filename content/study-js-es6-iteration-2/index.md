---
emoji: 👨‍💻
title: 이터러블 오브젝트, 프로토콜
date: '2021-09-04 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 이터러블 오브젝트, 이터러블 프로토콜
</h1>

<br>

## 1. 이터러블 오브젝트

### 1). 이러터블 오브젝트 개념

- 이터러블 프로토콜을 갖고 있는 오브젝트
- 스펙에서는 `@@iterator()`로 표기
- 반복 구조, `Symbol.iterator()`

  ```tsx
  const list = [10, 20];

  console.log(list[Symbol.iterator]); // function values() { [native code] }

  const obj = { one: 10, two: 20 };

  console.log(obj[Symbol.iterator]); // undefined
  ```

  1. `[ ]` 리터럴로 생성한 `list`에 `Symbol.iterator`가 있으므로 `Array`는 이터러블 오브젝트 임
  2. `{ }` 리터럴로 생성한 `obj`에 `Symbol.iterator`가 없으므로 `Object`는 이터러블 오브젝트가 아님
  3. `for` 문의 반복과 이터레이션이 차이가 있듯이, `for - in`의 열거와 이터레이션은 차이가 있음

<br>

### 2). 이터러블 오브젝트 구조

```tsx
'use strict';

const list = ['A', 'B'];

/*
  1. 오른쪽 list를 펼치면 __proto__가 있으며 __proto__를 펼치면 Array 오브젝트의 메소드가 표시됨

  2. 아래로 내려가면 Symbol(Symbol.iterator)가 있음, 따라서 Array 오브젝트는 이터러블 오브젝트 임

  3. 또한 Symbol(Symbol.iterator)를 펼치면 __proto__에 Function 오브젝트 메소드가 연결되어 있음
    - 즉, Symbol.iterator는 함수 임

  4. Symbol.iterator가 함수 이므로 호출 할 수 있음
*/
```

<br>

### 3). 자체 오브젝트에는 없지만

- 이터러블 오브젝트를 상속받아도 됨
- 즉, `prototype chain(__proto__)`에 있으면 됨
- 예를 들어, `Array` 오브젝트를 상속 받으면 이터러블 오브젝트가 됨

<br>

## 2. 이터러블 프로토콜

### 1). 이터러블 프로토콜 개념

- 오브젝트가 반복할 수 있는 구조이어야 함
- `Symbol.iterator`를 갖고 있어야 함

```tsx
const list = [10, 20];

console.log(list[Symbol.iterator]);

// function values() { [native code] }
```

<br>

### 2). 아래 빌트인 오브젝트는

- 디폴트로 이터러블 프로토콜을 갖고 있음
- 즉 `Symbol.iterator`를 갖고 있음 -`Array`, `Argument`, `String`, `TypedArray`, `Map`, `Set`, `DOM NodeList`

```toc

```
