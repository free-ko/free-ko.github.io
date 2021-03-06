---
emoji: ๐จโ๐ป
title: set(), set() ํธ๋ฉ ํธ์ถ, set() ํธ๋ฉ ์ค์์ฌํญ
date: '2021-11-28 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐ set(), set() ํธ๋ฉ ํธ์ถ, set() ํธ๋ฉ ์ค์์ฌํญ
</h1>

<br>

## 1. set()

- ํ๋กํผํฐ๋ฅผ ์ค์ ํ๋ ํธ๋ฉ์ผ๋ก `target` ๋๋ `receiver` ์ ํ๋กํผํฐ(key, value)๋ฅผ ์ค์  ํจ
- `set()` ํธ๋ฉ์ ์์ฑํ์ง ์์ ํํ

  ```tsx
  const target = {};
  const obj = new Proxy(target, {});
  obj.point = 100;

  console.log(obj.point); // 100

  // 1. obj.point = 100; 100์ point์ ํ ๋นํ๋ฏ๋ก setter์
  // 2. set() ํธ๋ฉ์ ์์ฑํ์ง ์์์ผ๋ฏ๋ก target ์ค๋ธ์ ํธ์ [[Set]]์ด ํธ์ถ๋๋ฉฐ ํ๋ผ๋ฏธํฐ ๊ฐ์ผ๋ก point์ 100์ ๋๊ฒจ ์ค
  // 3. [[Set]]์์ {point: 100} ํํ๋ก target ์ค๋ธ์ ํธ์ ์ค์ ํจ
  // 4. obj.point; get() ํธ๋ฉ์ ์์ฑํ์ง ์์์ผ๋ฏ๋ก target ์ค๋ธ์ ํธ์ [[Get]]์ด ํธ์ถ๋จ
  // 5. ์ด๊ฒ์ Proxy๋ฅผ ์ฌ์ฉํ์ง ์์๋ ๋จ
  ```

- `set()` ํธ๋ฉ์ด ํธ์ถ๋๋ฉด ์์ง์ด ์คํ ํ๊ฒฝ์ ๋ถ์ํ์ฌ ํ๋ผ๋ฐํฐ ๊ฐ์ ์ค์  ํจ

  ```tsx
  const target = {};
  const handler = {
    set(target, key, value, receiver) {
      target[key] = value + 200;
    },
  };

  const obj = new Proxy(target, handler);
  obj.point = 100;

  console.log(obj.point); // 300

  // 1. obj.point = 100; ์ ์คํํ๋ฉด set() ํธ๋ฉ์ด ํธ์ถ ๋จ
  // 2. ํธ๋ฉ: set(target, key , value, receiver){...} ์์ง์ด target ํ๋ผ๋ฏธํฐ์ target ์ค๋ธ์ ํธ๋ฅผ ์ค์  ํจ
  // 3. key ํ๋ผ๋ฏธํฐ์ "point"๋ฅผ ์ค์ ํ๊ณ  value ํ๋ผ๋ฏธํฐ์ 100์ ์ค์ ํจ
  // 4. receiver ํ๋ผ๋ฏธํฐ์ Proxy ๋๋ Proxy๋ฅผ ์์๋ฐ์ ์ค๋ธ์ ํธ๋ฅผ ์ค์  ํจ
  // 5. ํ๋ผ๋ฏธํฐ ์ด๋ฆ์ผ๋ก ๊ฐ์ ๋งคํํ์ง ์๊ณ  ํ๋ผ๋ฏธํฐ ์์๋ก ๋งคํํจ, ์ด๋ฆ์ ์์ ๋กญ๊ฒ ์ฌ์ฉํ  ์ ์์
  ```

<br>

## 2. set() ํธ๋ฉ ํธ์ถ

- ์๋์ฒ๋ผ ๊ฐ์ ํ ๋นํ๋ฉด `set()` ํธ๋ฉ์ด ํธ์ถ ๋จ
- ํ๋กํผํฐ์ ๊ฐ์ ํ ๋นํ  ๋ `proxy[key] = 100`
- `Object.create(proxy, {ํ๋กํผํฐ})`

  - ์ธ์คํด์ค์ ์๋ ํ๋กํผํฐ๋ฅผ ์ค์ ํ  ๋

    ```tsx
    const target = {};
    const handler = {
      point: 700,
      set(target, key, value, receiver) {
        target[key] = value + 200;
      },
    };

    const proxy = new Proxy(target, handler);
    const obj = Object.create(proxy, {
      bonus: { value: 500, writable: true },
    });

    obj.point = 100;

    console.log(obj.point); // 300

    // 1. const obj = Object.create(proxy, {...}); proxy ์ธ์คํด์ค๋ฅผ ์์๋ฐ์ ์ธ์คํด์ค๋ฅผ ์์ฑํจ
    // 2. proxy ์ธ์คํด์ค์ ์ฐ๊ฒฐ๋ handler์ target์ ์ฌ์ฉํ  ์ ์์
    // 3. bonus: {value: 500, writable: true}	obj ์ธ์คํด์ค ํ๋กํผํฐ๋ก ๊ฐ์ ์ค์ ํจ, ์ฆ obj.bonus์ 500์ด ์ค์ ๋จ
    // 4. obj.point = 100; obj ์ธ์คํด์ค ํ๋กํผํฐ๋ก point๊ฐ ์์ set() ํธ๋ฉ์ด ํธ์ถ๋จ
    // 5. ํธ๋ฉ: target[key] = value + 200; target์ {point: 300}์ ์ค์ ํจ
    // 6. obj.point, obj ์ธ์คํด์ค ํ๋กํผํฐ๋ก point๋ฅผ ๊ฒ์ํจ point๊ฐ ์์
    // 7. target์ point๋ฅผ ๊ฒ์ํจ point ๊ฐ์ธ 300์ด ๋ฐํ๋จ
    // 8. handler์์ point๋ฅผ ๊ฒ์ํ์ง ์์ {point: 700}์ด ์์ง๋ง ๋ฐํ๋์ง ์์, {point: 700}์ด ์์ง๋ง ๋ฐํ๋์ง ์์
    ```

  - ์ธ์คํด์ค์ ์๋ ํ๋กํผํฐ๋ฅผ ์ค์  ํ  ๋

    ```tsx
    const target = {};
    const handler = {
      set(target, key, value, receiver) {
        target[key] = value + 200;
      },
    };

    const proxy = new Proxy(target, handler);
    const obj = Object.create(proxy, {
      point: { value: 100, writable: true },
    });

    obj.point = 700;

    console.log(obj.point); // 700
    console.log(target.point); // undefined

    // 1. const obj = Object.create(proxy, {...}); proxy ์ธ์คํด์ค๋ฅผ ์์๋ฐ์ ์ธ์คํด์ค๋ฅผ ์์ฑํจ
    // 2. point: {value: 100, writabel: true} obj ์ธ์คํด์ค ํ๋กํผํฐ๋ก ๊ฐ์ ์ค์ ํจ. ์ฆ, obj.point์ 100์ด ์ค์ ๋จ
    // 3. obj.point = 700; obj ์ธ์คํด์ค ํ๋กํผํฐ point๊ฐ ์์ set() ํธ๋ฉ์ด ํธ์ถ๋์ง ์์
    // 4. {point: 100}์ด obj ์ธ์คํด์ค ํ๋กํผํฐ๋ก ์ค์ ๋๊ณ  obj.__proto__์ handler์ target์ด ์ค์ ๋๋ฏ๋ก point๋ฅผ ๋จผ์  ์ธ์ํ๊ธฐ ๋๋ฌธ์
    // 5. {point: 100}์ value ๊ฐ์ 700์ผ๋ก ๋ณ๊ฒฝํจ
    // 6. ๊ฐ์ ๋ฐ๊พธ๋ ค๋ฉด {writable: true} ์ด์ฌ์ผ ํจ, ES5 "ํ๋กํผํฐ ๋์คํฌ๋ฆฝํธ" ์ฐธ๊ณ 
    // 7. obj.point obj ์ธ์คํด์ค ํ๋กํผํฐ์ธ point ๊ฐ์ ๋ฐํํจ, ๋ฐ๋ ๊ฐ์ธ 700์ด ์ถ๋ ฅ๋จ
    // 8. target.point target ์ค๋ธ์ ํธ์ point ํ๋กํผํฐ๊ฐ ์์ผ๋ฏ๋ก undefined๊ฐ ์ถ๋ ฅ๋จ
    ```

- `Reflect.set()`
- `set()` ํธ๋ฉ์์ `target` ๊ฐ์ ์ค์ ํด์ผ ํจ

  ```tsx
  const target = {};
  const handler = {
    set(target, key, value, receiver) {
      // target[key] = value + 200;
    },
  };

  const proxy = new Proxy(target, handler);

  obj.point = 100;
  console.log(obj.point); // undefined

  // 1. ํธ๋ฉ : set(target, key, value, receiver) {...} set() ํธ๋ฉ์์ ํ๋ผ๋ฏธํฐ๋ก ๋ฐ์ {point: 100}์ด target ์ค๋ธ์ ํธ์ ์๋์ผ๋ก ์ค์ ๋์ง ์์
  // 2. set() ํธ๋ฉ์์ target ์ค๋ธ์ ํธ์ {key: value}๋ฅผ ์ค์ ํด์ผ ํจ, ๊ฐ ์ค์ ์ด setter์ ๊ธฐ๋ณธ ์คํผ๋ ์ด์์
  // 3. console.log(obj.point); obj ์ธ์คํด์ค ์ ์ฒด์ point๊ฐ ์์ผ๋ฏ๋ก undefined๊ฐ ์ถ๋ ฅ๋จ
  ```

<br>

## 3. set() ํธ๋ฉ ์ค์์ฌํญ

- ํธ๋ฉ ์ค์ ์ฌํญ(invariant)
  - ํธ๋ฉ์์ ์ค์ ์ฌํญ์ ์งํค์ง ์์ผ๋ฉด ์๋ฌ๊ฐ ๋ฐ์ํ๊ฑฐ๋ ์ฒ๋ฆฌ๋์ง ์์
  - ๋ชจ๋  ํธ๋ฉ์ ์ค์ ์ฌํญ์ด ์์
- `target` ์ ํ๋กํผํฐ๊ฐ `data` ๋์คํฌ๋ฆฝํฐ ์ผ ๋

  - `[[Writable]]: flase` ๋๋ `[[Configurable]]: false` ์ด๋ฉด ํ๋กํผํฐ ๊ฐ์ ์ค์ ํ  ์ ์์

    ```tsx
    const target = {};

    Object.definePropert(target, 'point', {
      value: 500,
      writable: false,
    });

    const handler = {
      set(target, key, value, receiver) {
        target[key] = value + 200;
      },
    };

    const obj = new Proxy(target, handler);

    console.log((obj.point = 100)); // 100
    console.log(obj.point); // 500

    // 1. {writable: false}๊ฐ ๋ํดํธ์ด์ง๋ง ์ค๋ช์ ์ํด ์์ฑํจ
    // 2. ํธ๋ฉ: target[key] = value + 200;์์ point ํ๋กํผํฐ๊ฐ {writable: false}์ด๋ฏ๋ก point ํ๋กํผํฐ ๊ฐ์ ๋ณ๊ฒฝํ  ์ ์์
    // 3. ๊ทธ๋ ๋ค๊ณ  ์๋ฌ๊ฐ ๋ฐ์ํ์ง ์์ {obj.point = 100}์์ 100์ด ๋ฐํ๋จ
    // 4. console.log(obj.point); obj.point์ ์ด๊น๊ฐ์ธ 500์ด ์ถ๋ ฅ๋จ
    ```

- `target` ์ ํ๋กํผํฐ๊ฐ ์์ธ์ ๋์คํฌ๋ฆฝํฐ ์ผ ๋
  - `[[Configurable]]: false` ์ด๋ฉด ํ๋กํผํฐ ๊ฐ์ ์ค์  ํ  ์ ์์

```toc

```
