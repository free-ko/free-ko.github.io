---
emoji: 👨‍💻
title: Promise - 인스턴스 생성
date: '2021-12-16 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  Promise 인스턴스 생성
</h1>

<br>

## 1. new Promise()

- `Promise` 인스턴스를 생성하여 반환함
- 파라미터 실행자`(excuter)` 함수를 작성함

  - 성공, 실패 처리 함수 이름
  - 실행자 코드

    ```tsx
    const obj = new Promise((resolve, reject) => {
      resolve('성공');
      reject('실팽');
    });

    obj.then(
      (value) => {
        console.log(value);
      },
      (reason) => {
        console.log(reason);
      },
    );

    console.log('끝');

    // 1. const obj = new Promise((resolve, reject) => {...} Promise 인스턴스를 생성하여 obj에 할당함
    // 2. resolve와 reject 이름의 Function 오브젝트를 생성하여 인스턴스에 설정함
    // 3. resolve("성공"); reject("실팽"); 실행자 처리를 성공하면 resolve()가 호출되고 실패하면 reject()가 호출됨
    // 4. 지금 호출하지 않고 코드 끝까지 실행한 후 호출함
    // 5. 이것이 Promise의 비동기 처리(실행) 임
    // 6. obj.then((value) => {.1.}, (reason) => {.2.}): then()을 실행하지 않음 아래로 내려 감
    // 7. console.log("끝")을 실행함 여기서 전체 흐름이 끝나지만 실행자의 resolve()와 reject() 실행이 남았음
    // 8. 실행자에서 resolve("성공") 또는 reject("실패")를 호출함 상태가 하나만 발생하므로 상태에 해당하는 함수만 호출함 여기서는 resolve("성공")을 호출함
    // 9. then()을 호출함 then() 단위로 파라미터의 함수를 실행하게 됨
    // 10. then((value) => {console.log(value)}, 실행자에서 resolve("성공")에서 "성공"이 value에 설정됨
    // 11. 엔진에서는 상태(fulfilled, rejected)에 따라 파라미터의 핸들러 함수를 실행함
    // 12. then((reason) => { console.log(reason)}; 실행자에서 reject("실패")를 호출하면 then()의 두 번째 파라미터 함수가 실행되며 reject("실패")에서 "실패"가 reason에 설정됨

    // [ 실행결과 ]
    // 끝
    // 성공
    ```

- 스펙 : `deferred action`
  - MDN: Promise chain
  - `obj.then((value) ⇒ {console.log(value)}, (reson) ⇒ {console.log(reson)};`
- Promise 오브젝트 형태

  ```tsx
  const promise = Promise;
  /*
  	1. Promise 오브젝트 형태를 살펴봄

  	2. promise를 펼치면 프로퍼티와 함수가 있음

  	3. prototype에 constructor가 있으며 메소드가 있음
  		- JS의 일반적인 형태
  */

  cosnt ojb = new Promise((resolve, reject)) => {
  	resolve([1,2,3]);
  	reject("실패");
  	console.log("실행자");
  });

  /*
  	1. resolve와 reject 이름의 Function 오브젝트를 생성함
  		- Function 오브젝트이므로 호출할 수 있음

  	*** 코드가 끝까지 처리한 후 실행함 ***
  	resolve([1,2,3])을 호출하며 then()이 호출됨
  		- [[PromiseStatus]]: "resolved" 이므로 then()의 첫 번째 파라미터 함수르 실행하게 됨
  */

  /*
  	2. obj.__proto__를 펼치면 Promise.prototype에 연결된 메소드가 표시됨

  	3. [[PromiseStatus]]: "resolved" Promise 상태를 나타내며 "fulfilled" 상태를 뜻함

  	4. [[PromiseValue]]: Array(3) resolve([1,2,3])의 파라미터에 작성한 값
  */

  obj.then((value) => {
  	console.log(value);  // resolve([1,2,3])의 [1,2,3]이 value에 설정됨
  }),
  (reason) => {
  	console.log(reason);
  });
  // then()의 파라미터에 성공, 실패 핸들러 함수를 작성함

  console.log("끝");
  ```

```toc

```
