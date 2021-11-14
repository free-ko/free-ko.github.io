---
emoji: 👨‍💻
title: 객체 지향 프로그래밍 - 객체 구성 요소, 객체의 구체화, 자바스크립트로 OOP 구현
date: '2021-11-15 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  객체 지향 프로그래밍: 객체 구성 요소, 객체의 구체화, 자바스크립트로 OOP 구현
</h1>

<br>

## 1. JS

- 객체 지향 프로그래밍 언어

  - `OOP` : Object Oriented Programming

- ECMASciprt 스펙에 OOP라고 작성되어 있음
  - ECMAScripte is an object-oriented programming language

<br>

## 2. 객체 구성 요소

- `OOP`에서 Object(객체)는 JS Object가 아님

  - 개념적, 사상적 접근
  - 형체, 실체가 없음

- 행위와 속성으로 객체의 특성을 표현 함
  - 행위 : 먹다, 마시다와 같은 동적인 모습
  - 속성 : 밥을 먹다, 물을 마시다와 같은 행위의 대상이 속성

<br>

## 3. 객체의 구체화

- 객체를 코드로 구체화하면 객체는 `Class`가 됨

  - 행위는 `Method`가 됨
  - 속성은 `Property`가 됨

- 클래스에서

  - 메소드와 프로퍼티를 작성함
  - 클래스 자체로는 사용할 수 없으며
  - 인스턴스로 생성해야 사용 할 수 있음

    ```tsx
    class Point {
      constructor(point) {
        this.point = point;
      }

      getPoint() {
        return this.point;
      }
    }

    const obj = new Point(100);

    console.log(obj.getPoint()); // 100
    console.log(obj.point); // 100
    ```

    1. `class Point {...}`
       - `class` 키워드로 클래스를 선언 함, 이 시점에서 `class`를 사용할 수 없음
    2. `const obj = new Point(100);`
       - `constructor` 가 호출되며 파라미터 값을 넘겨 줌
       - 인스턴스를 생성하여 반환하며 `obj` 에 할당함
       - 이제 인스턴스로 클래스를 사용할 수 있음
    3. `obj.getPoint()`
       - 인스턴스의 `getPoint()` 메소드를 호출 함
    4. `return this.point`
       - `point` 프로퍼티 임
    5. `obj.point`
       - `obj` 인스턴스의 `point` 프로퍼티 값을 구함

<br>

## 4. JS로 OOP 구현

- 다른 언어와 `OOP` 개념은 같지만 클래스 구조와 구현 방법이 다름

  - `prototype` 에 메소드를 연결하는 구조
  - 연결된 메소드로 인스턴스 생성

- 따라서 비교하는 것은 의미가 없음

- `JS`에 적합한 방법과 `JS` 특징을 활용하여 `OOP`를 구현해야 함

```toc

```
