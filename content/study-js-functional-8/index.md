---
emoji: 👨‍💻
title: 함수형 프로그래밍 - 코드를 값으로 다루어 표현력 높이기
date: '2022-01-24 08:35:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

## 함수형 프로그래밍에서는 코드를 값으로 많이 사용함

- 어떠한 함수가 코드인 함수를 받아서, 평가하는 시점을 원하는 대로 다룰 수 있기 때문에 코드의 표현력을 높일 수 있음
- 중첩된 코드를 가독성 높일 수 있음
- 즉시 함수들과 인자를 전달해서 값을 바로 평가해서 사용

<br>

## Go 라는 함수를 만들어서 실제로 코드의 표현력과 가독성을 높여보자

- `go`라는 함수를 만들어 사용하게 되면 `위`에서 `아래`로 코드가 평가됨

```tsx
// go 함수 사용 예시
go(
  0,
  (a) => a + 1,
  (a) => a + 10,
  (a) => a + 100,
  log,
);
// 111
```

- 즉, 인자를 받아서 하나의 값으로 축약해 나아가는 개념

```tsx
// 전개 연산로 인자를 받으면 결과가 배열로 나타남
const go = (...list) => {
  console.log(list); // [0, f, f, f]
};

go(
  0,
  (a) => a + 1,
  (a) => a + 10,
  (a) => a + 100,
  log,
);
```

```tsx
// 인자(배열)의 첫 번째 요소를 다음 요소에게 전달하고
// 코드가 평가된 값을 다음 요소에게 전달하는 방식으로 진행
// 그리고 이 후에 최종 값을 리턴
const go = (...arg) => {
  reduce((a, f) => f(a), args);
};

go(
  0,
  (a) => a + 1,
  (a) => a + 10,
  (a) => a + 100,
  log,
);
// 111
```

<br>

## Go를 사용하여 읽기 좋은 코드로 만들기

- 기존 코드

```tsx
log(
  reduce(
    add,
    map(
      (p) => p.price,
      filter((p) => p.price < 20000, products),
    ),
  ),
);
```

- `go`함수 사용
- 위에서 아래로 가독성 있게 코드를 변경할 수 있음

```tsx
go(
  products,
  (products) => filter((p) => p.price < 20000, products),
  (products) => map((p) => p.price, products),
  (prices) => reduce(add, prices),
  log,
);
```

<br>
<br>

## 여러번 호출되는 함수를 하나의 함수로 만들어보자(Pipe)

- 함수를 리턴하는 함수
- 여러번 호출되는 함수를 하나의 함수로 만듬
- 밑에 3개의 함수를 축약하는 하나의 함수를 만들어주는 함수가 `Pipe` 함수의 역할

```tsx
const f = pipe(
  (a) => a + 1,
  (a) => a + 10,
  (a) => a + 100,
);

console.log(f(0)); // 111이 나와야 함
```

<br>

## Pipe 함수 설계

- 함수를 리턴하는 함수
- 내부에서 `go`함수를 사용함
- 인자를 받아서 `go`함수를 통해 내부 함수를 실행

```tsx
const pipe = (...fs) => (a) => go(a, ...fs);
```

<br>

## Go 함수와 다른, Pipe 함수에 새로운 기능 추가

- `go`함수

```tsx
const add = (a,b) => a + b;

go(
	add(0,1);  // 첫 번째 인자를 코드 평가 후 1로 시작 가능
	a => a + 10,
	a => a + 100,
)
```

<br>

- `pipe`함수
- 위의 `go`함수처럼 `add`함수를 평가하고 다음 함수로 코드 평가가 진행되기 위해서는
- 밑에처럼 애초에 인자로 `add`함수를 넣어야 함
- 이 부분이 아쉬움

```tsx
const f = pipe(
  (a) => a + 1,
  (a) => a + 10,
  (a) => a + 100,
);

console.log(f(add(0, 1)));
```

- 그냥 인자 값을 2개 넣어주면 알아서 2개의 인자 값이 더해지는 `pipe`를 만들기 위해서는

```tsx
// 첫 번째 함수를 꺼내서
// 처음 들어온 인자들(인자가 여러개 일 경우)을 처음 꺼낸 함수 코드 평가를 진행 후
// 그 다음 함수들 코드 평가 진행
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

const f = pipe(
	(a,b) => a + b,
	a => a + 10,
	a => a + 100);
)

console.log(f(0,1));  // 111
```

<br>
<br>

## Curry 함수

- 코드를 즉, 함수를 값으로 다루면서 원하는 시점에 코드를 평가시키는 함수
- 함수를 받아서 함수를 리턴 함
- 인자를 받아서 인자가 원하는 만큼 들어왔을 때, 받아두었던 함수를 나중에 평가시키는 함수

```tsx
// 인자로 함수로 받고 함수를 리턴함
// 인자로 받은 함수에서는
// 인자로 받은 함수에서 사용할 인자를 대신해서 받음
// (a, ..._) : a는 첫 번째 인자, 그리고 ..._는 나머지 인자
// 만약에 인자가 2개 이상 받을 경우(_.length가 있을 경우와 같은 의미)
// 받아놓은 함수를 즉시 실행하고
// 만약에 인자가 2개 이상 아닐 경우 다시 한 번 함수를 리턴
// 그 이후에 들어올 값들을 받아서 함수를 실행
// 미리 받아놓았던 a와 새로 들어온 값들을 실행

<정리>
// 함수를 받아서 일단 함수를 리턴하는데
// 만약에 인자가 2개 이상 들어오면
// 받아 놓았던 함수를 즉시 실행하고
// 만약에 인자가 2개 미만이라면 함수를 다시 리턴한 후에
// 그 이후에 받은 인자들을 합쳐서 실행하는 함수

const curry = f =>
  (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);
```

<br>

## Curry 함수 사용 예시

```tsx
const mult = curry((a, b) => a * b);

console.log(mult(1)); // (..._) => f(a, ..._)
console.log(mult(1)(2)); // 2

const mult3 = mult(3);

console.log(mult3(10)); // 30
console.log(mult3(5)); // 15
```

<br>

## Map, filter, Reduce에 Curry 적용

- 각 함수들이 인자를 하나만 받으면, 일단 이후 인자들을 받기로 기달리고 있는 함수를 리턴함

```tsx
const curry = f =>
  (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

// Map에 Curry함수 적용
const map = curry((f, iter) => {
	const res = [];

	for(const a of iter) {
		res.push(f(a));
	}
	return res;
}

// Filter에 Curry함수 적용
const filter = curry((f, iter) => {
	const res = [];

	for(const a of iter) {
		if(f(a)) {
			res.push(a)
		}
	}
	return res;
});

// Reduce에 Curry함수 적용
const reduce = curry((f, acc, iter) => {
	if(!iter) {
		iter = acc[Symbol.iterator]();
		acc = iter.next().value;
	}

	for(const a of iter) {
		acc = f(acc, a);
	}
	return acc;
});
```

<br>

## Curry 적용 전과 후 비교

```tsx
// Curry 적용 전
go(
  products,
  (products) => filter((p) => p.price < 20000, products),
  (products) => map((p) => p.price, products),
  (prices) => reduce(add, prices),
  log,
);

// Curry 적용 후
go(
  products,
  (products) => filter((p) => p.price < 20000)(products),
  (products) => map((p) => p.price)(products),
  (prices) => reduce(add)(prices),
  log,
);

// products => filter(p => p.price < 20000)(products),
// 이 코드의 의미는 products를 받아서
// filter(p => p.price < 20000)에 그대로 products를 전달한다는 의미인데
// 사실 이 의미는 결국 filter함수가 products를 인자로 받는 다는 이야기임
// 그래서 밑에 코드 처럼 변경 가능
go(
  products,
  filter((p) => p.price < 20000),
  map((p) => p.price),
  reduce(add),
  log,
);
```

<br>

## Go, Curry 함수 적용 정리

```tsx
reduce(
	add,
	map(p => p.price,
		filter(p => p.price < 20000, products)));
)

// Go 함수를 통해 함수 위치를 변경
go(
	products,
	products => filter(p => p.price < 20000, products),
	products => map(p => p.price, prdoucts),
	prices => reuduce(add, prices)
)

// Curry를 통해 함수를 부분적으로 실행 시킴
// 또한 깔끔하고 표현력이 높은 코드를 구현할 수 있음
go(
	products,
	filter(p => p.price < 20000),
	map(p => p.price),
	reduce(add)
)
```

<br>

## 함수 조합으로 함수 만들기

- 중복되는 함수를 추출해서 중복을 제거 할 수 있음

```tsx
const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
];

const total_price = pipe(
  map((p) => p.price),
  reduce(add),
);

const base_total_price = (predi) => pipe(filter(predi), total_price);

go(
  products,
  base_total_price((p) => p.price < 20000),
  log,
);

go(
  products,
  base_total_price((p) => p.price >= 20000),
  log,
);
```

<br>
<br>

## 느낀점

이번 학습을 통해 함수형 프로그래밍의 대단함을 가시적으로 느끼게 되었다. 특히 코드 가독성면에서 너무나 놀라웠다.
그리고 go, pipe, curry함수를 구현하면서 인자로 들어온 함수들이 다시 연산되어지는 과정들이 아직도 많이 익숙하지 않다는 사실을 알게되었다. 이 시간을 계기로 부족한 것이 무엇인지 확실히 알게되었으며 한 걸음 내딘것 같은 기분이 든다.

<br>

### 참고

```js
유인동님의 함수형 프로그래밍과 JS ES6+ 강의

```

```toc

```
