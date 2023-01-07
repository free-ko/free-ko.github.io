---
emoji: 👨‍💻
title: setPrototypeOf() - prototype 사용
date: '2021-09-26 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  setPrototypeOf() - prototype 사용
</h1>

<br>

## setPorotytpeOf()

- 첫 번째 파라미터에 `prototype`을 작성
- 첫 번째 파라미터의 `prototype`에
  - 두 번째 파라미터의 `prototype`에 연결된 프로퍼티를 설정
- `prototype` 연결 후의 인스턴스 구조

  ```tsx
  function Book() {}
  Book.prototype.getBook = function () {};

  function Point() {}
  Point.prototype.getPoint = function () {};

  Object.setPrototypeOf(Point.prototype, Book.prototype);
  /*
  	1. Point.prototype에
  	- Book.prototype에 연결된 프로퍼티(메소드 포함)를 설정함
  
  	2. Point.prototype에 설정하므로 이것을 펼치면
  	- Book.prototype.getBook()이 있어야 하는데 없음
  
  	3. 또한, Point.prototype에 연결한 메소드가
  	- 지워지지 않고 유지 됨 
  
  	4. 한편, Point.prototype.__proto__를 펼치면
  	- getBook()이 표시됨
  
  	5. setPrototypeOf() 함수 이름의 뉘앙스가
  	- prototype에 설정하는 것처럼 보이지만
  	- prototype에 __proto__를 만들고 여기에 설정함
  
  	6. prototype에 설정하면 getPoint()가 지워지므로
  	- Point에 작성된 메소드를 사용할 수 없게 됨
  
  	7. 이를 피하기 위해 __proto__를 만들어 설정한 것
  
  	8. __proto__로 구조적으로 계층을 만들어 설정하므로 
  	- 같은 이름의 메소드가 있더라도 대체되지 않음
  	
  	9. 식별자 해결을 할 때, __proto__ 순서로 검색하므로
  	- 같은 이름의 메소드가 있을 때,
  	- 앞의 메소드가 호출 됨
  */

  const obj = new Point(300);
  /*
  	1. new Point(300)를 실행하면
  	- Point.prototype에 연결된 메소드로 인스턴스를 생성함
  
  	2. 오른쪽의 obj를 펼치면
  	- obj.__proto__.proto__구조 임
  	- 이것은 Point.prototype 구조와 같음
  
  	3. 위의 __proto__에 Point.prototype에 연결된 메소드가 설정되고
  	- 아래의 __proto__에 Book.prototype에 연결된 메소드가 설정 됨
  */
  ```

- 상속을 위한 목적이라면
  - `super` 등의 상속 처리 키워드를 제공하는
  - `Class`를 사용하는 것이 좋음

```toc

```
