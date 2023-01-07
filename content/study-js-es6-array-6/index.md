---
emoji: 👨‍💻
title: flat(), flatMap()
date: '2021-10-04 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  flat(), flatMap()
</h1>

<br>

## 1. flat()

- 배열 차원을 변환하고 새로운 배열로 설정하여 반환

  - 파라미터의 대상 깊이에 따라 변환이 다름

  ```tsx
  const list = [1, 2, [3, 4]];
  const result = list.falt();

  console.log(result); // [1,2,3,4]
  console.log(list); // [1,2,[3,4]]

  // 1. flat() 파라미터에 값을 작성하지 않으면 디폴트 값은 1
  // 2. 파라미터에 1을 더하면 2차원이 되며, 2차원까지를 엘리먼트로 변환
  // 3. [1,2]는 1,2가 되며, [[3,4]]도 3,4가 됨
  // 4. 변환한 엘리먼트를 새로운 배열에 설정하여 반환함, 따라서 1차원 배열의 엘리먼트로 설정됨
  // 5. flat() 대상인 list 배열은 바뀌지 않음
  ```

- 파라미터에 `0`을 작성한 경우

  ```tsx
  const list = [1, 2, [3, 4]];
  console.log(list.flat(0));

  // 1. 파라미터 값에 0에 1을 더하면 1임
  // 2. [1,2]는 1, 2가 되며 배열에 설정하여 반환하므로 [1,2]가 됨
  // 3. [[3,4]]는 [3,4]가 되며 배열에 설정하여 반환하므로 [[3,4]]가 됨
  ```

- 파라미터에 `1보다 큰 값`을 작성

  ```tsx
  const list = [1, 2, [3, 4, [5, [6]]]];
  console.log(list.flat(2)); // [1,2,3,4,5,[6]];

  // 1. 파라미터에 1을 더한 3차원까지 엘리먼트로 변환하므로 [[[5]]]까지 변환함
  // 2. 4차원인 6은 4차원에서 3차원을 빼면 1차원이 됨, 즉 [6]으로 변환됨
  // 배열에 설정하여 반환하므로 [[6]]이 됨
  ```

- 빈 엘리먼트를 삭제

  ```tsx
  const list = [1, 2, , , , [3, 4]];
  console.log(list.length); // 6

  const change = list.flat();
  console.log(change); // [1,2,3,4]
  console.log(change.length); // 4
  ```

<br>

## 2. flatMap()

- `flat()` 와 기본 기능은 같음
- 배열을 반복하면서 콜백 함수 호출

  - 파라미터 : 엘리먼트, 인덱스, 배열 전체
  - 콜백 함수에서 반환한 값을 배열로 반환

  ```tsx
  const list = [10, 20];
  const cb = (element, index, all) => {
    return element + 5;
  };

  console.log(list.flatMap(cb)); // [15, 25]
  console.log(list.map(cb)); // [15, 25]

  // 콜백 함수에서 파라미터로 넘겨준 값을 단지 값만 변경하여 반환하면
  // map()과 flatMap()의 차이가 없음
  ```

- `map()` 과 차이

  ```tsx
  const list = [10, 20];
  const cb = (element, index, all) => {
    return [element + 5];
  };

  console.log(list.flatMap(cb)); // [15, 25]
  console.log(list.map(cb)); // [[15], [25]]

  // 1. 콜백 함수에서 배열로 반환
  // 2. map() 반환된 배열을 새로운 배열에 설정하여 반환하므로 2차원이 배열이 되지만
  // 3. flatMap()은 반환된 값을 1차원 줄여서 반환함
  // 4. 이것이 map()과 flatMap()차이
  ```

```toc

```
