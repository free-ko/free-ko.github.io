---
emoji: ✏️
title: 'React Beta - Your First Component'
date: '2023-02-06 21:19:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: 번역
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
`export default`는 [JS의 기본 문법](https://developer.mozilla.org/ko/docs/web/javascript/reference/statements/export)입니다.
나중에 다른 파일에서 가져올 수 있도록 할 수 있습니다.

### Step 2: Define the function
`function Profile() { }`이와 같이 작성하면, Profile이라는 JS함수를 정의 할 수 있습니다.

<b>주의 사항</b> : 리액트 컴포넌트는 일반 JS함수이지만, 이름이 대문자로 시작해야 작동합니다.

### Step 3: Step 3: Add markup
아래의 컴포넌트는 src 및 alt 속성이 있는 `<img />` 태그를 반환합니디. `<img />`는 HTML처럼 작성되어있지만, 실제로 JS입니다. 이 구문을 `JSX`라고 하며, <b>JS안에 마크업을 삽입할 수 있습니다.</b>
```jsx
return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;
```
만약 아래와 같이 반환 라인이 2줄이상일 때에는 괄호()를 작성해야 합니다.
```jsx
return (
  <div>
    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  </div>
);
```

<b>주의 사항</b> : 만약 괄호가 없으면 반환 라인 뒷 줄에 있는 모든 코드는 무시됩니다.

<br/>

## Using a component
`Profile` 컴포넌트를 정의할 수 있고, 다른 컴포넌트안에서 여러번 사용할 수도 있습니다. 아래와 같이 `Gallery`컴포넌트 안에 `Profile` 컴포넌트를 여러번 사용 할 수 있습니다.
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

<br/>

## What the browser sees
브라우저가 바라보는 관점에서 아래와 같이 차이점이 존재 합니다.
- `<section>` 이 태그는 소문자로 사용되고, React에서는 HTML Tag라고 인식합니다.
- `<Profile />` 이 태그는 첫 문자가 대문자로 시작되고, React에서는 우리가 `Profile`이라는 컴포넌트로 사용되어지길 원한다고 인식합니다.
그리고 `Profile` 컴포넌트 안에는 많은 HTML 요소가 들어갈 수 있습니다 ex) `<img />`, `<h1>` (이 요소는 브라우저가 인식하는 것 들입니다.)
```html
<section>
  <h1>Amazing scientists</h1>
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
</section>
```

<br/>

## Nesting and organizing components
Component는 일반적으로 JS함수입니다. 같은 파일 안에 여러 컴포넌트를 작성할 수 있습니다. 그리고 컴포넌트가 상대적으로 작거나, 서로 밀접하게 연관되어 있을 때 편리 합니다.

만약에 파일 안에 코드가 복잡해지면, 다른 컴포넌트로 분리해 관리 할 수 있습니다.

아래 코드를 보면, `Profile` 컴포넌트는 `Gallery` 컴포넌트 안에서 랜더링 됩니다.(여러번 랜더링도 가능합니다.)
우리는 흔히 `Gallery` 컴포넌트를 <b>부모 컴포넌트</b>, `Profile`컴포넌트를 <b>자식 컴포넌트</b>라고 합니다.

사실 컴포넌트를 어디에서 사용되어지는 가에 따라 부모, 자식 컴포넌트가 결정되며 React에서 컴포넌트를 자유자재로 사용할 수 있다는 것이 포인트 입니다.
```jsx
export default function Gallery() {
  return (
    <Profile/>
  )
}
```


<b>주의 사항</b> : 컴포넌트는 다른 컴포넌트 안에서 랜더링이 될 수 있지만, 절대로 내부 안에서 재 정의 하는 것은 안됩니다.

아래 코드는 배우 느리고 버그를 유발합니다.
```jsx
export default function Gallery() {
  // 🔴 Never define a component inside another component!
  function Profile() {
    // ...
  }
  // ...
}
```

그래서 컴포넌트를 정의하고 싶다면 최상위에서 컴포넌트를 정의해야 합니다.
```jsx
export default function Gallery() {
  // ...
}

// ✅ Declare components at the top level
function Profile() {
  // ...
}
```

또한 자식 컴포넌트에 부모 컴포넌트의 일부 데이터가 필요한 경우, 컴포넌트르 정의를 안에서 하는 것 대신, 프로퍼티로 전달하세요.

<br/>

### Deep Dive : Components all the way down



<br/>

### 📕 참고
- [React Beta - Your First Component](https://beta.reactjs.org/learn/your-first-component)

```toc
```
