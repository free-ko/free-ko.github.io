---
emoji: 👨‍💻
title: HTTP - 1.인터넷 네트워크
date: '2021-12-11 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: CS
---

<br>

<h1 align="center">
  👋  인터넷 네트워크
</h1>

<br>

## 1. 인터넷 통신

- 클라이언트에서 특정 요청을 하면 서버에서 요청을 확인하고 다시 클라이언트에서 보내주는 방식.
- 클라이언트와 서버를 연결해주는 무수한 연결망을 인터넷이라고 함.

<br>

## 2. IP(Internet Protocol)

### 1). IP 역할

- 클라이언트 IP와 서버 IP를 명시해서 정확한 위치에 원하는 요청을 함
- 지정한 IP(IP Address)에 데이터 전달
- 패킷(Packet)이라는 통신 단위로 데이터 전달
  —> 패킷은 약간 편지 같은거? 보내는사람, 받는 사람 적어서 보내는 것처럼 데이터를 전달 할 때 `규칙`이 존재

### 2). 서버 패킷 전달

- 인터넷을 통해 서버(주소)에게 데이터를 전달하는데, 다시 서버에서 클라이언트에게 전달 될 때에는 같은 경로로 오지 않을 수 있음

### 3). IP 프로토콜의 한계 —> TCP, UDP로 해결 가능

1. `비연결성` : 패킷을 받을 대상이 없거나 서비스 불능 상태여도 패킷 전송
2. `비신뢰성` : 중간에 패킷이 사라지면? 패킷이 순서대로 안오면?
3. `프로그램 구분` : 같은 IP를 사용하는 서버에서 통신하는 App이 둘 2상이면?

<br>

## 3. TCP, UDP

### 1). TCP 특징

1. 연결 지향 - TCP 3 Way HandShake(가상 연결) : 실제로 연결되지 않고 명목상으로 서버랑 연결했다고 이야기하는 것 사실 그 과정에 많은 서버(노드)가 존재함
2. 데이터 전달 보증
3. 순서 보장
4. 신뢰 할 수 있는 프로토콜
5. 현재는 대부분 TCP 사용

<br>

### 2). UDP

1. 하얀 도화지에 비유(기능이 거의 없음)
2. 연결 지향 X
3. 데이터 전달 보증 X
4. 순서 보장 X
5. 데이터 전달 및 순서가 보장되지 않지만, 단순하고 빠름
6. IP와 거의 같음 + PORT + 체크섬 정도만 추가
7. 애플리케이션에서 추가 작업 필요

<br>

## 4. PORT

1. IP는 아파트, PORT는 동, 호수라고 생각하면 됨
2. IP에 추가로 각각의 PORT 존재

   ex) `클라이언트 IP`: 100.100.100.1 PORT 8080 —> `서버 IP`: 200.200.200.2 PORT 1120 이런식으로 보냄

3. PORT 번호
   1. 0 ~ 65535 할당가능
   2. 0 ~ 1023: 잘 알려진 포트, 사용하지 않는 것이 좋음
      - FTP : 20, 21
      - TELNET : 23
      - HTTP : 80
      - HTTPS : 443

<br>

## 5. DNS

- 도메인 네임 시스템 = Domain Name System
  - ex) 전화번호부, 도메인 명을 IP주소로 변환

```toc

```