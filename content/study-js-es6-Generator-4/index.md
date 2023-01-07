---
emoji: 👨‍💻
title: next()
date: '2021-10-13 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  next()
</h1>

<br>

## next()

- `next()` 는 `yield` 단위로 실행

  - `yield` 수 만큼 `next()` 를 작성해야 `yield` 전체를 실행

- `next()` 를 호출하면 이전 `yield`의 다음부터 `yield`까지 실행

  ```tsx
  function* sports(value) {
  	value += 20;
  	const param = tield ++value;
  	value = param + value;
  	yield ++value;
  };

  const obj = sports(10);

  console.log(obj.next());     // {value: 31, done: false}
  console.log(obj.next(20));   // {value: 52, done: false}

  // 1. 첫 번째의 obj.next()를 호출하면 value += 20을 실행하고 yield ++value;를 실행함
  // 2. {value: 31, done: false}를 반환
  // 3. 왼쪽의 param에 값을 할당하지 않음
  // 4. 두 번째의 obj.next(20)을 호출하면 첫 번째 yield의 다음 부터 다음의 yield까지 실행 함
  // 5. 여기서 yield의 다음이란 파라미터 값 20을 param에 설정하는 것을 뜻함
  // 6. 20 + 31은 51이 되며
  // 7. yield ++value;에서 1을 더해 52를 반환함
  ```

<br>

- `yield` 를 작성하지 않았을 때

  ```tsx
  function* sports(value) {
    ++value;
    console.log(value);
  }

  const obj = sports(10);
  console.log(obj.next());

  // 1. 첫 번째 obj.next()를 호출하면 제너레이터 함수를 실행하여 value 값이 증가하지만
  // 2. yield가 없으므로 값이 반환되지 않음

  // 실행 결과
  // 11
  // {value: undefined, done: treu}
  ```

  <br>

- 제너레이터 함수에 `return` 문을 작성했을 때

  ```tsx
  function* sports(value) {
    return ++value;
  }

  const obj = sports(10);
  console.log(obj.next()); // {value: 11, done: false}
  console.log(obj.next()); // {value: undefined, done: true}
  ```

  <br>

- 함수는 호출 할 때마다 변수에 초깃값을 설정

- 제너레이터 함수는 제너레이터 오브젝트를 생성할 때 초깃값을 설정

  - `next()` 로 실행할 때 마다 초깃값을 설정하지 않음

  - 변숫값을 그래도 유지

  ```tsx
  const sports = function* (param) {
    const one = param + 10;
    yield one;
    let two = 2;
    yield one + two;
  };

  const obj = sports(10);

  /*
  1. 제너레이터 함수에 2개의 yield가 있음
  	- 또한 const one과 let two가 있음
  
  2. obj의 [[Scope]]를 펼치면 0: Local
  	- one: undefined, param: 10, two: undefined
  
  3. param에 10이 있다는 것은
  	- sports 함수 안으로 들어간 것
  	- sports 함수가 호출되어
  	- 실행 콘텍스트의 초기화 단계에서 초깃값을 설정한 것
  	- 단지, 함수 안의 코드를 실행하지 않은 것
  */

  console.log(obj.next());

  /*
  1. obj.next()를 호출하면
  	- sports 제너레이터 함수 안으로 이동 함
  
  2. const one = param + 10;에서 멈추게 하면
  	- one: undefined, param: 10, two: undfined임
  	- 이 값은 제너레이터 오브젝트를 만들때 설정한 값
  
  3. const one = param + 10;
  	- one 변수의 값이 20으로 변경됨
  
  4. yield one;에서 {value: 20, done: false}를 반환함
  */

  console.log(obj.next());

  /*
  1. obj.next()를 호출 하면
  	- sports 제너레이터 함수 안으로 이동
  
  2. let two = 2;에서 멈추게 하면
  	- one: 20, two: undefined임
  	- one 변숫값 20은 이전 처리에서 설정한 값
  
  3. 함수를 빠져 나온 후 다시 obj.next()를 호출 하면
  	- 함수 안으로 이동하게 되며
  	- 함수 안의 변수에 초깃값을 설정하는데
  	- 앞의 obj.next()로 one 변수에 할당한 값이 그대로 남아 있음
  
  4. 이것이 제너레이터 함수의 특징임
  	- 제너레이터 오브젝트를 생성할 때 초깃값을 설정하고
  	- next()를 호출할 때 마다 초깃값을 설정하지 않음
  */
  ```

```toc

```
