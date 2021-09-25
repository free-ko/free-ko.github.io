---
emoji: 👨‍💻
title: Object 변환
date: '2021-09-25 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  Object 변환: entries(), values(), fromEntries(), getOwnPropertyDescriptors()
</h1>

<br>

## 1. entries()

- 열거 가능한 오브젝트의 `{key: value}`를 `[[key, value]]` 형태로 변환

  ```tsx
  const obj = { music: '음악', book: '책' };
  const list = Object.entries(obj);

  for (let keyValue of list) {
    console.log(keyValue);
  }

  // 1. list는 이터러블 오브젝트 임
  // 2. [[key, value]] 형태를 Map 형태라고 부름
  // 결과 : [music, 음악], [book, 책]
  ```

- 작성한 순서가 바뀌는 경우

  ```tsx
  const obj = { 10: '십', book: '책', 7: '칠' };
  const list = Object.entries(obj);

  for (let keyValue of list) {
    console.log(keyValue);
  }

  // 1. 앞의 [코드 1]처럼 key가 영문자일 때는 key값을 분류하지 않고 작성한 대로 반환
  // 2. 반면, [코드 2]처럼 숫자와 문자가 섞여 있으면 숫자, 문자 순서로 분류함
  // 결과
  // [7, 칠]
  // [10, 십]
  // [book, 책]
  ```

- 문자열은 문자 하나씩 분리

  ```tsx
  const list = Object.entries('ABC');

  for (let keyValue of list) {
    console.log(keyValue);
  }

  // 1. 문자열은 문자 하나씩 분리 하며
  // 2. 인덱스를 key 값으로 사용 함
  // 결과
  // [0, A]
  // [1, B]
  // [2, C]
  ```

<br>

## 2. values()

- 열거 가능한 오브젝트의 `{key: value}`를 `[value1, value2]` 형태로 변환

  ```tsx
  const obj = { music: '음악', book: '책' };
  const list = Object.values(obj);

  for (let value of list) {
    console.log(value);
  }

  // 음악
  // 책
  ```

- 작성한 순서가 바뀌는 경우

  ```tsx
  const obj = { 10: '십', book: '책', 7: '칠' };
  const list = Object.values(obj);

  for (let keyValue of list) {
    console.log(value);
  }

  // 1. 앞의 [코드 1]처럼 key가 영문자일 때는 key값을 분류하지 않지만
  // 2. 반면, [코드 2]처럼 숫자와 문자가 섞여 있으면 숫자, 문자 순서로 분류함
  // 결과
  // 칠
  // 십
  // 책
  ```

- 문자열은 문자 하나씩 분리

  ```tsx
  const list = Object.entries('ABC');

  for (let keyValue of list) {
    console.log(keyValue);
  }

  // 1. 문자열은 문자 하나씩 분리
  // 결과
  // A
  // B
  // C
  ```

<br>

## 3. fromEntires()

- `[[key, value]]` 형태를 `{key: value}` 형태로 변환

  ```tsx
  const list = [
    ['one', 10],
    ['two', 20],
  ];
  const obj = Object.fromEntries(list);

  console.log(obj);

  // {one: 10, two: 20}
  ```

- 프로퍼티 키 값이 같으면 값 대체

  ```tsx
  const list = [
    ['one', 10],
    ['one', 20],
  ];
  const obj = Object.fromEntries(list);

  console.log(obj);

  // {one: 20}
  ```

<br>

## 4. getOwnPropertyDescriptors()

- `Object`의 프로퍼티 디스크립터를 반환

  - 데이터 디스크립터

  ```tsx
  const obj = { music: '음악' };
  const des = Object.getOwnPropertyDescriptors(obj);

  for (let name in des.music) {
    consolel.log(name + ': ' + des.music[name]);
  }

  // value: 음악
  // writable: true
  // enumerable: true
  // configurable: true
  ```

  - 액세스 디스크립터

  ```tsx
  const obj = {
    get music() {},
  };

  const des = Object.getOwnPropertyDescriptors(obj);

  for (let name in des.music) {
    console.log(name + ': ' + des.music[name]);
  }

  // get: get music() {}
  // set: undefined
  // enumerable: true
  // configurable: true
  ```

  - 상속받은 오브젝트는 반환하지 않음

```toc

```
