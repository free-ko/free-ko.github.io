---
emoji: π¨βπ»
title: ν¨μν νλ‘κ·Έλλ° - λͺλ Ήν μ½λ μ΅κ΄ μ§μ°κΈ°
date: '2022-03-12 13:54:00'
author: μ°κΈ°
tags: λΈλ‘κ·Έ github-pages gatsby
categories: JS
---

<br>

# Reduceν¨μ μ λλ‘ μ¬μ©νκΈ°

## λͺ©ν

- λͺλ Ήν μ½λμμ `Reduce`ν¨μκ° λ§λ₯μ΄λΌκ³  μκ°νκ³  μμ±νλ μ΅κ΄μ μ§μ°μ!

<br>

## Map ν¨μλ‘ Reduce μ λλ‘ μ¬μ©νκΈ°

### λͺλ Ήν

- reduce μ½λ°±ν¨μλ‘ λ€μ΄μ€λ `total + u.age`λ λλ¬΄ κ΅¬μ²΄μ μΈ κ°λ€μ΄ λ€μ΄μ΄
- κ·Έλμ ν¨μλͺμ μ§κΈ°λ μ λ§€νκ³ , μ¬μ¬μ© λκΈ° μ΄λ €μ

```tsx
const users = [
  { name: 'AA', age: 35 },
  { name: 'BB', age: 26 },
  { name: 'CC', age: 28 },
  { name: 'CC', age: 34 },
  { name: 'EE', age: 23 },
];

console.log(_.reduce((total, u) => total + u.age, 0, users));
```

### μΆμν

- `L.map` μ ν΅ν΄ λ°°μ΄λ‘ κ²°κ³Όλ₯Ό λ§λ€μ΄μ `add` μ μΈμμ λ€μ΄μ€λ κ°λ€μ νμμ λμΌνκ² λ§λ¬
- μ¦, `reduce`μ λ³΅μ‘ν ν¨μλ₯Ό μ°λ κ²λ³΄λ€
- `map`μ μ¬μ©ν΄μ νλμ νμ μ½λλ₯Ό μ¬μ©ν΄μ κ°κ²°νκ³  μ¬μ¬μ©λκΈ° μ¬μ΄ μ½λλ₯Ό μ¬μ©νλκ²μ΄ ν¨μν νλ‘κ·Έλλ°μ μ ν©ν¨
- λν, ν¨μ μ‘°ν©μ± μΈ‘λ©΄μμλ μ λ¦¬ν¨

```tsx
const users = [
  { name: 'AA', age: 35 },
  { name: 'BB', age: 26 },
  { name: 'CC', age: 28 },
  { name: 'CC', age: 34 },
  { name: 'EE', age: 23 },
];

const add = (a, b) => a + b;
console.log(
  _.reduce(
    add,
    L.map((u) => u.age, users),
  ),
);

// λ¦¬ν©ν λ§
const ages = L.map((u) => u.age);
console.log(_.reduce(add, ages(users)));
```

<br>

## Map, Filter ν¨μλ‘ Reduce μ λλ‘ μ¬μ©νκΈ° 1

### Reduceμμ λͺ¨λ  λ‘μ§ μ¬μ©

- μ½λκ° κΉλν΄ λ³΄μ΄λ κ±°μ§, μ¬μ€ λ‘μ§ μΈ‘λ©΄μμλ μ‘°μ¬μ€λ¬μ
- λν, λ‘μ§μ μΆκ° ν  λ, λ³΅μ‘ν¨

```tsx
const users = [
  { name: 'AA', age: 35 },
  { name: 'BB', age: 26 },
  { name: 'CC', age: 28 },
  { name: 'CC', age: 34 },
  { name: 'EE', age: 23 },
];

console.log(_.reduce((total, u) => (u.age >= 30 ? total : total + u.age), 0, users));
```

### Map, Filter ν¨μ μ΄μ©

- κ°κ²°ν ν¨μλ₯Ό ν΅ν΄ μ‘°ν©ν΄ λμκ°λ μ±κ²©
- νΉμ  λ‘μ§μ΄ μΆκ°λμ΄λ λ³΅μ‘νμ§ μμ

```tsx
const users = [
  { name: 'AA', age: 35 },
  { name: 'BB', age: 26 },
  { name: 'CC', age: 28 },
  { name: 'CC', age: 34 },
  { name: 'EE', age: 23 },
];

console.log(
  _.reduce(
    add,
    L.map(
      (u) => u.age,
      L.filter((u) => u.age < 30, users),
    ),
  ),
);

console.log(
  _.reduce(
    add,
    L.filter(
      (n) => n < 30,
      L.map((u) => u.age, users),
    ),
  ),
);
```

<br>

## Map, Filter ν¨μλ‘ Reduce μ λλ‘ μ¬μ©νκΈ° 2

### λͺλ Ήν ν¨μ

- `a=1&&c=CC&d=DD` κ²°κ³Ό κ° λ§λ€κΈ°

```tsx
const obj1 = {
  a: 1,
  b: undefined,
  c: 'CC',
  d: 'DD',
};

function query1(obj) {
  let res = '';
  for (const k in obj) {
    const v = obj[k];
    if (v === undefined) continue;
    if (res != '') res += '&';
    res += k + '=' + v;
  }
  return res;
}
```

- κ·Έλ¬λ `i` κ°μ μμ‘΄νλ©΄μ μ½λ μμ±νλ κ²μ λ³΅μ‘ν¨

```tsx
const obj1 = {
  a: 1,
  b: undefined,
  c: 'CC',
  d: 'DD',
};

function query2(obj) {
  return Object.entries(obj).reduce((query, [k, v], i) => {
    if (v === undefined) return query;
    return `${query}${i > 0 ? '&' : ''}${k}=${v}`;
  }, '');
}
```

### ν¨μν

```tsx
const obj1 = {
  a: 1,
  b: undefined,
  c: 'CC',
  d: 'DD',
};

const query3 = (obj) =>
  _.reduce(
    (a, b) => `${a}&${b}`,
    _.map(
      ([k, v]) => `${k}=${v}`,
      _.reject(([_, v]) => v === undefined, Object.entries(obj)),
    ),
  );
```

### ν¨μνμμ μ»€λ¦¬ μ μ©

```tsx
const join = _.curry((sep, iter) => _.reduce((a, b) => `${a}${sep}${b}`, iter));

const query3 = (obj) =>
  join(
    '&',
    _.map(
      ([k, v]) => `${k}=${v}`,
      _.reject(([_, v]) => v === undefined, Object.entries(obj)),
    ),
  );
```

### Goν¨μ μ μ©

```tsx
const join = _.curry((sep, iter) => _.reduce((a, b) => `${a}${sep}${b}`, iter));

const query4 = (obj) =>
  _.go(
    obj,
    Object.entries,
    _.reject(([_, v]) => v === undefined),
    _.map(join('=')),
    join('&'),
  );
```

### Pipeν¨μ μ μ©

```tsx
const join = _.curry((sep, iter) => _.reduce((a, b) => `${a}${sep}${b}`, iter));

const query4 = _.pipe(
  Object.entries,
  L.reject(([_, v]) => v === undefined),
  L.map(join('=')),
  join('&'),
);
```

### queryToObject

```tsx
const split = _.curry((sep, str) => str.split(sep));

const queryToObject = _.pipe(
  split('&'),
  L.map(split('=')),
  L.map(([k, v]) => ({ [k]: v })),
  _.reduce(Object.assign),
);

console.log(queryToObject('a=1&c=CC&d=DD')); // {a: "1", c: "CC", d: "DD"}
```

<br>
<br>

## λλμ 

μ΄λ² νμ΅μ ν΅ν΄ μ€λ¬΄μμ λ΄κ° μμ±ν μ½λλ€μ΄ μΌλ§λ μμ μ±μ΄ λΆμ‘±νμ§ μκ² λμλ€.

λ¨μν μλμ΄ λλ κ²μ΄ μ€μν κ²μ΄ μλμ μκ² λμ΄μ, λ€μ λΆν° μ½λ©ν  λ μ€λ νμ΅ν μ½λμ μμ μ±μ λν΄ μκ°νλ©΄μ μ½λλ₯Ό μμ±ν΄μΌ κ² λ€.

<br>

## μ°Έκ³ 

```js
μ μΈλλμ ν¨μν νλ‘κ·Έλλ°κ³Ό JS ES6+ κ°μ

```

```toc

```
