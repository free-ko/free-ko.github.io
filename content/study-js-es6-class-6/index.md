---
emoji: 👨‍💻
title: 상속, extends 키워드, 상속 구조, 메소드 오버라이딩
date: '2021-11-20 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  상속, extends 키워드, 상속 구조, 메소드 오버라이딩
</h1>

<br>

## 1. 상속

- 상속은 OOP 기능 중 하나 임

  - 클래스에 다른 클래스를 포함시키는 형태

  - 따라서 포함시킨 클래스의 메소드와 프로퍼티를 내 것처럼 사용 할 수 있음

- 상속해주는 클래스, 상속 받을 클래스를 부모 클래스, 슈퍼 클래스라고 부름

  - `super` 키워드로 슈퍼 클래스를 참조

- 상속 받는 클래스를 자식 클래스, 서브(`sub`) 클래스라고 부름

<br>

## 2. extends 키워드

- Syntax : `subCalss extends superClass {...}`

- `extends` 키워드로 상속을 구현 함
  ```tsx
  class Book {
    constructor(title) {
      this.title = title;
    }

    getTitle() {
      return this.title;
    }
  }

  class Point extends Book {
    setPoint(point) {
      this.point = point;
    }
  }

  const obj = new Point('책');
  console.log(obj.getTitle()); // 책

  // 1. 엔진이 extends 키워드를 만나면 Point 클래스에서 Book 클래스를 상속받아 구조적, 계층적인 형태로 만듬
  // 2. Book.prototype에 연결된 메소드를 Point.prototype에 구조적으로 연결함
  // 3. setPoint()는 Point 클래스의 메소드임
  ```
- 상속 구조
  ```tsx
  class Book {
    constructor(title) {
      this.title = title;
    }

    getTitle() {
      return this.title;
    }
  }

  // 엔진이 Book.prototype.getTitle() 형태로 만듬

  class Point extends Book {
    setPoint(point) {
      this.point = point;
    }
  }

  /*
  	1. Book {setPoint(point){...}}
  		- setPoint()는 Point 클래스드의 메소드이며
  		- Point.prototype에 연결됨
  
  	2. 엔진이 extends 키워드를 만나면
  		- Point 클래스에서 Book 클래스를 상속받아 서브와 슈퍼 구조를 만듬
  
  	3. Point.prototytpe.__proto__를 펼치면 getTitle()이 있으며
  		- Book.prototype에 연결된 메소드임
  
  	4. prototype.__proto__에 상속해주는 클래스의 prototype에 연결된 메소드를
  		- 구조적, 계층적으로 만듬, 이것이 상속임
  */

  // Point.__proto__를 펼치면 상속 받은 Book 클래스 전체가 표시됨

  const obj = new Point('책');
  /*
  	1. new Point("책")를 실행하면 우선 Point 클래스의 constructor를 호출함, 즉 Point.prototype의 constructor를 호출 함
  
  	2. 이어서 Book 클래스의 constructor를 호출하며 constructor에 파라미터 값인 "책"을 넘겨 줌
  */

  /*
  	1. obj를 펼치면 {title: "책"}이 있으며 이것은 인스턴스 프로퍼티 임
  
  	2. 이런 방법으로 인스턴스마다 고유의 프로퍼티 값을 가질 수 있음
  
  	3. 고유의 값을 갖는 것이 인스턴스 가장 큰 목적임
  
  	4. 상속이 클래스의 가장 큰 목적이 아님
  		- 상속은 인스턴스 프로퍼티를 지원하기 위한 수단 임
  
  	5. obj.__proto__를 펼치면 setPoint()가 있으며 이것은 서브 클래스의 메소드임
  
  	6. obj.__proto__.__proto__를 펼치면 getTitle()이 있으며 이것은 슈퍼 클래스의 메소드임
  
  	7. 이처럼 __proto__를 사용하여 슈퍼 클래스의 prototype에 연결된 메소드를 구조적, 계층적으로 연결함
  		- 이것이 상속 구조임
  
  	8. 인스턴스의 메소드를 호출하면 __proto__구조를 따라 아래로 내려 가면서 메소드를 식별함
  		- 식별하는 위치에 메소드가 있으면 실행 함
  */
  ```
- 메소드 오버라이딩(Overriding)
  ```tsx
  class Book {
    constructor(title) {
      this.title = title;
    }

    getTitle() {
      return this.title;
    }
  }

  class Point extends Book {
    getTitle() {
      return '서브 클래스';
    }
  }

  /*
  	1. 오버라이드 설명을 위해 Point 클래스에도 getTitle()을 작성함
  
  	2. getTitle()이 양쪽 클래스에 있음
  */

  const obj = new Point('책');
  /*
  	1. obj.__proto__를 펼치면 getTitle()이 있으며 이것은 서브 클래스의 메소드 임
  
  	2. obj.__proto__.__proto__를 펼치면 getTitle()이 있으며 이것은 슈퍼 클래스의 메소드 임
  */

  console.log(obj.getTitle());
  /*
  	1. obj.getTitle()을 호출하면 먼저 서브 클래스에서 찾음
  		- 즉, obj.__proto__에서 찾음
  
  	2. 없으면 슈퍼 클래스에서 찾음
  		- 즉, obj.__proto__.proto__에서 찾음
  
  	3. obj.__proto__에 즉, 서브클래스에 getTitle()이 있으므로 이것을 호출 함
  	
  	4. 이것을 메소드 오버라이딩이라고 함
  */
  ```

```toc

```
