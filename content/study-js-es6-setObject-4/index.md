---
emoji: ๐จโ๐ป
title: ์ฝ๋ฐฑ ํจ์, ์ญ์ , ์ง์ฐ๊ธฐ - forEach(), delete(), clear()
date: '2021-11-13 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  ์ฝ๋ฐฑ ํจ์, ์ญ์ , ์ง์ฐ๊ธฐ - forEach(), delete(), clear()
</h1>

<br>

## 1. forEach()

- `Set` ์ธ์คํด์ค๋ฅผ ๋ฐ๋ณตํ๋ฉด์ `callBack` ํจ์ ํธ์ถ

  - `map()`, `filter()` ๋ฑ์ `callback` ํจ์๊ฐ ๋๋ฐ๋๋ ๋ฉ์๋ ์ฌ์ฉ ๋ถ๊ฐ

- `callbak` ํจ์์ ๋๊ฒจ์ฃผ๋ ํ๋ผ๋ฏธํฐ

  - `value`, `key(value)`, `Set` ์ธ์คํด์ค

    ```tsx
    const obj = new Set(['one', () => {}]);

    function callback(value, key, set) {
      console.log(value);
    }

    obj.forEach(callback);

    // ์คํ๊ฒฐ๊ณผ
    // one
    // () => {}
    ```

  - ์ฝ๋ฐฑ ํจ์์์ `this` ์ฌ์ฉ

    ```tsx
    const obj = new Set(['one', 'two']);

    function callback(value, key, set) {
      console.log(`${value}, ${this.check}`);
    }

    obj.forEach(callback, { check: 'ABC' });
    // ์ฝ๋ฐฑ ํจ์์์ this๊ฐ forEach()์ ๋ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ ์์ฑํ ์ค๋ธ์ ํธ๋ฅผ ์ฐธ์กฐํ๊ฒ ํ๋ ค๋ฉด
    // ์ผ๋ฐ ํจ์๋ก ์์ฑํด์ผ ํจ

    // ์คํ๊ฒฐ๊ณผ
    // one, ABC
    // two, ABC
    ```

<br>

## 2. delete()

- `Set` ์ธ์คํด์ค์์ ํ๋ผ๋ฏธํฐ ๊ฐ์จ ๊ฐ์ ์๋ฆฌ๋จผํธ ์ญ์ 

- ๊ฐ์ `value` ๊ฐ ์์ด ์ญ์ ์ ์ฑ๊ณตํ๋ฉด `true` ๋ฐํ

  - ์ญ์ ์ ์คํจํ๋ฉด `false` ๋ฐํ

    ```tsx
    const obj = new Set(['one', 'two']);

    console.log(obj.delete('one')); // true
    console.log(obj.delete('one')); // false
    ```

<br>

## 3. clear()

- `Set` ์ธ์คํด์ค์ ๋ชจ๋  ์๋ฆฌ๋จผํธ๋ฅผ ์ง์

  - `Set` ์ธ์คํด์ค๋ฅผ ์ญ์ ํ๋ ๊ฒ์ ์๋, ๋ฐ๋ผ์ `value`๋ฅผ ์ถ๊ฐํ  ์ ์์

    ```tsx
    const obj = new Set(['one', 'two']);

    console.log(obj.size); // 2

    obj.clear();
    console.log(obj.size); // 0

    obj.add('one');
    console.log(obj.size); // 1
    ```

```toc

```
