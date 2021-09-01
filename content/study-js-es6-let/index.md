---
emoji: 👨‍💻
title: ⭐️ let 변수
date: '2021-09-01 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 let 변수 개요, let 변수 선언, 블록 스코프
</h1>

<br>

## 1) let 변수 개요

```tsx
let sports = '축구';

if (sports) {
  let sports = '농구';
  console.log('안:', sports);
}

console.log('밖:', sports);

// 안: 농구
// 밖: 축구
```

- `let book = "책";`
  - 블록 스코프를 가진 변수
  - 변수가 선언된 블록이 스코프
- 스코프 적용 기준
  - 블록`{}`, 문, 표현시
- 블록`{}` 안과 밖이 스코프가 다름
  - 변수 이름이 같아도 값이 대체되지 않음

<br>

## 2) let 변수 선언

- Syntax
  - `let name1 [= value1] [, name2 [= value2]]`
- `name1`, `name2`에 변수 이름 작성

  - 식별자로 사용
  - `[ ]`는 생략 가능을 나타냄
  - 값을 할당하지 않아도 됨

  ```tsx
  let book;
  let one, two;
  ```

  1. `let book;`
     - 값을 할당하지 않고 변수만 선언할 수 있음, 초깃값 `undefined`가 할당됨
  2. `let one, two;`
     - 콤마로 구분하여 다수를 선언할 수 있음

- `value1`, `value2`에 초깃값 작성

  - 표현식 작성 가능, 평가 결과 사용

  ```tsx
  let book = '책';
  let one = 1,
    two = 10 + 20;

  // let five = 5, let six = 6;
  // let five = 5, var six = 6;
  ```

  1. `let book = "책";`
     - 변수를 선언하고 초깃값을 할당했습니다.
  2. `let one = 1, two = (10 + 20);`
     - 콤마로 구분하여 다수의 변수를 선언하고 값을 할당한 형태임
  3. `let five = 5, let six = 6;`
     - `SyntaxError` 발생, `let`을 처음에 한 번만 작성함
  4. `let five = 5, var six = 6;`
     - 콤마로 구분하여 let과 var을 같이 사용할 수 없음

<br>

## 3) 블록 스코프

- 블록 기준
  - 중괄호 `{ 코드 }`
  - `function name() { 코드 }`
  - `if (a === 1) { 코드 }`
- 블록 안과 밖이 스코프가 다름

  - 변수 이름이 같아도 값이 대체되지 않음

  ```tsx
  // 블록 스코프

  let sports = '축구';

  if (sports) {
    let sports = '농구';

    console.log('안:', sports);
  }

  console.log('밖:', sports);
  ```

  1. `if (sports) {...}` 블록 `{}` 안과 밖에 `let sports`를 작성했으며 스코프가 다르므로 같은 이름을 사용할 수 있음
  2. 변숫값이 대체되지 않고 유지 됨
  3. 블록 안에서 블록 밖의 변수는 접근 할수 있지만(`if`문 안의 `sports`의 `let`를 빼면 밖의 `sports`에 접근)
  4. 블록 밖에서 블록 안의 변수는 접근 할수 없음

  ```tsx
  let sports = '축구';

  sports = '농구';
  console.log(sports); // 농구

  // let sports = "배구";

  {
    let sports = '탁구';
    console.log(sports);
  }
  ```

  1. `sports = "농구";` 스코프에서 `sports` 식별자를 해결함, 바로 앞에 있으므로 값을 할당
  2. `// let sports = "배구";` `let`을 사용하여 같은 스코프에 같은 이름의 변수를 선언할 수 없음
  3. `{ let sports ="탁구"; }` 블록 `{}`을 사용했으므로 스코프가 다르므로 `let`을 사용하여 변수를 선언할 수 있음

- 스코프에 같은 이름 사용 불가

```toc

```
