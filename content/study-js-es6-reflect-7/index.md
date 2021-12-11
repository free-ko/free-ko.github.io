---
emoji: 👨‍💻
title: Reflect - construct(), apply()
date: '2021-12-11 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 construct(), apply()
</h1>

<br>

## 1. constructo()

- 인스턴스를 생성하여 반환함

- `Reflect.construct(target, params)` 형태

  ```tsx
  class Point {
    constructor(one, two) {
      this.point = one + two;
    }
  }

  const obj = Reflect.construct(Point, [100, 200]);
  console.log(obj.point); // 300

  // 1. Reflect.construct(Point, [100, 200], Point 클래스의 constructor()를 호출 함, [100]처럼 값이 하나라도 배열로 작성함
  // 2. constructor(one, two){...} 100이 one에 200이 two에 설정됨
  // 3. Point 인스턴스를 생성하여 반환함
  ```

- 세 번째 파라미터는 선택임

  - 생성자 함수를 작성함
  - 작성한 함수로 인스턴스를 생성함

    ```tsx
    class Point {
      constructor(point) {
        this.point = point;
      }

      getPoint() {
        return this.point;
      }
    }

    class Book {
      getTitle() {
        return 'JS: ' + this.point;
      }
    }

    const obj = Reflect.construct(Point, [100], Book);

    console.log(obj.getPoint); // undefined
    console.log(obj.getTitle()); // JS: 100

    // 1. Reflect.construct(Point, [100], Book); 3번째 파라미터에 Book 클래스를 작성함, Point 클래스의 constructor가 호출됨
    // 2. constructor(point){ this.point = point; } Point가 아니라 Book으로 인스턴스를 생성함, this가 Book 클래스를 참조함
    // 3. this.point = point; point가 인스턴스 프로퍼티로 설정됨
    // 4. 외부 API 사용처럼 변경할 수 없는 환경에서 클래스의 프로퍼티를 인스턴스 프로퍼티로 사용하면서 클래스의 prototype을 오버라이드하는 형태로 사용할 수 있음
    // 5. obj.getPoint, obj 인스턴스에 getPoint()가 없으므로 undefined 출력
    // 6. obj.getTitle() Bookd의 getTitle()이 호출됨
    ```

- `핸들러의 constrcut()` 트랩 호출

  ```tsx
  class Point {
    constructor(...point) {
      this.point = point;
    }

    getPoint() {
      return this.point;
    }
  }

  const handler = {
    construct(target, params, proxy) {
      return Reflect.construct(target, params);
    },
  };

  const proxy = new Proxy(Point, handler);
  const obj = Reflect.construct(proxy, [1, 2]);
  console.log(obj.getPoint()); // [1, 2]

  // 1. const obj = Reflect.construct(proxy, [1, 2]); construct() 트랩이 호출됨
  // 2. 트랩: construct(target, params, proxy) {...} Point 클래스가 target에 [1, 2]가 params에 설정됨, proxy에 Proxy 인스턴스가 설정됨
  ```

<br>

## 2. apply()

- `target` 에 작성한 함수를 호출함
- `Relfect.apply(target, {}, key)` 형태

  ```tsx
  function add(...values) {
    return values.map((value) => {
      return value + this.plus;
    });
  }

  console.log(Reflect.apply(add, { plus: 100 }, [1, 2])); // [101, 102]

  // 1. Reflect.apply(add, {plus: 100}, [1,2]) add() 함수를 호출함
  // 2. function add(...values){...} [1,2]가 values 파라미터에 설정됨
  // 3. map()에서 this가 {plus: 100}을 참조함, 코드처럼 화살표 함수를 사용해야 함, map(function(value){...}) 형태는 this가 window를 참조함
  ```

- `call(), apply()` 통합

  ```tsx
  const indexOf = String.prototype.indexOf;

  console.log(indexOf.call('ABC', 'B')); // 1
  console.log(Reflect.apply(indexOf, 'ABC', ['B'])); // 1

  // 1. const indexOf = String.prototype.indexOf; String.prototype.indexOf() 메소드 임
  // 2. call()로 호출 indexOf.call("ABC", "B");
  // 3. Reflect.apply()로 호출, Reflect.apply(indexOf, "ABC", ["B"]) call()과 apply()를 통합하여 Reflect.apply()로 호출함
  ```

- 핸들러의 `apply()` 트랩 호출

  ```tsx
  function add(...values) {
    return values.map((value) => {
      return value + this.plus;
    });
  }

  const handler = {
    apply(target, that, params) {
      return Reflect.apply(target, that, params);
    },
  };

  const obj = new Proxy(add, handler);

  console.log(obj.apply({ plus: 100 }, [1, 2])); // [101, 102]

  // 1. const obj = new Proxy(add, handler); add가 apply() 트랩에서 호출할 함수임
  // 2. obj.apply({plus: 100}, [1, 2]) apply() 트랩이 호출 됨
  // 3. 트랩: apply(target, that, params) {...}, add() 함수가 target에 설정됨 {plus:100}이 that에 설정되고 [1,2]가 params에 설정됨
  ```

```toc

```
