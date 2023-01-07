---
emoji: 👨‍💻
title: has() 트랩, deleteProperty() 트랩
date: '2021-12-01 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 has() 트랩, deleteProperty() 트랩
</h1>

<br>

## 1. has()

- `in` 연산자의 트랩임

  - `target` 에 `key` 의 존재 여부를 반환함
  - 프로퍼티 값을 `true/false`로 변환하여 반환함

    ```tsx
    const target = { point: 100 };
    const handler = {
      has(target, key) {
        return target[key];
      },
    };

    const obj = new Proxy(target, handler);

    console.log('point' in obj); // true
    console.log('booK' in obj); // false

    // 1. console.log("point" in obj); has() 트랩이 호출됨
    // 2. has(target, key){...} target이 target에, "point"가 key에 설정됨
    // 3. return target[key]; target에 point가 있으며 값은 100임
    // 4. 이때, 100을 그대로 return하지 않고 true/false로 변환하여 return함
    // 5. 100은 true로 변환하므로 true를 반환함 0을 true/false로 변환하여 false임
    // 6. console.log("booK" in obj); obj에 book이 없지만, has() 트랩을 호출함
    // 7. return target[key]; undefined를 반환하게 되지만 undefined를 false로 변환하여 반환 함
    ```

  - 두 번째 파라미터에 `Symbol` 작성 가능

<br>

## 2. has() 트랩 호출

- `has()` 트랩이 호출되는 형태

  - `key in proxy`
  - `ke in Object.create(proxy, {프로퍼티})`

    ```tsx
    const target = { point: 600, bonus: 100 };
    const handler = {
      has(target, key) {
        return target[key];
      },
    };

    const proxy = new Proxy(target, handler);
    const obj = Object.create(proxy, {
      point: { value: 500 },
    });

    console.log('point' in obj); // true
    console.log('bonus' in obj); // true

    // 1. console.log("point" in obj); obj 인스턴스 프로퍼티로 point가 있으므로 has() 트랩을 호출하지 않음
    // 2. point 값 500을 반환하지 않고 true/false로 변환하여 반환하므로 ture가 반환됨
    // 3. console.log("bonus" in obj); obj 인스턴스 프로퍼티로 bonus가 없으므로 has() 트랩을 호출 함
    // 4. has() 트랩에서 target[key]의 값은 100이며 100을 true/false로 변환하면 true임
    ```

  - `Reflect.has()`

<br>

## 3. has() 트랩 준수사항

- 오브젝트에 프로퍼티가 있으면서
  - 오브젝트가 프로퍼티 추가 금지이거나 `[[Configurable]]: flase` 이면
  - `false` 를 지정하여 반환할 수 없지만 `ture` 는 지정하여 반환 할 수 있음
- 강제로 `ture/false` 를 반환하지 않고 `has()` 트랩에서 구한 값을 `ture/false` 로 변환하여 반환 함

  ```tsx
  const target = { point: 100 };
  Object.preventExtensions(target);

  const handler = {
    has(target, key) {
      consle.log('has 트랩 실행');
      // return false;
      return target[key];
    },
  };

  const obj = new Proxy(target, handler);

  console.log('point' in obj);

  // 1. Object.preventExtensions(target); target 오브젝트를 프로퍼티 추가 금지 상태로 설정함
  // 2. console.log("point" in obj); 추가 금지 상태라도 has() 트랩이 호출 됨
  // 3. // reuturn false; 추가 금지 상태에서 false를 지정하여 반환하면 에러가 발생함 그래서 주석으로 처리 했음
  // 4. return target[key]; has() 트랩에서 구한 값을 true/false로 변환하여 반환하면 에러가 나지 않음

  // 실행결과
  // has 트랩 실행
  // true
  ```

<br>

## 4. deleteProperty()

- `delete` 연산자의 트랩임

  - 오브젝트의 프로퍼티를 삭제함

    ```tsx
    const target = { point: 100 };
    const handler = {
      deleteProperty(target, key) {
        if (key in target) {
          delete target[key];
          return ture;
        }

        return false;
      },
    };

    const obj = new Proxy(target, handler);

    console.log(delete obj.point); // true
    console.log(target.point); // undefined
    console.log(delete obj.point); // false
    console.log(delete target.point); // true

    // 1. console.log(delete obj.point) deleteProperty() 트랩이 호출 됨
    // 2. if(key in target) {...} target 오브젝트에 point 프로퍼티가 있으므로 point 프로퍼티를 삭제하고 ture를 반환함
    // 3. console.log(target.point) 트랩에서 point 프로퍼티를 삭제했으므로 undefined가 출력됨
    // 4. console.log(delete obj.point); deleteProperty() 트랩이 호출됨 트랩에서 target에 point 프로퍼티가 없으므로 false를 반환 함
    // 5. console.log(delete target.point); deleteProperty() 트랩이 호출되지 않음 [[Delete]]가 호출됨 일반적으로 delete 처리임
    ```

- `delete` 연산자는 프로퍼티가 없어도 `true`를 반환하므로 코드처럼 조건을 체크하여 `true/false`를 반환하면 완전하게 처리할 수 있음

<br>

## 4. deleteProperty() 트랩 호출

- `deleteProprerty()` 트랩이 호출되는 형태
  - `delete[key]`
  - `Reflect.deleteProperty()`

<br>

## 5. deleteProperty() 트랩 준수사항

- `target` 오브젝트의 프로퍼티가

  - `[[Configurable]]: false` 이면 프로퍼티를 삭제할 수 없으며 에러가 발생함

    ```tsx
    const target = {};
    Obje.ctdefinedProperty(target, "point", {
    	value: 500,, configurable: flase
    });

    const handler = {
    	deleteProperty(target, key) {
    		const descriptor = Object.getOwnPropertyDescriptor(target, key);

    		if(descriptor.configurable) {
    			delete target[key];
    			return true;
    		};

    		return false;
    	}
    };

    const obj = new Proxy(target, handler);
    console.log(delte obj.point);   // false

    // 1. console.log(delete obj.point) deleteProeprty() 트랩이 호출됨
    // 2. Object.getWonPropertyDescriptor(target, key); point 프로퍼티의 디스크립터를 구함
    // 3. if(descriptor.configurable){...} configurable이 ture이면 삭제할 수 있으며 point 프로퍼티를 삭제하고 true를 반환함
    // 4. 한편, {configurable: false}이므로 false를 반환함
    ```

```toc

```
