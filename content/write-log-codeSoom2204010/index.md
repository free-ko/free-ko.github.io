---
emoji: 🔥
title: '코드숨 7기 - 3주차 회고'
date: '2022-04-10 16:02:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

# ✅ Facts(사실, 객관)

### 1. Jest

- Jest 개념 및 사용 방법 학습

### 2. TDD

- TDD 개념과 TDD를 해야 하는 이유 학습
- 과제를 통해 React로 TDD 하는 방법 숙지

### 3. 추가 공부

- JS 기본기가 많이 부족한 것 같아, 엘리님의 JS 기본 개념 강의를 수강하기 시작했다.
- TDD 익숙하지 않아, 엘리님의 React TDD 강의를 수강하기 시작하였다.

<br>

# 🙋‍♂️ Feelings(느낌, 주관)

- 테스트 코드가 익숙하지 않아, 코드숨 참여하는 사람들의 코드와 리뷰어님이 피드백 주신 내용과 관련 자료들을 찾아보았다.
- 커밋을 할 때, 의미있는 커밋 내용과 작은 단위의 코드 진행 사항을 작성하지 못 했다.

<br>

# 😋 Findings(배운점)

- `describe`, `context`, `it` 을 통해 테스트 코드의 범주화를 할 수 있다.
- `context` 을 통해, 테스트 맥락을 구분할 수 있다.
- `it` 다음 테스트 구문에는 3인칭 복수인 `s`를 붙여야 한다.
- 컴포넌트 테스트를 명시할 때, 굳이 component를 붙일 필요가 없다.
- 엘리먼트 랜더링 테스트 구문을 `has`보다는 `renders`로 명시한다.
- 테스트 코드를 통해 인터페이스나 의도를 파악할 수 있도록 작성하는 것이 중요하다.
- `getBy~`와 `queryBy~`의 차이점
  1. `getBy~` : 는 쿼리에 매칭하는 노드가 있으면 return 한다. 하지만 매칭하는 엘리먼트가 없거나 매칭하는 노드가 1개보다 많다면 에러를 발생시키며, `getAllBy` 를 사용하는 것이 적절하다는 것을 알린다.
  2. `queryBy~` : 는 쿼리에 맞는 노드를 return 하며, 만약 매칭하는 엘리먼트가 없다면 `null`
      을 return 한다. `getBy~` 와 마찬가지로, 쿼리에 맞는 요소가 1개보다 많으면 에러를 발생시키며, `queryAllBy` 를 사용하는 것이 적절하다는 것을 알린다.
- `beforeEach`를 통해 moking한 함수를 초기화 해 줄 수 있다.

<br>

# 👨‍💻 Affirmation(자기 선언)

- 코드를 작성할 때, `왜`를 항상 먼저 생각하고 코드를 작성하자.
- 조급함을 내려놓고, 차분히 학습하자.
- 몸과 멘탈 관리를 잘 하자.

<br>
<br>

### 📕 참고

- [벨로퍼트와 함께하는 리액트 테스팅](https://learn-react-test.vlpt.us/#/)
- [아샬님의 테스트 코드](https://github.com/ahastudio/til/blob/main/blog/2018/12-08-given-when-then.md#let)
- [테스트 코드 연습 페이지](https://github.com/goldbergyoni/javascript-testing-best-practices#-%EF%B8%8F-12-structure-tests-by-the-aaa-pattern)
- [context 사용 방법](https://www.betterspecs.org/#contexts)
- [React 테스트 코드 관련 글](https://intzzzero.netlify.app/blog/i-want-tdd)

```toc

```
