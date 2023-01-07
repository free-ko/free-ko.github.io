---
emoji: 👨‍💻
title: WeakSet 오브젝트 개요, new WeakSet(), has(), add(), delete()
date: '2021-11-14 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  WeakSet 오브젝트 개요, new WeakSet(), has(), add(), delete()
</h1>

<br>

## 1. WeakSet 오브젝트

- `Set` 오브젝트와 차이

  - 오브젝트만 `value` 값으로 사용할 수 있음
  - `number` 등의 프리미티브 타입 사용 불가

- 개념은 `WeakMap`과 같음

  - `value`만 작성하는 것이 다름
  - `value`의 참조가 바뀌면 `GC` 대상

- 지원 메소드
  - `has()`, `add()`, `delete()`

<br>

## 2. new WeakSet()

- `WeakSet` 인스턴스 생성, 반환

- 파라미터

  - 대괄호 `[ ]` 안에 오브젝트 작성

  ```tsx
  const empty = new WeakSet();
  const sports = {};
  const obj = new WeakSet([
  	sports
  ]};

  // 1. 파라미터를 작성하지 않아도 됨
  // 2. new 연산자를 사용 함
  ```

<br>

## 3. has()

- `WeakSet` 인스턴스에서 `value`의 존재 여부 반환

  - 존재하면 `true`, 아니면 `false` 반환

    ```tsx
    const fn = () => {};
    const obj = new WeakSet([
    	fn
    ]};

    console.log(obj.has(fn));   // true
    ```

<br>

## 4. add()

- `WeakSet` 인스턴스에 `value` 설정

  - 파라미터에 `value` 로 설정될 오브젝트 작성

    ```tsx
    const obj = new WeakSet();
    const fn = () => {};
    obj.add(fn);

    console.log(obj.has(fn)); // true
    ```

<br>

## 5. delete()

- `WeakSet` 인스턴스에서 `value`와 일치하는 엘리먼트 삭제

  - 삭제 성공이면 `true` 반환

  - 삭제를 실패하면 `false` 반환

    ```tsx
    const fn = () => {};
    const obj = new WeakSet([fn]);

    console.log(obj.delete(fn)); // true
    console.log(obj.has(fn)); // false
    ```

<br>

```toc

```
