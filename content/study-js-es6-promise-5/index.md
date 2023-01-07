---
emoji: 👨‍💻
title: Promise - all(), race()
date: '2021-12-20 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  Promise -  all(), race()
</h1>

<br>

## 1. all()

- 파라미터의 모든 `Promise` 처리를 완료했을 때

  - `then()` 의 핸들러 함수를 실행함
  - `Promise.all()` 형태로 작성

- 파라미터를 이터러블로 작성함

  - 작성한 순서로 `Promise` 인스턴스 생성

  ```tsx
  function order(delay) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('실행자:', delay);
        resolve(delay);
      }, delay);
    });
  }

  Promise.all([order(500), order(300), order(100)]).then((param) => console.log('then:' + param));

  // 1. Promise.all([order(500), order(300), order(100)]) all() 파라미터를 이터러블로 작성했음, 파라미터에 작성한 순서로 order() 함수를 호출하며 Promise 인스턴스를 생성하여 반환함
  // 2. setTimeout(() => {...}, delay) setTimeout()의 두 번째 파라미터 delay는 지연 시간으로 값의 단위는 밀리초임
  // 3. 따라서, setTimeout()의 지연 시간이 짧은 순서인 100, 300, 500 순서로 resolve(dealy)를 실행하지만 실행할 때마다 아래의 then()을 호출하지 않고 3개를 모두 실행한 후에 then()을 한번만 호출함
  // 4. 이것이 all() 함수의 특징임
  // 5. then((param) => consoel.log("then:" + param)); 'then'처럼 resolve(dealy)의 파라미터 값을 배열로 만들어 param 파라미터에 설정함
  // 6. 이때, resolve(delay)가 실행된 순서가 아니라 all()의 파라미터에 작성한 순서로 값을 설정함
  // 7. resolve() 실행 순서는 100, 300 500이지만 결과는 500, 300, 100이 출력됨

  // [실행결과]
  // 실행자: 100
  // 실행자: 300
  // 실행자: 500
  // then: 500, 300, 100실행자에서 실패가 발생했을 때
  ```

- `reject()` 가 발생한 시점에 `then()`을 실행
  ```tsx
  function order(delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(delay);
        dealy === 300 ? reject(dealy) : resolve(delay);
      }, delay);
    });
  }

  Promise.all([order(500), order(100), order(300)]).then(
    (param) => console.log('성공:' + param),
    (param) => console.log('실패:' + param),
  );

  // 1. reject()가 있으며 reject()가 발생하면 처리가 앞 코드와 다름
  // 2. delay === 300 ? reject(delay) : resolve(delay); 설명을 위해 order(300)일 때 reject(delay)가 실행되도록 했음
  // 3. 처음 resolve(100)이 실행되며 100이 출력됨
  // 4. 이어서 reject(300)이 실행되며 300이 출력됨
  // 5. 또한 then()의 두 번째 파라미터 함수가 호출되어 "실패:300"이 출력됨 reject()가 발생했을 때 전체가 끝나지 않음
  // 6. resolve(500)이 실행되며 500이 출력됨
  // 7. 앞 코드에서는 3개 모두가 끝나면 all() 파라미터에 작성한 순서로 값을 출력했는데 여기서는 출력하지 않음
  // 8. all()은 이렇게 하나라도 reject()가 발생하면 then()의 첫 번째 파라미터 함수를 실행하지 않음
  // 9. 이것이 all()의 또 하나의 특징

  // [실행결과]
  // 100
  // 300
  // 실패: 300
  // 500
  ```

<br>

## 2. race()

- `resolve(), reject()` 에 관계없이 처음 한 번만 `then()` 을 실행하고 더 이상 실행하지 않음
  ```tsx
  function order(delay) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(delay);
        resolve(delay);
      }, delay);
    });
  }

  Promise.race([order(500), order(100), order(300)]).then((param) => console.log('then:' + param));

  // 1. Promise.race([order(500), order(100), order(300)]) race()의 파라미터 순서로 order()를 호출함
  // 2. 그러면 결과는 100,300,500 순서로 resolve(delay)가 실행됨
  // 3. 그런데 order(100)일 때, 처음 한 번만 then()의 핸들러 함수를 실행하고 다음은 실행하지 않음 그래서 "then:100"만 출력됨
  // 4. 이것이 race()의 특징

  // 실행결과
  // 100
  // then: 100
  // 300
  // 500
  ```

```toc

```
