---
emoji: 👨‍💻
title: set(), set() 트랩 호출, set() 트랩 준수사항
date: '2021-11-28 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 set(), set() 트랩 호출, set() 트랩 준수사항
</h1>

<br>

## 1. set()

- 프로퍼티를 설정하는 트랩으로 `target` 또는 `receiver` 에 프로퍼티(key, value)를 설정 함
- `set()` 트랩을 작성하지 않은 형태

  ```tsx
  const target = {};
  const obj = new Proxy(target, {});
  obj.point = 100;

  console.log(obj.point); // 100

  // 1. obj.point = 100; 100을 point에 할당하므로 setter임
  // 2. set() 트랩을 작성하지 않았으므로 target 오브젝트의 [[Set]]이 호출되며 파라미터 값으로 point와 100을 넘겨 줌
  // 3. [[Set]]에서 {point: 100} 형태로 target 오브젝트에 설정함
  // 4. obj.point; get() 트랩을 작성하지 않았으므로 target 오브젝트의 [[Get]]이 호출됨
  // 5. 이것은 Proxy를 사용하지 않아도 됨
  ```

- `set()` 트랩이 호출되면 엔진이 실행 환경을 분석하여 파라밑터 값을 설정 함

  ```tsx
  const target = {};
  const handler = {
    set(target, key, value, receiver) {
      target[key] = value + 200;
    },
  };

  const obj = new Proxy(target, handler);
  obj.point = 100;

  console.log(obj.point); // 300

  // 1. obj.point = 100; 을 실행하면 set() 트랩이 호출 됨
  // 2. 트랩: set(target, key , value, receiver){...} 엔진이 target 파라미터에 target 오브젝트를 설정 함
  // 3. key 파라미터에 "point"를 설정하고 value 파라미터에 100을 설정함
  // 4. receiver 파라미터에 Proxy 또는 Proxy를 상속받은 오브젝트를 설정 함
  // 5. 파라미터 이름으로 값을 매핑하지 않고 파라미터 순서로 매핑함, 이름을 자유롭게 사용할 수 있음
  ```

<br>

## 2. set() 트랩 호출

- 아래처럼 값을 할당하면 `set()` 트랩이 호출 됨
- 프로퍼티에 값을 할당할 때 `proxy[key] = 100`
- `Object.create(proxy, {프로퍼티})`

  - 인스턴스에 없는 프로퍼티를 설정할 때

    ```tsx
    const target = {};
    const handler = {
      point: 700,
      set(target, key, value, receiver) {
        target[key] = value + 200;
      },
    };

    const proxy = new Proxy(target, handler);
    const obj = Object.create(proxy, {
      bonus: { value: 500, writable: true },
    });

    obj.point = 100;

    console.log(obj.point); // 300

    // 1. const obj = Object.create(proxy, {...}); proxy 인스턴스를 상속받아 인스턴스를 생성함
    // 2. proxy 인스턴스에 연결된 handler와 target을 사용할 수 있음
    // 3. bonus: {value: 500, writable: true}	obj 인스턴스 프로퍼티로 값을 설정함, 즉 obj.bonus에 500이 설정됨
    // 4. obj.point = 100; obj 인스턴스 프로퍼티로 point가 없음 set() 트랩이 호출됨
    // 5. 트랩: target[key] = value + 200; target에 {point: 300}을 설정함
    // 6. obj.point, obj 인스턴스 프로퍼티로 point를 검색함 point가 없음
    // 7. target에 point를 검색함 point 값인 300이 반환됨
    // 8. handler에서 point를 검색하지 않음 {point: 700}이 있지만 반환되지 않음, {point: 700}이 있지만 반환되지 않음
    ```

  - 인스턴스에 있는 프로퍼티를 설정 할 때

    ```tsx
    const target = {};
    const handler = {
      set(target, key, value, receiver) {
        target[key] = value + 200;
      },
    };

    const proxy = new Proxy(target, handler);
    const obj = Object.create(proxy, {
      point: { value: 100, writable: true },
    });

    obj.point = 700;

    console.log(obj.point); // 700
    console.log(target.point); // undefined

    // 1. const obj = Object.create(proxy, {...}); proxy 인스턴스를 상속받아 인스턴스를 생성함
    // 2. point: {value: 100, writabel: true} obj 인스턴스 프로퍼티로 값을 설정함. 즉, obj.point에 100이 설정됨
    // 3. obj.point = 700; obj 인스턴스 프로퍼티 point가 있음 set() 트랩이 호출되지 않음
    // 4. {point: 100}이 obj 인스턴스 프로퍼티로 설정되고 obj.__proto__에 handler와 target이 설정되므로 point를 먼저 인식하기 때문임
    // 5. {point: 100}의 value 값을 700으로 변경함
    // 6. 값을 바꾸려면 {writable: true} 이여야 함, ES5 "프로퍼티 디스크립트" 참고
    // 7. obj.point obj 인스턴스 프로퍼티인 point 값을 반환함, 바뀐 값인 700이 출력됨
    // 8. target.point target 오브젝트에 point 프로퍼티가 없으므로 undefined가 출력됨
    ```

- `Reflect.set()`
- `set()` 트랩에서 `target` 값을 설정해야 함

  ```tsx
  const target = {};
  const handler = {
    set(target, key, value, receiver) {
      // target[key] = value + 200;
    },
  };

  const proxy = new Proxy(target, handler);

  obj.point = 100;
  console.log(obj.point); // undefined

  // 1. 트랩 : set(target, key, value, receiver) {...} set() 트랩에서 파라미터로 받은 {point: 100}이 target 오브젝트에 자동으로 설정되지 않음
  // 2. set() 트랩에서 target 오브젝트에 {key: value}를 설정해야 함, 값 설정이 setter의 기본 오퍼레이션임
  // 3. console.log(obj.point); obj 인스턴스 전체에 point가 없으므로 undefined가 출력됨
  ```

<br>

## 3. set() 트랩 준수사항

- 트랩 준수 사항(invariant)
  - 트랩에서 준수 사항을 지키지 않으면 에러가 발생하거나 처리되지 않음
  - 모든 트랩에 준수 사항이 있음
- `target` 의 프로퍼티가 `data` 디스크립터 일 때

  - `[[Writable]]: flase` 또는 `[[Configurable]]: false` 이면 프로퍼티 값을 설정할 수 없음

    ```tsx
    const target = {};

    Object.definePropert(target, 'point', {
      value: 500,
      writable: false,
    });

    const handler = {
      set(target, key, value, receiver) {
        target[key] = value + 200;
      },
    };

    const obj = new Proxy(target, handler);

    console.log((obj.point = 100)); // 100
    console.log(obj.point); // 500

    // 1. {writable: false}가 디폴트이지만 설명을 위해 작성함
    // 2. 트랩: target[key] = value + 200;에서 point 프로퍼티가 {writable: false}이므로 point 프로퍼티 값을 변경할 수 없음
    // 3. 그렇다고 에러가 발생하지 않음 {obj.point = 100}에서 100이 반환됨
    // 4. console.log(obj.point); obj.point의 초깃값인 500이 출력됨
    ```

- `target` 의 프로퍼티가 악세서 디스크립터 일 때
  - `[[Configurable]]: false` 이면 프로퍼티 값을 설정 할 수 없음

```toc

```
