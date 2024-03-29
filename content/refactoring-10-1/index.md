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

## 10.3 중첩 조건문을 보호 구문으로 바꾸기

- 조건문은 주로 두 가지 형태로 쓰임
- 참인 경로와 거짓인 경로 모두 정상 동작으로 이어지는 형태와, 한쪽만 정상인 형태
- 두 경로 모두 정상 동작이라면 `if`와 `else` 절을 사용
- 한쪽만 정상이라면 비정상 조건을 `if`에서 검사한 다음, 조건이 참이면(비정상이면) 함수에서 빠져나옴
- 두 번째 검사 형태를 흔히 보호 구문(guard clause) 이라고 함
- 중첩 조건문을 보호 구문으로 바꾸는 리팩터링의 핵심 존재
- `if-then-else` 구조를 사용할 때는 `if`와 `else`절에 똑같은 무게를 두어, 코드를 읽는 이에게 양 갈래가 똑같이 중요하다는 뜻을 전달함
- 반면, 보호 구문은 이 일이 일어나면 무언가 조치를 취한 후 함수에서 빠져나온다는 것을 알 수 있어야 함

### 절차

1. 교체해야 할 조건 중 가장 바깥 것을 선택하여 보호 구문으로 바꿈
2. 테스트함
3. 1~2 과정을 필요한 만큼 반복함
4. 모든 보호 구문이 같은 결과를 반환한다면 보호 구문들의 조건식을 통합함

### 예시

```ts
// before
function payAmount(employee) {
  let result;
  if (employee.isSeparated) {
    // 퇴사한 직원인가?
    result = { amount: 0, reasonCode: 'SEP' };
  } else {
    if (employee.isRetired) {
      // 은퇴한 직원인가?
      result = { amount: 0, reasonCode: 'RET' };
    } else {
      // 급여 계산 로직
      lorem.ipsum(dolor.sitAmet);
      consectetur(adipiscing).edit();
      sed.do.eusmod = tempor.incididunt.ut(labore) && dolore(magna.aliqua);
      ut.enim.ad(minim.veniam);
      result = someFinalComputation();
    }
  }
}
```

```ts
// after
function payAmount(employee) {
  if (employee.isSeparated) return { amount: 0, reasonCode: 'SEP' };
  if (employee.isRetired) return { amount: 0, reasonCode: 'RET' };

  // 급여 계산 로직
  lorem.ipsum(dolor.sitAmet);
  consectetur(adipiscing).edit();
  sed.do.eusmod = tempor.incididunt.ut(labore) && dolore(magna.aliqua);
  ut.enim.ad(minim.veniam);
  return someFinalComputation();
}
```

<br>

## 10.4 조건부 로직을 다형성으로 바꾸기

- 복잡한 조건부 로직을 클래스와 다형성을 이용하여 분리할 수 있음
- 타입을 여러 개 만들고 각 타입이 조건부 로직을 자신만의 방식으로 처리하도록 구성하는 방법이 있음
- 또는 기본 동작을 위한 `case`문과 그 변형 동작으로 구성된 로직을 떠올릴 수 있음
- 기본 동작 로직을 슈퍼클래스로 넣고, 변형 동작을 뜻하는 `case`들을 각각의 서브클래스로 만듦

### 절차

1. 다형적 동작을 표현하는 클래스들이 아직 없다면 만들고 팩터리 함수도 함께 만듦
2. 호출하는 코드에서 팩터리 함수를 사용하게 함
3. 조건부 로직 함수를 슈퍼클래스로 옮김
4. 서브클래스 중 하나를 선택하여, 슈퍼클래스의 조건부 로직 메서드를 오버라이드함
5. 같은 방식으로 각 조건절을 해당 서브클래스에서 메서드로 구현
6. 슈퍼클래스 메서드에는 기본 동작 부분만 남김

### 예시

```ts
// before
function plumages(birds) {
  return new Map(birds.map((b) => [b.name, plumage(b)]));
}

function speeds(birds) {
  return new Map(birds.map((b) => [b.name, airSpeedVelocity(b)]));
}

function plumage(bird) {
  switch (bird.type) {
    case '유럽 제비':
      return '보통이다';
    case '아프리카 제비':
      return bird.numberOfCoconuts > 2 ? '지쳤다' : '보통이다';
    default:
      return '알 수 없다';
  }
}

function airSpeedVelocity(bird) {
  switch (bird.type) {
    case '유럽 제비':
      return 35;
    case '아프리카 제비':
      return 40 - 2 * bird.numberOfCoconuts;
    default:
      return null;
  }
}
```

```ts
// after
function plumages(birds) {
  return new Map(birds.map((b) => createBird(b)).map((bird) => [bird.name, bird.plumage]));
}

function speeds(birds) {
  return new Map(birds.map((b) => createBird(b)).map((bird) => [bird.name, bird.airSpeedVelocity]));
}

class Bird {
  constructor(birdObject) {
    Object.assign(this, birdObject);
  }

  get plumage() {
    return '알 수 없다';
  }

  get airSpeedVelocity() {
    return null;
  }
}

class EuropeanSwallow extends Bird {
  get plumage() {
    return '보통이다';
  }

  get airSpeedVelocity() {
    return 35;
  }
}

class AfricanSwallow extends Bird {
  get plumage() {
    return this.numberOfCoconuts > 2 ? '지쳤다' : '보통이다';
  }

  get airSpeedVelocity() {
    return 40 - 2 * this.numberOfCoconuts;
  }
}

function createBird(bird) {
  switch (this.type) {
    case '유럽 제비':
      return new EuropeanSwallow(bird);
    case '아프리카 제비':
      return new AfricanSwallow(bird);
    default:
      return new Bird(bird);
  }
}
```

<br>

## 참고

- [리팩터링 2판 책](https://www.yes24.com/Product/Goods/89649360)

```toc

```
