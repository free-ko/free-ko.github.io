---
emoji: 👨‍💻
title: HTTP - 7.HTTP 일반 헤더(2)
date: '2024-02-29 07:17:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: CS
---

## ✅ HTTP 협상

### 협상(클라이언트가 선호하는 표현 요청)

- `Accept`: 클라이언트가 선호하는 **미디어 타입** 전달
- `Accept-Charset`: 클라이언트가 선호하는 **문자 인코딩**
- `Accept-Encoding`: 클라이언트가 선호하는 **압축 인코딩**
- `Accept-Language`: 클라이언트가 선호하는 **자연 언어**

—> 협상 헤더는 **요청**시에만 사용

### 협상과 우선순위 1

- Quality Values(q) 값 사용
- 0 ~ 1 : 클수록 높은 우선순위
- 생략 하면 1
- Accept-Language: ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7

  - 우선 1) ko-KR;q=1(q생략)
  - 우선 2) ko;q=0.9
  - 우선 3) en-US;q=0.8
  - 우선 4) en:q=9.7

  ### 협상과 우선순위 2

- 구체적인 것이 우선 함.
- Accept: `text/*, text/plain, text/plain;format=flowed, */*`
  - 우선 1) text/plain;format=flowed
  - 우선 2) text/plain
  - 우선 3) `text/*`
  - 우선 4) `*/*`

### 협상과 우선순위 3

- 구체적인 것을 기준으로 미디어 타입을 맞춤
- Accept: `text/*;q=0.3`, text/html;q=0.7, text/html;level=1, text/html;level=2;q=0.4, `*\*;q=0.5`

  | Media Type        | Quality |
  | ----------------- | ------- |
  | text/html;level=1 | 1       |
  | text/html         | 0.7     |
  | text/plain        | 0.3     |
  | image/jpeg        | 0.5     |
  | text/html;level=2 | 0.4     |
  | text/html;level=3 | 0.7     |

```toc

```
