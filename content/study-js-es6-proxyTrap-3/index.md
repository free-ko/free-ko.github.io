---
emoji: ๐จโ๐ป
title: get(), get() ํธ๋ฉ ํธ์ถ, get() ํธ๋ฉ ์ค์์ฌํญ
date: '2021-11-30 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐ get(), get() ํธ๋ฉ ํธ์ถ, get() ํธ๋ฉ ์ค์์ฌํญ
</h1>

<br>

## 1. get()

- ๊ฐ์ ๊ตฌํ๋ ํธ๋ฉ : `target, receiver`์์ ๊ฐ์ ๊ตฌํจ

- `get()` ํธ๋ฉ์ด ํธ์ถ๋๋ฉด ์์ง์ด ์คํ ํ๊ฒฝ์ ๋ถ์ํ์ฌ ํ๋ผ๋ฏธํฐ ๊ฐ์ ์ค์ 

  ```tsx
  const target = { point: 100 };
  const handler = {
    get(target, key, receiver) {
      return traget[key] + 200;
    },
  };

  const obj = new Proxy(target, handler);

  console.log(obj.point); // 300
  console.log(obj.bonus); // NaN

  // 1. console.log(obj.point); get() ํธ๋ฉ์ด ํธ์ถ๋จ
  // 2. ํธ๋ฉ: gtet(target, key, receiver) {...} target์ target ์ค๋ธ์ ํธ๊ฐ ์ค์ ๋๊ณ  key์ "point"๊ฐ ์ค์ ๋จ, receiver์ Proxy ๋๋ Proxy๋ฅผ ์์๋ฐ์ ์ค๋ธ์ ํธ๊ฐ ์ค์ ๋จ
  // 3. ํธ๋ฉ: return target[key] + 200; target ์ค๋ธ์ ํธ์์ point ๊ฐ์ ๊ตฌํ๊ณ  ๊ตฌํ ๊ฐ 100์ 200์ ๋ํด ๋ฐํํจ
  // 4. console.log(obj.bonus); obj ์ธ์คํด์ค์ bonus๊ฐ ์์ง๋ง obj์ get() ํธ๋ฉ์ด ์์ผ๋ฉด ํธ์ถํจ bonus ํ๋กํผํฐ์ ์กด์ฌ๋ฅผ ์ฒดํฌํ์ง ์์
  // 5. ํธ๋ฉ: return target[key] + 200; ์์ target[key]์์ "bonus"๊ฐ ์์ผ๋ฏ๋ก undefined์ด๋ฉฐ 200์ ๋ํ๋ฏ๋ก NaN์ ๋ฐํํจ
  ```

- `get()` ํธ๋ฉ ํ์ฉ ํํ : ์กฐ๊ฑด ์ฒดํฌ

  ```tsx
  const target = { point: 100 };
  const handler = {
    get(target, key, receiver) {
      const value = target[key];
      return this.check ? value + 200 : value;
    },
  };

  const obj = new Proxy(target, handler);
  handler.check = true;

  console.log(obj.point); // 300

  // 1. handler.check = true; get() ํธ๋ฉ์์ ์ฒดํฌ ๊ฐ์ผ๋ก ์ฌ์ฉํจ
  // 2. ํธ๋ฉ: return this.check ? value + 200 : value; this๋ handler ์ค๋ธ์ ํธ๋ฅผ ์ฐธ์กฐ ํจ, check ๊ฐ์ด true์ด๋ฏ๋ก 200์ ๋ํด ๋ฐํํจ
  // 3. ์ด์ฒ๋ผ ์กฐ๊ฑด์ ๋ถ์ฌํ์ฌ ๊ฐ์ ๊ตฌํ  ๋ ํธ์ถํ๋ ๊ณณ๋ง๋ค ์กฐ๊ฑด ์ฝ๋๋ฅผ ์์ฑํ์ง ์๊ณ  get() ํธ๋ฉ์ ์กฐ๊ฑด ์ฝ๋๋ฅผ ์์ฑํ๋ฉด ๊นจ๋ํ๊ฒ ์ฝ๋๋ฅผ ๊ด๋ฆฌํ  ์ ์์
  ```

- `get()` ํธ๋ฉ ํ์ฉ ํํ : ๋ฐ์ดํฐ ๋ณ๊ฒฝ

  ```tsx
  let target = { point: 100 }; // ์๋์์ target ์ ์ฒด๋ฅผ ๋์ฒดํ๋ฏ๋ก let ๋ณ์๋ก ์ ์ธํจ

  const handler = {
    get(target, key, receiver) {
      return target[key];
    },
  };

  const proxy = new Proxy(target, handler);

  target.point = 300; // target๊ณผ proxy.[[Target]]์ point ๊ฐ์ด ๋ฐ๋

  target = { point: 500 };

  console.log('1. target: ', target.point);
  /*
  	1. target ์ค๋ธ์ ํธ ์ ์ฒด๋ฅผ ๋ฐ๊ฟ 
  		- target.point ๊ฐ์ผ๋ก 500์ด ์ถ๋ ฅ๋จ
  
  	2. ํํธ, proxy.[[Target]].point๋ ๋ฐ๋์ง ์์
  		- ์ฆ, target.point๋ 500์ด๊ณ  proxy.[[Target]].point๋ 300์
  */

  /*
  	target = {point: 500};
  
  	1. {point: 500}์ ์๋ก์ด ๋นํธ์ธ Object๋ฅผ ์์ฑํจ
  
  	2. ์๋ก์ด ๋ฉ๋ชจ๋ฆฌ ์ฃผ์๋ฅผ target์ ํ ๋นํ๋ฏ๋ก
  		- target์ด ์ฐธ์กฐํ๋ ๋ฉ๋ชจ๋ฆฌ ์ฃผ์๊ฐ ๋ฐ๋๊ฒ ๋จ
  	
  	3. ์ด๋, target์ ๋ฐ๋ ๋ฉ๋ชจ๋ฆฌ ์ฃผ์๊ฐ proxy.[[Target]] ๋ฐ์๋์ง ์์
  */

  console.log('2. proxy: ', proxy.point);
  /*
  	1. get(target, key, receiver){...}์์
  		- target์ ๋ฐ๋๊ธฐ ์ ์ {point: 300}์ด ์ค์ ๋จ
  		- ์ฆ, ๋ฐ๋ target์ด ์ค์ ๋์ง ์๊ณ  proxy.[[Target]]์ด ์ค์ ๋จ
  
  	2. new Proxy(target, handler)๋ก ์ธ์คํด์ค๋ฅผ ์์ฑํ  ๋
  		- proxy.[[Target]]์ target์ ๋ฉ๋ชจ๋ฆฌ ์ฃผ์๋ฅผ ์ค์ ํ๊ณ  get() ํธ๋ฉ์์ ์ด๋ฅผ ์ฌ์ฉํ์ฌ target์ ํ๋กํผํฐ ๊ฐ์ ๊ตฌํ๋ ๊ฒ์ด ๋จ
  */

  proxy.point = 700;

  console.log('3. proxy: ', proxy.point);
  /*
  	1. proxy.[[Target]].point ๊ฐ์ ๋ฐ๊ฟ
  		- ๋ฐ๋ ๊ฐ์ด 700์ด ์ถ๋ ฅ๋จ
  */

  console.log('4. target: ', target.point);
  /*
  	1. proxy.point = 700;์ผ๋ก ๋ฐ๊พผ ๊ฐ์ด target์ ๋ฐ์๋์ง ์์
  
  	2. ์ผ๋ฐ์ ์ผ๋ก target.point์๋ ๊ฐ์ด ์ฐ๋๋์ด ๋ฐ์๋์ง๋ง
  		- ์ง๊ธ์ proxy.[[Target]]์ด ์ฐธ์กฐํ๋ ๋ฉ๋ชจ๋ฆฌ ์ฃผ์์
  		- target์ ๋ฉ๋ชจ๋ฆฌ ์ฃผ์๊ฐ ๋ค๋ฅด๊ธฐ ๋๋ฌธ ์
  */

  /*
  	1. ๊ฒฐ๊ณผ์ ์ผ๋ก target์ ๊ฐ์ ํ๋กํผํฐ ๋จ์๋ก ๋ฐ๊ฟ์ผ ํจ
  
  	2. ์์ ํธ๋ฉ์์ ์ฒดํฌํ๋ ์ฝ๋๋ฅผ ํจ์๋ก ๋ง๋ค๊ณ  target์ ํ๋กํผํฐ๋ฅผ ๋ณ๊ฒฝํ๋ ๊ฒ๋ ํจ์๋ก ๋ง๋ค๋ฉด ํ๋ ์์ํฌ ๊ฐ๋์ผ๋ก ์ฌ์ฉํ  ์ ์์
  */
  ```

<br>

## 2. get() ํธ๋ฉ ํธ์ถ

- `get()` ํธ๋ฉ์ด ํธ์ถ๋๋ ํํ

  - `proxy[key]`

  - `Object.create(proxy, {ํ๋กํผํฐ})`

    ```tsx
    const target = { point: 600, bonus: 100 };
    const handler = {
      get(target, key, value, receiver) {
        return target[key] + 200;
      },
    };

    const proxy = new Proxy(target, handler);
    const obj = Object.create(proxy, {
      point: { value: 500 },
    });

    console.log(obj.point); // 500
    console.log(obj.bonus); // 300

    // 1. console.log(obj.point); Object.create(proxy, {...}์ ๋ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ point๋ฅผ ์์ฑํ์
    // 2. ์ฆ, point๊ฐ ์ธ์คํด์ค ํ๋กํผํฐ์ด๋ฏ๋ก get() ํธ๋ฉ์ ํธ์ถํ์ง ์๊ณ  point ํ๋กํผํฐ ๊ฐ 500์ ๋ฐํํจ
    // 3. get() ํธ๋ฉ์ ํธ์ถํ๋ฉด target์ {point: 600}์ด ์์ผ๋ฏ๋ก 600์ด ๋ฐํ๋จ
    // 4. console.log(obj.bonus); Object.create(proxy, {...}์ ๋๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ bonus๋ฅผ ์์ฑํ์ง ์์์ผ๋ฏ๋ก get(0 ํธ๋ฉ์ด ํธ์ถ ๋จ
    ```

  - `Reflect.get()`

<br>

## 3. get() ํธ๋ฉ ์ค์์ฌํญ

- `target` ์ ํ๋กํผํฐ๊ฐ `data` ๋์คํฌ๋ฆฝํฐ์ผ ๋

  - `[[Writable]]: false` ๋๋ `[[Configurable]]: false` ์ด๋ฉด ๋ฐํ ๊ฐ์ ๋ณ๊ฒฝํ์ฌ `return` ๋ถ๊ฐ

    ```tsx
    const target = {};
    Object.defineProperty(target, 'point', {
      value: 500,
      writable: false,
    });

    const handler = {
      get(target, key, receiver) {
        // return target[key] + 200;
        return target[key];
      },
    };

    const obj = new Proxy(target, handler);

    console.log(obj.point); // 500

    // 1. {value: 500, writable: false} target ์ค๋ธ์ ํธ์ point ํ๋กํผํฐ๋ {writable: false} ์
    // 2. ํธ๋ฉ: // return target[key] + 200; ํ๋กํผํฐ๊ฐ {writable: false}์ผ ๋ target[key]๋ก ๊ตฌํ ๊ฐ์ ๋ฐํํด์ผ ํจ
    // 3. ํธ๋ฉ์ฒ๋ผ ๊ตฌํ ๊ฐ์ ๊ฐ์ ๋ํด return ํ๋ฉด ์๋ฌ๊ฐ ๋ฐ์ ํจ
    // 4. {writable: true}์ด๋ฉด return ๊ฐ์ ๋ณ๊ฒฝํ  ์ ์์
    // 5. get() ํธ๋ฉ์์ try-catch๋ฅผ ์ฌ์ฉํ  ์ ์์
    ```

- `target` ์ ํ๋กํผํฐ๊ฐ ์์ธ์ ๋์คํฌ๋ฆฝํฐ์ผ ๋
  - `[[Configurable]]: false` ์ด๋ฉด ๋ฐํ ๊ฐ์ ๋ณ๊ฒฝํ์ฌ `return` ๋ถ๊ฐ

```toc

```
