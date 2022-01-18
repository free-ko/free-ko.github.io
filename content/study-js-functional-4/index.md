---
emoji: 👨‍💻
title: 함수형 프로그래밍 - Map함수
date: '2022-01-17 12:09:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

## Map함수의 구조

- 함수형 프로그래밍에서는 `인자`와 `return`값으로 소통하는 것을 권장
- `인자`는 보조 함수를 넣어서 사용
- `return` 값을 통해 다른 곳에서 사용

```tsx
const map = (fun, iter) => {
  const result = [];

  for (const a of iter) {
    // 수집할 값을 fun 함수를 통해 다양한 결과 값이 나올 수 있도록,
    // map함수 사용하는 사람에게 위임
    result.push(fun(a));
  }
};
```

<br>

### 이름만 추출

```tsx
const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
];
```

- Map 함수 사용X

```tsx
const names = [];

for (const p of products) {
  names.push(p.name);
}
```

- Map함수 사용O

```tsx
map(p => p.name, products));
```

<br>

### 가격만 추출

```tsx
const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
];
```

- Map 함수 사용X

```tsx
const prices = [];

for (const p of products) {
  prices.push(p.price);
}
```

- Map함수 사용O

```tsx
map(p => p.price, products));
```

<br>
<br>

## 이터러블 프로토콜을 따른 map의 다형성 1

### 일반 Map함수는 Array만 순회 가능

- `document.querySelectorAll`은 `Array`를 상속받은 객체가 아니기 때문에 map함수를 사용할 수 없음

```tsx
console.log([1,2,3].map(a => a+1));  // [2,3,4]

// .map is not a function
console.log(
	document.querySelectorAll('*').map(el => el.nodeName);
)
```

<br>

### 하지만 밑에서 만든 Map함수는 이터러블도 사용 가능

- `document.querySelectorAll`이 이터러블 프로토콜을 따르기 때문에
- 밑에 `Map`사용 가능
- 즉, 밑에 작성한 `Map`함수는 **배열** 뿐만아니라 **이터러블 프로토콜**을 따르는 것들도 순회가 가능함

```tsx
const map = (fun, iter) => {
	const result = [];

	for(const a of iter) {
		result.push(fun(a));
	}
}

// ["HTML", "HEAD", "SCRIPT", "SCRIPT", "BODY", "SCRIPT"]
console.log(
	map(el => el.nodeName, document.querySelectorAll('*'));
)

const it = document.querySelectorAll('*')[Symbol.iterator]();
console.log(it.next());   // {vale:html, done:false}
console.log(it.next());   // {vale:head, done:false}
```

<br>

### 또한 제너레이터에서도 사용 가능

```tsx
function* gen() {
  yield 2;
  yield 3;
  yield 4;
}

log(map((a) => a * a, gen())); //
```

- 제너레이터 안에 코드 문장도 사용 가능

```tsx
function* gen() {
  yield 2;
  if (false) yield 3;
  yield 4;
}

log(map((a) => a * a, gen()));
```

<br>

### 중요

- 웹 API도 ECMAScript의 이터러블 프로토콜을 따르고 있기 때문에, 다양한 조합성을 갖을 수 있음
- 클래스, 프로토타입의 뿌리로 가진 카테고리 안에 있는 값만 사용할 수 있는 것보다, 위의 방법이 유연하고 다형성이 높음

<br>
<br>

## 이터러블 프로토콜을 따른 map의 다형성 2

### Map 객체를 새로 만들 수 있는 다형성

```tsx
let m = new Map();

m.set('a', 10);
m.set('b', 20);

const it = m[Symbol.iterator]();

console.log(it.next()); // {value:['a', 10], done: false}
console.log(it.next()); // {value:['b', 20], done: false}

log(map(([k, a]) => [k, a * 2], m)); // [['a', 20], ['b', 40]]

// map함수를 통해 새로운 값으로 map 객체를 만들 수 있음
// // {"a" => 20, "b" => 40}
log(new Map(map(([k, a]) => [k, a * 2], m)));
```

## 느낀점

`map` 함수의 내부 구조를 알게되었으며, 이터러블 프로토콜을 따르는 것들을 순회하여 새로운 다양한 조합을 만들 수 있다는 사실을 알게되었습니다. 또한 이러한 `map`함수를 사용하면 코드 가독성 측면이나 성능 측면에 좋다는 것도 알게 되었습니다.

<br>

### 참고

```js
유인동님의 함수형 프로그래밍과 JS ES6+ 강의

```

```toc

```
