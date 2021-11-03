---
emoji: 👨‍💻
title: Map과 이터레이터 오브젝트 - entries(), keys(), values(), Symbol.iterator()
date: '2021-11-04 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  Map과 이터레이터 오브젝트 - entries(), keys(), values(), Symbol.iterator()
</h1>

<br>

## 1. entries()

- Map 인스턴스로 이터레이터 오브젝트 생성, 반환

  - Map 인스턴스에 설정된 순서로 반환
  - `next()` 로 `[key, value]` 반환

    ```tsx
    const obj = new Map([
      ['one', 100],
      ['two', 200],
    ]);

    const iter = obj.entries();

    console.log(iter.next()); // {value: [one, 100], done: false}
    console.log(iter.next()); // {value: [one, 200], done: false}
    console.log(iter.next()); // {value: undefined, done: true}
    ```

<br>

## 2. keys()

- Map 인스턴스의 key로 이터레이터 오브젝트 생성, 반환
  - value는 포함하지 않음
  - Map 인스턴스에 설정된 순서로 반환
- `next()` 로 key 반환

  ```tsx
  const obj = new Map([
    ['one', 100],
    ['two', 200],
  ]);

  const iter = obj.keys();

  console.log(iter.next()); // {value: one, done: false}
  console.log(iter.next()); // {value: two, done: false}
  console.log(iter.next()); // {value: undefined, done: true}
  ```

  <br>

## 3. values()

- Map 인스턴스의 value로 이터레이터 오브젝트 생성, 반환

  - key는 포함하지 않음
  - Map 인스턴스에 설정된 순서로 반환

- `next()` 로 value 반환

  ```tsx
  const obj = new Map([
    ['one', 100],
    ['two', 200],
  ]);

  const iter = obj.values();

  console.log(iter.next()); // {value: 100, done: false}
  console.log(iter.next()); // {value: 200, done: false}
  console.log(iter.next()); // {value: undefined, done: true}
  ```

  <br>

## 4. Symbol.iterator()

- Map 인스턴스로 이터레이터 오브젝트 생성, 반환

  - `Map.prototype.entries()` 와 같음
  - `next()` 로 `[key, value]` 반환

    ```tsx
    const obj = new Map([
      ['one', 100],
      ['two', 200],
    ]);

    const iter = obj[Symbol.iterator]();

    console.log(iter.next()); // {value: [one, 100], done: false}
    console.log(iter.next()); // {value: [one, 200], done: false}
    console.log(iter.next()); // {value: undefined, done: true}
    ```

```toc

```
