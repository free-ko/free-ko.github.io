---
emoji: 👨‍💻
title: 인스턴스에 함수로 추가
date: '2021-09-26 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  인스턴스에 함수로 추가
</h1>

<br>

## 함수로 추가

- `new` 연산자로 인스턴스를 생성하고
  - 인스턴스의 프로퍼티로 함수를 추가
  - 다른 인스턴스와 공유하지 않음
- 인스턴스에 추가한 후의 인스턴스 구조

  ```tsx
  function Book() {
    this.point = 100;
  }

  Book.prototype.getPoint = function () {
    return this.point;
  };

  const obj = new Book();

  // 인스턴스 프로퍼티(함수)로 추가 함
  obj.setPoint = function (param) {
    this.point = param;
  };

  // obj를 펼치면 __proto__ 위에 setPoint가 표시됨

  // 인스턴스의 함수 형태로 호출함
  // 함수에서 this가 인스턴스를 참조함
  obj.setPoint(200);

  // prototype에 연결된 메소드를 호출 함
  console.log(obj.getPoint());

  const newObj = new Book();
  console.log(newObj.setPoint); // undefined

  /*
  	1. 새로운 인스턴스를 생성하면
  	- setPoint()를 인스턴스에서 사용할 수 없게 됨
  
  	2. 인스턴스의 프로퍼티로 설정했기 때문
  	
  	3. 인스턴스의 프로퍼티로 연결한 것과
  	- prototype에 연결한 메소드의 차이 임
  */
  ```

```toc

```
