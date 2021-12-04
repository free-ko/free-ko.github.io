---
emoji: 👨‍💻
title: construct(), apply(), ownKeys(), getOwnPropertyDescriptor() 트랩
date: '2021-12-04 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 construct(), apply(), ownKeys(), getOwnPropertyDescriptor() 트랩
</h1>

<br>

## 1. construct()

- `new` 연산자의 트랩임

  - 인스턴스를 생성하여 반환함

    ```tsx
    class Point {
      constructor(point) {
        this.point = point;
      }
    }

    const handler = {
      construct(target, args, proxy) {
        let point = args[0];
        if (Object.is(args[1], 'add')) {
          point += args[2];
        }
        return new target(point);
      },
    };

    const obj = new Proxy(Point, handler);
    const pointObj = new obj(100, 'add', 300);

    console.log(pointobj.point); // 400

    // 1. const obj = new Proxy(Point, handler); Point 클래스로 Proxy 인스턴스를 생성함
    // 2. const pointObj = new obj(100, "add", 300); construct() 트랩이 호출됨
    // 3. 트랩: construct(target, args, proxy) {...}
    //		- target에 Point 클래스가 설정되고
    //		- args에 [100, "add", 300] 형태로 설정됨
    //    - proxy에 new Proxy()로 생성한 obj 인스턴스가 설정됨
    // 4. construct(){...} 트랩처리 Point 클래스의 constructor를 호출하기 전에 조건에 따라 인스턴스의 초깃값을 정리 함
    // 5. 트랩을 호출할 때마다 정리하지 않고 트랩에서 일괄적으로 정리하면 효율이 높음
    // 6. 트랩을 이렇게 활용할 수 있음
    ```

- `construct()` 트랩이 호출되는 형태
  - `const obj = new Proxy(Point, handler);`
    - `new obj`를 실행할 때 호출
  - `Reflect.construct()`

<br>

## 2. apply()

- 함수 호출 트랩임

  - `Proxy` 인스턴스 호출로 트랩이 실행된 형태 임

    ```tsx
    function getPoint(...values) {
      return values.map((value) => {
        return value + 10;
      });
    }

    const handler = {
      apply(target, that, params) {
        return target.apply(this.params);
      },
    };

    const obj = new Proxy(getPoint, handler);

    console.log(obj(100, 200)); // [110, 210]

    // 1. console.log(obj(100, 200)); obj는 Proxy 인스턴스이며 이를 호출하면 apply() 트랩이 호출됨
    // 2. 트랩: apply(target, that, params){...} target에 getPoint 함수가 설정됨
    // 3. Proxy 인스턴스 호출로 인해 트랩이 실행되면 that에 값이 설정되지 않음
    ```

<br>

## 3. apply() 트랩 호출

- `apply()` 트랩이 호출되는 형태

  - `Function.prototype.apply()`

    ```tsx
    function getPoint(...values) {
      return values.map((value) => {
        return value + this.bonus;
      });
    }

    const handler = {
      apply(target, that, params) {
        return target.apply(that, params);
      },
    };

    const obj = new Proxy(getPoint, handler);
    const add = { bonus: 10 };

    console.log(obj.apply(add, [100, 200])); // [110, 210]

    // 1. console.log(obj.apply(add, [100, 200])); apply() 호출하면 apply() 트랩이 호출됨
    // 2. 첫 번째 파라미터에 getPoint()에서 this로 참조할 오브젝트를 작성함
    // 3. 두 번째 파라미터에 getPoint()로 넘겨 줄 파라미터 값을 작성함
    // 4. 트랩: apply(target, that, params){...} target에 getPoint 함수가 설정되고 that에 add 오브젝트가 설정됨 prams에 [100, 200]이 설정됨
    ```

  - `Function.prototype.call()`

    ```tsx
    function getPoint(...values) {
      return values.map((value) => {
        return value + this.bonus;
      });
    }

    const handler = {
      apply(target, that, ...params) {
        return target.apply(that, parms);
      },
    };

    const obj = new Proxy(getPoint, handler);
    const add = { bonus: 10 };
    console.log(obj.call(add, 100, 200)); // [110, 210]

    // 1. obj.call(add, 100, 200) call() 호출하면 apply 트랩이 호출됨
    // 2. 첫 번째 파라미터에 getPoint()에서 this로 참조할 오브젝트를 작성함
    // 3. 두 번째 파라미터 이후에 getPoint()로 넘겨 줄 파라미터 값을 작성함
    // 4. call() 호출이므로 두 번째 파라미터 이후에 콤마로 구분하여 값을 작성함
    // 5. 트랩: apply(target, that, ...params){...} target에 getPoint 함수가 설정되고 that에 add 오브젝트가 설정됨 params에 [100, 200]이 설정됨
    ```

  - `proxy(...args): Proxy` 인스턴스
  - `Reflect.apply()`

<br>

## 4. ownKeys()

- `Object.getOwnPropertyNames()` 의 트랩임

  - `target`의 모든 `key`를 배열로 반환함
  - `[[Configurable]]: false` 이거나 오브젝트가 확장 불가라도 반환함

    ```tsx
    const target = {};
    Object.defineProperties(target, {
      point: { value: 100, enumerable: true },
      bonus: { value: 200 },
    });

    const handler = {
      ownKeys(target) {
        return Object.getOwnPropertyNames(target);
      },
    };

    const obj = new Proxy(target, handler);

    console.log(Object.getOwnPropertyNames(obj)); // [point, bonus]
    console.log(Object.keys(obj)); // [point]

    // 1. console.log(Object.getOwnPropertyNames(obj)); ownKeys() 트랩이 호출됨
    // 2. 트랩: return Object.getOwnPropertyNames(target); target 오브젝트의 모든 프로퍼티 key를 반환함
    // 3. console.log(Object.keys(obj)); 트랩을 호출하며, 모든 프로퍼티 key를 반환함
    // 4. 한편, Object.keys()는 {enumerable: false}인 프로퍼티는 반환하지 않음 그래서 point만 출력됨
    ```

- `ownKeys()` 트랩이 호출되는 형태
  - `Object.getOwnPropertyNmaes()`
  - `Object.getOwnPropertySymbols()`
  - `Object.keys()`
  - `Reflect.ownKeys()`

<br>

## 5. getOwnPropertyDescriptor()

- `Object.getOwnPropertyDescriptor()` 트랩임

  - 프로퍼티 디스크립터를 반환함

    ```tsx
    const target = {};
    Object.defineProperty(target, 'point', {
      value: 100,
      configurable: true,
    });

    const handler = {
      getOwnPropertyDescriptor(target, key) {
        const desc = Object.getOwnPropertyDescriptor(target, key);

        if (desc.configurable) {
          return { value: 300, configurable: true };
        }
        return desc;
      },
    };

    const obj = new Proxy(target, handler);

    console.log(Object.getOwnPropertyDescriptor(obj, 'point')); // {value: 300, writable: false, enumerable: false, configurable: true}

    // 1. console.log(Object.getOwnPropertyDescriptor(obj, "point")); 트랩이 호출됨
    // 2. 트랩: if(desc.configurable){...} 디스크립터의 configurable 값이 true이면 value 속성 값을 바꾸어 반환함
    // 3. point 프로퍼티 {configurable: true}이므로 트랩에서 값을 바꾸어 반환할 수 있음 {configurable: false} 일 때는 바꿀 수 없음
    ```

- `getOwnPropertyDescriptor()` 트랩이 호출되는 형태
  - `Object.getOwnPropertyDescriptor()`
  - `Reflect.getOwnPropertyDescriptor()`

```toc

```
