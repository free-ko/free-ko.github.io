---
emoji: 👨‍💻
title: 시작/끝 체크 복제
date: '2021-09-20 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  startsWith(), endsWith(), repeat(), includes(), raw()
</h1>

<br>

## 1. startsWith()

- 대상 문자열이

  - 첫 번째 파라미터의 문자열로 시작하면 `true`, 아니면 `false` 반환
  - 정규 표현식 사용 불가

  ```tsx
  const target = 'ABC';

  console.log(target.startsWith('AB')); // true
  console.log(target.startsWith('BC')); // false

  console.log(/^AB/.test(target)); // true
  ```

- 두 번째 파라미터

  - 선택이며, 비교 시작 인덱스 작성

  ```tsx
  const target = 'ABCD';

  console.log(target.startsWith('BC', 1)); // true
  console.log(target.startsWith('BC', 2)); // false
  ```

<br>

## 2. endsWith()

- 대상 문자열이

  - 첫 번째 파라미터의 문자열로 끝면 `true`, 아니면 `false` 반환

  ```tsx
  const target = 'ABC';

  console.log(target.endsWith('AB')); // true
  console.log(target.endsWith('BC')); // false

  console.log(/BC$/.test(target)); // true
  ```

- 두 번째 파라미터

  - 선택이며, 사용할 문자열 길이 지정

  ```tsx
  const target = 'ABC';

  console.log(target.endsWith('AB', 2)); // true

  // 1. "AB"로 끝나지 않았지만
  // 2. 대상 문자열을 3자리가 아닌 2자리를 사용하므로 즉, "AB"만 사용하므로 true를 반환
  ```

<br>

## 3.repeat()

- 대상 문자열을 파라미터에 작성한 수 만큼 복제, 연결하여 반환

```tsx
const target = 'ABC';

console.log(target.repeat(3)); // ABCABCABC
console.log(target.repeat(0)); // ""
console.log(target.repeat()); // ""
console.log(target.repeat(2.7)); // ABCABC

// 1. 파라미터를 작성하지 않거나 0을 작성하면 빈 문자열을 반환
// 2. 2.7에서 0.7을 무시하고 2를 사용 함
```

<br>

## 4. includes()

- 대상 문자열에

  - 첫 번째 파라미터의 문자열이 있으면 `true` 없으면 `false` 반환

  ```tsx
  const target = "123";
  console.log(target.includes("1"));  // true;

  console.log(target.includes(12));   // true;
  console.log(target.includes("13");  // false
  ```

  - 두 번째 파라미터(선택)
    - 비교 시작 인덱스 작성

  ```tsx
  const target= "ABC";
  console.log(target.includes("A", 1));   // false

  try {
  	result = traget.includes(/^A/);
  } catch(2) {
  	console.log("정규 표현식 사용 불가");
  }

  // 1. "A"가 있지만 0번 인덱스에 있음
  // 2. 1번 인덱스부터 비교하므로 존재 하지 않음
  ```

```toc

```
