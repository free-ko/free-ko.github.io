---
emoji: 👨‍💻
title: 이터레이터 오브젝트, 프로토콜
date: '2021-09-05 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 이터레이터 오브젝트, 이터레이터 프로토콜
</h1>

<br>

## 1. 이터레이터 프로토콜

- 이터레이터(iterator) 프로토콜
  - 값을 순서대로 생성하는 방법(규약)
- 이터레이터 오브젝트

  - `Symbol.iterator()`를 호출하면
  - 이터레이터 오브젝트를 생성하여 반환
  - 이터레이터 오브젝트에 `next()`가 있음
  - 생성한 오브젝트를 이터레이터라고 부름

  ```tsx
  const list = [10, 20];

  const obj = list[Symbol.iterator]();

  console.log(obj.next());
  console.log(obj.next());
  console.log(obj.next());

  // {value: 10, done: false}
  // {value: 20, done: false}
  // {value: undefined, done: true}
  ```

  1. 이터레이터 오브젝트의 `next()`를 호출하면 이터레이터를 호출한다고도 함
  2. `{value: 10, done: false}` 를 반환함, `value는 [10, 20]`에서 첫 번째 값이고 `done: false`는 이터레이터 상태 임
  3. 두 번째 `next()` 호출
  4. `{value: 20, done: false}` 를 반환함, `value는 [10, 20]`에서 두 번째 값이고 `done: false`는 이터레이터 상태 임
  5. 세 번째 `next()` 호출
  6. `{value: undefined, done: true}` 반환, `undefined`는 처리할 값이 없다는 것을 뜻하며 `done: true`는 이터레이터의 종료를 뜻함

  <br>

- 이터레이터 오브젝트 구조

  ```tsx
  {
    ('use strict');

    const list = [1, 2];

    /*
  		1. list.__proto__를 펼치면 Symbol(Symbol.iterator)가 있으므로 
  			- 이터레이터 오브젝트를 만들 수 있음
  	*/

    const obj = list[Symbol.iterator]();

    /*
  		1. 위 형태로 호출하면 이터레이터 오브젝트를 생성하여 반환 함
  	
  		2. obj.__proto__를 펼치면 next()가 있음
  			- next()가 있으므로 obj는 이터레이터 오브젝트임
  	*/
  }
  ```

```toc

```
