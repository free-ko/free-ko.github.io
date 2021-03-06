---
emoji: ๐จโ๐ป
title: has() ํธ๋ฉ, deleteProperty() ํธ๋ฉ
date: '2021-12-01 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐ has() ํธ๋ฉ, deleteProperty() ํธ๋ฉ
</h1>

<br>

## 1. has()

- `in` ์ฐ์ฐ์์ ํธ๋ฉ์

  - `target` ์ `key` ์ ์กด์ฌ ์ฌ๋ถ๋ฅผ ๋ฐํํจ
  - ํ๋กํผํฐ ๊ฐ์ `true/false`๋ก ๋ณํํ์ฌ ๋ฐํํจ

    ```tsx
    const target = { point: 100 };
    const handler = {
      has(target, key) {
        return target[key];
      },
    };

    const obj = new Proxy(target, handler);

    console.log('point' in obj); // true
    console.log('booK' in obj); // false

    // 1. console.log("point" in obj); has() ํธ๋ฉ์ด ํธ์ถ๋จ
    // 2. has(target, key){...} target์ด target์, "point"๊ฐ key์ ์ค์ ๋จ
    // 3. return target[key]; target์ point๊ฐ ์์ผ๋ฉฐ ๊ฐ์ 100์
    // 4. ์ด๋, 100์ ๊ทธ๋๋ก returnํ์ง ์๊ณ  true/false๋ก ๋ณํํ์ฌ returnํจ
    // 5. 100์ true๋ก ๋ณํํ๋ฏ๋ก true๋ฅผ ๋ฐํํจ 0์ true/false๋ก ๋ณํํ์ฌ false์
    // 6. console.log("booK" in obj); obj์ book์ด ์์ง๋ง, has() ํธ๋ฉ์ ํธ์ถํจ
    // 7. return target[key]; undefined๋ฅผ ๋ฐํํ๊ฒ ๋์ง๋ง undefined๋ฅผ false๋ก ๋ณํํ์ฌ ๋ฐํ ํจ
    ```

  - ๋ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ `Symbol` ์์ฑ ๊ฐ๋ฅ

<br>

## 2. has() ํธ๋ฉ ํธ์ถ

- `has()` ํธ๋ฉ์ด ํธ์ถ๋๋ ํํ

  - `key in proxy`
  - `ke in Object.create(proxy, {ํ๋กํผํฐ})`

    ```tsx
    const target = { point: 600, bonus: 100 };
    const handler = {
      has(target, key) {
        return target[key];
      },
    };

    const proxy = new Proxy(target, handler);
    const obj = Object.create(proxy, {
      point: { value: 500 },
    });

    console.log('point' in obj); // true
    console.log('bonus' in obj); // true

    // 1. console.log("point" in obj); obj ์ธ์คํด์ค ํ๋กํผํฐ๋ก point๊ฐ ์์ผ๋ฏ๋ก has() ํธ๋ฉ์ ํธ์ถํ์ง ์์
    // 2. point ๊ฐ 500์ ๋ฐํํ์ง ์๊ณ  true/false๋ก ๋ณํํ์ฌ ๋ฐํํ๋ฏ๋ก ture๊ฐ ๋ฐํ๋จ
    // 3. console.log("bonus" in obj); obj ์ธ์คํด์ค ํ๋กํผํฐ๋ก bonus๊ฐ ์์ผ๋ฏ๋ก has() ํธ๋ฉ์ ํธ์ถ ํจ
    // 4. has() ํธ๋ฉ์์ target[key]์ ๊ฐ์ 100์ด๋ฉฐ 100์ true/false๋ก ๋ณํํ๋ฉด true์
    ```

  - `Reflect.has()`

<br>

## 3. has() ํธ๋ฉ ์ค์์ฌํญ

- ์ค๋ธ์ ํธ์ ํ๋กํผํฐ๊ฐ ์์ผ๋ฉด์
  - ์ค๋ธ์ ํธ๊ฐ ํ๋กํผํฐ ์ถ๊ฐ ๊ธ์ง์ด๊ฑฐ๋ `[[Configurable]]: flase` ์ด๋ฉด
  - `false` ๋ฅผ ์ง์ ํ์ฌ ๋ฐํํ  ์ ์์ง๋ง `ture` ๋ ์ง์ ํ์ฌ ๋ฐํ ํ  ์ ์์
- ๊ฐ์ ๋ก `ture/false` ๋ฅผ ๋ฐํํ์ง ์๊ณ  `has()` ํธ๋ฉ์์ ๊ตฌํ ๊ฐ์ `ture/false` ๋ก ๋ณํํ์ฌ ๋ฐํ ํจ

  ```tsx
  const target = { point: 100 };
  Object.preventExtensions(target);

  const handler = {
    has(target, key) {
      consle.log('has ํธ๋ฉ ์คํ');
      // return false;
      return target[key];
    },
  };

  const obj = new Proxy(target, handler);

  console.log('point' in obj);

  // 1. Object.preventExtensions(target); target ์ค๋ธ์ ํธ๋ฅผ ํ๋กํผํฐ ์ถ๊ฐ ๊ธ์ง ์ํ๋ก ์ค์ ํจ
  // 2. console.log("point" in obj); ์ถ๊ฐ ๊ธ์ง ์ํ๋ผ๋ has() ํธ๋ฉ์ด ํธ์ถ ๋จ
  // 3. // reuturn false; ์ถ๊ฐ ๊ธ์ง ์ํ์์ false๋ฅผ ์ง์ ํ์ฌ ๋ฐํํ๋ฉด ์๋ฌ๊ฐ ๋ฐ์ํจ ๊ทธ๋์ ์ฃผ์์ผ๋ก ์ฒ๋ฆฌ ํ์
  // 4. return target[key]; has() ํธ๋ฉ์์ ๊ตฌํ ๊ฐ์ true/false๋ก ๋ณํํ์ฌ ๋ฐํํ๋ฉด ์๋ฌ๊ฐ ๋์ง ์์

  // ์คํ๊ฒฐ๊ณผ
  // has ํธ๋ฉ ์คํ
  // true
  ```

<br>

## 4. deleteProperty()

- `delete` ์ฐ์ฐ์์ ํธ๋ฉ์

  - ์ค๋ธ์ ํธ์ ํ๋กํผํฐ๋ฅผ ์ญ์ ํจ

    ```tsx
    const target = { point: 100 };
    const handler = {
      deleteProperty(target, key) {
        if (key in target) {
          delete target[key];
          return ture;
        }

        return false;
      },
    };

    const obj = new Proxy(target, handler);

    console.log(delete obj.point); // true
    console.log(target.point); // undefined
    console.log(delete obj.point); // false
    console.log(delete target.point); // true

    // 1. console.log(delete obj.point) deleteProperty() ํธ๋ฉ์ด ํธ์ถ ๋จ
    // 2. if(key in target) {...} target ์ค๋ธ์ ํธ์ point ํ๋กํผํฐ๊ฐ ์์ผ๋ฏ๋ก point ํ๋กํผํฐ๋ฅผ ์ญ์ ํ๊ณ  ture๋ฅผ ๋ฐํํจ
    // 3. console.log(target.point) ํธ๋ฉ์์ point ํ๋กํผํฐ๋ฅผ ์ญ์ ํ์ผ๋ฏ๋ก undefined๊ฐ ์ถ๋ ฅ๋จ
    // 4. console.log(delete obj.point); deleteProperty() ํธ๋ฉ์ด ํธ์ถ๋จ ํธ๋ฉ์์ target์ point ํ๋กํผํฐ๊ฐ ์์ผ๋ฏ๋ก false๋ฅผ ๋ฐํ ํจ
    // 5. console.log(delete target.point); deleteProperty() ํธ๋ฉ์ด ํธ์ถ๋์ง ์์ [[Delete]]๊ฐ ํธ์ถ๋จ ์ผ๋ฐ์ ์ผ๋ก delete ์ฒ๋ฆฌ์
    ```

- `delete` ์ฐ์ฐ์๋ ํ๋กํผํฐ๊ฐ ์์ด๋ `true`๋ฅผ ๋ฐํํ๋ฏ๋ก ์ฝ๋์ฒ๋ผ ์กฐ๊ฑด์ ์ฒดํฌํ์ฌ `true/false`๋ฅผ ๋ฐํํ๋ฉด ์์ ํ๊ฒ ์ฒ๋ฆฌํ  ์ ์์

<br>

## 4. deleteProperty() ํธ๋ฉ ํธ์ถ

- `deleteProprerty()` ํธ๋ฉ์ด ํธ์ถ๋๋ ํํ
  - `delete[key]`
  - `Reflect.deleteProperty()`

<br>

## 5. deleteProperty() ํธ๋ฉ ์ค์์ฌํญ

- `target` ์ค๋ธ์ ํธ์ ํ๋กํผํฐ๊ฐ

  - `[[Configurable]]: false` ์ด๋ฉด ํ๋กํผํฐ๋ฅผ ์ญ์ ํ  ์ ์์ผ๋ฉฐ ์๋ฌ๊ฐ ๋ฐ์ํจ

    ```tsx
    const target = {};
    Obje.ctdefinedProperty(target, "point", {
    	value: 500,, configurable: flase
    });

    const handler = {
    	deleteProperty(target, key) {
    		const descriptor = Object.getOwnPropertyDescriptor(target, key);

    		if(descriptor.configurable) {
    			delete target[key];
    			return true;
    		};

    		return false;
    	}
    };

    const obj = new Proxy(target, handler);
    console.log(delte obj.point);   // false

    // 1. console.log(delete obj.point) deleteProeprty() ํธ๋ฉ์ด ํธ์ถ๋จ
    // 2. Object.getWonPropertyDescriptor(target, key); point ํ๋กํผํฐ์ ๋์คํฌ๋ฆฝํฐ๋ฅผ ๊ตฌํจ
    // 3. if(descriptor.configurable){...} configurable์ด ture์ด๋ฉด ์ญ์ ํ  ์ ์์ผ๋ฉฐ point ํ๋กํผํฐ๋ฅผ ์ญ์ ํ๊ณ  true๋ฅผ ๋ฐํํจ
    // 4. ํํธ, {configurable: false}์ด๋ฏ๋ก false๋ฅผ ๋ฐํํจ
    ```

```toc

```
