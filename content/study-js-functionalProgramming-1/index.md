---
emoji: 👨‍💻
title: 함수형 프로그래밍 - 스터디 1주차
date: '2023-01-22 14:35:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

<br>

# ✅ 1주차 배운 내용
1. 테스터 입장에서 `돌아가기는 하지만 좋지 않은 코드`가 왜 문제인지, 어떻게 하면 이 코드를 더 좋은 코드로 만들 수 있을지 고민하는 시간 갖음.
2. `액션, 계산, 데이터` 관점으로 사고하는 방법
3. `실용적인` 함수형 프로그래밍 기술보다는 `함수형 사고` 에 초점을 맞추는 관점
4. `데이터 —> 액션(계산) —> 원하는 결과`의 데이터를 만드는 사고 방식
5. 계산
   - 입력값과 반환값이 존재
   - 언제나 같은 입력에 대해서는 같은 결과를 반환
   - 테스트 용이하다는 특징을 갖음
6. 액션
    - 호출 시점에 따라서 행동이 달라짐.(시점과 횟수가 중요)
    - 시점과 횟수마다 액션이 달라지기 때문에, 테스트 코드를 짜기 힘듬.
7. 액션 안에서 계산으로 뽑을 있는 코드를 분리하고 액션 -> 계산 -> 계산 -> 계산 -> 액션 -> 데이터 같은 계층 구조를 만들어 내는 것이 함수형 프로그래밍이고 즉, 함수형 사고
8. 우리가 직접 계산을 통해, 데이터를 조작하는지 혹은 간접으로 계산을 통해 데이터를 조작하는지에 따라 관점이 다름.
9. 함수의 목표가 무엇인지, 함수 안에서 어떠한 역할이 필요한지 파악한 뒤에 코드 작성하는 의식적 노력 필요.

<br/>

### 참고
- [함수형 프로그래밍 스터디](https://github.com/FECrash/FunctionalProgramming)

```toc
```
