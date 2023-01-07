---
emoji: 👨‍💻
title: Reflect - defineProperty(), preventExtensions(), isExtensible()
date: '2021-12-09 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 defineProperty(), preventExtensions(), isExtensible()
</h1>

<br>

## 1. defineProperty()

- `target` 에 프로퍼티를 추가, 변경함
- `Reflect.defineProperty()` 형태

  ```tsx
  const target = {};
  Reflect.defineProperty(target, 'point', {
    value: 100,
    writable: true,
  });

  console.log(Object.getownPropertyDescriptor(target, 'point'));

  // 1. target에 프로퍼티를 설정함
  // {value: 100, writable: true, enumerable: false, configurable: false}
  ```

- `Object.defineProperty()` 와 차이

  - `true, false`를 반환

    ```tsx
    const target = {};

    Object.defineProperty(target, 'point', {
      value: 100,
      configurable: false,
    });

    const resutl = Reflect.defineProperty(target, 'point', {
      value: 200,
    });

    console.log(result); // false
    console.log(Reflect.get(target, 'point')); // 100

    // 1. Object.defineProperty(...)는 처리에 성공하면 Object를 반환하고 실패하면 TypeError가 발생함, 따라서 try-catch를 사용해야 함
    // 2. Reflect.defineProperty(...)는 처리에 성공하면 true를, 실패하면 false를 반환함 try-catch를 사용하지 않아도 됨
    // 3. point 프로퍼티가 {configurable: false}이므로 에러가 발생하게 되면 false를 반환 함, 따라서 100이 200으로 바뀌지 않음
    ```

<br>

## 2.preventExtensions()

- `target` 에 프로퍼티 추가 금지를 설정함
- `Reflect.preventExtensions()` 형태

  ```tsx
  const target = {};
  console.log(Reflect.preventExtensions(target)); // true

  const result = Reflect.defineProperty(target, 'point', { value: 100 });
  console.log(result); // false

  // 1. console.log(Reflect.preventExtensions(target)); 처리를 성공하면 true, 실패하면 false를 반환
  // 2. const result = Reflect.defineProperty(target, "point", { value: 100 }); 프로퍼티를 추가 할 수 없는데 추가하고 있음, 처리 실패이므로 false가 반환됨
  ```

<br>

## 3. isExtensible()

- `target` 에 프로퍼티 추가 가능 여부를 반환함
- `Reflect.isExtensible()` 형태

  ```tsx
  const target = { point: 100 };
  console.log(Reflect.isExtensible(target)); // true

  Reflect.preventExtensions(target);
  console.log(Reflect.isExtensible(target)); // false
  ```

- 아래 함수를 실행한 상태이면 false를 반환함
  - `Object.seal()`
  - `Object.freeze()`
  - `Object.preventExtensions()`

```toc

```
