---
emoji: 👨‍💻
title: getter, setter, static 메소드, 호이스팅
date: '2021-11-19 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  getter, setter, static 메소드, 호이스팅
</h1>

<br>

## 1. getter

- `getter` 는 메소드를 호출하여 값을 구함

  - 메소드를 호출 할 때는 `name()` 처럼 소괄호`()` 를 작성하지만 `getter` 는 소괄호`()` 를 작성하지 않고 `name`만 작성함
  - 파라미터를 사용 할 수 없음

- 클래스에 `getter` 작성하는 방법

  ```tsx
  class Point {
    constructor(point) {
      this.point = point;
    }

    get getPoint() {
      return this.point;
    }
  }

  const obj = new Point(100);

  console.log(obj.getPoint); // 100

  // 1. get getPoint(){...} getter는 메소드 이름 앞에 get을 작성함
  // 2. console.log(obj.getPoint) getter 이름을 작성하면 getter가 호출됨
  // 3. getter 에서 100을 반환 함
  ```

<br>

## 2. setter

- `setter` 는 메소드를 호출하여 값을 설정 함

  - `setter`도 `getter` 처럼 소괄호`()` 를 작성하지 않고 이름만 작성함

- 클래스에 `setter` 작성 방법

  ```tsx
  class Point {
    set setPoint(point) {
      this.point = point;
    }
  }

  const obj = new Point();
  obj.setPoint = 100;

  console.log(obj.point); // 100

  // 1. set setPoint(point){...} setter는 메소드 이름 앞에 set을 작성함
  // 2. obj.setPoint = 100; 값을 setter에 할당하면 setter가 호출되며 할당하는 값 100을 파라미터로 넘겨줌
  ```

<br>

## 3. static 메소드

- Syntax : `static name(){...}`

- `static` 메소드 작성 방법

  ```tsx
  class Point {
    static getPoint() {
      return 100;
    }
  }

  console.log(Point.getPoint()); // 100

  // 1. static getPoint(){} 메소드 이름 앞에 static을 작성함, 정적 메소드라고 부름
  // 2. Point.getPoint() Point 클래스 이름에 이어서 getPoint()를 작성함 그러면 getPoint()가 호출됨
  // 3. 인스턴스의 메소드로 호출하지 않음
  // 4. 호출하는 방법이 다르므로 ES5에서는 함수와 메소드를 구분했지만 ES6에서는 static 메소드로 구분해야 함
  // 5. 클래스만 static을 사용할 수 있음
  ```

- `static` 메소드의 구조적 특징

  - `prototype` 이 아닌 클래스에 연결되며 생성한 인스턴스에 할당되지 않음

    ```tsx
    class Point {
      static getPoint() {
        return 100;
      }
    }

    const obj = new Point();

    console.log(obj.getPoint); // undefined

    // 1. static getPoint(){...} 엔진이 Point 오브젝트를 만들면서 static 메소드를 Function 오브젝트로 만듬
    // 2. 그러므로 Point.getPoint() 형태로 호출할 수 있음
    // 3. const obj = new Point(); obj 인스턴스에 static 메소드가 설정되지 않음
    // 4. obj 인스턴스에 getPoint가 없으므로 undefined가 출력됨
    ```

<br>

## 4. 호이스팅

- 클래스는 호이스팅 되지 않음

  - `const`, `let` 변수처럼 `class` 키워드가 작성된 위치에서 클래스 이름 선언과 오브젝트 생성을 동시에 하기 때문

    ```tsx
    try {
      const obj = Point;
    } catch {
      console.log('호이스팅 불가');
    }

    class Point {
      static getPoint() {
        return 100;
      }
    }

    console.log(Point.getPoint());

    // 실행 결과
    // 호이스팅 불가
    // 100
    ```

- `const obj = Point;` 코드 아래에 `Point` 클래스가 있지만 `Point` 를 참조하지 못하므로 에러 발생
- `Point.getPoint();`
  - 코드 앞에서 `Point` 클래스를 오브젝트로 생성하므로 `getPoint()` 를 호출할 수 있음

<br>

## 5. new.target

- `[new.target](http://new.target)` 프로퍼티는 함수 또는 생성자가 `new` 연산자로 호출된 여부를 반환함

- `new` 연산자로 `constructor`를 호출하면 `new.target` 은 `constructor`를 참조

  ```tsx
  class Point {
    constructor() {
      console.log(new.target.name);
    }
  }

  new Point();

  // 1. new Point() constructor를 호출함
  // 2. new.target.name constructor에서 new.target은 constructor를 참조함
  // 3. 또한, constructor가 클래스를 참조하므로 name 프로퍼티 값으로 Point가 출력 됨
  ```

- 함수로 호출하면 `undefined` 반환

  ```tsx
  function book() {
    console.log(new.target);
  }

  book();

  // 1. book() new 연산자를 사용하지 않고 호출 됨
  // 2. new.target 함수로 호출 하면 new.target은 undefined를 반환
  ```

```toc

```
