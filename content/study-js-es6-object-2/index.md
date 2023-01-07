---
emoji: 👨‍💻
title: 오브젝트 복사 - assign()
date: '2021-09-23 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  오브젝트 복사: assign(), 첫 번째 파라미터 작성, 두 번째 파라미터 작성
</h1>

<br>

## 1. assgin()

- 두 번째 파라미터의 오브젝트 프로터피를

  - 첫 번째 파라미터의 오브젝트에 복사하고 첫 번째를 반환
  - `own property`만 복사

  ```tsx
  const sports = {
    event: '축구',
    player: 11,
  };

  let dup = {};

  Object.assign(dup, sports);

  console.log(dup); // {event: 축구, player: 11}
  ```

<br>

## 2. 첫 번째 파라미터 작성

```tsx
try {
  const obj = Object.assign(null, {});
} catch (e) {
  console.log('null 작성 불가');
}
```

1. 첫 번째 파라미터를 작성하지 않거나 `null`, `undefined`를 작성하면 `TypeError`

- `Number`, `String`, `Symbol`, `Boolean` 값 작성

```tsx
const obj = Object.assign(100);

console.log(obj.valueOf()); // 100
```

1. 첫 번째 파라미터에 `Number` 를 작성하고 두 번째 파라미터를 작성하지 않음
2. `Number` 인스턴스를 생성하여 파라미터 값 100을 `[[PrimitiveValue]]`에 설정 함
3. 생성한 인스턴스를 반환함
4. `Boolean`, `String`, `Symbol`도 같은 방법으로 처리

<br>

## 3. 두 번째 파라미터 작성

- 열러 가능 오브젝트 작성

  ```tsx
  let obj = {};
  Object.assign(obj, { ten: 10 });

  console.log(obj); // {ten: 10}

  const one = Object.create(
    {},
    {
      book: { value: 100, enumerable: false },
      sports: { value: 200, enumerable: true },
    },
  );

  Object.assign(obj, one);

  console.log(obj); // {ten: 10, sports: 200}
  ```

- 오브젝트 다수 작성

  ```tsx
  const book = { title: '책' };
  const sports = { item: '축구' };

  const obje = Object.assign({}, book, sports);

  console.log(obj); // {title: 책, item: 축구}

  // 1. 두 번째 파라미터 이후에 콤마로 구분하여 오브젝트를 작성할 수 있음
  ```

- 값을 작성

  ```tsx
  let obj = { ten: 10 };
  Object.assign(obj, undefined, null, 200);

  console.log(obj); // {ten:10}

  const one = { un: undefined, nu: null };
  Object.assign(obj, one);

  console.log(obj); // {ten: 10, un: undefined, nu: null}

  // 1. 값으로 작성한 undefined, null, 200이 복사되지 않음
  // 2. 열거 가능한 오브젝트가 아니기 때문
  ```

- 값과 오브젝트를 작성

  ```tsx
  const obj = Object.assign(100, { book: 200 });

  console.log(obj.valueOf()); // 100
  console.log(obj.book); // 200

  // 1. 100이므로 Number 인스턴스를 생성함
  // 2. 두 번째 파라미터가 Object이므로 생성한 Number 인스턴스에 복사함
  // 3. Number 인스턴스에 Object를 복사하는 것은 데이터 타입이 맞지 않음
  // 4. Object이므로 복사가된다는 것을 설명하기 위한 것
  ```

  - 값이 설정된 인스턴스 형태

  ```tsx
  'use strict';

  const obj = Object.assign(100, { book: 200 });

  /*
  	1. 오른쪽 obj를 펼치면
  	- book: 200이 있으며 Object에서 사용하는
  	- 프로퍼티 형태 임
  
  	2. __proto__에 Number 오브젝트의 메소드가 있음
  
  	3. [[PrimitiveValue]]: 100
  	- 프리미티브 값을 나타내며,
  	- 첫 번째 파라미터에 작성한 100임
  */
  ```

```toc

```
