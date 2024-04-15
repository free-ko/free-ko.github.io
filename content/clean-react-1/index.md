---
emoji: 👨‍💻
title: Clean React - 01. State
date: '2024-04-01 07:17:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: React
---

## ✅ 상태 소개

- 일단 상태부터 만들고 보는 초보에서 벗어나기

### 1. 일단 상태가 무엇일까

점점 어려워지는 상태관리가 문제일까? 상태를 대하는 태도가 문제일까?

- 상태 종류(언제 만드는지 고민, 왜 만드는지 고민, 왜 필요한지 고민)
  - 컴포넌트 상태
  - 전역 상태
  - 서버 상태
- 상태 관리
  - 상태 변경
  - 상태 최적화
  - 렌더링 최적화
  - 불변성
  - 상태 관리자

### 2. 거꾸로 생각하기

우리는 상태관리를 왜 하고 있는 것일까?

- 상태 관리는 목적인가? 수단인가?
- 상태 관리를 위해 앱을 개발하는 것일까?
- 앱을 개발하는데 상태는 왜 관리하는 것일까?

### 3. 일단 상태가 무엇인가?

- 상태 = State
- 사물, 현상이 놓여 있는 모양이나 형편
- ex) 무방비 상태, 정신 상태, 건강 상태, 이미 기차가 끊긴 상태

<br/>

# ✅ 올바른 초기값 설정

### 올바른 초기값 설정은 왜 중요할까?

- 렌더링 에러 처리 가능
- 초기값이 없을 경우, 해당 값을 통해서 계산하는 로직에서 에러 발생을 방지 할 수 있음

### 초기값

- 초기에 렌더링 되는 값
- 가장 먼저 렌더링 될 때, 순간적으로 보여질 수 있는 값

### 초기값 지키지 않을 경우

- 렌더링 이슈, 무한 루프, 타입 불일치로 의도하지 않는 동작 발생 ⇒ 런타임 에러 발생
- 초기값 넣지 않으면 `undefined` 값으로 셋팅 됨
- 상태를 CRUD ⇒ 상태를 **지울 때**도 초기값을 잘 기억해놔야 원상태로 돌아감.
- 빈값? `null` 처리 할 때 불필요한 방어코드도 줄여 줌

### 요약

- 초기 상태를 올바르게 설정하자

<br/>

## ✅ 업데이트 되지 않는 값

### 예시

- `INFO` 상수가 컴포넌트 안에 존재했을 때의 문제점
  - 상수를 다루거나 아니면 일반적인 방치
  - 컴포넌트가 렌더링 될 때마다 해당 객체가 새로 새성성되고 참조됨
  - 업데이트가 되지 않는 일반적인 객체
  - 리액트 상태로 바꾼다던가 혹은 아예 외부로 내보내야 함.

```jsx
const NotUpdateValue = (): Element => {
   const INFO = {
	   name: 'My Component'
	   value: 'Clean Code React'
   };

   const [count, setCount] = useState(0);

   const onIncrement = () => setCount((prevCount) => prevCount + 1);
   const onDecrement = () => setCount((prevCount) => prevCount - 1);

   return (
	   <div className="App">
		   <main className="App-main">
			   <header>{INFO}</header>
			   <ShowCount info={INFO} count={count} />
			   <ButtonGroup onDecrement={onDecrement} onIncrement={onIncrement} />
		   </main>
	   </div>
   )
}
```

<br>

# ✅ 불필요한 상태 제거하기

### 🌈 결론

```tsx
// 기존
const [userList, setUserList] = useState(MOCK_DATA);
const [complUserList, setComplUserList] = useState(MOCK_DATA);

useEffect(() => {
	const newList = complUserList.filter((user) => user.completed === true);

	setUserList(newList);
}, [userList);

// 변경
const complUserList = complUserList.filter((user) => user.completed === true);
```

### ✍️ 내용

불필요한 상태를 만든다면?

- 결국에는 리액트에 의해 관리되는 값이 늘어나는 것
- 그러다보면 렌더링에 양향을 주는 값이 늘어나서 관리 포인트가 더더욱 늘어 남

컴포넌트 내부에서의 변수는?

- 렌더링 마다 고유의 값을 가지는 계산된 값

### ⭐️ 요약

1. **props를 useState에 넣지 않고** 바로 return 문에 사용하기
2. 컴포넌트 내부 변수는 **렌더링마다 고유한 값을 가짐**
3. 따라서 useState가 아닐, const로 상태를 선언하는게 좋은 경우도 있음

<br>

# ✅ useState 대신 useRef

### 🌈 결론

```tsx
// 기존
export const component = () => {
  ❌
	const [isMount, setIsMount] = useState(false);

	useEffect(() => {
		if(!isMount) {
			setIsMount(true);
		}
	}, [isMount]);
};

// 변경
export const component = () => {
  💡
	const isMount = useRef(false);

	useEffect(() => {
		isMount.current = true;

		return () => (isMOunt.current = false);
	}, [isMount]);
};
```

### ✍️ 내용

### 리렌더링 방지가 필요하다면 `useState` 대신 `useRef`

**useRef**

- 가변 컨테이너
- 한번 고정된 값을 컴포넌트 내부에서 사용할 경우 `useState`로 사용할 필요가 없음(컴포넌트의 전체적인 수명과 동일하게 지속된 정보를 일관적으로 제공해야 하는 경우)
- 꼭 DOM을 직접 조작할 때만 useRef를 사용하는 것이 아님

### ⭐️ 요약

- `useState` 대신 `useRef` 를 사용하면 컴포넌트의 생명주기와 동일한 리렌더링되지 않는 상태를 만들 수 있다.

<br>

# ✅ 연관된 상태 단순화하기

### 🌈 결론

```tsx
// 기존
const [isLoading, setIsLoading] = useState(false);
const [isFinish, setIsFinish] = useState(false);

// 변경
const PROMISE_STATE = {
	INIT: 'init',
	LOADING; 'loading',
	FINISH: 'finish'
};

const [promiseState, setPromiseState] = useState(PROMISE_STATE);
```

### ✍️ 내용

- React 는 개발하는데 있어 자유로움
- 여러 연관된 state를 만들어서 관리하는게 아니라, 하나의 불변의 값으로 관리

  ```tsx
  const PROMISE_STATE = {
  	INIT: 'init',
  	LOADING; 'loading',
  	FINISH: 'finish'
  	ERROR: 'error'
  };

  const FlatState = () => {
  	const [promiseState, setPromiseState] = useState(PROMISE_STATE);

  	const fetchData = () => {
  		// fetch Data 시도
  		setPromiseState(PROMISE_STATE.LOADING);

  		fetch(url)
  		.then(() => {
  			// fetch Data 성공
  			setPromiseState(PROMISE_STATE.FINISH);
  		})
  		.catch(() => {
  			// fetch Data 실패
  			setPromiseState(PROMISE_STATE.ERROR);
  		})
  	}

  	if (promiseState === PROMISE_STATE.LOADING) return <LoadingComponent />
  	if (promiseState === PROMISE_STATE.FINISH) return <FinishComponent />
  	if (promiseState === PROMISE_STATE.ERROR) return <ErrorComponent />
  }
  ```

### ⭐️ 요약

- 리액트의 상태를 만들 때 `연관된 것들끼리 묶어서 처리`하면 에러를 방지하고 코드가 간결해진다.

<br>

# ✅ useState 대신 useReducer로 리팩터링

---

### 🌈 결론

```tsx
// 기존
const [isLoading, setIsLoading] = useState(false);
const [isFinish, setIsFinish] = useState(false);

// 변경
const [state, dispatch] = useReducer(reducer, INIT_STATE);
```

### ✍️ 내용

- 구조화된 상태를 원한다면 `useReducer()`

```tsx
const INIT_STATE = {
  isLoading: false,
  isSuccess: false,
  isFail: false,
};

// 오타 방지 및 타입 정확성
const ACTION_TYPE = {
  FETCH_LOADING: 'FETCH_LOADING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAIL: 'FETCH_FAIL',
};

// 다른 곳에서도 사용 가능
// 순수 JS로 Third Party library 없이 상태를 관리 가능
// 그 상태를 조금 더 체계적으로 구조화 가능
const reducer = (state, action) => {
  // 보통 type을 쓰지만 action 객체의 형태는 자유
  switch (action.type) {
    case 'FETCH_LOADING':
      return { isLoading: true, isSuccess: false, isFail: false };

    case 'FETCH_SUCCESS':
      return { isLoading: false, isSuccess: true, isFail: false };

    case 'FETCH_FAIL':
      return { isLoading: false, isSuccess: false, isFail: true };

    default:
      return INIT_STATE;
  }
};

const StateToReducer = () => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const fetchData = () => {
    // fetch Data 시도
    // - 추상화
    dispatch({ type: ACTION_TYPE.FETCH_LOADING });

    fetch(url)
      .then(() => {
        // fetch Data 성공
        dispatch({ type: ACTION_TYPE.FETCH_SUCCESS });
      })
      .catch(() => {
        // fetch Data 실패
        dispatch({ type: ACTION_TYPE.FETCH_FAIL });
      });
  };

  if (state.isLoading === PROMISE_STATE.LOADING) return <LoadingComponent />;
  if (state.isSuccess === PROMISE_STATE.FINISH) return <FinishComponent />;
  if (state.isFail === PROMISE_STATE.ERROR) return <ErrorComponent />;
};
```

### ⭐️ 요약

- 여러 상태가 연관됐을 때, useState 대신, `useReducer를 사용하면 상태를 구조화` 할 수 있음

<br>

# ✅ 상태 로직 Custom Hooks로 뽑아내기

### 🌈 결론

```tsx
// 기존
const [state, setState] = useState();

useEffect(() => {
  const fetchData = () => {
    setState(state);
  };

  fetchDate();
}, []);

if (state.isLoading) return <LoadingComponent />;
if (state.isFail) return <FailComponent />;

// 변경
const { isLoading, isFail } = useFetchData();

if (state.isLoading) return <LoadingComponent />;
if (state.isFail) return <FailComponent />;
```

### ✍️ 내용

- 로직만 뺌

```tsx
const INIT_STATE = {
	isLoading: false,
	isSuccess: false,
	isFail: false,
};

// 오타 방지 및 타입 정확성
const ACTION_TYPE = {
	FETCH_LOADING: 'FETCH_LOADING',
	FETCH_SUCCESS: 'FETCH_SUCCESS',
	FETCH_FAIL: 'FETCH_FAIL',
}

// 다른 곳에서도 사용 가능
// 순수 JS로 Third Party library 없이 상태를 관리 가능
// 그 상태를 조금 더 체계적으로 구조화 가능
const reducer = (state, action) => {
	// 보통 type을 쓰지만 action 객체의 형태는 자유
	switch (action.type) {
		case 'FETCH_LOADING':
			return { isLoading: true, isSuccess: false, isFail: false }

		case 'FETCH_SUCCESS':
			return { isLoading: false, isSuccess: true, isFail: false }

		case 'FETCH_FAIL':
			return { isLoading: false, isSuccess: false, isFail: true }

		default:
			return INIT_STATE;
	}
};

const useFetchData = (url) => {
	const [state, dispatch] = useReducer(reducer, INIT_STATE);

	useEffect(() => {
		const fetchData = async () => {
		// fetch Data 시도
		// - 추상화
		dispatch({ type: ACTION_TYPE.FETCH_LOADING });

		await fetch(url)
		.then(() => {
			// fetch Data 성공
			dispatch({ type: ACTION_TYPE.FETCH_SUCCESS });
		})
		.catch(() => {
			// fetch Data 실패
			dispatch({ type: ACTION_TYPE.FETCH_FAIL });
			})
		}
	}, [url)

	return state
}

const  CustomHooks= () => {
	const { isLoading, isFail, isSuccess } = useFetchData('url);

	if (state.isLoading === PROMISE_STATE.LOADING) return <LoadingComponent />
	if (state.isSuccess === PROMISE_STATE.FINISH) return <FinishComponent />
	if (state.isFail === PROMISE_STATE.ERROR) return <ErrorComponent />
}
```

### ⭐️ 요약

- `Custom Hooks를 사용하면` 코드를 확장성 있고 재사용 가능하게 작성할 수 있다.

### 참고

- [클린 리액트](https://www.udemy.com/course/clean-code-react/learn/lecture/41573010#overview)

```toc

```
