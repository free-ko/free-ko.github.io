---
emoji: 👋
title: '리팩터링 6장'
date: '2023-09-01 20:48:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## 6.1 함수 추출하기

- 코드 조각을 찾아 무슨 일을 하는지 파악한 다음, 독립된 함수로 추출하고 목적에 맞는 이름 붙임
- 코드를 독립된 함수로 묶는 기준은 ‘목적과 구현을 분리’하는 것
- 코드를 보고 무슨 일을 하는지 파악하는 데 한참이 걸린다면 그 부분을 함수로 추출한 뒤 ‘무슨 일’에 걸맞는 이름을 지음
- 함수는 짧게 작성(함수가 짧으면 캐싱하기도 쉽기 때문에 컴파일러가 최적화하는 데 유리할 때가 많음)
- 짧은 함수는 이름 짓기에 특별히 신경 써야 함(별도의 문서 없이 코드 자체만으로 내용을 충분히 설명되게 만들어야 함)

절차

1. 함수를 새로 만들고 목적을 잘 드러내는 이름을 붙임 (’어떻게’가 아닌 ‘무엇을’ 하는지가 드러나야 함)
2. 추출할 코드를 원본 함수에서 복사하여 새 함수에 붙여넣음
3. 추출한 코드 중 원본 함수의 지역 변수를 참조하거나 추출한 함수의 유효범위를 벗어나는 변수는 없는지 검사(있다면 매개변수로 전달함)
4. 변수를 다 처리했다면 컴파일
5. 원본 함수에서 추출한 코드 부분을 새로 만든 함수를 호출하는 문장으로 바꿈(즉, 추출한 함수로 일을 위임함)
6. 테스트
7. 다른 코드에 방금 추출한 것과 똑같거나 비슷한 코드가 없는지 확인. 있다면 방금 추출한 새 함수를 호출하도록 바꿀지 검토(인라인 코드를 함수 호출로 변경)

> 함수를 중첩시키면, 추출한 함수에서 원본 함수에 정의된 모든 변수에 접근할 수 있지만, 중첩 함수를 지원하지 않는 언어에서는 불가능한 방법.
> 따라서 원본 함수에서만 접근할 수 있는 변수들에 특별히 신경 써야함

예시코드

```ts
// before
function printOwing(invoice) {
  let outstanding = 0;

  console.log('***************');
  console.log('**** 고객 채무 ****');
  console.log('***************');

  for (const o of invoice.orders) {
    outstanding += o.amount;
  }

  const today = Clock.today;
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);

  console.log(`고객명: ${invoice.customer}`);
  console.log(`채무액: ${customer}`);
  console.log(`마감일: ${invoice.dueDate.toLocaleDateString}`);
}
```

```ts
// after
function printOwing(invoice) {
  printBanner();
  const outstanding = calculateOutstanding(invoice);
  recordDueDate(invoice);
  printDetails(invoice, outstanding);
}

function calculateOutstanding(invoice) {
  let result = 0;
  for (const o of invoice.orders) {
    result += o.amount;
  }
  return result;
}

function recordDueDate(invoice) {
  const today = Clock.today;
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
}

function printDetails(invoice, outstanding) {
  console.log(`고객명: ${invoice.customer}`);
  console.log(`채무액: ${customer}`);
  console.log(`마감일: ${invoice.dueDate.toLocaleDateString}`);
}
```

<br>

## 6.2 함수 인라인하기

- 함수 본문이 이름만큼 명확하거나, 리팩터링 과정에서 잘못 추출된 함수들은 인라인함.(간접 호출을 너무 과하게 쓰는 코드도 흔한 인라인 대상)

절차

1. 다형 메서드인지 확인(서브클래스에서 오버라이드하는 메서드는 인라인하면 안 됨)
2. 인라인할 함수를 호출하는 곳을 모두 찾음
3. 각 호출문을 함수 본문으로 교체함
4. 하나씩 교체할 때마다 테스트함
5. 함수 정의(원래 함수)를 삭제함

```ts
// before
function reportLines(aCustomer) {
  const lines = [];
  gatherCustomerData(lines, aCustomer);
  return lines;
}

function gatherCustomerData(out, aCustomer) {
  out.push(['name', aCustomer.name]);
  out.push(['location', aCustomer.location]);
}
```

```ts
// after
function reportLines(aCustomer) {
  const lines = [];
  lines.push(['name', aCustomer.name]);
  lines.push(['location', aCustomer.location]);
  return lines;
}
```

핵심은 항상 단계를 잘게 나눠서 처리하는 것

<br>

## 6.3 변수 추출하기

- 지역 변수를 활용하면 표현식을 쪼개 관리하기 더 쉽게 만들고, 복잡한 로직을 구성하는 단계마다 이름을 붙일 수 있어서 코드의 목적을 훨씬 명확하게 드러낼 수 있음 또 디버깅에도 도움이 됨
- 변수 추출, 즉 표현식에 이름을 붙이기로 했다면 그 이름이 들어갈 문맥도 살펴야 함
- 함수를 벗어난 넓은 문맥에서까지 의미가 된다면 변수가 아닌 함수로 추출해야 함

절차

1. 추출하려는 표현식에 부작용은 없는지 확인
2. 불변 변수를 하나 선언하고 이름을 붙인 표현식의 복제본을 대입 함
3. 원본 표현식을 새로 만든 변수로 교체함
4. 테스트 함
5. 표현식을 여러 곳에서 사용한다면 각각을 새로 만든 변수로 교체, 하나 교체할 때마다 테스트 함

예시 코드

```ts
// before
function price(order) {
  // 가격(price) = 기본 가격 - 수량 할인 + 배송비
  return (
    order.quantity * order.itemPrice -
    Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
    Math.min(order.quantity * order.itemPrice * 0.1, 100)
  );
}
```

```ts
// after
function price(order) {
  const basePrice = order.quantity * order.itemPrice;
  const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
  const shipping = Math.min(order.quantity * order.itemPrice * 0.1, 100);
  return basePrice - quantityDiscount + shipping;
}
```

- 같은 코드를 클래스 문맥 안에서는 변수가 아닌 메서드로 추출할 수 있음

```ts
class Order {
  constructor(aRecord) {
    this._data = aRecord;
  }

  get quantity() {
    return this._data.quantity;
  }

  get itemPrice() {
    return this._data.itemPrice;
  }

  get price() {
    return this.basePrice - this.quantityDiscount + this.shipping;
  }

  get basePrice() {
    return this.quantity * this.itemPrice;
  }

  get quantityDiscount() {
    return Math.max(0, this.quantity - 500) * this.itemPrice * 0.05;
  }

  get shipping() {
    return Math.min(this.basePrice * 0.1, 100);
  }
}
```

<br>

## 6.4 변수 인라인하기

절차

1. 대입문의 우변(표현식)에서 부작용이 생기지는 않는지 확인함
2. 변수가 불변으로 선언되지 않았다면 불변으로 만든 후 테스트함
3. 이 변수를 가장 처음 사용하는 코드를 찾아서 대입문 우변의 코드로 바꿈
4. 테스트
5. 변수를 사용하는 부분을 모두 교체할 때까지 이 과정을 반복
6. 변수 선언문과 대입문을 지움
7. 테스트

예시 코드

```ts
// before
let basePrice = anOrder.basePrice;
return basePrice > 1000;
```

```ts
// after
return anOrder.basePrice > 1000;
```

<br>

## 6.5 함수 선언 바꾸기

- 함수는 프로그램을 작은 부분으로 나누는 주된 수단
- 함수 선언은 각 부분이 서로 맞물리는 방식을 표현하며, 실질적으로 소프트웨어 시스템의 구성 요소를 조립하는 연결부 역할
- 이러한 연결부에서 가장 중요한 것은 함수의 이름
- 함수 구현 코드를 살펴볼 필요 없이 호출문만 보고도 무슨 일을 하는지 파악할 수 있어야 함
- 함수의 매개변수 역시 중요
- 매개변수는 함수를 사용하는 문맥을 설정 함
- 매개변수를 적절히 사용하여 함수의 활용 범위를 넓힐 수 있으며, 다른 모듈과의 결합을 제거할 수도 있음

간단한 절차

1. 매개변수를 제거하려거든 먼저 함수 본문에서 제거 대상 매개변수를 참조하는 곳은 없는지 확인 함
2. 메서드 선언을 원하는 형태로 바꿈
3. 기존 메서드 선언을 참조하는 부분을 모두 찾아서 바뀐 형태로 수정함
4. 테스트한다.

마이그레이션 절차

1. 이어지는 추출 단계를 수월하게 만들어야 한다면 함수의 본문을 적절히 리팩터링 함
2. 함수 본문을 새로운 함수로 추출 함
3. 추출한 함수에 매개변수를 추가해야 한다면 ‘간단한 절차’를 따라 추가 함
4. 테스트한다.
5. 기존 함수를 인라인
6. 이름을 임시로 붙여뒀다면 함수 선언 바꾸기를 한 번 더 적용해서 원래 이름으로 되돌림
7. 테스트

예시 코드

```ts
// before
function inNewEngland(aCustomer) {
  return ['MA', 'CT', 'ME', 'VT', 'NH', 'RI'].includes(aCustomer.address.state);
}

const newEnglanders = someCustomers.filter((c) => inNewEngland(c));
```

```ts
// after
function inNewEngland(stateCode) {
  return ['MA', 'CT', 'ME', 'VT', 'NH', 'RI'].includes(stateCode);
}

const newEnglanders = someCustomers.filter((c) => inNewEngland(c.address.satate));
```

<br>

## 6.6 변수 선언하기

- 데이터는 참조하는 모든 부분을 한 번에 바꿔야 코드가 제대로 작동하기 때문에 함수보다 다루기가 까다로움
- 접근할 수 있는 범위가 넓은 데이터를 옮길 때는 먼저 그 데이터로의 접근을 독점하려는 함수를 만드는 식으로 캡슐화하는 것이 좋음
- 데이터 캡슐화는 데이터 변경 전 검증이나 변경 후 추가 로직을 쉽게 끼워넣을 수 있다는 장점도 있음
- 데이터의 캡슐화를 위해 객체 지향에서 객체의 데이터는 항상 private으로 유지해야 함

절차

1. 변수로의 접근과 갱신을 전담하는 캡슐화 함수들을 만듦
2. 정적 검사를 수행
3. 변수를 직접 참조하던 부분을 모두 적절한 캡슐화 함수 호출로 바꿈. 하나씩 바꿀 때마다 테스트 진행
4. 변수의 접근 범위를 제한
5. 테스트
6. 변수 값이 레코드라면 레코드 캡슐화하기를 적용할지 고려해봄

예시 코드

```ts
// before
// 전역 변수에 중요한 데이터가 담겨 있는 경우
let defaultOwner = { firstName: '마틴', lastName: '파울러' };
// 데이터를 참조하는 코드
spaceship.owner = defaultOwner;
// 데이터를 갱신하는 코드
defaultOwner = { firstName: '레베카', lastName: '파슨스' };
```

```ts
// after
// defaultOwner.js
let defaultOwner = { firstName: '마틴', lastName: '파울러' };
export function getDefaultOwner() {
  return defaultOwner;
}
export function setDefaultOwner(arg) {
  defaultOwner = arg;
}
```

값 캡슐화하기

- 변수뿐 아니라 변수에 담긴 내용을 변경하는 행위까지 제어할 수 있게 캡슐화
- 게터가 데이터의 복제본을 반환하도록 수정

```ts
export function getDefaultOwner() {
  return Object.assign({}, defaultOwner);
}
```

- 레코드 캡슐화를 통해 아예 변경할 수 없게 만드는 방법도 있음

<br>

### 참고

- [리팩터링 2판 책](https://www.yes24.com/Product/Goods/89649360)

```toc

```
