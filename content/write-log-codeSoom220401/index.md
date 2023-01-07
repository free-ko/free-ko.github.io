---
emoji: 🔥
title: '코드숨 React 7기 - 2주차 회고'
date: '2022-04-01 14:45:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: React
---

# ✅ Facts(사실, 객관)

### 1. React

- React 개념 학습
- React DOM 개념 학습

### 2. Components & Props

- Components & Props 개념 학습

### 3. React Hook

- React Hook 개념 학습
- useState 개념 학습

### 4. 선언형 프로그래밍

- 선언형 프로그래밍 개념

### 5. 관심사의 분리

- 관심사의 분리 개념 학습

<br>

# 🙋‍♂️ Feelings(느낌, 주관)

이번 주는 야근 때문에 몸도 마음도 지쳐있는 상태였다. 그래도 과제를 조금이라도 해서 PR 피드백을 받고자 노력을 했다.

그러나 많이 지쳐있던 탓이었을까, 빨리 과제를 마무리 하고 싶은 마음에 PR `Suggestion` 대해 깊게 생각하지 않고, 과제의 정답에 집중을 했다.

다행히 코드 리뷰 해주시는 분께서 정확한 피드백을 해주셔서, 정답이 아닌 `왜`에 초점을 둬야 한다는 사실을 깨닫고 차분히 `Suggestion`에 깊게 생각하는 시간을 가지게 되었다.

돌이켜보니 사실 일을 할 때에도, `왜`보다는 `정답`에 집중을 하며 일하고 있었다.

앞으로 아무리 몸과 마음이 지치더라도, 의식적으로 `왜`에 집중하며 학습과 업무를 해야겠다.

<br>

# 😋 Findings(배운점)

- React 17버전 이상부터는 `React imports`를 생략해도 된다는 사실을 알게 되어 적용해 보았다. 사용하는 라이브러리의 최신 업데이트 상황이 어떻게 되는지 확인하고, 트렌드를 인지하는 게 중요하다는 것을 배우게 되었다.

- React는 불변성의 값일 때에만 리렌더링을 한다는 사실 때문에 `useState`에서 정의한 배열, 객체 값들을 업데이트할 때에는, 새로운 값을 만들어서 `setState` 인자로 넣어줘야 리렌더링 된다는 사실도 알게 되었다. 무엇보다 그냥 막연히 사용하는 것이 아닌 내부 작동원리를 파악하며 사용하는 태도가 중요함을 알게 되었다.

- `setState`할 때, 기존의 상태 값을 가져와 바로 업데이트하는 방법을 알게 되었다.

- 이벤트 객체를 인자로 전달하기보다는 값을 전달하는 형태로 전달하면, 하위 컴포넌트와 의존성을 끊을 수 있다는 사실을 알게 되었다.

- 컴포넌트를 선언과 동시에 `export default`하게되면, 한눈에 이 컴포넌트는 밖에서도 사용할 수 있다고 인지 시킬 수 있음을 알게 되었다.

- 하위 컴포넌트에 전달된 함수 네이밍과 `HTML DOM` 이벤트 함수 네이밍이 같을 경우, 전달된 함수를 따로 핸들러 함수로 분리해 관리하면 좋다는 사실을 알게 되었다.

- `Guard Clauses` 패턴을 통해, 가독성 좋은 코드 작성 방법을 알게 되었다.

- 핸들러 함수를 명시할 때, `handle`과 `무엇`을 함수 네이밍에 넣게 되면 조금 더 가독성이 좋은 함수 네이밍이 된다는 사실도 알게 되었다.

<br>

# 👨‍💻 Affirmation(자기 선언)

- 컨디션 조절을 잘 하자.
- 답을 내기보다는 `왜`에 집중하자.
- JS, React 기본기를 이번 기회에 제대로 학습하자.

<br>
<br>

### 📕 참고

- [hooks에서 useState가 const로 선언되는 이유](https://dudghsx.tistory.com/18?utm_source=pocket_mylist)
- [[React] 배열 값 추가, 제거, 수정하며 불변성 유지하기](https://velog.io/@mnz/React-%EB%B0%B0%EC%97%B4-%EA%B0%92-%EC%B6%94%EA%B0%80-%EC%A0%9C%EA%B1%B0-%EC%88%98%EC%A0%95%ED%95%98%EB%A9%B0-%EB%B6%88%EB%B3%80%EC%84%B1-%EC%9C%A0%EC%A7%80%ED%95%98%EA%B8%B0?utm_source=pocket_mylist)
- [Guard Clauses](https://www.refactoring.com/catalog/replaceNestedConditionalWithGuardClauses.html)
- [useState](https://ko.reactjs.org/docs/hooks-reference.html#functional-updates)

```toc

```
