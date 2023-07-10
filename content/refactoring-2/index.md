---
emoji: 👋
title: '리팩터링 1장-2'
date: '2023-07-10 21:01:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## 1.6 계산 단계와 포맷팅 단계 분리하기

1.  앞서 작성한 코드를 두 단계로 나눔

    - `statement()`에 필요한 데이터를 처리
    - 앞서 처리한 결과를 텍스트나 HTML로 표현

2.  그 다음 함수를 추출 이때 계산 관련 코드는 전부 `statement()` 함수로 모으고 `renderPlainText()`는 `data`` 매개변수로 전달된 데이터만 처리하게 만듦

    ```ts
    function statement(invoice, plays) {
    const statementData = {};
    // 고객 데이터, 공연 정보를 중간 데이터로 옮김
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances;

    // 필요 없어진 인수 삭제
    return renderPlainText(statementData, plays);
    }

    function renderPlainText(data, plays) {
    // ...
    function totalAmount() { ... }
    function totalVolumeCredits() { ... }
    function usd(aNumber) { ... }
    function volumeCreditsFor(aPerformance) { ... }
    function playFor(aPerformance) { ... }
    function amountFor(aPerformance) { ... }
    }
    ```

3.  연극 제목도 중간 데이터 구조에서 가져옴

    ```ts
    function statement(invoice, plays) {
      const statementData = {};
      statementData.customer = invoice.customer;
      statementData.performances = invoice.performances.map(enrichPerformances);

      return renderPlainText(statementData, plays);

      function enrichPerformance(aPerformance) {
        const result = Object.assign({}, aPerformance);
        return result;
      }
    }
    ```

4.  이제 `playFor()` 함수와 `amountFor()` 함수를 `statement()`로 옮겨줌

    ```ts
    function statement(invoice, plays) {
    // ...

    function enrichPerformance(aPerformance) {
      const result = Object.assign({}, aPerformance);
      // 중간 데이터에 연극 정보를 저장
      result.play = playFor(result);
      result.amount = amountFor(result);

      return result;
    }

    // renderPlainText()의 중첩 함수였던 playFor()를 statement()로 옮김
    function playFor(aPerformance) {
      return plays[aPerformance.playID];
    }

    function amountFor(aPerformance) { ... }
    }
    ```

    - `renderPlainText()` 안에서 `playFor()`와 `amountFor()`를 호출하던 부분을 중간 데이터를 사용하도록 바꿔주고, 같은 방식으로 다른 중첩 함수들도 옮겨주었음

5.  다음으로는 반복문을 파이프라인으로 바꿈

    ```ts
    function totalAmount(data) {
      // for 반복문을 파이프라인으로 바꿈
      return data.performances.reduce((total, p) => total + p.amount, 0);
    }

    function totalVolumeCredits(data) {
      // for 반복문을 파이프라인으로 바꿈
      return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
    }
    ```

6.  이제 `statement()`에 필요한 데이터 처리에 해당하는 코드를 모두 별도 함수로 빼냄

    ```ts
      function statement(invoice, plays) {
        return renderPlainText(createStatementData(invoice, plays));
      }

      // 중간 데이터 생성을 전담
      function createStatementData(invoice, plays) {
        const result = {};
        result.customer = invoice.customer;
        result.performances = invoice.performances.map(enrichPerformance);
        result.totalAmount = totalAmount(result);
        result.totalVolumeCredits = totalVolumeCredits(result);

        return result;

        function enrichPerformance(aPerformance) { ... }
        function playFor(aPerformance) { ... }
        function amountFor(aPerformance) { ... }
        function volumeCreditsFor(aPerformance) { ... }
        function totalAmount() { ... }
        function totalVolumeCredits() { ... }
      }

    ```

7.  마지막으로, 단계별로 분리한 코드를 별도 파일에 저장한 후 HTML 버전을 작성 함

<br>

### 참고

- [리팩터링 2판 책](https://www.yes24.com/Product/Goods/89649360)

```toc

```
