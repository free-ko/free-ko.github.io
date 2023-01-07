---
emoji: 👨‍💻
title: 제너레이터 오브젝트 메소드 - return(), throw()
date: '2021-10-16 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  제너레이터 오브젝트 메소드: return(), throw()
</h1>

## 1. return()

```tsx
function* sports(count) {
  while (true) {
    yield ++count;
  }
}

const obj = sports(10);

console.log(obj.next()); // {value: 11, done: false}
console.log(obj.return(70)); // {value: 70, done: true}
console.log(obj.next(50)); // {value: undefined, done: true}

// 1. obj.return(70) 이터레이터를 종료 시키며 파라미터 값 70을 반환
// 2. obj.next(50) 이터레이터가 종료되었으므로 {value: undefined, done: true} 반환
// 3. 파라미터 값 50을 반환하지 않음
```

- 이터레이터를 종료 시킴
- `return()` 파라미터 값을 `{ value: 값, done: true }`
- `value` 프로퍼티 값으로 설정

<br>

## 2. throw()

- `Error`를 의도적으로 발생 시킴

- 제너레이터 함수의 `catch()` 문에서 에러를 받음

  ```tsx
  function* sports() {
  	try {
  		tield 10;
  	} catch (message) {
  		yield message;
  	};
  	yield 20;
  };

  const obj = sports();

  console.log(obj.next());
  console.log(obj.throw("에러 발생"));
  console.log(obj.next());

  // 1. obj.throw("에러 발생")를 실행하면 sports()의 catch(message)가 실행되고 "에러 발생"이 message에 설정됨
  // 2. catch()의 yield message를 수행하게 되며 {value: "에러 발생", done: false}를 반환함 제너레이터가 종료되지 않음
  // 3. 다음의 obj.next() 호출 throw() 호출로 인해 에러가 발생하지만 {done: false}이므로 next()를 호출할 수 있음
  // 4. yeild 20;을 실행하게 되며 {value: 20, done: flase}를 반환함
  ```

- 제너레이터 함수에 `throw` 문을 작성

  ```tsx
  function* sports() {
    throw '에러 발생';
    yield 10;
  }

  const obj = sports();

  try {
    const result = obj.next();
  } catch (message) {
    console.log(message);
  }

  console.log(obj.next());

  // 1. const result = obj.next();를 실행하면 제너레이터 함수에서 throw로 인해 에러가 발생
  // 2. 그래서 next()를 try문에 작성했음
  // 3. try문의 catch(message)에서 에러를 받음
  // 4. throw "에러 발생"에서 "에러 발생"이 message에 설정됨
  // 5. 제너레이터 함수에서 에러가 발생하면 이터레이터가 종료됨
  // 6. 마지막 줄에서 obj.next()를 호출하면 제너레이터가 실행되지 않음
  // 7. 제너레이터 함수에 yield 10이 있지만 {value: undefined, done: true} 반환
  ```

```toc

```
