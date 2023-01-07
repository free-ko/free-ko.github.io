---
emoji: 👨‍💻
title: find(), findIndex()
date: '2021-10-02 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  find(), findIndex()
</h1>

<br>

## 1. find()

- 배열의 엘리먼트를 하나씩 읽어가면서 콜백 함수 호출

  - 파라미터 : 엘리먼트, 인덱스, 배열 전체
  - 콜백 함수에서 `true`를 반환하면 `find()`를 종료하면서
  - 현재 처리중인 엘리먼트 값을 반환

    ```tsx
    const list = ['A', 'B', 'C'];
    const cb = (value, index, all) => value === 'B';
    const result = list.find(cb);

    console.log(result); // B

    // 1. ["A", "B", "C"]를 반복하면서 콜백 함수 호출
    // 2. 콜백 함수에서 엘리먼트 값이 B이면 true를 반환
    // 3. 콜백 함수에서 true를 반환하면 현재 처리중인 엘리먼트 값인 B를 반환하고 find() 실행을 종료함
    // 4. 조건에 맞으면 find() 실행을 종료하므로 배열 앞에서 true가 되면 효율이 높음
    ```

    <br>

    ```tsx
    onst list = ["A", "B", "C"];
    const cb = (value, index, all) => value === 77;
    const result = list.find(cb);

    console.log(result);

    // 1. 콜백 함수에서 조건에 맞는 값이 없으면 undefined를 반환함
    ```

    <br>

    ```tsx
    const list = ['A', 'B', 'C'];

    function cb(value, index, all) {
      return value === 'A' && value === this.check;
    }

    const result = list.find(cb, { check: 'A' });

    console.log(result); // A

    // 1. 두 번째 파라미터에 콜백 함수에서 this로 참조할 오브젝트를 작성한 형태
    // 2. 콜백 함수를 화살표 함수로 작성하면 콜백 함수에서 this가 window를 참조하므로 두 번째 파라미터의 오브젝트를 참조하지 못함
    // 3. 일반 함수를 작성해야 함
    ```

<br>

## 2. findIndex()

- 배열의 엘리먼트를 하나씩 읽어가면서 콜백 함수 호출

  - 파라미터 : 엘리먼트, 인덱스, 배열 전체

  - 콜백 함수에서 `true` 반환하면 `findIndex()` 종료하면서

  - 현재 처리 중인 엘리먼트의 인덱스를 반환

  ```tsx
  const list = ['A', 'B', 'C'];

  const cb = (value, index, all) => value === 'B';

  console.log(list.findeIndex(cb)); // 1

  // 1. ["A", "B", "C"]를 반복하면서 콜백 함수 호출
  // 2. 콜백 함수에서 엘리먼트 값이 B이면 true를 반환
  // 3. 콜백 함수에서 true를 반환하면 현재 처리 중인 엘리먼트의 인덱스를 반환하고 findIndex()를 종료
  ```

  <br>

  ```tsx
  onst list = ["A", "B", "C"];
  const cb = (value, index, all) => value === 77;
  const result = list.findIndex(cb);

  console.log(result);  // -1

  // 1. 콜백 함수에서 조건에 맞는 값이 없으면 -1를 반환함
  // 2. indexOf(searchValue, fromIndex)는 값을 직접 지정할 수 있으며 검색을 시작할 인덱스를 지정할 수 있음
  // 3. 콜백 함수가 없으므로 다양한 조건으로 체크 불가
  // 4. 단, 값만으로 인덱스를 찾을 때는 indexOf()가 효율적
  // 5. includes(searchValue, fromIndex)는 true/false를 반환
  ```

```toc

```
