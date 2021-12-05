---
emoji: 👨‍💻
title: this 참조 오브젝트, Proxy 핸들러의 get() 트랩
date: '2021-12-06 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 this 참조 오브젝트, Proxy 핸들러의 get() 트랩
</h1>

<br>

## 1. get()

- `target` 의 프로퍼티 값을 반환함
- `target` 의 `getter` 와 차이 임

  - `receiver` 에 `this` 로 참조할 오브젝트 작성

    ```tsx
    const target = {
      point: 100,
      get getPoint() {
        return this.point + 500;
      },
    };

    console.log(target.getPoint); //  600
    console.log(Reflect.get(target, 'getPoint')); // 600

    const that = { point: 300 };

    console.log(Reflect.get(target, 'getPoint', that)); // 800

    // 1. console.log(target.getPoint); getter이므로 target의 getPoint()가 호출 됨, getPoint()에서 this가 target을 참조함
    // 2. Reflect.get(target, "getPoint") target의 getPoint()가 호출됨, getPoint()에서 this가 target을 참조함
    // 3. Reflect.get(target, "getPoint", that) 3번째 파라미터에 that을 작성했음, getPoint()에서 this가 that을 참조함
    // 4. this로 참조하는 오브젝트를 바꿀 수 있음
    ```

- `Proxy` 핸들러의 `get()` 트랩에서 `target[key]` 로 값을 구하는 형태

  ```tsx
  const target = {
  	point: 100,
  	get getPoint() {
  		return this.point + 500;
  	}
  };

  cosnt handler = {
  	get(target, key, receiver) {
  		return target[key];
  	}
  };

  const proxy = new Proxy(target, handler);
  console.log(Reflect.get(proxy, "getPoint"));    // 600

  const that = {point: 200};
  console.log(Reflect.get(proxy, "getPoint", that));   // 600

  // 1. Reflect.get(proxy, "getPoint") get() 트랩이 호출됨
  // 2. 트랩: get(target, key, receiver){...}, target 오브젝트, "getPoint"가 설정되고 receiver에 Proxy 인스턴스가 설정됨
  // 3. 트랩: return target[key], getPoint()를 호출함
  // 4. get getPoint(){return this.point + 500;}, getPoint()에서 this가 target을 참조함, this.point 값은 100
  // 5. Reflect.get(proxy, "getPoint", that); 3번째 파라미터에 that을 작성함, getPoint()에서 this가 that을 참조하지 않고 target을 참조함
  // 6. 한편, get() 트랩을 작성하지 않으면 getPoint()에서 this가 that을 참조함 200과 500을 더해 700이 됨
  ```

- `get()` 트랩에서 `Reflect.get()` 을 사용한 형태

  ```tsx
  const target = {
  	point: 100,
  	get getPoint() {
  		return this.point + 500;
  	}
  };

  cosnt handler = {
  	get(target, key, receiver) {
  		return Reflect.get(target, key, receiver);
  	}
  };

  const proxy = new Proxy(target, handler);
  const that = {point: 200};

  console.log(Reflect.get(proxy, "getPoint", that));  // 700

  // 1. Reflect.get(proxy, "getPoint", that), 3번째 파라미터에 that을 작성함
  // 2. 트랩: get(target, key, receiver){...}, receiver에 {point: 200}이 설정됨
  // 3. 트랩: return Reflect.get(target, key, receiver); target의 getPoint()가 호출됨
  // 4. getPoint()에서 this가 receiver의 {point: 200}을 참조함
  // 5. 결과적으로 target.getPoint로 값을 구하는 것은 that을 사용할 수 없으므로 확장성 떨어짐
  // 6. Reflect.get(proxy, "getPoint", that)과 return Reflect.get(target, key, receiver); 를 사용하면 일련의 코드를 변경하지 않아도 됨
  // 7. 상황에 따라 get() 트랩에서 return 값을 바꿀 수 있음
  ```

```toc

```
