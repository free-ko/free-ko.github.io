---
emoji: 👋
title: '리팩터링 4장'
date: '2023-08-23 22:03:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## 4.1 자가 테스트 코드의 가치

> 리팩터링을 제대로 하기 위해서는 실수를 잡아주는 견고한 테스트가 뒷받침돼야 한다.

1. 모든 테스트를 완전히 자동화하고 그 결과까지 스스로 검사하게 만들자

- 컴파일할 때마다 테스트도 함께 하면 생산성을 높일 수 있음
- 자가 테스트 코드 자체뿐 아니라 테스트를 자주 수행하는 습관도 버그를 찾는 강력한 도구가 됨

2. 테스트 스위트는 강력한 버그 검출 도구로, 버그를 찾는 데 걸리는 시간을 대폭 줄여줌

- 테스트를 작성하기 가장 좋은 시점은 프로그래밍을 시작하기 전
- 기능을 추가해야 할 때 테스트부터 작성 함
- 이로부터 켄트 벡의 ‘테스트 주도 개발(TDD)’ 기법이 탄생
- TDD에서는 테스트를 작성하고, 이 테스트를 통과하게끔 코드를 작성하고, 결과 코드를 최대한 깔끔하게 리팩터링하는 과정을 짧은 주기로 반복

<br>

## 4.2 테스트할 샘플 코드

비즈니스 로직 코드를 UI와 분리하여 코드를 파악하고 테스트하기 편하게 만들어줄 수 있음

## 4.3 첫 번째 테스트

테스트를 두 단계로 진행

```ts
// 1. 테스트에 필요한 데이터와 객체를 뜻하는 픽스처를 설정
// 2. 이 픽스처의 속성들을 검증
describe('province', function () {
  it('shortfall', function () {
    const asia = new Province(sampleProvinceData()); // 1. 픽스처 설정
    assert.equal(asia.shortfall, 5); // 2. 검증
  });
});
```

> 실패해야 할 상황에서는 반드시 실패하게 만들

- 일시적으로 코드에 오류를 주입하여 각 테스트가 실패하는 모습을 한 번씩 보는 것도 좋은 방법임

> 자주 테스트하라. 작성 중인 코드는 최소한 몇 분 간격으로 테스트하고, 적어도 하루에 한 번은 전체 테스트를 돌림

- 차이(chai) 라이브러리의 assert문 또는 expect문을 이용해 코드를 검증할 수 있음

```ts
describe('province', function () {
  it('shortfall', function () {
    const asia = new Province(sampleProvinceData());
    assert.equal(asia.shortfall, 5);
  });
});

describe('province', function () {
  it('shortfall', function () {
    const asia = new Province(sampleProvinceData());
    expect(asia.shortfall).equal(5);
  });
});
```

- 실패한 테스트가 하나라도 있으면 리팩터링하면 안 됨

<br>

## 4.4 테스트 추가하기

- 테스트는 위험 요인을 중심으로 작성
- 테스트의 목적은 어디까지나 현재 혹은 향후에 발생하는 버그를 찾는 데 있기에 단순히 필드를 읽고 쓰기만 하는 접근자는 테스트할 필요가 없음

> 완벽하게 만드느라 테스트를 수행하지 못하느니, 불완전한 테스트라도 작성해 실행하는 게 낫다

- 아래처럼 똑같은 픽스처가 중복되는 부분이 있다면, 픽스처를 여러 테스트문에서 접근할 수 있는 장소로 옮겨 중복을 제거할 수 있지만, ‘테스트끼리 상호작용하게 하는 공유 픽스처’를 생성하는 원인이 되어 테스트를 실행하는 순서에 따라 결과가 달라질 수 있기 때문에 문제가 됨

- 이때는 `beforeEach` 를 사용할 수 있음

```ts
describe('province', function () {
  let asia;
  beforeEach(function () {
    asia = new Province(sampleProvinceData());
  });
  it('shortfall', function () {
    expect(asia.shortfall).equal(5);
  });
  it('profit', function () {
    expect(asia.profit).equal(230);
  });
});
```

- 개별 테스트를 실행할 때마다 픽스처를 새로 만들면 모든 테스트를 독립적으로 구성할 수 있음

<br>

### 참고

- [리팩터링 2판 책](https://www.yes24.com/Product/Goods/89649360)

```toc

```
