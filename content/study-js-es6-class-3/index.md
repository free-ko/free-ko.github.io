---
emoji: π¨βπ»
title: Class μμ± κΈ°μ€, computed name
date: '2021-11-17 00:00:00'
author: μ°κΈ°
tags: λΈλ‘κ·Έ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  π  Class μμ± κΈ°μ€, computed name
</h1>

<br>

## 1. Class μμ± κΈ°μ€

- ν΄λμ€λ `strict` λͺ¨λμμ μ€ν΄μ€λλ―λ‘ μ΄μ λ§μΆμ΄ μ½λλ₯Ό μμ±ν΄μΌ ν¨

- ν΄λμ€μ λ©μλ μμ± λ°©λ²

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

  - `function` ν€μλλ₯Ό μμ±νμ§ μμ
  - λ©μλμ λ©μλ μ¬μ΄μ μ½€λ§`(,)`λ₯Ό μμ±νμ§ μμ
  - λ¨ μΈλ―Έμ½λ‘ `(;)` μ μμ±μ μ νμ

- ν΄λμ€μ `typeof`λ `function` μ
  - `Class` νμμ λ³λ‘λ μμ§ μμ

<br>

## 2. Computed Name

- λ©μλ μ΄λ¦μ μ‘°ν©νμ¬ μ¬μ©

  - λκ΄νΈ `[]` μμ μ‘°ν©ν  μ΄λ¦μ μμ±

  - μ‘°ν©ν κ²°κ³Όκ° λ©μλ μ΄λ¦μ΄ λ¨

    ```tsx
    const name = 'Point';

    class Point {
      static ['get' + name](add) {
        return add ? 100 : 50;
      }
    }

    console.log(Point['get' + name](true)); // 100

    // static ["get" + name](add) {}
    // "getκ³Ό name λ³μ«κ°μΈ "Point"λ₯Ό μ°κ²°νμ¬ λ©μλ μ΄λ¦μΌλ‘ μ¬μ© ν¨
    // μμ§μ΄ class ν€μλλ₯Ό λ§λλ©΄ ν΄λμ€λ₯Ό μ€λΈμ νΈλ‘ λ§λ€κ² λλ©° []μ μ‘°ν© κ²°κ³Όλ₯Ό λ©μλ μ΄λ¦μΌλ‘ μ¬μ© ν¨
    // λ°λΌμ class ν€μλ μμ name λ³μ«κ°μ μ μν΄μΌ ν¨
    // Point["get" + name](true)
    // λ©μλ μ΄λ¦μ μ‘°ν©νμ¬ νΈμΆ ν  μ μμ
    ```

<br>

## 3. Class μμ± κΈ°μ€

- λ©μλλ₯Ό `prototype`μ μ°κ²°νμ¬ μμ±νμ§ μμ
- ν΄λμ€ λ°μμ λ©μλλ₯Ό `prototype`μ μ°κ²°ν  μ μμ
- ν΄λμ€λ μ΄κ±°ν  μ μμ
- `prototype`μ λ©μλ μΆκ°

  ```tsx
  const Point = calss {
  	setPoint(point) {
  		this.point = point;
  	}
  };

  console.log(Point.prototype.setPoint());  // setPoint(point) {this.point = point;)

  // 1. setPoint(){...} ννλ‘ μμ±νλ©΄ μμ§μ΄ prototypeμ μ°κ²°λ κ΅¬μ‘°λ‘ λ³νν¨
  // 2. console.log(Point.prototype.setPoint) prototypeμ μ°κ²°λ κ΅¬μ‘°λ‘ λ³ννλ―λ‘ λ©μλ μ½λκ° μ€λ ₯ λ¨
  ```

  ```tsx
  const Point = class {};
  const obj = new Point();

  Point.prototype.getPoint = function () {
    return 100;
  };

  console.log(obj.getPoint()); // 100

  // 1. Point.prototype.getPoint = function() {...} ν΄λμ€ λ°μμ prototypeμ λ©μλλ₯Ό μ°κ²°ν  μ μμ
  // 2. obj.getPoint() prototypeμ μΆκ°λ‘ μ°κ²°ν λ©μλλ₯Ό μΈμ€ν΄μ€μμ νΈμΆν  μ μμ
  ```

  ```tsx
  const Book = class {
    setTitle(title) {
      this.title = title;
    }
  };

  /*
  	1. Bookμ νΌμΉλ©΄, νλ‘νΌν°μ prototypeκ° μμ
  
  	2. prototypeμ νΌμΉλ©΄, setTitle()μ΄ μμ
  */

  const obj = new Book();
  obj.setTitle('JS');

  /*
  	1. objλ₯Ό νΌμΉλ©΄, title νλ‘νΌν°κ° μμΌλ©°
  		- μ΄κ²μ setTitle()μμ μ€μ ν κ²
  
  	2. titleμ²λΌ μΈμ€ν΄μ€μ λ°λ‘ μ°κ²°λ νλ‘νΌν°λ₯Ό
  		- μΈμ€ν΄μ€ νλ‘νΌν°λΌκ³  λΆλ¦
  
  	3. obj.__proto__λ₯Ό νΌμΉλ©΄, setTitle()μ΄ μμ
  
  	4. μΈμ€ν΄μ€ νλ‘νΌν°λ __proto__ μμ νμλλ©°
  		- λ©μλλ __proto__ μμ νμλ¨
  */

  Book.prototype.getTitle = function () {
    return this.title;
  };

  /*
  	1. Book.prototypeμ getTitle()μ΄ μΆκ°λ¨
  
  	2. obj.__proto__μ getTitle()μ΄ νμλ¨
  
  	3. prototypeμ λ©μλλ₯Ό μΆκ°λ‘ μ°κ²°νλ©΄
  		- μμ±λ λͺ¨λ  μΈμ€ν΄μ€μμ λ©μλλ₯Ό μ¬μ©ν  μ μμ
  
  	4. μ΄κ²μ prototype sharing(κ³΅μ )λΌκ³  λΆλ¦
  */

  console.log(obj.getTitle());
  /*
  	1. obj μΈμ€ν΄μ€μ getTitle() λ©μλκ° νΈμΆλλ©° "JS"λ₯Ό λ°ν ν¨
  */
  ```

```toc

```
