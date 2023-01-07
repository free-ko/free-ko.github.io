---
emoji: 👨‍💻
title: Symbol 사용 형태
date: '2021-10-20 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  Symbol 사용 형태
</h1>

<br>

## Symbol 사용 형태

- `Object` 프로퍼티 키로 사용

  - `Symbol` 값이 유일하므로 중복되지 않음
  - `symbol-keyed property` 라고 부름

    ```tsx
    const sym = Symbol('설명');
    const obj = { [sym]: 100 };

    // 1. const obj = {[sym]j: 100};
    // 2. Symbol 값을 Object의 프로퍼티 키로 사용했음
    // 3. [sym]처럼 대괄호 안에 Symbol()로 할당한 변수 이름을 작성 함
    // 4. 이를 symbol-keyed property라고 부름
    ```

  - 프로퍼티 값 추출 방법

    ```tsx
    const sym = Symbol('설명');
    const obj = { [sym]: 100 };

    console.log(obj[sym]); // 100
    console.log(obj.sym); // undefined

    // 1. obj[sym] Symbol() 결과를 할당한 sym을 프로퍼티 키로 사용하여 값을 구함
    // 2. 프로퍼티 값인 100이 출력 됨
    // 3. obj.sym undefined가 출력되며 obj[sym] 형태를 사용해야 함
    ```

- `Object` 에서 함수 이름으로 사용

  ```tsx
  const sym = Symbol('함수 이름');
  const obj = {
    [sym](param) {
      return apram;
    },
  };

  console.log(obj[sym](200)); // 200

  // 1. [sym](param){} 형태로 함수를 정의하고
  // 2. obj[sym](200) 형태로 호출함
  ```

- `for-in` 문에서 사용

  - `Symbol`이 열거되지 않음
  - `[[Enumerable]]: false` 이기 때문

    ```tsx
    const obj = {
      [Symbol('100')]: 100,
      two: 200,
    };

    for (let key in obj) {
      console.log(key);
    }

    // 1. Object에 Symbol-keyed 프로퍼티를 사용하여 프로퍼티 값을 작성했음
    // 2. for-in 문으로 열거되지 않음, 에러가 나지 않음
    // 실행 결과
    // two
    ```

- `Object.getOwnPropertySymbols()`로 열거 가능
- `for-of` 문에서 사용

  - 배열 안에 `Symbol()` 작성

    ```tsx
    const list = [Symbol('100')];
    for (let value of list) {
      console.log(value);
    }

    // 실행결과
    Symbol(100);
    ```

- `JSON.stringify()` 에서 사용

  - `Symbol` 값이 문자열로 변환되지 않음

    ```tsx
    const sym = Symbol('JSON');
    const result = JSON.stringify({ [sym]: 'ABC' });

    console.log(result); // {}

    // 1. JSON.stringify()는 Object의 프로퍼티 키와 값을 {"key": "value"} 형태로 변환 함
    // 2. Symbol은 변환에서 제외 됨
    // 3. 이것은 Symbol 값을 외부에 노출하지 않기 위해서 임
    // 4. 빈 오브젝트가 반환됨
    ```

```toc

```
