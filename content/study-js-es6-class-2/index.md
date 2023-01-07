---
emoji: 👨‍💻
title: Class 선언, Class 구조 - Class 선언문, Class 표현식
date: '2021-11-16 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  Class 선언, Class 구조: Class 선언문, Class 표현식
</h1>

<br>

## 1. Class 선언

- Syntax : `class Name { body }`

- 대문자 Class는 개념적인 클래스를 뜻하고 소문자 class는 키워드 임

- 클래스 작성 방법

  - `class` 키워드에 이어 클래스 이름 작성함
  - 이름의 첫 문자는 대문자를 사용 함(개발자들 사이의 관례)
  - 블록 `{ }` 을 작성하고 블록 안에 메소드를 작성함

    ```tsx
    class Point {
      getPoint() {
        return 100;
      }
    }

    const obj = new Point();

    console.log(obj.getPoint()); // 100

    // 1. 엔진이 class 키워드를 만나면 클래스 오브젝트를 생성함
    // 2. const obj = new Point();
    //   - new 연산자를 사용하여 인스턴스를 생성함
    // 3. new 연산자를 사용하지 않고 Point()를 호출하면 에러가 발생함
    // 4. obj.getPoint() 인스턴스의 getPoint() 메소드를 호출 함
    ```

<br>

## 2. Class 표현식

- Syntax : `const/let Name = class { body }`

- 클래스 작성 방법

  - 변수 이름 `Name`이 클래스 이름이 됨
  - 변수에 `Class` 오브젝트를 할당하는 형태 임
  - 다른 것은 클래스 선언문과 같음

    ```tsx
    const Point = class {
      getPoint() {
        return 100;
      }
    };

    const obj = new Point();

    console.log(obj.getPoint()); // 100

    // 1. 엔진이 class 키워드를 만나면 클래스 오브젝트를 생성하여 Point 변수에 할당함
    // 2. Point가 클래스 이름이 됨
    ```

- Class 형태

  ```tsx
  const Point = class {
    getPoint() {
      return 100;
    }
  };

  /*
  	1. Point를 펼치면
  		- 프로퍼티, prototype, __proto__가 있음
  
  	2. prototype을 펼치면
  		- constructor가 있으며, getPoint()가 있음
  
  	3. constructor는 Point 클래스 전체를 참조 함
  
  	4. 클래스에 메소드를 작성하면 prototype에 연결됨
  		- Point.prototype.getPoint = function(){} 형태로 작성한 것과 같음
  
  	5. __proto__ 에서 빌트인 Function 오브젝트의 prototype에 연결된 메소드를 참조함
  */

  const obj = new Point();

  /*
  	1. Point 클래스로 인스턴스를 생성함
  	
  	2. obj를 펼치면 __proto__가 있으며 construtor와 getPoint()가 있음
  
  	3. Point.prototype에 연결된 메소드로
  		- 인스턴스를 생성하고
  		- __proto__에서 참조할 수 있도록 만듬
  */

  console.log(ojb.getPoint());

  /*
  	1. obj 인스턴스의 getPoint() 메소드를 호출함
  		- obj.__proto__에 연결된 getPoint()가 호출 됨
  */
  ```

<br>

### ✅ const, let 사용 기준

1. `const` 사용 : 값이 대체되지 않을 경우(오브젝트의 `프로퍼티가` 변경되더라도 오브젝트 `자체가` 대체되지 않는 것도 포함)

   ex) `Class`, `Array`, `인스턴스`

2. `let` 사용 : 값이 대체되는 경우

<br>

### ✅ 함수, 메소드 기준

1. 함수

   - 인스턴스를 생성하지 않고 직접 호출

     ```tsx
     console.log(Array.isArray([])); // true

     const point = {
       getPoint() {
         return 100;
       },
     };

     console.log(point.getPoint()); // 100
     ```

2. 메소드

   - 인스턴스를 사용하여 호출하는 함수로 `prototype`에 연결되어 있음
   - 클래스에 작성한 함수

     ```tsx
     class Point {
       getPoint() {
         return 100;
       }
     }

     const obj = new Point();
     console.log(obj.getPoint()); // 100

     // 1. getPoint는 직접 호출 할 수 없고, 인스턴스를 사용하여 호출해야 함
     ```

   - `prototype`에 연결된 `function`

     ```tsx
     const Point = function () {};

     Point.prototype.getPoint = function () {
       return 100;
     };

     const obj = new Point();
     console.log(obj.getPoint()); // 100

     // 1. Point.prototype.getPoint, prototype에 연결된 함수는 메소드 임
     // 2. getPoint를 직접 호출 할 수도 있지만 일반적으로 인스턴스를 생성하여 호출 함
     ```

   - 빌트인 오브젝트의 `prototype`에 연결된 함수

     ```tsx
     const list = [];

     list.push('책');

     console.log(list); // ["책"]

     // 1. push() 메소드는 Array.prototype에 연결되어 있음
     ```

```toc

```
