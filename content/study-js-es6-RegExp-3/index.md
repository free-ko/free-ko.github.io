---
emoji: 👨‍💻
title: u 플래그, s 플래그
date: '2021-10-09 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  u 플래그, s 플래그
</h1>

<br>

## 1. u 플래그

- 정규 표현식의 패턴을 유니코드의 코드 포인트로 변환하여 매치

  ```tsx
  const obj = new RegExp('₩u{31}₩u{32}', 'u');

  console.log(obj.test('12')); // true
  console.log(obj.unicode); // true
  console.log(/₩u{1f418}/u.test('코끼리이모지')); // true

  // 1. new RegExp("₩u{31}₩u{32}", "u" 패턴을 코드 포인트로 변환하고 u flag로 인스턴스를 생성함
  // 2. obj.test("12") 매치가 되므로 true가 출력
  // 3. obj.unicode unicode 프로퍼티 값이 true로 설정됨
  // 4. 이모지도 매치 가능
  ```

- u 플래그를 사용하지 않으면 코드 포인트를 문자로 매치

  ```tsx
  const result = /₩u{31}₩u{32}/.test('12');

  console.log(result);

  // 1. / 다음에 플래그를 작성하지 않았음
  // 2. 패턴의 코드 포인트를 일반 문자로 간주하여 12와 매치하므로 false가 출력됨
  ```

<br>

## 2. s 플래그

- 정규 표현식에서 dot(점.)은 모든 문자를 매치하지만 줄바꿈 문자는 매치 하지 않음
- S 플래그를 사용하면(ES2018) 줄 바꿈 문자를 매치

  ```tsx
  const text = `line
  줄을 바꿈`;

  // 이전 방법
  console.log(/[₩s₩S]+/.test(text)); // true
  console.log(/[^]+/.test(text)); // true

  // s플래그
  const obj = new RegExp('.+', 's');
  console.log(obj.test(text)); // true
  console.log(obj.dotAll); // true
  ```

  - dotAll 플래그에 true 설정

- 줄 바꿈 문자
  - U+000A Line Feed(LF)("\n")
  - U+000D Carriage Return(CR)("\r")
  - U+2028 Line Separator
  - U+2029 Paragraph Separator

```toc

```
