---
emoji: 👋
title: '리팩터링 10장-2'
date: '2023-10-11 07:28:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## 10.5 특이 케이스 추가하기

- 코드베이스에서 특정 값에 대해 똑같이 반응하는 코드가 여러 곳이라면 그 반응들을 한 데로 모으는 게 효율적임 이때 특수한 경우의 공통 동작을 요소 하나에 모아서 사용하는 특이 케이스 패턴을 사용함

### 절차

- 리팩터링의 대상이 될 속성을 담은 데이터 구조(혹은 클래스)를 컨테이너라고 함

1. 컨테이너에 특이 케이스인지를 검사하는 속성을 추가하고, `false`를 반환하게 함
2. 특이 케이스 객체를 만듦. 이 객체는 특이 케이스인지를 검사하는 속성만 포함하며, 이 속성은 `true`를 반환하게 함
3. 클라이언트에서 특이 케이스인지를 검사하는 코드를 함수로 추출함. 모든 클라이언트가 값을 직접 비교하는 대신 방금 추출한 함수를 사용하도록 고침
4. 코드에 새로운 특이 케이스 대상을 추가함. 함수의 반환 값으로 받거나 변환 함수를 적용
5. 특이 케이스를 검사하는 함수 본문을 수정하여 특이 케이스 객체의 속성을 사용
6. 테스트
7. 여러 함수를 클래스로 묶기나 여러 함수를 변환 함수로 묶기를 적용하여 특이 케이스를 처리하는 공통 동작을 새로운 요소로 옮김.
8. 아직도 특이 케이스 검사 함수를 이용하는 곳이 남아 있다면 검사 함수를 인라인함

### 예시: 클래스

```ts
class Site {
  get customer() { return this._customer; }
}

class Customer {
  get name() { ...  }
  get billingPlan() { ... }
  set billingPlan(arg) { ... }
  get paymentHistory() { ... }
}

// 클라이언트 1
const aCustomer = site.customer;
let customerName;
if (aCustomer === "미확인 고객") {
  customerName = "거주자";
} else {
  customerName = aCustomer.name;
}

// 클라이언트 2
const plan = (aCustomer === "미확인 고객") ?
      registry.billingPlans.basic
			: aCustomer.billingPlans;

// 클라이언트 3
if (aCustomer !== "미확인 고객") {
  aCustomer.billingPlan = newPlan;
}

// 클라이언트 4
const weekDelinquent = (aCustomer === "미확인 고객") ?
      0
      : aCustomer.paymentHistory.weeksDelinquentInLastYear;

```

```ts
// 클라이언트들은 알려지지 않은 “미확인 고객” 필드를 처리

class Site {
  get customer() {
    return this._customer === '미확인 고객' ? new UnknownCustomer() : this._customer;
  }
}

class Customer {
  get isUnknown() {
    return false;
  }
}

class UnknownCustomer {
  get isUnknown() {
    return true;
  }

  get name() {
    return '거주자';
  }

  get billingPlan() {
    return registry.billingPlans.basic;
  }

  set billingPlan(arg) {
    // ...
  }
}

function isUnknown(arg) {
  if (!(arg instanceof Customer || arg instanceof UnknownCustomer)) {
    throw new Error(`잘못된 값과 비교: <${arg}>`);
  }
  return arg.isUnknown;
}

// 클라이언트 (읽는 경우)
const plan = aCustomer.billingPlan;

// 클라이언트 (쓰는 경우)
aCustomer.billingPlan = newPlan;
class NullPaymentHistory {
  get weeksDelinquentInLastYear() {
    return 0;
  }
}

// 클라이언트 4
const weekDelinquent = aCustomer.paymentHistory.weeksDelinquentInLastYear;
```

### 예시: 객체 리터럴

```ts
class Site {
  get customer() {
    return (this._customer === "미확인 고객") ? createUnknownCustomer() : this._customer;
  }
}

class Customer {
  get name() { ... }
  get billingPlan() { ... }
  set billingPlan(arg) { ... }
  get paymentHistory() { ... }
  get isUnknown() {
    return false;
  }
}

function createUnknownCustomer() {
  return {
    isUnknown: true,
    name: "거주자",
    billingPlan: registry.billingPlans.basic,
    paymentHistory: {
      weeksDelinquentInLastYear: 0,
    }
  }
}

function isUnknown(arg) {
  return arg.isUnknown;
}

// 클라이언트 1
customerName = aCustomer.name;

// 클라이언트 2
const plan = aCustomer.billingPlans;

// 클라이언트 3
const weekDelinquent = aCustomer.paymentHistory.weeksDelinquentInLastYear;
```

<br>

## 10.6 어서션 추가하기

- 특정 조건이 참일 때만 제대로 동작하는 코드 영역이 있을 수 있음. 어서션을 이용하면, 코드 자체에 필요한 가정을 항상 명시적으로 기술할 수 있음
- 어서션은 항상 참이라고 가정하는 조건부 문장으로, 어서션이 실패했다는 건 프로그래머가 잘못했다는 뜻. 어서션은 오류 찾기에 활용될 뿐 아니라, 프로그램이 어떤 상태임을 가정한 채 실행되는지를 다른 개발자에게 알려주는 훌륭한 소통 도구

### 절차

1. 참이라고 가정하는 조건이 보이면 그 조건을 명시하는 어서션을 추가

### 예시

```ts
// 이 코드에는 할인율이 항상 양수라는 가정이 깔려 있음
class Customer {
  applyDiscount(aNumber) {
    return this.discountRate ? aNumber - this.discountRate * aNumber : aNumber;
  }
}
```

```ts
// 이런 어서션은 오류의 출처를 특정하기 어려울 때 도움이 됨
class Customer {
  applyDiscount(aNumber) {
    if (!this.discountRate) return aNumber;
    else {
      assert(this.discountRate >= 0);
      return aNumber - this.discountRate * aNumber;
    }
  }

  set discountRate(aNumber) {
    assert(null === aNumber || aNumber >= 0);
    this._discountRate = aNumber;
  }
}
```

<br>

## 참고

- [리팩터링 2판 책](https://www.yes24.com/Product/Goods/89649360)

```toc

```
