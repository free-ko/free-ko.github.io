---
emoji: ๐จโ๐ป
title: ๊ฐ ์ค์ , ์ถ์ถ ๋ฉ์๋ - set(), get(), has()
date: '2021-11-03 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  ๊ฐ ์ค์ , ์ถ์ถ ๋ฉ์๋ - set(), get(), has()
</h1>

## 1. set()

- Map ์ธ์คํด์ค์ key, value ์ค์ 

  ```tsx
  let obj = new Map();
  obj.set("one", 100);
  obj.set({}, "์ค๋ธ์ ํธ");
  obj.set(function(){}, "Function");
  obj.set(new Number{"100"), "์ธ์คํด์ค");
  obj.set(NaN, "Not a Number");

  for (let [key, value] of obj) {
  	console.log(`${key} : ${value}`);
  };

  // [์คํ ๊ฒฐ๊ณผ]
  // one : 100
  // [ovbject Object] : ์ค๋ธ์ ํธ
  // function(){} : Function
  // 100 : ์ธ์คํด์ค
  // NaN : Not a Number
  ```

  - key, value ์์๋ก ํ๋ผ๋ฏธํฐ ์์ฑ
  - key, value๋ฅผ ์ค์ ํ ์ธ์คํด์ค ๋ฐํ

- key ๊ฐ์ด ๊ฐ์ผ๋ฉด value๊ฐ ๋ฐ๋

  ```tsx
  let obj = new Map();
  const book = {};
  obj.set(book, '์ฒซ ๋ฒ์งธ');
  obj.set(book, '๋ ๋ฒ์งธ');

  for (let [key, value] of obj) {
    console.log(`${key} : ${value}`);
  }

  // 1. obj.set(book, "์ฒซ ๋ฒ์งธ"); ์ธ๋ถ์ ์์ฑํ book ์ค๋ธ์ ํธ์ ๋ฉ๋ชจ๋ฆฌ ์ฃผ์๋ฅผ key ๊ฐ์ผ๋ก ์ฌ์ฉํจ
  // 2. obj.set(book, "๋ ๋ฒ์งธ"); book ์ค๋ธ์ ํธ์ ๋ฉ๋ชจ๋ฆฌ ์ฃผ์์ ๊ฐ์ key ๊ฐ์ด ์์ผ๋ฏ๋ก ๊ฐ์ด ๋์ฒด ๋จ

  // ์คํ ๊ฒฐ๊ณผ
  // [object Object] : ๋ ๋ฒ์งธ
  ```

<br>

## 2. get()

- Map์์ Key๊ฐ์ด ๊ฐ์ `Value` ๋ฐํ

  - key ๊ฐ์ด ๊ฐ์ง ์๊ฑฐ๋ ํ์์ด ๋ค๋ฅธ `undefined` ๋ฐํ

    ```tsx
    let obj = new Map([
      ['one', 100],
      ['200', 'String ํ์'],
    ]);

    console.log(obj.get('one')); // 100
    console.log(obj.get('two')); // undefined
    console.log(obj.get(200)); // undefined

    // 1. tow๊ฐ key์ ์์ผ๋ฏ๋ก undefined์ ๋ฐํ
    // 2. 200์ด ์์ง๋ง ํ์์ด ๋ค๋ฅด๋ฏ๋ก undefined๋ฅผ ๋ฐํ
    ```

- ์ค๋ธ์ ํธ ์ค์ ๊ณผ ์ถ์ถ

  ```tsx
  let obj = new Map();
  const like = { sports: '์คํฌ์ธ ' };
  obj.set(like, { value: '๋๊ตฌ' });

  console.log(obj.get(like)); // {value: ๋๊ตฌ}

  // 1. ๊ฐ์ ๋ฉ๋ชจ๋ฆฌ ์ฃผ์๋ฅผ ์ฌ์ฉ ํจ
  ```

<br>

## 3. has()

- Map ์ธ์คํด์ค์์ key์ ์กด์ฌ ์ฌ๋ถ๋ฅผ ๋ฐํ

  - key๊ฐ ์์ผ๋ฉด `true`, ์๋๋ฉด `false`

    ```tsx
    const obj = new Map([['one', 100]]);

    console.log(obj.has('one')); // true
    console.log(obj.has('two')); // false
    ```

```toc

```
