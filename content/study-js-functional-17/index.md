---
emoji: 👨‍💻
title: 함수형 프로그래밍 - 지연적인 함수 + Promise
date: '2022-02-22 17:35:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

# '지연적인 함수'에 Proimse 사용할 수 있도록 코드 추가

## 목표

- 지연적인 함수에서 `Promise` 상황에도 사용할 수 있도록 코드 수정
- 상황에 따라 지연적이지 않을 때를 대비하는 함수 작성

<br>

## L.map, map, take 함수를 Promise에서도 사용하도록

- 밑에 코드에서는 `Promise` 값을 받게되면 정상적으로 동작하지 않음

```tsx
go(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  L.map((a) => Promise.resolve(a + 10)),
  take(2),
  log,
);
```

<br>

### L.map 함수에서 Promise 값 사용할 수 있도록 변경

```tsx
const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));

L.map = curry(function* (f, iter) {
  for (const a of iter) {
    yield go1(a, f);
  }
});
```

<br>

### Take 함수에서 Promise 값을 꺼낼 수 있도록 변경

```tsx
const take = curry((l, iter) => {
  const res = [];
  iter = iter[Symbol.iterator]();

  return (function recur() {
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;

      if (a instanceof Promise) {
        return a
          .then((a) => ((res.push(a), res).length == l ? res : recur()))
          .catch((e) => (e == nop ? recur() : Promise.reject(e)));
      }

      res.push(a);

      if (res.length == l) return res;
    }
    return res;
  })();
});
```

<br>

### 다양한 경우에도 동작 함

```tsx
go(
  [1, 2, 3],
  L.map((a) => Promise.resolve(a + 10)),
  take(2),
  log,
);

go(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  L.map((a) => a + 10),
  take(2),
  log,
);

go(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  L.map((a) => Promise.resolve(a + 10)),
  take(2),
  log,
);

go(
  [1, 2, 3],
  map((a) => Promise.resolve(a + 10)),
  log,
);

go(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  map((a) => a + 10),
  log,
);

go(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  map((a) => Promise.resolve(a + 10)),
  log,
);
```

<br>

## L.filter, Take에 Kleisli Composition 적용

- Filter함수에서 지연성과 Promise를 함께 지원할려면, Kleisli Composition을 활용해야 함
- 밑에 코드 처럼 Filter함수에 들어오는 값이 Promise이기 때문에 아직은 동작하지 않음

```tsx
go(
  [1, 2, 3, 4, 5, 6],
  L.map((a) => Promise.resolve(a * a)),
  L.filter((a) => a % 2),
  take(2),
  log,
);
```

<br>

### L.filter 지연성과 Promise를 만족하기 위한 수정

```tsx
const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));

const nop = Symbol('nop');

L.filter = curry(function* (f, iter) {
  for (const a of iter) {
    const b = go1(a, f);

    if (b instanceof Promise) {
      // Promise.reject을 통해 다음 함수들이 작동되는 것을 막음(Kleisli Composition)
      yield b.then((b) => (b ? a : Promise.reject(nop)));
    } else if (b) {
      yield a;
    }
  }
});
```

<br>

### Take 함수에서 Promise를 만족하기 위한 수정

```tsx
const take = curry((l, iter) => {
  const res = [];
  iter = iter[Symbol.iterator]();

  return (function recur() {
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;

      if (a instanceof Promise) {
        return a
          .then((a) => ((res.push(a), res).length == l ? res : recur()))
          .catch((e) => (e == nop ? recur() : Promise.reject(e)));
      }

      res.push(a);

      if (res.length == l) return res;
    }
    return res;
  })();
});
```

<br>

### 사용

- Promise에서 값이 reject을 반환했을 때 처리 됨
- 또한 Promise를 만나도 지연적으로 코드 진행

```tsx
go(
  [1, 2, 3, 4, 5, 6],
  L.map((a) => Promise.resolve(a * a)),
  L.map((a) => a * a),
  filter((a) => Promise.resolve(a % 2)),
  L.map((a) => a * a),
  L.map((a) => {
    log(a);
    return a * a;
  }),
  L.map((a) => {
    log(a);
    return a * a;
  }),
  take(4),
  log,
);
```

<br>

## reduce에서 Promise 부분 추가

- 밑에 코드 동작되지 않음
- reduce에 Promise 부분을 처리하는 코드가 아직 없음

```tsx
go(
  [1, 2, 3, 4],
  L.map((a) => Promise.resolve(a * a)),
  L.filter((a) => Promise.resolve(a % 2)),
  reduce(add),
  log,
);
```

```tsx
const nop = Symbol('nop');
const head = (iter) => go1(take(1, iter), ([h]) => h);

// 만약에 밑에 코드가 재사용 가능성이 높은 코드일 경우에는
// 다양한 예외처리를 생각해서 작성해야 함
const reduceF = (acc, a, f) =>
  a instanceof Promise
    ? a.then(
        (a) => f(acc, a),
        (e) => (e == nop ? acc : Promise.reject(e)),
      )
    : f(acc, a);

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    return reduce(f, head((iter = acc[Symbol.iterator]())), iter);
  }

  iter = iter[Symbol.iterator]();

  return go1(acc, function recur(acc) {
    let cur;

    while (!(cur = iter.next()).done) {
      acc = reduceF(acc, cur.value, f);

      if (acc instanceof Promise) {
        return acc.then(recur);
      }
    }
    return acc;
  });
});
```

<br>

## 지연 평가와 Promise사용 예제

- 함께 사용함으로써 효율성 증가

```tsx
go([1, 2, 3, 4, 5],
  L.map(a => Promise.resolve(a * a)),
  L.filter(a => Promise.resolve(a % 2),
  log);

go([1, 2, 3, 4, 5, 6, 7, 8],
  L.map(a => {
    log(a);
    return new Promise(resolve => setTimeout(() => resolve(a * a), 1000))
  }),
  L.filter(a => {
    log(a);
    return new Promise(resolve => setTimeout(() => resolve(a % 2), 1000))
  }),
  take(2),
  log);
```

<br>
<br>

## 느낀점

이번 학습을 통해 기존에 작성한 지연적인 함수에 Promise 상황에서도 사용 할 수 있도록 코드를 수정해보았다.
이 과정속에서 Promise와 지연적인 함수에 대해 이해를 더 하는 시간을 갖게 되었다.

<br>

## 참고

```js
유인동님의 함수형 프로그래밍과 JS ES6+ 강의

```

```toc

```
