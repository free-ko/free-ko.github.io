---
emoji: 👨‍💻
title: 함수형 프로그래밍 - 지연성(take,find)
date: '2022-02-06 14:23:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

# queryStr 함수 만들기

- 객체를 Query String으로 만드는 함수

```tsx
const queyrStr = obj => go(
	obj,
	Object.entries  // [["limit", 0],["offset", 10], ["type", "notice"]]
	map(([k, v]) => `${k}=${v}`)  // ["limit=10", "offset=10", "type=notice"]
	reduce((a, b) => `${a}&${b}`) // limit=10&offset=10&type=notice
);

log(queryStr({limit: 10, offset: 10, type: 'notice'}));
```

<br>

### pipe함수 적용

```tsx
const queyrStr = obj => pipe(
	Object.entries
	map(([k, v]) => `${k}=${v}`)
	reduce((a, b) => `${a}&${b})
);
```

<br>

### 지연성 함수 적용

- `Array.prototype.join` 보다 `다형성`이 높은 `join` 함수
- 밑에 `join` 함수는 배열이 아닌 곳에서도 사용 가능

```tsx
const join = curry((sep = ',', iter) =>
  reduce((a, b) => `${a}${sep}${b}`, iter));

const queyrStr = obj => pipe(
	Object.entries
	map(([k, v]) => `${k}=${v}`)
	join('&')
);

// limit=10&offset=10&type=notice
log(queryStr({limit: 10, offset: 10, type: 'notice'}));

function *a() {
 yield 10;
 yield 11;
 yield 12;
 yield 13;
}

log(join(' - ', a()));  // 10 - 11 - 12 -13
```

- 지연성 함수 적용

```tsx
L.entries = function* (obj) {
  for (const k in obj) yield [k, obj[k]];
};

const queryStr = pipe(
  L.entries,
  L.map(([k, v]) => `${k}=${v}`),
  join('&'),
);

log(queryStr({ limit: 10, offset: 10, type: 'notice' }));
```

<br>

# find

- `take` 함수를 통해 결과를 만들어 내는 함수
- 특정 조건을 만족하는 값 중 첫 번째 값만 꺼내는 함수

```tsx
const users = [
  { age: 32 },
  { age: 31 },
  { age: 37 },
  { age: 28 },
  { age: 25 },
  { age: 32 },
  { age: 31 },
  { age: 37 },
];

const fine = (f, iter) => go(iter, filter(f), take(1), ([a]) => a);

// {age: 28}
console.log(find((u) => u.age < 30, users));
```

<br>

### find함수 아쉬운점

- filter함수 코드 실행시 users에 있는 값들을 다 순회하게 됨
- 그래서 `L.filter`를 호출하여, `L.filter` 내부 조건에 만족하는 `users` 값을
- `take`함수를 통해 추출하도록 변경

```tsx
const users = [
  { age: 32 },
  { age: 31 },
  { age: 37 },
  { age: 28 },
  { age: 25 },
  { age: 32 },
  { age: 31 },
  { age: 37 },
];

const fine = curry((f, iter) => go(iter, L.filter(f), take(1), ([a]) => a));

// {age: 28}
console.log(find((u) => u.age < 30)(users));

// 28
go(
  users,
  L.map((u) => u.age),
  find((n) => n < 30),
  log,
);
```

<br>

# L.map을 통해 기존의 map함수 간결하게 만들기

- 이 때, `take` 함수 사용

```tsx
const L = {};

const curry = (f) => (a, ..._) => (_.length ? f(a, ..._) : (..._) => f(a, ..._));

const go = (...args) => reduce((a, f) => f(a), args);

const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

L.map = curry(function* (f, iter) {
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    yield f(a);
  }
});

const map = curry((f, iter) => go(iter, L.map(f), take(Infinity)));

// [10,11,12,13]
console.log(map((a) => a + 10, L.range(4)));
```

<br>

### pipe함수 적용

```tsx
const map = curry(pipe(L.map, take(Infinity)));

// [10, 11, 12, 13]
console.log(map((a) => a + 10, L.range(4)));
```

<br>

# L.filter을 통해 기존의 filter함수 간결하게 만들기

- 이 때, `take` 함수 사용

```tsx
const L = {};

const curry = f =>
  (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

const go = (...args) => reduce((a, f) => f(a), args);

const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

L.filter = curry(function *(f, iter) {
	iter = iter[Symbol.iterator]();
	let cur;
	while(!(cur = iter.next()).done) {
		const a = cur.value;
		if(f(a)) {
			yield a;
		}
	}
}

const filter = curry(pipe(
	L.filter,
	take(Infinity)
));

// [1, 3]
console.log(filter(a => a % 2, range(4)));
```

<br>

# L.map, L.filter에 For문 적용

```tsx
L.map = curry(function *(f, iter) {
	for(const a of iter) {
		yield f(a);
	}
};

L.filter = curry(function *(f, iter) {
	for(const a of iter) {
		if(f(a)) {
			yield a;
		}
	}
}
```

<br>
<br>

## 느낀점

기존에 사용하던 함수들을 지연적으로 구현하는 학습을 통해, 함수의 확장을 경험하는 시간을 가졌습니다.
또한 원하는 값을 추출하기위해 지연적으로 구현한 함수를 사용하는 것이 성능적으로 효율적이라는 것을 알게되었습니다.

<br>

### 참고

```js
유인동님의 함수형 프로그래밍과 JS ES6+ 강의

```

```toc

```
