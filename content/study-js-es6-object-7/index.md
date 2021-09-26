---
emoji: 👨‍💻
title: __proto__에 메소드 추가
date: '2021-09-26 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  __proto__에 메소드 추가
</h1>

<br>

## 메소드 추가

- `__proto__` 에 `function`을 추가하면

  - `prototype`에 설정되며
  - 메소드로 추가하는 것과 같음
  - `__proto__`에 추가한 후의 `prototype` 모습

  ```tsx
  function Book(param) {
    this.point = param;
  }

  Book.prototype.getPoint = function () {
    return this.point;
  };

  const obj = new Book(100);

  // __proto__에 메소드를 추가 함
  obj.__proto__.setPoint = function (param) {
    this.point = param;
  };

  /*
  	1. obj를 펼치면 __proto__에 setPoint가 표시됨
  
  	2. Book.prototype을 펼치면 setPoint가 표시됨
  */

  /*
  	1. 이렇게 표시가 되는 것은
  	- __proto__에 메소드를 추가하면, __proto__에 추가하지 않고
  	- prototype에 추가하기 때문
  
  	2. __proto__에 연결되어 표시된 것은
  	- 디버깅 툴에서 가독성을 위해
  	- prototype에 연결된 메소드를 표시한 것
  */
  ```

- 추가한 메소드를 인스턴스에 공유

  ```tsx
  function Book(param) {
    this.point = param;
  }

  Book.prototype.getPoint = function () {
    return this.point;
  };

  const obj = new Book(100);

  // beforeObj 인스턴스를 생성함
  const beforeObj = new Book(100);

  // __proto__에 메소드를 추가함
  obj.__proto__.setPoint = function (param) {
    this.point = param;
  };

  // 새로운 인스턴스를 생성함
  const afterObj = new Book(300);

  /*
  	1. setPoint()가 인스턴스에 할당되므로
  	- 메소드로 호출할 수 있음
  */

  beforeObj.setPoint(700);
  /*
  	1. beforeObj 인스턴스는
  	- setPoint() 메소드를 추가하기 전에 인스턴스를 만들었지만
  
  	2. prototpye sharing(공유)으로 인해
  	- 추가된 메소드를 사용할 수 있음
  
  	3. setPoint()가 호출되면
  	- Book.prototype에서 setPoint의 존재 여부를 체크하고
  	- 있으면 __proto__가 아니라 Book.prototype의
  	- setPoint()를 호출하기 때문
  */
  ```

```toc

```
