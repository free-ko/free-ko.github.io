---
emoji: 👨‍💻
title: HTTP - 7.HTTP 일반 헤더(1)
date: '2021-12-25 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: CS
---

## ✅ HTTP 헤더 개요

### HTTP 헤더

- header-field = field-name ":" OWS field-value OWS (OWS:띄어쓰기 허용)
- field-name은 대소문자 구문 없음

### HTTP 헤더 용도

- HTTP 전송에 필요한 모든 부가정보
  - ex) 메시지 마디의 내용, 메시지 바다의 크기, 압축, 인증, 요청 클라이언트, 서버 정보, 캐시 관리 정보 등
- 표준 헤더가 너무 많음
- 필요시 임의의 헤더 추가 기능 ex) helloworld: hihi

### HTTP 헤더 분류 - 과거(RFC2616)

- General 헤더: 메시지 전체에 적용되는 정보 ex) Connection: close
- Request 헤더: 요청 정보 ex) User-Agent: Mozilla/5.0
- Response 헤더: 응답 정보 ex) Server: Apache
- Entity 헤더: 엔티티 바디 정보 ex) Content-Type: text/html, Content-Length: 3423

### HTTP Body - 과거(RFC2616)

- 메시지 본문은 엔티티 본문을 전달하는 사용
- 엔티티 본문은 요청이나 응답에서 전달할 실제 데이터
- 엔티티 헤더는 엔티티 본문의 데이터를 해석할 수 있는 정보 제공
  - 데이터 유형(Html, Json), 데이터 길이, 압축 정보 등

### RFC723x 변화

- 엔티티(Entity) —> 표현(Representation)
- Representation = representation Metadata + Representation Data
- 표현 = 표현 메타 데이터 + 표현 데이터

### HTTP BODY - 현재

- 메시지 본문을 통해 표현 데이터 전달
- 메시지 본문 = 페이로드
- 표현은 요청이나 응답에서 전달할 실제 데이터
- 표현 헤더는 표현 데이터를 해석할 수 있는 정보 제공
  - 데이터 유형, 데이터 길이, 압축 정보 등
- 참고: 표현 헤더는 표현 메타 데이터와, 페이로드 메시지를 구분해야 함

```toc

```
