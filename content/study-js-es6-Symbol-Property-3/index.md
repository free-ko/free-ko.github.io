---
emoji: 👨‍💻
title: Symbol.isConcatSpreadable
date: '2021-10-23 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  Symbol.isConcatSpreadable
</h1>

<br>

## isConcatSpreadable

- `Array.prototype.concat()`은 배열의 엘리먼트를 전개하여 반환

  ```tsx
  const one = [10, 20],
    two = ['A', 'B'];
  const show = () => {
    console.log(one.concat(two));
  };

  show(); // [10,20,A,B]

  two[Symbol.isConcatSpreadable] = true;

  show(); // [10,20,A,B]

  two[Symbol.isConcatSpreadable] = false;

  show(); // [10,20,[A,B]]

  // 대상이 Array이면 전개하는 것이 디폴트임
  // @@isConcatSpreadable을 true로 처리
  ```

- `[Symbol.isConcatSpreadable] = true`
  - one 배열 끝에 two 배열의 엘리먼트를 하나씩 연결
- `[Symbol.isConcatSpreadable] = false`
  - 전개하지 않고 two 배열 자체를 연결
- `Array-Like` 전개

  ```tsx
  const one = [10, 20];
  const like = { 0: 'A', 1: 'B', length: 2 };
  const show = () => {
    console.log(one.concat(like));
  };

  show(); // [10,20,{0: "A", 1: "B", length: 2}]

  two[Symbol.isConcatSpreadable] = true;

  show(); // [10,20,A,B]

  two[Symbol.isConcatSpreadable] = false;

  show(); // [10,20,{0: "A", 1: "B", length: 2}]

  // 대상이 Array-Like이면 전개하지 않는 것이 디폴트 임
  // @@isConcatSpreadable을 false로 처리
  // Array-Like에서 값만 전개함
  ```

```toc

```
