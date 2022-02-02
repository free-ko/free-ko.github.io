---
emoji: 👨‍💻
title: 함수형 프로그래밍 - 지연성(map,filter)
date: '2022-02-02 11:48:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

# 이터러블 중심 프로그래밍에서의 지연 평가

- Lazy Evaluation
- 코드가 필요하기 전까지 미루었다가, 정말 코드 평가가 필요할 때 실행
- 제때 계산법
- 느긋한 계산법
- 제너레이터/이터레이터 프로토콜을 기반으로 구현
- 나중에 코드 평가하고 진행

<br>

## L.map

- 지연성을 가진 `Map`함수 구현
- 제너레이터/이터레이터 프로토콜기반으로 구현
- 코드 평가를 미루는 성질을 가지고, 평가를 순서를 조작 가능함

```tsx
L.map = function* (f, iter) {
  for (const a of iter) {
    yield f(a);
  }
};

let it = L.map((a) => a + 10, [1, 2, 3]);

// next()를 실행해서 이터레이터 평가를 한 뒤에 결과를 받을 수 있음
// 즉, 내가 원하는 시점에 코드를 평가하고 실행시킬 수 있음
log(it.next()); // {value:11, done: false}
log(it.next()); // {value:12, done: false}
log(it.next()); // {value:13, done: false}

console.log([...it]); // [11,12,13]
console.log([it.next().value]); // [11]
```

<br>

## L.filter

- 지연성을 가진 `Filter` 함수 구현
- 제너레이터/이터레이터 프로토콜 기반으로 구현

```tsx
L.filter = function* (f, iter) {
  for (const a of iter) {
    if (f(a)) {
      yield a;
    }
  }
};

let it = L.filter((a) => a % 2, [1, 2, 3, 4]);
log(it.next()); // {value:1, done: false}
log(it.next()); // {value:3, done: false}
log(it.next()); // {value:undefined, done: true}
```

<br>
<br>

## range, map, filter, take, reduce 중첩 사용

- 이터레이터를 이용해서 코드 평가를 하고 코드를 실행시켜서 훨씬 더 빠른 코드를 만듬
- 단순히 `for` 문을 사용했는데 `for` 문의 내부 구조인 `Iterator`를 이용해 코드의 효율을 높일 수 있음
- `For`문을 대체하는 코드로 변경함
- 큰 차이는 아니지만, 조금 더 빠르게 동작함

```tsx
const map = curry((f, iter) => {
	let res = [];

	// 밑에 이터러를을 만들어서 순회하는 과정이
	// For문을 돌아가는 내부 작동 모습임
	iter = iter[Symbol.iterator]();
	let current;
	while(!(current = iter.next().done) {
		const a = current.value
		res.push(f(a));
	}

	for(const a of iter) {
		res.push(f(a));
	}
})

const range = (l) => {
  let i = -1;

  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

const filter = curry((f, iter) => {
  let res = [];

  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    if (f(a)) res.push(a);
  }
  return res;
});

const take = curry((l, iter) => {
  let res = [];

  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    res.push(a);
    if (res.length == l) return res;
  }
  return res;
});

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  } else {
    iter = iter[Symbol.iterator]();
  }

  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    acc = f(acc, a);
  }

  return acc;
});
```

<br>

## 즉시 코드 평가하는 함수로 문제 해결

- range함수를 통해 [0,...9] 배열을 만들고 —> 그리고 map 함수를 통해 만든 배열을 새로운 배열로 만들고 —> filter함수를 통해 배열을 다 순회하면서 특정 함수에 조건에 부합한 값만 추출해 배열을 만들고 —> take함수를 통해 인자 값 만큼 배열의 길이로 다시 배열을 만듬

```tsx
go(
  range(10),
  map((n) => n + 10),
  filter((n) => n % 2),
  take(2),
  log,
); // [11,13]
```

<br>

## 나중에 코드 평가시키는 함수로 문제 해결

- L.range, L.map, L.filter 함수를 실행했지만 어떠한 연산도 하지 않고 return 값으로 iter를 전달함
- 그리고 take함수 내부 코드를 실행 함
- take 함수에서 return으로 받은 L.filter()의 iter.next()를 실행시켰더니
- L.filter함수 내부로 들어감
- L.filter함수에서 return으로 받은 L.map()의 iter.next()를 실행시켰더니
- L.map함수 내부로 들어감
- L.map함수에서 return으로 받은 L.range()의 iter.next()를 실행시켰더니
- L.range함수 내부로 들어감
- 그리고 L.range에서 0을 yield 해서 L.map의 iter.next() 값으로 0을 전달 함
- 즉, 하나씩 코드를 평가하는 방식으로 진행

```tsx
go(
  L.range(10),
  L.map((n) => n + 10),
  L.filter((n) => n % 2),
  take(2),
  log,
);

// [0]  , [1]
// [10] , [11]
// false , true
//   X      O
```

<br>

## 즉시 vs 나중 코드 평가 효율성 비교

- 일반 range함수 인자에 만약 10000 큰 숫자가 들어오면, 이 숫자 만큼 배열을 만든 다음 map함수를 실행하기 때문에 코드 평가가 비효율적
- 그러나 L.range함수 인자에 아무리 큰 숫자가 들어오더라도, 하나씩 만들어서 코드 평가를 하기 때문에 효율적임
- 밑에 코드 실행 처리 속도 비교 9.3769...ms / 1.6098...ms

```tsx
console.time('');
go(
  range(10000),
  map((n) => n + 10),
  filter((n) => n % 2),
  take(10),
  log,
);
console.timeEnd('');

console.time('L');
go(
  L.range(10000),
  L.map((n) => n + 10),
  L.filter((n) => n % 2),
  take(10),
  log,
);
console.timeEnd('L');
```

<br>

## map, filter 계열 함수들이 가지는 결합 법칙

- 사용하는 데이터가 무엇이든지
- 사용하는 보조 함수가 순수 함수라면 무엇이든지
- 아래와 같이 결합한다면(가로, 세로로 코드 평가해도) 둘 다 결과가 같다.
- ES6의 기본 규악을 통해 구현하는 지연 평가의 장점
- 즉, 개발자와 JS 간의 코드 평가의 시점을 컨트롤 할 수 있어야, 코드의 실행의 효율을 높일 수 있음

```tsx
// 일반(가로)적으로 코드 평가
[[mapping, mapping], [filtering, filtering], [mapping, mapping]] =
  // 병렬(세로)로 코드 평가 = 하나씩
  [
    [mapping, filtering, mapping],
    [mapping, filtering, mapping],
  ];
```

<br>
<br>

## 느낀점

지연성 함수란 무엇인지 다시 한번 알게 되었으며, 지연성 함수를 중첩적으로 사용했을 때 코드 성능이 얼마나 좋은지도 알게되었습니다.
무엇보다 제너레이터 함수를 처음 접했을 때, 이 함수는 어떻게 사용하는 것이며, 왜 만들었지? 라는 의구심이 있었는데, 이번 학습을 통해 왜 필요한지 그리고 사용하는 방법을 지연성 함수 구현을 통해 알게되었습니다.

<br>

### 참고

```js
유인동님의 함수형 프로그래밍과 JS ES6+ 강의

```

```toc

```
