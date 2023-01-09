---
emoji: 🤔
title: 'TIL - 230109'
date: '2023-01-09 21:38:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: TIL
---

# Facts
`Next.js`에서 redirect 속성 값 중에 `perment`가 어떤 역할을 하는지 궁금했다.

<br/>

# Feelings
실제로 프로젝트 내부에서 다양하게 사용되어 지고 있었는데, 정확하게 알지 못해 스프린트 개발진행에 있어 기존 코드 분석에 어려움을 겪었다.

<br/>

# Findings
### Permanent 옵션
- `true/false` 값에 따라 `http status code`를 307이나 308로 내려 줌.

<br>

### HTTP Status Code 307 & 308
- 307 : 임시 리다이렉트(목적지에 가기 위해 잠시 임시로 들리는 곳을 나타냄)
- 308 : 영구 리다이렉트(목적지에 가기 위해 잠시 들릴 수 있지만, 무조건 목적지를 향함)
- 기존 method 요청 유지하고 body 안버림

<br>

### HTTP Status Code 301 & 302
- 301 & 302는 redirect 시킬 때 get으로 method를 변경하고 body를 버림(이럴 경우 생각한대로 동작이 안됨)

<br>

### 참고
- [Next.js의 Redirect 속성 값](https://nextjs.org/docs/api-reference/next.config.js/redirects)