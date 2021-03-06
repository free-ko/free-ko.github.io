---
emoji: π¨βπ»
title: async/await - λ°ν, νν, for-await-of
date: '2021-12-23 00:00:00'
author: μ°κΈ°
tags: λΈλ‘κ·Έ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  π  async/await - λ°ν, νν, for-await-of
</h1>

<br>

## 1. await

- Syntax

  - `[value] = awiat` ννμ
  - `async` ν¨μ μμ μμ±ν¨
  - `[value]` λ μ νμ

- ννμμ΄ `Promise` μ€λΈμ νΈ μ΄λ©΄ `resolve()`μ νλΌλ―Έν° κ°μ λ°νν¨

  ```tsx
  function crate(param) {
    return new Promise((resolve) => {
      resolve(param);
    });
  }

  async function getPoint(option) {
    const value = await create(option);
    console.log(value);
  }

  getPoint({ point: 100 });

  // 1. const value = await create(option); μμ create() ν¨μλ₯Ό νΈμΆν¨
  // 2. νΈμΆλ ν¨μμμ Promise μΈμ€ν΄μ€λ₯Ό λ°νν¨ λ°λΌμ μλ μ½λλ‘ μ΄λνκ² λλλ° awaitλ‘ μΈν΄ resolve(param)μ΄ μ€νλμ΄ param κ°μ λ³΄λΌ λ κΉμ§ κΈ°λ€λ¦Ό
  // 3. resolve(param)μ μ€νν¨ λ³΄λΈ κ°μ λ°μ value λ³μμ ν λΉν¨
  // 4. conosle.log(value)λ₯Ό μ€νν¨

  // μ€νκ²°κ³Ό
  // {point:100}
  ```

- ννμμ΄ `Promise` μ€λΈμ νΈκ° μλλ©΄ ννμμ νκ° κ²°κ³Όλ₯Ό λ°νν¨

  ```tsx
  async function getPoint(option) {
    const value = (await option.point) + 200;
    console.log(value);
  }

  getPoint({ point: 100 });

  // 1. const value = await option.point + 200; optionμ νλΌλ―Έν° κ°μΌλ‘ {point: 100}μ await ννμμ΄ Promise μ€λΈμ νΈκ° μλ
  // 2. μ΄λμλ ννμμ νκ° κ²°κ³Όλ₯Ό λ°νν¨
  // 3. awaitκ° λΉλκΈ° νκ²½μμ λκΈ° μ²λ¦¬λ₯Ό μν κ²μ΄λ―λ‘ ννμμ΄ λΉλκΈ° μ²λ¦¬κ° μλλ©΄ μλ―Έκ° μ½ν¨

  // μ€νκ²°κ³Ό
  // 300
  ```

- `Promise` μμ `reject()` κ° λ°μνμ λ μλ¬μ λμ²νλ ννμ

  - `try-catch` λ₯Ό μ¬μ©ν νν

    ```tsx
    function create(param) {
      return new Promise((res, reject) => {
        reject(param);
      });
    }

    async function getPoint(option) {
      try {
        await create(option);
      } catch (error) {
        console.log(error);
      }
    }

    getPoint({ point: 100 });

    // 1. reject(param); Promiseμμ reject()κ° μ€νλλ©΄
    // 2. catch(error) λΈλ‘μμ λ°μ reject(param)μ paramμ΄ catch(error)μ errorμ μ€μ λ¨
    // 3. try-catchλ‘ μλ¬ λ°μμ λμν  μ μμ

    // μ€νκ²°κ³Ό
    // {point:100}
    ```

  - `catch()` λ₯Ό μ¬μ©ν νν

    ```tsx
    function create(param) {
      return new Promise((res, reject) => {
        reject(param);
      });
    }

    async function getPoint(option) {
      await create(option)
        .catch((value) => {
          return 300;
        })
        .then((param) => {
          console.log(param);
        });
    }

    getPoint({ point: 100 });

    // 1. reject(param); reject() μ²λ¦¬μ΄λ―λ‘ catch()κ° μ€νλ¨
    // 2. catch((value) => {...} reject(param)μ param κ°μ΄ valueμ μ€μ λ¨
    // 3. return 300; 300μ΄ λ°νλμ§ μκ³  Promise μΈμ€ν΄μ€λ₯Ό λ°ννλ―λ‘ μλμ then()μ΄ νΈμΆλ¨
    // 4. then((param) => {...} catch()μμ return 300μ μ μ μ²λ¦¬μ΄λ―λ‘ μ²« λ²μ§Έ νλΌλ―Έν° ν¨μκ° μ€νλλ©° paramμ 300μ΄ μ€μ λ¨

    // μ€νκ²°κ³Ό
    // 300
    ```

  - `Promise` κ° μλ κ°μ λ°ννλ νν

    ```tsx
    function create(param) {
      return new Promise((res, reject) => {
        reject(param);
      });
    }

    async function getPoint(option) {
      const value = await create(option).catch((value) => {
        return 300;
      });
      console.log(value);
    }

    // 1. μμ catch().then() ννμ΄μ§λ§ μ¬κΈ°λ catch()κ° λμ
    // 2. return 300; catch()μ then()μ΄ μ°κ²°λμ΄ μμΌλ©΄ Promise μΈμ€ν΄μ€λ₯Ό λ°ννμ§λ§ then() μ°κ²°μ΄ μμΌλ©΄ 300μ λ°νν¨
    // 3. console.log(value) 300μ λ°ννλ―λ‘ 300μ΄ μΆλ ₯λ¨

    // μ€νκ²°κ³Ό
    // 300
    ```

<br>

## 2. for-await-of

- Syntax
  - `for await (variable of iterable) {...}`
  - `async` ν¨μμμ μ¬μ©ν  μ μμ
- λκΈ° λ°λ³΅μμ μ¬μ©ν  μ μμ§λ§

  ```tsx
  const list = [10, 20];

  async function show() {
    for await (const value of list) {
      console.log(value);
    }
  }

  show();

  // 1. for await (variable of iterable) {...} iterableμ μ΄ν°λ¬λΈ μ€λΈμ νΈλ₯Ό μμ±ν¨ [10,20]μ μ΄ν°λ¬λΈ μ€λΈμ νΈ μ variableμ const/let/var λ³μλ₯Ό μμ±ν¨
  // 2. for await (const value of list) {...} [10,20]μ μλ¦¬λ¨ΌνΈλ₯Ό νλμ© λ°λ³΅νλ©΄μ κ°μ valueμ μ€μ νκ³  console.log(value)λ‘ κ°μ μΆλ ₯ν¨
  // 3. λ°°μ΄μμ Promise μΈμ€ν΄μ€λ₯Ό λ°ννμ§ μμΌλ―λ‘ μ΄κ²μ λΉλκΈ° λ°λ³΅μ΄ μλλΌ λκΈ° λ°λ³΅

  // μ€νκ²°κ³Ό
  // 10
  // 20
  ```

- μΌλ°μ μΌλ‘ λΉλκΈ° λ°λ³΅μμ μ¬μ©

  ```tsx
  async function* point() {
    yield 10;
    yield 20;
  }

  async function show() {
    for await (const value of point()) {
      console.log(value);
    }
  }

  show();

  // 1. for await (const value of point()){...} point() μ λλ μ΄ν° ν¨μλ₯Ό νΈμΆνλ©΄ Proimse μΈμ€ν΄μ€λ₯Ό λ°ννλ―λ‘ λΉμ€λλ‘ λ°λ³΅νκ² λ¨

  // μ€νκ²°κ³Ό
  // 10
  // 20
  ```

```toc

```
