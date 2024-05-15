---
emoji: 👨‍💻
title: Clean React - 04. Rendering
date: '2024-05-11 21:24:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: React
---

# ✅ JSX에서의 공백처리

### 🌈 결론

```tsx
// ❌
export default function App() {
  return (
    <div>
      Welcome Clean Code&nbsp;
      <a href="clean-code-js">Go Clean Code</a>
    </div>
  );
}

// ✅
export default function App() {
  return (
    <div>
      Welcome Clean Code <a href="clean-code-js">Go Clean Code</a>
    </div>
  );
}
```

<br>

# ✅ 0는 JSX에서 유효한 값

---

### 🌈 결론

```tsx
export default function App() {
	const [items, setItems] = useState([]);

	// ❌
	// 아래 0 출력
	return (
		<div>
			{item.length && item.map((item) => {
				return <Item item={item} />;
			})
		</div>
	)

	// ✅
	return (
		<div>
			{item.length === 0 && item.map((item) => {
				return <Item item={item} />;
			})
		</div>
	)
}
```

### ✍️ 내용

- 참과 거짓으로 판단하는 것이 아니라, 렌더링 유무로 판단
- JSX에서는 어떤 값은 유효한 값인지, 렌더링 하는 값인지 확인
- 렌더링을 조건부로 할 때에는 명확하게 조건을 주고 함

### ⭐️ 요약

- JSX에서 렌더링되는 값과 아닌 값을 구분하지

<br>

# ✅ List 내부에서 Key

---

### 🌈 결론

```tsx
export default function App({ list }) {
	const handleAddItem = (value) => {
		setItems((prev) => [
			...prev,
			{
				id: crypto.randomUUID(),
				value
			},
		]);
	}

	useEffect(() => {
		// list만들 때! 꼭 ID를 부여하자
		// 혹은 새로운 아이템을 추가하는 함수륾 만들 때 그 때 고유한 값을 넣어주자!
	}, [])

	// ❌
	return (
		<ul>
			{list.map((item) => {
				return <li>{item}</li>;
			})
		</div>
	)

	// ❌
	return (
		<ul>
			{list.map((item, index) => {
				return <li key={index}>{item}</li>;
			})
		</div>
	)

	// 🤔
	return (
		<ul>
			{list.map((item, index) => {
				return <li key={'card-item-' + index}>{item}</li>;
			})
		</div>
	)

	// ❌
	// - state, props에 따라 렌더링이 될 때마다 key가 만들어짐
	// - 그래서 유효한 값이 아님
	return (
		<ul>
			{list.map((item, index) => {
				return <li key={new Date().toString()}>{item}</li>;
			})
		</div>
	)

	// ❌
	return (
		<ul>
			{list.map((item, index) => {
				return <li key={uuidv4() onClick={() => handleDelete(uuidv4()}}>{item}</li>;
			})
		</div>
	)

	// ✅
	return (
		<ul>
			{list.map((item) => {
				return <li key={item.id}>{item}</li>;
			})
		</div>
	)
}
```

### ✍️ 내용

- List 컴포넌트를 만들 때, key props를 넣어야 함.
- 이 때, key는 고유한 값이여야 함
- 단, 동적으로 생성되는 즉, 렌더링마다 생성되는 key를 넣으면 안됨

### ⭐️ 요약

- List 컴포넌트를 작성할 때, 고유한 key를 props로 전달하자.

<br>

# ✅ 안전하게 Raw HTML 다루기

### 🌈 결론

- React 에서 HTML과 악성 스크립트를 심을 수 있는 경우를 아래의 방법으로 대처하자
  - https://github.com/cure53/DOMPurify
  - HTML Sanitizer API
  - eslint-plugin-risxss

### ✍️ 내용

안전하게 Raw HTML 다루기

- 렌더링될 데이터
- 유저가 다시 한번 입력모드로 수정할 수 있는 데이터
  - 바로 input, textarea
  - https://github.com/cure53/DOMPurify
  - HTML Sanitizer API
    - https://developer.mozilla.org/en-US/docs/Web/API/HTML_Sanitizer_API
  - eslint-plugin-risxss
    - https://www.npmjs.com/package/eslint-plugin-risxss?activeTab=readme

```tsx
const SERVER_DATA = '<p>some raw html</p>'

function DangerouslySetInnerHTMLExample() {
	const post = {

		// XSS(악성 스크립트 공격)
		content: `<img src="" onerror='alert("you were hacked")'>`
	};

	const markup = { __html: SERVER_DATA }

	// DOMPurify 사용
	const sanitizeContent = { __html: DOMPurify.sanitize(SERVER_DATA) };
	setContentHTML(DOMPurify.sanitize(SERVER_DATA))

	// ❌ 하지만 아래 것이 더 위험
	return <div>{markup}</div>;

	return <textarea>{수정할 수 있는 유저 컨텐츠를 넣으려면...?}</textarea>

	// ✅ 아래가 그나마 괜찮음
	return <textarea>{contentHTML}</textarea>

	// 🤔 이것도 위험
	return <div dangerouslySetInnerHTML={markup} />;


	// 훨씬 안전하게 사용하는 방법
	return <div>{sanitizeContent}</div>;
}
```

### ⭐️ 요약

- React에서 HTML을 다룰 때에는 조심해야 함

<br>

### 참고

- [클린 리액트](https://www.udemy.com/course/clean-code-react/learn/lecture/41573010#overview)

```toc

```
