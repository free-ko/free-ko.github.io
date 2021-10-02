---
emoji: 👨‍💻
title: Generic
date: '2021-10-02 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  Generic
</h1>

<br>

## Generic

- 스펙에서 아래 문장을 볼 수 있음
  - `copyWithin function is intentionally(의도적) generic`
  - ES7 스펙, 22.1.3.3 `copyWithin()`
  - `MDN copyWithin()`

<br>

- `generic` 사용 형태

  ```tsx
  const like = { 0: 10, 1: 20, 2: 30, length: 3 };

  console.log(Array.prototype.copyWithin.call(like, 1, 0));
  // {0: 10, 1: 20, 2: 30, length: 3};

  // 1. call()의 첫번째 파라미터에 Array-like를 작성했으며, Array-like 타입은 Object임
  // 2. copyWithin()이 Array 메소드이므로 Array를 넘겨주어야 하는데 Array-like를 넘겨주어도 처리가 됨
  // 3. 이것이 Generic임, copyWithin()은 Generic 함수 임
  // 4. 배열로 반환하지 않고 대상 오브젝트 형태로 반환함
  ```

<br>

- `generic`의 뜻하는 것은?
  - `copyWithin()`이 `Array` 메소드이므로 `Array` 오브젝트가 처리 대상이지만
  - `generic`은 `Array` 오브젝트가 아닌 `Array-like`, `iterable object`를 처리할 수 있다는 것을 뜻함

```toc

```
