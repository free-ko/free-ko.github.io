---
emoji: π¨βπ»
title: toString(), description, valueOf(), getOwnPropertySymbols()
date: '2021-10-31 00:00:00'
author: μ°κΈ°
tags: λΈλ‘κ·Έ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  π toString(), description, valueOf(), getOwnPropertySymbols()
</h1>

## 1. toString()

- `Symbol` μ μμ±νλ ννλ₯Ό λ¬Έμμ΄λ‘ λ³ννμ¬ λ°ν

  ```tsx
  console.log(Symbo('100').toString());

  const sym = Symbol.for('book');
  console.log(sym.toString());

  try {
    console.log(Symbol() + 'ABC');
  } catch {
    console.log('+λ‘ μ°κ²° λΆκ°');
  }

  // μ€ν κ²°κ³Ό
  // Symbol(100)
  // Symbol(book)
  // +λ‘ μ°κ²° λΆκ°
  ```

  - `Symbol` κ°μ λ°νλμ§ μμ

  - `+` λ‘ λ¬Έμμ΄μ μ°κ²°νλ©΄ `TypeError`

  - `toString()`μΌλ‘ λ³ννλ©΄ μ°κ²°μ λμ§λ§ `Symbol` κ°μ μ°κ²°λμ§ μμ

  <br>

  ## 2. description

  - `Symbol.prototype.descripon`

  - Syntax, ES2019

    - `Symbol("μ€λͺ").description;`
    - `Symbol.for("ν€").description;`
    - `Symbol.iterator.description;`

- `Symbol` μ€λΈμ νΈμ μ£Όμ, μ€λͺμ λ°ν

  ```tsx
  console.log(Symbol('sports').description); // sports
  console.log(Symbol.for('book').description); // book
  console.log(Symbol.iterator.description); // Symbol.iterator
  ```

  - `Symbol()` ν¨μμ νλΌλ―Έν°λ₯Ό λ°ν

- `toString()`κ³Ό μ°¨μ΄

  ```tsx
  console.log(Symbol('book').toString()); // Symbol(book)
  console.log(Symbol('').toString()); // Symbol()
  console.log(Symbol().toString()); // Symbol()

  console.log(Symbol.for('book').description); // book
  console.log(Symbol('book').description); // book
  console.log(Symbol('').description); // ""
  console.log(Symbol().description); // undefined
  ```

<br>

## 3. valueOf()

- `valueOf()` κ° νλ¦¬λ―Έν°λΈ κ°μ λ°ννμ§λ§ `Symbol` μ κ°μ λ°ννμ§ μκ³  `Symbol` μ μμ±ν ννλ₯Ό λ°ν

  ```tsx
  console.log(Symbol('100').valueOf()); // Symbol(100)
  console.log(Symbol.for('200').valueOf()); // Symbol(200)
  ```

- `Symbol.for()` λ `for` λ₯Ό μ μΈνκ³  λ°ν

<br>

## 4. getWonPropertySymbols()

- `Object`μ ν¨μμ΄μ§λ§ `Symbol`μ΄ λμμ΄λ―λ‘ μ¬κΈ°μ λ€λ£Έ
- νλΌλ―Έν°μ `Object`μμ `Symbol`λ§ λ°°μ΄λ‘ λ°ν, λ€λ₯Έ νλ‘νΌν°λ λ°ννμ§ μμ

  ```tsx
  const obj = { point: 100 };
  obj[Symbol('one')] = 200;
  obj[Symbol.for('two')] = 300;

  console.log(Object.getWonPropertyName(obj));

  const list = Object.getWonPropertySymbols(obj);
  for (const sym of list) {
    console.log(`${sym.description}: ${obj[sym]}`);
  }

  // 1. Object.getWonPropertyName(obj), objμμ νλ‘νΌν° μ΄λ¦μ λ°°μ΄λ‘ λ°νν¨, Symbolμ λ°ννμ§ μμ
  // 2. Object.getOwnPropertySymbols(obj) objμμ Symbolλ§ λ°°μ΄λ‘ λ°ν ν¨
  // 3. for-of λ¬ΈμΌλ‘ μ κ° λ¨

  // μ€ν κ²°κ³Ό
  // [point]
  // one: 200
  // two: 300
  ```

```toc

```
