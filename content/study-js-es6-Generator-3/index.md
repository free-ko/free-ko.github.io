---
emoji: π¨βπ»
title: yield ν€μλ
date: '2021-10-12 00:00:00'
author: μ°κΈ°
tags: λΈλ‘κ·Έ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  π  yield ν€μλ
</h1>

<br>

## 1. Yield

- `Syntax: [returnValue] = yield [ννμ];`

- `yield` ν€μλ μ¬μ© νν

  ```tsx
  function* sports(one) {
    yield one + 10;
    yield;
    const value = yield one + 50;
  }

  const obj = sports(30);

  console.log(obj.next()); // {value: 40, done: false}
  console.log(obj.next()); // {value: undefined, done: false}
  console.log(obj.next()); // {value: 80, done: false}
  console.log(obj.next(200)); // {value: undefined, done: true}
  ```

  - `next()`λ‘ νΈμΆν  λ λ§λ€ νλμ© μ€ν

- `yield` ν€μλλ μ λλ μ΄ν° ν¨μ μ€νμ λ©μΆκ±°λ λ€μ μ€νν  λ μ¬μ©

  - `yield` μ€λ₯Έμͺ½μ ννμμ νκ°νκ³  κ²°κ³Όλ₯Ό λ°ν
  - ννμμ μμ±νμ§ μμΌλ©΄ `undefined` λ°ν

- `[returnValue]` μ€λ₯Έμͺ½μ νκ° κ²°κ³Όκ° μ€μ λμ§ μκ³  λ€μ `next()` μμ νλΌλ―Έν°λ‘ λκ²¨μ€ κ°μ΄ μ€μ λ¨

- `yield` ννμμ νκ°νλ©΄ νΈμΆν κ³³μΌλ‘ `{value: κ°, done: true/false}` λ°ν

  ```tsx
  function* sports(one) {
    yield one;
    const check = 20;
  }

  const obj = sports(10);
  console.log(obj.next()); // {value: 10, done: false}
  console.log(obj.next()); // {value: undefined, done: true}

  // 1. obj.next() νΈμΆ yield one; μ€ν, {value: 10, done: false} λ°ν
  // 2. obj.next() νΈμΆ check = 20;μ μ€ννμ§λ§, yield μ²λ¦¬κ° μλλ―λ‘ {value: undefined, done: false}λ°ν
  // 3. μ΄ μνμμ κ³μ next()λ₯Ό νΈμΆνλ©΄ {value: undefined, done: true} λ°ν
  // 4. ν¨μλ₯Ό νΈμΆν  μ μμ§λ§ ν¨μκ° μ€νλμ§ μμ
  ```

- `value` κ°
  - `yield` ννμμ νκ° κ²°κ³Ό μ€μ 
  - `yield`λ₯Ό μ€ννμ§ λͺ»νλ©΄ `undefined`
- `done` κ°
  - `yeild` λ₯Ό μ€ννλ©΄ `false`
  - `yeild` λ₯Ό μ€ννμ§ λͺ»νλ©΄ `true`

<br>

## 2. Yield μ λ¦¬

```tsx
function* sports(one) {
  let two = yield one;
  let param = yield one + two;
  yield param + one;
}

const obj = sports(10);

console.log(obj.next()); // {value: 10, done: false}
console.log(obj.next()); // {value: NaN, done: false}
console.log(obj.next(20)); // {value: 30, done: false}
console.log(obj.next()); // {value: undefined, done: true}
```

1. `function* sports(one){}`
   - μ λλ μ΄ν° ν¨μλ₯Ό μ μΈ
   - 3κ°μ `yield`λ₯Ό μμ±ν¨
2. `const obj = sports(10);`
   - μ λλ μ΄ν° μ€λΈμ νΈλ₯Ό μμ±ν¨
   - νλΌλ―Έν° κ°, 10μ΄ `one`μ μ€μ λ¨
3. μ²« λ²μ§Έμ `obj.next()` λ₯Ό νΈμΆ ν¨
   - `let two = yield one`μ΄ μ€νλ¨
   - `one`μ κ°μΈ 10μ λ°νν¨
   - `two` λ³μμ 10μ ν λΉνμ§ μμ
4. λ λ²μ§Έμ `obj.next()`λ₯Ό νΈμΆ ν¨
   - `next()` μ νλΌλ―Έν° κ°μ μμ±νμ§ μμμΌλ―λ‘ `two` λ³μμ `undefined`κ° μ€μ λ¨
   - `let param = yield one + two` λ₯Ό μ€ν
   - `two` λ³μ κ°μ΄ `undefined`μ΄λ―λ‘ `NaN`λ₯Ό λ°ν
5. μΈ λ²μ§Έμ `obj.next(20)`λ₯Ό νΈμΆ ν¨
   - νλΌλ―Έν° κ° 20μ΄ λ°λ‘ μμ `param` λ³μμ μ€μ λ¨
   - `yield param + one` μ μ€νν¨
   - 20 + 10μ λ°ν ν¨
6. λ€ λ²μ§Έμ `obj.next()` λ₯Ό νΈμΆ ν¨
   - μ€νν  `yield`κ° μμΌλ―λ‘ λ μ΄μ μ²λ¦¬νμ§ μμΌλ©°
   - λμ΄λΌλ κ²μ λνλ΄λ `done: true`λ₯Ό λ°ν ν¨

```toc

```
