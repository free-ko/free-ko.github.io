---
emoji: 👨‍💻
title: Clean React - 01. State
date: '2024-04-01 07:17:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: React
---

## ✅ 상태 소개

- 일단 상태부터 만들고 보는 초보에서 벗어나기

### 1. 일단 상태가 무엇일까

점점 어려워지는 상태관리가 문제일까? 상태를 대하는 태도가 문제일까?

- 상태 종류(언제 만드는지 고민, 왜 만드는지 고민, 왜 필요한지 고민)
  - 컴포넌트 상태
  - 전역 상태
  - 서버 상태
- 상태 관리
  - 상태 변경
  - 상태 최적화
  - 렌더링 최적화
  - 불변성
  - 상태 관리자

### 2. 거꾸로 생각하기

우리는 상태관리를 왜 하고 있는 것일까?

- 상태 관리는 목적인가? 수단인가?
- 상태 관리를 위해 앱을 개발하는 것일까?
- 앱을 개발하는데 상태는 왜 관리하는 것일까?

### 3. 일단 상태가 무엇인가?

- 상태 = State
- 사물, 현상이 놓여 있는 모양이나 형편
- ex) 무방비 상태, 정신 상태, 건강 상태, 이미 기차가 끊긴 상태

<br/>

# ✅ 올바른 초기값 설정

### 올바른 초기값 설정은 왜 중요할까?

- 렌더링 에러 처리 가능
- 초기값이 없을 경우, 해당 값을 통해서 계산하는 로직에서 에러 발생을 방지 할 수 있음

### 초기값

- 초기에 렌더링 되는 값
- 가장 먼저 렌더링 될 때, 순간적으로 보여질 수 있는 값

### 초기값 지키지 않을 경우

- 렌더링 이슈, 무한 루프, 타입 불일치로 의도하지 않는 동작 발생 ⇒ 런타임 에러 발생
- 초기값 넣지 않으면 `undefined` 값으로 셋팅 됨
- 상태를 CRUD ⇒ 상태를 **지울 때**도 초기값을 잘 기억해놔야 원상태로 돌아감.
- 빈값? `null` 처리 할 때 불필요한 방어코드도 줄여 줌

### 요약

- 초기 상태를 올바르게 설정하자

<br/>

## ✅ 업데이트 되지 않는 값

### 예시

- `INFO` 상수가 컴포넌트 안에 존재했을 때의 문제점
  - 상수를 다루거나 아니면 일반적인 방치
  - 컴포넌트가 렌더링 될 때마다 해당 객체가 새로 새성성되고 참조됨
  - 업데이트가 되지 않는 일반적인 객체
  - 리액트 상태로 바꾼다던가 혹은 아예 외부로 내보내야 함.

```jsx
const NotUpdateValue = (): Element => {
   const INFO = {
	   name: 'My Component'
	   value: 'Clean Code React'
   };

   const [count, setCount] = useState(0);

   const onIncrement = () => setCount((prevCount) => prevCount + 1);
   const onDecrement = () => setCount((prevCount) => prevCount - 1);

   return (
	   <div className="App">
		   <main className="App-main">
			   <header>{INFO}</header>
			   <ShowCount info={INFO} count={count} />
			   <ButtonGroup onDecrement={onDecrement} onIncrement={onIncrement} />
		   </main>
	   </div>
   )
}
```

### 참고

- [클린 리액트](https://www.udemy.com/course/clean-code-react/learn/lecture/41573010#overview)

```toc

```
