---
emoji: 👨‍💻
title: WeakMap 오브젝트 메소드 - get(), set(), has(), delete()
date: '2021-11-07 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  WeakMap 오브젝트 메소드: get(), set(), has(), delete()
</h1>

<br>

## 1. get()

- `WeakMap` 인스턴스에서

  - key 값이 같은 value 반환
  - 존재하지 않으면 `undefined` 반환

  ```tsx
  const fn = () => {};
  const obj = new WeakMap([[fn, '함수']]);

  console.log(obj.get(fn)); // 함수
  ```

<br>

## 2. set()

- `WeakMap` 인스턴스에 key, value 설정

  ```tsx
  const fn = function(){};
  const obj = new WeakMap([
  	[fn, "함수]
  ]);

  console.log(obj.get(fn));  // 함수

  obj.set(fn, "함수 변경");
  console.log(obj.get(fn));  // 함수 변경
  ```

- 첫 번째 파라미터에 key로 사용할 오브젝트 작성
  - string과 같은 프리미티브 값 사용 불가
- 두 번째 파라미터는 값
  - 첫 번째 파라미터의 오브젝트에 대한 값?
  - 오브젝트 구분 등의 용도, 오브젝트에 따라 연동하는 함수 등록

<br>

## 3. has()

- `WeakMap` 인스턴스에서

  - key의 존재 여부 반환
  - 존재하면 `true`, 아니면 `false` 반환

    ```tsx
    const obj = {};
    const weakObj = new WeakMap([[obj, '오브젝트']]);

    console.log(weakObj.has(obj)); // true
    ```

<br>

## 4. delete()

- `WeakMap` 인스턴스에서

  - key와 일치하는 `entry` 삭제

    ```tsx
    const fn = function () {};
    const obj = new WeakMap([[fn, '함수']]);

    console.log(obj.delete(fn)); // true
    console.log(obj.has(fn)); // false
    ```

  - 삭제를 성공하면 `true` 반환
  - 삭제를 실패하면 `false` 반환

```toc

```
