---
emoji: 👨‍💻
title: Reflect - getPrototypeof(), setPrototypeof(), ownKeys(), getOwnPropertyDescriptor()
date: '2021-12-10 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 getPrototypeof(), setPrototypeof(), ownKeys(), getOwnPropertyDescriptor()
</h1>

<br>

## 1. getPrototypeOf()

- `target.__proto__`를 반환 함
  - `target` 이 확장 불가라도 반환함
- `Relflect.getPrototypeOf()` 형태로 작성

  ```tsx
  let proto = Reflect.getPrototypeOf(Array);
  console.log(proto === Function.prototype);   // true
  console.log(proto === Array.prototype);      // flase

  const list = [];
  proto = Reflect.gePrototypeOf(list);
  console.log((proto === Array.prototype);     // true

  // 1. let proto = Reflect.getPrototypeOf(Array); Array 오브젝트의 __proto__를 반환함
  // 2. Array.prototype에 Array 오브젝트의 메소드가 있으며 Array.__proto__에 Function.prototype의 메소드가 있음
  // 3. __proto__를 반환하므로 Function.prototype이 반환됨
  // 4. 사용하는 오브젝트의 prototype과 __proto__ 구조가 연상되어야 함
  // 5. proto === Function.prototype: true를 반환함
  // 6. proto === Array.prototype: false를 반환함
  // 7. const list = []; Array 인스턴스를 생성하면, list.__proto__에 Array.prototype의 메소드가 있음
  // 8. proto = Relfect.getPrototypeOf(this); proto에 list.__proto__가 할당됨
  // 9. console.log(proto === Array.prototype) proto와 Array.prototype이 같음

  ```

- `prototype` 의 `__proto__` 를 반환

  ```tsx
  const proto = Reflect.getPrototypeOf(Array.prototype);

  console.log(proto.map); // undefined
  console.log(proto.hasOwnProperty); // function hasOwnProperty() {[native code]}

  // 1. Reflect.getPrototypeOf(Array.prototype), Array.prototype.__proto__을 반환함, 여기에 빌트인 Object.prototype의 메소드가 있음
  // 2. console.log(proto.map) map()은 Array.prototype에 있으므로 undefined가 반환됨
  // 3. console.log(proto.hasOwnProperty) hasOwnProperty()는 Object.prototype의 메소드로 Array.prototype.__proto__에 있음
  ```

<br>

## 2. setPrototypeof()

- `target.__proto__`에 `prototype`에 연결된 메소드를 설정함
- `Reflect.setPrototypeOf()` 형태로 작성

  ```tsx
  class Point {
    getPoint() {
      return 100;
    }
  }

  const target = function () {};
  target.prototype.getPoint = function () {
    return 200;
  };

  Reflect.setPrototypeOf(target, Point.prototype);
  console.log(target.getPoint()); // 100

  // 1. Reflect.setPrototypeOf(target, Point.prototype); targt의 __proto__에 Point.prototype에 연결된 메소드를 설정함
  // 2. console.log(target.getPoint()) target.__proto__의 getPoint()가 호출됨, target.prototype.getPoint()가 호출되지 않음
  ```

<br>

## 3. ownKeys()

- `target` 의 모든 프로퍼티 키를 배열로 반환함
  - `[[Configurable]]: false` 이거나 오브젝트가 확장 불가라도 반환함
  - 상속 받은 프로퍼티는 제외 함
- `Reflect.ownKeys()` 형태로 작성

  ```tsx
  const sym = Symbol('심볼');
  const target = {};
  Object.defineProperties(target, {
    point: { value: 100, configurable: false },
    [sym]: { value: 200 },
  });

  Reflect.preventExtensions(target);
  console.log(Reflect.ownKeys(target)); // [point, Symbol(심볼)]

  // 1. console.log(Reflect.ownKeys(target)) target 오브젝트가 확장 불가이지만 모든 프로퍼티 키를 배열로 반환함, Symbol도 반환함
  ```

<br>

## 4. getOwnPropertyDescriptor()

- `target` 에서 프로퍼티 디스크립터를 반환함
  - 상속 받은 프로퍼티는 제외 함
- `Reflect.getOwnPropertyDescriptor()` 형태로 작성

  ```tsx
  const target = {};
  Object.defineProperty(target, 'point', {
    value: 100,
    configurable: true,
  });

  const desc = Reflect.getOwnPropertyDescriptor(target, 'point');

  console.log(desc); // {value: 100, writable: false, enumerable: false, configurable: treu}

  // 1. Reflect.getOwnPropertyDescriptor(target, "point"); target에 {value: 100, configurable: true}를 작성했지만 디폴트 속성도 반환함
  ```

```toc

```
