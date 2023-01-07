---
emoji: 👨‍💻
title: setPrototypeOf() - 인스턴스 사용
date: '2021-09-26 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  setPrototypeOf() - 인스턴스 사용
</h1>

<br>

## setPorotytpeOf()

- 첫 번째 파라미터의`prototype`으로 두 번째 파라미터를 설정

  ```tsx
  let obj = { 0: 10, length: 1 };

  Object.setPrototypeOf(obj, Array.prototype);

  // 1. obj는 인스턴스임
  // 2. 인스턴스에는 prototype이 없으며 __proto__가 있으므로 __proto__에 설정하는 것과 같음
  ```

- 첫 번째 파라미터에 인스턴스 작성

  - `setPrototypeOf()` 실행 후 인스턴스 구조

  ```tsx
  const obj = { 0: 10, 1: 20, length: 2 };

  /*
  	1. Array-Like 오브젝트임
  
  	2. 오른쪽의 obj를 펼치면
  	- prototype은 없고 __proto__만 있음
  	
  	3. 이것은 오브젝트가 아니라
  	- Object.prototype에 연결된 메소드로
  	- 생성된 인스턴스를 뜻함
  
  	4. __proto__에 Object.prototype에 연결된
  	- 메소드가 설정되어 있으므로
  	- Array 오브젝트의 메소드를 사용할 수 없음
  */

  Object.setPrototypeOf(obj, Array.prototype);

  /*
  	1. obj의 __proto__에 Array.prototype에 연결된
  	- 메소드를 설정함
  
  	2. 오른쪽의 obj를 펼치면
  	- Object.prototype에 연결된 메소드가 없어지고
  	- Array.prototype에 연결된 메소드가 표시됨
  
  	3. 설명을 위한 것으로 일반적으로 이렇게 사용하지 않지만
  	- 이처럼 __proto__에 설정된 메소드를 바꿀 수 있음
  */

  const callBack = (element, index, all) => console.log(element);

  obj.forEach(callback);

  /*
  	1. obj가 배열이 아니므로 forEach()를 사용할 수 없지만,
  	- 바로 앞에서 __proto__에 Array.prototype에 연결된
  	- 메소드를 설정했으므로 사용할 수 있음
  
  	2. 콜백 함수가 호출되면서 반복하게 됨
  	- console에 10, 20출력 됨
  */

  const check = Object.prototype;
  // Object.prototype이 바뀌지 않음
  ```

- ES5에 `getPrototypeOf()`가 있음

```toc

```
