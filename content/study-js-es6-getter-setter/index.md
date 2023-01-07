---
emoji: 👨‍💻
title: Getter, Setter
date: '2021-09-14 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  Getter, Setter
</h1>

<br>

## 1. Getter

- `getter`로 선언된 함수를 자동으로 호출
  - 값을 반환하는 시맨틱을 갖고 있으므로 `getter` 함수에서 값을 반환해야 함
- ES5 형태

  ```tsx
  var book = {};

  Object.defineProperty(book, 'title', {
    get: function () {
      return '책';
    },
  });

  console.log(book.title);
  ```

  1. `book.title`을 실행하면 `title` 프로퍼티에서 `get` 속성의 존재를 체크 함
  2. 있으면, `get()` 함수를 호출하며 `"책"`이 반환되어 출력 됨
  3. `book.title.get()` 처럼 함수로 호출하면 에러가 발생함
  4. ES5의 `Descriptor`를 참조하세요

- ES6 형태

  ```tsx
  const book = {
  	point: 100,
  	get getPint() {
  		return this.point;
  	}
  };

  console.log(book.**getPoint**);   // 100
  ```

  1. `get getPoint(){}` 처럼 `getPoint()` 앞에 `get`을 작성하면 `getter`로 선언됨
  2. `getPoint()` 함수가 자동으로 호출 됨

- ES6 장점

  - ES5처럼 프로퍼티의 속성 구조가 아님
  - 작성 편리
  - 다수의 `getter` 사용 가능

    ```tsx
    const book = {
    	get getPoint() {
    		return "포인트";
    	}

    	get getTitle() {
    		return "제목";
    	}
    }

    console.log(book.**getPoint**);   // 포인트
    console.log(book.**getTitle**);   // 제목
    ```

  <br>

  ## 2. Setter

  - 프로퍼티에 값을 할당하면
    - `setter`로 선언된 함수 자동 호출
    - 값을 설정하는 시맨틱을 갖고 있으므로 `setter` 함수에서 값을 설정해야 함

  <br>

  - ES5 형태

    ```tsx
    var book = { title: 'HTML' };

    Object.defineProperty(book, 'change', {
      set: function (param) {
        this.title = param;
      },
    });

    book.change = 'JS';

    console.log(book); // {title: "JS"};
    ```

    1. `book.change = "JS"`를 실행하면 `change` 프로퍼티에 `set` 속성의 존재 여부를 체크
    2. 있으면, `set()` 함수를 호출
    3. `"JS"`를 파라미터 값으로 넘겨 줌

  <br>

  - ES6 형태

    ```tsx
    const bookt = {
      point: 100,
      set setPoint(param) {
        this.point = param;
      },
    };

    book.setPoint = 200;

    console.log(book.point); // 200
    ```

    1. `setPoint(`) 앞에 `set`을 작성하면 `setter`로 선언됨
    2. `book.setPoint = 200;` `setPoint`에 값을 할당하면 `setPoint()`가 자동으로 호출 됨
    3. 파라미터 값으로 `200`을 넘겨줌

  <br>

  - 변숫값을 함수 이름으로 사용

    ```tsx
    const name = 'setPoint';
    const book = {
      point: 100,
      set [name](param) {
        this.point = param;
      },
    };

    book[name] = 200;

    console.log(book.point); // 200
    ```

    1. `name` 변숫값인 "setPoint"가 함수 이름으로 사용됨
    2. `getter`도 같은 방법으로 사용 할 수 있음

  <br>

  - setter 삭제

    ```tsx
    const name = 'setPoint';
    const book = {
      set [name](param) {
        this.point = param;
      },
    };

    delete book[name];

    console.log(book[name]); // undefined
    ```

    - `delete` 연산자로 `setter`를 삭제 할 수 있음

```toc

```
