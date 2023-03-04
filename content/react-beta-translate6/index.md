---
emoji: ✏️
title: 'React Beta - JavaScript in JSX with Curly Braces 번역 중'
date: '2023-03-02 23:42:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: 번역
---

> 이 글은 [React Beta 공식 문서 - JavaScript in JSX with Curly Braces
](https://beta.reactjs.org/learn/javascript-in-jsx-with-curly-braces)를 번역한 것 입니다.

<br>

# JavaScript in JSX with Curly Braces
마크업을 작성하는 과정에서 약간의 JS 로직을 추가하거나, 동적으로 Props를 참조하고 싶을 때가 있습니다.
이럴 때에는 `{}`중괄호를 사용할 수 있습니다.

<b>우리가 배우게 될 내용들</b>
- 문자열을 전달하는 방법
- 중괄호를 통해 JSX문법에 JS 변수를 사용하는 방법 
- 중괄호를 통해 JSX문법에서 JS 함수를 실행하는 방법
- 중괄호를 통해 JS Object를 사용하는 방법

<br>

## Passing strings with quotes
JSX 속성에 string을 전달 할려면, 따옴표나, 쌍따옴표를 사용하면 됩니다.
```jsx
  export default function Avatar() {
    return (
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
    );
  }
```

`"https://i.imgur.com/7vQD0fPs.jpg"` 와 `"Gregorio Y. Zara"`를 동적인 값으로 특정 변수에 넣어서 JSX 속성으로 전달 할 수 있습니다.
```jsx
  export default function Avatar() {
    const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
    const description = 'Gregorio Y. Zara';
   
    return (
      <img
        className="avatar"
        src={avatar}
        alt={description}
      />
    );
  }
```
여기서 주의 해야 할 부분은 className의 avatar와 변수 이름의 avatar의 차이를 알고 있어야 합니다. 그리고 중괄호를 통해 마크업 안에서 JS 작업을 할 수 있습니다.

<br/>

## Using curly braces: A window into the JavaScript world


### Where to use curly braces

<br/>

## Using “double curlies”: CSS and other objects in JSX

### 주의 사항

<br/>

## More fun with JavaScript objects and curly braces

<br/>

## Recap
- 1
- 2
- 3

<br/>

<b>📕 참고</b>
- [React Beta - JavaScript in JSX with Curly Braces
  ](https://beta.reactjs.org/learn/javascript-in-jsx-with-curly-braces)

```toc
```
