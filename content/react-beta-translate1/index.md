---
emoji: ✏️
title: 'React Beta 번역 - Describing th UI'
date: '2023-01-07 18:24:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: React
---

# 🌈 Describing the UI
리액트는 UI를 랜더링하는 JS 라이브러리 입니다. UI는 `button`, `text`, `images` 같은 작은 단위로 구성되어 있습니다.
리액트에서는 이러한 UI들을 통해 컴포넌트를 만들 수 있고, 이 컴포넌트들을 통해 재사용 혹은 연관성 있는 것들로 또 다른 컴포넌트들을 만들 수 있습니다.
또한 웹 사이트, 앱 그리고 모든 스크린은 컴포넌트로 구성되어 있습니다.

그래서 우리는 이번 챕터에서 컴포넌트를 만들고, 조작해보는 시간을 가져보겠습니다.

<br/>

## ✅ 학습 내용
```md
1. Component를 작성하는 방법
2. 다양한 Component를 작성하고 이용하는 방법
3. JSX 문법과 사용하는 방법
4. Component 내부에서 JS기능을 사용하는 방법(Curly Braces)
5. Component 내부에서 props를 설정하는 방법
6. 조건별로 Component를 랜더링 하는 방법
7. 한꺼번에 여러번 Component를 랜더링 하는 방법
8. Component를 Pure하게(순수함수처럼) 유지함으로써 버그를 피하는 방법
```

<br>

## Component
React App은 독립적인 UI Component들로 구성되어 있습니다. 하나의 Component는 JS 함수입니다.(마크업이 안에 존재합니다.)
그리고 Component는 작은 버튼일 수도 있고, 전체 페이지일 수도 있습니다.
```jsx
function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

<br>

### 📕 참고
- [React Beta - Describing the UI](https://beta.reactjs.org/learn/describing-the-ui)


```toc
```
