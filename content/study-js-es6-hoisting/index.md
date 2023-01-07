---
emoji: 👨‍💻
title: 호이스팅
date: '2021-09-01 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 호이스팅
</h1>

<br>

## 1) ES5의 실행 콘텍스트 처리 순서

1. 함수 선언문 설정(함수부터 찾음)
2. 변수 이름을 바인딩, 변숫 값은 `undefined`(변수 이름 찾고 값은 `undefined`라고 넣음)
3. 소스 코드 실행

<br>

## 2) var 변수 호이스팅

```tsx
console.log('music 변수:', music);

var music = '음악';
```

- `console.log("music 변수:", music);` 코드 아래 `var music = "음악";` 이 존재
- 변수가 아래에 있지만 식별자 해결을 할 수 있음 단, 이 위에서 `music` 값은 `undefined`
- 이것을 `호이스팅`이라고 함
- 식별자 해결을 하지 못하면 에러가 발생

<br>

## 3) let 변수 호이스팅 사용 불가

- `let` 변수는 호이스팅되지 않음, 즉 `let` 변수 앞에서 변수 사용 불가

  ```tsx
  try {
    console.log(sports);
  } catch (e) {
    console.log('호이스팅 불가');
  }

  let sports = '축구';

  // 호이스팅 불가
  ```

- `let` 변수를 인식하는 시점
- `block` 안에 `let` 변수 작성

<br>

```toc

```
