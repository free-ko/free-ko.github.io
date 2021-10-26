---
emoji: 👨‍💻
title: Symbol.iterator, Array.prototype[@@iterator], Object 이터레이션
date: '2021-10-27 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  Symbol.iterator, Array.prototype[@@iterator], Object 이터레이션
</h1>

<br>

## 1. iterator

- `@@iterator`가 있는 빌트인 오브젝트

  - String, Array, Map, Set, TypedArray

- 빌트인 Object에는 `@@iterator`가 없지만 개발자 코드로 작성할 수 있음

<br>

## 2. Array.prototype[@@iterator]

- `Array` 오브젝트의 `[Symbol.iterator]()`를 호출하면

  - 이터레이터 오브젝트 반환

    ```tsx
    const list = [10, 20];
    const obj = list[Symbol.iterator]();

    console.log(obj.next()); // {value: 10, done: false}
    console.log(obj.next()); // {value: 20, done: false}
    console.log(obj.next()); // {value: undefined, done: true}
    ```

  - `next()` 로 배열 엘리먼트 값을 하나씩 구할 수 있음

<br>

## 3. String.prototype[@@iterator]

- `String` 오브젝트의 `[Symbol.iterator]()`를 호출하면

  - 이터레이터 오브젝트 반환

    ```tsx
    const list = '1A';
    const obj = list[Symbol.iterator]();

    console.log(obj.next()); // {value: 1, done: false}
    console.log(obj.next()); // {value: A, done: false}
    console.log(obj.next()); // {value: undefined, done: true}
    ```

  - `next()` 로 문자열에서 문자를 하나씩 구할 수 있음

 <br>

## 4. Object 이터레이션

- 빌트인 `Object` 에는 `Symbol.iterator` 가 없음

  - `Symbol.iterator` 가 반복을 처리하므로
  - `Object에 Symbol.iterator` 를 작성하면 반복할 수 있음

    ```tsx
    const obj = {
      [Symbol.iterator]() {
        return {
          count: 0,
          maxCount: this.maxCount,
          next() {
            if (this.count < this.maxCount) {
              return { value: this.count++, done: false };
            }
            return { value: undefined, done: true };
          },
        };
      },
    };

    obj.maxCount = 2;
    for (const value of obj) {
      console.log(value);
    }

    // 실행결과
    // 0
    // 1
    ```

- 엔진이 `for-of` 문을 시작하면
  - 먼저 `obj`에서 `[Symbol.iterator]` 검색, 이를 위해 obj에 `[Symbol.iterator]` 작성
- `for(const result of obj)` 를 처음 실행할 때
  - `obj` 의 `[Symbol.iterator]()` 가 호출되면 `return{}` 문을 수행
  - `obj.maxCount = 2;` 로 반복 횟수 정의

```toc

```
