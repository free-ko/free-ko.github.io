---
emoji: ๐จโ๐ป
title: construct(), apply(), ownKeys(), getOwnPropertyDescriptor() ํธ๋ฉ
date: '2021-12-04 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐ construct(), apply(), ownKeys(), getOwnPropertyDescriptor() ํธ๋ฉ
</h1>

<br>

## 1. construct()

- `new` ์ฐ์ฐ์์ ํธ๋ฉ์

  - ์ธ์คํด์ค๋ฅผ ์์ฑํ์ฌ ๋ฐํํจ

    ```tsx
    class Point {
      constructor(point) {
        this.point = point;
      }
    }

    const handler = {
      construct(target, args, proxy) {
        let point = args[0];
        if (Object.is(args[1], 'add')) {
          point += args[2];
        }
        return new target(point);
      },
    };

    const obj = new Proxy(Point, handler);
    const pointObj = new obj(100, 'add', 300);

    console.log(pointobj.point); // 400

    // 1. const obj = new Proxy(Point, handler); Point ํด๋์ค๋ก Proxy ์ธ์คํด์ค๋ฅผ ์์ฑํจ
    // 2. const pointObj = new obj(100, "add", 300); construct() ํธ๋ฉ์ด ํธ์ถ๋จ
    // 3. ํธ๋ฉ: construct(target, args, proxy) {...}
    //		- target์ Point ํด๋์ค๊ฐ ์ค์ ๋๊ณ 
    //		- args์ [100, "add", 300] ํํ๋ก ์ค์ ๋จ
    //    - proxy์ new Proxy()๋ก ์์ฑํ obj ์ธ์คํด์ค๊ฐ ์ค์ ๋จ
    // 4. construct(){...} ํธ๋ฉ์ฒ๋ฆฌ Point ํด๋์ค์ constructor๋ฅผ ํธ์ถํ๊ธฐ ์ ์ ์กฐ๊ฑด์ ๋ฐ๋ผ ์ธ์คํด์ค์ ์ด๊น๊ฐ์ ์ ๋ฆฌ ํจ
    // 5. ํธ๋ฉ์ ํธ์ถํ  ๋๋ง๋ค ์ ๋ฆฌํ์ง ์๊ณ  ํธ๋ฉ์์ ์ผ๊ด์ ์ผ๋ก ์ ๋ฆฌํ๋ฉด ํจ์จ์ด ๋์
    // 6. ํธ๋ฉ์ ์ด๋ ๊ฒ ํ์ฉํ  ์ ์์
    ```

- `construct()` ํธ๋ฉ์ด ํธ์ถ๋๋ ํํ
  - `const obj = new Proxy(Point, handler);`
    - `new obj`๋ฅผ ์คํํ  ๋ ํธ์ถ
  - `Reflect.construct()`

<br>

## 2. apply()

- ํจ์ ํธ์ถ ํธ๋ฉ์

  - `Proxy` ์ธ์คํด์ค ํธ์ถ๋ก ํธ๋ฉ์ด ์คํ๋ ํํ ์

    ```tsx
    function getPoint(...values) {
      return values.map((value) => {
        return value + 10;
      });
    }

    const handler = {
      apply(target, that, params) {
        return target.apply(this.params);
      },
    };

    const obj = new Proxy(getPoint, handler);

    console.log(obj(100, 200)); // [110, 210]

    // 1. console.log(obj(100, 200)); obj๋ Proxy ์ธ์คํด์ค์ด๋ฉฐ ์ด๋ฅผ ํธ์ถํ๋ฉด apply() ํธ๋ฉ์ด ํธ์ถ๋จ
    // 2. ํธ๋ฉ: apply(target, that, params){...} target์ getPoint ํจ์๊ฐ ์ค์ ๋จ
    // 3. Proxy ์ธ์คํด์ค ํธ์ถ๋ก ์ธํด ํธ๋ฉ์ด ์คํ๋๋ฉด that์ ๊ฐ์ด ์ค์ ๋์ง ์์
    ```

<br>

## 3. apply() ํธ๋ฉ ํธ์ถ

- `apply()` ํธ๋ฉ์ด ํธ์ถ๋๋ ํํ

  - `Function.prototype.apply()`

    ```tsx
    function getPoint(...values) {
      return values.map((value) => {
        return value + this.bonus;
      });
    }

    const handler = {
      apply(target, that, params) {
        return target.apply(that, params);
      },
    };

    const obj = new Proxy(getPoint, handler);
    const add = { bonus: 10 };

    console.log(obj.apply(add, [100, 200])); // [110, 210]

    // 1. console.log(obj.apply(add, [100, 200])); apply() ํธ์ถํ๋ฉด apply() ํธ๋ฉ์ด ํธ์ถ๋จ
    // 2. ์ฒซ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ getPoint()์์ this๋ก ์ฐธ์กฐํ  ์ค๋ธ์ ํธ๋ฅผ ์์ฑํจ
    // 3. ๋ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ getPoint()๋ก ๋๊ฒจ ์ค ํ๋ผ๋ฏธํฐ ๊ฐ์ ์์ฑํจ
    // 4. ํธ๋ฉ: apply(target, that, params){...} target์ getPoint ํจ์๊ฐ ์ค์ ๋๊ณ  that์ add ์ค๋ธ์ ํธ๊ฐ ์ค์ ๋จ prams์ [100, 200]์ด ์ค์ ๋จ
    ```

  - `Function.prototype.call()`

    ```tsx
    function getPoint(...values) {
      return values.map((value) => {
        return value + this.bonus;
      });
    }

    const handler = {
      apply(target, that, ...params) {
        return target.apply(that, parms);
      },
    };

    const obj = new Proxy(getPoint, handler);
    const add = { bonus: 10 };
    console.log(obj.call(add, 100, 200)); // [110, 210]

    // 1. obj.call(add, 100, 200) call() ํธ์ถํ๋ฉด apply ํธ๋ฉ์ด ํธ์ถ๋จ
    // 2. ์ฒซ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ getPoint()์์ this๋ก ์ฐธ์กฐํ  ์ค๋ธ์ ํธ๋ฅผ ์์ฑํจ
    // 3. ๋ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ ์ดํ์ getPoint()๋ก ๋๊ฒจ ์ค ํ๋ผ๋ฏธํฐ ๊ฐ์ ์์ฑํจ
    // 4. call() ํธ์ถ์ด๋ฏ๋ก ๋ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ ์ดํ์ ์ฝค๋ง๋ก ๊ตฌ๋ถํ์ฌ ๊ฐ์ ์์ฑํจ
    // 5. ํธ๋ฉ: apply(target, that, ...params){...} target์ getPoint ํจ์๊ฐ ์ค์ ๋๊ณ  that์ add ์ค๋ธ์ ํธ๊ฐ ์ค์ ๋จ params์ [100, 200]์ด ์ค์ ๋จ
    ```

  - `proxy(...args): Proxy` ์ธ์คํด์ค
  - `Reflect.apply()`

<br>

## 4. ownKeys()

- `Object.getOwnPropertyNames()` ์ ํธ๋ฉ์

  - `target`์ ๋ชจ๋  `key`๋ฅผ ๋ฐฐ์ด๋ก ๋ฐํํจ
  - `[[Configurable]]: false` ์ด๊ฑฐ๋ ์ค๋ธ์ ํธ๊ฐ ํ์ฅ ๋ถ๊ฐ๋ผ๋ ๋ฐํํจ

    ```tsx
    const target = {};
    Object.defineProperties(target, {
      point: { value: 100, enumerable: true },
      bonus: { value: 200 },
    });

    const handler = {
      ownKeys(target) {
        return Object.getOwnPropertyNames(target);
      },
    };

    const obj = new Proxy(target, handler);

    console.log(Object.getOwnPropertyNames(obj)); // [point, bonus]
    console.log(Object.keys(obj)); // [point]

    // 1. console.log(Object.getOwnPropertyNames(obj)); ownKeys() ํธ๋ฉ์ด ํธ์ถ๋จ
    // 2. ํธ๋ฉ: return Object.getOwnPropertyNames(target); target ์ค๋ธ์ ํธ์ ๋ชจ๋  ํ๋กํผํฐ key๋ฅผ ๋ฐํํจ
    // 3. console.log(Object.keys(obj)); ํธ๋ฉ์ ํธ์ถํ๋ฉฐ, ๋ชจ๋  ํ๋กํผํฐ key๋ฅผ ๋ฐํํจ
    // 4. ํํธ, Object.keys()๋ {enumerable: false}์ธ ํ๋กํผํฐ๋ ๋ฐํํ์ง ์์ ๊ทธ๋์ point๋ง ์ถ๋ ฅ๋จ
    ```

- `ownKeys()` ํธ๋ฉ์ด ํธ์ถ๋๋ ํํ
  - `Object.getOwnPropertyNmaes()`
  - `Object.getOwnPropertySymbols()`
  - `Object.keys()`
  - `Reflect.ownKeys()`

<br>

## 5. getOwnPropertyDescriptor()

- `Object.getOwnPropertyDescriptor()` ํธ๋ฉ์

  - ํ๋กํผํฐ ๋์คํฌ๋ฆฝํฐ๋ฅผ ๋ฐํํจ

    ```tsx
    const target = {};
    Object.defineProperty(target, 'point', {
      value: 100,
      configurable: true,
    });

    const handler = {
      getOwnPropertyDescriptor(target, key) {
        const desc = Object.getOwnPropertyDescriptor(target, key);

        if (desc.configurable) {
          return { value: 300, configurable: true };
        }
        return desc;
      },
    };

    const obj = new Proxy(target, handler);

    console.log(Object.getOwnPropertyDescriptor(obj, 'point')); // {value: 300, writable: false, enumerable: false, configurable: true}

    // 1. console.log(Object.getOwnPropertyDescriptor(obj, "point")); ํธ๋ฉ์ด ํธ์ถ๋จ
    // 2. ํธ๋ฉ: if(desc.configurable){...} ๋์คํฌ๋ฆฝํฐ์ configurable ๊ฐ์ด true์ด๋ฉด value ์์ฑ ๊ฐ์ ๋ฐ๊พธ์ด ๋ฐํํจ
    // 3. point ํ๋กํผํฐ {configurable: true}์ด๋ฏ๋ก ํธ๋ฉ์์ ๊ฐ์ ๋ฐ๊พธ์ด ๋ฐํํ  ์ ์์ {configurable: false} ์ผ ๋๋ ๋ฐ๊ฟ ์ ์์
    ```

- `getOwnPropertyDescriptor()` ํธ๋ฉ์ด ํธ์ถ๋๋ ํํ
  - `Object.getOwnPropertyDescriptor()`
  - `Reflect.getOwnPropertyDescriptor()`

```toc

```
