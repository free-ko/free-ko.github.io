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
export default functino App() {
	return (
		<div>
			Welcome Clean Code&nbsp;
			<a href="clean-code-js">Go Clean Code</a>
		</div>
	);
}

// ✅
export default functino App() {
	return (
		<div>
			Welcome Clean Code{" "}
			<a href="clean-code-js">Go Clean Code</a>
		</div>
	);
}
```

<br>

# ✅ 0는 JSX에서 유효한 값

---

### 🌈 결론

```tsx
export default functino App() {
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

### 참고

- [클린 리액트](https://www.udemy.com/course/clean-code-react/learn/lecture/41573010#overview)

```toc

```
