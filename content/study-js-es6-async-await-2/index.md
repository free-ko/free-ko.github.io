---
emoji: 👨‍💻
title: async/await - 반환, 형태, for-await-of
date: '2021-12-23 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  async/await - 반환, 형태, for-await-of
</h1>

<br>

## 1. await

- Syntax

  - `[value] = awiat` 표현식
  - `async` 함수 안에 작성함
  - `[value]` 는 선택임

- 표현식이 `Promise` 오브젝트 이면 `resolve()`의 파라미터 값을 반환함

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

  // 1. const value = await create(option); 에서 create() 함수를 호출함
  // 2. 호출된 함수에서 Promise 인스턴스를 반환함 따라서 아래 코드로 이동하게 되는데 await로 인해 resolve(param)이 실행되어 param 값을 보낼 때 까지 기다림
  // 3. resolve(param)을 실행함 보낸 값을 받아 value 변수에 할당함
  // 4. conosle.log(value)를 실행함

  // 실행결과
  // {point:100}
  ```

- 표현식이 `Promise` 오브젝트가 아니면 표현식의 평가 결과를 반환함

  ```tsx
  async function getPoint(option) {
    const value = (await option.point) + 200;
    console.log(value);
  }

  getPoint({ point: 100 });

  // 1. const value = await option.point + 200; option은 파라미터 값으로 {point: 100}임 await 표현식이 Promise 오브젝트가 아님
  // 2. 이때에는 표현식의 평가 결과를 반환함
  // 3. await가 비동기 환경에서 동기 처리를 위한 것이므로 표현식이 비동기 처리가 아니면 의미가 약함

  // 실행결과
  // 300
  ```

- `Promise` 에서 `reject()` 가 발생했을 때 에러에 대처하는 형태임

  - `try-catch` 를 사용한 형태

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

    // 1. reject(param); Promise에서 reject()가 실행되면
    // 2. catch(error) 블록에서 받음 reject(param)의 param이 catch(error)의 error에 설정됨
    // 3. try-catch로 에러 발생에 대응할 수 있음

    // 실행결과
    // {point:100}
    ```

  - `catch()` 를 사용한 형태

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

    // 1. reject(param); reject() 처리이므로 catch()가 실행됨
    // 2. catch((value) => {...} reject(param)의 param 값이 value에 설정됨
    // 3. return 300; 300이 반환되지 않고 Promise 인스턴스를 반환하므로 아래의 then()이 호출됨
    // 4. then((param) => {...} catch()에서 return 300은 정상 처리이므로 첫 번째 파라미터 함수가 실행되며 param에 300이 설정됨

    // 실행결과
    // 300
    ```

  - `Promise` 가 아닌 값을 반환하는 형태

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

    // 1. 앞은 catch().then() 형태이지만 여기는 catch()가 끝임
    // 2. return 300; catch()에 then()이 연결되어 있으면 Promise 인스턴스를 반환하지만 then() 연결이 없으면 300을 반환함
    // 3. console.log(value) 300을 반환하므로 300이 출력됨

    // 실행결과
    // 300
    ```

<br>

## 2. for-await-of

- Syntax
  - `for await (variable of iterable) {...}`
  - `async` 함수에서 사용할 수 있음
- 동기 반복에서 사용할 수 있지만

  ```tsx
  const list = [10, 20];

  async function show() {
    for await (const value of list) {
      console.log(value);
    }
  }

  show();

  // 1. for await (variable of iterable) {...} iterable에 이터러블 오브젝트를 작성함 [10,20]은 이터러블 오브젝트 임 variable에 const/let/var 변수를 작성함
  // 2. for await (const value of list) {...} [10,20]의 엘리먼트를 하나씩 반복하면서 값을 value에 설정하고 console.log(value)로 값을 출력함
  // 3. 배열에서 Promise 인스턴스를 반환하지 않으므로 이것은 비동기 반복이 아니라 동기 반복

  // 실행결과
  // 10
  // 20
  ```

- 일반적으로 비동기 반복에서 사용

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

  // 1. for await (const value of point()){...} point() 제너레이터 함수를 호출하면 Proimse 인스턴스를 반환하므로 비오디로 반복하게 됨

  // 실행결과
  // 10
  // 20
  ```

```toc

```
