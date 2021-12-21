---
emoji: 👨‍💻
title: HTTP - 5.메서드 활용(2)
date: '2021-12-22 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: CS
---

<br>

<h1 align="center">
  👋  HTTP API 설계 예시
</h1>

<br>

## 1.API 설계

1. HTTP API - 컬렉션
   - POST 기반 등록 ex) 회원 관리 API 제공
2. HTTP API - 스토어
   - PUT 기반 등록 ex) 정적 컨텐츠 관리, 원격 파일 관리
3. HTML FORM 사용
   - 웹 페이지 회원 관리
   - GET, POST만 지원

<br>

## 2.회원 관리 시스템 : API 설계 - POST 기반 등록

1. 회원 목록 `/members`—> GET
2. 회원 등록 `/members` —> POST
3. 회원 조회 `/members{id}` —> GET
4. 회원 수정`/members{id}` —> PATCH, PUT, POST
5. 회원 삭제`/members{id}` —> DELETE

<br>

## 3.회원 관리 시스템 : POST - 신규 자원 등록(실무에서 사용)

1. 클라이언트는 등록될 리소스의 URI를 모른다.

   - 회원 등록 `/members` —> POST
   - POST `/members`

2. 서버가 새로 등록된 리소스 URI를 생성해준다.

   - HTTP/1.1 201 Create Location: `/members/100`

3. 컬렉션
   - 서버가 관리하는 리소스 디렉토리
   - 서버가 리소스의 URI를 생성하고 관리
   - 여리서 컬렉션은 `/members`

<br>

## 4. 파일 관리 시스템 : API 설계 - PUT 기반 등록

1. 파일 목록 `/files` —> GET
2. 파일 조회 `/files/{finename}` —> GET
3. 파일 등록 `/files/{finename}` —> PUT
4. 파일 삭제 `/files/{finename}` —> DELETE
5. 파일 대량 등록 `/files` —> POST

<br>

## 5.파일 관리 시스템 : PUT - 신규 자원 등록 특징

1. 클라이언트가 리소스 URI를 알고 잇어야 한다.
   - 파일 등록 `/files/{filename}` —> PUT
   - PUT `/files/star.jpg`
2. 클라이언트가 직접 리소스의 `URI`를 지정한다.
3. 스토어
   - 클라이언트가 관리하는 리소스 저장소
   - 클라이언트가 리소스의 URI를 알고 관리
   - 여기서 스토어는 `/files`

<br>

## 6.HTML FORM 사용

1. HTML FORM은 GET, POST만 지원
2. 컨트롤 URI
   - GET, POST만 지원하므로 제약이 있음
   - 이런 제약을 해결하기 위해 동사로 된 리소스 경로 사용
   - POST의 `/new`, `/edit`, `/delete`가 컨트롤 URI
   - HTTP 메서드로 해결하기 애매한 경우 사용(HTTP API 포함)
3. AJAX 같은 기술을 사용해서 해결 가능 —> 회원 API 참고
4. 순수 HTML, HTML FORM 이야기
5. GET, POST만 지원하므로 제약이 있음
6. API 설계
   - 회원 목록 `/members` —> GET
   - 회원 등록 폼 `/members/new` —> GET
   - 회원 등록 `/members/new`, `/members` —> POST
   - 회원 조회 `/members{id}` —> GET
   - 회원 수정 폼 `/members/{id}/edit` —> GET
   - 회원 수정 `/members/{id}/edit`, `/members/{id}` —> POST
   - 회원 삭제 `/members/{id}/delete` —> GET

<br>

## 7.정리 : 참고하면 좋은 URI 설계 개념

1. 문서 : Document
   - 단일 개념(파일 하나, 객체 인스턴스, 데이터베이스 row) ex) `/members/100`, `/files/star.jpg`
2. 컬렉션 : Collenction
   - 서버가 관리하는 리소스 디렉터리
   - 서버가 리소스의 URI를 생성하고 관리
     ex) `/members`
3. 스토어 : Store
   - 클라이언트가 관리하는 자원 저장소
   - 클라이언트가 리소스의 URI를 알고 관리 ex) `/files`
4. 컨트롤러, 컨트롤 URI
   - 문서, 컬렉션, 스토어로 해결하기 어려운 추가 프로세스 실행
   - 동사를 직접 사용 ex) `/members/{id}/delete`

```toc

```
