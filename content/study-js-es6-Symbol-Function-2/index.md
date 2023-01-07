---
emoji: 👨‍💻
title: toString(), description, valueOf(), getOwnPropertySymbols()
date: '2021-10-31 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 toString(), description, valueOf(), getOwnPropertySymbols()
</h1>

## 1. toString()

- `Symbol` 을 생성했던 형태를 문자열로 변환하여 반환

  ```tsx
  console.log(Symbo('100').toString());

  const sym = Symbol.for('book');
  console.log(sym.toString());

  try {
    console.log(Symbol() + 'ABC');
  } catch {
    console.log('+로 연결 불가');
  }

  // 실행 결과
  // Symbol(100)
  // Symbol(book)
  // +로 연결 불가
  ```

  - `Symbol` 값은 반환되지 않음

  - `+` 로 문자열을 연결하면 `TypeError`

  - `toString()`으로 변환하면 연결은 되지만 `Symbol` 값은 연결되지 않음

  <br>

  ## 2. description

  - `Symbol.prototype.descripon`

  - Syntax, ES2019

    - `Symbol("설명").description;`
    - `Symbol.for("키").description;`
    - `Symbol.iterator.description;`

- `Symbol` 오브젝트의 주석, 설명을 반환

  ```tsx
  console.log(Symbol('sports').description); // sports
  console.log(Symbol.for('book').description); // book
  console.log(Symbol.iterator.description); // Symbol.iterator
  ```

  - `Symbol()` 함수의 파라미터를 반환

- `toString()`과 차이

  ```tsx
  console.log(Symbol('book').toString()); // Symbol(book)
  console.log(Symbol('').toString()); // Symbol()
  console.log(Symbol().toString()); // Symbol()

  console.log(Symbol.for('book').description); // book
  console.log(Symbol('book').description); // book
  console.log(Symbol('').description); // ""
  console.log(Symbol().description); // undefined
  ```

<br>

## 3. valueOf()

- `valueOf()` 가 프리미티브 값을 반환하지만 `Symbol` 은 값을 반환하지 않고 `Symbol` 을 생성한 형태를 반환

  ```tsx
  console.log(Symbol('100').valueOf()); // Symbol(100)
  console.log(Symbol.for('200').valueOf()); // Symbol(200)
  ```

- `Symbol.for()` 는 `for` 를 제외하고 반환

<br>

## 4. getWonPropertySymbols()

- `Object`의 함수이지만 `Symbol`이 대상이므로 여기서 다룸
- 파라미터의 `Object`에서 `Symbol`만 배열로 반환, 다른 프로퍼티는 반환하지 않음

  ```tsx
  const obj = { point: 100 };
  obj[Symbol('one')] = 200;
  obj[Symbol.for('two')] = 300;

  console.log(Object.getWonPropertyName(obj));

  const list = Object.getWonPropertySymbols(obj);
  for (const sym of list) {
    console.log(`${sym.description}: ${obj[sym]}`);
  }

  // 1. Object.getWonPropertyName(obj), obj에서 프로퍼티 이름을 배열로 반환함, Symbol은 반환하지 않음
  // 2. Object.getOwnPropertySymbols(obj) obj에서 Symbol만 배열로 반환 함
  // 3. for-of 문으로 전개 됨

  // 실행 결과
  // [point]
  // one: 200
  // two: 300
  ```

```toc

```
