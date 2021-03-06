---
emoji: π¨βπ»
title: async/await - κ°μ, ν¨μ
date: '2021-12-22 00:00:00'
author: μ°κΈ°
tags: λΈλ‘κ·Έ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  π  async/await - κ°μ, ν¨μ
</h1>

<br>

## 1. async/await κ°μ

- λΉλκΈ° νκ²½μμ μ€ννμ§λ§ μ€νμ΄ λλμΌ λ€μμ μ€νν¨

  - μ¦, μ€νμ λΉλκΈ°μ΄κ³  μ€ν μμλ λκΈ° μ

    ```tsx
    function create(param) {
      return new Promise((resolve) => {
        resolve(param);
      });
    }

    async function getPoint(option) {
      const value = await create(option);
      console.log(vaule);
    }

    getPoint({ point: 100 });

    // 1. async function getPoint(option){...} λΉλκΈ° ν¨μλ‘ μ μΈν¨
    // 2. const value = await create(option); create() ν¨μλ₯Ό νΈμΆν¨
    // 3. νΈμΆλ ν¨μμμ Promise μΈμ€ν΄μ€λ₯Ό λ°νν¨ λ°λΌμ λΉλκΈ° μ²λ¦¬λ₯Ό νκ² λ¨ μ¦, resolve()κ° μ€νλκΈ° μ μ μλ μ½λλ₯Ό μ€νν¨
    // 4. ννΈ, awaitλ μλλ‘ λ΄λ €κ°μ§ μκ³  resolve()κ° λλλ κ²μ κΈ°λ€λ¦Ό
    // 5. resolve(param)κ° μ€νλλ©΄ param κ°μ create()λ‘ λ³΄λ΄λ©° μ΄ κ°μ λ°μ value λ³μμ ν λΉν¨
    // 6. μ΄μ΄μ console.log(value)λ₯Ό μ€νν¨

    // μ€νκ²°κ³Ό
    // {point: 100}
    ```

- `async` ν€μλκ° μλλ©° `"async function"` μ΄ ν€μλ κ°λμ΄λ©°
- `async` ν¨μλΌκ³  λΆλ¦
- `await` λ ν€μλ(ν€μλ λλ¦λλ‘ κΈ°λ₯μ κ°μ§κ³  μμ)

<br>

## 2. async ν¨μ

- λΉλκΈ° ν¨μλ₯Ό λ»νλ©° `AsyncFunction` μ€λΈμ νΈλ₯Ό μμ±νμ¬ λ°νν¨

  ```tsx
  async function sports() {
    return 'μΆκ΅¬';
  }

  console.log(Object.prototype.toString.call(sports));

  // 1. async function sports(){...} μμ§μ΄ async ν¨μλ₯Ό λ§λλ©΄ AsyncFunction μ€λΈμ νΈλ‘ μμ±ν¨
  // 2. ν¨μ ννμμΌλ‘ μμ±ν  μλ μμ const sport = async function(){...}
  // 3. Object.prototype.toString.call(sports) toString()μ callνλ©΄ Symbol.toStringTag()κ° μ€νλλ©° μ€λΈμ νΈλ₯Ό μ€λͺνλ λν΄νΈ λ¬Έμμ΄μ λ°νν¨
  // 4. [object AsyncFunction]μ΄ μΆλ ₯λ¨ μ¦, sportsλ AsyncFunction μ€λΈμ νΈμ
  // 5. AsyncFunction μ€λΈμ νΈλ μμ²΄μ Symbol.toStringTagλ§ μμΌλ©΄ λΉνΈμΈ Function μ€λΈμ νΈλ₯Ό μμλ°μ λ°λΌμ νΈμΆν  μ μμ

  // μ€νκ²°κ³Ό
  // [object AsyncFunction]
  ```

- `async` ν¨μκ° νΈμΆλλ©° `Promise` μΈμ€ν΄μ€λ₯Ό λ°νν¨

  ```tsx
  async function sports() {
    return 'μΆκ΅¬';
  }

  const obj = sports();

  console.log(obj instanceof Promise);

  // 1. const obj = sports(); async ν¨μλ₯Ό νΈμΆνλ©΄ "μΆκ΅¬"λ₯Ό λ°ννμ§ μκ³  Promise μΈμ€ν΄μ€λ₯Ό λ°νν¨
  // 2. console.log(obj instanceof Promise); trueκ° μΆλ ₯λλ©΄, Promise μΈμ€ν΄μ€λ₯Ό λ»ν¨ κ·Έλμ λΉλκΈ° νκ²½μμ μ€νλ¨

  // μ€ννκ²½
  // true
  ```

- `async` ν¨μμ `return` κ°μ μ²λ¦¬νλ €λ©΄ `then()` μ ν¨μ νΈμΆμ μ°κ²°νμ¬ μμ±

  ```tsx
  async function sports() {
    return 'μΆκ΅¬';
  }

  sports().then((res) => console.log(res));

  console.log('μ¬κΈ° λ¨Όμ ');

  // 1. sports()λ₯Ό νΈμΆνλ©΄ Promise μΈμ€ν΄μ€λ₯Ό λ°ννλ―λ‘ then()μ μ°κ²°νμ¬ μ¬μ©ν  μ μμ
  // 2. then()μ μ€ννμ§ μκ³  μλμ console.log("μ¬κΈ° λ¨Όμ ")λ₯Ό λ¨Όμ  μ€νν¨
  // 3. return "μΆκ΅¬"; resolve()λ₯Ό μμ±νμ§ μμμ§λ§ returnλ¬Έμ ννμ νκ° κ²°κ³Όλ₯Ό resolve()μ νλΌλ―Έν° κ°μΌλ‘ μ¬μ©νμ¬ then()μ μ²« λ²μ§Έ νλΌλ―Έν° ν¨μλ₯Ό νΈμΆν¨
  // 4. then((res) => console.log(res)); return λ¬Έμ ννμ νκ° κ²°κ³Όκ° then()μ μ²« λ²μ§Έ νλΌλ―Έν° ν¨μμ res νλΌλ―Έν°μ μ€μ λ¨

  // μ€νκ²°κ³Ό
  // μ¬κΈ° λ¨Όμ 
  // μΆκ΅¬
  ```

- `async` ν¨μμμ `throw` κ° λ°μνλ©΄ `reject()` λ‘ μ²λ¦¬ λ¨

  ```tsx
  async function sports() {
    throw 'μλ¬';
  }

  sports().then(
    () => 0,
    (rej) => console.log(rej),
  );

  // 1. async ν¨μμμ throwκ° λ°μνλ©΄ reject()λ‘ μ²λ¦¬λλ©° ννμμ νκ° κ²°κ³Όλ₯Ό νλΌλ―Έν° κ°μΌλ‘ μ¬μ©ν¨
  // 2. then()μ λ λ²μ§Έ νλΌλ―Έν° ν¨μκ° νΈμΆλλ©° ννμμ νκ° κ²°κ³Όκ° rejμ μ€μ λ¨

  // μ€νκ²°κ³Ό
  // μλ¬
  ```

```toc

```
