---
emoji: π¨βπ»
title: Promise - then(), then()μ return, catch(), finally()
date: '2021-12-17 00:00:00'
author: μ°κΈ°
tags: λΈλ‘κ·Έ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  π  Promise -  then(), then()μ return, catch(), finally()
</h1>

<br>

## 1. then()

- μ±κ³΅κ³Ό μ€ν¨ νΈλ€λ¬ ν¨μλ₯Ό μμ±ν¨

  - `Promise` μΈμ€ν΄μ€λ₯Ό λ°νν¨

- νλΌλ―Έν°

  - μ²« λ²μ§Έ: μ±κ³΅μΌ λ μ€νλ  νΈλ€λ¬ ν¨μ
  - λ λ²μ§Έ: μ€ν¨μΌ λ μ€νλ  νΈλ€λ¬ ν¨μ

- μ€νμμ `resolve(), reject()` μ νλΌλ―Έν° κ°μ λ€μ μμ±νλλΌλ νΈλ€λ¬ ν¨μλ μ²μ νλλ§ μ¬μ© ν¨

  ```tsx
  const obj = new Promise((resolve, reject) => {
    resolve(1, 2, 3);
  });

  obj.then(
    (value) => {
      conosle.log(value);
    },
    (reason) => {
      console.log(reason);
    },
  );

  // 1. resolve(1,2,3); νλΌλ―Έν°μ κ°μ 3κ° μμ±νμ
  // 2. μ€ν¨(reject)κ° λ°μνμ§ μμΌλ©΄ reject()λ₯Ό μμ±νμ§ μμλ λ¨
  // 3. obj.then((value) => {.1.}, (reason) => {.2.}); μ¬μ€ μ€νμμ resolve()λ§ μμΌλ―λ‘ μ²« λ²μ§Έ ν¨μλ§ μμ±ν΄λ λ¨
  // 4. μ€νμμμ resolve()κ° μ€νλλ©΄ then()μ μ²« λ²μ§Έ νλΌλ―Έν° ν¨μκ° μ€νλ¨, μ΄ λ resolve(1,2,3)μμ 1,2,3μ λκ²¨ μ£Όμ§λ§
  // 5. then((value) => {console.log(value)}μ valueμ μ²« λ²μ§Έ κ°μΈ 1λ§ μ€μ λ¨
  // 6. λ€μμ νλΌλ―Έν° κ°μ λκ²¨μ£Όλ €λ©΄ λ°°μ΄, Object λ±μ μ¬μ©ν΄μΌ ν¨

  // [μ€νκ²°κ³Ό]
  // 1
  ```

<br>

## 2. then()μ return

- `then()` μμ `Promise` μΈμ€ν΄μ€λ₯Ό λ°νν¨

  - `return` κ°μ λ°ννμ§ μμ
  - `method chain`μμ `this`λ₯Ό `return` νλ κ²κ³Ό κ°μ κ°λμ
  - λ°λΌμ `then().then()` νν μ²λΌ `then()`μ μ°μν΄μ νΈμΆ ν  μ μμ

- `return` κ°μ `[[PromiseValue]]`μ μ€μ νκ³  `[[PromiseValue]]` κ°μ λ€μ `then()` μ νλΌλ―Έν° κ°μΌλ‘ λκ²¨ μ€

  ```tsx
  const obj = new Promise((resolve, reject) => {
    resolve(100);
  });

  obj
    .then((value) => {
      return value + 50;
    })
    .then((param) => {
      console.log(param);
    });

  // 1. obj.then((value) => {...} value νλΌλ―Έν°μ 100μ΄ μ€μ λ¨
  // 2. return value + 50; 150μ λ°ννμ§ μκ³  μΈμ€ν΄μ€λ₯Ό λ°νν¨, 150μ [[PromiseValue]]μ μ€μ ν¨
  // 3. returnμ μμ±νμ§ μμΌλ©΄ undefinedλ₯Ό [[PromiseValue]]μ μ€μ ν¨
  // 4. then((param) => {console.log(param}); paramμ [[PromiseValue]] κ°μ΄ 150μ΄ μ€μ λ¨

  // [μ€νκ²°κ³Ό]
  // 150
  ```

<br>

## 3. catch()

- μ€ν¨(reject)μ νΈλ€λ¬ ν¨μλ₯Ό μμ±ν¨

  - `then()`μ λ λ²μ§Έ νλΌλ―Έν°λ₯Ό μμ±νμ§ μκ³ 
  - λμ μ `catch(param)`λ₯Ό μμ±ν¨

    ```tsx
    const check = false;
    const obj = new Promise((resolve, reject) => {
      check ? resolve(check) : reject(1, 2, 3);
    });

    obj
      .then((value) => {
        console.log(value);
      })
      .catch((value) => {
        console.log(value);
      });

    // 1. check ? resolve(check) : reject(1,2,3); check κ°μ΄ falseμ΄λ―λ‘ reject()λ₯Ό νΈμΆνκ² λλ©° νλΌλ―Έν° κ°μΌλ‘ 1,2,3μ λκ²¨ μ€
    // 2. catch((value) => {console.log(value)}); then()μ λ λ²μ§Έ νλΌλ―Έν°μ ν¨μλ₯Ό μμ±νμ§ μκ³  λ³λλ‘ catch()λ₯Ό μμ±νμ
    // 3. reject()κ° νΈμΆλλ©΄ catch(value)κ° μ€νλ¨ 1,2,3μ νλΌλ―Έν° κ°μΌλ‘ λκ²¨μ£Όμ§λ§ valueμ μ²« λ²μ§Έ κ°μΈ 1λ§ μ€μ λ¨

    // [μ€νκ²°κ³Ό]
    // 1
    ```

  - `return` λ¬Έμ ννμ νκ° κ²°κ³Όλ₯Ό `[[PromiseValue]]`μ μ€μ ν¨

- `Promise` μΈμ€ν΄μ€λ₯Ό λ°ννλ―λ‘ `catch().then()` μ²λΌ μ΄μ΄μ `then()` μ νΈμΆν  μ μμ
- `[[PromiseValue]]` κ°μ `then()` μ νλΌλ―Έν° κ°μΌλ‘ λκ²¨μ€

  ```tsx
  const obj = new Promise((resolve, reject) => {
    resolve(100);
  });

  obj
    .then((value) => {
      throw 'μλ¬';
    })
    .catch((catch1) => {
      console.log('catch1:' + catch1);
      return 'μ μ';
    })
    .then((param) => {
      console.log('then:' + param);
    })
    .catch((catch2) => {
      console.log('catch2:' + catch2);
    });

  // 1. obj.then((value) => {...} μ€νμμμ resolve(100)μ΄ μ€νλλ―λ‘ then()μ μ²« λ²μ§Έ νλΌλ―Έν° ν¨μκ° νΈμΆλ¨
  // 2. throw "μλ¬" throwλ¬ΈμΌλ‘ μλ¬λ₯Ό λ°μμν΄. λ°λ‘ μλμ catch((catch1) = {})μμ λ°μ, μ΄λ, "μλ¬"λ₯Ό [[PromiseValue]]μ μ€μ ν¨
  // 3. catch((catch1) => {...}); [PromiseValue]]μ "μλ¬"κ° catch1μ μ€μ λ¨
  // 4. return "μ μ"; μλ¬κ° λ°μνμ¬ catch()λ₯Ό μ€ννμ§λ§ catch()μμ μλ¬κ° λ°μνμ§ μμΌλ©΄ λ°λ‘ μλμ then()μ μ€νν¨ "μ μ"μ [[PromiseValue]]μ μ€μ ν¨
  // 5. then((param) => {...}); μ¬κΈ°μ μλ¬κ° λ°μνμ§ μμΌλ―λ‘ μλμ catch()λ₯Ό νΈμΆνμ§ μμ Promise μ²λ¦¬κ° λλ¨
  // 6. catch((catch2) => {...}); μ€ννμ§ μλ κ²μ μ€λͺνκΈ° μν΄ μμ±νμ

  // [μ€νκ²°κ³Ό]
  // catch1: μλ¬
  // then: μ μ
  ```

<br>

## 4. finally()

- μ±κ³΅, μ€ν¨μ κ΄κ³ μμ΄ νλΌλ―Έν°μ νΈλ€λ¬ ν¨μκ° μ€νλ¨

  - νΈλ€λ¬ ν¨μμ νλΌλ―Έν°κ° μμ
  - ES2018λΆν° μ§μν¨

- νμ© μΈ‘λ©΄μ΄μ§λ§ `then(), catch()`μ κ°μ μ½λλ₯Ό `finally()`μ μμ±νλ©΄ μ½λ μ€λ³΅μ νν  μ μμ

  ```tsx
  const obj = new Promise((resovle, reject) => {
    resolve(100);
  });

  obj
    .then((value) => {
      console.log(value);
      return 200;
    })
    .catch((reason) => {
      console.log(reason);
    })
    .finally((param) => {
      console.log('finally:' + param);
    });

  // 1. resolve(100); then()μ νΈλ€λ¬ ν¨μκ° νΈμΆλ¨
  // 2. obj.then((value) => {return 200;}) 200μ [[PromiseValue]]μ μ€μ ν¨ catch()λ₯Ό μ€ννμ§ μκ³  finally()λ₯Ό μ€νν¨
  // 3. finally((param) => {...} λ¬Έλ²μ μΌλ‘ param νλΌλ―Έν°λ₯Ό μ¬μ©νμ§ μμ then()μμ 200μ return νμ§λ§ [[PromiseValue]] κ°μ΄ paramμ μ€μ λμ§ μμ
  // 4. νλΌλ―Έν°λ₯Ό μμ±νλλΌλ μλ¬κ° λμ§ μμ§λ§ undefinedκ° μ€μ λλ―λ‘ μλ―Έκ° μμ

  // [μ€νκ²°κ³Ό]
  // 100
  // finally: undefined
  ```

```toc

```
