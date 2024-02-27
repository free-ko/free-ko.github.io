---
emoji: 👨‍💻
title: HTTP - 7.HTTP 일반 헤더(2)
date: '2021-12-26 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: CS
---

## ✅ HTTP 표현

### 방법

- Content-Type: 표현 데이터의 형식
- Content-Encoding: 표현 데이터의 압축 방식
- Content-Language: 표현 데이터의 자연 언어
- Content-Length: 표현 데이터의 길이
- 표현 헤더는 전송, 응답 둘다 사용

### Content-Type(표현 데이터의 형식 설명)

- 미디어 타입, 문자 인코딩
- ex) text/html; charset=utf-8
- ex) application/json
- ex) image/png

### Content-Encoding(표현 데이터 인코딩)

- 표현 데이터를 압축하기 위해 사용
- 데이터를 전달하는 곳에서 압축 후 인코딩 헤더 추가
- 데이터를 읽는 쪽에서 인코딩 헤더의 정보로 압축 해제
- ex) gzip, deflate, identity(압축안함)

### Content-Language(표현 데이터의 자연 언어)

- 표현 데이터의 자연 언어를 표현
- ex) ko, en, en-US

### Content-Length(표현 데이터의 길이)

- 바이트 단위
- Transfer-Encoding(전송 코딩)을 사용하면 Content-Length를 사용하면 안됨

```toc

```
