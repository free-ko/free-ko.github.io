---
emoji: ๐จโ๐ป
title: defineProperty(), preventExtensions() , isExtensible() ํธ๋ฉ
date: '2021-12-02 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐ defineProperty(), preventExtensions() , isExtensible() ํธ๋ฉ
</h1>

<br>

## 1. defineProperty()

- `Object.defineProperty()` ์ ํธ๋ฉ์

  - `target` ์ ํ๋กํผํฐ๋ฅผ ์ถ๊ฐํ๊ฑฐ๋ ์์ฑ๊ฐ์ ๋ณ๊ฒฝํจ

        ```tsx
        const target = {};
        const handler = {
          defineProperty(target, key, desc) {
            if (desc.value > 0) {
              desc.value = desc.value * -1;
            }
            Object.defineProperty(target, key, desc);
            return true;
          },
        };

        const proxy = new Proxy(target, handler);
        Object.defineProperty(proxy, 'point', {
          value: 100,
          writable: true,
        });

        console.log(target.point);
        -100;

        // 1. Object.defineProperty(obj, "point", {...}, defineProperty() ํธ๋ฉ์ด ํธ์ถ๋จ
        // 2. ํธ๋ฉ: defineProperty(target, key, desc){...} desc์ {...}์ ์์ฑํ ๋์คํฌ๋ฆฝํฐ๊ฐ ์ค์ ๋จ
        // 3. ํธ๋ฉ: if(desc.value > 0){...}, value ์์ฑ๊ฐ์ด 100์ด๋ฉฐ, 0๋ณด๋ค ํฌ๋ฏ๋ก 100์ -1์ ๊ณฑํด -100์ผ๋ก ๋ฐ๊ฟ
        // 4. ํธ๋ฉ์์ ์์ฑ ๊ฐ์ ๋ฐ๊ฟ ์ ์์
        ```

<br>

## 2. defineProperty() ํธ๋ฉ ํธ์ถ

- `defineProperty()` ํธ๋ฉ์ด ํธ์ถ๋๋ ํํ
  - `Object.defineProperty()`
  - `Reflect.defineProperty()`

<br>

## 3. defineProperty() ํธ๋ฉ ์ค์์ฌํญ

<br>

- `strict mode` ์ผ ๋ ํธ๋ฉ์์ `false` ๋ฅผ ๋ฐํํ์ฌ `TypeError`
- `target` ์ค๋ธ์ ํธ๊ฐ ํ์ฅ ๋ถ๊ฐ์ด๋ฉด ํ๋กํผํฐ๋ฅผ ์ถ๊ฐ ํ  ์ ์์
  - `Object.preventExtensions(target);`
- `target` ์ค๋ธ์ ํธ์ ํ๋กํผํฐ๊ฐ `[[Writable]]: false` ๋๋ `[[Configurable]]: false` ์ด๋ฉด ํ๋กํผํฐ ๊ฐ์ ๋ณ๊ฒฝํ  ์ ์์

<br>

## 4. preventExtensions()

- `Object.preventExtensions()` ํธ๋ฉ์

  - `target` ์ค๋ธ์ ํธ์ ์ค๋ธ์ ํธ์ ํ์ฅ ๊ธ์ง๋ฅผ ์ค์ ํจ

  ```tsx
  const target = { point: 100 };
  const handler = {
    preventExtensions(target) {
      if (target.point) {
        Object.preventExtensions(target);
        return true;
      }
      return false;
    },
  };

  const proxy = new Proxy(target, handler);
  const obj = Object.preventExtensions(proxy);

  console.log(obj.point); // 100
  console.log(Object.isExtensible(target)); // false

  // 1. const obj = Object.preventExtensions(proxy); preventExtensions() ํธ๋ฉ์ด ํธ์ถ๋จ
  // 2. ํธ๋ฉ: if(target.point){...} point์ ๊ฐ์ด ์์ ๋๋ง ํ์ฅ ๊ธ์ง๋ฅผ ์ค์ ํ๊ธฐ ์ํด ๋น๊ตํ ๊ฒ
  // 3. ํธ๋ฉ์์ true๋ฅผ ๋ฐํํ๋ฉด true๋ฅผ ๋ฐํํ์ง ์๊ณ  Proxy ์ธ์คํด์ค๋ฅผ ๋ฐํํจ
  // 4. console.log(obj.point); Proxy ์ธ์คํด์ค์ point ํ๋กํผํฐ ๊ฐ์ ์ถ๋ ฅํจ
  // 5. console.log(Object.isExtensible(target)) ํ์ฅ ๋ถ๊ฐ ์ํ์ด๋ฏ๋ก false๋ฅผ ๋ฐํํจ
  ```

<br>

## 5. preventExtensions() ํธ๋ฉ ํธ์ถ

- `preventExtensions()` ํธ๋ฉ์ด ํธ์ถ๋๋ ํํ
  - `Object.preventExtensions()`
  - `Reflect.preventExtensions()`

<br>

## 6. preventExtensions() ํธ๋ฉ ์ค์ ์ฌํญ

- `target` ์ค๋ธ์ ํธ๊ฐ ํ์ฅ ๋ถ๊ฐ ์ผ ๋
  - ์ฆ, `Object.isExtensible(target)` ๊ฒฐ๊ณผ๊ฐ `false`์ผ ๋
  - `false` ๋ฅผ ๋ฐํํ๋ฉด `TypeError`, `true` ๋ง ๋ฐํํ  ์ ์์

<br>

## 7. isExtensible()

- `Object.isExtensible()` ํธ๋ฉ์

  - `targe`์ ํ์ฅ ๊ฐ๋ฅ ์ฌ๋ถ๋ฅผ ๋ฐํ ํจ

    ```tsx
    const target = { point: 100 };
    const handler = {
      isExtensible(target) {
        return Object.isExtensible(target);
      },
    };

    const obj = new Proxy(target, handler);
    console.log(Object.isExtensible(obj)); // true

    Object.seal(target);
    console.log(Object.isExtensible(obj)); // false

    // 1. console.log(Object.isExtensible(obj)); isExtensible() ํธ๋ฉ์ด ํธ์ถ๋จ
    // 2. target ์ค๋ธ์ ํธ๊ฐ ํ์ฅ ๊ฐ๋ฅ ์ํ์ด๋ฏ๋ก true๋ฅผ ๋ฐํํจ
    // 3. Object.seal(target); target ์ค๋ธ์ ํธ๋ฅผ ํ์ฅ ๋ถ๊ฐ ์ํ๋ก ์ค์  ํจ
    // 4. console.log(Object.isExtensible(obj)) ํ์ฅ ๋ถ๊ฐ ์ํ์ด๋ฏ๋ก false๋ฅผ ๋ฐํํจ
    ```

- `false` ๋ฅผ ๋ฐํํ๋ ์ค๋ธ์ ํธ ์ํ
  - `Object.seal()`
  - `Object.freeze()`
  - `Object.preventExtensions()`
  - `Reflect.preventExtensions()`

<br>

## 8. isExtensible() ํธ๋ฉ ํธ์ถ

- `isExtensible()` ํธ๋ฉ์ด ํธ์ถ๋๋ ํํ
  - `Object.isExtensible()`
  - `Relfect.isExtensible()`

<br>

## 9.isExtensible() ํธ๋ฉ ์ค์ ์ฌํญ

- `Object.isExtensible(target)` ๊ฒฐ๊ณผ์ ๊ฐ์ ๊ฐ์ ๋ฐํํด์ผ ํจ
- ์ฆ, ๊ฒฐ๊ณผ๋ฅผ ๋ฐ๊ฟ ์ ์์
- ๊ฐ์ง ์์ผ๋ฉด `TypeError`๊ฐ ๋ฐ์ํจ

```toc

```
