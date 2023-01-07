---
emoji: 👨‍💻
title: Promise - resolve(), thenable, reject()
date: '2021-12-18 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  Promise -  resolve(), thenable, reject()
</h1>

<br>

## 1. resolve()

- 성공(fullfilled) 상태의 `Promise` 인스턴스를 생성하여 반환

  - `Promise.resolve()` 형태로 작성함
  - 파라미터 값에 따라 생성 방법이 다름

- 파라미터에 값을 작성하면 파라미터 값으로 `Promise` 인스턴스를 생성하여 반환

  ```tsx
  const obj = Promise.resolve(['sports', 'music']);

  obj.then((value) => {
    console.log(value);
  });

  console.log('끝');

  // 1. resolve() 파라미터에 값을 작성했음, 값을 하나만 작성할 수 있으므로 다수를 작성하려면 Array, Object 등을 사용해야 함
  // 2. new 연산자를 사용하지 않지만 Promise 인스턴스를 생성하여 반환함, 성공(fulfilled) 상태로 설정함
  // 3. 성공 상태이므로 then()의 첫 번째 파라미터 함수가 호출됨

  // [실행결과]
  // 끝
  // ["sports", "music"]
  ```

- 파라미터에 `Promise` 인스턴스를 작성하면 파라미터의 `Promise` 인스턴스의 값을 사용하여 `Promise` 인스턴스를 생성하여 반환

  ```tsx
  const obj = Promise.resolve(['sports', 'music']);

  Promise.resolve(obj).then((param) => {
    console.log(param);
  });

  // 1. Promise.resolve(obj) resolve() 파라미터에 Promise 인스턴스를 작성했음
  // 2. Promise 인스턴스를 생성하여 반환함 성공 상태로 설정함
  // 3. then((param) => {console.log(param)}; obj 인스턴스의 resolve() 파라미터 값이 param에 설정됨

  // [실행결과]
  // ["sports", "music"]
  ```

<br>

## 2. thenable

- `Promise.resolve()` 파라미터에 `then()`을 작성한 형태

  ```tsx
  const obj = Promise.resolve({
    then(resolve, reject) {
      resolve([1, 2]);
    },
  });

  obj.then((value) => {
    console.log(value);
  });

  console.log('끝');

  // 1. const obj = Promise.resolve({...}); resolve() 파라미터에 then(){...}을 작성했음, Promise 인스턴스를 생성하여 반환함, then()을 실행하지 않고 아래로 이동
  // 2. obj.then((value) => {console.log(value)}); then()을 실행하지 않음
  // 3. console.log("끝")을 실행함
  // 4. 이어서 Promise.resolve()의 then()을 실행함
  // 5. then(resolve, reject){ resolve([1,2])}); resolve([1,2])를 호출하며 아래 then()의 첫 번째 파라미터 함수가 실행됨
  // 6. obj.then((value) => {console.log(value)}); resolve([1,2])의 [1,2]가 value에 설정됨

  // 실행결과
  // 끝
  // [1,2]
  ```

<br>

## 3.reject()

- 실패(reject) 상태의 Promise 인스턴스를 생성하여 반환함

  - `Promise.reject()` 형태로 작성함

- 파라미터에 `reject` 사유를 작성함

- `then()` 을 연결한 형태

  ```tsx
  const obj = Promise.reject('실패');

  obj.then(
    (value) => console.log(value),
    (value) => console.log(value),
  );

  // 1. const obj = Promise.reject("실패"); new 연산자를 사용하지 않지만 Promise 인스턴스를 생성하여 반환함, 실패(reject) 상태로 설정함
  // 2. 실패 상태이므로 then()의 두 번째 파라미터 함수가 호출됨
  // 3. obj.then( , (value) => console.log(value)}); Promise.reject("실패")에서 "실패"가 value에 설정됨

  // 실행결과
  // 실패
  ```

- `catch()` 를 연결한 형태

  ```tsx
  const obj = new Error('에러 발생');

  Promise.reject(obj).catch((error) => console.log(error.message));

  console.log('끝');

  // 1. const obj = new Error("에러 발생"); Error 인스턴스를 생성함
  // 2. Promise.reject(obj) obj 인스턴스를 사용하여 Promise 인스턴스를 생성함, reject()를 실행하지 않음
  // 3. console.log("끝")을 실행함
  // 4. Promise.reject(obj)를 실행하며 catch()가 호출됨
  // 5. catch((error) => console.log(error.message)); obj 인스턴스가 error에 설정됨

  // 실행결과
  // 끝
  // 에러 발생
  ```

```toc

```
