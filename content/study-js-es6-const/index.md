---
emoji: 👨‍💻
title: const 변수
date: '2021-09-01 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 const 변수
</h1>

<br>

## 1) const 문법

- 구문: `name1 [= value1] [, name2 [= value2]]`
- 값을 바꿀 수 없는 변수 선언(예외로 배열이나, 객체면 값을 바꿀 수 있음)
- `name1`에 변수 이름 작성, 식별자로 사용

  ```tsx
  const sports = '축구';

  try {
    sports = '농구';
  } catch (e) {
    console.log('const 할당 불가');
  }
  ```

  1. `const sports = "축구";` sports를 `const`로 선언하고 값 할당
  2. `try { sports = "농구;` try 블록도 별도의 스코프이지만 const, let을 작성하지 않았으므로
  3. sports 변수에 값을 할당하게 됨 이때 `sports`가 `const` 변수 이므로 에러 발생

<br>

## 2) JS에서 상수는 대문자 사용이 관례

    ```tsx
    const bonus = 100;
    const POINT = 200;
    ```

1. `const`가 `상수`이지만 값 형태에 따라 바꿀 수 있음
2. `const POINT=- 200;` 대문자 사용이 코딩 관례이므로 괜찮음

- 우선 `let`이 아닌 `const` 사용 가능을 검토(우선순위 `const` > `let` > `var`)

<br>

## 3) const 변수 사용

- `const` 변수 전체를 바꿀 수 없지만, `Object`의 프로퍼티 값을 바꿀수 있음

  ```tsx
  const book = { title: '책' };

  try {
    book = { title: '음악 책' };
  } catch (e) {
    console.log('const 전체 할당 불가');
  }

  book.title = '미술 책';

  console.log(book.title);

  // const 전체 할당 불가
  // 미술 책
  ```

  1. `book = {title: "음악 책"};` book에 값을 할당하면 에러 발생, `book` 전체를 바꿀 수 없음
  2. `book.title = "미술 책";` 프로퍼티 값은 변경할 수 있음
  3. `const` 변수의 변경 불가는 `book`에 값을 할당하는 것을 뜻 함

<br>

- `배열`의 엘리먼트 값도 바꿀 수 있음

      ```tsx
      const book = ["책"];

      try {
      	book = ["음악 책"];
      } catch(e) {
      	console.log("const 전체 할당 불가");
      }

      book[0] = "미술 책";

      console.log(book[0]);

      // const 전체 할당 불가
      // 미술 책
      ```

      1. `book = ["음악 책"];` book에 값을 할당하면 에러 발생
      2. `book[0] = "미술 책";` 엘리먼트 값은 변경할 수 있음

  <br>

```toc

```
