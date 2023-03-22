---
emoji: ✏️
title: 'React - Ref를 통해 DOM(React)을 조작하는 방법 번역'
date: '2023-01-20 20:13:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: 번역
---

> 이 글은 [React - Manipulating the DOM with Refs](https://reactjs.org/learn/manipulating-the-dom-with-refs)를 번역한 것 입니다.

<br>

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
`<input />`와 같은 브라우저 Element에 `ref`를 넣게 되면, React는 해당 DOM Node(실제 브라우저의 `<input />`와 같은)에 current 속성 값을 셋팅합니다.

그러나 만약에 우리가 만든 컴포넌트`(<MyInput />)`에 `ref`를 넣게 되면 기본 적으로  current 값이 `null`이 나옵니다.

관련 예시는 아래와 같습니다.(버튼을 클릭하면 포커스가 되지 않습니다.)
```jsx
import { useRef } from 'react';

const MyInput = (props) => <input {...props} />

const MyForm = () => {
  const inputRef = useRef();
  
  const handleClick = () => {
    inputRef.current.focus();
  }
  
  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  )
}
```
포커스를 누르게 되면 React에서 에러를 출력합니다. 이 문제는 기본적으로 React에서 Component가 다른 Component의 DOM Node에 접근할 수 없기 때문에 발생합니다.

이를 해결하기 위해서, 다른 Component DOM Node에 접근을 허락할 수 있도록 옵션을 추가할 수 있습니다. 

다시 말하면, `forwardRef`를 통해, 상위 컴포넌트가 하위 컴포넌트에게 ref를 전달 수 있습니다.
```jsx
const MyInput = forwardRef((props, ref) => {
  return <input {...props} ref={ref} />;
})
```
위의 코드를 설명하자면
1. `<MyInput ref={inputRef} />`의미는 React에게 일치하는 DOM Node의 `inputRef.current`를 셋팅하라는 것 입니다. 그러나, 무조건적으로 셋팅을 하는 것은 아닙니다. 
2. MyInput Component는 forwardRef를 선언해서 사용합니다. 이는 상위 컴포넌트에서 선언된 inputRef를 props로 전달 받습니다.
3. 전달 받은 inputRef를 `<input>` props로 전달 합니다.

수정된 밑에 코드는 정상 작동합니다.
```jsx
import { forwardRef, useRef } from 'react';

const MyInput = forwardRef((props, ref) => {
  return <input {...props} ref={ref} />;
});

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}
```
디자인 시스템 안에서, Button, Input 등과 같은 Low-Level DOM Node 컴포넌트들에게 ref를 부모로 부터 전달하는 방법은 흔한 패턴 입니다.

반면에, List, Page Section 등과 같은 High-Level DOM Node 컴포넌트들은 종속성을 피하긱 위해, 외부로 부터 ref를 전달받지 않습니다(DOM Node를 외부로 노출하지 않습니다).  

<br />

## 명령형 Handler 함수가 포함된 하위 API를 노출하는 방법
위 예시는 `MyInput` 컴포넌트 안에서 웹 DOM input Element를 노출 시킵니다. 이렇게 하면 상위 컴포넌트가 `focus()` API를 호출 할 수 있습니다.

이렇게 되면, 부모 컴포넌트는 하위 컴포넌트의 CSS를 변경시킬 수 있습니다.

또한 흔치 않은 사례이지만, `useImperativeHandle`를 통해, 하위 컴포넌트를 상위 컴포넌트에게 노출을 제한 할 수 있습니다.
```jsx
import {
  forwardRef, 
  useRef, 
  useImperativeHandle
} from 'react';

const MyInput = forwardRef((props, ref) => {
  const realInputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    focus() {
      realInputRef.current.focus();
    }
  }));
  
  return <input {...props} ref={realInputRef} />;
})

const Form = () => {
  const inputRef = useRef(null);
  const handleClick = () => {
    inputRef.current.focus();
  };
  
  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  )
}
```
여기서 MyInput 내부의 `realInputRef`는 실제 input DOM Node를 유지 합니다.
그러나, `useImperativeHandle`는 부모 컴포넌트의 특별한 ref 객체 값을 React에게 제공하도록 지시 합니다.
그래서 `Form` 컴포넌트 내부 `input.ref.current.`안에는 오직 `focus` 메서드만 있습니다.
위 예제에서 ref "handle"은 `useImperativeHandle` call안에 생성한 DOM Node가 아닌, 커스텀된 객체입니다.

<br>

## 언제 React가 refs를 붙일 까요??
React는 2단계로 나눠서 업데이트 합니다.
- Rendering 하는 동안, React는 화면에 표시할 것을 계산하기 위해 우리가 만든 Component를 호출합니다.
- `commit`단계에서, React는 DOM에 변경사항을 적용합니다.

일반적으로 우리는 랜더링 중에는 `refs`에 접근하지 않습니다.(우리가 `ref`를 통해, 설정한 DOM Node에도 마찬가지 입니다.)
첫 번째 랜더링동안, DOM Node가 생성되지 않았으므로 `ref.current`가 null이 됩니다.
업데이트한 Component를 랜더링 하는 동안 DOM Node는 아직 업데이트가 되지 않습니다.
그래서 null 값이 나옵니다.

React는 `commit`단계에서 `ref.current`값을 셋팅합니다.
DOM을 업데이트하기 전에, `ref.current` 값을 null로 설정합니다. 그 후 DOM을 업데이트한 후, React는 해당 DOM Node로 즉시 설정합니다.

일반적으로 이벤트 핸들러에서 `refs`를 접근합니다. 이벤트 핸들러를 통해서 `refs`를 사용하여 무언가를 하기 위해서는 `useEffect`를 사용해야 합니다.

### React에서 "commit"의 의미
- Component의 모든 State 변경사항을 적용하고, 다시 랜더링하는 처리과정을 말합니다.
- 이 작업은 `setState()`를 통해 사용됩니다.
- `commit`단계는 Component 업데이트의 마지막 단계로 Component의 State 변경사항이 적용되고 업데이트된 Component가 DOM에 랜더링됩니다.

### flushSync를 통해, React State를 동기적으로 업데이트 하는 방법

밑에 예시는 Todo를 추가했을 때, 자동으로 해당 Todo로 스크롤되어집니다.
```jsx
import { useState, useRef } from 'react';

let nextId = 0;
let initialTodos = [];
for (let i = 0; i < 20; i++) {
  initialTodos.push({
    id: nextId++,
    text: 'Todo #' + (i + 1)
  });
}

const TodoList = () => {
  const listRef = useRef(null);
  const [text, setText] = usestate('');
  const [todos, setTodos] = useState([])
  
  const handleAdd = () => {
    const newTodo = { id: nextId++, text: text };
    setText('');
    setTodos([ ...todos, newTodo]);
    listRef.current.lastChild.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }

  return (
    <>
      <button onClick={handleAdd}>
        Add
      </button>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <ul ref={listRef}>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}
```

위 코드에서 생각해봐야 할 코드는 아래와 같습니다.
```jsx
  setTodos([ ...todos, newTodo]);
  listRef.current.lastChild.scrollIntoView();
```
React에서 State 업데이트 방식은 Queue방식이며, `setTodos`가 즉각적으로 DOM에 업데이트 되지 않기 때문에 실제로 Todo에 값을 추가해도 스크롤이 자연스럽게 되지 않습니다.

위 문제를 해결하기 위해서 React 18 부터 제공하는 `flushSync` 함수를 통해, React에서 DOM을 동기적으로 업데이트("flush")하라고 강제 시킬 수 있습니다.
즉, 마지막 Todo를 동기적으로 DOM에 업데이트 시킵니다. 
사용방법은 아래와 같습니다.
```jsx
flushSync(() => {
  setTodos([...todos, newTodos]);
});
listRef.current.lastChild.scrollIntoView();

```

<br>

## refs를 통해 DOM을 조작한 가장 좋은 사례
일반적으로 refs를 사용할 때에는 React가 관여하지 않은, scroll 위치, Browser API 등에 사용해야 합니다.
그 외에 refs를 사용하게 되면 React가 하는 작업과 충돌하게 됩니다.

예를 들어, 하나의 토글 버튼은 State값에 따라 조건적으로 보여주는 역할을 하고, 또 다른 토글 버튼은 DOM API인 `remove()`를 통해, 버튼을 제거 합니다.(React 영역 밖에서)
```jsx
import { useState, useRef } from 'react';

const Counter = () => {
  const [show, setShow] = useState(true);
  const ref = useRef(null);

  return (
    <div>
      <button
        onClick={() => {
          setShow(!show);
        }}>
        Toggle with setState
      </button>
      <button
        onClick={() => {
          ref.current.remove();
        }}>
        Remove from the DOM
      </button>
      {show && <p ref={ref}>Hello world</p>}
    </div>
  );
}
```
`Remove from the DOM` 버튼을 누른 뒤에, `Toggle with setState` 버튼을 누르면 에러가 발생합니다.
이는 DOM 자체가 바뀌어버렸고, React는 DOM의 변동사항을 계속 관리하지 못합니다.

그래서 React내에서 직접 DOM Node를 변경하는 것(DOM을 조작, 추가, 제거하는 것)을 피해야 합니다.

그렇다고 해서 우리가 아무것도 못한다는 의미는 아닙니다. 다만 주의를 해야 합니다.
우리는 안전하게 React를 통해 DOM의 일부분을 조작할 수 있습니다.(refs를 통해 focus, scroll 등)
예를 들어 `<div></div>`안에 아무것도 없다면, 자식 Element를 추가하거나 제거하는 등의 조작은 안전합니다.

<br>

# 복습
- `Refs`는 DOM Element를 조작할 때 사용됩니다.
- React에게 JSX로 만드는 DOM Node 속성에 `myRef.current` 값을 `<div ref={myRef}>`로 넣을 수 있습니다.
- Scroll, focusing 등의 작업을 refs를 통해 조작할 수 있습니다.
- 기본적으로 Component DOM Node를 실제 DOM에 노출하지 않습니다. 그러나, `forwardRef`를 통해, 실제 DOM Node에 접근할 수 있도록 노출 시킬 수 있습니다. `forwarRef`의 두번째 인자에 특정 Node를 전달 합니다.   
- React로 DOM Node를 변경하는 것을 지양해야 합니다.
- 만약에 React를 통해 DOM Node를 변경해야 한다면, React가 DOM을 업데이트 하지 않아야 하는 부분을 변경해야 합니다.(스크롤, 포커스 등)

<br>

### 📕 참고
- [React - Manipulating the DOM with Refs](https://reactjs.org/learn/manipulating-the-dom-with-refs)
- [Ref란 - DOM에 직접 접근하는 방법](https://chanhuiseok.github.io/posts/react-7/)
- [useRef 200%로 사용하기](https://velog.io/@juno7803/React-useRef-200-%ED%99%9C%EC%9A%A9%ED%95%98%EA%B8%B0)

```toc
```
