---
emoji: 👨‍💻
title: Set과 이터레이터 오브젝트 - entries(), keys(), values(), Symbol.iterator()
date: '2021-11-12 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  Set과 이터레이터 오브젝트 - entries(), keys(), values(), Symbol.iterator()
</h1>

<br>

## 1. entries()

- `Set` 인스턴스로 이터레이터 오브젝트 생성, 반환

  - `Set` 인스턴스에 설정된 순서로 반환
  - `next()`로 `[value, value]` 반환

  ```tsx
  const obj = new Set(['one', () => {}]);

  const iterObj = obj.entries();

  console.log(iterObj.next()); // {value: [one, one], done: false}
  console.log(iterObj.next()); // {value: [() => {}, () => {}], done: false}
  console.log(iterObj.next()); // {value: undefined, done: true}
  ```

<br>

## 2. keys()

- `value` 가 `key` 가 되므로 `keys()` 는 의미가 없음
  - `Map` 오브젝트와 맞추기 위한 것
- `Set` 인스턴스의 `value` 를 key로 사용하여 이터레이터 오브젝트 생성, 반환
  - `Set` 인스턴스에 설정된 순서로 반환
- `next()` 로 `value(key)` 반환

  ```tsx
  const obj = new Set(['one', () => {}]);

  const iterObj = obj.keys();

  console.log(iterObj.next()); // {value: one, done: false}
  console.log(iterObj.next()); // {value: () => {}, done: false}
  console.log(iterObj.next()); // {value: undefined, done: true}
  ```

<br>

## 3.values()

- `Set` 인스턴스의 `value` 로 이터레이터 오브젝트 생성, 반환
  - `Set` 인스턴스에 설정된 순서로 반환
- `next()` 로 `value` 반환

  ```tsx
  const obj = new Set(['one', () => {}]);

  const iterObj = obj.values();

  console.log(iterObj.next()); // {value: one, done: false}
  console.log(iterObj.next()); // {value: () => {}, done: false}
  console.log(iterObj.next()); // {value: undefined, done: true}
  ```

<br>

## 4. Symbol.iterator()

- `Set` 인스턴스로 이터레이터 오브제트 생성, 반환

  - `Set.prototype.values()` 와 같음
  - `next()` 로 `value` 반환

    ```tsx
    const obj = new Set(['one', () => {}]);

    const iterObj = obj[Symbol.iterator]();

    console.log(iterObj.next()); // {value: one, done: false}
    console.log(iterObj.next()); // {value: () => {}, done: false}
    console.log(iterObj.next()); // {value: undefined, done: true}
    ```

```toc

```
