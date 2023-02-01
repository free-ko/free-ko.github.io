---
emoji: 👨‍💻
title: 함수형 프로그래밍 - 스터디 7주차
date: '2023-02-01 12:52:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

# ✅ 복습
### 1부
1. <b>액션, 계산, 데이터</b>로 나누는 것이 중요
2. 함수형 프로그래밍의 기본은 데이터를 변하는 것과 변하지 않는 것을 나뉘어서 구분하는 것
3. 명시적 입력과 출력을 만들자(불변성) Ex) `const` 를 통해서, 카피온라이트를 사용할 수 있다.
4. 계층적 구조 : 계산(스키마, 비즈니스로직, 유틸)
5. `PipeLine`의 개념을 이해하는 것이 중요
    - `Data → Action → Action → Data -> ...` 의 구조를 아는 것이 중요

### 2부
1. 함수형 기법
    - 1급 함수 : 함수로 인자를 받고 반환하는 것
2. 계산을 다시 비지니스 로직과 유틸로 구분하는 법을 배우면서 동시에 "함수형 언어가 가지고 있는 1급이라는 개념과 함수형 유틸성" 을 이해하기 위한 "기초"를 배우는 것
3. Iterator와 Generator는 실무 자바스크립트에서는 잘 쓰이지 않음
   - `액션 / 계산 / 데이터` 와 `파이프라인 아키텍쳐` 는 함수형 프로그래밍에서 중요
4. 함수형 프로그래밍은 "유틸리티 함수들의 모음집" 같은 것이 아님
5. **"함수형 프로그래밍이란 단방향 데이터 처리의 파이프라인"** 이라는 감각이 이해가 된다면, Array의 map, filter, reduce를 그저 유틸리티 함수가 아니라, 함수형 프로그래밍의 관점에서 전혀 다른 시각으로 위 method들을 바라 볼 수 있음

<br/>

# ✏️ 배운 내용
- 제너레이터를 통해 파이프라인 개념을 확장하는 유틸 개발
  - 불필요한 동작 없애기
- 지연평가와 파이프 라인 함수 만들기
- Util 함수들을 `Symbol.iterator`를 사용해서 `for - of`문 적용(map, filter, reduce)
2. function의 최상위 타입은(Function → Object) Object가 최상위 타입이기 때문에, Arrow 함수에서 제너레이터를 사용할 수 없음
3. 만약에 `forEach` Arr에 **객체**가 들어간다면??(이것을 고민하는 것이 성장을 합니다.)
    - 함수 확장을 어떻게 할까? → 결국 지연평가인 iterable한것을 만든다.
        - 조건문 처리(분기 처리) : array, obj
            - `if(Array instaneof obj)` 분기 처리 → `Iterable`로 만들기
        - 조건문 축약 & 변수 합치기
        - 전역변수 반환

<br/>

# ⭐️ 질문 & 대답
- 에로우 함수 특징 : this가 undfeind이여서 사용 하지 않음, arg 없음
- 지연 평가를 사용하는 이유
    - ES6, 이터레이터가 V8엔진에서 최적화 작업을 해 놓았기 때문에 일반 map 보다 거의 30배 가량 빠름
- `맞는가?` 가를 고민하기 보다는 `최선인가?` 라는 질문이 더 좋다. ex) lodash가 그만큼 고민을 해서 만들어졌기 때문에 우리가 따라가면서 '왜'이렇게 작성했는지 고민해보자.

<br/>

### 참고
- [함수형 프로그래밍 스터디](https://github.com/FECrash/FunctionalProgramming)
- [지연평가를 통한 성능 개선](https://armadillo-dev.github.io/javascript/whit-is-lazy-evaluation/)
- 유인동님 강의
    - [https://www.youtube.com/watch?v=Y8d5P9M51xs](https://www.youtube.com/watch?v=Y8d5P9M51xs)
    - [https://www.youtube.com/watch?v=4sO0aWTd3yc](https://www.youtube.com/watch?v=4sO0aWTd3yc)

```toc
```
