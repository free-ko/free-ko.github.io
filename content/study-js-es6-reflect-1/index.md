---
emoji: ๐จโ๐ป
title: Reflect ์ค๋ธ์ ํธ, Proxy ์ฌ์ฉ
date: '2021-12-05 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐ Reflect ์ค๋ธ์ ํธ, Proxy ์ฌ์ฉ
</h1>

<br>

## 1. Reflect

- ๋นํธ์ธ ์ค๋ธ์ ํธ
- `constructor` ๊ฐ ์์ผ๋ฏ๋ก ์ธ์คํด์ค๋ฅผ ์์ฑ ํ  ์ ์์
- `reflect.get()` ํํ๋ก ํธ์ถ

  ```tsx
  const target = { point: 100 };

  console.log(target.point); // 100
  console.log(Reflect.get(target, 'point')); // 100

  // 1. Reflect.get(target, "point") target์์ point ํ๋กํผํฐ ๊ฐ์ ๊ตฌํจ, target์ ๋์ ์ค๋ธ์ ํธ๋ฅผ ์์ฑํ๊ณ  "point"์ ํ๋กํผํฐ ํค๋ฅผ ์์ฑํจ
  // 2. [[Get]]("point", receiver) ํํ๋ก target์ [[Get]]์ ์คํํจ
  // 3. 100์ ๋ฐํ
  // 4. ๊ฐ์ ๊ตฌํ๋ ๊ฒ์ target.point์ ๊ฐ์ง๋ง Reflect.get()์ ๋ถ๊ฐ ๊ธฐ๋ฅ์ด ์์
  ```

- ์๋ฌ ๋์ ํํ

  - `tray-catch` ๋ก ์๋ฌ ๋์

    ```tsx
    const target = {};
    Object.defineProperty(target, 'point', {
      value: 100,
      writable: false,
    });

    try {
      Object.defineProperty(target, 'point', { value: 200 });
    } catch {
      console.log('์๋ฌ ๋ฐ์');
    }

    // 1. {value: 100, writable: false}, {writable: false}์ด๋ฏ๋ก value ์์ฑ ๊ฐ์ ๋ฐ๊ฟ ์ ์์
    // 2. try-catch์์ value: 200, value ์์ฑ ๊ฐ์ ๋ฐ๊พธ๋ฉด ์๋ฌ๊ฐ ๋ฐ์ํจ ๊ทธ๋์ try-catch๋ฌธ์ ์ฌ์ฉํจ
    ```

  - `true`, `false`๋ฅผ ๋ฐํ

    ```tsx
    const target = {};
    Object.defineProperty(target, 'point', {
      value: 100,
      writable: false,
    });

    const check = Reflect.defineProperty(target, 'point', { value: 200 });

    console.log(check);

    // 1. {value: 100, writable: false}, {writable: false}์ด๋ฏ๋ก value ์์ฑ ๊ฐ์ ๋ฐ๊ฟ ์ ์์
    // 2. Reflect ์ค๋ธ์ ํธ ์ฌ์ฉ, value: 200, value ์์ฑ ๊ฐ์ ๋ฐ๊พธ๋ฉด ์๋ฌ๊ฐ ๋ฐ์ํจ
    // 3. ์ด๋, ํ๋ก๊ทธ๋จ์ด ์ค๋จ๋์ง ์๊ณ  ์ฒ๋ฆฌ ์คํจ๋ฅผ ๋ปํ๋ false๋ฅผ ๋ฐํ, ์ฑ๊ณต์ด๋ฉด true๋ฅผ ๋ฐํํจ
    // 4. console.log(check); false๊ฐ ์ถ๋ ฅ๋จ
    ```

<br>

## 2. Proy ์ฌ์ฉ

- `Reflect` ์ค๋ธ์ ํธ์ ํจ์๋ `Proxy` ํธ๋ฉ์ 1:1๋ก ๋์ํ๋ฉฐ ํธ๋ฉ ์ด๋ฆ๊ณผ ํจ์ ์ด๋ฆ์ด ๊ฐ์
- ํธ๋ฉ ํ๋ผ๋ฏธํฐ์ `Reflect` ํจ์์ ํ๋ผ๋ฏธํฐ๊ฐ ๊ฐ์

  ```tsx
  const target = { point: 100 };
  const handler = {
    get(target, key, receiver) {
      return Reflect.get(target, key, receiver) + 200;
    },
  };

  const obj = new Proxy(target, handler);

  console.log(obj.point); // 300

  // 1. console.log(obj.point); getter์ด๋ฏ๋ก get() ํธ๋ฉ์ด ํธ์ถ๋จ
  // 2. ํธ๋ฉ: get(target, key, receiver){...} target ํ๋ผ๋ฏธํฐ์ target์ด ์ค์ ๋จ key์ "point"๊ฐ ์ค์ ๋๊ณ  receiver์ Proxy ์ธ์คํด์ค๊ฐ ์ค์ ๋จ
  // 3. Proxy์ get() ํธ๋ฉ๊ณผ Reflect.get() ํจ์์์ ํธ๋ฉ ์ด๋ฆ๊ณผ Reflect ํจ์ ์ด๋ฆ์ด ๊ฐ์ผ๋ฉฐ ํ๋ผ๋ฏธํฐ๋ ๊ฐ์, 13๊ฐ ํธ๋ฉ์ ๋์ํ๋ Reflect ํจ์๊ฐ ์์
  // 4. ํธ๋ฉ: return Reflect.get(target, key, receiver) + 200; Reflect.get()์ obj.point๋ก ๊ฐ์ ๊ตฌํ๋ ๋ณธ๋ ๊ธฐ๋ฅ์ ์ํํจ
  // 5. ๊ตฌํ ๊ฐ 100์ 200์ ๋ํด ๋ฐํํ๋ ๊ฒ์ ๋ถ๊ฐ ๊ธฐ๋ฅ์ผ๋ก ์ด๊ฒ์ ํธ๋ฉ์ ๊ธฐ๋ฅ ์
  ```

- `Reflect` ์ค๋ธ์ ํธ ํํ

  ```tsx
  const obj = Reflect;
  /*
    1. Reflect ์ค๋ธ์ ํธ ๊ตฌ์กฐ๋ฅผ ๋ณด๊ธฐ ์ํด obj์ ํ ๋นํ์
    
    2. obj์ ํ์๋ ํจ์๋ฅผ Reflect.get() ํํ๋ก ์ฌ์ฉํ  ์ ์์
  
    3. ํจ์ ์ด๋ฆ์ด Proxy ํธ๋ฉ ์ด๋ฆ๊ณผ ๊ฐ์
  
    4. Reflect ์ค๋ธ์ ํธ์
      - prototype๊ณผ prototype.constructor๊ฐ ์์
      - ๋ฐ๋ผ์ new ์ฐ์ฐ์๋ก ์ธ์คํด์ค๋ฅผ ์์ฑํ  ์ ์์ผ๋ฉฐ
      - prototype์ ๋ฉ์๋๋ฅผ ์ฐ๊ฒฐํ  ์ ์์
  
    5. ํ์๋ constructor๋ Reflect.constructor์
  */
  ```

```toc

```
