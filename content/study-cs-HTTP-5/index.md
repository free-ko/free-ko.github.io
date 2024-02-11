---
emoji: 👨‍💻
title: HTTP - 3.HTTP 기본(3)
date: '2021-12-15 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: CS
---

<br>

## ✅ HTTP 메세지

### 1.시작 라인: 요청 메시지
```js
GET /search?q=hello&hl=ko HTTP/1.1
Host:www.google.com
```


1. start-line = request-line / status-line
2. request-line = method SP(공백) request-target SP HTTP-version CRLF(엔터)
3. HTTP 메서드 (GET: 조회)
   - 종류 : GET, POST, PUT, DELETE
   - 서버가 수행해야 할 동작 지정 : GET(리소스 조회), POST(요청 내역 처리)
4. 요청 대상(`/search?q=hello&hl=ko`)
5. HTTP Version

<br>

### 2.시작 라인: 요청 메시지(요청대상)

1. `absolute-path[?query] : (절대경로[?쿼리])`
2. 절대경로 = `"/"`로 시작하는 경로

<br>

### 3. 시작 라인: 응답 메시지
```js
HTTP/1.1 200 OK
Content-type: text/html;charset=UTF-8
Contetnt-Length: 3423

<html>
   <body>...</body>
</html>
```

1. start-line = request-line / **status-line**
2. status-line = HTTP-version SP status-code SP reason-phrase CRLF 
3. HTTP 상태 코드 : 요청 성공, 실패를 나타냄
   - 200 : 성공
   - 400 : 클라리언트 요청 오류
   - 500 : 서버 내부 오류
4. 이유 문구 : 사람이 이해할 수 있는 짧은 상태 코드 글

<br>

### 4.HTTP 헤더: 용도

1. HTTP 전송에 필요한 모든 부가 정보

   - ex) 메시지 바디의 내용, 메시지 바다의 크기, 압축, 인증, 요청 클라이언트(브라우저) 정보, 서버 애플리케이션 정보, 캐시 관리 정보

2. 표준 헤더가 너무 많음
3. 필요시 임의의 헤더 추가 가능

<br>

### 5.HTTP 메시지 바디: 용도

1. 실제 전송할 데이터
2. HTML문서, 이미지, 영상, JSON 등등 byte로 표현할 수 있는 모든 데이터 전송 가능

<br>

### 6.단순함 확장 가능

1. HTTP는 단순함
2. HTTP 메시지도 매우 단순
3. 크게 성공하는 표준 기술은 단순하지만 확장 가능한 기술

```toc

```
