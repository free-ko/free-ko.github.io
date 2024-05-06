---
emoji: 👨‍💻
title: Clean React - 03. Component
date: '2024-05-01 07:27:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: React
---

# ✅ Component란?

### 🌈 결론

- 컴포넌트가 무엇인지 정확하게 인지하고 사용해야 함

### ✍️ 내용

### 공식 문서에서 Component 의미

1. 컴포넌트 의미(옛날)
   - 스스로 상태를 관리하는 캡슐화된 컴포넌트
   - 그리고 이를 조합해 복잡한 UI를 만듦
   - 컴포넌트 로직은 템플릿이 아닌 JS로 작성됨
   - 따라서 다양한 형식의 데이터를 앱 안에서 손쉽게 전달할 수 있고, DOM과 별개로 상태를 관리 할 수 있음
2. 컴포넌트 의미(New)
   - 기존에는
     - 웹 페이지를 만들 때 웹 개발자가 컨텐츠를 마크업한 다음 JS를 뿌려서 상호작용을 추가 함. 이는 웹에서 상호작용이 중요했던 시절에 효과적이었음
   - 이제는
     - 많은 사이트와 모든 앱에서 상호작용을 기대함
     - React는 동일한 기술을 사용하면서도 상호작용을 우선시함
     - React 컴포넌트는 마크업으로 뿌릴 수 있는 JS 함수 임
   - 참고
     - https://react.dev/learn/thinking-in-react

### Component란

- 사전적 의미: 구성하는, 구성하고 있는, 성분의 / 구성 요소, 성분

### ⭐️ 요약

- 컴포넌트 란
  - 많은 사이트와 모든 앱에서 상호작용을 기대함
  - React는 동일한 기술을 사용하면서도 상호작용을 우선시함
  - React 컴포넌트는 마크업으로 뿌릴 수 있는 JS 함수 임

<br>

# ✅ Self Closing Tags

### 🌈 결론

- `Self Closing Tags`를 정확히 인지하고 사용하자

### ✍️ 내용

1. `Self Closing Tags` 의미

   - 명시적으로 닫는 태그가 필요가 없음
   - 기본 HTML 요소인지 아닌지 명확한 차이를 가져야 함
   - `Vue`에서는 HTML에서 사용되어지는 header와 같은 태그 사용이 불가함 대신에 `app-header` 이런식으로 사용해야 함

   ```tsx
   function HelloWorld() {
     return (
       <Clean>
         <Code>
           <img />
           <br />
         </Code>
       </Clean>
     );
   }
   ```

- [참고](https://developer.mozilla.org/en-US/docs/Glossary/Void_element)

### ⭐️ 요약

- `Self Closing Tags`를 정확히 인지하고 사용하자

<br>

# ✅ Fragment 지향하기

### 🌈 결론

- Fragment가 무엇인지 알고 쓰자.

### ✍️ 내용

- React v16.2 출시
  - Fragment 런타임시 Fragment는 사라짐
  - Babel 버젼에 따라서 Fragment Short Cut 사용 여부도 확인해야 됨
  - index를 주입할 때, Short Cut이 아닌 Fragment 컴포넌트 사용해야 함
    ```tsx
    function Example() {
      return (
        <>
          <Child />
        </>
      );
    }
    ```
- 참고
  - [https://velog.io/@yeonsubaek/React-JSX-문법-컴포넌트에-여러-요소가-있을-때-하나로-감싸는-이유](https://velog.io/@yeonsubaek/React-JSX-%EB%AC%B8%EB%B2%95-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%97%90-%EC%97%AC%EB%9F%AC-%EC%9A%94%EC%86%8C%EA%B0%80-%EC%9E%88%EC%9D%84-%EB%95%8C-%ED%95%98%EB%82%98%EB%A1%9C-%EA%B0%90%EC%8B%B8%EB%8A%94-%EC%9D%B4%EC%9C%A0)

### ⭐️ 요약

- Fragment가 필요한 경우에만 사용하자.

<br>

# ✅ Fragment 지양하기


### 🌈 결론

- 상황에 따라 불필요한 Fragment를 줄이자.

### ✍️ 내용

- 불필요한 Fragment 사용을 줄이자.

```tsx
// 불필요한 계층 줄이기
function Example() {
	return (
		<>
			<div>
				<div>
				</div>
			</div>
		</>
	)
}
```

```tsx
function StringRender() {
	// return <>'Clean Code'</> ❌
	return 'Clean Code'
}
```

```tsx
// 렌더링 될 필요 없는 JSX 줄이기
function ConditionalRenderingEX() {
	return(
		<div>
			<h1>{isLoggedIn ? 'User' : <></>}</h1>
			<h1>{isLoggedIn ? 'User' : null}</h1>
			<h1>{isLoggedIn && 'User'}</h1>
			{isLoggedIn && <h1>User</h1>
		</dvi>
	)
}
```

### ⭐️ 요약

- 불필요한 Fragment 사용을 줄이자.

<br>

# ✅ 알아두면 좋은 컴포넌트 네이밍

### 🌈 결론

```tsx
function ComponentNaming() {
	return (
		<>
			<h1></h1> // 🤔 lowercase
			<h2></h2>
			<div></div>
			<input />
			<MyuComponent></MyComponent>  // 🤔 pascal case
			<my-component></my-component> // 🤔 kebab case
		</>
	)
}
```

### ✍️ 내용

### 컴포넌트 네이밍

- 일반적으로 컴포넌트 PascalCase
- 기본 HTML 요소는 lower case
- route based file name
    - `componet-naimng.jsx` ⇒ `<ComponentNaimng />`
    - `component-namaing/index.jsx` ⇒ `<ComponentNaimng />`

### ⭐️ 요약

- 컴포넌트 네이밍 규칙을 이해하고 사용하자

<br>

# ✅ JSX 컴포넌트 함수로 반환


### 🌈 결론

```tsx
// 🤔 어떤 형태가 맞을까?
	return (
		<div>
			{TopRender()}
			<TopRender />
			{rednerMain()}
		</div>
	)
```

### ✍️ 내용

- JSX 컴포넌트 함수로 반환시 문제점
    - 스코프가 꼬임
    - 언제 어떻게 쓰일지 몰라서 위험
    - 컴파일 과정에서 캐치 못하면 치명적인 오류 발생
    - 리턴 값이 무엇인지 파악하기 어려움
    - props 넣기가 힘듦

```tsx
function ReturnJSXFunction() {
	const TopRender = () => {
		return (
			<header>
				<h1>Clean Code JS</h1>
			</header>
		);
	};
	
	const rednerMain = () => {
		return (
			<main>
				<p>Clean Code</p>
			</main>
		)
	}
	
	return (
		<div>
			{TopRender()}
			{rednerMain()}
		</div>
	)
};
```

### ⭐️ 요약

- 함수로 return 하는 경우 다음과 같은 단점이 발생
    - scope를 알아보기 어려움
    - 반환 값을 바로 알기 어려움
    - props 전달 등 일반적인 패턴이 아님

<br>

### 참고

- [클린 리액트](https://www.udemy.com/course/clean-code-react/learn/lecture/41573010#overview)

```toc

```
