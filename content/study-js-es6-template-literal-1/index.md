---
emoji: 👨‍💻
title: Template Literal
date: '2021-09-27 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  Template Literal
</h1>

<br>

## Template Literal

- Syntax
  - `문자열`
  - `문자열 ${표현식} 문자열`
  - tag `문자열 ${표현식} 문자열`
- Template Literal
  - 문자열 처리를 위한 리터럴
  - 표현식을 포함할 수 있음
  - 강좌에서는 템플릿으로 표기
- `backtick` 안에 표현식 작성

  - 표현식을 `${표현식}` 형태로 작성

  ```tsx
  console.log(`ABC`); // ABC

  const one = 1,
    two = 2;
  const result = `1 + 2는 ${one + two}이 된다.`;

  console.log(result); // 1 + 2는 3이 된다.

  // 템플릿의 모든 공백이 그대로 반영됨
  ```

- 줄 바꿈 작성 차이

  ```tsx
  console.log('ES5-1라인 \n 2라인');
  /*
  	1. ES5 형태로 문자열 중간에서
  	- 줄을 바꾸려면 \n을 작성함
  */

  console.log(`1라인
  	2라인`);
  /*
  	1. Template 리터럴을 사용함
  	
  	2. ES5처럼 \n을 사용하지 않고
  	- 백틱 안에서 줄을 바꿈
  	- 줄 앞에 공백을 작성하면 공백으로 처리 됨
  */
  ```

```toc

```
