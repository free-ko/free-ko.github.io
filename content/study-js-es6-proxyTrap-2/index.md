---
emoji: ๐จโ๐ป
title: set()์ 4๋ฒ์งธ ํ๋ผ๋ฏธํฐ, set()๊ณผ this
date: '2021-11-29 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐ set()์ 4๋ฒ์งธ ํ๋ผ๋ฏธํฐ, set()๊ณผ this
</h1>

<br>

## 1. set()์ 4๋ฒ์งธ ํ๋ผ๋ฏธํฐ

- `set()` ํธ๋ฉ์ 4๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ `Proxy` ์ธ์คํด์ค๊ฐ ์ค์ ๋จ

  ```tsx
  const target = { point: 100 };
  const hanlder = {
    set(target, key, value, receiver) {
      console.log(Object.is(target, receiver));
      console.log(receiver.point);
    },
  };

  const obj = new Proxy(target, handler);
  obj.point = 500;

  // 1. obj.point = 500; set() ํธ๋ฉ์ด ํธ์ถ๋จ
  // 2. ํธ๋ฉ: set(target, key, value, receiver){...} set() ํธ๋ฉ์ receiver ํ๋ผ๋ฏธํฐ์ obj.point = 500์ obj๊ฐ ์ค์ ๋จ. ์ฆ, Proxy ์ธ์คํด์ค๊ฐ ์ค์ ๋จ
  // 3. ํธ๋ฉ: console.log(Object.is(target, receiver)); target๊ณผ receiver๊ฐ ๊ฐ์ง ์์ผ๋ฏ๋ก false๊ฐ ์ถ๋ ฅ๋จ
  // 4. ํธ๋ฉ: console.log(receiver.point), receiver(Proxy ์ธ์คํด์ค)์ get() ํธ๋ฉ์ด ์์ผ๋ฏ๋ก target์ [[Get]]์ ํธ์ถํ๋ฉฐ, 100์ ๋ฐํํจ
  // 5. 500์ด ๋ฐํ๋์ง ์๋ ์ด์ ๋ ๊ธฐ๋ณธ ์คํผ๋ ์ด์ ์๊ฐ

  // ์คํ๊ฒฐ๊ณผ
  // false
  // 100
  ```

- `const obj = Object.create(proxy, {ํ๋กํผํฐ})`

  - 4๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ `Object.create()`๋ก ์์ฑํ ์ธ์คํด์ค๊ฐ ์ค์ ๋จ

    ```tsx
    const target = {};
    const handler = {
      set(target, key, value, receiver) {
        target[key] = value + 200;
        target.title = receiver.title + ' ,JS';
        return true;
      },
    };

    const proxy = new Proxy(target, handler);
    const obj = Object.create(proxy, {
      title: { value: '์ฑ' },
    });

    obj.point = 100;

    console.log(obj.title); // ์ฑ
    console.log(target.title); // ์ฑ, JS
    ```

- `Object.create()`์ ์ธ์คํด์ค ๊ตฌ์กฐ

  ```tsx
  const target = { point: 500 };
  const handler = {
    set(target, key, value, receiver) {
      target[key] = value + 200;
      target.title = receiver.title + ' ,JS';
      return true;
    },
  };

  const proxy = new Proxy(target, handler);
  /*
  	1. Proxy ์ธ์คํด์ค๋ฅผ ์์ฑํ์ฌ proxy ๋ณ์์ ํ ๋นํจ
  	
  	2. proxy์ [[Handler]]๊ฐ ์์ผ๋ฉฐ, ๊ทธ ์์ set() ํธ๋ฉ์ด ์์
  		- [[Target]]์ด ์์ผ๋ฉฐ, ๊ทธ ์์ {point: 500}์ด ์์
  */

  const obj = Object.create(proxy, {
    title: { value: '์ฑ' },
  });
  /*
  	1. create() ํจ์๋ ๋ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ๋ก ์ธ์คํด์ค๋ฅผ ์์ฑํ๊ณ 
  		- {title: "์ฑ}์ ์ธ์คํด์ค ํ๋กํผํฐ๋ก ์ค์ ํจ
  	
  	2. ์์ฑํ ์ธ์คํด์ค์ __proto__์ ์ฒซ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ๋ฅผ ์ฒจ๋ถํจ
  		- [[Handler]]์ set() ํธ๋ฉ๊ณผ
  		- [[Target]]์ {point: 500}์ ์ฌ์ฉํ  ์ ์๊ฒ ๋จ
  */

  obj.point = 100; // obj.__proto__์ ์ฐ๊ฒฐ๋ [[Handler]]์ set() ํธ๋ฉ์ด ํธ์ถ ๋จ

  /*
  	set(target, key, value, receiver) {...}
  	
  	1. receiver ํ๋ผ๋ฏธํฐ์ obj๊ฐ ์ค์ ๋จ
  		- receiver์์ title: {value: "์ฑ}์ ์ฐธ์กฐํ  ์ ์์ผ๋ฉฐ
  		- [[Handler]]์ [[Target]]์ ์ฐธ์กฐํ  ์ ์์
  
  	2. ์ด์ฒ๋ผ set() ํธ๋ฉ์์ Proxy ์ด์ธ์ ๋ค๋ฅธ ์ค๋ธ์ ํธ๋ฅผ ์ฐธ์กฐํ  ์ ์์
  */

  /*
  	target[key] = value + 200;
  	
  	1. value ๊ฐ 100์ 200์ ๋ํด target์ key("point")์ ํ ๋นํจ
  		- target ์ค๋ธ์ ํธ์ point ํ๋กํผํฐ ๊ฐ์ด 300์ผ๋ก ๋ฐ๋
  */

  /*
  	target.title = receiver.title + ", JS";
  
  	1. receiver(obj ์ธ์คํด์ค)์ title ํ๋กํผํฐ๊ฐ ์์ผ๋ฉฐ
  		- ๊ฐ์ "์ฑ" ์
  
  	2. target ์ค๋ธ์ ํธ์ title ํ๋กํผํฐ์ ์ฐ๊ฒฐํ ๋ฌธ์์ด์ ์ค์ ํจ
  		- ์ด๋, target์ด ์๋ receiver์ ๊ฐ์ ์ค์ ํ๋ฉด receiver๊ฐ ์ฝ๊ธฐ ์ ์ฉ์ด๋ฏ๋ก ์๋ฌ๊ฐ ๋ฐ์ํจ
  */

  /*
  	return true;
  	
  	1. return true;๋ ํธ์ถํ ๊ณณ์ผ๋ก true๋ฅผ ๋ฐํํ๋ ๊ฒ์ด ์๋๋ผ ์์ง์๊ฒ ์ฑ๊ณต์ ์ผ๋ก ์ฒ๋ฆฌ๋ ๊ฒ์ ์๋ ค์ฃผ๋ ๊ฒ
  */

  console.log(obj.titlt);
  /*
  	1. obj๋ฅผ ํผ์น๋ฉด ์ธ์คํด์ค ํ๋กํผํฐ๋ก {title: "์ฑ}์ด ์์ผ๋ฉฐ
  		- [[Target]]์ {title: "์ฑ, JS"}๊ฐ ์์
  		
  	2. ์ธ์คํด์ค ๊ตฌ์กฐ์ ์์์๋ถํฐ ๊ฒ์ํ๋ฏ๋ก ์ธ์คํด์ค ํ๋กํผํฐ ๊ฐ์ธ "์ฑ"์ด ๋ฐํ๋จ
  */

  console.log(target.title);
  /*
  	1. Proxy๊ฐ ์๋ target ์ค๋ธ์ ํธ์ [[Get]]์ ํธ์ถ ํจ
  		- ๋ฐ๋ผ์ "์ฑ, JS"๊ฐ ์ถ๋ ฅ๋จ
  */
  ```

<br>

## 2. set()๊ณผ this

- `set()` ํธ๋ฉ์์ `this` ๋ `handler` ์ค๋ธ์ ํธ๋ฅผ ์ฐธ์กฐ ํจ

  ```tsx
  const target = { point: 100 };
  const handler = {
    point: 123,
    set(target, key, value, receiver) {
      console.log(this.point);

      this.book = '์ฑ';
    },
  };

  const obj = new Proxy(target, handler);
  obj.point = 500;

  console.log(handler.book); // this๊ฐ handler ์ค๋ธ์ ํธ๋ฅผ ์ฐธ์กฐํ๋ฏ๋ก handler์ {point: 123}์์ 123๋ฅผ ๋ฐํ ํจ

  console.log(target.book); // thisrk handler์ ์ค๋ธ์ ํธ๋ฅผ ์ฐธ์กฐํ๋ฏ๋ก handler์ {book: "์ฑ"}์ด ์ค์ ๋จ
  ```

```toc

```
