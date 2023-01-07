---
emoji: 👨‍💻
title: HTTP - 2.URL와 웹 브라우저 요청 흐름
date: '2021-12-12 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: CS
---

<br>

<h1 align="center">
  👋  URL와 웹 브라우저 요청 흐름
</h1>

<br>

## 1. URI 단어의 뜻

- `Uniform`(리소스 식별하는 통일된 방식)
- `Resource`(자원, URI로 식별할 수 있는 모든 것, 제한 없음)
- `Identifier`(다른 항목과 구분하는데 필요요한 정보

<br>

## 2. URL, URN 단어 뜻

- URL - Locator: 리소스가 있는 위치를 지정
- URN - Name: 리소스에 이름을 부여
- 위치는 변할 수 있지만, 이름은 변하지 않음
- ex) urn:isbn:8969777331(어떤 책의 isbn URN)

<br>

## 3. URL 전체 문법

- 프로토콜 : https
- 호스트명 : www.google.com
- 포트 번호 : 443
- 패스 : /search
- 쿼리 파라미터 : q=hello&hi=ko

<br>

## 4. URL Scheme

- 주로 프로토콜 사용
- 프로토콜 : 어떤 방식으로 자원에 접근할 것인가 하는 약속 규칙 ex) http, https, ftp 등
- http는 80포트, https는 443 포트를 주로 사용, 포트는 생략 가능
- https는 http에 보안 추가(HTTP Secure)

<br>

## 5. URL userinfo

- URL에 사용자 정보를 포함해서 인증
- 거의 사용하지 않음
- ex) `scheme://[userinfo@]host[:port][/path][?query][#fragment]`
- ex) `https://wwww.google.com:443/search?q=hello&hl=ko`

<br>

## 6. URL Host

- 호스트명
- 도메인명 또는 IP 주소를 직접 사용가능
- ex) `scheme://[userinfo@]host[:port][/path][?query][#fragment]`
- ex) `https://wwww.google.com:443/search?q=hello&hl=ko`

<br>

## 7. URL Port

- 포트(PORT)
- 접속 포트
- 일반적으로 생략, 생략시 http는 80, https는 443
- ex) `scheme://[userinfo@]host[:port][/path][?query][#fragment]`
- ex) `https://wwww.google.com:443/search?q=hello&hl=ko`

<br>

## 8. URL Path

- 리소스 경로(path), 계층적 구조
- ex) `/home/file1.jpg`
- ex) `/members`
- ex) `/members/100, items/iphone12`

<br>

## 8. URL Query

- `key=value` 형태
- `?`로 시작, `&`로 추가 가능 `?keyA=valueA&keyB=valueB`
- query parameter, query string으로 불림, 웹 서버에서 제공하는 파라미터, 문자 형태

<br>

## 9. URL Fragment

- html 내부 북마크 등에 사용
- 서버에 전송하는 정보 아님
- ex) `https://docs.spring.io/sping-boot/docs/current/reference/html/getting-started.html#getting-started-introducing-spring-boot`

```toc

```
