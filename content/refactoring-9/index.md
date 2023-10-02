---
emoji: 👋
title: '리팩터링 9장'
date: '2023-10-01 11:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## 9.1 변수 쪼개기

- 역할이 둘 이상인 변수가 있다면 쪼개야 함. 역할 하나당 변수 하나임

### 절차

1. 변수를 선언한 곳과 값을 처음 대입하는 곳에서 변수 이름을 바꿈
2. 가능하면 이때 불변으로 선언함
3. 이 변수에 두 번째로 값을 대입하는 곳 앞까지의 모든 참조(이 변수가 쓰인 곳)를 새로운 변수 이름으로 바꿈
4. 두 번째 대입 시 변수를 원래 이름으로 다시 선언함
5. 테스트함
6. 반복함
7. 매 반복에서 변수를 새로운 이름으로 선언하고 다음번 대입 때까지의 모든 참조를 새 변수명으로 바꿈. 이 과정을 마지막 대입까지 반복함.

### 예시

```ts
function distanceTraveled(scenario, time) {
  let result;
  let acc = scenario.primaryForce / scenario.mass; // ⬅️
  let primaryTime = Math.min(time, scenario.delay);
  result = 0.5 * acc * primaryTime * primaryTime;

  let secondaryTime = time - scenario.delay;
  if (secondaryTime > 0) {
    let primaryVelocity = acc * scenario.delay;
    acc = (scenario.primaryForce + scenario.secondaryForce) / scenario.mass; // ⬅️

    result += primaryVelocity * secondaryTime + 0.5 * acc * secondaryTime * secondaryTime;
  }

  return result;
}
```

```ts
// acc 변수에 값이 두 번 대입되는 부분을 쪼갬

function distanceTraveled(scenario, time) {
  let result;
  const primaryAcceleration = scenario.primaryForce / scenario.mass; // ✅

  let primaryTime = Math.min(time, scenario.delay);
  result = 0.5 * primaryAcceleration * primaryTime * primaryTime; // ✅

  let secondaryTime = time - scenario.delay;
  if (secondaryTime > 0) {
    let primaryVelocity = primaryAcceleration * scenario.delay; // ✅
    const secondaryAcceleration = (scenario.primaryForce + scenario.secondaryForce) / scenario.mass; // ✅

    result +=
      primaryVelocity * secondaryTime + 0.5 * secondaryAcceleration * secondaryTime * secondaryTime; // ✅
  }

  return result;
}
```

<br>

## 9.2 필드 이름 바꾸기

- 데이터 구조는 프로그램을 이해하는 데 큰 역할을 함
- 클래스에서 게터와 세터 메서드의 이름은 레코드 구조체의 필드 이름만큼 중요함

### 절차

1. 레코드의 유효 범위가 제한적이라면 필드에 접근하는 모든 코드를 수정한 후 테스트함. 이후 단계는 필요 없음
2. 레코드가 캡슐화되지 않았다면 우선 레코드를 캡슐화함
3. 캡슐화된 객체 안의 `private` 필드명을 변경하고, 그에 맞게 내부 메서드들을 수정 함
4. 테스트 함
5. 생성자의 매개변수 중 필드와 이름이 겹치는 게 있다면 함수 선언 바꾸기로 변경함
6. 접근자들의 이름도 바꿔줌

### 예시

```ts
const organization = { name: 'KAY', country: 'KOR' };

// name을 title로 하고, organization 레코드를 클래스로 캡슐화한 뒤, 입력 데이터 구조를 내부 데이터 구조와 분리

class Organization {
  constructor(data) {
    this._title = data.title;
    this._country = data.country;
  }

  get title() {
    return this._title;
  }

  set title(aString) {
    this._title = aString;
  }

  get country() {
    return this._country;
  }

  set country(aCountryCode) {
    this._country = aCountryCode;
  }
}

const organization = new Organization({
  title: 'KAY',
  country: 'KOR',
});
```

<br>

## 참고

- [리팩터링 2판 책](https://www.yes24.com/Product/Goods/89649360)

```toc

```
