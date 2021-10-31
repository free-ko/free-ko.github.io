---
emoji: 👨‍💻
title: Map 오브젝트 형태, new Map()
date: '2021-11-01 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  Map 오브젝트 형태, new Map()
</h1>

## 1. Map 오브젝트

- Map 오브젝트 `key`와 `value`의 컬렉션
- Map 오브젝트 형태

  - `[key, value]` 형태처럼
  - 대괄호 안에 `key`와 `value`를 작성

    ```tsx
    const obj = new Map([
      ['key', 'value'],
      [{ book: 200 }, '오브젝트'],
      [100, 'Number'],
    ]);

    for (let keyValue of obj) {
      console.log(keyValue);
    }

    // 실행 결과
    // [key, value]
    // [{book: 200}, 오브젝트]
    // [100, Number]
    ```

  - 다양한 타입을 `key`로 사용할 수 있음

- Map의 key 처리
  - `for-of` 문에서 작성한 순서대로 읽혀짐

<br>

## 2. new Map()

- Map 인스턴스를 생성하여 반환

  - 파라미터에 이터러블 오브젝트 작성

    ```tsx
    const obj = new Map([
      ['key', 'value'],
      [100, 'Number'],
    ]);

    console.log(obj); // {}
    console.log(typeof obj); // object

    // 1. 파라미터를 배열 안에 배열로 작성함 대괄호 []가 2개임
    // 2. 100이 key이고 "Number"가 Value임
    // 3. new 연산자를 사용하지 않으면 TypeError
    // 4. 파라미터를 작성하지 않아도 됨
    // 5. 인스턴스를 생성하므로 타입은 object
    ```

  - Same-Value-Zero 비교 알고리즘

    - key 값을 비교

      ```tsx
      const obj = new Map([
        [100, 'Number'],
        ['100', 'String'],
      ]);

      for (let [key, value] of obj) {
        console.log(`${key} : ${value}`);
      }

      // 1. 100과 '100'은 타입이 다름

      // 실행 결과
      // 100 : Number
      // 100 : String
      ```

    - key 값이 같으면 Value가 대체됨

      ```tsx
      const obj = new Map([
        [100, '첫 번째'],
        ['100', '두 번째'],
      ]);

      for (let [key, value] of obj) {
        console.log(`${key} : ${value}`);
      }

      // 1. key 값이 타입까지 같으면 value가 대체됨

      // 실행 결과
      // 100 : 두 번째
      ```

  - 잘못 작성한 형태

    ```tsx
    try {
      new Map(['one', 1]);
    } catch {
      console.og('[[one, 1]]');
    }

    const obj = new Map([{ five: 5 }]);

    for (let [key, value] of obj) {
      console.log(`${key} : ${value}`);
    }

    // 1. new Map(["one", 1]) 대괄호 2개를 작성해야 함
    // 2. new Map([{five: 5}]) key만 작성하면, 에러가 발생하지 않지만 key와 value에 undefined가 설정됨

    // 실행결과
    // [[one, 1]]
    // undefined : undefined
    ```

```toc

```
