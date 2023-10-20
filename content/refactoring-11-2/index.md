---
emoji: 👋
title: '리팩터링 11장-2'
date: '2023-10-20 10:19:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## 11.7 세터 제거하기

- 세터 메서드가 있다는 것은 필드가 수정될 수 있다는 뜻. 객체 생성 후에는 수정되지 않길 원하는 필드라면 세터를 제공하지 않았을 것
- 세터 제거하기 리팩터링이 필요한 상황은 주로 두 가지임
- 첫째, 사람들이 무조건 접근자 메서드를 통해서만 필드를 다루려 할 때
- 두 번째는 클라이언트에서 생성 스크립트를 사용해 객체를 생성할 때

### 절차

1. 설정해야 할 값을 생성자에서 받지 않는다면 그 값을 받을 매개변수를 생성자에 추가함. 그런 다음 생성자 안에서 적절한 세터를 호출
2. 생성자 밖에서 세터를 호출하는 곳을 찾아 제거하고, 대신 새로운 생성자를 사용하도록 함
3. 세터 메서드를 인라인. 가능하다면 해당 필드를 불변으로 만듦

### 예시

```ts
// before
class Person {
  // ...
  get name() {
    return this._name;
  }
  set name(arg) {
    this._name = arg;
  }
  get id() {
    return this._id;
  }
  set id(arg) {
    this._id = arg;
  }
}

const martin = new Person();
martin.name = '마틴';
margin.id = '1234';
```

```ts
// id 필드는 객체를 생성한 뒤에 변경되면 안 됨.
// 생성자를 통해 id 를 설정하게끔 수정

// after
class Person {
  constructor(id) {
    this.id = id;
  }
  // ...
}

const martin = new Person('1234');
martin.name = '마틴';
```

<br>

## 참고

- [리팩터링 2판 책](https://www.yes24.com/Product/Goods/89649360)

```toc

```
