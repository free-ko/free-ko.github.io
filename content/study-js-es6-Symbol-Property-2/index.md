---
emoji: π¨βπ»
title: Symbol.toStringTag
date: '2021-10-22 00:00:00'
author: μ°κΈ°
tags: λΈλ‘κ·Έ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  π  Symbol.toStringTag
</h1>

<br>

## toStringTag

- `Object.prototype.toString()` μ νμ₯
- `toString()` μΌλ‘ μΈμ€ν΄μ€ νμμ κ΅¬νλ©΄ `[object Obect]` ννλ‘ λ°ν

  - μΈμ€ν΄μ€ νμμ λͺννκ² κ΅¬ν  μ μμ

  ```tsx
  const Book = function () {};
  const obj = new Book();

  console.log(obj.toString()); // [object Object]
  console.log({}.toString()); // [object Object]
  ```

<br>

- `Symbol.toStringTag` λ‘ κ΅¬λΆ κ°λ₯
  - `[object Object]` μμ λ λ²μ§Έμ νμλ  λ¬Έμμ΄μ μμ±
  - μ: "ABC"μ§μ , [object "ABC"]λ‘ λ°ν
- `prototype`μ μ°κ²°νμ¬ μμ±

  ```tsx
  const Sports = function () {};
  const obj = new Sports();
  console.log(obj.toString()); // [object Object]

  Sports.prtototype[Symbol.toString] = 'λκ΅¬';
  console.log(obj.toString()); // [object λκ΅¬]

  /* 
  1. μ²« λ²μ§Έμ obj.toString() μ μ€ννλ©΄
     - μΈμ€ν΄μ€ νμμ λ°ννλ©°
     - [object Object] κ° λ°νλ¨
     - function μΌλ‘ λ§λ€μλλ° Object κ° λ°νλ¨
  2. Sports.prtototype[Symbol.toString] = "λκ΅¬";
     - prototypeμ Symbol.toStringTag λ₯Ό μ°κ²°νκ³ 
     - [object Object] μ νμλ  λ¬Έμλ₯Ό "λκ΅¬"λ‘ μμ±νμ
     - νμλ  λ¬Έμλ₯Ό μμλ‘ μμ±ν  μ μμ
     - function λ§λ€ μ§μ ν  μ μμΌλ―λ‘ μμΈνκ² κ΅¬λΆνμ¬ μμ±ν  μ μμ
  3. λ λ²μ§Έμ obj.toString()μ νΈμΆ νλ©°
     - [object λκ΅¬] λ₯Ό μΆλ ₯ν¨
     - μ¦, Symbol.toStringTag μ μμ±ν λ¬Έμκ° μΆλ ₯ λ¨
  */
  ```

```toc

```
