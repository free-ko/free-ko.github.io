---
emoji: 👨‍💻
title: Object 분할 할당, 파라미터 분할 할당
date: '2021-09-09 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 Object 분할 할당, 파라미터 분할 할당
</h1>

<br>

## 1. Object 분할 할당

- `Object`의 프로퍼티를 분할하여 할당
- 프로퍼티 이름이 같은 프로퍼티에 값을 할당

  ```tsx
  const { one, two } = { one: 10, two: 20 };

  console.log(one); // 10
  console.log(two); // 20
  ```

  1. 왼쪽의 `Object`가 `{name: value}` 형태가 아니라 프로퍼티 이름만 작성함
  2. 프로퍼티 이름이 같은 오른쪽 프로퍼티 값을 왼쪽의 프로퍼티 값으로 할당
  3. `one`에 `10`, `two`에 `20`을 할당, `{one: 10, two: 20}` 형태가 됨

<br>

- 프로퍼티 이름을 별도로 작성

  ```tsx
  let one, two;

  ({ one, two } = { one: 10, two: 20 });

  console.log(one); // 10
  console.log(two); // 20
  ```

  1. `let one, two;` 프로퍼티 이름을 앞에 별도로 작성함
  2. `({one, two} = {one: 10, two: 20});` 전체를 소괄호() 안에 작성해야 함

<br>

- 프로퍼티 값 위치에 변수 이름 작성

  ```tsx
  let five, six;

  ({ one: five, two: six } = { one: 5, two: 6 });

  console.log(five); // 5
  console.log(six); // 6
  ```

  1. 이름을 별도로 선언하였으므로 소괄호() 안에 작성했음
  2. 오른쪽 `one` 프로퍼티 값 5를 five에 할당
  3. 오른쪽 `two` 프로퍼티 값 6을 six에 할당
  4. `console.log(one)` 을 실행하면 `ReferenceError` 프로퍼티 이름으로 값을 구할 수 없음
  5. `five`와 `six` 변숫값을 구하는 것이 목적

<br>

- Object 구조에 맞추어 값 할당

  ```tsx
  const {
    one,
    plus: { two, three },
  } = { one: 10, plus: { two: 20, three: 30 } };

  console.log(one);
  console.log(two);
  console.log(three);
  // console.log(plus);
  ```

  1. `plus: {two, three}` plus는 구조(경로)를 만들기 위한 것
  2. 왼쪽에 `plus`가 있고 `two`가 있으면 `two` 프로퍼티 값에 `20`을 할당함
  3. 구조가 같지 않으면 실행할 때 에러 발생
  4. `console.log(plus)` `plus`는 구조(경로)를 만들기 위한 것으로 실제로 존재하지 않음
  5. `plus`가 없으므로 `RefferenceError` 발생
  6. 할당한 후, 이름으로 값을 구할 수 있음

<br>

- 나머지를 Object로 할당

  ```tsx
  const { one, ...rest } = { one: 10, two: 20, three: 30 };

  console.log(rest); // {two: 20, three: 30}
  ```

<br>

## 2. 파라미터 분할 할당

- 호출 하는 함수에서 `Object` 형태로 넘겨준 파라미터 값을 호출받는 함수의 파라미터에 맞추어 할당

  ```tsx
  function add({ one, two }) {
    console.log(one + two);
  }

  add({ one: 10, two: 20 }); // 30
  ```

  1. 호출하는 함수에서 넘겨준 `one`과 `two`를 호출받는 함수의 프로퍼티 이름에 맞추어 프로퍼티 값을 분할 할당 함

- `Object` 구조에 맞추어 값 할당

  ```tsx
  function add({one, plus: {two}}) (
  	console.log(one + two);
  );

  add({one: 10, plus: {two: 20}});  // 30
  ```

  - 호출하는 함수에서 넘겨준 `Object` 구조와 프로퍼티에 맞추어 프로퍼티 값을 할당

```toc

```
