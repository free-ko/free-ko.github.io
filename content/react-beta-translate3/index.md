---
emoji: ✏️
title: 'React Beta - Your First Component'
date: '2023-02-06 21:19:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: React
---

> 이 글은 [React Beta 공식 문서 - Your First Component](https://beta.reactjs.org/learn/your-first-component)를 번역한 것 입니다.

<br>

# Your First Component
`Component`는 React에서 핵심 개념 중 하나입니다. Component는 UI를 구축하는 기반입니다.

<b>우리가 배우게 될 내용들</b>
- Component란?
- React에서 Component의 역할은?
- Component를 개발하는 방법은?

<br>

## Components: UI Building Blocks
WEB에서 HTML을 사용하면 `<h1>`과 `<li>`와 같은 태그가 내장된 구조가 있는 문서(Mark up)를 만들 수 있습니다.

```html
<article>
  <h1>My First Component</h1>
  <ol>
    <li>Components: UI Building Blocks</li>
    <li>Defining a Component</li>
    <li>Using a Component</li>
  </ol>
</article>
```

이 마크업은 Article `<article>`, Heading `<h1>`(약칭) 목차 중 목록이 순서대로 정의되었다는 것을 `<ol>`로 나타냅니다.
스타일을 위한 CSS와 상호작용을 위한 JS와 결합된 마크업은 웹에서 볼 수 있는 모든 UI(Sidebar, Avatar, Modal, Dropdown 등)를 제공합니다.

React APP을 개발할 때, 재사용 가능한 UI `Component`(마크업, CSS, JS가 포함되어 있습니다.)를 제공합니다.

아래와 같이 HTML 태그와 마찬가지로 Component를 통해 전체 페이지를 설계 할 수 있습니다.
```jsx
    <PageLayout>
      <NavigationHeader>
        <SearchBar />
        <Link to="/docs">Docs</Link>
      </NavigationHeader>
      <Sidebar />
      <PageContent>
        <TableOfContents />
        <DocumentationText />
      </PageContent>
    </PageLayout>
```
예를 들어 다른 페이지에서도 ` <TableOfContents />` 안의 테이블관련 UI가 필요하다면, ` <TableOfContents />`만 호출해 재사용하면 됩니다. 
이렇게 되면 프로젝트가 커져도 개발 속도는 자연스럽게 빨라지게 됩니다.

<br/>

## Defining a component
전통적으로 웹을 개발할 때, 마크업으로 콘텐츠를 표시한 다음 일부 JS를 통해 인터렉션을 추가했습니다. 그러나 요즘 웹 페이지는 JS를 통한 인터렉션 많이 존재하게 되었습니다.
React는 JS의 함수이기 때문에 자연스럽게 JS를 통해 인터렉션을 쉽게 구현할 수 있습니다.

아래 코드를 보면서 어떻게 React Component JS를 통해 인터렉션을 구현하는지 살펴 봅시다.
```js
// App.js
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3Am.jpg"
      alt="Katherine Johnson"
    />
  )
}
```

### Step 1: Export the component



<br/>

### 📕 참고

```toc
```
