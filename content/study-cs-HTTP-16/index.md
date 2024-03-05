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

<br/>

## ✅ HTTP 특별한 정보

1. Host: 요청한 호스트 정보(도메인)
   - `필수 값`
   - 하나의 서버가 여러 도메인을 처리해야 할 때
   - 하나의 IP 주소에 여러 도메인이 적용되어 있을 때(서버에 여러게 도메인이 있을 경우)
2. Location: 페이지 리다이렉션
   - 웹 브라우저는 3xx 응답의 결과에 Location 헤더가 있으면, Location 위치로 자동이동(리다이렉트)
   - 201(Created): Location 값은 요청에 의해 생성된 리소스 URI
   - 3xx(Redirection): Location 값은 요청을 자동으로 리디렉션하기 위한 대상 리소스를 가리킴
3. Allow: 허용 가능한 HTTP 메서드
   - 405(Method Not Allowed)에서 응답에 포함해야 함
   - Allow: GET, HEAD, PUT
4. Retry-After: 유저 에이전트가 다음 요청을 하기까지 기다려야 하는 시간
   - 503(Service Unavailable): 서비스가 언제까지 불능인지 알려줄 수 있음
   - Retry-After: Fri, 31 Dec 1999 23:59:59 GMT(날짜 표기)
   - 초단위 표기: 120(초단위 표기)

<br/>

## ✅ 인증

1. Authorization
   - 클라이언트 인증 정보를 서버에 전달
2. WWW-Authenticate
   - 리소스 접근시 필요한 인증 방법 정의
   - 리소스 접근시 필요한 인증 방법 정의
   - 401 Unauthorized 응답과 함께 사용
   - `WWW-Authenticate: Newauth realm="apps", type=1, title="Login to \"apps\"", Basic realm="simple"`

<br/>

## ✅ 쿠키

```
// 클라이언트
POST /login HTTP/1.1
user=홍길동

// 서버
HTTP/1.1 200 OK
Set-Cookie: user=홍길동

홍길동님이 로그인 했습니다.

// 쿠키 저장소에 저장
```

1. Set-Cooke: 서버에서 클라이언트로 쿠키 전달(응답)
2. Cookie: 클라이언트가 서버에서 받은 쿠키를 저장하고, HTTP 요청시 서버로 전달

### 사용예시

1. 서버 쪽
   - `set-cookie:sessionId=abcde 1234; expires=Sat, 26-Dec-2020 00:00:00 GMT; path=/; domain=.google.com; Secure`
2. 사용처
   - 사용자 로그인 세션관리
   - 광고 정보 트래킹
3. 쿠키 정보는 항상 서버에 전송됨
   - 네트워크 트래픽 추가 유발
   - 최소한의 정보만 사용(세션 ID, 인증 토큰)
   - 서버에 전송하지 않고, 웹 브라우저 내부에 데이터를 저장하고 싶으면 웹 스토리지(localStorage, sessionStorage)
4. 주의!
   - 보안에 민감한 데이터는 저장하면 안됨(주민번호, 신용카드 번호 등)

### 쿠키 생명주기

1. Set-Cookie: `expires`=Sat, 26-Dec-2020 04:38:21 GMT, 만료일이 되면 쿠키 삭제
2. Set-Cookie: `max-age`=3600(3600초), 0이나 음수를 지정하면 쿠키 삭제
3. 세션 쿠키: 만료 날짜를 생략하면 브라우저 종료시 까지만 유지
4. 영속 쿠키: 만료 날짜를 입력하면 해당 날짜까지 유지

### 쿠키 도메인

1. `domain=example.org`
2. 명시: 명시한 문서 기준 도메인 + 서브 도메인 포함
   - domain=example.org를 지정해서 쿠키 생성
   - example.org는 물론이고 dev.example.org도 쿠키 접근
3. 생략: 현재 문서 기준 도메인만 적용
   - example.org에서 쿠키를 생성하고 domain 지정을 생략
   - example.org에서만 쿠키 접근
   - dev.example.org는 쿠키 미접근

### 쿠키 경로

1. `path=/home`
2. 이 경로를 포함한 하위 경로 페이지만 쿠키 접근
3. 일반적으로 Path=/ 루트로 지정

   ex) `path=/home` 지정

   - /home —> 가능
   - /home/level1 —> 가능
   - /home/level1/level2 —> 가능
   - /Hello —> 불가능

### 쿠키 보안

1. Secure
   - 쿠키는 http, https를 구분하지 않고 전송
   - Secure를 적용하면 Https인 경우에만 전송
2. HttpOnly
   - XSS 공격방지
   - JS에서 접근 불가(document.cookie)
   - HTTP 전송에만 사용
3. SameSite
   - XSRF 공격 방지
   - 요청 도메인과 쿠키에 설정된 도메인이 같은 경우에만 쿠키 전송

<br/>

### 참고

- [모든 개발자를 위한 HTTP 웹 기본 지식 by 김영한](https://www.inflearn.com/course/http-%EC%9B%B9-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC)

```toc

```
