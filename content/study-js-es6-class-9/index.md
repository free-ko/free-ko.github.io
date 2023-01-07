---
emoji: 👨‍💻
title: this 참조, Generator
date: '2021-11-23 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  this 참조, Generator
</h1>

<br>

## 1. this 참조

- `인스턴스.메소드()` 형태로 호출하면 메소드에서 `this`가 인스턴스를 참조 함
- `static` 메소드에서 `this` 는 메소드가 속한 클래스를 참조함

  ```tsx
  class Point {
    static setPoint(point) {
      this.value = vapoint;
    }
  }

  Point.setPoint(100);

  console.log(Point.value); // 100
  console.log(new Point().value); // undefined

  // 1. class Point 엔진이 class 키워드를 만나면 클래스 오브젝트를 만듬
  // 2. this.value = point; this가 메소드를 호출한 오브젝트를 참조함, 즉 this가 Point 클래스를 참조하므로 Point 클래스에 {valeu: 100} 형태로 설정됨
  // 3. Point.value Point 클래스에서 value 값을 구하게 되며 100이 반환됨
  // 4. new Point().value Point 인스턴스를 생성하고 value 값을 구하면 undefined 반환됨
  // 5. Point 클래스에 설정된 value 프로퍼티는 생성한 인스턴스에 포함되지 않음
  ```

- `static property`

  ```tsx
  class Point {
    static value = 100;
  }

  console.log(Point.value); // 100

  Point.bonnus = 300;

  console.log(Point.bonnus); // 300
  console.log(new Point().value); // undefined

  // 1. static value = 100; 값을 static property에 설정함
  // 2. ES2020 기준으로 스펙 제안 단계임 하지만 대부분의 브라우저에서 지원 함
  // 3. Point.value Point 클래스와 static 프로퍼티로 값을 구함
  // 4. Point.bonnus = 300; Point 클래스에 static 프로퍼티로 설정되며 {bonnus: 300} 형태임
  // 5. Point.bonnus Point 클래스와 static 프로퍼티로 값을 구함
  // 6. new Point().value Point 인스턴스를 생성하고 value 값을 구하면 undefined가 반환됨
  // 7. Point 클래스의 static 프로퍼티는 생성한 인스턴스에 포함되지 않음
  ```

- `constructor`에서 `this.construcotr` 는 생성하는 인스턴스가 아니라 클래스 오브젝트를 참조 함

  ```tsx
  class Point {
    constructor() {
      console.log(this.constructor.get());
    }
    static get() {
      return 100;
    }
  }

  new Point(); // 100

  // this.constructor.get() thisconstructor가 Point 클래스를 참조하므로 static 메소드를 호출할 수 있음
  ```

  <br>

## 2. Generator

- 클래스의 제너레이터 함수는 `prototype`에 연결됨, 인스턴스로 호출해야 함

  ```tsx
  class Point {
    getPoint() {
      yield 10;
      yield 20;
    }
  }

  const gen = new Point();
  const obj = gen.getPoint();

  console.log(obj.next());
  console.log(obj.next());
  console.log(obj.next());

  // 1. const obj = gen.getPoint(); 인스턴스의 제너레이터 함수를 호출하면 이터레이터 오브젝트를 생성하여 반환
  // 2. obj.next()를 실행할 때마다 yield에서 실행결과 처럼 반환함

  // 실행결과
  // {value: 10, done: false}
  // {value: 20, done: false}
  // {value: undefined, done: true}
  ```

```toc

```
