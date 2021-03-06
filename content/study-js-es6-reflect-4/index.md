---
emoji: ๐จโ๐ป
title: has(), deleteProperty()
date: '2021-12-08 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐ has(), deleteProperty()
</h1>

<br>

## 1. has()

- `target` ์ `key` ์ด ์กด์ฌ ์ฌ๋ถ๋ฅผ ๋ฐํํจ
- `Reflect.has(target, key)` ํํ๋ก ์์ฑ
  ```tsx
  const target = {
    point: 100,
  };

  console.log(Reflect.has(target, 'point')); // true

  // 1. Reflect.has(target, "point"), target ์ค๋ธ์ ํธ์ "point"๊ฐ ํ๋กํผํฐ ํค๋ก ์กด์ฌํ๋ฉด true๋ฅผ ๋ฐํํ๊ณ  ์กด์ฌํ์ง ์์ผ๋ฉด false๋ฅผ ๋ฐํ
  ```
- ์์๋ฐ์ `prototype, __proto__`๋ ๊ฒ์
  ```tsx
  function target() {}

  console.log(Reflect.has(target, 'hasOwnProperty')); // true

  // 1. Reflect.has(target, "hasOwnProperty"); target ํจ์์ hasOwnProperty()๋ฅผ ์์ฑํ์ง ์์ง๋ง true๊ฐ ๋ฐํ๋จ
  // 2. target ํจ์ ๊ตฌ์กฐ๋ฅผ ๋ณด๋ฉด target.prototype์ hasOwnProperty()๊ฐ ์์ง๋ง target.prototype.__proto__์ ์๊ธฐ ๋๋ฌธ
  ```
- ํธ๋ค๋ฌ์ `has()` ํธ๋ฉ ํธ์ถ
  ```tsx
  const target = { point: 100 };

  const handler = {
    has(target, key) {
      return Reflect.has(target, key);
    },
  };

  const proxy = new Proxy(target, handler);

  console.log('point' in proxy); // true

  // 1. console.log("point" in proxy); has() ํธ๋ฉ์ด ํธ์ถ๋จ
  // 2. ํธ๋ฉ: has(target, key){...}, target ์ค๋ธ์ ํธ, "point"๊ฐ ์ค์ ๋จ
  // 3. ํธ๋ฉ: return Reflect.has(target, key); return์ ์์ฑํ์ง ์์ผ๋ฉด target์ key๊ฐ ์กด์ฌํ๋๋ผ๋ false๊ฐ ๋ฐํ๋จ
  ```

<br>

## 2. deleteProperty()

- `target` ์์ `key`๋ฅผ ์ญ์  ํจ
- `Reflect.deleteProperty()` ํํ
  ```tsx
  const target = { point: 100 };

  console.log(Reflect.deleteProperty(target, 'point')); // true
  console.log(Reflect.deleteProperty(target, 'point')); // true

  // 1. Reflect.deleteProperty(target, "point"); ์ญ์  ์ฒ๋ฆฌ๋ฅผ ์ฑ๊ณตํ๋ฉด true๋ฅผ ๋ฐํํ๊ณ  ์คํจํ๋ฉด flase๋ฅผ ๋ฐํํจ
  // 2. ๋ ๋ฒ์งธ์ Reflect.deleteProperty(target, "point"); ํ๋กํผํฐ๊ฐ ์กด์ฌํ์ง ์๋๋ผ๋ true๋ฅผ ๋ฐํํจ, ํ๋กํผํฐ ์ญ์  ์ฌ๋ถ๊ฐ ์๋ ์ญ์  ์ฒ๋ฆฌ ์ํ์ ์ฑ๊ณต/์คํจ๊ฐ ๊ธฐ์ค์
  // 3. ์ด์ด์ false๊ฐ ๋ฐํ๋๋ ๊ฒฝ์ฐ๋ฅผ ์ดํด๋ด
  ```
- `false` ๋ฐํ
  ```tsx
  const target = {};
  Object.definedProperty(target, "point", {
  	value: 100, configurable: false;
  });

  console.log(Reflect.deleteProperty(target, "point"));   // false

  // 1. (Reflect.deleteProperty(target, "point"), point๊ฐ {configurable: false}์ด๋ฏ๋ก ์ญ์  ํ  ์ ์๊ธฐ ๋๋ฌธ์ false๋ฅผ ๋ฐํํฉ๋๋ค.
  // 2. ์ด๊ฒ์ด ์ญ์  ์ฒ๋ฆฌ ์คํจ ์๋๋ค.
  ```
- ์ธ๋ฑ์ค๋ก ๋ฐฐ์ด ์๋ฆฌ๋จผํธ ์ญ์ 
  ```tsx
  const target = [1, 2, 3, 4];
  Reflect.deleteProperty(target, 1);

  console.log(target); // [1, undefined, 3, 4]

  // 1. Reflect.deleteProperty(target, 1); target์ด ๋ฐฐ์ด์ผ ๋ ๋ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ 1์ ๋ฐฐ์ด์ ์ธ๋ฑ์ค ์
  // 2. 1๋ฒ ์ธ๋ฑ์ค ๊ฐ์ธ 2๋ฅผ ์ญ์ ํ๋ฉฐ ์ญ์ ํ ์ธ๋ฑ์ค์ ์๋ฆฌ๋จผํธ์ undefined๋ฅผ ์ค์ ํจ, 3๊ณผ 4๋ฅผ ์์ผ๋ก ๋น๊ธฐ์ง ์์
  ```

```toc

```
