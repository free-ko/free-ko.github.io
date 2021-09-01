---
emoji: 👨‍💻
title: ⭐️ function 블록, try-catch, switch-case
date: '2021-08-31 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 블록 스코프 유형
</h1>

<br>

## 1) function 블록

- `function name() {}`도 블록 스코프
- `function` 안과 밖에

  - 같은 이름의 `let` 변수 선언 가능
  - 스코프가 다르기 때문
  - 그래서 밖의 `sports`와 안의 `sports`는 다르게 저장되어 있음

  ```tsx
  let sports = '축구';

  function show() {
    let sports = '농구';
    console.log('안:', sports);
  }

  show();

  console.log('밖:', sports);

  // 안 : 농구
  // 밖 : 축구
  ```

- `function` 밖의 `let` 변수를

  - `function` 안에서 사용 가능(`클로저`)

  ```tsx
  let sports = '축구';

  function show() {
    console.log(sports);
  }

  show(); // 축구
  ```

<br>

## 2) try-catch

- `try-catch` 문도 블록 스코프
- `try` 블록 `{}` 기준으로

  - 안과 밖에 같은 이름의 `let` 변수 선언 가능

  ```tsx
  let sports = '축구';

  try {
    let sports = '농구';
    console.log('안:', sports);
  } catch (e) {}

  console.log('밖:', sports);

  // 안 : 농구
  // 밖 : 축구
  ```

  1. `try` 블록의 안과 밖에 `let sports`를 선언했으며
  2. 안과 밖이 스코프가 다르므로 변숫값이 각각 설정됨

- `catch()`에서 `try` 밖의 변수 사용

  ```tsx
  let sports = '축구';

  try {
    let sports = '농구';

    console.log('안:', sports);
    abc = error;
  } catch (e) {
    console.log('catch:', sports);
  }

  console.log('밖:', sports);

  // 안: 농구
  // catch: 축구
  // 밖: 축구
  ```

  1. `let sports = "농구";` `try` 블록에서 값을 할당
  2. `abc = error;` `error` 변수가 없으므로 에러가 발생
  3. `console.log("catch:", sports)` `try` 블록 안에서 선언한 `sports` 값을 출력하지 않고 `try` 밖의 `sports` 값을 출력 함

<br>

## 3) switch-case

- `switch `문도 블록 스코프
- `switch` 블록 기준으로
  - 같은 이름의 `let` 변수 작성 불가
  - `case`, `default`는 블록 스코프가 아님

```tsx
let item = 1;

switch (item) {
  case 1:
    let sports;
    break;
  case 2:
  // let sports;
  default:
    console.log(sports);
}
```

1. `// let sports`
2. `switch` 블록 안에서 `let`을 사용하여 선언한 변수가 있는데 다시 `let`을 사용하여 변수를 선언하므로 에러가 발생
3. 그래서 주석으로 처리
4. 에러는 실행할 때 생기지 않고 컴파일 할 때 에러가 발생함

```toc

```
