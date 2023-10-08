---
emoji: 👋
title: '리팩터링 10장-1'
date: '2023-10-07 13:50:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## 10.1 조건문 분해하기

- 복잡한 조건부 로직은 프로그램을 복잡하게 만듦
- 코드를 부위별로 분해한 다음 해체된 코드 덩어리들을 각 덩어리의 의도를 살린 이름의 함수 호출로 바꿔주면 전체적인 의도가 더 확실히 드러남

### 절차

- 조건식과 그 조건식에 딸린 조건절 각각을 함수로 추출함

### 예시

```ts
// before
if (!aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd)) {
  charge = quantity * plan.summerRate;
} else {
  charge = quantity * plan.regularRate + plan.regularServiceCharge;
}
```

```ts
// after
function summer() {
  return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
}

function summerCharge() {
  return quantity * plan.summerRate;
}

function regularcharge() {
  return quantity * plan.regularRate + plan.regularServiceCharge;
}

if (summer()) {
  charge = summerCharge();
} else {
  charge = quantity * plan.regularRate + plan.regularServiceCharge;
}
```

<br>

## 10.2 조건식 통합하기

- 비교하는 조건은 다르지만 그 결과로 수행하는 동작은 똑같은 코드들이 있다면 조건 검사도 하나로 통합하는 것이 좋음
- `and` 연산자와 `or` 연산자를 사용하면 여러 개의 비교 로직을 하나로 합칠 수 있음
- 조건부 코드를 통합하는 것이 중요한 이유는 2가지
  1. 여러 조각으로 나뉜 조건들을 하나로 통합함으로써 내가 하려는 일이 더 명확해짐
  2. 복잡한 조건식을 함수로 추출하면 코드의 의도가 훨씬 분명하게 드러남

### 절차

1. 해당 조건식들 모두에 부수효과가 없는지 확인함
2. 조건문 두 개를 선택하여 두 조건문의 조건식들을 논리 연산자로 결합함
3. 테스트함
4. 조건이 하나만 남을 때까지 2~3 과정을 반복함
5. 하나로 합쳐진 조건식을 함수로 추출할지 고려해봄

### 예시: or 사용하기

```ts
// before
function disabilityAmount(anEmployee) {
  if (anEmployee.seniority < 2) return 0;
  if (anEmployee.monthDisabled > 12) return 0;
  if (anEmployee.isPartTime) return 0;
}
```

```ts
// after
function disabilityAmount(anEmployee) {
  if (isNotEligibleForDisability()) return 0;
}

function isNotEligibleForDisability() {
  return anEmployee.seniority < 2 || anEmployee.monthDisabled > 12 || anEmployee.isPartTime;
}
```

<br>

## 참고

- [리팩터링 2판 책](https://www.yes24.com/Product/Goods/89649360)

```toc

```
