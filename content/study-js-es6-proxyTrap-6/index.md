---
emoji: ๐จโ๐ป
title: getPrototypeof(), setPrototypeof() ํธ๋ฉ
date: '2021-12-03 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐ getPrototypeof(), setPrototypeof() ํธ๋ฉ
</h1>

<br>

## 1. getPrototypeof()

- `[[GetPrototypeOf]]` ์ ํธ๋ฉ์

  - `target` ์ `prototype`์ ๋ฐํ

    ```tsx
    class Point {
      getPoint() {
        return 100;
      }
    }

    const handler = {
      getPrototypeOf(target) {
        return target.prototype;
      },
    };

    const obj = new Proxy(Point, handler);
    const proto = Object.getPrototypeOf(obj);

    console.log(proto.getPoint); // getPoint(){return 100;}

    // 1. const obj = new Proxy(Point, handler); ์ฒซ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ Point ํด๋์ค๋ฅผ ์์ฑํ์, ํธ๋ฉ์์ Point.prototype์ ๊ตฌํ๊ธฐ ์ํด์ obj.[[Target]]์์ Point ํด๋์ค๊ฐ ์ค์ ๋จ
    // 2. const proto = Object.getPrototypeOf(obj); getProtytpeOf() ํธ๋ฉ์ด ํธ์ถ๋จ
    // 3. ํธ๋ฉ: getPrototypeOf(target){} target์ Point ํด๋์ค๊ฐ ์ค์ ๋จ
    // 4. ํธ๋ฉ: return target.prototype; Popoint.prototype์ ๋ฐํํจ
    // 5. console.log(proto.getPoint); Point.prototype์ getPoint()๊ฐ ์์ผ๋ฏ๋ก ๋ฉ์๋ ์ฝ๋๊ฐ ์ถ๋ ฅ๋จ
    ```

  - `target` ์ด ํ์ฅ ๋ถ๊ฐ๋ผ๋ `prototype`์ ๋ฐํ ํจ
  - `String`, `Number` ์ฒ๋ผ ๊ฐ์ ๋ฐํํ๋ฉด `TypeError`

- ํธ๋ฉ ์ค์ ์ฌํญ
  - `target` ์ด ํ์ฅ ๋ถ๊ฐ์ผ ๋
  - `Object.getPrototypeOf(target)` ์ ๊ฐ์ ๊ฐ์ ๋ฐํํด์ผ ํจ

<br>

## 2. getPrototypeOf() ํธ๋ฉ ํธ์ถ

- `getPrototypeOf()` ํธ๋ฉ์ด ํธ์ถ๋๋ ํํ

  - `Object.getPrototypeOf()`
  - `__proto__`

    ```tsx
    class Point {
      getPoint() {
        return 100;
      }
    }

    const handler = {
      getPrototyepOf(target) {
        return this.list ? Array.prototype : target.prototype;
      },
    };

    const obj = new Proxy(Point, handler);
    handler.list = true;

    const proto = obj.__proto__;

    console.log(proto.map); // function map() {[native code]}

    // 1. handler.list = true; getPrototypeOf() ํธ๋ฉ์์ ์ฒดํฌ ๊ฐ์ผ๋ก ์ฌ์ฉํจ
    // 2. const proto = obj.__proto__, getPrototypeOf ํธ๋ฉ์ด ํธ์ถ๋จ ํธ๋ฉ์์ Array.prototype์ ๋ฐํํจ
    // 3. console.log(proto.map) map ๋ฉ์๋๊ฐ ์์ผ๋ฏ๋ก ์ฝ๋๊ฐ ์ถ๋ ฅ๋จ
    // 4. ์กฐ๊ฑด์ ๋ฐ๋ผ ๋ฐํ๋๋ prototype์ ๋ฐ๊ฟ ์ ์์
    ```

  - `instanceof`

    ```tsx
    class Point {
    	getPoint(){return 100;}
    };

    const handler = {
    	getPrototypeOf(target) {
    		return Point.rptotype;
    	}
    };

    const target = new Point();
    console.log(targetinstanceof Point);  // true
    console.log(Point.prototype instanceof Point);   // false

    const obj = new Proxy(target, handler);
    console.log(obj instanceof Point);   // true

    // 1. console.log(target instanceof Point) target์ Point๋ก ๋ง๋ค์์ผ๋ฏ๋ก true๊ฐ ์ถ๋ ฅ๋จ
    // 2. console.log(Point.protytpe instanceof Point) Point.prototype์ด ์ธ์คํด์ค๊ฐ ์๋๋ฏ๋ก false๊ฐ ์ถ๋ ฅ๋จ
    // 3. console.log(obj instanceof Point) getPrototypeOf() ํธ๋ฉ์ด ํธ์ถ๋จ ํธ๋ฉ์์ Point.prototype์ ๋ฐํํจ
    // 4. (Point.prototype instanceof Point) ํํ๊ฐ ๋๋ฏ๋ก false๊ฐ ์ถ๋ ฅ๋์ด์ผ ํ๋๋ฐ ture๊ฐ ์ถ๋ ฅ๋จ
    ```

  - `Object.prototype.isPrototypeOf()`
  - `Reflect.getPrototypeOf()`

<br>

## 3. setPrototypeOf()

- `Object.setPrototypeOf()` ํน์ง

  - `target`์ `__proto__` ์ ๋ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ๋ฅผ ์ค์ ํจ

    ```tsx
    class Book {
      setTitle() {
        return '์ฑ';
      }
    }
    class Point {
      getPOint() {
        return '100';
      }
    }
    Object.setPrototypeOf(Book, Point.prototype);

    console.log(Book.prototype.getPOint); // undefined
    console.log(Book.__proto__.getPoint); // getPoint() {return 100;}

    const obj = new Book();
    console.log(obj.getPoint); // undefined

    // 1. Object.setPrototypeOf(Book, Point.rptotyep); Book.__proto__์ ์๋ Function.prototype์ด Point.prototype์ผ๋ก ๋์ฒด๋จ
    // 2. console.log(Book.prototype.getPoint) Book.__proto__์ ์ค์ ๋๋ฏ๋ก undfined๊ฐ ์ถ๋ ฅ๋จ
    // 3. Book.__protot__.getPoint getPoint() ์ฝ๋๊ฐ ์ถ๋ ฅ๋จ
    // 4. console.log(obj.getPoint) Book.prototype์ผ๋ก ์ธ์คํด์ค๋ฅผ ์์ฑํ๋ฏ๋ก obj ์ธ์คํด์ค์ getPoint๊ฐ ์์
    ```

- `Object.setPrototypeOf()` ์ ํธ๋ฉ์

  ```tsx
  class Book {
    setTitle() {
      return '์ฑ';
    }
  }
  class Point {
    getPOint() {
      return '100';
    }
  }
  const handler = {
    setPrototypeOf(target, proto) {
      Object.setPrototypeOf(target, proto);
      return true;
    },
  };

  const obj = new Proxy(Book, handler);
  Object.setPrototypeOf(obj, Point.prototype);

  console.log(Book.prototype.getPoint); // undefined
  console.log(Book.__proto__.getPOint); // getPoint(){ return 100; }
  console.log(obj.getPoint); // getPoint(){ return 100; }

  // 1. Object.setPrototypeOf(obj, Point.prototype); setPrototypeOf() ํธ๋ฉ์ด ํธ์ถ๋จ
  // 2. ํธ๋ฉ: setPrototypeOf(target, proto){...} target์ Book ํด๋์ค๊ฐ ์ค์ ๋๊ณ  proto์ Point.prototype์ด ์ค์ ๋จ
  // 3. ํธ๋ฉ: Ojbect.setPrototypeOf(target, proto); Book.__proto__์ obj.[[Target]].__proto__๊ฐ Point.prototype์ผ๋ก ๋์ฒด๋จ
  // 4. true๋ฅผ ๋ฐํํ์ง ์์ผ๋ฉด ์๋ฌ๊ฐ ๋ฐ์ํจ
  // 5. console.log(Book.prototype.getPoint) undefined๊ฐ ์ถ๋ ฅ๋๋ฉฐ, Point.prototype์ด Book.prototype์ ์ค์ ๋์ง ์๊ธฐ ๋๋ฌธ
  // 6. console.log(Book.__proto__.getPoint) getPoint ์ฝ๋๊ฐ ์ถ๋ ฅ๋จ
  // 7. console.log(obj.getPoint) getPoint ์ฝ๋๊ฐ ์ถ๋ ฅ๋๋ฉฐ obj.[[Target]].__proto__์ getPoint๊ฐ ์๊ธฐ ๋๋ฌธ
  ```

- ํธ๋ฉ ์ค์ ์ฌํญ
  - `target` ์ด ํ์ฅ ๋ถ๊ฐ ์ผ ๋
  - ๋ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ `prototype`๊ณผ `Object.getPrototypeOf(target)`๋ก ๊ตฌํ ๊ฒ๊ณผ ๊ฐ์์ผ ํจ

<br>

## 4. setPrototypeOf() ํธ๋ฉ ํธ์ถ

- `setPrototypeOf()` ํธ๋ฉ์ด ํธ์ถ๋๋ ํํ
  - `Object.setPrototypeOf()`
  - `Reflect.setPrototypeOf()`

```toc

```
