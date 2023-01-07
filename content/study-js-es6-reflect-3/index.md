---
emoji: 👨‍💻
title: this 참조 오브젝트, Proxy 핸들러의 set() 트랩
date: '2021-12-07 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 this 참조 오브젝트, Proxy 핸들러의 set() 트랩
</h1>

<br>

## 1.set()

- `target` 에 프로퍼티 키와 값을 설정함
- `true, fasle` 를 반환함

  ```tsx
  const target = {
    point: 100,
  };

  console.log((target.point = 200)); // 200
  console.log(Reflect.set(target, 'point', 300)); // true
  console.log(target.point); // 300

  // 1. console.log(target.point = 200); setter는 point에 설정한 값을 반환함
  // 2. Reflect.set(target, "point", 300) target에 point가 있으면 300으로 대체하고 없으면 추가 함 이것은 setter와 같음
  // 3. 한편, set()은 처리를 성공하면 true를 반환하고 실패하면 false를 반환함
  // 4. 에러로 프로그램이 중단되는 것을 방지할 수 있음
  ```

- `this` 로 참조할 오브젝트 작성

  ```tsx
  const target = {
    point: 100,
    set setPoint(key) {
      target[key] = this.point + 500;
    },
  };

  target.setPoint = 'point';
  console.log(target.point); // 600

  const that = { point: 300 };
  Refelct.set(target, 'setPoint', 'point', that);

  console.log(target.point); // 800

  // 1. target.setPoint = "point"; setPoint()가 호출되며 "point"가 프로퍼티 값으로 넘어 감
  // 2. setPoint()에서 this가 target을 참조함, target.point = (100 + 500) 형태가 됨
  // 3. Refelct.set(target, "setPoint", "point", that); 4번째 파라미터에 that을 작성함, setPoint()에서 this가 that을 참조함, target.point = (300 + 500) 형태가 됨
  ```

- `Proxy` 핸들러의 `set()` 트랩 호출

  ```tsx
  const target = {
    point: 100,
    set setPoint(key) {
      target[key] = this.point + 500;
    },
  };

  const handler = {
    set(target, key, value, receiver) {
      Reflect.set(target, key, value, receiver);
    },
  };

  const proxy = new Proxy(target, handler);
  proxy.setPoint = 'point';

  console.log(target.point); // 600

  // 1. proxy.setPoint = "point"; set() 트랩이 호출됨
  // 2. 트랩: set(target, key, value, receiver){...} target 파라미터에 target이 설정됨 key에 setPoint가 설정되고 value에 point가 설정됨 receiver에 Proxy 인스턴스가 설정됨
  // 3. 트랩: Reflect.set(target, key, value, receiver) setPoint()를 호출 함, setPoint()에서 this가 receiver(Proxy)를 참조하며 Proxy.[[target]].point 값을 사용함
  ```

- `set()` 트랩에서 `this` 참조 변경

  ```tsx
  const target = {
    point: 100,
    set setPoint(key) {
      target[key] = this.point + 500;
    },
  };

  const handler = {
    set(target, key, value, receiver) {
      Reflect.set(target, key, value, receiver);
    },
  };

  const proxy = new Proxy(target, handler);
  const that = { point: 300 };
  Reflect.set(proxy, 'setPoint', 'point', that);

  console.log(target.point); // 800

  // 1. Reflect.set(proxy, "setPoint", "point", that); 4번째 파라미터에 that을 작성함, set() 트랩이 호출 됨
  // 2. 트랩: set(target, key, value, receiver) {...}, receiver에 that 오브젝트가 설정됨
  // 3. 트랩: Reflect.set(target, key, value, receiver); setPoint()를 호출 함
  // 4. target[key] = this.point + 500; this가 receiver를 참조하며, receiver는 that임 this.point에서 {point: 300}을 사용함
  ```

```toc

```
