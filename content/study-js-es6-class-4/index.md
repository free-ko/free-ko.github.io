---
emoji: 👨‍💻
title: constructor, constructor 반환
date: '2021-11-19 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  constructor, constructor 반환
</h1>

<br>

## 1. constructor

- `constructor`는 생성자로 인스턴스를 생성하고 초기화 함
- ES5까지는 `constructor` 를 작성할 수 없었으나 ES6부터는 작성 할 수 있음
  ```tsx
  class Point {
    constructor(point) {
      this.point = point;
    }
  }

  const obj = new Point(100);

  // 인스턴스 생성 방법
  // 1. new 연산자가 Point 클래스 오브젝트의 constructor를 호출 함, 파라미터 값인 100을 constructor로 넘겨줌
  // 2. 엔진은 빈 오브젝트{}를 생성함 이것이 인스턴스 임
  // 3. 인스턴스에 프로퍼티 이름과 값을 설정하여 인스턴스 구조를 만듬(ex. __proto__, __proto__.constructor 등)
  // 4. construcotr 블록의 코드를 실행 함
  // 5. this가 생성한 인스턴스를 참조함, 인스턴스{}를 먼저 생성하므로 this로 참조할 수 있음
  // 6. point는 인스턴스 프로퍼티가 됨(point 파라미터 값이 100이 됨)
  // 7. 생성한 인스턴스를 반환 함
  ```

<br>

## 2. constructor 미작성

- `constructor` 를 작성하지 않은 상태에서 `new` 연산자로 인스턴스를 생성하면
- `porototype`에 연결된 `constructor`가 호출 됨
  ```tsx
  class Point {
    setPoint(point) {
      this.point = point;
    }
  }

  const obj = new Point();
  obj.setPoint(100);

  // 1. 엔진이 class 키워드를 만나 Point 클래스 오브젝트를 생성할 때 constructor에서 클래스 전체를 참조하도록 환경을 만듬
  // 2. constructor를 작성하지 않으면 prototype.constructor를 사용하므로 인스턴스를 생성할 수 있지만 인스턴스에 초깃값을 설정할 수 없음
  // 3. 클래스에 constructor를 작성하면 protytpe.constructor를 오버라이드 하게 됨
  ```

<br>

## 3. constructor 반환

- `constructor` 에 `return` 을 작성하지 않으면 생성한 인스턴스를 반환 함
- `constructor` 에서 `Number`, `String`을 반환 하면 이를 무시하고 인스턴스를 반환 함
  ```tsx
  class Point {
    constructor(point) {
      this.point = point;
      return point;
    }
  }

  const obj = new Point(100);

  console.log(obj.point); // 100
  console.log(obj instanceof Point); // true

  // 1. return point; constructor에서 파라미터로 받은 Number 타입의 100을 반환 함
  // 2. 이때, 100을 반환하지 않고 생성한 인스턴스를 반환함
  // 3. console.log(obj.point) obj가 인스턴스이므로 프로퍼티로 값을 구할 수 있음
  // 4. console.log(obj instanceof Point); obj가 Point 클래스로 만든 인스턴스이므로 true가 출력됨
  ```
- `constructor` 에서 `Object`를 반환 하면 인스턴스를 반환하지 않고 `Object` 반환
  ```tsx
  class Point {
    constructor(point) {
      return { point: point };
    }
  }

  const obj = new Point(100);

  console.log(obj); // {point: 100}
  console.log(obj instanceof Point); // false

  // 1. return {point: point}; constructor에서 Objet를 반환함
  // 2. 생성한 인스턴스를 반환하지 않고 return 표현식의 결과를 반환 함
  // 3. console.log(obj); return한 Object가 출력됨
  // 4. console.log(obj instanceof Point); obj가 Point으로 만든 인스턴스가 아니므로 false가 출력됨
  ```

```toc

```
