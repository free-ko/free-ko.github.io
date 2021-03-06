---
emoji: ๐จโ๐ป
title: ์ฝ๋ฐฑ ํจ์, ์ญ์ , ์ง์ฐ๊ธฐ - forEach(), delete(), clear()
date: '2021-11-05 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  ์ฝ๋ฐฑ ํจ์, ์ญ์ , ์ง์ฐ๊ธฐ: forEach(), delete(), clear()
</h1>

<br>

## 1. forEach()

- Map ์ธ์คํด์ค๋ฅผ ๋ฐ๋ณตํ๋ฉด์ `callback` ํจ์ ํธ์ถ
  - `map()`, `filter()` ๋ฑ์ `callback` ํจ์๊ฐ ๋๋ฐ๋๋ ๋ฉ์๋ ์ฌ์ฉ ๋ถ๊ฐ
- callback ํจ์์์ ๋๊ฒจ์ฃผ๋ ํ๋ผ๋ฏธํฐ

  - value, key, Map ์ธ์คํด์ค key, value ์์๊ฐ ์๋

    ```tsx
    const obj = new Map([
      ['one', 100],
      ['two', 200],
    ]);

    const callback = (value, key, map) => {
      console.log(`${key}, ${value}`);
    };

    obj.forEach(callback);

    // ์คํ๊ฒฐ๊ณผ
    // one, 100
    // two, 200
    ```

  - ์ฝ๋ฐฑ ํจ์์์ `this` ์ฌ์ฉ

    ```tsx
    const obj = new Map([
    	["one", 100],
    	["two", 200]
    ]);

    function callback = (value, key, map) => {
    	console.log(`${key}, ${value}, ${this.check}`);
    };

    obj.forEach(callback, {check: 50});

    // 1. ์ฝ๋ฐฑ ํจ์๋ฅผ ์ผ๋ฐ ํจ์๋ก ์์ฑํ์
    // 2. ์ฝ๋ฐฑ ํจ์๋ฅผ ํ์ดํ ํจ์๋ก ์์ฑํ๋ฉด this๊ฐ window ์ค๋ธ์ ํธ๋ฅผ ์ฐธ์กฐํจ
    // 3. ์ฝ๋ฐฑ ํจ์์์ this๊ฐ forEach()์ ๋ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ ์์ฑํ ์ค๋ธ์ ํ ์ฐธ์กฐ ํจ

    // ์คํ๊ฒฐ๊ณผ
    // one, 100, 50
    // two, 200, 50
    ```

<br>

## 2. delete()

- Map ์ธ์คํด์ค์ ํ๋ผ๋ฏธํฐ ๊ฐ๊ณผ ๊ฐ์ entry ์ญ์ 

  - ๊ฐ์ key๊ฐ ์์ผ๋ฉด `true` ๋ฐํ ์์ผ๋ฉด `false` ๋ฐํ

    ```tsx
    const obj = new Map([
    	["one", 100],
    	[{}, "์ค๋ธ์ ํธ"]
    ]};

    console.log(obj.delete("one"));   // true
    console.log(obj.delete({}));      // false

    const sports = {};
    obj.set(sports, "์คํฌ์ธ ");

    console.log(obj.delte(sports));   // true
    ```

<br>

## 3. clear()

- Map ์ธ์คํด์ค์ ๋ชจ๋  entry๋ฅผ ์ง์

  - Map ์ธ์คํด์ค๋ฅผ ์ญ์ ํ๋ ๊ฒ์ ์๋
  - ๋ฐ๋ผ์ `[key, value]`๋ฅผ ์ถ๊ฐํ  ์ ์์

    ```tsx
    const obj = new Map([
      ['one', 100],
      ['two', 200],
    ]);

    console.log(obj.size); // 2

    obj.clear();
    console.log(obj.size); // 0

    obj.set('add', '์ถ๊ฐ');
    console.log(obj.size); // 1
    ```

- Size ํ๋กํผํฐ
  - Map ์ธ์คํด์ค์ entry ์๋ฅผ ๋ฐํ
  - ๊ฐ๋ฐ์ ์ฝ๋๋ก ์์  ํ  ์ ์์

```toc

```
