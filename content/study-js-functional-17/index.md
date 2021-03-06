---
emoji: π¨βπ»
title: ν¨μν νλ‘κ·Έλλ° - μ§μ°μ μΈ ν¨μ + Promise
date: '2022-02-22 17:35:00'
author: μ°κΈ°
tags: λΈλ‘κ·Έ github-pages gatsby
categories: JS
---

<br>

# 'μ§μ°μ μΈ ν¨μ'μ Proimse μ¬μ©ν  μ μλλ‘ μ½λ μΆκ°

## λͺ©ν

- μ§μ°μ μΈ ν¨μμμ `Promise` μν©μλ μ¬μ©ν  μ μλλ‘ μ½λ μμ 
- μν©μ λ°λΌ μ§μ°μ μ΄μ§ μμ λλ₯Ό λλΉνλ ν¨μ μμ±

<br>

## L.map, map, take ν¨μλ₯Ό Promiseμμλ μ¬μ©νλλ‘

- λ°μ μ½λμμλ `Promise` κ°μ λ°κ²λλ©΄ μ μμ μΌλ‘ λμνμ§ μμ

```tsx
go(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  L.map((a) => Promise.resolve(a + 10)),
  take(2),
  log,
);
```

<br>

### L.map ν¨μμμ Promise κ° μ¬μ©ν  μ μλλ‘ λ³κ²½

```tsx
const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));

L.map = curry(function* (f, iter) {
  for (const a of iter) {
    yield go1(a, f);
  }
});
```

<br>

### Take ν¨μμμ Promise κ°μ κΊΌλΌ μ μλλ‘ λ³κ²½

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

### λ€μν κ²½μ°μλ λμ ν¨

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

## L.filter, Takeμ Kleisli Composition μ μ©

- Filterν¨μμμ μ§μ°μ±κ³Ό Promiseλ₯Ό ν¨κ» μ§μν λ €λ©΄, Kleisli Compositionμ νμ©ν΄μΌ ν¨
- λ°μ μ½λ μ²λΌ Filterν¨μμ λ€μ΄μ€λ κ°μ΄ Promiseμ΄κΈ° λλ¬Έμ μμ§μ λμνμ§ μμ

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

### L.filter μ§μ°μ±κ³Ό Promiseλ₯Ό λ§μ‘±νκΈ° μν μμ 

```tsx
const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));

const nop = Symbol('nop');

L.filter = curry(function* (f, iter) {
  for (const a of iter) {
    const b = go1(a, f);

    if (b instanceof Promise) {
      // Promise.rejectμ ν΅ν΄ λ€μ ν¨μλ€μ΄ μλλλ κ²μ λ§μ(Kleisli Composition)
      yield b.then((b) => (b ? a : Promise.reject(nop)));
    } else if (b) {
      yield a;
    }
  }
});
```

<br>

### Take ν¨μμμ Promiseλ₯Ό λ§μ‘±νκΈ° μν μμ 

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

### μ¬μ©

- Promiseμμ κ°μ΄ rejectμ λ°ννμ λ μ²λ¦¬ λ¨
- λν Promiseλ₯Ό λ§λλ μ§μ°μ μΌλ‘ μ½λ μ§ν

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

## reduceμμ Promise λΆλΆ μΆκ°

- λ°μ μ½λ λμλμ§ μμ
- reduceμ Promise λΆλΆμ μ²λ¦¬νλ μ½λκ° μμ§ μμ

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

// λ§μ½μ λ°μ μ½λκ° μ¬μ¬μ© κ°λ₯μ±μ΄ λμ μ½λμΌ κ²½μ°μλ
// λ€μν μμΈμ²λ¦¬λ₯Ό μκ°ν΄μ μμ±ν΄μΌ ν¨
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

## αα΅αα§α« αα§αΌαα‘μ Promiseμ¬μ© μμ 

- ν¨κ» μ¬μ©ν¨μΌλ‘μ¨ ν¨μ¨μ± μ¦κ°

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

## λλμ 

μ΄λ² νμ΅μ ν΅ν΄ κΈ°μ‘΄μ μμ±ν μ§μ°μ μΈ ν¨μμ Promise μν©μμλ μ¬μ© ν  μ μλλ‘ μ½λλ₯Ό μμ ν΄λ³΄μλ€.
μ΄ κ³Όμ μμμ Promiseμ μ§μ°μ μΈ ν¨μμ λν΄ μ΄ν΄λ₯Ό λ νλ μκ°μ κ°κ² λμλ€.

<br>

## μ°Έκ³ 

```js
μ μΈλλμ ν¨μν νλ‘κ·Έλλ°κ³Ό JS ES6+ κ°μ

```

```toc

```
