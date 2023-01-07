---
emoji: 👨‍💻
title: super 키워드, constructor 호출
date: '2021-11-21 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  super 키워드, constructor 호출
</h1>

<br>

## 1. super 키워드

- 슈퍼 클래스와 서브 클래스에 같은 이름의 메소드가 있으면 서브 클래스의 메소드가 호출 됨
- `super` 키워드를 사용하여 슈퍼 클래스의 메소드를 호출 할 수 있음
- `super.getTitle()` 의 형태

  ```tsx
  class Book {
    getTitle() {
      console.log('슈퍼');
    }
  }

  class Point extends Book {
    getTitle() {
      super.getTitle();
      console.log('서브');
    }
  }

  new Point().getTitle();

  // 1. new Point.getTitle() 인스턴스를 생성하고 getTitle()을 호출하면 서브 클래스의 메소드가 호출 됨
  // 2. super.getTitle() super 키워드가 슈퍼 클래스를 참조하므로 슈퍼 클래스의 getTitle()이 호출됨

  // 실행결과
  // 슈퍼
  // 서브
  ```

<br>

## 2. constructor 호출

- 서브와 슈퍼에 `constructor`를 모두 작성하지 않으면 디폴트 `constructor`가 호출 됨

  ```tsx
  class Book {
    setTitle(title) {
      this.title = title;
    }
  }

  class Point extends Book {}

  const obj = new Point();

  obj.setTitle('책');
  console.log(obj.title);

  // 1. Point 클래스에 constructor를 작성하지 않으면 Point.prototype.constructor가 호출됨
  // 2. 이어서 Book 클래스의 constructor가 호출함, Book 클래스에 constructor를 작성하지 않으면 Book.prototype.constructor가 호출 됨
  // 3. 즉, 각 클래스의 constructor를 호출하며 클래스에 construcotr를 작성하지 않으면 클래스의 prototype.constructor가 호출 됨

  // 실행결과
  // 책
  ```

<br>

- 서브에 작성하지 않고 `super`에만 작성하면 파라미터 값을 `super`로 넘겨 줌

  ```tsx
  class Book {
    constructor(title) {
      this.title = title;
    }
  }

  class Point extends Book {}

  const obj = new Point('책');
  console.log(obj.title);

  // 서브의 prototype.constructor가 호출됨, 이어서 슈퍼의 constructor를 호출하면서 파라미터 값인 "책"을 파라미터로 넘겨 줌

  // 실행 결과
  // 책
  ```

<br>

- 서브에는 작성하고 `super`에 작성하지 않으면 에러가 발생함

  ```tsx
  class Book {
    setTitle(title) {
      this.title = title;
    }
  }

  class Point extends Book {
    // constructor(point) {
    //     this.point = point;
    //  };
  }

  const obj = new Point(100);

  // 서브에 constructor를 작성하면 슈퍼에도 constructor를 작성해야 함
  ```

  <br>

- 서브와 슈퍼에 `constructor`를 모두 작성하면 서브에서 `super()`로 호출해야 함

  ```tsx
  class Book {
    constructor(title) {
      this.title = title;
    }
  }

  class Point extends Book {
    constructor(title, point) {
      super(title);
      this.point = point;
    }
  }

  const obj = new Point('책', 100);

  console.log(`${obj.title}, ${obj.point}`);

  // 1. super(title); 슈퍼의 constructor를 호출하며 title 파라미터 값을 파라미터로 넘겨 줌
  // 2. 이렇게 명시적으로 슈퍼의 constructor를 호출해야 함
  // 3. 서브의 constructor에서 this를 사용하면 this를 사용하기 전에 super()를 호출해야 함

  // 실행결과
  // 책 100
  ```

```toc

```
