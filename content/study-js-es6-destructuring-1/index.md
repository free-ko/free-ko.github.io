---
emoji: 👨‍💻
title: Destructuring, Array 분할 할당
date: '2021-09-08 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 Destructuring, Array 분할 할당
</h1>

<br>

## 1. Destructuring

- Destructuring Assignment
- 사전적 의미
  - ~구조를 파괴하다.
  - 파괴, 해체는 있는 것이 없어지는 뉘앙스
  - 원 데이터는 변경되지 않음
  - 이 관점에서 보면 분할/분리가 더 까움

```tsx
let one, two, three;

const list = [1, 2, 3];

[one, two, three] = list;

console.log(one); // 1
console.log(two); // 2
console.log(three); // 3
console.log(list); // [1, 2, 3]
```

<br>

## 2. Array 분할 할당

- 배열의 엘리먼트를 분할하여 할당(인덱스에 해당하는 변수에 할당)

  ```tsx
  let one, two, three;

  [one, two, three] = [1, 2, 3];

  console.log(one); // 1
  console.log(two); // 2
  console.log(three); // 3
  ```

- 할당 받을 변수 수가 적은 경우

  ```tsx
  let one, two;

  [one, two] = [1, 2, 3];

  console.log(one); // 1
  console.log(two); // 2
  ```

  1. 왼쪽에 할당 받을 변수가 2개이고, 오른쪽에 분할 할당할 값이 3개 임
  2. 왼쪽의 변수 인덱스에 맞추어 값을 할당하므로 3은 할당되지 않음

- 할당 받을 변수 수가 많을 경우

  ```tsx
  let one, two, three, four;

  [one, two, three, four] = [1, 2, 3];

  console.log(three); // 3
  console.log(four); // undefined
  ```

  1. 왼쪽의 할당 받을 변수가 4개이고 오른쪽에 분할 할당할 값이 3개 임
  2. 왼쪽에 값을 할당할 수 없는 변수에 `undefined`가 설정됨

- 배열 차원에 맞추어 분할 할당

  ```tsx
  let one, two, three, four;

  [one, two, [three, four]] = [1, 2, [3, 4]];

  console.log([one, two, three, four]); // [1, 2, 3, 4]
  ```

- 매치되는 인덱스에 변수가 없으면 값을 할당하지 않음

  ```tsx
  let one, two, three, four;

  [one, , , four] = [1, 2, 3, 4];

  console.log([one, two, three, four]); // [1, undefined, undefined, 4]
  ```

- Spread와 같이 사용

  - 나머지를 전부 할당

    ```tsx
    let one, rest;

    [one, ...rest] = [1, 2, 3, 4];

    console.log(one); // 1
    console.log(rest); // [2, 3, 4];
    ```

    1. `one`에 1을 할당하고
    2. 나머지 2, 3, 4를 `rest`에 할당 함, `[2, 3, 4]`처럼 배열로 할당함
    3. `rest` 파라미터를 호출 받는 함수의 파라미터에 작성하지만, 나머지라는 시맨틱이 강해서 코드처럼 사용하기도 함
    4. 분리하지 않고 결합된 상태를 설정하므로 어긋나지 않음

- 인덱스를 반영한 나머지 할당

  ```tsx
  let one, three, rest;

  [one, , three, ...rest] = [1, 2, 3, 4, 5];

  console.log(three); // 3
  console.log(rest); // [4, 5]
  ```

  1. `one`에 1을 할당함
  2. 2는 건너띄고 `three`에 3을 할당
  3. 나머지 `[4, 5]`를 `rest`에 할당

```toc

```
