---
emoji: 👨‍💻
title: Clean React - 05. Hooks
date: '2024-05-17 07:24:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: React
---

# ✅ Hooks API

### 🌈 결론

- Hook이 왜 생겨났는지 알고 쓰자

### ✍️ 내용

- 왜 Hooks API가 생겨났나?

### HOC

- 컴포넌트 로직을 재 사용하기 위한 React 고급 기술
- 고차 컴포넌트(HOC)는 React API의 일부가 아니며, React의 구성적 특성에서 나오는 패턴

  ```tsx
  const EnhancedComponent = higherOrderComponent(WrappedComponent);

  // 사용
  export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
  ```

### Render Props

- React 컴포넌트 간에 코드를 공유하기 위해 함수 props를 이용하는 간단한 기술
- 구현된 컴포넌트는 자체적으로 렌더링 로직을 구현하는 대신, React 엘리먼트 요소를 반환하고 이를 호출하는 함수를 사용
  ```tsx
  <DataProvider render={(data) => <h1>Hello {data.target}</h1>} />
  ```

### SFC

```tsx
class ClassComponent extends React.Component {
	render() {
		return <div>{this.props.name}</div>
	}
}

vs

const STatelessComponent = props = > <div>{props.name}</div>;
```

### 정리

- Hook 사용 방법

  ```tsx
  import React, { useState, useEffect } from 'react';

  function Example() {
  	// State 관리 영역
  	const [count, setCount] = useState(0);

  	// State가 변했을 때, 추가 렌더링 작업 영역
  	// componentDidMount, componentDidUpdate와 비슷
  	useEffect((
  		document.title = `You clicked ${count} times`;
  	) => {}, [])

  	return (
  		<div>
  			<p>You clicked {count} times</p>
  			<button onClick={() => setCount(count + 1)}>
  				Click Me
  			</button>
  		</div>
  	);
  }
  ```

### ⭐️ 요약

- Hook 생긴 이유와 그 과정을 알 때, 왜 Hook을 사용하는지 알 수 있음

<br>

# ✅ useEffect() 기명함수와 함께 사용하기

### 🌈 결론

- `useEffect` 에러 파악할 때, 기명함수 사용하면 파악하기 쉬움

### ✍️ 내용

1. `useEffect` 안전하게 사용하기
   - 에러 파악 cf) console.log, report, monitoring, React Devtools
   - 기명함수로 넘기면 로그에 기명함수로 찍히기 때문에 에러 파악이 용이함

```tsx
// 기명함수로 가용하기
useEffect(
  function isInViewSomeComponent() {
    // some logic
  },
  [isInView],
);

useEffect(
  function onPopState() {
    if (navigationType === 'POP') {
      // some logic
    }
  },
  [isInView],
);

useEffect(function onInit() {
  // some logic
});

useEffect(function addEvent() {
  document.addEventListener();

  return function removeEvent() {
    document.removeEventListener();
  };
}, []);
```

### ⭐️ 요약

- 기명함수를 잘 사용해서 에러 파악 및 코드 파악을 용이하게 하자

<br>

# ✅ 한 가지 역할만 수행하는 useEffect

### 🌈 결론

- `useEffect` 를 작성할 때, 한가지의 역할을 할 수 있도록 작성하자.

### ✍️ 내용

- SRP - 단일책임 원칙
  - 하나의 역할만 수행하는 무언가를 만들자 ⇒ `useEffect()`
  - 확인 하는 방법
    - 기명 함수를 작성해보자
    - Dependency Arrays가 너무 많은 관찰 대상이 들어가고 있는게 아닌지 확인

```tsx
function LoginPage({ token, newPath }) {
  // ❌ 위험
  useEffect(() => {
    redirect(newPath);

    const userInfo = setLogin(token);
    // ... 로그인 로직
  }, [token, newPath]);

  // ✅ 분리

  useEffect(() => {
    redirect(newPath);
  }, [newPath]);

  useEffect(() => {
    const userInfo = setLogin(token);
    // ... 로그인 로직

    if (options) {
      // 부가적인 로직 <= 추가 동작해도 이상이 없고 부작용이 생길 일이 업을 경우
    }
  }, [token, options]);
}
```

### ⭐️ 요약

- `useEffect` 를 사용할 때, 한 가지 역할만 할 수 있도록 작성하자.

<br>

### 참고

- [클린 리액트](https://www.udemy.com/course/clean-code-react/learn/lecture/41573010#overview)

```toc

```
