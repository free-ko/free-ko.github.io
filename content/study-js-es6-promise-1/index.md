---
emoji: π¨βπ»
title: Promise - κ°μ, μ²λ¦¬ νλ¦, μν
date: '2021-12-15 00:00:00'
author: μ°κΈ°
tags: λΈλ‘κ·Έ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  π  Promise κ°μ, Promise μ²λ¦¬ νλ¦, Promise μν
</h1>

<br>

## 1. Promise κ°μ

- JSλ κΈ°λ³Έμ μΌλ‘ `λκΈ°`λ‘μ€ν
  - μ€νμ΄ λλμΌ λ€μ μ½λλ₯Ό μ€νν¨
- `Promise` λ λΉλκΈ°λ‘ μ²λ¦¬(μ€ν)ν¨
  - μ½λλ₯Ό μ°μμΌλ‘ μ²λ¦¬(μ€ν)νμ§ μκ³ , μ€κ°μ νλ¦μ΄ λμ΄μ‘λ€κ° μ°κ²°λ μ½λλ₯Ό μ²λ¦¬ ν  μ μλ νκ²½μ΄ λμμ λ μ€νν¨
  - μ΄λ₯Ό μν λ©μ»€λμ¦μ κ°κ³  μμ
- `DOM` μ€νμμ `JS` μ€νμΌλ‘ μ ν

<br>

## 2. Promise μ²λ¦¬ νλ¦

- `Promise` μ²λ¦¬(μ€ν) νλ¦ κ°μ

  ```tsx
  const obj = new Promise((resovle, reject) => {
    resolve();
    console.log('Promise');
  });

  obj.then(
    (value) => {
      console.log('μ±κ³΅');
    },
    (reson) => {
      console.log('μ€ν¨');
    },
  );

  console.log('λ§μ§λ§');

  // Promise
  // λ§μ§λ§
  // μ±κ³΅
  ```

- `new Promise()` λ₯Ό μ€νν¨
  - νλΌλ―Έν°μ ν¨μλ₯Ό μ€νν¨
  - `resolve()` λ₯Ό νΈμΆ νμ§ μμ
  - `console.log("Promise")` λ₯Ό μ€ν
  - `obj` λ³μμ `Promise` μΈμ€ν΄μ€ ν λΉ
- `obj.then()`μ μ€ννμ§ μμ
- λ§μ§λ§ μ€μ `console.log("λ§μ§λ§")` μ€νν¨
- `resolve()` μ€ν
  - `then()` μ μ²« λ²μ§Έ νλΌλ―Έν° ν¨μ μ€ν
  - `console.log("μ±κ³΅")` μ€ν

<br>

## 3. Promise μν

- μνλ 3κ°μ§μ΄λ©°, νλλ§ λ°μν¨
  - `pending, settled(fulfilled, rejected)`
- `pending` μν

  - `new Promise()` λ‘ μΈμ€ν΄μ€ μμ±

    ```tsx
    const obj = new Promise((resolve, reject) => {
      resolve();
      console.log('pending');
    });

    obj.then(
      (value) => {
        console.log('μ±κ³΅');
      },
      (reson) => {
        console.log('μ€ν¨');
      },
    );

    console.log('λ§μ§λ§');

    // pending
    // λ§μ§λ§
    // μ±κ³΅
    ```

- `settled` μν

  - `pending`μ΄ μ’λ£λ μνλ₯Ό λνλ΄λ©° `fulfilled`μ `rejected` μνλ‘ κ΅¬λΆ
  - λ°μΈλ©ν νΈλ€λ¬ ν¨μκ° νΈμΆλ¨

    ```tsx
    const obj = new Promise((resolve, reject) => {
      resolve();
      console.log('pending');
    });

    obj.then(
      (value) => {
        console.log('μ±κ³΅');
      },
      (reson) => {
        console.log('μ€ν¨');
      },
    );

    console.log('λ§μ§λ§');

    // pending
    // λ§μ§λ§
    // μ±κ³΅
    ```

- `fulfilled(μ±κ³΅)` : `then()` μ μ²« λ²μ§Έ ν¨μ νΈμΆ
- `rejected(μ€ν¨)` : `then()` μ λ λ²μ§Έ ν¨μ νΈμΆ

```toc

```
