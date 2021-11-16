---
emoji: 👨‍💻
title: Class 작성 기준, computed name
date: '2021-11-17 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  Class 작성 기준, computed name
</h1>

<br>

## 1. Class 작성 기준

- 클래스는 `strict` 모드에서 실해오디므로 이에 맞추어 코드를 작성해야 함

- 클래스에 메소드 작성 방법

  ```tsx
  class Point {
    setPoint(point) {
      this.point = point;
    }

    getPoint() {
      return this.point;
    }
  }

  console.log(typeof Point); // function
  ```

  - `function` 키워드를 작성하지 않음
  - 메소드와 메소드 사이에 콤마`(,)`를 작성하지 않음
  - 단 세미콜론`(;)` 은 작성은 선택임

- 클래스의 `typeof`는 `function` 임
  - `Class` 타입은 별로도 있지 않음

<br>

## 2. Computed Name

- 메소드 이름을 조합하여 사용

  - 대괄호 `[]` 안에 조합할 이름을 작성

  - 조합한 결과가 메소드 이름이 됨

    ```tsx
    const name = 'Point';

    class Point {
      static ['get' + name](add) {
        return add ? 100 : 50;
      }
    }

    console.log(Point['get' + name](true)); // 100

    // static ["get" + name](add) {}
    // "get과 name 변숫값인 "Point"를 연결하여 메소드 이름으로 사용 함
    // 엔진이 class 키워드를 만나면 클래스를 오브젝트로 만들게 되며 []의 조합 결과를 메소드 이름으로 사용 함
    // 따라서 class 키워드 앞에 name 변숫값을 정의해야 함
    // Point["get" + name](true)
    // 메소드 이름을 조합하여 호출 할 수 있음
    ```

<br>

## 3. Class 작성 기준

- 메소드를 `prototype`에 연결하여 작성하지 않음
- 클래스 밖에서 메소드를 `prototype`에 연결할 수 있음
- 클래스는 열거할 수 없음
- `prototype`에 메소드 추가

  ```tsx
  const Point = calss {
  	setPoint(point) {
  		this.point = point;
  	}
  };

  console.log(Point.prototype.setPoint());  // setPoint(point) {this.point = point;)

  // 1. setPoint(){...} 형태로 작성하면 엔진이 prototype에 연결된 구조로 변환함
  // 2. console.log(Point.prototype.setPoint) prototype에 연결된 구조로 변환하므로 메소드 코드가 줄력 됨
  ```

  ```tsx
  const Point = class {};
  const obj = new Point();

  Point.prototype.getPoint = function () {
    return 100;
  };

  console.log(obj.getPoint()); // 100

  // 1. Point.prototype.getPoint = function() {...} 클래스 밖에서 prototype에 메소드를 연결할 수 있음
  // 2. obj.getPoint() prototype에 추가로 연결한 메소드를 인스턴스에서 호출할 수 있음
  ```

  ```tsx
  const Book = class {
    setTitle(title) {
      this.title = title;
    }
  };

  /*
  	1. Book을 펼치면, 프로퍼티와 prototype가 있음
  
  	2. prototype을 펼치면, setTitle()이 있음
  */

  const obj = new Book();
  obj.setTitle('JS');

  /*
  	1. obj를 펼치면, title 프로퍼티가 있으며
  		- 이것은 setTitle()에서 설정한 것
  
  	2. title처럼 인스턴스에 바로 연결된 프로퍼티를
  		- 인스턴스 프로퍼티라고 부름
  
  	3. obj.__proto__를 펼치면, setTitle()이 있음
  
  	4. 인스턴스 프로퍼티는 __proto__ 위에 표시되며
  		- 메소드는 __proto__ 안에 표시됨
  */

  Book.prototype.getTitle = function () {
    return this.title;
  };

  /*
  	1. Book.prototype에 getTitle()이 추가됨
  
  	2. obj.__proto__에 getTitle()이 표시됨
  
  	3. prototype에 메소드를 추가로 연결하면
  		- 생성된 모든 인스턴스에서 메소드를 사용할 수 있음
  
  	4. 이것을 prototype sharing(공유)라고 부름
  */

  console.log(obj.getTitle());
  /*
  	1. obj 인스턴스의 getTitle() 메소드가 호출되며 "JS"를 반환 함
  */
  ```

```toc

```
