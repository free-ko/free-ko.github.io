---
emoji: 👨‍💻
title: 배열 엘리먼트 복사, copyWithin()
date: '2021-10-01 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  배열 엘리먼트 복사, copyWithin()
</h1>

<br>

## 1. copyWithin()

- 범위 값을 복사하여 같은 오브젝트에 설정
- 두 번째 파라미터의 인덱스부터 복사하여

  - 첫 번째 파라미터 인덱스 부터 순서대로 설정(대체)

  ```tsx
  const list = ['A', 'B', 'C', 'D', 'E'];
  const copy = list.copyWithin(1, 3);

  console.log(list); // [A,D,E,D,E]
  console.log(copy); // [A,D,E,D,E]

  // list 배열이 대상임
  // 두 번 째 파라미터의 3번 인덱스부터 배열의 끝까지 복사하여
  // 첫 번째 파라미터의 1번 인덱스 부터 차례로 설정
  // D와 E를 복사하므로 엘리먼트가 2개이며
  // 1번 인덱스부터 2개를 대체 하므로 B가, D로, C가 E로 대체됨
  // 복사 대상에 대체하므로 반환된 Array 오브젝트와 복사 대상이 같음
  ```

- 세 번째 파라미터의 인덱스 직전까지 복사

  ```tsx
  const list = ['A', 'B', 'C', 'D', 'E'];
  list.copyWithin(0, 2, 4);

  console.log(list); // [C, D, C, D, E]

  // 두 번째 파라미터의 2번 인덱스 부터
  // 세 번째 파라미터의 4번 인덱스 직전까지 복사하여 list 배열의 0번 인덱스부터 설정
  // 2번 인덱스, 3번 인덱스를 복사하므로 C와 D를 복사하게 됨
  // A가 C로, B가 D로 대체됨
  ```

- 복사 시작 인덱스와 끝 인덱스를 작성하지 않으면 배열 전체 복사

```tsx
const list = ['A', 'B', 'C', 'D', 'E'];
list.copyWithin(3); // [A,B,C,A,B]

// list 배열 전체가 복사 대상임
// 3번 인덱스부터 대체 함
// 복사할 엘리먼트 수가 대체할 엘리먼트 수보다 많으면
// 매치되는 인덱스만 값을 대체하고 남는 것은 대체하지 않음
// D가 A로, E가 A로 대체됨
```

<br>

## 2. copyWithin()

- `copyWithin()` 함수의 특징

  - `shallow copy(얕은 복사)`
  - 같은 배열 안에서 이동하는 개념

    ```tsx
    const list = ['A', { B: '가' }, 'C'];

    console.log(list.copyWithin(0, 1)); // [{B: "가"}, C, C]

    // {B: "가"}를 복사 할 때 새로운 {B: "가"}를 만들지 않고 현재의 메모리 주소를 복사함
    // shallow copy(얕은 복사)라고 함
    // shallow copy는 값이 연동됨
    // 연동되지 않도록 하려면 Deep Copy를 해야 함
    ```

  - 배열의 엘리먼트 수가 변동되지 않음
  - 배열 안에서 엘리먼트를 이동은 엘리먼트를 왼쪽, 오른쪽으로 이동하는 것(처리 속도가 빠름)

```toc

```
