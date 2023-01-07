---
emoji: 👨‍💻
title: Rest 파라미터
date: '2021-09-07 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  Rest 파라미터, function spread, Array-like, rest와 arguments 차이

</h1>

<br>

## 1. Function Spread

- 호출하는 함수의 파라미터에 `Spread` 대상 작성
- 처리 순서 및 방법

  - 함수가 호출되면 우선, 파라미터의 배열을 엘리먼트 단위로 전개
  - 전개한 순서대로 파라미터 값으로 넘겨 줌
  - 호출 받는 함수의 파라미터에 순서대로 매핑됨

  ```tsx
  function add(one, two, three) {
    console.log(one + two + three);
  }

  const values = [10, 20, 30];

  add(...values); // 60
  ```

  - `one: 10`, `two: 20`, `three: 30`이 매핑 됨

<br>

## 2. Rest 파라미터

- Syntax: `function(param, paramN, ...name)`
- 분리하여 받은 파라미터를 배열로 결합
  - `Spread` : 분리, `Rest`: 결합
- 작성 방법

  - 호출받은 함수의 파라미터에
  - `...`에 이어서 파라미터 이름 작성
  - 호출한 함수에서 보낸 순서로 매핑

  ```tsx
  function add(...param) {
  	console.log(param);
  	console.log(Array.isArray(param);
  }

  const values = [10, 20, 30];

  add(...values);
  // [10, 20, 30]
  // true
  ```

  - `one: 10`, `two: 20`, `three: 30`이 매핑 됨

  <br>

  - 파라미터와 `Rest` 파라미터 혼합 사용

    ```tsx
    function point(ten, ...rest) {
      console.log(ten);
      console.log(rest);
    }

    const values = [10, 20, 30];

    point(...values);

    // 10
    // [20, 30]
    ```

    1. `ten`에 10이 설정되고
    2. 설정되지 않은 나머지 값 전체가 파라미터 `rest`에 설정됨 그래서 `rest` 파라미터 임
    3. 나머지라는 시맨틱을 나타내기 위해 파라미터 이름을 `rest`로 사용하기도 함

  <br>

## 3. Array-like

- `Object` 타입이지만
  - 배열처럼 이터러블 가능한 오브젝트
  - `for()`문으로 전개할 수 있음
- 작성 방법

  - 프로퍼티 `key` 값을 0부터 1씩 증가하면서 프로퍼티 값을 작성
  - `length`에 전체 프로퍼티 수 작성
  - 이렇게 작성하지 않으면 그냥 `Object`임

  ```tsx
  const values = { 0: '가', 1: '나', 2: '다', length: 3 };

  for (let k = 0; k < values.length; k++) {
    console.log(values[k]);
  }

  // 가
  // 나
  // 다
  ```

  1. `length` 프로퍼티는 전개되지 않음
  2. `for - in` 문으로 전개하면 length 프로퍼티도 전개됨

<br>

## 4. Rest와 Arguments 차이

- `Argument` 오브젝트
  - 파라미터 작성에 관계 없이 전체를 설정
  - `Array-like` 형태, `Array` 메소드를 사용할 수 없음
  - `__proto__`가 `Object`
- `Rest` 파라미터

  - 매핑되지 않은 나머지 파라미터만 설정
  - `Array` 오브젝트 형태, `Array` 메소드를 사용할 수 있음
  - `__proto__`가 `Array`

    ```tsx
    {
      ('use strict');

      // Argument 오브젝트
      function book() {
        const param = arguments;
      }

      // arguments의 __proto__가 Object
      book(10, 20, 30);

      // rest 파라미터
      function point(...rest) {}

      // rest의 __proto__가 Array
      point(10, 20, 30);
    }
    ```

```toc

```
