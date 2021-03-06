---
emoji: π¨βπ»
title: Arrow Function μ¬μ©
date: '2021-09-02 00:00:00'
author: μ°κΈ°
tags: λΈλ‘κ·Έ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  π Arrow Function, ν¨μ λΈλ‘ μ¬μ©, νλΌλ―Έν° μ¬μ©
</h1>

<br>

## 1) Arrow Function

- `Arrow`μ μ¬μ μ  μλ―Έ : νμ΄, νμ΄ν
- μ½λ νν

  - `(param) => {ν¨μ μ½λ}`

  ```tsx
  const add = function (one, two) {
    return one + two;
  };

  console.log(add(1, 2)); // 3

  const total = (one, two) => {
    return one + two;
  };

  console.log(total(1, 2)); // 3
  ```

  1. `function` ν€μλ λμ μ νμ΄ν `=>` μ¬μ©
  2. `=>`ν μμͺ½μ κ³΅λ°± μμ± κ°λ₯

- `function() {}`μ μΆμ½ ννμ΄μ§λ§, κ³ λ €ν  μ¬ν­λ μμ(`this` μ°Έμ‘°κ° λ€λ¦)

<br>

## 2) ν¨μ λΈλ‘ μ¬μ©

- ν¨μ λΈλ‘κ³Ό `return` μμ±μλ΅

  ```tsx
  const total = (one, two) => one + two;

  console.log((total(1,2)); // 3
  ```

  1. ν¨μ λΈλ‘`{}`κ³Ό `return`μ μλ΅ν ννλ‘ `{ return one + two }`μ κ°μ
  2. `=>` μμμ μ€μ λΆλ¦¬νλ©΄ `SyntaxError`
  3. `=>` λ€μμλ κ°ν κ°λ₯

- ν¨μ λΈλ‘ `{}`λ§ μμ±ν νν

  ```tsx
  const total = (one) => {};

  console.log(total(1)); // undefined
  ```

  1. ν¨μ λΈλ‘`{}`λ§ μμ±νλ©΄ `undefined` λ°ν
  2. ν¨μ λΈλ‘μ `return`μ μμ±νμ§ μμ κ²κ³Ό κ°μ
  3. `return`μ μμ±νμ§ μμΌλ©΄ `default`λ‘ `undefined`λ₯Ό λ°ν ν¨
  4. νμ΄νκ° ν¨μμ΄κΈ° λλ¬Έμ΄ μλλΌ `JS` λ¬Έλ²μ

- `{key: value}`λ₯Ό λ°ννλ νν

  ```tsx
  const point = (param) => ({ book: param });
  const result = point('μ±');

  for (const key in result) {
    console.log(key + ': ' + result[key]);
  }

  // book: μ±
  ```

  1. `{key: value}`λ₯Ό μκ΄νΈ()λ‘ κ°μΈλ©΄ `{key: value}`λ₯Ό λ°νν¨
  2. μκ΄νΈ()μ μμ±νμ§ μμΌλ©΄ `undefined`λ₯Ό λ°νν¨

<br>

## 3) νλΌλ―Έν° μ¬μ©

- νλΌλ―Έν°κ° νλ μΌ λ

  ```tsx
  const get = (param) => param + 20;

  console.log(get(10)); // 30
  ```

  1. νλΌλ―Έν°κ° νλμ΄λ©΄ `(param)`μμ μκ΄νΈλ₯Ό μλ΅ν  μ μμ
  2. `get(10)`μμ `10`μ΄ `param`μ μ€μ λ¨

- νλΌλ―Έν°κ° μμΌλ©΄ μκ΄νΈλ§ μμ±

  ```tsx
  const get = () => 10 + 20;

  console.log(get()); // 30
  ```

  - νλΌλ―Έν°κ° μμΌλ©΄ μκ΄νΈλ§ μμ±ν  μ μμ

  <br>

```toc

```
