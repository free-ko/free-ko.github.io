---
emoji: 👨‍💻
title: Symbol() 함수
date: '2021-10-19 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  Symbol() 함수
</h1>

## 1. Symbol()

- 외부로 노출되는 것 허용 하지 않음
- `Symbol()` 함수는 값을 생성하여 반환

  - 반환된 값을 볼 수 없음

  ```tsx
  const sym = Symbol();

  console.log(sym); // Symbol()
  console.log(typeof sym); // symbol

  // 1. const sym = Symbol(); Symbol 오브젝트가 아니라, Symbol 값을 생성하여 반환 함
  // 2. 새로운 값을 생성하여 반환하므로 값을 생성한다는 표현이 적절 함
  // 3. console.log(sym) 생성한 Symbol 값이 출력되지 않고 Symbol 값을 생성한 코드 형태가 표시 됨
  // 4. typeof sym Symbol로 생성한 값 타입은 symbol임
  ```

  - `new` 연산자를 사용할 수 없음

- 프로그램 전체를 통해 유일한 값 제공

  ```tsx
  const one = Symbol();
  const two = Symbol();

  console.log(one == two); // false

  // 1. Symbol()을 실행할 때마다 프로그램 전체에서 하나만 있는 값을 생성함
  // 2. 따라서 one의 값과 two의 값이 다름
  ```

- `Symbol` 값으로 연산 불가

  ```tsx
  let sym = Symbol();

  try {
    const add = sym + 5;
  } catch (e) {
    console.log('연산 불가');
  }

  // 1. const add = sym + 5; Symbol이 값이지만 연산 할 수 없음
  ```

- `Symbol` 타입 변경 불가

  ```tsx
  let sym = Symbol();

  try {
    +sym;
  } catch (e) {
    console.log('값 타입 변경 불가');
  }

  // 1. +sym; 단항 + 연산자는 Number 타입으로 바꿈, Symbol 타입을 바꿀 수 없음
  // 2. 이외에도 비교할 수 없는 등의 Symbol 값 사용에 제약이 있음
  // 3. 이것은 외부에 값이 노출되지 않도록 하기 위해서 임
  // 4. 외부에 Symbol 값이 노출되는 처리(계산, 변환 등)을 할 수 없음
  ```

  - 파라미터에 주석, 설명을 작성

    ```tsx
    const sym = Symbol('주석, 설명');

    console.log(sym); // Symbol(주석, 설명)

    // 1. const sym = Symbol("주석, 설명"); 파라미터에 Symbol()로 생성한 값의 설명, 주석을 문자열로 작성 함
    // 2. 생성한 Symbol 값을 볼 수 없으므로 값 설명이 필요할 때마다 사용
    // 3. Symbol() 실행에 영향을 미치지 않음
    // 4. console.log(sym); 생성한 Symbol 값이 출력되지 않고 Symbol 값을 생성한 코드가 표시 됨
    ```

- `Symbol` 값을 문자열로 바꿔서 연결

  ```tsx
  const sym = Symbol('설명');

  console.log(sym.toString() + '연결'); // Symbol(설명)연결

  // 1. sym.toString() + "연결"
  // 2. Symbol 값을 toString()으로 변환하면 에러가 발생하지 않지만
  // 3. 값이 변환되지 않고 값을 만든 형태에 문자열을 연결 함
  // 4. new String(sym) 형태는 에러가 발생함
  ```

- `Template` 에 사용

  ```tsx
  const sym = Symbol('주석, 설명');

  try {
    `${sym}`;
  } catch {
    console.log('`${sym}불가`');
  }

  // 1. Symbol 값을 Template에 사용할 수 없음
  // 2. 외부로 노출 되기 때문에
  ```

```toc

```
