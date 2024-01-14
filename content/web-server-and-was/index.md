---
emoji: 👋
title: 'Web Server와 WAS 정리'
date: '2024-01-14 10:42:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## ✅ Static Pages vs Dynamic Pages

1. Static Pages

   - Web Server는 파일 경로 이름을 받아 경로와 일치하는 파일 컨텐츠를 반환함.
   - 이때 항상 동일한 페이지를 반환하게 됨. ex) image, html, css, javascript 파일과 같이 컴퓨터에 저장되어 있는 파일들

2. Dynamic Pages

   - Web Server에 의해서 실행되는 프로그램을 통해서 만들어진 결과물로, 인자의 내용에 맞게 동적인 컨텐츠를 반환함

<br>

## ✅ Web Server vs WAS

- 웹 서버는 소프트웨어와 하드웨어로 구분됨
- 웹 서버는 HTTP 프로토콜을 기반으로 클라이언트(웹 브라우저 또는 웹 크롤러)의 요청을 서비스하는 기능을 담당함. 요청에 따라 아래의 두 가지 기능 중 적절하게 선택하여 수행함
  - 정적인 컨텐츠 제공: WAS를 거치지 않고 바로 자원을 제공함
  - 동적인 컨텐츠 제공을 위한 요청 전달: 클라이언트의 요청(Request)을 WAS에 보내고, WAS가 처리한 결과를 클라이언트에게 전달(응답, Response)한다. 이때 클라이언트는 일반적으로 웹 브라우저를 의미함.

1. Web Server

   - 하드웨어: Web 서버가 설치되어 있는 컴퓨터
   - 소프트웨어: 웹 브라우저 클라이언트로부터 HTTP 요청을 받아 정적인 컨텐츠(.html .jpeg .css 등)를 제공하는 컴퓨터 프로그램

2. WAS(Web Server + Web Container)
   - WAS는 DB 조회나 다양한 로직 처리를 요구하는 동적인 컨텐츠를 제공하기 위해 만들어진 애플리케이션 서버로, HTTP를 통해 컴퓨터나 장치에 애플리케이션을 수행해주는 미들웨어(소프트웨어 엔진)임.
   - WAS는 “웹 컨테이너(Web Container)” 혹은 “서블릿 컨테이너(Servlet Container)”라고도 불리는데, 여기서 Container란 JSP, Servlet을 실행시킬 수 있는 소프트웨어를 말함. 즉, WAS는 JSP, Servlet 구동 환경을 제공함
   - WAS는 주로 DB 서버와 같이 수행되며, 클라이언트로부터 웹 서버가 요청을 받으면 애플리케이션에 대한 로직을 실행하여 웹 서버로 다시 반환해줌. (현재는 WAS가 가지고 있는 Web Server도 정적인 컨텐츠를 처리하는 데 있어서 성능상 큰 차이는 없음)
   - WAS의 주요 기능: 프로그램 실행 환경과 DB 접속 기능 제공, 여러 개의 트랜잭션(논리적인 작업 단위) 관리 기능, 업무를 처리하는 비즈니스 로직 수행
   - WAS의 예 ex) Tomcat, JBoss, Jeus, Web Sphere 등

| (Java) Servlet: 자바를 사용하여 웹페이지를 동적으로 생성하는 서버측 프로그램 혹은 그 사양을 말하며, 흔히 “서블릿”이라 불림. 자바 서블릿은 웹 서버의 성능을 향상하기 위해 사용되는 자바 클래스의 일종임

<br>

## 참고

```toc

```
