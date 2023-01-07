---
emoji: 👨‍💻
title: y 플래그
date: '2021-10-08 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  y 플래그
</h1>

<br>

## y 플래그

- `lastIndex` 위치에 매치

  ```tsx
  const vlaue = 'AABBA',
    obj = /A/y;

  console.log(obj.test(value) + ': ' + obj.lastIndex);
  console.log(obj.test(value) + ': ' + obj.lastIndex);
  console.log(obj.test(value) + ': ' + obj.lastIndex);

  // 1. g 플래그를 사용하지 않음
  // 2. obj.test(value) A가 매치되어 true가 출력됨
  // 3. lastIndex의 디폴트 값이 0이므로 0번 인덱스의 A에 매치한 것
  // 4. obj.lastIndex 1이 출력되며, 매치된 인덱스에 1을 더한 값, y 플래그는 매치가 되면 lastIndex에 1을 더함
  // 5. obj.test(vlaue) A가 매치되어 ture가 출력됨, 1번 인덱스의 A에 매치한 것
  // 6. obj.lastIndex 2가 출력되며 매치된 인덱스에 1을 더한 값임
  // 7. obj.test(value) A가 매치되지 않아 false가 출력됨
  // 8. 4번 인덱스에 A가 있지만 2번 인덱스에 매치하며 2번 인덱스 값이 B이므로 매치되지 않음
  // 9. obj.lastIndex 매치되지 않으면 lastIndex 값이 0이 됨

  // 결과
  // true: 1
  // true: 2
  // false: 0
  ```

  - `lastIndex` 부터가 아니라 `lastIndex` 위치에 매치
  - 매치되면 `lastIndex` 값이 1증가
  - `const value = "AABBA"`, `obj = /A/y`

  <br>

- `lastIndex` 값을 지정할 수 있음

  ```tsx
  const vlaue = 'AABBA',
    obj = /A/y;
  console.log(obj.sticky); // true

  obj.lastIndex = 4;
  console.log(obj.test(value) + ': ' + obj.lastIndex); // true: 5

  // 1. obj.sticky y플래그를 사용하면 sticky 프로퍼티에 true가 설정됨
  // 2. obj.lastIndex = 4 lastIndex 프로퍼티 값에 4를 할당했으므로 4번 인덱스의 문자에 매치하게 됨
  // 3. obj.test(target) 4번 인덱스에 A가 있으므로 매치가 되어 true가 출력됨
  // 4. obj.lastIndex 1이 증가된 5가 출력 됨
  ```

  - `sticky` 프로퍼티에 `true` 설정

```toc

```
