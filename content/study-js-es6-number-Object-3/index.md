---
emoji: π¨βπ»
title: Number ν¨μ
date: '2021-09-17 00:00:00'
author: μ°κΈ°
tags: λΈλ‘κ·Έ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  π  Number ν¨μ: isNaN(), isInteger(), isSafeInteger(), isFinite()
</h1>

<br>

## 1. isNaN()

- `NaN` κ°μ μ¬λΆλ₯Ό μ²΄ν¬

  - `NaN` κ°μ΄λ©΄ `true`, μλλ©΄ `false` λ°ν

  ```tsx
  console.log(Number.isNaN('ABC'), isNaN('DEF')); // false, true
  console.log(Number.isNaN(NaN), isNaN(NaN)); // true, true,
  console.log(Number.isNaN(0 / 0), isNaN(0 / 0)); //  true, true,
  console.log(Number.isNaN('100'), isNaN('200')); // false, false,
  ```

  1. κΈλ‘λ² μ€λΈμ νΈμ `isNaN("DEF")` κ° νμμ΄ `Number`κ° μλ κ²μ μ²΄ν¬ ν¨, `DEF`κ° `String` νμμ΄λ―λ‘ `true` λ°ν
  2. `NaN`μ `0 / 0` μ κ°μ΄ `NaN`μ΄λ―λ‘ `true`κ° λ¨
  3. `Number.isNaN("ABC")` κ°μ΄ `NaN`κ° μλλ―λ‘ `false`κ° λ¨
  4. κΈλ‘λ² μ€λΈμ νΈμ `isNaN("200")` κ°μ μ«μλ‘ λ³ννκ³  κ·Έ κ²°κ³Όλ‘ λΉκ΅ ν¨, λ³νν κ° `200`μ΄ `Number` μ΄λ―λ‘ `false` λ°ν

- NaN μ²΄ν¬ λ°©λ²
  - `NaN === NaN` κ²°κ³Όκ° `false`μ΄λ―λ‘ μ¬μ© λΆκ°
  - `isNaN()`, κΈλ‘λ² μ€λΈμ νΈ
  - `Number.isNaN()`
  - `Object.is(NaN, NaN)` : `true`

<br>

## 2. isInteger()

- νλΌλ―Έν° κ°μ΄ `μ μ`μ΄λ©΄ `true`, μλλ©΄ `false` λ°ν
- μ μλ‘ μΈμ

  ```tsx
  console.log(Number.isInteger(0)); // true
  console.log(Number.isInteger(1.0)); // true
  console.log(Number.isInteger(1.01)); // false
  ```

- μ μκ° μλ κ²μΌλ‘ μΈμ

  ```tsx
  console.log(Number.isInteger('12')); // false
  console.log(Number.isInteger(true)); // false
  ```

  1. κ°μ `Number`λ‘ λ³ννμ¬ μ²΄ν¬νμ§ μμ
  2. `Numbe`rλ‘ λ³ννλ©΄, `"12"`μ `true`κ° `Number`μ΄λ―λ‘ μ μλ‘ μΈμλ¨

<br>

## 3. isSafeInteger()

- νλΌλ―Έν° κ°μ΄ `sfae μ μ`μ΄λ©΄ `true` μλλ©΄ `false` λ°ν
- `-(2μ 53μΉ - 1)` ~ `+(2μ 53μΉ -1)` : `true` μλλ©΄ `false`

```tsx
const isSafe = Number.isSafeInteger;

console.log(isSafe(7.0)); // true
console.log(isSafe(Number.MAX_SAFE_INTEGER)); // true
console.log(isSafe(Number.MIN_SAFE_INTEGER)); // true

// 7.0μ μ μμ΄λ©°, κ° λ²μμ μνλ―λ‘ true
```

```tsx
const isSafe = Number.isSafeInteger;

console.log(isSafe(7.1)); // false
console.log(isSafe('100')); // false
console.log(isSafe(NaN)); // false
console.log(isSafe(Infinity)); // false

// 7.1μ μ μκ° μλ
// κ°μ Numberλ‘ λ°ννμ¬ μ²΄ν¬νμ§ μμ
// Numberλ‘ λ³ννλ©΄, "100"μ΄ Numberμ΄λ―λ‘ μ μλ‘ μΈμ
```

<br>

## 4. isFinite()

- νλΌλ―Έν° κ°μ΄ μ ν κ°μ΄λ©΄ `true` μλλ©΄ `false`
- κΈλ‘λ² μ€λΈμ νΈμ `isFinite()`μ μ²΄ν¬ κ²°κ³Όκ° λ€λ¦

  ```tsx
  const num = Number.isFinite,
    global = isFinite;

  console.log(num(100), global(200)); // true, true
  console.log(num('70'), global('80')); // false, true
  console.log(num(true), global(true)); // false, true

  console.log(num(NaN), global(NaN)); // false, false
  console.log(num(undefined), global(undefined)); // false, false
  ```

- ν¨μλ μ€λΈμ νΈμ μν΄μΌ νλ―λ‘ `Number`μ κ΄λ ¨λ κ²μ `Number` μ€λΈμ νΈμ ν¨μ μ¬μ©, κΈλ‘λ² μ€λΈμ νΈμ ν¨μλ κΈλ‘λ² μ¬μ©μ΄ λͺ©μ 

```toc

```
