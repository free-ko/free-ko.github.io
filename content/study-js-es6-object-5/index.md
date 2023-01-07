---
emoji: 👨‍💻
title: prototype와 proto, 메소드 호출 방법
date: '2021-09-26 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  prototype와 proto, 메소드 호출 방법
</h1>

<br>

## 메소드 호출 방법

- `prototype`과 `__proto__`에 연결된 메소드를 호출하는 방법이 다름
- `prototpye`에 연결된 메소드 호출

  - `Array.prototype.slice()` 처럼 `prototype`을 작성하여 호출

  ```tsx
  function Book() {
    this.point = 100;
  }

  Book.prototype.getPoint = function () {
    console.log(Object.is(this, Book.prototype));
    return this.point;
  };

  console.log(Book.prototype.getPoint());
  console.log(Book.prototype.getPoint.call(Book));

  // 결과
  // true
  // undefined
  // false
  // undefined

  // 1. Book.prototype.getPoint() prototype을 작성하여 호출하면 getPoint()에서 this가 Book.prototype을 참조
  // 2. Book.prototype.getPoint.call(Book) this가 Book을 참조함
  // 3. this.point를 참조하려면 인스턴스를 생성하고 인스턴스의 메소드를 호출해야함
  ```

<br>

- `__proto__`에 연결된 메소드 호출

  - 인스턴스를 생성하여 호출
  - `new` 연산자로 생성한 인스턴스 구조

  ```tsx
  function Book() {
    this.point = 100;
  }

  Book.prototype.getPoint = function () {
    return this.point;
  };

  const obj = new Book();
  /*
  	1. 오른쪽 obj를 펼치면
  	- point: 100이 있으며 인스턴스 프로퍼티임
  	- 생성자 함수에서 this.point = 100으로 설정한 것
  
  	2. __proto__를 펼치면
  	- prototype에 연결된 메소드가 표시됨
  	- getPoint는 Book.prototype.getPoint를 참조함
  	- __proto__에 복사하지 않음
  */

  console.log(obj.getPoint());
  /*
  	1. 생성한 인스턴스 이름을 사용하여
  	- getPoint() 메소드를 호출하면
  	- 호출된 메소드에서 this로 인스턴스를 참조 할 수 있음
  */
  ```

```toc

```
