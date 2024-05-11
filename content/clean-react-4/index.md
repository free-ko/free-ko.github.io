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

### 참고

- [클린 리액트](https://www.udemy.com/course/clean-code-react/learn/lecture/41573010#overview)

```toc

```
