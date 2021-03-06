---
emoji: ๐จโ๐ป
title: GeneratorFunction
date: '2021-10-11 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐   GeneratorFunction
</h1>

<br>

## GenratorFunction

- `GeneratorFunction.constructor` ๋ฅผ ์ฌ์ฉํ์ฌ

  - ์ ๋๋ ์ดํฐ ํจ์๋ฅผ ์์ฑ
  - ํ๋ผ๋ฏธํฐ๋ฅผ ๋ฌธ์์ด๋ก ์์ฑ
  - ๋ง์ง๋ง ํ๋ผ๋ฏธํฐ๊ฐ ํจ์ ์ฝ๋๊ฐ ๋๊ณ  ์์ ํ๋ผ๋ฏธํฐ ์ด๋ฆ์ด ๋จ

  ```tsx
  const fn = new Function('one', 'return one');
  console.log(fn(100)); // 100

  const create = Object.getPrototypeOf(function* () {}).constructor;

  const sports = new create('one', 'yield one');
  const obj = sports(100);
  console.log(obj.next()); // {value: 100, done: false}
  ```

  ```tsx
  const gen = function* () {};
  /*
  	1. ์ค๋ฅธ์ชฝ gen์ ํผ์น๋ฉด prototype์ด ์์
  	- ์ด๊ฒ์ ํผ์น๋ฉด constructor๊ฐ ์์ด์ผ ํ๋๋ฐ ์์
  	- ๋ํ ๋ฉ์๋๋ก ์์
  
  	2. __proto__๊ฐ ์์ผ๋ฉฐ ์ด๊ฒ์ ํผ์น๋ฉด constructor๊ฐ ์์
  	- __proto__์ ๋ค๋ฅธ ์ค๋ธ์ ํธ์ prototype์ ์ฐ๊ฒฐ๋ ํ๋กํผํฐ๋ฅผ
  	- ์ธ์คํด์ค ๊ฐ๋์ผ๋ก ์์ฑํ์ฌ ์ฒจ๋ถํ ๊ฒ์ด ํ์ ๋จ
  
  	3. ์ฆ, GeneratorFunction์ constructor๊ฐ ์ฒจ๋ถ๋ ๊ฒ
  */
  ```

  <br>

  - ์์

    ```tsx
      const create = Object.getPrototypeOf(
        function*(){}).constructor;
      console.log(create);       // function GeneratorFunction() {[native code]}

      const sprots = new create("one", "yield one;");
      console.log(typeof sports);   // function

      const obj = sports(100);
      console.log(obj.next();     // {value: 100, done: false}

      /*

        1. create = (function*(){}).constructor;
            - ์ ๋๋ ์ดํฐ ํจ์๋ฅผ ์์ฑํ๋
            - constructor(์์ฑ์)๋ฅผ ํ ๋น ํจ

        2. constructor๊ฐ ํ ๋น๋๋ฏ๋ก
            - new ์ฐ์ฐ์๋ก ์์ฑ์ ํจ์๋ฅผ ํธ์ถํ  ์ ์์

        3. console.log(create);
            - function GeneratorFunction() {} ์ถ๋ ฅ
            - function ์ค๋ธ์ ํธ ํํ

        4. sports = new create(param)
            - GeneratorFunction์ ์ฌ์ฉํ์ฌ ์ ๋๋ ์ดํฐ ํจ์๋ฅผ ์์ฑํ๊ณ  sports ๋ณ์์ ํ ๋น ํจ
            - param ์ ํ๋ผ๋ฏธํฐ์ ํจ์ ์ฝ๋๋ฅผ ์์ฑ one: ํ๋ผ๋ฏธํฐ ์ด๋ฆ, yield one: ํจ์ ์ฝ๋

        5. console.log(typeof sports)
            - new  ์ฐ์ฐ์๋ฅผ ์ฌ์ฉํ๋๋ฐ
            - sports๊ฐ Object๊ฐ ์๋๋ผ function์

        6. function์ด๋ผ๋ ๊ฒ์
            - function* sports() ๋ก ์ ๋๋ ์ดํฐ ํจ์๋ฅผ ์ ์ธํ ๊ฒ์ ๋ปํจ
            - ์ฆ, ์ง๊ธ๊น์ง ์ ๋๋ ์ดํฐ ํจ์๋ฅผ ์ ์ธํ๋ ์ฒ๋ฆฌ๋ฅผ ํ ๊ฒ

        7. const obj = sports(100);
            - ์ ๋๋ ์ดํฐ ํจ์๋ฅผ ํธ์ถ ํจ
            - ์ ๋๋ ์ดํฐ ์ค๋ธ์ ํธ ์์ฑ, ๋ฐํ
            - ํจ์ ์ฝ๋๋ฅผ ์คํํ์ง ์์
            - 100์ด one์ ๋งคํ ๋จ

        8. obj.next()
            - ์ ๋๋ ์ดํฐ ์ค๋ธ์ ํธ๋ ์ดํฐ๋ ์ดํฐ ์ค๋ธ์ ํธ์ด๋ฉฐ
            - obj์ ์ดํฐ๋ ์ดํฐ ์ค๋ธ์ ํธ๊ฐ ํ ๋น๋์ด ์์ผ๋ฏ๋ก
            - `next()`๋ฅผ ํธ์ถ ํ  ์ ์์
            - {value: 100, done: false} ์ถ๋ ฅ
      */
    ```

```toc

```
