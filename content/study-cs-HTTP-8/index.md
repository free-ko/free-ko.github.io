---
emoji: 👨‍💻
title: HTTP - 4.HTTP 메서드(3)
date: '2021-12-18 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: CS
---

<br>

## ✅ PUT

1. 리소스를 대체
   - 리소스가 있으면 대체(기존거 삭제됨)
   - 리소스가 없으면 생성
   - 쉽게 이야기해서 덮어버림
2. 중요! 클라이언트가 리소스를 식별
   - 클라이언트가 리소스 `위치`를 알고 URI 지정
   - POST와 차이점

<br>

## ✅ PATCH

- 리소스 부분 변경

  - 클라이언트에서 요청

  ```tsx
  PATCH /members/100 HTTP/1.1
  Content-Type: application/json

  {
    // userName 필드가 없을 경우
    "age": 50
  }

  ```

  - 서버(`/members/100`)

  ```tsx
   {
     "userName": "ko",
     "age" : 20   // 이 부분만 50으로 변경
   }

  ```

<br>

## ✅ DELETE

- 리소스 제거

```toc

```
