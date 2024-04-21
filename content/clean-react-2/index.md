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

### 참고

- [클린 리액트](https://www.udemy.com/course/clean-code-react/learn/lecture/41573010#overview)

```toc

```
