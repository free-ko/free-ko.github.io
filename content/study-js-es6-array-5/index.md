---
emoji: 👨‍💻
title: fill(), includes()
date: '2021-10-03 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  fill(), includes()
</h1>

<br>

## 1. fill()

- 범위 값을 지정한 값으로 설정, 반환
- 설정 방법

  - 시작 인덱스부터 끝 인덱스 직전까지
  - 첫 번째 파라미터 값으로 설정(대체)

  ```tsx
  const list = ['A', 'B', 'C'];
  list.fill('책', 1);

  console.log(list); // [A, 책, 책]

  // 1. 시작 인덱스를 작성하고 끝 인덱스를 작성하지 않으면
  // 2. 시작 인덱스 부터 끝까지가 대체 대상
  // 3. 첫 번째 파라미터 값인 "책"으로 대체 함
  ```

  ```tsx
  const list = ['A', 'B', 'C', 'D'];
  list.fill('책', 1, 3);

  console.log(list); // [A, 책, 책, D]

  // 1. 끝 인덱스를 작성하면
  // 시작 인덱스부터 끝(인덱스 -1) 까지 대체 대상
  ```

  ```tsx
  const list = ['A', 'B', 'C'];
  list.fill('책');

  console.log(list); // [책, 책, 책]

  // 1. 시작 인덱스와 끝 인덱스를 작성하지 않으면 전체가 대체 대상
  ```

- Generic 함수

  ```tsx
  const like = { 0: 'A', 1: 'B', 2: 'C', length: 3 };

  console.log(Array.prototype.fill.call(like, '책', 1));

  // 1. Array-Like를 사용하여 대체 처리
  // 결과 : {0: A, 1: 책, 2: 책, length: 3}
  ```

<br>

## 2. includes()

- 대상 배열에

  - 첫 번째 파라미터 값이 있으면 `true`, 없으면 `false`를 반환

    ```tsx
    const list = [10, 20, 30];

    console.log(list.includes(10)); // true
    console.log(list.includes(50)); // false;

    console.log(list.includes(10, 1)); // false

    // 10이 있지만 1번 인덱스 부터 비교하므로 false 반환
    // 두 번째 파라미터에 음수를 작성하는 등의 값을 작성할 때의 처리는 MDN 참고
    ```

  - 두 번째 파라미터는 선택이며 비교 시작 인덱스 작성

- 제네릭 함수

  ```tsx
  const like = { 0: 10, 1: 20, 2: 30, length: 3 };

  console.log(Array.prototype.includes.call(like, 20)); // true
  ```

```toc

```
