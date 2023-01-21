---
emoji: ✏️
title: 'React Beta 번역 - Ref를 통해 DOM(React)을 조작하는 방법'
date: '2023-01-20 20:13:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: React
---

# 🌈 Ref를 통해 DOM을 조작하는 방법.
React는 자동적으로 우리가 만든 JSX 컴포넌트를 DOM에 업데이트 합니다. 그래서 우리는 DOM을 조작할 일이 흔치 않게 됩니다.

그러나, 우리는 때때로 React가 처리하는 DOM Node Element에 접근할 필요가 있습니다. 

예를 들어 Node를 Focus, Scroll하거나 Size와 Position을 측정할 때 접근해야 합니다.

그래서 우리는 이번 시간에 `Ref`를 통해 어떻게 React에서 관리는 DOM Node를 처리하는지 알아보겠습니다. 

<br/>

## ✅ 학습 내용
```md
1. ref 속성을 통해 어떻게 React가 관리하는 DOM Node에 접근하는지 알아보겠습니다.
2. ref JSX 속성과 useRef 훅과의 관계가 무엇인지 알아보겠습니다.
3. 어떻게 다른 Component의 DOM Node에 접근하는지 알아보겠습니다.
4. React로 관리하는 DOM을 변경했을 때 안전한 경우를 알아보겠습니다.
```

<br>

## Ref를 통해 특정 Node에 접근하는 방법.

React가 관리하는 DOM Node를 접근하기 위해서는 import useRef hook을 합니다.
```js
import { useRef } from 'react';
```
그런 다음, 아래와 같이 Component 내부에 ref를 선언 합니다. 
```js
const myRef = useRef(null);
```
마지막으로, React가 관리하는 DOM Node에 `ref` 속성에 전달합니다.
```js
<div ref={myRef} />
```
`useRef` Hook은 `current`만 가지고 있는 object를 return합니다. 초기에는 `myRef.current` 값이 `null`입니다.

React가 DOM Node `<div>`를 생성할 때, React는 myRef.current 참조값을 넣게 됩니다. 

그리고 나서 우리가 만든 이벤트 핸들러 또는 browser APIs 통해서 DOM에 접근할 수 있습니다.
```js
// browser APIs 예제
myRef.current.scrollIntoView();
```

<br>

## Example: Input 태그를 Focus하는 방법.

버튼을 클릭하면 input 태그를 focus하는 예제를 보겠습니다.
```jsx
import { useRef } from 'react';

const Form = () => {
  const inputRef = useRef(null);
  
  const handleClick = () => {
    inputRef.current.focus();
  }
  
  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  )
}

export default Form
```
위 코드를 조금 더 설명하자면 아래와 같습니다.
1. useRef hook을 통해 `inputRef`를 선언합니다.
2. `<input ref={inputRef} />` 는 React에게 `<input>`DOM Node에게 `inputRef.current`를 넣으로 말하는 것입니다.
3. `handleClick` 함수는 `inputRef.current`를 통해 `<input>`DOM Node를 읽습니다. 그리고 DOM의 `focus()`함수를 호출합니다.
4. `<button>`의 `onClick`으로 `handleClick`을 전달합니다.

DOM을 조작할 때, 흔히 사용되어지는 방법이 `ref`입니다. 또한 `useRef` Hook은 Timer ID와 같은 외부 정보를 저장할 때 사용되어 집니다.
State와 유사하지만, `ref`는 랜더링 과정에서 남아있습니다. 즉, `ref`는 리 랜더링을 유발하지 않은 State와 같습니다.  

<br>

## Example: 특정 Element로 스크롤 하는 방법.
하나의 컴포넌트에 여러개의 `ref`가 존재할 수 있습니다.

예를 들어 아래와 같이 Carousel Images가 있습니다. 

각 버튼이 존재하며, 버튼을 누를 때마다 해당 DOM Node에 맞춰서 browser의 `scrollIntoView()`가 호출됩니다.
```jsx
import { useRef } from 'react';

const CatFriends = () => {
  const firstCatRef = useRef(null);
  const secondCatRef = useRef(null);
  const thirdCatRef = useRef(null);
  
  const handleScrollToFistrCat = () => {
    firstCatRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    })
  }
  
  const handleScrollToSecondCat = () => {
    secondCatRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    })
  }

  const handleScrollToThirdCat = () => {
    thirdCatRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }
  
  return (
    <>
      <nav>
        <button onClick={handleScrollToFistrCat}>
          Tom
        </button>
        <button onClick={handleScrollToSecondCat}>
          Taru
        </button>
        <button onClick={handleScrollToThirdCat}>
          Jellylorum
        </button>
      </nav>
      <div>
        <ul>
          <li>
            <img
              src="https://placekitten.com/g/200/200"
              alt="Tom"
              ref={firstCatRef}
            />
          </li>
          <li>
            <img
              src="https://placekitten.com/g/300/200"
              alt="Maru"
              ref={secondCatRef}
            />
          </li>
          <li>
            <img
              src="https://placekitten.com/g/250/200"
              alt="Jellylorum"
              ref={thirdCatRef}
            />
          </li>
        </ul>
      </div>
    </>
  )
}

export default CatFriends
```

### ref callback을 사용해서, List들의 ref를 관리하는 방법
위 예시는 미리 정의된 ref를 사용했습니다. 그러나 때때로 우리는 List의 Item이 몇개가 있는지 모르는 상황에서, Item 마다 ref가 필요할 때가 있습니다.
그 때 아래와 같이 코드를 작성하게 된다면 작동되지 않은 것을 볼 수 있습니다.
```jsx
<ul>
  {itmes.map((item) => {
    // 작동 X
    const itemRef = useRef(null);
    return <li ref={itemRef} />;
  })}
</ul>
```
왜냐하면 <b>Hook은 반드시 Component의 최상단에서 호출</b>되어야 하기 때문입니다.
그래서 useRef를 반복문 안에서 호출 할 수 없습니다.

그러나, 위 방법을 해결할 수 있는 방법은 하나의 부모 Element ref를 가져온 뒤에, `querySelectroAll`로 List Item Node를 찾아 조작하는 방법입니다.
하지만 만약에 DOM 구조가 변경되었을 때, 이 방법은 해결책이 되지 못합니다.

또 다른 방법은, 함수를 ref 속성으로 전달하는 것 입니다. 이는 `ref callback`이라고 불립니다.
React는 ref를 셋팅할 때, `ref callbak`을 호출하고, ref가 삭제 될 때는 `null` 값으로 셋팅합니다.
이렇게 하면 배열 안에서 배열의 index 또는 자신만의 배열의 id를 통해 ref에 접근할 수 있습니다.
아래의 코드는 위 방법을 통해 긴 목록에서 스크롤을 통해 특정 Node로 이동하는 것을 구현한 코드 입니다.
```jsx
import { useRef } from 'react'

const CatFriends = () => {
  const itemsRef = useRef(null);

  const catList = [];
  for (let i = 0; i < 10; i++) {
    catList.push({
      id: i,
      imageUrl: 'https://placekitten.com/250/200?image=' + i
    });
  }
  
  const getMap = () => {
    if (!itemsRef.current) { 
      itemsRef.current = new Map();
    }
    
    return itemsRef.current;
  }
  
  const scrollToId = (itemId) => {
    const map = getMap();
    const node = map.get(itemId);
    node.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    })
  }
  
  return (
    <>
      <nav>
        <button onClick={() => scrollToId(0)}>
          Tom
        </button>
        <button onClick={() => scrollToId(5)}>
          Maru
        </button>
        <button onClick={() => scrollToId(9)}>
          Jellylorum
        </button>
      </nav>

      <div>
        <ul>
          {catList.map(cat => (
            <li
              key={cat.id}
              ref={(node) => {
                const map = getMap();
                if (node) {
                  map.set(cat.id, node);
                } else {
                  map.delete(cat.id);
                }
              }}
            >
              <img
                src={cat.imageUrl}
                alt={'Cat #' + cat.id}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default CatFriends
```
위의 예시는 `itemsRef` 단일 DOM Node(하나의 값이)가 없습니다. 대신, Map을 통해 Item의 ID로 DOM Node를 관리합니다.(Refs는 모든 값이 들어올 수 있습니다.)
`ref callback` List Item이 Map을 통해 셋팅될 때마다 실행됩니다. 즉, `Map`을 통해서, List Item의 각각의 Node를 읽을 수 있습니다. 

<br>

## 다른 컴포넌트의 DOM Node에 접근하는 방법.


<br>

## React Ref를 사용할 때 주의사항 by GPT
1. When using refs, make sure to avoid using them in any performance-critical parts of your code, as they can negatively impact the performance of your application.
2. Refs should be used with caution and only when necessary, as they can make your code more complex and harder to understand.
3. Be sure to properly clean up any refs you create, as they can prevent your components from being garbage collected.
4. Refs should be used only on class components and not on functional components because it is not recommended to use it on functional components.
5. If possible, try to use React's state and props system instead of refs, as they are a more idiomatic way to manage the state and behavior of your components.

<br>

### 📕 참고
- [React Beta - Manipulating the DOM with Refs](https://beta.reactjs.org/learn/manipulating-the-dom-with-refs)
- [Ref란 - DOM에 직접 접근하는 방법](https://chanhuiseok.github.io/posts/react-7/)
- [useRef 200%로 사용하기](https://velog.io/@juno7803/React-useRef-200-%ED%99%9C%EC%9A%A9%ED%95%98%EA%B8%B0)

```toc
```
