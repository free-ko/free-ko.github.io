---
emoji: 👨‍💻
title: 함수형 프로그래밍 - 지연성(flatten, flatMap)
date: '2022-02-07 08:34:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

# flatten함수

- `flatten` 함수 : 1차원 배열로 만들어주는 함수

```tsx
console.log(flatten([1, 2], 3, 4, [5, 6])); // [1,2,3,4,5,6]
```

<br>

### L.flatten 함수 구현

- 배열의 깊이와 상관없이 특정 배열 안에 있는 값을 iterator로 리턴하는 함수

```tsx
// a && .. 연산을 하는 이유는
// 혹시나 a 값에 null이 들어오는 것을 방지하기 위해
// &&(And)연산자를 사용함
const isIterable = (a) => {
  a && a[Symbol.iterator];
};

L.flatten = function* (iter) {
  for (const a of iter) {
    if (isIterable(a)) {
      for (const b of a) {
        yield b;
      }
    } else {
      yield a;
    }
  }
};
```

<br>

### yield \* 을 통해 L.flatten 함수 구현

- `yield *iterable` 은 `for(const val of iterable) yield val;`과 같음

```tsx
const isIterable = (a) => {
  a && a[Symbol.iterator];
};

L.flatten = function* (iter) {
  for (const a of iter) {
    if (isIterable(a)) {
      yield* a;
    } else {
      yield a;
    }
  }
};
```

<br>

### L.flatten 함수 사용

```tsx
const it = L.flatten([...[1, 2], 3, 4, ...[5, 6], ...[7, 8, 9]]);

console.log(it.next()); // {value: 1, done: false}
console.log(it.next()); // {value: 2, done: false}

console.log([...it]);   // [1,2,3,4,5,6,7,8,9]

console.log(take(3, L.flatten([...[1, 2], 3, 4, ...[5, 6], ...[7, 8, 9]])) // [1,2,3]
```

<br>

### L.flatten을 통해 즉시 코드 평가하는 flatten함수 구현

```tsx
const flatten = pipe(L.flatten, takeAll);
```

<br>

### L.deepFlat

- 깊은 Iterable을 모두 펼침

```tsx
L.deepFlat = function *f(iter) {
	for(const a of iter) {
		if(isIterable(a)) {
			yield *f(a);
		} else {
			yield a;
		}
	}
}

console.log([...L.deepFlat([1,[2,[3,4],[5]]]])])
```

<br>
<br>

# flatMap

- Map과 Flatten함수를 동시에 하는 함수
- 최신 JS 문법에 추가됨
- 기본적으로 JS가 지연적으로 동작하지 않기 때문에, `flatMap`함수가 등장함

<br>

### 기본 JS에서 제공하는 flatMap사용

- 이 함수도 마찬가지로, 배열을 다 만들어 놓고 그 다음 함수 실행

```tsx
// [1,2,3,4,5,6,7]
log(
  [
    [1, 2],
    [3, 4],
    [5, 6, 7],
  ].flatMap((a) => a),
);

// [1,4,9,16,25,36,49]
log(
  [
    [1, 2],
    [3, 4],
    [5, 6, 7],
  ].flatMap((a) => a.map((a) => a * a)),
);

// 위와 결과 동일
log(
  flatten(
    [
      [1, 2],
      [3, 4],
      [5, 6, 7],
    ].map((a) => a.map((a) => a * a)),
  ),
);
```

<br>

### L.flatMap 함수 구현

```tsx
L.flatMap = curry(pipe(L.map, L.flatten));

const it = L.flatMap(
  map((a) => a * a),
  [
    [1, 2],
    [3, 4],
    [5, 6, 7],
  ],
);
log(it.next()); // {value:1, done: false}
log(it.next()); // {value:4, done: false}
log(it.next()); // {value:9, done: false}
log([...it]); // [1,4,9,16,25,36,49]

const it = L.flatMap((a) => a, [
  [1, 2],
  [3, 4],
  [5, 6, 7],
]);
log([...it]); // [1,2,3,4,5,6,7]
```

<br>

### 즉시평가, flatMap구현

```tsx
const flatMap = curry(pipe(L.map, flatten));

log(
  flatMap((a) => a, [
    [1, 2],
    [3, 4],
    [5, 6, 7],
  ]),
); // [1,2,3,4,5,6,7]
log(flatMap(L.range, [1, 2, 3])); // [0,0,1,0,1,2]

const it = L.flatMap(
  L.range,
  map((a) => a + 1, [1, 2, 3]),
);
log(it.next()); // {value:0, done: false}
log(it.next()); // {value:1, done: false}
log(it.next()); // {value:0, done: false}
log(it.next()); // {value:1, done: false}

log(
  take(
    3,
    L.flatMap(
      L.range,
      map((a) => a + 1, [1, 2, 3]),
    ),
  ),
); // [0,1,0]
```

<br>

### 2차원 배열 다루기

```tsx
const arr = [
  [1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [9, 10],
];

go(
  arr,
  L.flatten,
  L.filter((a) => a % 2),
  L.map((a) => a * a),
  take(4),
  reduce(add),
  log,
);
```

<br>

### 이터러블 중심 프로그래밍 실무적인 코드

```tsx
const users = [
  {
    name: 'a',
    age: 21,
    family: [
      { name: 'a1', age: 53 },
      { name: 'a2', age: 47 },
      { name: 'a3', age: 16 },
      { name: 'a4', age: 15 },
    ],
  },
  {
    name: 'b',
    age: 24,
    family: [
      { name: 'b1', age: 58 },
      { name: 'b2', age: 51 },
      { name: 'b3', age: 19 },
      { name: 'b4', age: 22 },
    ],
  },
  {
    name: 'c',
    age: 31,
    family: [
      { name: 'c1', age: 64 },
      { name: 'c2', age: 62 },
    ],
  },
  {
    name: 'd',
    age: 20,
    family: [
      { name: 'd1', age: 42 },
      { name: 'd2', age: 42 },
      { name: 'd3', age: 11 },
      { name: 'd4', age: 7 },
    ],
  },
];

go(
  users,
  L.flatMap((u) => u.family),
  L.filter((u) => u.age > 20),
  L.map((u) => u.age),
  take(4),
  reduce(add),
  log,
);
```

<br>
<br>

## 느낀점

다양 함수형 프로그래밍을 구현해보고, 또 실무적으로 사용하는 연습을 하였습니다.
다시 한번 느끼지만 정말 코드 가독성이 일반 함수 사용하는 것보다 높다는 사실을 깨달았습니다.
이번 학습을 통해 실무에 사용했던 일반 함수들을 함수형 함수로 교체하여 가독성과 성능을 늘려야겠습니다.

<br>

### 참고

```js
유인동님의 함수형 프로그래밍과 JS ES6+ 강의

```

```toc

```
