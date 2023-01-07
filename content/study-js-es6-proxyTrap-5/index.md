---
emoji: 👨‍💻
title: defineProperty(), preventExtensions() , isExtensible() 트랩
date: '2021-12-02 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 defineProperty(), preventExtensions() , isExtensible() 트랩
</h1>

<br>

## 1. defineProperty()

- `Object.defineProperty()` 의 트랩임

  - `target` 에 프로퍼티를 추가하거나 속성값을 변경함

        ```tsx
        const target = {};
        const handler = {
          defineProperty(target, key, desc) {
            if (desc.value > 0) {
              desc.value = desc.value * -1;
            }
            Object.defineProperty(target, key, desc);
            return true;
          },
        };

        const proxy = new Proxy(target, handler);
        Object.defineProperty(proxy, 'point', {
          value: 100,
          writable: true,
        });

        console.log(target.point);
        -100;

        // 1. Object.defineProperty(obj, "point", {...}, defineProperty() 트랩이 호출됨
        // 2. 트랩: defineProperty(target, key, desc){...} desc에 {...}에 작성한 디스크립터가 설정됨
        // 3. 트랩: if(desc.value > 0){...}, value 속성값이 100이며, 0보다 크므로 100에 -1을 곱해 -100으로 바꿈
        // 4. 트랩에서 속성 값을 바꿀 수 있음
        ```

<br>

## 2. defineProperty() 트랩 호출

- `defineProperty()` 트랩이 호출되는 형태
  - `Object.defineProperty()`
  - `Reflect.defineProperty()`

<br>

## 3. defineProperty() 트랩 준수사항

<br>

- `strict mode` 일 때 트랩에서 `false` 를 반환하여 `TypeError`
- `target` 오브젝트가 확장 불가이면 프로퍼티를 추가 할 수 없음
  - `Object.preventExtensions(target);`
- `target` 오브젝트의 프로퍼티가 `[[Writable]]: false` 또는 `[[Configurable]]: false` 이면 프로퍼티 값을 변경할 수 없음

<br>

## 4. preventExtensions()

- `Object.preventExtensions()` 트랩임

  - `target` 오브젝트에 오브젝트의 확장 금지를 설정함

  ```tsx
  const target = { point: 100 };
  const handler = {
    preventExtensions(target) {
      if (target.point) {
        Object.preventExtensions(target);
        return true;
      }
      return false;
    },
  };

  const proxy = new Proxy(target, handler);
  const obj = Object.preventExtensions(proxy);

  console.log(obj.point); // 100
  console.log(Object.isExtensible(target)); // false

  // 1. const obj = Object.preventExtensions(proxy); preventExtensions() 트랩이 호출됨
  // 2. 트랩: if(target.point){...} point에 값이 있을 때만 확장 금지를 설정하기 위해 비교한 것
  // 3. 트랩에서 true를 반환하면 true를 반환하지 않고 Proxy 인스턴스를 반환함
  // 4. console.log(obj.point); Proxy 인스턴스의 point 프로퍼티 값을 출력함
  // 5. console.log(Object.isExtensible(target)) 확장 불가 상태이므로 false를 반환함
  ```

<br>

## 5. preventExtensions() 트랩 호출

- `preventExtensions()` 트랩이 호출되는 형태
  - `Object.preventExtensions()`
  - `Reflect.preventExtensions()`

<br>

## 6. preventExtensions() 트랩 준수 사항

- `target` 오브젝트가 확장 불가 일 때
  - 즉, `Object.isExtensible(target)` 결과가 `false`일 때
  - `false` 를 반환하면 `TypeError`, `true` 만 반환할 수 있음

<br>

## 7. isExtensible()

- `Object.isExtensible()` 트랩임

  - `targe`의 확장 가능 여부를 반환 함

    ```tsx
    const target = { point: 100 };
    const handler = {
      isExtensible(target) {
        return Object.isExtensible(target);
      },
    };

    const obj = new Proxy(target, handler);
    console.log(Object.isExtensible(obj)); // true

    Object.seal(target);
    console.log(Object.isExtensible(obj)); // false

    // 1. console.log(Object.isExtensible(obj)); isExtensible() 트랩이 호출됨
    // 2. target 오브젝트가 확장 가능 상태이므로 true를 반환함
    // 3. Object.seal(target); target 오브젝트를 확장 불가 상태로 설정 함
    // 4. console.log(Object.isExtensible(obj)) 확장 불가 상태이므로 false를 반환함
    ```

- `false` 를 반환하는 오브젝트 상태
  - `Object.seal()`
  - `Object.freeze()`
  - `Object.preventExtensions()`
  - `Reflect.preventExtensions()`

<br>

## 8. isExtensible() 트랩 호출

- `isExtensible()` 트랩이 호출되는 형태
  - `Object.isExtensible()`
  - `Relfect.isExtensible()`

<br>

## 9.isExtensible() 트랩 준수 사항

- `Object.isExtensible(target)` 결과와 같은 값을 반환해야 함
- 즉, 결과를 바꿀 수 없음
- 같지 않으면 `TypeError`가 발생함

```toc

```
