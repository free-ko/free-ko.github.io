---
emoji: 👨‍💻
title: Arrow Function 구조
date: '2021-09-02 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 화살표 함수 구조, arguments 사용 불가
</h1>

<br>

## 1) 화살표 함수 구조

- `function`을 `=>` 로 표기하는 것이 전부가 아님
- 화살표 함수는 일반 함수와 구조가 다름

  - 화살표 함수 나름의 특징이 있음

  ```tsx
  const book = function () {
    return 100;
  };

  // 위의 함수는 prototype과 constructor가 있음

  const point = () => 100;

  // 1. 위의 화살표 함수는 prototype과 construcotr가 없음
  // 2. prototype에 메소드를 연결하여 확장 할 수 없음
  // 3. prototype이 없으므로 그만큼 가벼움(prototype에 있는 연산자가 없기 때문에)
  // 4. new 연산자로 인스턴스를 생성할 수 없음
  // 5. 이것이 화살표 함수의 특징이며 용도임
  ```

<br>

## 2) Arguments 사용 불가

- `Arguments`(파라미터가 유동적일 때 사용하는 것) 사용 할 수 없음

```tsx
"use strict"

const point = () = > {
	try {
		const args = arguments;
	} catch(error) {
			console.log("arguments 사용 불가");
	}
}

point(10, 20);

/*
1. point(10, 20) 형태로 호출하면
- 일반 함수에서는 arguments에 10, 20이 설정되지만

2. 화살표 함수에서 ReferenceError가 발생함
- 즉, arguemtns를 사용할 수 없음

3. point 함수 구조를 전개하면
- arguements가 표시는 됨
- 그 이유는 일반함수와 구조를 맞추기 위해서

*/
```

- `Arguemtns` 대신에 `rest` 파라미터 사용

<br>

```toc

```
