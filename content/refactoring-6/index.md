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

### 참고

- [리팩터링 2판 책](https://www.yes24.com/Product/Goods/89649360)

```toc

```
