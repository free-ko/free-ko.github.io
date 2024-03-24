---
emoji: 👨‍💻
title: Clean Code JS - 01. 변수 다루기
date: '2024-03-24 19:40:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

## ✅ 클린코드 고민해야 하는 이유

1. 타인(강사, 시니어, 네임드 개발자 등)이 정의한 답을 의심
   - 맹목적으로 믿지 않아야 함 → 믿어버리면 생각하는 것을 포기 하기 때문 → **생각을 해야 함.**
2. 배움에 열린 태도를 갇기
   - 디자인 패턴, 구조 라이브러리, 설계에 대해 열린 태도로 학습
3. 직접 생각하고 또 고민.
4. 흔히 알려진 JS 코드 스타일에 대한 견해를 탐구
   - ex) AirBnb, Google, ECMA, Prettier, ESLint, JSLint, JSHint 등

<br/>

# ✅ 타입스크립트란?

### JS

- `Dynamically typed`
- 실시간으로 타입이 결정이 되어 런타임 환경 때 에러가 발생할 수 있음.
- 객체지향 프로그래밍 언어(Prototype-Based로 구현 가능)
- `Contractor Functions`이용하면 클래스를 이용해서 오브젝트를 만드는 것처럼 간편하게 오브젝트 만들 수 있음
- 하지만 이 자체만으로 강력한 객체지향 프로그래밍을 하기가 조금 어려움
- 물론 ES6에서 클래스가 도입되었지만 이것도 프로토타입 베이스로 하고 있어 클래스만으로 할 수 있는 것이 제한적임

### TS

- JS에 `타입`이 더해짐
- `Statically Typed` 컴파일 시간 때 에러를 잡을 수가 있음
- 다른 클래스를 베이스로한 객체지향 프로그래밍 언어처럼 `class`, `interface`, `generic`도 활용할 수 있음
- 현재 이용가능한 JS 문법 뿐만아니라 미래에 만들어지는 문법, JS에 없는 문법 그 이상의 것으로 코딩 가능
- 모든 브라우저에서 호환이 되도록 만들 수 있음
- JS가 동작하는 어떤 곳에서도 대체해서 사용 가능
- Client-Side뿐만 아니라 Server-Side에서 즉 JS 런타임 환경이 존재하는 어떤 곳에서도 사용이 가능함
- 그 이유는 TS 코드를 `Trans Compiling`해서 JS로 변환 함(이 때 TS자체 컴파일러 or 바벨이용)

<br/>

### 참고

- [클린코드 JS 유데미 강의](https://www.udemy.com/course/clean-code-js/)

```toc

```
