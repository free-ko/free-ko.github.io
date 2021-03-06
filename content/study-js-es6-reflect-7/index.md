---
emoji: ๐จโ๐ป
title: Reflect - construct(), apply()
date: '2021-12-11 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐ construct(), apply()
</h1>

<br>

## 1. constructo()

- ์ธ์คํด์ค๋ฅผ ์์ฑํ์ฌ ๋ฐํํจ

- `Reflect.construct(target, params)` ํํ

  ```tsx
  class Point {
    constructor(one, two) {
      this.point = one + two;
    }
  }

  const obj = Reflect.construct(Point, [100, 200]);
  console.log(obj.point); // 300

  // 1. Reflect.construct(Point, [100, 200], Point ํด๋์ค์ constructor()๋ฅผ ํธ์ถ ํจ, [100]์ฒ๋ผ ๊ฐ์ด ํ๋๋ผ๋ ๋ฐฐ์ด๋ก ์์ฑํจ
  // 2. constructor(one, two){...} 100์ด one์ 200์ด two์ ์ค์ ๋จ
  // 3. Point ์ธ์คํด์ค๋ฅผ ์์ฑํ์ฌ ๋ฐํํจ
  ```

- ์ธ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ๋ ์ ํ์

  - ์์ฑ์ ํจ์๋ฅผ ์์ฑํจ
  - ์์ฑํ ํจ์๋ก ์ธ์คํด์ค๋ฅผ ์์ฑํจ

    ```tsx
    class Point {
      constructor(point) {
        this.point = point;
      }

      getPoint() {
        return this.point;
      }
    }

    class Book {
      getTitle() {
        return 'JS: ' + this.point;
      }
    }

    const obj = Reflect.construct(Point, [100], Book);

    console.log(obj.getPoint); // undefined
    console.log(obj.getTitle()); // JS: 100

    // 1. Reflect.construct(Point, [100], Book); 3๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ Book ํด๋์ค๋ฅผ ์์ฑํจ, Point ํด๋์ค์ constructor๊ฐ ํธ์ถ๋จ
    // 2. constructor(point){ this.point = point; } Point๊ฐ ์๋๋ผ Book์ผ๋ก ์ธ์คํด์ค๋ฅผ ์์ฑํจ, this๊ฐ Book ํด๋์ค๋ฅผ ์ฐธ์กฐํจ
    // 3. this.point = point; point๊ฐ ์ธ์คํด์ค ํ๋กํผํฐ๋ก ์ค์ ๋จ
    // 4. ์ธ๋ถ API ์ฌ์ฉ์ฒ๋ผ ๋ณ๊ฒฝํ  ์ ์๋ ํ๊ฒฝ์์ ํด๋์ค์ ํ๋กํผํฐ๋ฅผ ์ธ์คํด์ค ํ๋กํผํฐ๋ก ์ฌ์ฉํ๋ฉด์ ํด๋์ค์ prototype์ ์ค๋ฒ๋ผ์ด๋ํ๋ ํํ๋ก ์ฌ์ฉํ  ์ ์์
    // 5. obj.getPoint, obj ์ธ์คํด์ค์ getPoint()๊ฐ ์์ผ๋ฏ๋ก undefined ์ถ๋ ฅ
    // 6. obj.getTitle() Bookd์ getTitle()์ด ํธ์ถ๋จ
    ```

- `ํธ๋ค๋ฌ์ constrcut()` ํธ๋ฉ ํธ์ถ

  ```tsx
  class Point {
    constructor(...point) {
      this.point = point;
    }

    getPoint() {
      return this.point;
    }
  }

  const handler = {
    construct(target, params, proxy) {
      return Reflect.construct(target, params);
    },
  };

  const proxy = new Proxy(Point, handler);
  const obj = Reflect.construct(proxy, [1, 2]);
  console.log(obj.getPoint()); // [1, 2]

  // 1. const obj = Reflect.construct(proxy, [1, 2]); construct() ํธ๋ฉ์ด ํธ์ถ๋จ
  // 2. ํธ๋ฉ: construct(target, params, proxy) {...} Point ํด๋์ค๊ฐ target์ [1, 2]๊ฐ params์ ์ค์ ๋จ, proxy์ Proxy ์ธ์คํด์ค๊ฐ ์ค์ ๋จ
  ```

<br>

## 2. apply()

- `target` ์ ์์ฑํ ํจ์๋ฅผ ํธ์ถํจ
- `Relfect.apply(target, {}, key)` ํํ

  ```tsx
  function add(...values) {
    return values.map((value) => {
      return value + this.plus;
    });
  }

  console.log(Reflect.apply(add, { plus: 100 }, [1, 2])); // [101, 102]

  // 1. Reflect.apply(add, {plus: 100}, [1,2]) add() ํจ์๋ฅผ ํธ์ถํจ
  // 2. function add(...values){...} [1,2]๊ฐ values ํ๋ผ๋ฏธํฐ์ ์ค์ ๋จ
  // 3. map()์์ this๊ฐ {plus: 100}์ ์ฐธ์กฐํจ, ์ฝ๋์ฒ๋ผ ํ์ดํ ํจ์๋ฅผ ์ฌ์ฉํด์ผ ํจ, map(function(value){...}) ํํ๋ this๊ฐ window๋ฅผ ์ฐธ์กฐํจ
  ```

- `call(), apply()` ํตํฉ

  ```tsx
  const indexOf = String.prototype.indexOf;

  console.log(indexOf.call('ABC', 'B')); // 1
  console.log(Reflect.apply(indexOf, 'ABC', ['B'])); // 1

  // 1. const indexOf = String.prototype.indexOf; String.prototype.indexOf() ๋ฉ์๋ ์
  // 2. call()๋ก ํธ์ถ indexOf.call("ABC", "B");
  // 3. Reflect.apply()๋ก ํธ์ถ, Reflect.apply(indexOf, "ABC", ["B"]) call()๊ณผ apply()๋ฅผ ํตํฉํ์ฌ Reflect.apply()๋ก ํธ์ถํจ
  ```

- ํธ๋ค๋ฌ์ `apply()` ํธ๋ฉ ํธ์ถ

  ```tsx
  function add(...values) {
    return values.map((value) => {
      return value + this.plus;
    });
  }

  const handler = {
    apply(target, that, params) {
      return Reflect.apply(target, that, params);
    },
  };

  const obj = new Proxy(add, handler);

  console.log(obj.apply({ plus: 100 }, [1, 2])); // [101, 102]

  // 1. const obj = new Proxy(add, handler); add๊ฐ apply() ํธ๋ฉ์์ ํธ์ถํ  ํจ์์
  // 2. obj.apply({plus: 100}, [1, 2]) apply() ํธ๋ฉ์ด ํธ์ถ ๋จ
  // 3. ํธ๋ฉ: apply(target, that, params) {...}, add() ํจ์๊ฐ target์ ์ค์ ๋จ {plus:100}์ด that์ ์ค์ ๋๊ณ  [1,2]๊ฐ params์ ์ค์ ๋จ
  ```

```toc

```
