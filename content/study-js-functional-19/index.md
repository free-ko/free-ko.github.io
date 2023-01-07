---
emoji: 👨‍💻
title: 함수형 프로그래밍 - 이터러블 프로그래밍
date: '2022-03-12 13:42:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

# 이터러블 프로그래밍 학습

## 목표

- 이터러블 프로그래밍 혹은 리스트 프로세싱에 익숙해지자

<br>

## 🧐홀수 N개 꺼내서 더하기

### 명령형 코드

```tsx
function f1(limit, list) {
  let acc = 0;

  for (const a of list) {
    if (a % 2) {
      const b = a * a;
      acc += b;
      if (--limit == 0) break;
    }
  }
  console.log(acc);
}

f1(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
```

<br>

### 함수형, 이터러블 프로그래밍(List Processing)으로 코드 변경

1. `if`를 `filter`함수를 통해 변경
2. 값 변화 후, 변수 할당을 `map`함수를 통해 변경
3. `break`를 `take` 함수를 통해 변경
4. 축약 및 합산을 `reduce` 함수를 통해 변경

```tsx
const add = (a, b) => a + b;

function f2(limit, list) {
  _.go(
    list,
    L.filter((a) => a % 2),
    L.map((a) => a * a),
    L.take(limit),
    _.reduce(add),
    console.log,
  );
}

f2(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
```

<br>

### 참고 - while문을 range함수로 변경

```tsx
// 명령형
function f3(end) {
  let i = 1;
  while (i < end) {
    console.log(i);
    i += 2;
  }
}

f3(10);

// 함수형
function f4(end) {
  L.range(end);
}

f4(10);

// each함수 사용
function f4(end) {
  _.go(L.range(1, end, 2), _.each(console.log));
}

f4(10);
```

<br>

## 🧐 추억의 별 그리기

```tsx
_go.(
	_.range(1,6),
	_.map(_.range),
	_.map(_.map(_ => '*')),
	_.map(_.reduce((a,b) => `${a}${b}`)),
	_.reduce((a,b) => `${a}\n${b}`),
	console.log);

// 지연적으로 만들기
_go.(
	L.range(1,6),
	L.map(L.range),
	L.map(L.map(_ => '*')),
	L.map(_.reduce((a,b) => `${a}${b}`)),
	_.reduce((a,b) => `${a}\n${b}`),
	console.log);

// 위에 코드랑 시간복잡도, 성능적인 측면에서 다를게 없음
_go.(
	L.range(1,6),
	L.map(s => _.go(
		L.range(s),
		L.map(_ => '*'),
		_.reduce((a,b) => `${a}${b}`)
	)),
	_.reduce((a,b) => `${a}\n${b}`),
	console.log)

// 함수 추출해서 사용
const join = sep => _.reduce((a, b) => `${a}${sep}${b}`);

_.go(
  L.range(1, 6),
  L.map(L.range),
  L.map(L.map(_ => '*')),
  L.map(join('')),
  join('\n'),
  console.log);
```

<br>

## 🧐 추억의 구구단

```tsx
_.go(
  _.range(2, 10),
  _.map((a) =>
    _.go(
      _.range(1, 10),
      _.map((b) => `${a}x${b} = ${a * b}`),
      join('\n'),
    ),
  ),
  join('\n\n'),
  console.log,
);

// 지연적으로
_.go(
  L.range(2, 10),
  L.map((a) =>
    _.go(
      L.range(1, 10),
      L.map((b) => `${a}x${b} = ${a * b}`),
      join('\n'),
    ),
  ),
  join('\n\n'),
  console.log,
);
```

<br>
<br>

## 느낀점

기존에 당연하게 작성하고 있던 명령령 코드를 함수형 코드로 변경하는 학습을 통해, 더욱더 가독성과, 성능 적인 측면에서 좋은 코드를 작성해 보는 학습을 하였습니다.
조금 더 연습을 통해, 실무 또는 프로젝트에서 막연하게 사용했던 명령형 코드를 함수형 코드로 변경하여 유지보수 좋은 코드를 작성하는 연습을 해야 겠습니다.
<br>

## 참고

```js
유인동님의 함수형 프로그래밍과 JS ES6+ 강의

```

```toc

```
