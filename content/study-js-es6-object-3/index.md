---
emoji: ๐จโ๐ป
title: ์ค๋ธ์ ํธ ๋ณต์ฌ - deep copy
date: '2021-09-24 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  ์ค๋ธ์ ํธ ๋ณต์ฌ: Deep copy
</h1>

<br>

## Deep Copyt

- Object๋ฅผ ํ ๋นํ๋ฉด ํ๋กํผํฐ ๊ฐ์ด ์ฐ๋๋จ

  - ํ ์ชฝ ์ค๋ธ์ ํธ์ ํ๋กํผํฐ ๊ฐ์ ๋ฐ๊พธ๋ฉด, ๋ค๋ฅธ ์ค๋ธ์ ํธ์ ํ๋กํผํฐ ๊ฐ๋ ๋ฐ๋

  ```tsx
  const sports = {
    item: '์ถ๊ตฌ',
  };

  let copy = sports;
  sports.item = '๋๊ตฌ';

  console.log(copy.item); // ๋๊ตฌ
  ```

- `assign()` ํจ์๋ก ๋ณต์ฌ

  ```tsx
  const sports = {
    item: '์ถ๊ตฌ',
  };

  let copy = {};
  Object.assign(copy, sports);
  sports.item = '๋๊ตฌ';

  console.log(copy.item); // ์ถ๊ตฌ
  ```

- ๊ทธ๋๋ ์ฐ๋๋๋ ํํ

  ```tsx
  const book = {
    item: { title: '์๋ฐ์คํฌ๋ฆฝํธ' },
  };

  let copy = {};
  Object.assign(copy, book);
  copy.item.title = '์ฑ';

  console.log(book.item.title); // ์ฑ

  // ์์์๋ ํ๋กํผํฐ๋ฅผ ๋ณต์ฌํ์ง ์๊ณ  Object ์ฐธ์กฐ๋ฅผ ๋ณต์ฌํ๊ธฐ ๋๋ฌธ
  ```

- ์ฐ๋๋์ง ์๊ฒ ํ๋ ค๋ฉด ํ๋กํผํฐ ๋จ์๋ก ๋ณต์ฌ

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

  book.item.title = "์ฑ";

  console.log(copy.item.title);   // JS

  // 1. ํ๋กํผํฐ ๋จ์๋ก ๋ณต์ฌํ๋ฉด ์ฐ๋๋์ง๋ง
  // 2. ๋จ๊ณ์ ๊น์ด๊ฐ ์ ๋์ ์ด๋ฉด ์ฝ๋๊ฐ ๋ณต์กํด์ง
  // 3. ๋ค๋จ๊ณ ๊ณ์ธต ๊ตฌ์กฐ์์ ๊ฐ์ด ์ฐ๋๋์ง ์๋๋ก ๋ณต์ฌํ๋ ๊ฒ์ deep copy, deep clone์ด๋ผ๊ณ  ๋ถ๋ฆ
  ```

- JSON ํจ์ ํ์ฉ

  ```tsx
  const book = {
    item: { title: 'JS' },
  };

  const copy = JSON.parse(JSON.stringify(book));

  book.item.title = '์ฑ';

  console.log(copy.item.title); // JS

  // 1. JSON.strigify()๋ก ๋ฌธ์์ด๋ก ๋ณํ ํ
  // 2. JSON.parse()๋ก ํ์ฑํ๋ฉด ์ฐ๋๋์ง ์์
  // 3. ์ด๊ฒ๋ ํ๋์ ๋ฐฉ๋ฒ
  ```

```toc

```
