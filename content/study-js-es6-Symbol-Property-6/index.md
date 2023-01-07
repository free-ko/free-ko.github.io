---
emoji: 👨‍💻
title: Symbol.toPrimitive
date: '2021-10-26 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  Symbol.toPrimitive
</h1>

<br>

## toPrimitive

- 오브젝트를 대응하는 `Primitive` 값으로 변환
- 대응, 기대하는 타입
  - number, string, default
  - ToPrimitive 스펙
- 오브젝트를 문자열에 대응
  ```tsx
  const point = { bonus: 100 };
  console.log(point.toString()); // [object Object]

  const book = {
    toString() {
      return '책';
    },
  };

  console.log(`${book}`); // 책

  // 1. 문자열 대응은 toString()을 사용함
  // 2. point.toString() Object.prototype.toString()가 호출 됨
  // 3. `${book}` book 오브젝트의 toString()이 호출 됨
  ```
- 오브젝트를 숫자에 대응
  ```tsx
  const point = {bonus: 100};
  console.log(point.valueOf());  // {bonus: 100}

  const book = {
  	toString() { return 70 }
  	valueOf() { return 30 }
  };

  console.log(book * 20);   // 600

  // 1. 숫자 대응은 valueOf()를 사용함
  // 2. point.valueOf() Object.prototype.valueOf()가 호출 됨
  // 3. book * 20 book 오브젝트의 valueOf()가 호출되며 toString()이 호출되지 않음
  // 4. valueOf()를 작성하지 않으면 toString()이 호출됨
  ```
- `Symbol.toPrimitive()` 사용
  ```tsx
  const obj = {
    [Symbol.toPrimitive](hint) {
      return hint === 'number' ? 30 : hint === 'string' ? '책' : 'default';
    },
  };

  console.log(20 * obj); // 600
  console.log(`${obj}` + 100); // 책100
  console.log(obj + 50); // default50
  console.log('default' === obj); // true;
  ```

```toc

```
