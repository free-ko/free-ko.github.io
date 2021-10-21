---
emoji: 👨‍💻
title: Symbol.toStringTag
date: '2021-10-22 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  Symbol.toStringTag
</h1>

<br>

## toStringTag

- `Object.prototype.toString()` 의 확장
- `toString()` 으로 인스턴스 타입을 구하면 `[object Obect]` 형태로 반환

  - 인스턴스 타입을 명확하게 구할 수 없음

  ```tsx
  const Book = function () {};
  const obj = new Book();

  console.log(obj.toString()); // [object Object]
  console.log({}.toString()); // [object Object]
  ```

<br>

- `Symbol.toStringTag` 로 구분 가능
  - `[object Object]` 에서 두 번째에 표시될 문자열을 작성
  - 예: "ABC"지정, [object "ABC"]로 반환
- `prototype`에 연결하여 작성

  ```tsx
  const Sports = function () {};
  const obj = new Sports();
  console.log(obj.toString()); // [object Object]

  Sports.prtototype[Symbol.toString] = '농구';
  console.log(obj.toString()); // [object 농구]

  /* 
  1. 첫 번째의 obj.toString() 을 실행하면
     - 인스턴스 타입을 반환하며
     - [object Object] 가 반환됨
     - function 으로 만들었는데 Object 가 반환됨
  2. Sports.prtototype[Symbol.toString] = "농구";
     - prototype에 Symbol.toStringTag 를 연결하고
     - [object Object] 에 표시될 문자를 "농구"로 작성했음
     - 표시될 문자를 임의로 작성할 수 있음
     - function 마다 지정할 수 있으므로 자세하게 구분하여 작성할 수 있음
  3. 두 번째의 obj.toString()을 호출 하며
     - [object 농구] 를 출력함
     - 즉, Symbol.toStringTag 에 작성한 문자가 출력 됨
  */
  ```

```toc

```
