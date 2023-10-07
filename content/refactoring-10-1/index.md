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

## 참고

- [리팩터링 2판 책](https://www.yes24.com/Product/Goods/89649360)

```toc

```
