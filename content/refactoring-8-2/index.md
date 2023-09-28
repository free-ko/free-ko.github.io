---
emoji: 👋
title: '리팩터링 8장-2'
date: '2023-09-27 10:50:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## 8.5 인라인 코드를 함수 호출로 바꾸기

- 함수는 동작의 목적을 말해주기 때문에 코드를 이해하기 쉽게 해주고, 중복을 없애줌
- 이미 존재하는 함수와 똑같은 일을 하는 인라인 코드를 발견하면 해당 코드를 함수 호출로 대체할 수 있음. 특히 라이브러리가 제공하는 함수로 대체할 수 있다면 훨씬 좋음

### 절차

1. 인라인 코드를 함수 호출로 대체
2. 테스트

### 예시

```ts
// before
let appliesToMass = false;
for (const s of states) {
  if (s === 'MA') appliesToMass = true;
}
```

```ts
// after
appliesToMass = states.includes('MA');
```

<br>

## 8.6 문장 슬라이드하기

- 하나의 데이터 구조를 이용하는 문장들은 한데 모여 있어야 좋음
- 문장 슬라이드하기 리팩터링으로 이런 코드들을 한데 모아둘 수 있음
- 관련 있는 코드들은 명확히 구분되는 함수로 추출하는 것이 좋음

### 절차

1. 코드 조각(문장들)을 이동할 목표 위치를 찾음
2. 코드 조각의 원래 위치와 목표 위치 사이의 코드들을 훑어보면서, 조각을 모으고 나면 동작이 달라지는 코드가 있는지 살핌
3. 코드 조각을 원래 위치에서 잘라내어 목표 위치에 붙여 넣음
4. 테스트함

### 예시

- 코드 조각을 슬라이드할 때는 1) 무엇을 슬라이드할지와 2) 슬라이드할 수 있는지 여부를 확인해야 함

```ts
// before
const pricingPlan = retrievePricingPlan();
const order = retrieveOrder();
const baseCharge = pricingPlan.base;
let charge;
const chargePerUnit = pricingPlan.unit;
const units = order.units;
let discount;
charge = baseCharge + units * chargePerUnit;
let discountableUnits = Math.max(units - pricingPlan.discountThreshold, 0);
discount = discountableUnits * pricingPlan.discountFactor;
if (order.isRepeat) discount += 20;
charge = charge - discount;
chargeOrder(charge);
```

- 슬라이드가 안전한 지를 판단하려면 관련된 연산이 무엇이고 어떻게 구성되는지를 완벽히 이해
- 부수효과가 있는 코드를 슬라이드하거나 부수효과가 있는 코드를 건너뛰어야 한다면 훨씬 신중해야 함. 또 상태 갱신에 특히나 신경 써야 하기 때문에 상태를 갱신하는 코드 자체를 최대한 제거하는 게 좋음
- 슬라이드 후 테스트가 실패했을 때 가장 좋은 대처는 더 작게 슬라이드해보는 것이 좋음

### 더 읽을거리

- 문장 교환하기라는 이름의 거의 똑같은 리팩터링 방법은 인접한 코드 조각을 이동하지만, 문장 하나짜리 조각만 취급함
- 따라서 이동한 조각과 건너뛸 조각 모두 단일 문장으로 구성된 문장 슬라이드로 생각해도 됨

<br>

### 참고

- [리팩터링 2판 책](https://www.yes24.com/Product/Goods/89649360)

```toc

```

```

```
