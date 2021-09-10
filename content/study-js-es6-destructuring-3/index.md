---
emoji: 👨‍💻
title: Object 오퍼레이션, 프로퍼티 이름 조합
date: '2021-09-10 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 Object 오퍼레이션, 프로퍼티 이름 조합
</h1>

<br>

## 1. Object 오퍼레이션

- 같은 프로퍼티 이름 사용

  ```tsx
  const value = { book: 10, book: 20 };

  console.log(value); // {book: 20}
  ```

  1. `{book: 10, book: 20}`에서 프로퍼티 이름인 `book`이 같음
  2. `ES5 Strict` 모드에서 프로퍼티 이름이 같으면 에러 뜸
  3. `ES6`에서는 `Stirct` 모드에 관계없이 에러가 발생하지 않음, 뒤에 작성한 프로퍼티 값으로 대체됨

- Shorhand property names

  ```tsx
  const one = 10,
    two = 20;
  const value = { one, two };

  console.log(values); // {one: 10, two: 20}
  ```

  1. `one`과 `two` 변수에 값을 작성하였으며
  2. `{one, two}` 형태로 `values`에 할당함
  3. `one`이 프로퍼티 이름이 되고 `10`이 프로퍼티 값으로 할당됨
  4. `"Shorhand property names"`은 MDN에 작성된 것으로 스펙에 정의된 것은 아님

<br>

## 2. 프로퍼티 이름 조합

- 문자열을 프로퍼티 이름으로 사용

  ```tsx
  const value = {
    ['one' + 'two']: 12,
  };

  console.log(value.onetwo); // 12
  ```

  1. `"one"`과 `"two"`를 연결하여 `onetwo`를 프로퍼티 이름으로 사용 함

- 변숫값을 프로퍼티 이름으로 사용

  ```tsx
  const item = 'world';
  const sports = {
    [item]: 100,
    [item + 'Cup']: '월드컵',
    [item + 'Sports']: function () {
      return '스포츠';
    },
  };

  console.log(sports[item]); // 100
  console.log(sports[item + 'Cup']); // 월드컵
  console.log(sports[item + 'Sports']()); // 스포츠
  ```

  1. 변숫값을 프로퍼티 이름으로 사용 함
  2. 변숫값과 문자열을 연결할 수 있음
  3. 프로퍼티 이름에 공백이 있는 것이 어색하지만 공백을 넣을 수 있음
  4. 함수로 호출 할 수 있음, 변숫값에 따라 함수 이름을 정의 할 수 있음

- 분할 할당을 조합한 형태

  ```tsx
  const item = 'book';
  const result = ({ [item]: title } = { book: '책' }); // item을 가변적으로 사용 하는에 유용

  console.log(result); // {book: 책}
  ```

  1. 변숫값을 프로퍼티 이름으로 사용하고 분할 할당한 형태
  2. `{[item]: title}`이 `{book: title}` 형태가 됨
  3. `{book: "책"}`이 `{book: title}`에 "책"이 할당됨

```toc

```
