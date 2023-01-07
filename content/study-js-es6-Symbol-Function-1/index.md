---
emoji: 👨‍💻
title: Symbol 함수 - for(), keyFor()
date: '2021-10-30 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 Symbol 함수: for(), keyFor()
</h1>

## 1. for()

- 글로벌 `Symbol` 레지스트리에

  - `{key: value}` 형태로 `Symbol` 을 저장

  - `파라미터()`의 문자열이 `Key`가 되고 `Symbol()`로 생성한 값이 `value`가 됨

    ```tsx
    const one = Symbol.for('sports');

    console.log(one); // Symbol(sports)

    // 1. {key: value} 형태로 one에 설정함, one이 글로벌 Symbol 레지스트리에 저장됨
    // 2. 파라미터인 'sports'가 key가 되고 Symbol()로 생성한 값이 value가 됨
    // 3. Symbol("sports") 함수에서 파라미터가 주석이었던 것과는 차이가 있음
    ```

  - `registry` : 등록, 기록

- 글로벌 `Symbol` 레지스트리는 공유 영역

  - 다른 오브젝트에서도 사용 가능
  - 같은 `key`가 존재하면 등록된 값을 사용

    ```tsx
    const one = Symbol.for("sports");
    const two = Symbol.for("sports");

    console.log(one === two);  // true

    console.log(Symbol.for(true); // Symbol(true)

    // 1. one의 key 값과 two의 key값이 같으므로 Symbol 값을 생성하지 않고 one에 설정된 값을 사용
    // 2. one === two 그래서 비교 결과가 true가 나옴
    // 3. Symbol.for(true) true를 문자열로 반환하여 key 값으로 사용
    ```

<br>

## 2. keyFor()

- 글로벌 `Symbol` 레지스트리에서 `Symbol`의 `key` 값을 구함

- 파라미터에 `Symbol.for()` 로 등록한 `Symbol` 작성

  ```tsx
  const one = Symbol.for('book');
  const six = Symbol.keyFor(one);

  console.log(six); // book

  // 1. const six = Symbol.keyFor(one); 파라미터에 글로벌 Symbol 레지스트리에 등록한 Symbol을 작성함
  // 2. one의 key 값인 "book"을 반환
  ```

- `Symbol key` 값이 존재하면 `key` 값을 반환하고 존재하지 않으면 `Undefined` 반환

```toc

```
