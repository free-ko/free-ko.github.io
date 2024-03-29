---
emoji: 👨‍💻
title: 함수형 프로그래밍 - 스터디 3주차
date: '2023-01-26 10:24:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

# 👋 복습
- 함수형 사고에서 말하는 `액션 / 계산 / 데이터`의 3가지 영역으로 나눠서 만들어진 함수들간의 계층을 시각화 함
- 더 나은 구조에 대해서 생각하고, 요구사항의 추가나 변화가 발생했을 때, 꼭 필요한 만큼의 `추가/변화`가 발생하는지 혹은 더 복잡한 사항이 발생하는지 팀끼리 실습을 함

<br/>

# 🙋‍ FE의 요구 사항이란?
- 사용자가 특정 `액션(동작)`을 하면
- 관련된 `기존 데이터`를 찾아서,
- 특정 `조건에 의해` 기존 `데이터를 가공` 하고,
- 그 결과를 다시 `사용자가 보기 편하게 바꿔서` 화면에 보여주는 큰 틀을 가짐

<br/>

# 👀 계층과 흐름에 관한 보충 설명
- 계층 보단, `흐름(요구 사항)`을 먼저 생각해보자.
- 위 요구 사항을 보면, `함수들 간의 순서`를 잡고, 함수 전 후 데이터들의 Input & Output을 생각해보자.
- `계산`은 명시적 입출력이 있는 함수라면, `액션`은 암묵적 입출력이 있는 함수.
- 이렇게 여러개의 큰 흐름을 그리다 보면, 같은 계층의 함수 그룹을 발견 할 수 있음.
- 계층에 대한 개념이 확립되고 나면 새로운 요구사항들을 구현할 때, 요구사항에 맞게 계층에 맞는 함수들을 조립하는 형식으로 발전 가능

<br/>

### 참고
- [함수형 프로그래밍 스터디](https://github.com/FECrash/FunctionalProgramming)

```toc
```
