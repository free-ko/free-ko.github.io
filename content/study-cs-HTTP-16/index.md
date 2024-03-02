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

<br/>

## ✅ HTTP 전송방식

1. 단순 전송: Content-Length

   ```
   // 클라이언트
   GET /event

   // 서버
   HTTP/1.1 200 OK
   Content-Type: text/html;charset=UTF-8
   Content-Length:3423

   <html>
     <body>...</body>
   </html>
   ```

2. 압축 전송: Content-Encoding

   ```
   // 클라이언트
   GET /event

   // 서버
   HTTP/1.1 200 OK
   Content-Type: text/html;charset=UTF-8
   Content-Encoding:gzip
   Content-Length:521

   <html>
     <body>...</body>
   </html>
   ```

3. 분할 전송: Transfer-Encoding cf) Content-Length를 표시 할 수 X

   ```
   // 클라이언트
   GET /event

   // 서버
   HTTP/1.1 200 OK
   Content-Type: text/plain
    Transfer-Encoding: chunked

   5
   Hellow
   5
   World
   0
   \r\n
   ```

4. 범위 전송: Range, Content-Range(이미 받은 데이터 이외의 데이터를 요청할 때)

   ```
   // 클라이언트
   GET /event

   // 서버
   HTTP/1.1 200 OK
   Content-Type: text/plain
   Content-Range: bytes 1001~2000 / 2000

   qqwerwerqwer01910293qwer
   ```

<br/>

## ✅ HTTP 일반정보

### Form

- 유저 에이전트의 이메일 정보, 검색 엔진 같은 곳에서 주로 사용, 요청에서 사용

### Referrer

- 이전 웹 페이지 주소 —> `진짜 많이 사용함`
- 현재 요청된 페이지의 이전 웹 페이지 주소
- A → B로 이동하는 경우 B를 요청할 때 Refere: A를 포함해서 요청
- Referer를 사용해서 유입 경로 분석 가능
- 요청에서 사용

### User-Agent

- 유저 에이전트 애플리케이션 정보
- 클라이언트의 애플리케이션 정보(웹 브라우저 정보 등)
- 통계 정보
- 어떤 종류의 브라우저에서 장애가 발생하는지 파악 가능
- 요청에서 사용

### Server

- 요청을 처리하는 Origin 서버의 소프트웨어 정보
- Origin: 진짜 응답해주는 서버(클라이언트에 표현 데이터를 주는 주체)
- server: nginx
- 응답에서 사용

### Date

- 메시지가 생성된 날짜
- 응답에서 사용

```toc

```
