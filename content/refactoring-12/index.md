---
emoji: 👋
title: '리팩터링 12장'
date: '2023-11-03 07:19:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## 12.1 메서드 올리기

- 메서드 올리기를 적용하기 가장 쉬운 상황은 메서드들의 본문 코드가 똑같을 때. 그러나 메서드 올리기 리팩터링을 적용하려면 선행 단계를 거쳐야 할 때가 많음
- 메서드 올리기를 적용하기에 가장 이상하고 복잡한 상황은 해당 메서드의 본문에서 참조하는 필드들이 서브클래스에만 있는 경우. 두 메서드의 전체 흐름은 비슷하지만 세부 내용이 다르다면 템플릿 메서드 만들기를 고려

### 절차

1. 똑같이 동작하는 메서드인지 면밀히 살핌
2. 메서드 안에서 호출하는 다른 메서드와 참조하는 필드들을 슈퍼클래스에서도 호출하고 참조할 수 있는지 확인
3. 메서드 시그니처가 다르다면 함수 선언 바꾸기로 슈퍼클래스에서 사용하고 싶은 형태로 통일
4. 슈퍼클래스에 새로운 메서드를 생성하고, 대상 메서드의 코드를 복사해넣음
5. 정적 검사를 수행
6. 서브클래스 중 하나의 메서드를 제거
7. 모든 서브클래스의 메서드가 없어질 때까지 다른 서브클래스의 메서드를 하나씩 제거

### 예시

```ts
// before
// Employee 클래스(Party를 상속함)
get annualCost() {
  return this.monthlyCost * 12;
}

// Department 클래스(Party를 상속함)
get totalAnnualCost() {
  return this.monthlyCost * 12;
}
```

```ts
// after
// Party 클래스
get annualCost() {
  return this.monthlyCost * 12;
}
```

<br>

## 참고

- [리팩터링 2판 책](https://www.yes24.com/Product/Goods/89649360)

```toc

```
