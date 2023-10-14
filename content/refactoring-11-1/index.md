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

## 참고

- [리팩터링 2판 책](https://www.yes24.com/Product/Goods/89649360)

```toc

```
