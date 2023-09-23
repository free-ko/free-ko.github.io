---
emoji: 👋
title: '리팩터링 1장-1'
date: '2023-07-06 22:01:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## 1.2 예시 프로그램

1. 프로그램이 새로운 기능을 추가하기에 편한 구조가 아니라면, 먼저 기능을 추가하기 쉬운 형태로 리팩터링하고 나서 원하는 기능을 추가 함

<br>

## 1.3 리팩터링의 첫 단계

1. 리팩터링할 코드 영역을 꼼꼼하게 검사해줄 테스트 코드 마련하기

2. 리팩터링하기 전에 제대로 된 테스트부터 마련

<br>

## 1.4 statement() 함수 쪼개기

```ts
// Before refactoring
import plays from './plays.json';
import invoices from './invoices.json';

function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;

    switch (play.type) {
      case 'tragedy':
        thisAmount = 40000;
        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;

      case 'comedy':
        thisAmount = 30000;
        if (perf.audience > 20) {
          thisAmount += 10000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }

    // 포인트를 적립한다.
    volumeCredits += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);

    // 청구 내역을 출력한다.
    result += `${play.name}: ${format(thisAmount / 100)} (${perf.audience}석)\n`;
    totalAmount += thisAmount;
  }

  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}

invoices.map((invoice) => console.log(statement(invoice, plays)));
```

1.  테스트

    - 간단한 수정도 리팩터링 후에는 항상 테스트하는 습관
    - 조금씩 변경하고 매번 테스트하는 것은 리팩터링 절차의 핵심

2.  함수 추출하기

    - 자바스크립트에서는 중첩 함수를 사용하면 바깥 함수의 변수를 새로 추출한 함수에 매개변수로 전달할 필요가 없음.
    - 추출된 함수 코드에서 보다 명확하게 표현할 수 있는 것들을 찾아야 함 (ex. 변수 이름)
    - 추출된 함수의 반환 값은 result 등의 네이밍으로 통일해줄 수 있음

3.  임시 변수 제거

    ```ts
    // 😵 bad
    const play = plays[perf.playID];

    // 😗 normal
    function playFor(aPerformance) {
      return plays[aPerformance.playID];
    }

    const play = playFor(perf);

    // 😄 good (변수 인라인)
    let thisAmount = amountFor(perf, playFor(perf));

    // -> 지역 변수를 제거하면 유효범위를 신경 썽 할 대상이 줄어들어 추출 작업이 쉬워짐
    ```

4.  적립 포인트 계산 코드 추출
5.  format 변수 제거
    - 함수 선언 바꾸기(함수의 핵심 기능을 살려주는 네이밍으로 바꿈)
6.  volumeCredits 변수 제거

    - 반복문 쪼개기

      - 로직에 따라 별도의 for문으로 분리
      - 반복문을 쪼개서 발생하는 중복은 성능에 미치는 영향이 미미
      - 리팩터링으로 인한 성능 문제는 “특별한 경우가 아니라면 일단 무시”

    - 문장 슬라이드하기
      - volumeCredits 값 갱신과 관련한 문장들을 한데 모음
      - 임시 변수를 질의 함수로 바꾸기가 수월해짐

<br>

## 참고

- [리팩터링 2판 책](https://www.yes24.com/Product/Goods/89649360)

```toc

```
