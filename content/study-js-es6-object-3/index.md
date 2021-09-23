---
emoji: 👨‍💻
title: 오브젝트 복사 - deep copy
date: '2021-09-24 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  오브젝트 복사: Deep copy
</h1>

<br>

## Deep Copyt

- Object를 할당하면 프로퍼티 값이 연동됨

  - 한 쪽 오브젝트의 프로퍼티 값을 바꾸면, 다른 오브젝트의 프로퍼티 값도 바뀜

  ```tsx
  const sports = {
    item: '축구',
  };

  let copy = sports;
  sports.item = '농구';

  console.log(copy.item); // 농구
  ```

- `assign()` 함수로 복사

  ```tsx
  const sports = {
    item: '축구',
  };

  let copy = {};
  Object.assign(copy, sports);
  sports.item = '농구';

  console.log(copy.item); // 축구
  ```

- 그래도 연동되는 형태

  ```tsx
  const book = {
    item: { title: '자바스크립트' },
  };

  let copy = {};
  Object.assign(copy, book);
  copy.item.title = '책';

  console.log(book.item.title); // 책

  // 위에서는 프로퍼티를 복사하지 않고 Object 참조를 복사하기 때문
  ```

- 연동되지 않게 하려면 프로퍼티 단위로 복사

  ```tsx
  const book = {
  	item : {title: "JS"}
  }

  let copy = {};

  for (let key in book) {
  	let value = book[key];
  	copy[key] = {};

  	for (let name in value) {
  		copy[key]name] = value[name];
  	}
  }

  book.item.title = "책";

  console.log(copy.item.title);   // JS

  // 1. 프로퍼티 단위로 복사하면 연동되지만
  // 2. 단계의 깊이가 유동적이면 코드가 복잡해짐
  // 3. 다단계 계층 구조에서 값이 연동되지 않도록 복사하는 것을 deep copy, deep clone이라고 부름
  ```

- JSON 함수 활용

  ```tsx
  const book = {
    item: { title: 'JS' },
  };

  const copy = JSON.parse(JSON.stringify(book));

  book.item.title = '책';

  console.log(copy.item.title); // JS

  // 1. JSON.strigify()로 문자열로 변환 후
  // 2. JSON.parse()로 파싱하면 연동되지 않음
  // 3. 이것도 하나의 방법
  ```

```toc

```
