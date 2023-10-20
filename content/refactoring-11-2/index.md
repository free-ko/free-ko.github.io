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

## 11.8 생성자를 팩터리 함수로 바꾸기

- 생성자에는 이상한 제약이 따라붙기도 함.
- 자바 생성자는 반드시 생성자를 정의한 클래스의 인스턴스를 반환해야 함.
- 생성자의 이름도 고정되며, 생성자를 호출하려면 특별한 연산자(new)를 사용해야 함

-> 팩터리 함수에는 이런 제약이 없다.

### 절차

1. 팩터리 함수를 만듦. 팩터리 함수의 본문에서는 원래의 생성자를 호출함
2. 생성자를 호출하던 코드를 팩터리 함수 호출로 바꿈
3. 하나씩 수정할 때마다 테스트
4. 생성자의 가시 범위가 최소가 되도록 제한

### 예시

```ts
// before
class Employee {
  constructor(name, typeCode) {
    this._name = name;
    this._typeCode = typeCode;
  }

  get name() {
    return this._name;
  }
  get type() {
    return Employee.legalTypeCodes[this._typeCode];
  }
  static get legalTypeCodes() {
    return { E: 'Engineer', M: 'Manager', S: 'Salesperson' };
  }
}

const leadEngineer = new Employee(document.leadEngineer, 'E');
```

```ts
// afters
function createEmployee(name) {
  return new Employee(name, 'E');
}

const leadEngineer = createEmployee(document.leadEngineer);
```

<br>

## 참고

- [리팩터링 2판 책](https://www.yes24.com/Product/Goods/89649360)

```toc

```
