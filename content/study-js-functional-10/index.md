---
emoji: 👨‍💻
title: 함수형 프로그래밍 - 지연성(Range함수)
date: '2022-01-27 08:43:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

## Range 함수

```tsx
const range = (l) => {
  let i = -1;
  let res = [];

  while (++i < l) {
    res.push(i);
  }
  return res;
};
```

<br>

## Range 함수 실행 후, 모든 값을 더하는 함수

- `reduce` 함수로 `list`를 전달하기 전에, 이미 `range`에서 코드가 평가되어 `배열`로 리턴됨
- 사실 `redudce`가 작동하기 전까지는 `range`로 리턴된 배열은 필요한 상태가 아님
- `reduce`가 순회를 시작하고 하나의 값으로 데이터를 축약 할 때, 그 때 `list`가 필요한 것

```tsx
const add = (a, b) => a + b;

const range = (l) => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

const list = range(4); // 이미 평가가 끝나서 배열로 리턴됨
console.log(reduce(add, list));
```

<br>

## 느긋한 L.Range

- `const list = L.range(4)` 코드 평가시 `L.range` 내부 `while`문은 실행하지 않음
- `list.next()` 가 실행 했을 때, `while`문이 실행됨
- 즉, 밑에 `list`는 배열상태로 있지 않음(`L.range {<suspended>}`)
- `reduce`에서 해당 값들이 필요할 때, `while`문이 작동하면서 하나씩 코드가 평가됨
- `L.range`에서는 Array을 만들지 않고 reduce가 돌면서 하나씩 값을 꺼내는 방식임
- ex) `while`문이 돌면서 `list.next().value` 으로 값을 꺼냄

```tsx
const L = {};

L.range = function* (l) {
  let i = -1;

  while (++i < l) {
    yield i;
  }
};

const list = L.range(4);
console.log(reduce(add, list));
```

<br>

## Reduce 내부 함수를 통해 Range와 L.Range 비교

- 위 `Range`는 reduce를 실행했을 때, `Array`를 만들고 → `Iterator`를 만들고 그리고 순회하면서 `next()`로 값을 얻어서 축약 함
- 그런데 `L.Range` 같은 경우 reduce를 실행 했을 때, `Iterator`를 만들고 → iterator가 자기 자신을 리턴하는 Iterable이고 해당하는 함수를 실행하면 이미 만들어진 Iterator를 리턴만 하고 그 다음 순회를 진행
- 그래서 일반 Range보다는 L.Range가 조금 더 효율 적임

```tsx
const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
});
```

<br>

## L.range와 range 성능 테스트

```tsx
function test(name, time, f) {
  console.time(name);
  while (time--) f();
  console.timeEnd(name);
}

// 테스트 결과
// L.range: 257.204833984375ms
// range: 489.680908203125ms
test('range', 10, () => reduce(add, range(1000000)));
test('L.range', 10, () => reduce(add, L.range(1000000)));
```

<br>
<br>

## 느낀점

정말 이번 학습을 통해서 그냥 아무 생각 없이 당연하게 사용했던 함수들을 다시 한번 생각해본 시간이였으며,

단순히 구현에 만족하면서 코드를 작성하고 있음을 반성하게 되었다.

또한 코드의 성능을 높일 수 있는 방법을 알게 되었다.

이번 강의 학습을 통해, 아주 작은 디테일이 이렇게도 큰 차이를 만들 수 있다라는 사실과 이러한 디테일이 나중에는 사용자에게 더 좋은 서비스를 제공할 수 있지 않을까 생각을 해보았다.

<br>

### 참고

```js
유인동님의 함수형 프로그래밍과 JS ES6+ 강의

```

```toc

```
