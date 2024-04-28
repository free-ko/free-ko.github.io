---
emoji: 👨‍💻
title: Clean React - 02. Props
date: '2024-04-19 07:27:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: React
---

# ✅ 불필요한 PROPS 복사 및 연산

### 🌈 결론

```tsx
// 변경 전
function component({ value }) {
  const [copyValue] = useState(무거운_연산(value));

  return <div>{copyValue}</div>;
}

// 변경 후
function component({ value }) {
  const [copyValue] = useMemo(() => 무거운_연산(value), [value]);

  return <div>{copyValue}</div>;
}
```

### ✍️ 내용

- `props`로 전달 받은 값을 `useState`에서 셋팅하는 것이 아닌, 바로 사용하는 것이 좋음
- 아래와 같이 `props`로 전달 받은 값을 가지고 무거운 연산을 진행하면, 렌더링할 때마다 해당 컴포넌트가 호출되어서 연산을 지속적으로 하기 때문에 비효율적임 → 그래서 애초에 `props`로 전달하기 전에 이미 무거운 연산을 한 결과 값을 `props`로 전달을 해야 함, 아니면 `useMemo`를 사용

  ```tsx
  function CopyProps({ value }) {
    const copyValue = 값_비싸고_무거운_연산(value);
    const [copyValue] = useMemo(() => 무거운_연산(value), [value]);

    return <div>{copyValue}</div>;
  }
  ```

### ⭐️ 요약

불필요한 연산을 줄이는 방법

- `Props` 바로 사용하기(`useState` 담기 X, 무거운 연산의 `props`로 사용 X)
- 연산된 값을 `Props`로 넘기기
- `useMemo`로 연산 최적화하기

<br>

# ✅ Curly Braces

---

### 🌈 결론

- 중괄호(Curly Braces) 사용법

```tsx
<Image alt="image" src="image.jpg" style={{ width: 100 }} className="clean-div" />
```

### ✍️ 내용

- Curly Brace 사용 O
  - 값이 계산되는 경우(논리적인 숫자, Boolean, 객체, 배열, 함수 표현식)
  - 객체를 넣어야 하는 경우
- Curly Brace 사용 X
  - 문자열일 경우

```tsx
<Image alt={'image'} src={'image.jpg'} style={{ width: 100 }} className="clean-div" />
```

### ⭐️ 요약

- String일 경우 Curly Brace 사용하지 않기

<br>

# ✅ Props 축약하기

### 🌈 결론

```tsx
// 변경 전
function component(props) {
  <HeaderComponent hasPadding={props.hasPadding}>
    <ChildComponent isDarkMode={props.isDarkMode} isLogin={props.isLogin} />
  </HeaderComponent>;
}

// 변경 후
function component({ hasPadding, ...props }) {
  <HeaderComponent hasPadding>
    <ChildComponent {...props} />
  </HeaderComponent>;
}
```

### ✍️ 내용

ShortHand Props는언제 사용할까?

- 토글링 값을 Props로 전달 할 때

```tsx
function component({ hasPadding, ...props }) {
	<HeaderComponent hasPadding>
		<ChildComponent {...props} />
	</HeaderComponent>
```

### ⭐️ 요약

- ShortHand Props로 Props를 축약할 수 있다.

<br>

# ✅ Single Quotes vs Double Quotes

---

### 🌈 결론

```tsx
// ✅
<a href="https://www.naver.com">Naver</a>

// ❌
<input class='ccc' type="button" value='Clean' />

// ❌
<Clean style={{ backgroundPosition: "left" }} />
```

### ✍️ 내용

- 팀에서 일반적인 규칙 ⇒ 일관성을 지키기 위함
- HTML과 JS 환경에서 사용하는 부분 구분
  - HTML은 Double Quotes 주로 사용(HTML Attribute를 위한 값)
  - JS은 Single Quotes 주로 사용(객체의 값) cf) JSX는 Single Quotes
- 결론적으로 규칙을 정하고 그 맥락을 파악하고 공유하자 ⇒ Lint, 포맷팅 도구(Prettier)에 위임하자

### ⭐️ 요약

- **HTML, JS를 구분해서** Single Quotes와 Double Quotes를 결정하자
- 규칙은 팀끼리 정해서 자동 포맷팅 시키자

<br>

# ✅ Props 네이밍

### 🌈 결론

```tsx
// ❌
<ChildComponent
	class="mt-0"
	Clean="code"
	clean_code="react"
	otherComponent={OtherComponent}
	isShow={true}
/>

// ✅
<ChildComponent
	className="mt-0"
	clean="code"
	cleanCode="react"
	OtherComponent={OtherComponent}
	isShow
/>
```

### ✍️ 내용

- React Component는 파스칼로 한다.

### ⭐️ 요약

- class는 `className`으로 사용하기
- `camel case` 사용하기
- 무조건 true라면 `isShow={true}`가 아닌, `isShow`로 축약하기
- 컴포넌트라면 대문자로 시작하기

<br>

# ✅ 인라인 스타일 주의 하기

### 🌈 결론

```tsx
// ❌
function InlineStyle(): Element {
  return <button style="background-color: 'red'; font-size: '14px';">Clean Code</button>;
}

// ✅
function InlineStyle(): Element {
  const myStyle = { backgroundColor: 'red', fontSize: '14px' };

  return <button style={myStyle}>Clean Code</button>;
}
```

### ✍️ 내용

- JS로 HTML을 표현하는 문법이 바로 JSX임
- 고정된 스타일 객체 값이라면, 컴포넌트 외부로 빼는 것이 좋음(매번 랜더링 될 때마다 계속 평가되기 때문)

  ```tsx
  const myStyle = { backgroundColor: 'red', fontSize: '14px' };

  function InlineStyle(): Element {
    return <button style={myStyle}>Clean Code</button>;
  }
  ```

### ⭐️ 요약

- JSX에서 인라인 스타일을 쓰려면 중괄호 안에 `camelCase key`를 가진 객체를 넣어야 한다.

<br>

# ✅ CSS IN JS 인라인 스타일 지양하기

### 🌈 결론

```tsx
// ❌
function InlineStyle(): Element {
	return (
		<button css={
			css`
				background-color: white;
				border: 1px solid #eee;
				border-radius: 0.5rem;
				padding: 1rem;
			`}
		}>
			Clean Code
		</button>
	);
}

// ✅
function InlineStyle(): Element {
	return (
		<button css={cardCss.self}>Clean Code</button>
	);
}
```

### ✍️ 내용

- css 백틱으로 진행했을 때에는 VSCode 자동완성과 DX 측면에서 좋지 않기 때문에 JS 스타일을 주는 것이 좋음
- 아래와 같이 스타일을 외부 뺐을 때의 장점
  - 외부로 분리했기 때문에 스타일이 렌더링 될 때마다 직렬화 되지 않는다. → 한번만 된다.
  - 동적인 스타일을 실수로 건드는 확률이 적어진다.
  - 스타일 관련 코드를 분리해서 로직에 집중하고 JSX를 볼 때 조금 더 간결하게 볼 수 있다.

```tsx
// 장점
// - 타입 안정성
// - 자동 완성으로 생산성 DX 향상
// - export 할 경우, 외부 컴포넌트에서 사용 가능
const cardCSS = {
  self: css({
    backgroundColor: 'white',
    border: '1px solid #eee',
    borderRadius: '0.5rem',
    padding: '1rem',
  }),
  title: css({
    fontSize: '1.25rem',
  }),
};

// CSS IN JS 인라인 스타일 지양하기
// - 성능에 민감함
export function Card({ title, children }) {
  return (
    <div css={cardCss.self}>
      <h5 css={cardCss.title}>{title}</h5>
      {children}
    </div>
  );
}
```

### ⭐️ 요약

- CSS in JS 인라인 스타일을 지양해야 하는 이유
  - 성능 저하를 일으킴
  - 휴먼 에러가 발생할 수 있음
  - export 할 수 없음

<br>

# ✅ 객체 Props 지양하기

### ✍️ 내용

- React는 JS로 개발되어 있음

```tsx
// 객체 Props 지양하기
// - 변하지 않는 값일 경우 컴포넌트 외부로 드러내기
// - 필요한 값만 객체를 분해해서 Props로 내려 준다.
// - 정말 값 비싼 연산, 너무 잦은 연산이 있을 경우 useMemo() 활용하여 계산된 값을 메모이제이션 한다.
// - Props 값을 나누어서 다른 컴포넌트에 Props를 전달한다.
function SomeComponent() {
  return <ChildComponent propObj={{ hello: 'world' }} propArr={['hello', 'hello']} />;
}

// ✅ 방법 1
function SomeComponent() {
  const [propArr, setPropArr] = useState(['hello', 'hello']);

  return <ChildComponent hello1="world" hello2={propArr.at(0)} />;
}

// ✅ 방법 2
function SomeComponent({ heavyState }) {
  const [propArr, setPropArr] = useState(['hello', 'hello']);
  const computedState = useMemo(
    () => ({
      heavyState: heavyState,
    }),
    [heavyState],
  );

  return <ChildComponent hello1="world" hello2={propArr.at(0)} computedState={computedState} />;
}

// React의 Dependency 배열에 해당 Object.is 함수가 내장되어있음
// 아래 결과 false
Object.is(
  { hello: 'world' }, // 초기 렌더링
  { hello: 'world' }, // 두번째 렌더링
);

// 아래 결과 false
Object.is(
  ['hello'], // 초기 렌더링
  ['hello'], // 두번째 렌더링
);
```

<br>

# ✅ HTML Attribute 주의하기

### 🌈 결론

```tsx
// ❌
function MyButton({ children, type }) {
  return <button type={type}>{children}</button>;
}

// ✅
function MyButton({ children, ...rest }) {
  return <button {...rest}>{children}</button>;
}
```

### ✍️ 내용

1. HTML 기본 속성 주의하기

   - HTML와 JSX에서 사용하는 예약어 주의
   - HTML 표준어 찾아서 주의(내가 만든 Component의 Props와 겹치지는지 확인)

   ```tsx
   function HTMLDefaultAttribute() {
     const MyButton = ({ children, ...rest }) => <button {...rest}>{children}</button>;

     return (
       <>
         <MyButton className="mt-0" type="submit">
           Clean Code
         </MyButton>

         <MyButton type="number" maxLength="99">
           Clean Code
         </MyButton>
       </>
     );
   }
   ```

### ⭐️ 요약

- HTML, JS에서 정의한 예약어와 커스텀 컴포넌트 Props가 혼용되지 않도록 주의

<br>

# ✅ Spread 연산자 쓸 때 주의할 점

### 🌈 결론

```tsx
// ❌
const ParentComponent = (props) => {
  return <childOrHOCComponent {...props} />;
};

// ✅
const ParentComponent = (props) => {
  const { 관련_없는_props, 관련_있는_props, ...나머지_props } = props;

  return <childOrHOCComponent 관련_있는_props={관련_있는_props} {...나머지_props} />;
};
```

### ✍️ 내용

### Spread 연산으로 내려오는 Props 주의할 점

- 코드를 예측하기 어렵다.

### ⭐️ 요약

- props에서 spread 연산자가 쓰이면 관련 있는 props, 없는 props, 나머지 props로 나눠보자

<br>

### 참고

- [클린 리액트](https://www.udemy.com/course/clean-code-react/learn/lecture/41573010#overview)

```toc

```
