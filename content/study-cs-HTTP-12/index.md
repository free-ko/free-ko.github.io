---
emoji: 👨‍💻
title: HTTP - 6.상태코드
date: '2021-12-23 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: CS
---

## ✅ HTTP 상태코드

### 상태 코드: 클라이언트가 보낸 요청의 처리 상태를 응답에서 알려주는 기능

1. 1XX : 요청이 수신되어 처리 중(Informational) —> `거의 사용하지 않음`
2. 2XX : 요청 정상 처리(Successful)
3. 3XX : 요청을 완료하려면 추가 행동이 필요(Redirection)
4. 4XX : 클라이언트 오류, 잘못된 문법 등으로 서버가 요청을 수행할 수 없음
5. 5XX : 서버 오류, 서버가 정상 요청을 처리하지 못함(Server Error)

<br>

### Q) 만약 모르는 상태 코드가 나타나면?

1. 클라이언트가 인식할 수 없는 상태코드를 서버가 반환하면?
2. 클라이언트는 상위 상태코드로 해석해서 처리
3. 미래에서 새로운 상태 코드가 추가되어도 클라리언트를 변경하지 않아도 됨

   - ex) 299 ??? —> 2XX : `Successful`
   - ex) 451 ??? —> 4XX : `Client Error`
   - ex) 599 ??? —> 5XX : `Server Error`

```toc

```
