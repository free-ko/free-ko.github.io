---
emoji: 👨‍💻
title: has(), deleteProperty()
date: '2021-12-08 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 has(), deleteProperty()
</h1>

<br>

## 1. has()

- `target` 에 `key` 이 존재 여부를 반환함
- `Reflect.has(target, key)` 형태로 작성
  ```tsx
  const target = {
    point: 100,
  };

  console.log(Reflect.has(target, 'point')); // true

  // 1. Reflect.has(target, "point"), target 오브젝트에 "point"가 프로퍼티 키로 존재하면 true를 반환하고 존재하지 않으면 false를 반환
  ```
- 상속받은 `prototype, __proto__`도 검색
  ```tsx
  function target() {}

  console.log(Reflect.has(target, 'hasOwnProperty')); // true

  // 1. Reflect.has(target, "hasOwnProperty"); target 함수에 hasOwnProperty()를 작성하지 않지만 true가 반환됨
  // 2. target 함수 구조를 보면 target.prototype에 hasOwnProperty()가 없지만 target.prototype.__proto__에 있기 때문
  ```
- 핸들러의 `has()` 트랩 호출
  ```tsx
  const target = { point: 100 };

  const handler = {
    has(target, key) {
      return Reflect.has(target, key);
    },
  };

  const proxy = new Proxy(target, handler);

  console.log('point' in proxy); // true

  // 1. console.log("point" in proxy); has() 트랩이 호출됨
  // 2. 트랩: has(target, key){...}, target 오브젝트, "point"가 설정됨
  // 3. 트랩: return Reflect.has(target, key); return을 작성하지 않으면 target에 key가 존재하더라도 false가 반환됨
  ```

<br>

## 2. deleteProperty()

- `target` 에서 `key`를 삭제 함
- `Reflect.deleteProperty()` 형태
  ```tsx
  const target = { point: 100 };

  console.log(Reflect.deleteProperty(target, 'point')); // true
  console.log(Reflect.deleteProperty(target, 'point')); // true

  // 1. Reflect.deleteProperty(target, "point"); 삭제 처리를 성공하면 true를 반환하고 실패하면 flase를 반환함
  // 2. 두 번째의 Reflect.deleteProperty(target, "point"); 프로퍼티가 존재하지 않더라도 true를 반환함, 프로퍼티 삭제 여부가 아닌 삭제 처리 수행의 성공/실패가 기준임
  // 3. 이어서 false가 반환되는 경우를 살펴봄
  ```
- `false` 반환
  ```tsx
  const target = {};
  Object.definedProperty(target, "point", {
  	value: 100, configurable: false;
  });

  console.log(Reflect.deleteProperty(target, "point"));   // false

  // 1. (Reflect.deleteProperty(target, "point"), point가 {configurable: false}이므로 삭제 할 수 없기 때문에 false를 반환합니다.
  // 2. 이것이 삭제 처리 실패 입니다.
  ```
- 인덱스로 배열 엘리먼트 삭제
  ```tsx
  const target = [1, 2, 3, 4];
  Reflect.deleteProperty(target, 1);

  console.log(target); // [1, undefined, 3, 4]

  // 1. Reflect.deleteProperty(target, 1); target이 배열일 때 두 번째 파라미터 1은 배열의 인덱스 임
  // 2. 1번 인덱스 값인 2를 삭제하며 삭제한 인덱스의 엘리먼트에 undefined를 설정함, 3과 4를 앞으로 당기지 않음
  ```

```toc

```
