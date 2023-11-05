---
emoji: 👋
title: '리팩터링 12장'
date: '2023-11-03 07:19:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## 12.1 메서드 올리기

- 메서드 올리기를 적용하기 가장 쉬운 상황은 메서드들의 본문 코드가 똑같을 때. 그러나 메서드 올리기 리팩터링을 적용하려면 선행 단계를 거쳐야 할 때가 많음
- 메서드 올리기를 적용하기에 가장 이상하고 복잡한 상황은 해당 메서드의 본문에서 참조하는 필드들이 서브클래스에만 있는 경우. 두 메서드의 전체 흐름은 비슷하지만 세부 내용이 다르다면 템플릿 메서드 만들기를 고려

### 절차

1. 똑같이 동작하는 메서드인지 면밀히 살핌
2. 메서드 안에서 호출하는 다른 메서드와 참조하는 필드들을 슈퍼클래스에서도 호출하고 참조할 수 있는지 확인
3. 메서드 시그니처가 다르다면 함수 선언 바꾸기로 슈퍼클래스에서 사용하고 싶은 형태로 통일
4. 슈퍼클래스에 새로운 메서드를 생성하고, 대상 메서드의 코드를 복사해넣음
5. 정적 검사를 수행
6. 서브클래스 중 하나의 메서드를 제거
7. 모든 서브클래스의 메서드가 없어질 때까지 다른 서브클래스의 메서드를 하나씩 제거

### 예시

```ts
// before
// Employee 클래스(Party를 상속함)
get annualCost() {
  return this.monthlyCost * 12;
}

// Department 클래스(Party를 상속함)
get totalAnnualCost() {
  return this.monthlyCost * 12;
}
```

```ts
// after
// Party 클래스
get annualCost() {
  return this.monthlyCost * 12;
}
```

<br>

## 12.2 필드 올리기

- 서브클래스의 필드들이 비슷한 방식으로 쓰인다고 판단되면 슈퍼클래스로 끌어올려야함
- 이렇게 하면 데이터 중복 선언을 없앨 수 있고, 해당 필드를 사용하는 동작을 서브클래스에서 슈퍼클래스로 옮길 수 있음

### 절차

1. 후보 필드들을 사용하는 곳 모두가 그 필드들을 똑같은 방식으로 사용하는지 면밀히 살핌
2. 필드들의 이름이 각기 다르다면 똑같은 이름으로 바꿈
3. 슈퍼클래스에 새로운 필드를 생성
4. 서브클래스의 필드들을 제거
5. 테스트

<br>

## 12.3 생성자 본문 옮기기

- 생성자는 할 수 있는 일과 호출 순서에 제약이 있기 때문에 조금 다른 식으로 접근해야 함

### 절차

1. 슈퍼클래스에 생성자가 없다면 하나 정의. 서브클래스의 생성자들에서 이 생성자가 호출되는지 확인
2. 문장 슬라이드하기로 공통 문장 모두를 `super()` 호출 직후로 옮김
3. 공통 코드를 슈퍼클래스에 추가하고 서브클래스들에서는 제거. 생성자 매개변수 중 공통 코드에서 참조하는 값들을 모두 `super()`로 전달
4. 생성자 시작 부분으로 옮길 수 없는 공통 코드에는 함수 추출하기와 메서드 올리기를 차례로 적용

### 예시

```ts
// before
class Party {}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super();
    this._id = id;
    this._name = name;
    this._monthlyCost = monthlyCost;
  }
  // ...
}

class Department extends Party {
  constructor(name, staff) {
    super();
    this._name = name;
    this._staff = staff;
  }
  // ...
}
```

```ts
// after
class Party {
  constructor(name) {
    this._name = name;
  }
}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super(name);
    this._id = id;
    this._monthlyCost = monthlyCost;
  }
  // ...
}

class Department extends Party {
  constructor(name, staff) {
    super(name);
    this._staff = staff;
  }
  // ...
}
```

<br>

## 참고

- [리팩터링 2판 책](https://www.yes24.com/Product/Goods/89649360)

```toc

```
