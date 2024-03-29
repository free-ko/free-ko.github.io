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

## 6.7 변수 이름 바꾸기

- 명확한 프로그래밍의 핵심은 이름짓기
- 간단한 변수의 경우 대체로 파악이 쉽지만, 함수 호출 한 번으로 끝나지 않고 값이 영속되는 필드라면 신중하게 이름을 지어야 함

### 절차

1. 폭넓게 쓰이는 변수라면 변수 캡슐화하기를 고려
2. 이름을 바꿀 변수를 참조하는 곳을 모두 찾아서, 하나씩 변경
3. 테스트

### 예시

```ts
// before
let tpHd = 'untitled';

// 변수를 읽기만 하는 경우
result += `<h1>${tpHd}</h1>`;
// 값을 수정하는 경우
tpHd = obj['articleTitle'];
```

```ts
// after: getter와 setter를 통해 변수 캡슐화하기
result += `<h1>${title()}</h1>`;

setTitle(obj['articleTitle']);

let _title = 'untitled';

function title() {
  return _title;
}

function setTitle(arg) {
  _title = arg;
}
```

<br>

## 6.8 매개변수 객체 만들기

- 데이터 뭉치를 데이터 구조로 묶으면 데이터 사이의 관계가 명확해짐, 나아가 함수가 이 데이터 구조를 받게 하면 매개변수 수가 줄어듬

### 절차

1. 적당한 데이터 구조가 아직 마련되어 있지 않다면 새로 만듦
2. 테스트
3. 함수 선언 바꾸기로 새 데이터 구조를 매개변수로 추가
4. 테스트
5. 함수 호출 시 새로운 데이터 구조 인스턴스를 넘기도록 수정, 하나씩 수정할 때마다 테스트 진행
6. 기존 매개변수를 사용하던 코드를 새 데이터 구조의 원소를 사용하도록 바꿈
7. 다 바꿨다면 기존 매개변수를 제거하고 테스트 함

### 예시

```ts
// before
// 데이터
const station = {
  name: 'ZB1',
  readings: [
    { temp: 47, time: '2016-11-19 09:10' },
    { temp: 53, time: '2016-11-19 09:20' },
    { temp: 58, time: '2016-11-19 09:30' },
    { temp: 53, time: '2016-11-19 09:40' },
    { temp: 51, time: '2016-11-19 09:50' },
  ],
};

// 함수
function readingsOutsideRange(station, min, max) {
  return station.readings.filter((r) => r.temp < min || r.temp > max);
}

// 호출문
alerts = readingsOutsideRange(
  station,
  operatingPlan.temperatureFloor,
  operatingPlan.temperatureCeiling,
);
```

```ts
// after
class NumberRange {
  constructor(min, max) {
    this._data = { min: min, max: max };
  }
  get min() {
    return this._data.min;
  }
  get max() {
    return this._data.max;
  }
}

function readingsOutsideRange(station, range) {
  return station.readings.filter((r) => r.temp < range.min || r.temp > range.max);
}

const range = new NumberRange(operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling);

alerts = readingsOutsideRange(station, range);
```

<br>

## 6.9 여러 함수를 클래스로 묶기

- 클래스는 데이터와 함수를 하나의 공유 환경으로 묶은 후, 다른 프로그램 요소와 어우러질 수 있도록 그중 일부를 외부에 제공
- 공통 데이터를 중심으로 긴밀하게 엮여 작동하는 함수 무리는 클래스 하나로 묶을 수 있음
- 여러 함수를 클래스로 묶으면 클라이언트가 객체의 핵심 데이터를 변경할 수 있고, 파생 객체들을 일관되게 관리할 수 있음

### 절차

1. 함수들이 공유하는 공통 데이터 레코드를 캡슐화 함 2.공통 레코드를 사용하는 함수 각각을 새 클래스로 옮김
2. 데이터를 조작하는 로직들은 함수로 추출해서 새 클래스로 옮김

### 예시

```ts
// before
// 클라이언트 1
const aReading = acquireReading();
const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;

// 클라이언트 2
const aReading = acquireReading();
const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;
const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));
```

```ts
// after
class Reading {
  constructor(data) {
    this._customer = data.customer;
    this._quantity = data.quantity;
    this._month = data.month;
    this._year = data.year;
  }

  get customer() {
    return this._customer;
  }
  get quantity() {
    return this._quantity;
  }
  get month() {
    return this._month;
  }
  get year() {
    return this._year;
  }

  get baseCharge() {
    return baseRate(this.month, this.year) * this.quantity;
  }

  get taxableCharge() {
    return Math.max(0, this.baseCharge - taxThreshold(this.year));
  }
}

// 클라이언트 3
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const basicChargeAmount = aReading.baseCharge;
const taxableCharge = aReading.taxableCharge;
```

<br>

## 6.10 여러 함수를 변환 함수로 묶기

- 데이터를 입력받아서 여러 가지 정보를 도출하는 작업들을 한데로 모아두면 검색과 갱신을 일관된 장소에서 할 수 있고 로직 중복도 막을 수 있음
- 변환 함수를 사용하면 원본 데이터를 입력받아서 필요한 정보를 모두 도출한 뒤, 각각을 출력 데이터의 필드에 넣어 반환 함

> 💡 원본 데이터가 코드 안에서 갱신될 때는 클래스로 묶는 것이 좋음

### 절차

1. 변환할 레코드를 입력받아서 값을 그대로 반환하는 변환 함수를 만듦
2. 묶을 함수 중 함수 하나를 골라서 본문 코드를 변환 함수로 옮기고, 처리 결과를 레코드에 새 필드로 기록 그런 다음 클라이언트 코드가 이 필드를 사용하도록 수정 함
3. 테스트
4. 나머지 관련 함수도 위 과정에 따라 처리함

### 예시

```ts
// before
// 클라이언트 1
const aReading = acquireReading();
const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;

// 클라이언트 2
const aReading = acquireReading();
const base = baseRate(aReading.month, aReading.year) * aReading.quantity;
const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));

// 클라이언트 3
const aReading = acquireReading();
const basicChargeAmount = calculateBaseCharge(aReading);

function calculateBaseCharge(aReading) {
  return baseRate(aReading.month, aReading.year) * aReading.quantity;
}
```

```ts
// after
// 클라이언트 1, 3
const rawReading = acquireReading(); // 미가공 측정값
const aReading = enrichReading(rawReading);
const basicChargeAmount = aReading.baseCharge;

// 클라이언트 2
const rawReading = acquireReading(); // 미가공 측정값
const aReading = enrichReading(rawReading);
const taxableCharge = aReading.taxableCharge;

function enrichReading(original) {
  const result = _.cloneDeep(original);
  result.baseCharge = calculateBaseCharge(aReading);
  result.taxableCharge = Math.max(0, result.baseCharge - taxThreshold(result.year));

  return result;
}
```

- `enrichReading()` 처럼 정보를 추가해 반환할 때 원본 측정값 레코드는 변경하지 않아야 함

<br>

## 6.11 단계 쪼개기

- 서로 다른 두 대상을 한꺼번에 다루는 코드를 발견하면 각각을 별개 모듈로 나눌 수 있음
- 이렇게 분리하는 가장 간편한 방법 하나는 동작을 연이은 두 단계로 쪼개는 것
- 가장 대표적인 예는 컴파일러
- 컴파일 작업은 여러 단계가 순차적으로 연결된 형태로 분리되어 있음
- 각 단계는 자신만의 문제에 집중하기 때문에 나머지 단계에 관해서는 자세히 몰라도 이해할 수 있음

### 절차

1. 두 번째 단계에 해당하는 코드를 독립 함수로 추출함
2. 테스트
3. 중간 데이터 구조를 만들어서 앞에서 추출한 함수의 인수로 추가함
4. 테스트
5. 추출한 두 번째 단계 함수의 매개변수를 하나씩 검토. 그중 첫 번째 단계에서 사용되는 것은 중간 데이터 구조로 옮김 하나씩 옮길 때마다 테스트함
6. 첫 번째 단계 코드를 함수로 추출하면서 중간 데이터 구조를 반환하도록 만듦

### 예시

```ts
// before
function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity;
  const discount =
    Math.max(quantity - product.discountThreshold, 0) * product.basePrice * product.discountRate;
  const shippingPerCase =
    basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountedFee
      : shippingMethod.feePerCase;
  const shippingCost = quantity * shippingPerCase;
  const price = basePrice - discount + shippingCost;

  return price;
}
```

```ts
// after
function priceOrder(product, quantity, shippingMethod) {
  const priceData = calculatePricingData(product, quantity);
  return applyShipping(priceData, shippingMethod);
}

function calculatePricingData(product, quantity) {
  const basePrice = product.basePrice * quantity;
  const discount =
    Math.max(quantity - product.discountThreshold, 0) * product.basePrice * product.discountRate;
  return { basePrice, quantity, discount };
}

function applyShipping(priceData, shippingMethod) {
  const shippingPerCase =
    priceData.basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountedFee
      : shippingMethod.feePerCase;
  const shippingCost = priceData.quantity * shippingPerCase;
  return priceData.basePrice - priceData.discount + shippingCost;
}
```

- 험블 객체 패턴(Humble Object Pattern) : 명령줄 호출과 표준 출력에 쓰는 느리고 불편한 작업과 자주 테스트해야 할 복잡한 동작을 분리함으로써 테스트를 더 쉽게 수행하게 만듦

<br>

## 참고

- [리팩터링 2판 책](https://www.yes24.com/Product/Goods/89649360)

```toc

```
