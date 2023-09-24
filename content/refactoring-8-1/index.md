---
emoji: 👋
title: '리팩터링 8장-1'
date: '2023-09-23 10:53:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

<br>

## 8.1 함수 옮기기

- 모듈성이란 프로그램의 어딘가를 수정하려 할 때 해당 기능과 깊이 관련된 작은 일부만 이해해도 가능하게 해주는 능력
- 모듈성을 높이려면 서로 연관된 요소들을 함게 묶고, 요소 사이의 연결 관계를 쉽게 찾고 이해할 수 있도록 해야 함
- 모든 함수는 어떤 컨텍스트 안에 존재하며, 대부분은 특정 모듈에 속함.
- 캡슐화를 위해 함수를 함수가 참조하는 곳이 많은 모듈로 옮겨주는 것이 좋음
- 또한 호출자들의 현재 위치나 다음 업데이트 때 바뀌리라 예상되는 위치에 따라서도 함수를 옮겨야 할 수 있음
- 함수를 옮기기 전, 대상 함수의 현재 컨텍스트와 후보 컨텍스트를 둘러보고 대상 함수를 호출하는 함수, 대상 함수가 호출하는 함수, 대상 함수가 사용하는 데이터를 살펴봐야 함

### 절차

1. 선택한 함수가 현재 컨텍스트에서 사용 중인 모든 프로그램 요소를 살펴보고 이 요소들 중에도 함께 옮겨야 할 게 있는지 고민 해봄
2. 선택한 함수가 다형 메서드인지 확인
3. 선택한 함수를 타겟 컨텍스트로 복사 후, 타겟 함수가 새로운 터전에 잘 자리 잡도록 다듬
4. 정적 분석을 수행
5. 소스 컨텍스트에서 타겟 함수를 참조할 방법을 찾아 반영
6. 소스 함수를 타겟 함수의 위임 함수가 되도록 수정
7. 테스트
8. 소스 함수를 인라인할지 고민

### 예시: 중첩 함수를 최상위로 옮기기

```ts
// before
function trackSummary(points) {
  const totalTime = calculateTime();
  const totalDistance = calculateDistance();
  const pace = totalTime / 60 / totalDistance;
  return {
    time: totalTime,
    distance: totalDistance,
    pace: pace
  };

  function calculateDistance() {
    let result = 0;
    for (let i = 1; i < points.length; i++) {
      result += distance(points[i-1], points[i]);
    }
    return result;
  }

  function distance(p1, p2) { ... }
  function radians(degrees) { ... }
  function calculateTime() { ... }
}
```

```ts
// 중첩 함수인 calculateDistance()를 최상위로 옮겨서 추적 거리를 다른 정보와는 독립적으로 계산할 수 있도록 진행

// after
function trackSummary(points) {
  const totalTime = calculateTime();
  const pace = totalTime / 60 / totalDistance(points);
  return {
    time: totalTime,
    distance: totalDistance(points),
    pace: pace
  };
}

function totalDistance(points) {
  let result = 0;
  for (let i = 1; i < points.length; i++) {
    result += distance(points[i-1], points[i]);
  }
  return result;
}

function distance(p1, p2) { ... }
function radians(degrees) { ... }
function calculateTime() { ... }
```

### 예시: 다른 클래스로 옮기기

```ts
// before
class Account {
  // ...
  get bankCharge() {
    let result = 4.5;
    if (this._daysOverdrawn > 0) result += this.overdraftCharge;
    return result;
  }

  get overdraftCharge() {
    if (this.type.isPremium) {
      const baseCharge = 10;
      if (this.daysOverdrawn <= 7) {
        return baseCharge;
      } else {
        return baseCharge + (this.daysOverdrawn - 7) * 0.05;
      }
    } else {
      return this.daysOverdrawn * 1.75;
    }
  }
}
```

```ts
// 계좌 종류에 따라 이자 책정 알고리즘이 달라지도록 수정
// overdraftCharge()를 계좌 종류 클래스인 AccountType으로 옮김

// after
class Account {
  // ...
  get bankCharge() {
    let result = 4.5;
    if (this._daysOverdrawn > 0) {
      result += this.type.overdraftCharge(this.daysOverdrawn);
    }
    return result;
  }
}

class AccountType {
  overdraftCharge(daysOverdrawn) {
    if (this.isPremium) {
      const baseCharge = 10;
      if (daysOverdrawn <= 7) {
        return baseCharge;
      } else {
        return baseCharge + (daysOverdrawn - 7) * 0.85;
      }
    } else {
      return this.daysOverdrawn * 1.75;
    }
  }
}
```

<br>

## 8.2 필드 옮기기

- 프로그램의 진짜 힘은 데이터 구조에서 나옴
- 주어진 문제에 적합한 데이터 구조를 선택해야 함
- 현재 데이터 구조가 적절하지 않다면 곧바로 수정해야 함
- 예를 들어, 함수에 항상 함께 건네지는 데이터 조각들은 상호 관계가 명확하게 드러나도록 한 레코드에 담는 게 좋음
- 구조체 여러 개에 정의된 똑같은 필드들을 갱신해야 한다면 한 번만 갱신해도 되는 다른 위치로 옮겨야 함
- 레코드 뿐 아니라 클래스나 객체가 와도 마찬가지. 클래스의 데이터들은 접근자 메서드들 뒤에 감줘져 있으므로 클래스에 곁들여진 함수들은 데이터를 이리저리 옮기는 작업을 쉽게 해줌

### 절차

1. 소스 필드가 캡슐화되어 있지 않다면 캡슐화 함
2. 테스트
3. 타겟 객체에 필드(와 접근자 메서드들)를 생성함
4. 정적 검사를 수행함
5. 소스 객체에서 타겟 객체를 참조할 수 있는지 확인함
6. 접근자들이 타겟 필드를 사용하도록 수정함
7. 테스트함
8. 소스 필드를 제거함
9. 테스트함

### 예시

```ts
// before
class Customer {
  constructor(name, discountRate) {
    this._name = name;
    this._discountRate = discountRate;
    this._contract = new CustomerContract(dateToday());
  }

  get discountRate() {
    return this._discountRate;
  }

  becomePreferred() {
    this._discountRate += 0.03;
    // ...
  }

  applyDiscount(amount) {
    return amount.subtract(amount.multiply(this._discountRate));
  }
}

class CustomerContract {
  constructor(startDate) {
    this._startDate = startDate;
  }
}
```

```ts
// after
// - discountRate 필드를 Customer에서 CustomerContract로 옮김

class Customer {
  constructor(name, discountRate) {
    this._name = name;
    this._contract = new CustomerContract(dateToday());
    this._setDiscountRate(discountRate);
  }

  get discountRate() {
    return this._contract._discountRate;
  }

  _setDiscountRate(aNumber) {
    this._contract._discountRate = aNumber;
  }

  becomePreferred() {
    this._setDiscountRate(this.discountRate + 0.03);
    // ...
  }

  applyDiscount(amount) {
    return amount.subtract(amount.multiply(this.discountRate));
  }
}

class CustomerContract {
  constructor(startDate, discountRate) {
    this._startDate = startDate;
    this._discountRate = discountRate;
  }

  get discountRate() {
    return this._discountRate;
  }

  set discountRate(arg) {
    this._discountRate = arg;
  }
}
```

<br>

### 참고

- [리팩터링 2판 책](https://www.yes24.com/Product/Goods/89649360)

```toc

```
