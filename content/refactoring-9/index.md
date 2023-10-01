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

## 참고

- [리팩터링 2판 책](https://www.yes24.com/Product/Goods/89649360)

```toc

```
