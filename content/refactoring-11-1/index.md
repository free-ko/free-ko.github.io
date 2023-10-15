---
emoji: 👋
title: '리팩터링 11장-1'
date: '2023-10-14 10:04:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## 11.1 질의 함수와 변경 함수 분리하기

- 겉보기 부수효과가 있는 함수와 없는 함수는 명확히 구분하는 것이 좋음. 질의 함수(읽기 함수)는 모두 부수효과가 없어야 함. 이를 ‘명령-질의 분리’라고도 함

### 절차

1. 대상 함수를 복제하고 질의 목적에 충실한 이름을 지음
2. 새 질의 함수에서 부수효과를 모두 제거
3. 정적 검사를 수행
4. 원래 함수(변경 함수)를 호출하는 곳을 모두 찾아냄. 호출하는 곳에서 반환 값을 사용한다면 질의 함수를 호출하도록 바꾸고, 원래 함수를 호출하는 코드를 바로 아래 줄에 새로 추가함.하나 수정할 때마다 테스트 진행
5. 원래 함수에서 질의 관련 코드를 제거함
6. 테스트

### 예시

```ts
// before
function alertForMiscreant(people) {
  for (const p of people) {
    if (p === '범인') {
      setOffAlarms(); // 변경 함수
      return '범인'; // 질의 함수
    }
    if (p === '경찰') {
      setOffAlarms();
      return '경찰';
    }
  }
  return '';
}
```

```ts
// after
function findMiscreant(people) {
  for (const p of people) {
    if (p === '범인') {
      return '범인';
    }
    if (p === '경찰') {
      return '경찰';
    }
  }
  return '';
}

const found = findMiscreant(people);
alertForMiscreant(people);

function alertForMiscreant(people) {
  for (const p of people) {
    if (p === '범인') {
      setOffAlarms();
      return;
    }
    if (p === '경찰') {
      setOffAlarms();
      return;
    }
  }
  return;
}
```

<br>

## 11.2 함수 매개변수화하기

- 두 함수의 로직이 아주 비슷하고 단지 리터럴 값만 다르다면, 그 다른 값만 매개변수로 받아 처리하는 함수 하나로 합쳐서 중복을 없앨 수 있음.

### 절차

1. 비슷한 함수 중 하나를 선택함
2. 함수 선언 바꾸기로 리터럴들을 매개변수로 추가함
3. 이 함수를 호출하는 곳 모두에 적절한 리터럴 값을 추가함
4. 테스트함
5. 매개변수로 받은 값을 사용하도록 함수 본문을 수정함. 하나 수정할 때마다 테스트함.
6. 비슷한 다른 함수를 호출하는 코드를 찾아 매개변수화된 함수를 호출하도록 하나씩 수정함.
   하나 수정할 때마다 테스트함

### 예시

```ts
// before
function baseCharge(usage) {
  if (usage < 0) return usd(0);

  const amount = bottomBand(usage) * 0.03 + middleBand(usage) * 0.05 + topBand(usage) * 0.07;

  return usd(amount);
}

function bottomBand(usage) {
  return Math.min(usage, 100);
}

function middleBand(usage) {
  return usage > 100 ? Math.min(usage, 200) - 100 : 0;
}

function topBand(usage) {
  return usage > 200 ? usage - 200 : 0;
}
```

```ts
// after
function withinBand(usage, bottom, top) {
  return usage > bottom ? Math.min(usage, top) - bottom : 0;
}

function baseCharge(usage) {
  if (usage < 0) return usd(0);

  const amount =
    withinBand(usage, 0, 100) * 0.03 +
    withinBand(usage, 100, 200) * 0.05 +
    withinBand(usage, 200, Infinity) * 0.07;

  return usd(amount);
}
```

<br>

## 참고

- [리팩터링 2판 책](https://www.yes24.com/Product/Goods/89649360)

```toc

```
