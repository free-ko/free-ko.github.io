---
emoji: 👨‍💻
title: primitive 값, wrapper 오브젝트
date: '2021-10-18 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  primitive 값, wrapper 오브젝트
</h1>

## 1. Primitive 값

- JS에서 `Primitive` 값은 오브젝트가 아니라 값이며 함수를 갖고 있지 않음
- `const num = 100;` 을 할당하면
  - `num` 변수에 100만 할당되며 아무것도 첨부되지 않음
  - 100이 `primitive` 값
- ES5의 `primitive` 값 타입
  - `string`, `number`, `boolean`, `null`, `undefined`
- ES6에서 `symbol` 타입추가

<br>

## 2. Wrapper 오브젝트

- `wrapper` 오브젝트는?
  - 프리미티브 값이 포함된 오브젝트
  - `wrapper` 오브젝트에는 메소드가 있음
- `wrapper` 오브젝트가 있는 프리미티브 값 타입
  - stiring : String, number : Number 오브젝트
  - boolean : Boolean, symbol : Symbol 오브젝트
- `const obj = new String(100);`

  - obj 인스턴스의 `[[PrimitiveValue]]` 에 100이 설정됨
  - `[[PrimitiveValue]]` 형태

  ```tsx
  const sports = new String(100);

  /*
  	1. 오른쪽의 sports를 펼치면

  	2. [[PrimitiveValue]]: "100"이 있음
          - [[PrimitiveValue]]가 프리미티브 값을 나타내는
          - 프로퍼티 이름이며, "100"이 프로퍼티 값

  	3. sports가 wrapper 오브젝트 임
  */

  const sym = Symbol{"ABC");

  /*
  	1. sports를 펼치면 [[PrimitiveValue]]가 표시 되지만

  	2. sym은 펼칠 수가 없으며
        - [[PrimitiveValue]]가 표시되지 않음

  	3. 그렇다고 Symbol에 Primitive 값이 없는 것이 아니며

  	4. 이것은 Symbol은 Primitive 값을
  	- 외부에 노출시키지 않는 특성 때문
  */
  ```

- `undefined`, `null`은 `wrapper` 오브젝트 없음

```toc

```
