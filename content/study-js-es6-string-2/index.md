---
emoji: π¨βπ»
title: Unicode ν¨μ
date: '2021-09-19 00:00:00'
author: μ°κΈ°
tags: λΈλ‘κ·Έ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  π  fromCodePoint(), codePointAt(), normalize()
</h1>

<br>

## 1. fromCodePoint()

- μ λμ½λμ μ½λ ν¬μΈνΈμ ν΄λΉνλ λ¬Έμ λ°ν
- νλΌλ―Έν°μ λ€μμ μ½λ ν¬μΈνΈ μμ± κ°λ₯

  - λ¬Έμλ₯Ό μ°κ²°νμ¬ λ°ν

  ```tsx
  const point = String.fromCodePoint;

  console.log(point(49, 50, 51)); // 123
  console.log(point(44032, 44033)); // κ°κ°
  console.log(point(0x31, 0x32, 0x33)); // 123
  console.log(point(0x1f4118)); // μ½λΌλ¦¬ μ΄λͺ¨μ§
  ```

- ES5μ `fromCahrCode()`μ¬μ©

  - `Surrogate pair`λ‘ μμ±

  ```tsx
  console.log(String.fromCharCode(0x1f418)); // λ€λͺ¨ μμ΄μ½
  console.log(String.fromCharCode(0xd83d, 0xdc18)); // μ½λΌλ¦¬ μμ΄μ½

  // 1. fromCharCode()γγμλ 0x1f418ννλ₯Ό μ§μνμ§ μμΌλ―λ‘
  // 2. fromCharCode(0xD83D, 0xDc18)μ²λΌ Surrogate pairλ‘ μμ±ν¨
  ```

<br>

## 2. codePointAt()

- λμ λ¬Έμμ΄μμ

  - νλΌλ―Έν°μ μμ±ν μΈλ±μ€ λ²μ§Έ λ¬Έμλ₯Ό
  - μ λμ½λ μ½λ ν¬μΈνΈλ‘ λ³ννμ¬ λ°ν
  - μ½λ ν¬μΈνΈλ UTF-16μΌλ‘ μΈμ½λ©λ κ°

  ```tsx
  const result = 'κ°λλ€'.codePointAt(2);

  console.log(result); // 45796
  console.log(typeof result); // number

  console.log('κ°λλ€'.codePointAt(3)); // undefined
  console.log(String.fromCodePoint(result)); // λ€

  // 1. "κ°λλ€".codePointAt(2) λ¬Έμμ΄ "κ°λλ€"μμ 3λ²μ§Έμ μ½λ ν¬μΈνΈλ₯Ό κ΅¬ν΄ λ°νν¨
  // 2. λ°νλ μ½λ ν¬μΈνΈ νμμ numberμ
  // 3. μΈλ±μ€ λ²μ§Έμ λ¬Έμκ° μμΌλ©΄ undefinedλ₯Ό λ°νν¨
  // 4. codePointAt(2)μ κ°μ 45796μ΄κ³  fromCodePoint(45796)μ κ°μ "λ€"μ
  ```

  <br>

  ## 3. normalize()

  - λμ λ¬Έμμ΄μ νλΌλ―Έν°μ μ§μ ν

    - μ λμ½λ μ κ·ν νμμΌλ‘ λ°ννμ¬ λ°ν

    ```tsx
    console.log('γ±'.codePointAt().toString(16)); // 3131
    console.log('γ'.codePointAt().toString(16)); // 314f
    console.log('β©u{3131}β©u{314F}'); // γ± γ
    ```

    ```tsx
    const point = 'β©u{3131}β©u{314F}';

    console.log(point.noormalize('NFC')); // γ± γ
    console.log(point.normalize('NFD')); // γ± γ

    console.log(point.normalize('NFKD')); // κ°
    console.log(point.normalize('NFKC')); // κ°
    ```

```toc

```
