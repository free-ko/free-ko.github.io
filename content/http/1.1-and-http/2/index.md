---
emoji: 👋
title: 'HTTP/1.1과 HTTP/2.0'
date: '2024-01-24 07:25:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## ✅ HTTP/1.1

- **지속 연결(Persistent Connections)**: 하나의 TCP 연결을 통해 여러 HTTP 요청과 응답을 처리할 수 있습니다.
- **청크 전송(Chunked Transfer)**: 데이터를 청크 단위로 전송하여 동적 콘텐츠 전송을 용이하게 합니다.
- **캐시 제어(Cache Control)**: 세밀한 캐싱 옵션을 제공하여 웹 성능을 개선합니다.
- **에러 처리 개선**: 다양한 HTTP 상태 코드를 통해 더 명확한 에러 응답을 제공합니다.

<br>

## ✅ HTTP/2.0

- **멀티플렉싱(Multiplexing)**: 하나의 연결에서 여러 요청과 응답을 동시에 처리할 수 있습니다.
- **헤더 압축(Header Compression)**: HPACK 압축을 사용하여 헤더 데이터를 효율적으로 전송합니다.
- **서버 푸시(Server Push)**: 서버가 클라이언트의 요청을 기다리지 않고 능동적으로 리소스를 푸시할 수 있습니다.
- **HTTPS와의 통합**: 대부분 HTTPS와 함께 사용되어 보안을 강화합니다.

<br>

## 참고

```toc

```
