---
emoji: 👨‍💻
title: Generator 함수
date: '2021-10-10 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋   Generator 함수
</h1>

<br>

## 1. `function*`

- Generator function : `function*` 키워드를 사용한 함수
- 제너레이터 함수 형태 : `function* 선언문`, `function* 표현식`, `Generator Function`
  ```tsx
  function* sports(one) {}
  const book = function* (one) {};
  const music = Object.getProtytpeOf(function* () {}).constructor;
  const gen = new music();
  ```
- 작성 방법 :`function*` 다음에 소괄호() 작성이어서 작성해도 되고 하나 이상 띄워도 됨

<br>

## 2. `funtion*` 선언문

- `function*` 다음에 함수 이름 작성

- 제너레이터 함수를 호출하면 함수 블록`{}`을 실행하지 않고

  - `Generator`오브젝트를 생성하여 반환

  ```tsx
  function* sports(one, two) {
    yield one + two;
  }

  console.log(typeof sports); // true

  const obj = sports(1, 2);
  console.log(typeof obj); // object
  console.log(obj.next()); // {value: 3, done: false}

  // 1. function* sports(one, two){} 선언문 형태의 제너레이터 ㅎ마수 임
  // 2. 제너레이터 함수의 타입은 function
  // 3. const obj = sports(1, 2); sports 함수를 호출하면 Generator 오브젝트를 생성하여 반환함
  // 4. 이때, 함수 코드를 실행하지 않음
  // 5. 파라미터 값은 생성한 오브젝트에 설정됨
  // 6. new 연산자를 사용할 수 없음, 단일 함수로 사용하겠다는 뉘앙스
  // 7. typeof obj 생성한 Generator 오브젝트 타입 object
  // 8. obj.next() Generator 오브젝트가 iterator 오브젝트이므로 next() 함수를 호출 할 수 있으며 이때 함수 코드가 실행 됨
  ```

- `Generator` 오브젝트는 `iterator` 오브젝트

- 함수 코드 실행
  - `Generator` 오브젝트의 메소드를 호출 할 때

<br>

## 3. `function*` 표현식

- `function*` 다음에 함수 이름 작성은 선택

  - 일반적으로 함수 이름을 작성하지 않음
  - `function*` 왼쪽에 변수를 선언하며 변수 이름이 함수 이름이 됨

  ```tsx
  const sports = function* (one) {
    yield one;
  };

  const obj = sports(100);
  console.log(obj.next()); // {value: 100, done: false}

  // 1. const sports = function* (one) {} 표현식 형태의 제너레이터 함수 임
  // 2. 왼쪽 sports가 함수 이름이 됨
  // 문법 적으로는 * 다음에 함수 이름을 작성할 수 있지만 일반적으로는 사용하지 않음
  ```

- 함수를 선언하는 형태만 다를 뿐
  - 다른 것은 `function*` 선언문과 같음

```toc

```
