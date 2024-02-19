---
emoji: 👨‍💻
title: HTTP - 5.메서드 활용(1)
date: '2021-12-21 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: CS
---

## ✅ 클라이언트에서 서버로 데이터 전송

### 1. 데이터 전달 방식은 크게 2가지

1. 쿼리 파라미터를 통한 데이터 전송
   - GET
   - ex) 주로 정렬 필터(검색어)
2. 메시지 바디를 통한 데이터 전송
   - POST, PUT, PATCH
   - ex) 회원가입, 상품주문, 리소스 등록, 리소스 변경

<br>

### 2. 4가지 상황

1. 정적 데이터 조회
   - 이미지, 정적 테스트 문서
   - 쿼리 파라미터 미사용(리소스 경로로 단순하게 조회 가능)
   - 조회는 GET 사용
2. 동적 데이터 조회
   - 주로 검색, 게시판 목록에서 정렬 필터(검색어)
   - 조회는 GET 사용
   - GET은 쿼리 파라미터 사용해서 데이터를 전달
3. HTML Form을 통한 데이터 전송

   - HTML Form Submit시 POST 전송 ex) 회원 가입, 상품 주문, 데이터 변경
   - `Content-Type: application/x-www.form-urlencode` 사용
     - form의 내용을 메시지 바디를 통해서 전송(key-value, 쿼리 파라미터 형식)
     - 전송 데이터를 Url encoding 처리 ex) abc김 —> abc%EA%B9%80
   - HTML Form은 GET 전송도 가능
     - `<form action=”/save” method=”**get**” />`
     - 주의! GET 요청은 조회에만 사용! 리소스 변경이 발생하는 곳에 사용하면 안됨!
   - `Content-Type: multipart/form-data`
     - 파일 업로드 같은 바이너리 데이터 전송시 사용
     - 다른 종류의 여러 파일과 폼의 내용 함께 전송 가능(그래서 이름이 multipart)
   - 참고: HTML Form 전송은 GET, POST만 지원

4. HTTP API를 통한 데이터 전송

   - 회원 가입, 상품 주문, 데이터 변경
   - 서버 to 서버, 앱 클라이언트, 웹 클라이언트(Ajax): 백엔드 시스템 통신
   - 앱 클라이언트: 아이폰, 안드로이드
   - 웹 클라이언트
     - HTML에서 Form 전송 대신 JS를 통한 통신에 사용(AJAX) ex) React, VueJS 같은 웹 클라이언트와 API 통신
   - POST, PUT, PATCH: 메시지 바디를 통해 데이터 전송
   - GET: 조회, 쿼리 파라미터로 데이터 전달
   - `Content-Type: application/json`을 주로 사용(사실상 표준) ex) TEXT, XML, JSON 등

```toc

```
