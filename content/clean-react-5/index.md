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

### 참고

- [클린 리액트](https://www.udemy.com/course/clean-code-react/learn/lecture/41573010#overview)

```toc

```
