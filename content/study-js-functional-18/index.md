---
emoji: 👨‍💻
title: 함수형 프로그래밍 - 지연적인 함수 + 병렬
date: '2022-02-22 17:35:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

# '지연적인 함수'를 병렬 적으로

## 목표

- 상황에 따라 지연적이지 않을 때를 대비하는 함수 작성

<br>

## 지연된 함수열을 병렬적으로 평가하기

- JS가 동작하는 환경인 브라우저, NodeJS에서는 비동기 I/O로 동작함
- 비동기 I/O는 싱글 스레드로 동작함으로, CPU 점유를 효율적으로 할 수 있음(최신 트렌드)
- JS가 싱글 스레드로 동작하고 있기 때문에 JS가 병렬적인 일들을 할 일이 없다고 생각하는 경향이 있음
- 그러나, JS가 로직을 제어 할 때 비동기적으로 싱글 스레드를 제어 할 뿐인지
- 얼마든지 병렬적인 처리는 필요함
- 예를 들어 NodeJS에서 데이터를 요청하는 쿼리를 병렬적으로 실행해, 한 번에 결과 값을 얻는 경우도 있고
- NoSQL DB를 사용할 때, 여러개 Key를 가지고 많은 결과를 한 번에 처리 하는 경우도 있음
- 또는 NodeJS에서 이미지 처리를 할 때, 실제로 NodeJS가 직접 처리하는 것이 아닌, 네트워크나 기타 I/O로 작업을 보내 놓고, 대기를 하고 그 시점들을 다루는 일을 NodeJS가 함
- 그래서 어떤 일들을 동시에 출발 시킨 뒤, 하나의 로직으로 귀결시키는 일들은 개발자가 JS를 통해 병렬적으로 다룰 필요가 있음

<br>

## C.reduce를 만들어서 동시적으로 코드를 병렬 평가

- 기존에는 reduce가 실행되어야 L.map, L.filter 함수들이 차례대로 실행되었지만
- C.reduce는 일단 L.map, L.filter들을 실행시키고, 그 이후에 선별된 값들을 C.reduce 실행
- 즉, 기존에는 배열안에 있는 값들을 하나씩 꺼내서 reduce에 실행할 때 L.map, L.filter가 실행됬다면
- C.reduce는 배열안에 있는 값들을 일단 L.map, L.filter에서 실행 후 reduce에 실행
- 만약에 delay500함수에서 하는 작업이 외부 환경에서 작업하는 것이라면 C.reduce를 사용하는 것이 효율

```tsx
const C = {};

C.reduce = curry((f, acc, iter) => (iter ? reduce(f, acc, [...iter]) : reduce(f, [...acc])));

const delay500 = (a) => new Promise((resolve) => setTimeout(() => resolve(a), 500));

go(
  [1, 2, 3, 4, 5],
  L.map((a) => delay500(a * a)),
  L.filter((a) => a % 2),
  reduce(add),
  log,
);
```

<br>

### 에러 출력 나중에 처리할 수 있도록 코드 수정

- `Promise.reject()` 을 선언하거나 실행되었을 때 콜스택에 reject 코드가 평가되면 출력을 하게 되어 있음
- 밑에 코드 처럼 변수 `reject`을 선언함과 동시에 `Uncaught (in promise) ho` 가 출력됨
- 나중에 `catch`를 통해 코드를 처리해도 이미 에러 로그가 출력이 됨

```tsx
const reject = Promise.reject('ho');

reject.catch((a) => console.log('해결', a)); // 해결 ho
```

- 밑에 표시한 `[...iter]`에서 `Promise.reject`이 일어나기 전에 `Catch`구문이 달려 있으면 위에 처럼 `Uncaught` 에러가 출력되지 않음

```tsx
const C = {};

C.reduce = curry((f, acc, iter) => (iter ? reduce(f, acc, [...iter]) : reduce(f, [...acc])));
```

- 위에 처럼 미리 에러가 출력되는 것이 아닌, 나중에 한꺼번에 처리 할 수 있도록 로직 추가
- 마치 내가 비동기 부분에서 처리 할 것이라고 알려주는 코드 작성

```tsx
const C = {};

C.reduce = curry((f, acc, iter) => {
  const iter2 = iter ? [...iter] : [...acc];

  // 미리 catch를 작성해서 아무일도 안하도록 코드 추가
  iter2.forEach((a) => a.catch(function () {}));

  return iter ? reduce(f, acc, iter2) : reduce(f, iter2);
});
```

<br>

### 주의 사항

- 그러나 만약에 `catch`가 된 `Promise` 값을 전달한다면, 이후에 다시 `catch`를 할 수 없음

```tsx
const C = {};

C.reduce = curry((f, acc, iter) => {
  let iter2 = iter ? [...iter] : [...acc];
  iter2 = iter2.map((a) => a.catch(function () {}));

  return iter ? reduce(f, acc, iter2) : reduce(f, iter2);
});
```

- 간단하게 밑에 코드 정리

```tsx
let a = Promise.reject('hi');
a = a.catch((a) => a);

// 위에서 catch처리 했기 때문에 다시 catch처리 불가
// 밑에 코드는 원래 Promise 값을 리턴함
// Promise{<resolved>: "hi"}
a.catch((a) => console.log(a));
```

- 그래서 `catch`를 한 `Promise` 값을 전달하는 것이 아닌, `catch`를 하지 않은 `Promise` 값을 전달함

```tsx
let a = Promise.reject('hi');
a.catch((a) => a); // catch만 걸어두어서 에러가 로그에 찍히지 않도록 함

// 이후에 catch를 사용 가능
a.catch((a) => console.log(a, '해결'));
```

<br>

### 코드 정리

```tsx
const C = {};

// 아무일도 하지 않는 함수
// 실무에서도 많이 사용
function noop() {}

// 나 Catch로 작업할 꺼니깐 걱정하지 말라고 코드 만듬
// 이걸 하지 않으면 로그가 계속 찍힘
const catchNoop = ([...arr]) => (
  arr.forEach((a) => (a instanceof Promise ? a.catch(noop) : a)), arr
);

C.reduce = curry((f, acc, iter) =>
  iter ? reduce(f, acc, catchNoop(iter)) : reduce(f, catchNoop(acc)),
);

const delay500 = (a) => new Promise((resolve) => setTimeout(() => resolve(a), 500));

go(
  [1, 2, 3, 4, 5],
  L.map((a) => delay500(a * a)),
  L.filter((a) => delay500(a % 2)),
  reduce(add),
  log,
);
```

<br>

### C.take

- 빠르게 값들을 꺼내서 처리하는 방법 즉, 한번에 코드를 병렬적으로 평가 함

```tsx
const C = {};

const catchNoop = ([...arr]) => (
  arr.forEach((a) => (a instanceof Promise ? a.catch(noop) : a)), arr
);

C.take = curry((l, iter) => take(l, catchNoop(iter)));

go(
  [1, 2, 3, 4, 5],
  L.map((a) => delay500(a * a)),
  L.filter((a) => delay500(a % 2)),
  reduce(add),
  C.take(2),
  log,
);
```

<br>

### 특정 부분에서만 병렬적으로 실행 할 수 있도록 코드 수정 : C.map, C.filter

- 동시에 코드 평가 진행

```tsx
C.takeAll = C.take(Infinity);
C.map = curry(pipe(L.map, C.takeAll));
C.filter = curry(pipe(L.filter, C.takeAll));

C.map((a) => delay1000(a * a), [1, 2, 3, 4]).then(log);
C.filter((a) => delay1000(a % 2), [1, 2, 3, 4]).then(log);
```

<br>

### 즉시, 지연, Promise, 병렬적 조합하기

- 다양한 상황을 고려해서 연산을 함수형 프로그래밍을 통해 코드 구현 가능

```tsx
const delay500 = (a, name) =>
  new Promise((resolve) => {
    console.log(`${name}: ${a}`);
    setTimeout(() => resolve(a), 100);
  });

console.time('');
go(
  [1, 2, 3, 4, 5, 6, 7, 8],
  L.map((a) => delay500(a * a, 'map 1')),
  L.filter((a) => delay500(a % 2, 'filter 2')),
  L.map((a) => delay500(a + 1, 'map 3')),
  C.take(2),
  reduce(add),
  log,
  (_) => console.timeEnd(''),
);
```

<br>
<br>

## 느낀점

병렬적인 함수를 학습하면서 지연적인 함수만 무조건 좋은 것이 아님을 알게되었으며, 병렬적인 함수의 필요성에 대해 숙지하게 되었습니다.

<br>

## 참고

```js
유인동님의 함수형 프로그래밍과 JS ES6+ 강의

```

```toc

```
