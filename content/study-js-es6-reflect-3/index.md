---
emoji: ๐จโ๐ป
title: this ์ฐธ์กฐ ์ค๋ธ์ ํธ, Proxy ํธ๋ค๋ฌ์ set() ํธ๋ฉ
date: '2021-12-07 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐ this ์ฐธ์กฐ ์ค๋ธ์ ํธ, Proxy ํธ๋ค๋ฌ์ set() ํธ๋ฉ
</h1>

<br>

## 1.set()

- `target` ์ ํ๋กํผํฐ ํค์ ๊ฐ์ ์ค์ ํจ
- `true, fasle` ๋ฅผ ๋ฐํํจ

  ```tsx
  const target = {
    point: 100,
  };

  console.log((target.point = 200)); // 200
  console.log(Reflect.set(target, 'point', 300)); // true
  console.log(target.point); // 300

  // 1. console.log(target.point = 200); setter๋ point์ ์ค์ ํ ๊ฐ์ ๋ฐํํจ
  // 2. Reflect.set(target, "point", 300) target์ point๊ฐ ์์ผ๋ฉด 300์ผ๋ก ๋์ฒดํ๊ณ  ์์ผ๋ฉด ์ถ๊ฐ ํจ ์ด๊ฒ์ setter์ ๊ฐ์
  // 3. ํํธ, set()์ ์ฒ๋ฆฌ๋ฅผ ์ฑ๊ณตํ๋ฉด true๋ฅผ ๋ฐํํ๊ณ  ์คํจํ๋ฉด false๋ฅผ ๋ฐํํจ
  // 4. ์๋ฌ๋ก ํ๋ก๊ทธ๋จ์ด ์ค๋จ๋๋ ๊ฒ์ ๋ฐฉ์งํ  ์ ์์
  ```

- `this` ๋ก ์ฐธ์กฐํ  ์ค๋ธ์ ํธ ์์ฑ

  ```tsx
  const target = {
    point: 100,
    set setPoint(key) {
      target[key] = this.point + 500;
    },
  };

  target.setPoint = 'point';
  console.log(target.point); // 600

  const that = { point: 300 };
  Refelct.set(target, 'setPoint', 'point', that);

  console.log(target.point); // 800

  // 1. target.setPoint = "point"; setPoint()๊ฐ ํธ์ถ๋๋ฉฐ "point"๊ฐ ํ๋กํผํฐ ๊ฐ์ผ๋ก ๋์ด ๊ฐ
  // 2. setPoint()์์ this๊ฐ target์ ์ฐธ์กฐํจ, target.point = (100 + 500) ํํ๊ฐ ๋จ
  // 3. Refelct.set(target, "setPoint", "point", that); 4๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ that์ ์์ฑํจ, setPoint()์์ this๊ฐ that์ ์ฐธ์กฐํจ, target.point = (300 + 500) ํํ๊ฐ ๋จ
  ```

- `Proxy` ํธ๋ค๋ฌ์ `set()` ํธ๋ฉ ํธ์ถ

  ```tsx
  const target = {
    point: 100,
    set setPoint(key) {
      target[key] = this.point + 500;
    },
  };

  const handler = {
    set(target, key, value, receiver) {
      Reflect.set(target, key, value, receiver);
    },
  };

  const proxy = new Proxy(target, handler);
  proxy.setPoint = 'point';

  console.log(target.point); // 600

  // 1. proxy.setPoint = "point"; set() ํธ๋ฉ์ด ํธ์ถ๋จ
  // 2. ํธ๋ฉ: set(target, key, value, receiver){...} target ํ๋ผ๋ฏธํฐ์ target์ด ์ค์ ๋จ key์ setPoint๊ฐ ์ค์ ๋๊ณ  value์ point๊ฐ ์ค์ ๋จ receiver์ Proxy ์ธ์คํด์ค๊ฐ ์ค์ ๋จ
  // 3. ํธ๋ฉ: Reflect.set(target, key, value, receiver) setPoint()๋ฅผ ํธ์ถ ํจ, setPoint()์์ this๊ฐ receiver(Proxy)๋ฅผ ์ฐธ์กฐํ๋ฉฐ Proxy.[[target]].point ๊ฐ์ ์ฌ์ฉํจ
  ```

- `set()` ํธ๋ฉ์์ `this` ์ฐธ์กฐ ๋ณ๊ฒฝ

  ```tsx
  const target = {
    point: 100,
    set setPoint(key) {
      target[key] = this.point + 500;
    },
  };

  const handler = {
    set(target, key, value, receiver) {
      Reflect.set(target, key, value, receiver);
    },
  };

  const proxy = new Proxy(target, handler);
  const that = { point: 300 };
  Reflect.set(proxy, 'setPoint', 'point', that);

  console.log(target.point); // 800

  // 1. Reflect.set(proxy, "setPoint", "point", that); 4๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ that์ ์์ฑํจ, set() ํธ๋ฉ์ด ํธ์ถ ๋จ
  // 2. ํธ๋ฉ: set(target, key, value, receiver) {...}, receiver์ that ์ค๋ธ์ ํธ๊ฐ ์ค์ ๋จ
  // 3. ํธ๋ฉ: Reflect.set(target, key, value, receiver); setPoint()๋ฅผ ํธ์ถ ํจ
  // 4. target[key] = this.point + 500; this๊ฐ receiver๋ฅผ ์ฐธ์กฐํ๋ฉฐ, receiver๋ that์ this.point์์ {point: 300}์ ์ฌ์ฉํจ
  ```

```toc

```
