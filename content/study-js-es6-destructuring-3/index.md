---
emoji: π¨βπ»
title: Object μ€νΌλ μ΄μ, νλ‘νΌν° μ΄λ¦ μ‘°ν©
date: '2021-09-10 00:00:00'
author: μ°κΈ°
tags: λΈλ‘κ·Έ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  π Object μ€νΌλ μ΄μ, νλ‘νΌν° μ΄λ¦ μ‘°ν©
</h1>

<br>

## 1. Object μ€νΌλ μ΄μ

- κ°μ νλ‘νΌν° μ΄λ¦ μ¬μ©

  ```tsx
  const value = { book: 10, book: 20 };

  console.log(value); // {book: 20}
  ```

  1. `{book: 10, book: 20}`μμ νλ‘νΌν° μ΄λ¦μΈ `book`μ΄ κ°μ
  2. `ES5 Strict` λͺ¨λμμ νλ‘νΌν° μ΄λ¦μ΄ κ°μΌλ©΄ μλ¬ λΈ
  3. `ES6`μμλ `Stirct` λͺ¨λμ κ΄κ³μμ΄ μλ¬κ° λ°μνμ§ μμ, λ€μ μμ±ν νλ‘νΌν° κ°μΌλ‘ λμ²΄λ¨

- Shorhand property names

  ```tsx
  const one = 10,
    two = 20;
  const value = { one, two };

  console.log(values); // {one: 10, two: 20}
  ```

  1. `one`κ³Ό `two` λ³μμ κ°μ μμ±νμμΌλ©°
  2. `{one, two}` ννλ‘ `values`μ ν λΉν¨
  3. `one`μ΄ νλ‘νΌν° μ΄λ¦μ΄ λκ³  `10`μ΄ νλ‘νΌν° κ°μΌλ‘ ν λΉλ¨
  4. `"Shorhand property names"`μ MDNμ μμ±λ κ²μΌλ‘ μ€νμ μ μλ κ²μ μλ

<br>

## 2. νλ‘νΌν° μ΄λ¦ μ‘°ν©

- λ¬Έμμ΄μ νλ‘νΌν° μ΄λ¦μΌλ‘ μ¬μ©

  ```tsx
  const value = {
    ['one' + 'two']: 12,
  };

  console.log(value.onetwo); // 12
  ```

  1. `"one"`κ³Ό `"two"`λ₯Ό μ°κ²°νμ¬ `onetwo`λ₯Ό νλ‘νΌν° μ΄λ¦μΌλ‘ μ¬μ© ν¨

- λ³μ«κ°μ νλ‘νΌν° μ΄λ¦μΌλ‘ μ¬μ©

  ```tsx
  const item = 'world';
  const sports = {
    [item]: 100,
    [item + 'Cup']: 'μλμ»΅',
    [item + 'Sports']: function () {
      return 'μ€ν¬μΈ ';
    },
  };

  console.log(sports[item]); // 100
  console.log(sports[item + 'Cup']); // μλμ»΅
  console.log(sports[item + 'Sports']()); // μ€ν¬μΈ 
  ```

  1. λ³μ«κ°μ νλ‘νΌν° μ΄λ¦μΌλ‘ μ¬μ© ν¨
  2. λ³μ«κ°κ³Ό λ¬Έμμ΄μ μ°κ²°ν  μ μμ
  3. νλ‘νΌν° μ΄λ¦μ κ³΅λ°±μ΄ μλ κ²μ΄ μ΄μνμ§λ§ κ³΅λ°±μ λ£μ μ μμ
  4. ν¨μλ‘ νΈμΆ ν  μ μμ, λ³μ«κ°μ λ°λΌ ν¨μ μ΄λ¦μ μ μ ν  μ μμ

- λΆν  ν λΉμ μ‘°ν©ν νν

  ```tsx
  const item = 'book';
  const result = ({ [item]: title } = { book: 'μ±' }); // itemμ κ°λ³μ μΌλ‘ μ¬μ© νλμ μ μ©

  console.log(result); // {book: μ±}
  ```

  1. λ³μ«κ°μ νλ‘νΌν° μ΄λ¦μΌλ‘ μ¬μ©νκ³  λΆν  ν λΉν νν
  2. `{[item]: title}`μ΄ `{book: title}` ννκ° λ¨
  3. `{book: "μ±"}`μ΄ `{book: title}`μ "μ±"μ΄ ν λΉλ¨

```toc

```
