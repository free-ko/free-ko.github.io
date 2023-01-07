---
emoji: 👨‍💻
title: getPrototypeof(), setPrototypeof() 트랩
date: '2021-12-03 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 getPrototypeof(), setPrototypeof() 트랩
</h1>

<br>

## 1. getPrototypeof()

- `[[GetPrototypeOf]]` 의 트랩임

  - `target` 의 `prototype`을 반환

    ```tsx
    class Point {
      getPoint() {
        return 100;
      }
    }

    const handler = {
      getPrototypeOf(target) {
        return target.prototype;
      },
    };

    const obj = new Proxy(Point, handler);
    const proto = Object.getPrototypeOf(obj);

    console.log(proto.getPoint); // getPoint(){return 100;}

    // 1. const obj = new Proxy(Point, handler); 첫 번째 파라미터에 Point 클래스를 작성했음, 트랩에서 Point.prototype을 구하기 위해서 obj.[[Target]]에서 Point 클래스가 설정됨
    // 2. const proto = Object.getPrototypeOf(obj); getProtytpeOf() 트랩이 호출됨
    // 3. 트랩: getPrototypeOf(target){} target에 Point 클래스가 설정됨
    // 4. 트랩: return target.prototype; Popoint.prototype을 반환함
    // 5. console.log(proto.getPoint); Point.prototype에 getPoint()가 있으므로 메소드 코드가 출력됨
    ```

  - `target` 이 확장 불가라도 `prototype`을 반환 함
  - `String`, `Number` 처럼 값을 반환하면 `TypeError`

- 트랩 준수 사항
  - `target` 이 확장 불가일 때
  - `Object.getPrototypeOf(target)` 와 같은 값을 반환해야 함

<br>

## 2. getPrototypeOf() 트랩 호출

- `getPrototypeOf()` 트랩이 호출되는 형태

  - `Object.getPrototypeOf()`
  - `__proto__`

    ```tsx
    class Point {
      getPoint() {
        return 100;
      }
    }

    const handler = {
      getPrototyepOf(target) {
        return this.list ? Array.prototype : target.prototype;
      },
    };

    const obj = new Proxy(Point, handler);
    handler.list = true;

    const proto = obj.__proto__;

    console.log(proto.map); // function map() {[native code]}

    // 1. handler.list = true; getPrototypeOf() 트랩에서 체크 값으로 사용함
    // 2. const proto = obj.__proto__, getPrototypeOf 트랩이 호출됨 트랩에서 Array.prototype을 반환함
    // 3. console.log(proto.map) map 메소드가 있으므로 코드가 출력됨
    // 4. 조건에 따라 반환되는 prototype을 바꿀 수 있음
    ```

  - `instanceof`

    ```tsx
    class Point {
    	getPoint(){return 100;}
    };

    const handler = {
    	getPrototypeOf(target) {
    		return Point.rptotype;
    	}
    };

    const target = new Point();
    console.log(targetinstanceof Point);  // true
    console.log(Point.prototype instanceof Point);   // false

    const obj = new Proxy(target, handler);
    console.log(obj instanceof Point);   // true

    // 1. console.log(target instanceof Point) target을 Point로 만들었으므로 true가 출력됨
    // 2. console.log(Point.protytpe instanceof Point) Point.prototype이 인스턴스가 아니므로 false가 출력됨
    // 3. console.log(obj instanceof Point) getPrototypeOf() 트랩이 호출됨 트랩에서 Point.prototype을 반환함
    // 4. (Point.prototype instanceof Point) 형태가 되므로 false가 출력되어야 하는데 ture가 출력됨
    ```

  - `Object.prototype.isPrototypeOf()`
  - `Reflect.getPrototypeOf()`

<br>

## 3. setPrototypeOf()

- `Object.setPrototypeOf()` 특징

  - `target`의 `__proto__` 에 두 번째 파라미터를 설정함

    ```tsx
    class Book {
      setTitle() {
        return '책';
      }
    }
    class Point {
      getPOint() {
        return '100';
      }
    }
    Object.setPrototypeOf(Book, Point.prototype);

    console.log(Book.prototype.getPOint); // undefined
    console.log(Book.__proto__.getPoint); // getPoint() {return 100;}

    const obj = new Book();
    console.log(obj.getPoint); // undefined

    // 1. Object.setPrototypeOf(Book, Point.rptotyep); Book.__proto__에 있는 Function.prototype이 Point.prototype으로 대체됨
    // 2. console.log(Book.prototype.getPoint) Book.__proto__에 설정되므로 undfined가 출력됨
    // 3. Book.__protot__.getPoint getPoint() 코드가 출력됨
    // 4. console.log(obj.getPoint) Book.prototype으로 인스턴스를 생성하므로 obj 인스턴스에 getPoint가 없음
    ```

- `Object.setPrototypeOf()` 의 트랩임

  ```tsx
  class Book {
    setTitle() {
      return '책';
    }
  }
  class Point {
    getPOint() {
      return '100';
    }
  }
  const handler = {
    setPrototypeOf(target, proto) {
      Object.setPrototypeOf(target, proto);
      return true;
    },
  };

  const obj = new Proxy(Book, handler);
  Object.setPrototypeOf(obj, Point.prototype);

  console.log(Book.prototype.getPoint); // undefined
  console.log(Book.__proto__.getPOint); // getPoint(){ return 100; }
  console.log(obj.getPoint); // getPoint(){ return 100; }

  // 1. Object.setPrototypeOf(obj, Point.prototype); setPrototypeOf() 트랩이 호출됨
  // 2. 트랩: setPrototypeOf(target, proto){...} target에 Book 클래스가 설정되고 proto에 Point.prototype이 설정됨
  // 3. 트랩: Ojbect.setPrototypeOf(target, proto); Book.__proto__와 obj.[[Target]].__proto__가 Point.prototype으로 대체됨
  // 4. true를 반환하지 않으면 에러가 발생함
  // 5. console.log(Book.prototype.getPoint) undefined가 출력되며, Point.prototype이 Book.prototype에 설정되지 않기 때문
  // 6. console.log(Book.__proto__.getPoint) getPoint 코드가 출력됨
  // 7. console.log(obj.getPoint) getPoint 코드가 출력되며 obj.[[Target]].__proto__에 getPoint가 있기 때문
  ```

- 트랩 준수 사항
  - `target` 이 확장 불가 일 때
  - 두 번째 파라미터의 `prototype`과 `Object.getPrototypeOf(target)`로 구한 것과 같아야 함

<br>

## 4. setPrototypeOf() 트랩 호출

- `setPrototypeOf()` 트랩이 호출되는 형태
  - `Object.setPrototypeOf()`
  - `Reflect.setPrototypeOf()`

```toc

```
