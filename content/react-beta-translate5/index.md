---
emoji: ✏️
title: 'React Beta - Writing Markup with JSX 번역 중'
date: '2023-02-23 10:48:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: 번역
---

> 이 글은 [React Beta 공식 문서 - Writing Markup with JSX
](https://beta.reactjs.org/learn/writing-markup-with-jsx)를 번역한 것 입니다.

<br>

# Writing Markup with JSX
`JSX`문법은 JS파일 안에서 JS를 통해 HTML 마크업을 할 수 있도록 하는 문법입니다.
컴포넌트를 작성하는 다른 방법도 있지만, 대부분의 React 개발자는 JSX문법을 사용하는 것을 선호 합니다.

<b>우리가 배우게 될 내용들</b>
- React가 마크업과 랜더링 로직을 혼합한 이유
- JSX가 HTML과 다른 점
- JSX로 정보를 나타내는 방법

<br>

## JSX: Putting markup into JavaScript
WEB은 HTML, CSS, JS를 기반으로 구축되었습니다. 수년 동안, 웹 개발자들은 개발 할 때 콘텐츠는 HTML에, 디자인은 CSS에 로직은 JS에 각각 별도의 파일에서 관리했습니다.
콘텐츠는 HTML안에 마크업 되고, 웹 페이지 로직은 JS안에 별도로 있었습니다.

![HTML과 JS](1.png)

그러나 웹이 점점 인터렉티브하게 되어지면서, JS 로직이 콘텐츠를 결정하는 비중이 점점 커졌습니다.
<b>그래서 React는 컴포넌트에 랜더링 로직과 마크업이 함께 존재하게 되었습니다.<b/>

![React Component](2.png)

폼 버튼 컴포넌트의 렌더링 로직과 마크업을 함께 작성하면 해당 코드를 수정할 때마다, 서로의 동기화 상태를 유지할 수 있습니다.
반대로 폼 버튼 컴포넌트 마크업과 사이드바의 마크업처럼 서로 관련이 없는 세부 사항은 서로 분리되어 있으므로 랜더링 로직과 마크업 코드 하나를 단독으로 변경하는 것이 더 안전합니다.

React 컴포넌트는 브라우저에 렌더링하는 일부 마크업 코드를 포함 할 수 있는 JS함수 입니다.
다시 말하면, React 컴포넌트는 JSX라는 문법을 통해 마크업 코드를 작성할 수 있습니다.
JSX는 HTML처럼 보일 수 있지만, 조금 더 엄격하고 다이나믹한 정보를 표현할 수 있습니다.
JSX를 이해하는 가장 좋은 방법은 일부 HTML 마크업을 JSX 마크업으로 변환하는 것입니다.

### Note
JSX와 React는 서로 다릅니다. 이 둘은 함께 사용할 수도 있지만, [독립적으로 사용할 수 있습니다.](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#whats-a-jsx-transform)
JSX는 문법의 확장이지만, React는 JS 라이브러리 입니다.

<br/>

## Converting HTML to JSX

### Note

<br/>

## The Rules of JSX

### 1. Return a single root element

### DEEP DIVE: Why do multiple JSX tags need to be wrapped?

### 2. Close all the tags

### 3. camelCase all most of the things!

### Pro-tip: Use a JSX Converter

<br/>

## Recap
- 1
- 2
- 3

<br/>

<b>📕 참고</b>
- [React Beta - Writing Markup with JSX
  ](https://beta.reactjs.org/learn/writing-markup-with-jsx)

```toc
```
