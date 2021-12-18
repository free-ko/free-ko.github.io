---
emoji: 👨‍💻
title: HTTP - 4.HTTP 메서드(3)
date: '2021-12-18 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: CS
---

<br>

<h1 align="center">
  👋  HTTP 메서드 - PUT, PATCH, DELETE
</h1>

<br>

## 1. PUT

1. 리소스를 대체
   - 리소스가 있으면 대체(기존거 삭제됨)
   - 리소스가 없으면 생성
   - 쉽게 이야기해서 덮어버림
2. 중요! 클라이언트가 리소스를 식별
   - 클라이언트가 리소스 `위치`를 알고 URI 지정
   - POST와 차이점

<br>

## 2. PATCH

1. 리소스 부분 변경

   - 클라이언트에서 요청

   ```tsx
   PATCH /memebers/100 HTTP/1.1
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

## 3. DELETE

1. 리소스 제거

```toc

```
