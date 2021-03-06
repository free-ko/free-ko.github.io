---
emoji: π¨βπ»
title: keys(), values()
date: '2021-10-05 00:00:00'
author: μ°κΈ°
tags: λΈλ‘κ·Έ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  π  keys(), values()
</h1>

<br>

## 1. keys()

- `Array` μ€λΈμ νΈλ₯Ό `Array` μ΄ν°λ μ΄ν° μ€λΈμ νΈλ‘ μμ±, λ°ν
  - `entries()`μ κ°μΌλ©°
  - `[key, value]` ννμμ `value`λ λ°ννμ§ μκ³  `key`λ§ λ°ν
- λ°°μ΄ μΈλ±μ€κ° `key`κ° λ¨

  ```tsx
  const iterator = ['A', 'B'].keys();
  console.og(iterator.next()); // {value: 0, done: false}
  console.og(iterator.next()); // {value: 1, done: false}
  console.og(iterator.next()); // {valude: undefined, done: true}

  // 1. μμ±ν Array μ΄ν°λ μ΄ν° μ€λΈμ νΈλ [key] ννμ
  // 2. valueμ μΈλ±μ€κ° μ€μ λ¨
  ```

  <br>

  ```tsx
  const iterator = ['A', 'B'].keys();

  for (const property of iterator) {
    console.log(property);
  }

  // 1. keyλ§ μ€μ λλ―λ‘ κ°μ΄ νλ, λ°λΌμ λΆν  ν λΉμ νμ§ μμλ λ¨
  // κ²°κ³Ό : 0, 1
  ```

<br>

## 2. values()

- `Array` μ€λΈμ νΈλ₯Ό `Array` μ΄ν°λ μ΄ν° μ€λΈμ νΈλ‘ μμ±, λ°ν
- `[key, value]` ννμμ `value`λ λ°ννκ³  `key` λ°ννμ§ μμ
- λ°°μ΄μ μλ¦¬λ¨ΌνΈ κ°μ΄ `value`κ° λ¨

  ```tsx
  const iterator = ['A', 'B'].values();
  console.og(iterator.next()); // {value: A, done: false}
  console.og(iterator.next()); // {value: B, done: false}
  console.og(iterator.next()); // {valude: undefined, done: true}

  // 1. μμ±ν Array μ΄ν°λ μ΄ν° μ€λΈμ νΈλ [value] ννμ

  const iterator = ['A', 'B'].values();

  for (const property of iterator) {
    console.log(property);
  }

  // 1. valueλ§ μ€μ λλ―λ‘ κ°μ΄ νλ
  // κ²°κ³Ό : A, B
  ```

- `[Symbol.iterator]()` μ¬μ©

  ```tsx
  const check = Array.prototype.values === Array.prototype[Symbol.iterator];

  console.log(check); // true

  const iterator = ['A', 'B'][Symbol.iterator]();

  for (const property of iterator) {
    console.log(property); // A, B
  }

  // 1. Array.prototype.values()μ Array.prototype[Symbol.iterator]κ° κ°μ
  // 2. λ°λΌμ values() λμ μ [Symbol.iterator]()λ₯Ό μ¬μ©ν΄λ κ²°κ³Όκ° κ°μ
  ```

- κ°μ΄ μ°λ λ¨

  ```tsx
  let list = ['A', 'B'];
  let iterator = list.values();

  list[0] = 'μ°λ';

  console.log(iterator.next()); // {value: μ°λ, done: false}
  console.log(iterator.next()); // {value: B, done: false}

  // Array μ΄ν°λ μ΄ν° μ€λΈμ νΈμμ λ°°μ΄μ λ©λͺ¨λ¦¬ μ£Όμλ₯Ό μ°Έμ‘°νλ―λ‘ κ°μ΄ μ°λ λ¨
  ```

```toc

```
