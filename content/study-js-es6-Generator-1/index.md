---
emoji: π¨βπ»
title: Generator ν¨μ
date: '2021-10-10 00:00:00'
author: μ°κΈ°
tags: λΈλ‘κ·Έ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  π   Generator ν¨μ
</h1>

<br>

## 1. `function*`

- Generator function : `function*` ν€μλλ₯Ό μ¬μ©ν ν¨μ
- μ λλ μ΄ν° ν¨μ νν : `function* μ μΈλ¬Έ`, `function* ννμ`, `Generator Function`
  ```tsx
  function* sports(one) {}
  const book = function* (one) {};
  const music = Object.getProtytpeOf(function* () {}).constructor;
  const gen = new music();
  ```
- μμ± λ°©λ² :`function*` λ€μμ μκ΄νΈ() μμ±μ΄μ΄μ μμ±ν΄λ λκ³  νλ μ΄μ λμλ λ¨

<br>

## 2. `funtion*` μ μΈλ¬Έ

- `function*` λ€μμ ν¨μ μ΄λ¦ μμ±

- μ λλ μ΄ν° ν¨μλ₯Ό νΈμΆνλ©΄ ν¨μ λΈλ‘`{}`μ μ€ννμ§ μκ³ 

  - `Generator`μ€λΈμ νΈλ₯Ό μμ±νμ¬ λ°ν

  ```tsx
  function* sports(one, two) {
    yield one + two;
  }

  console.log(typeof sports); // true

  const obj = sports(1, 2);
  console.log(typeof obj); // object
  console.log(obj.next()); // {value: 3, done: false}

  // 1. function* sports(one, two){} μ μΈλ¬Έ ννμ μ λλ μ΄ν° γλ§μ μ
  // 2. μ λλ μ΄ν° ν¨μμ νμμ function
  // 3. const obj = sports(1, 2); sports ν¨μλ₯Ό νΈμΆνλ©΄ Generator μ€λΈμ νΈλ₯Ό μμ±νμ¬ λ°νν¨
  // 4. μ΄λ, ν¨μ μ½λλ₯Ό μ€ννμ§ μμ
  // 5. νλΌλ―Έν° κ°μ μμ±ν μ€λΈμ νΈμ μ€μ λ¨
  // 6. new μ°μ°μλ₯Ό μ¬μ©ν  μ μμ, λ¨μΌ ν¨μλ‘ μ¬μ©νκ² λ€λ λμμ€
  // 7. typeof obj μμ±ν Generator μ€λΈμ νΈ νμ object
  // 8. obj.next() Generator μ€λΈμ νΈκ° iterator μ€λΈμ νΈμ΄λ―λ‘ next() ν¨μλ₯Ό νΈμΆ ν  μ μμΌλ©° μ΄λ ν¨μ μ½λκ° μ€ν λ¨
  ```

- `Generator` μ€λΈμ νΈλ `iterator` μ€λΈμ νΈ

- ν¨μ μ½λ μ€ν
  - `Generator` μ€λΈμ νΈμ λ©μλλ₯Ό νΈμΆ ν  λ

<br>

## 3. `function*` ννμ

- `function*` λ€μμ ν¨μ μ΄λ¦ μμ±μ μ ν

  - μΌλ°μ μΌλ‘ ν¨μ μ΄λ¦μ μμ±νμ§ μμ
  - `function*` μΌμͺ½μ λ³μλ₯Ό μ μΈνλ©° λ³μ μ΄λ¦μ΄ ν¨μ μ΄λ¦μ΄ λ¨

  ```tsx
  const sports = function* (one) {
    yield one;
  };

  const obj = sports(100);
  console.log(obj.next()); // {value: 100, done: false}

  // 1. const sports = function* (one) {} ννμ ννμ μ λλ μ΄ν° ν¨μ μ
  // 2. μΌμͺ½ sportsκ° ν¨μ μ΄λ¦μ΄ λ¨
  // λ¬Έλ² μ μΌλ‘λ * λ€μμ ν¨μ μ΄λ¦μ μμ±ν  μ μμ§λ§ μΌλ°μ μΌλ‘λ μ¬μ©νμ§ μμ
  ```

- ν¨μλ₯Ό μ μΈνλ ννλ§ λ€λ₯Ό λΏ
  - λ€λ₯Έ κ²μ `function*` μ μΈλ¬Έκ³Ό κ°μ

```toc

```
