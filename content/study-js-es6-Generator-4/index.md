---
emoji: ๐จโ๐ป
title: next()
date: '2021-10-13 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  next()
</h1>

<br>

## next()

- `next()` ๋ `yield` ๋จ์๋ก ์คํ

  - `yield` ์ ๋งํผ `next()` ๋ฅผ ์์ฑํด์ผ `yield` ์ ์ฒด๋ฅผ ์คํ

- `next()` ๋ฅผ ํธ์ถํ๋ฉด ์ด์  `yield`์ ๋ค์๋ถํฐ `yield`๊น์ง ์คํ

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

  // 1. ์ฒซ ๋ฒ์งธ์ obj.next()๋ฅผ ํธ์ถํ๋ฉด value += 20์ ์คํํ๊ณ  yield ++value;๋ฅผ ์คํํจ
  // 2. {value: 31, done: false}๋ฅผ ๋ฐํ
  // 3. ์ผ์ชฝ์ param์ ๊ฐ์ ํ ๋นํ์ง ์์
  // 4. ๋ ๋ฒ์งธ์ obj.next(20)์ ํธ์ถํ๋ฉด ์ฒซ ๋ฒ์งธ yield์ ๋ค์ ๋ถํฐ ๋ค์์ yield๊น์ง ์คํ ํจ
  // 5. ์ฌ๊ธฐ์ yield์ ๋ค์์ด๋ ํ๋ผ๋ฏธํฐ ๊ฐ 20์ param์ ์ค์ ํ๋ ๊ฒ์ ๋ปํจ
  // 6. 20 + 31์ 51์ด ๋๋ฉฐ
  // 7. yield ++value;์์ 1์ ๋ํด 52๋ฅผ ๋ฐํํจ
  ```

<br>

- `yield` ๋ฅผ ์์ฑํ์ง ์์์ ๋

  ```tsx
  function* sports(value) {
    ++value;
    console.log(value);
  }

  const obj = sports(10);
  console.log(obj.next());

  // 1. ์ฒซ ๋ฒ์งธ obj.next()๋ฅผ ํธ์ถํ๋ฉด ์ ๋๋ ์ดํฐ ํจ์๋ฅผ ์คํํ์ฌ value ๊ฐ์ด ์ฆ๊ฐํ์ง๋ง
  // 2. yield๊ฐ ์์ผ๋ฏ๋ก ๊ฐ์ด ๋ฐํ๋์ง ์์

  // ์คํ ๊ฒฐ๊ณผ
  // 11
  // {value: undefined, done: treu}
  ```

  <br>

- ์ ๋๋ ์ดํฐ ํจ์์ `return` ๋ฌธ์ ์์ฑํ์ ๋

  ```tsx
  function* sports(value) {
    return ++value;
  }

  const obj = sports(10);
  console.log(obj.next()); // {value: 11, done: false}
  console.log(obj.next()); // {value: undefined, done: true}
  ```

  <br>

- ํจ์๋ ํธ์ถ ํ  ๋๋ง๋ค ๋ณ์์ ์ด๊น๊ฐ์ ์ค์ 

- ์ ๋๋ ์ดํฐ ํจ์๋ ์ ๋๋ ์ดํฐ ์ค๋ธ์ ํธ๋ฅผ ์์ฑํ  ๋ ์ด๊น๊ฐ์ ์ค์ 

  - `next()` ๋ก ์คํํ  ๋ ๋ง๋ค ์ด๊น๊ฐ์ ์ค์ ํ์ง ์์

  - ๋ณ์ซ๊ฐ์ ๊ทธ๋๋ ์ ์ง

  ```tsx
  const sports = function* (param) {
    const one = param + 10;
    yield one;
    let two = 2;
    yield one + two;
  };

  const obj = sports(10);

  /*
  1. ์ ๋๋ ์ดํฐ ํจ์์ 2๊ฐ์ yield๊ฐ ์์
  	- ๋ํ const one๊ณผ let two๊ฐ ์์
  
  2. obj์ [[Scope]]๋ฅผ ํผ์น๋ฉด 0: Local
  	- one: undefined, param: 10, two: undefined
  
  3. param์ 10์ด ์๋ค๋ ๊ฒ์
  	- sports ํจ์ ์์ผ๋ก ๋ค์ด๊ฐ ๊ฒ
  	- sports ํจ์๊ฐ ํธ์ถ๋์ด
  	- ์คํ ์ฝํ์คํธ์ ์ด๊ธฐํ ๋จ๊ณ์์ ์ด๊น๊ฐ์ ์ค์ ํ ๊ฒ
  	- ๋จ์ง, ํจ์ ์์ ์ฝ๋๋ฅผ ์คํํ์ง ์์ ๊ฒ
  */

  console.log(obj.next());

  /*
  1. obj.next()๋ฅผ ํธ์ถํ๋ฉด
  	- sports ์ ๋๋ ์ดํฐ ํจ์ ์์ผ๋ก ์ด๋ ํจ
  
  2. const one = param + 10;์์ ๋ฉ์ถ๊ฒ ํ๋ฉด
  	- one: undefined, param: 10, two: undfined์
  	- ์ด ๊ฐ์ ์ ๋๋ ์ดํฐ ์ค๋ธ์ ํธ๋ฅผ ๋ง๋ค๋ ์ค์ ํ ๊ฐ
  
  3. const one = param + 10;
  	- one ๋ณ์์ ๊ฐ์ด 20์ผ๋ก ๋ณ๊ฒฝ๋จ
  
  4. yield one;์์ {value: 20, done: false}๋ฅผ ๋ฐํํจ
  */

  console.log(obj.next());

  /*
  1. obj.next()๋ฅผ ํธ์ถ ํ๋ฉด
  	- sports ์ ๋๋ ์ดํฐ ํจ์ ์์ผ๋ก ์ด๋
  
  2. let two = 2;์์ ๋ฉ์ถ๊ฒ ํ๋ฉด
  	- one: 20, two: undefined์
  	- one ๋ณ์ซ๊ฐ 20์ ์ด์  ์ฒ๋ฆฌ์์ ์ค์ ํ ๊ฐ
  
  3. ํจ์๋ฅผ ๋น ์ ธ ๋์จ ํ ๋ค์ obj.next()๋ฅผ ํธ์ถ ํ๋ฉด
  	- ํจ์ ์์ผ๋ก ์ด๋ํ๊ฒ ๋๋ฉฐ
  	- ํจ์ ์์ ๋ณ์์ ์ด๊น๊ฐ์ ์ค์ ํ๋๋ฐ
  	- ์์ obj.next()๋ก one ๋ณ์์ ํ ๋นํ ๊ฐ์ด ๊ทธ๋๋ก ๋จ์ ์์
  
  4. ์ด๊ฒ์ด ์ ๋๋ ์ดํฐ ํจ์์ ํน์ง์
  	- ์ ๋๋ ์ดํฐ ์ค๋ธ์ ํธ๋ฅผ ์์ฑํ  ๋ ์ด๊น๊ฐ์ ์ค์ ํ๊ณ 
  	- next()๋ฅผ ํธ์ถํ  ๋ ๋ง๋ค ์ด๊น๊ฐ์ ์ค์ ํ์ง ์์
  */
  ```

```toc

```
