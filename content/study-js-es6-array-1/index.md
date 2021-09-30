---
emoji: 👨‍💻
title: from(), of()
date: '2021-09-30 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  from(), of()
</h1>

<br>

## 1. from()

- 첫 번째 파라미터의 오브젝트를 `Array` 오브젝트로 변환

  ```tsx
  const like = { 0: 'zero', 1: 'one', length: 2 };
  const list = Array.from(like);

  console.log(list); // [zero, one]

  console.log(Arrayfrom('ABC')); // [A, B, C]
  ```

  ```tsx
  function args() {
    return Array.from(arguments);
  }

  console.log(args(1, 2, 3)); // [1,2,3]
  ```

  ```tsx
  // <li class=sports>축구</li>
  // <li class=sports>농구</li>

  const node = document.querySelectorAll('.sports');
  const show = (node) => console.log(node.textContent);

  Array.from(nodes).forEach(show);
  // NodeList가 이터러블 오브젝트이므로 Array.from()으로 읽을 수 있음
  // 축구
  // 농구
  ```

- 두 번째 파라미터에 함수 작성

  - 이터러블 오브젝트를 전개할 때마다 호출

  ```tsx
  const like = {0:"zero", 1:"one", length:2};

  console.log(Array.from(like, value => {
  	return value + "변경";
  })

  // [zero변경, one변경]
  ```

- 세 번째 파라미터에 오브젝트 작성

  - 호출된 함수에서 `this`로 참조

  ```tsx
  const like = { 0: 10, 1: 20, length: 2 };

  console.log(
    Array.from(
      like,
      function (value) {
        return value + this.plus;
      },
      { plus: 70 },
    ),
  );

  // 콜백 함수에서 this로 3번째 파라미터의 오브젝트를 참조함
  // 화살표 함수를 사용하면 콜백 함수에서 3번째 파라미터의 오브젝트를 참조하지 않음
  // [80, 90]
  ```

<br>

## 2. of() 함수

- 파라미터 값을 `Array`로 변환, 반환
  ```tsx
  const result = Array.of(1, 2, 3);

  console.log(result); // [1, 2, 3]
  console.log(Array.of()); // []
  ```
- 파라미터에 변환 대상 값을 작성
  - 콤마로 구분하여 다수 작성 가능

```toc

```
