---
emoji: π¨βπ»
title: μ§μ, EPSILON
date: '2021-09-16 00:00:00'
author: μ°κΈ°
tags: λΈλ‘κ·Έ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  π  μ§μ, EPSILON: Number.EPSILON, μ§μ
</h1>

<br>

## 1. Number.EPSLON

- `Number.EPSILON`
  - μμ£Ό μμ κ°
  - 2.220446049250313080847263361816E-16
  - λλ 2^-52
- μ¬μ© μ¬λ‘

  - λ―ΈμΈν κ° μ°¨μ΄ νν

  ```tsx
  const total = 0.1 + 0.2;

  console.log(total); // 0.3000000000000000004
  console.log(total === 0.3); // false
  ```

  1. JSκ° λΆλμμμ  μ²λ¦¬λ₯Ό νκΈ° λλ¬Έ(IEEE 74)
  2. μ΄μ²λΌ λ―ΈμΈν κ° μ°¨μ΄λ‘ μΌμΉνμ§ μμ λ `EPSILON`μ μ¬μ©

  - λ―ΈμΈν κ° μ°¨μ΄λ₯Ό κ°μ κ°μΌλ‘ κ°μ£Ό

  ```tsx
  const value = Math.abs(0.1 + 0.2 - 0.3);

  console.log(value < Number.EPSILON); // true
  ```

  - κ° μ°¨μ΄κ° `Number.EPSILON`λ³΄λ€ μμΌλ©΄ `true`λ₯Ό λ°ν`

  - `0 / 0`μΌλ‘ `NaN`κ° λλ κ²μ λ°©μ§

  ```tsx
  console.log(0 / 0); // NaN

  const value = 0 / (0 + Number.EPSILON);

  console.log(value);
  ```

  - `(0 + Number.EPSILON)` μ²λΌ μμ κ°μ λν΄ λλλ©΄ `0`μ΄ λ¨

<br>

## 2. μ§μ

- Binary(2μ§μ)

  - `0b0101`, `0B0101` ννλ‘ μμ±
  - μ«μ `0` λ€μμ `b/B` μμ±νκ³  μ΄μ΄μ `0` λλ `1`λ‘ κ°μ μμ±

  ```tsx
  const value = 0b111;

  console.log(value); // 7

  // 1 + 2 + 4
  ```

- Octal(8μ§μ)

  - `0O0105` ννλ‘ μμ±
  - μ«μ `0` λ€μμ μλ¬Έ `o/O` μμ±νκ³  μ΄μ΄μ `0~7`λ‘ κ°μ μμ±
  - ES3λ μ²« μλ¦¬μ μλ¬Έ `o/O` μμ±

  ```tsx
  const value = 0o1111;

  console.log(value);

  // 1 + 8 + 64
  ```

```toc

```
