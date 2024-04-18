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

### 참고

- [클린 리액트](https://www.udemy.com/course/clean-code-react/learn/lecture/41573010#overview)

```toc

```
