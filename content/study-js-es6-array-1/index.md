---
emoji: ๐จโ๐ป
title: from(), of()
date: '2021-09-30 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  from(), of()
</h1>

<br>

## 1. from()

- ์ฒซ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ ์ค๋ธ์ ํธ๋ฅผ `Array` ์ค๋ธ์ ํธ๋ก ๋ณํ

  ```tsx
  const like = { 0: 'zero', 1: 'one', length: 2 };
  const list = Array.from(like);

  console.log(list); // [zero, one]

  console.log(Arrayfrom('ABC')); // [A, B, C]
  ```

  ```tsx
  function args() {
    return Array.from(arguments);
  }

  console.log(args(1, 2, 3)); // [1,2,3]
  ```

  ```tsx
  // <li class=sports>์ถ๊ตฌ</li>
  // <li class=sports>๋๊ตฌ</li>

  const node = document.querySelectorAll('.sports');
  const show = (node) => console.log(node.textContent);

  Array.from(nodes).forEach(show);
  // NodeList๊ฐ ์ดํฐ๋ฌ๋ธ ์ค๋ธ์ ํธ์ด๋ฏ๋ก Array.from()์ผ๋ก ์ฝ์ ์ ์์
  // ์ถ๊ตฌ
  // ๋๊ตฌ
  ```

- ๋ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ ํจ์ ์์ฑ

  - ์ดํฐ๋ฌ๋ธ ์ค๋ธ์ ํธ๋ฅผ ์ ๊ฐํ  ๋๋ง๋ค ํธ์ถ

  ```tsx
  const like = {0:"zero", 1:"one", length:2};

  console.log(Array.from(like, value => {
  	return value + "๋ณ๊ฒฝ";
  })

  // [zero๋ณ๊ฒฝ, one๋ณ๊ฒฝ]
  ```

- ์ธ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ ์ค๋ธ์ ํธ ์์ฑ

  - ํธ์ถ๋ ํจ์์์ `this`๋ก ์ฐธ์กฐ

  ```tsx
  const like = { 0: 10, 1: 20, length: 2 };

  console.log(
    Array.from(
      like,
      function (value) {
        return value + this.plus;
      },
      { plus: 70 },
    ),
  );

  // ์ฝ๋ฐฑ ํจ์์์ this๋ก 3๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ ์ค๋ธ์ ํธ๋ฅผ ์ฐธ์กฐํจ
  // ํ์ดํ ํจ์๋ฅผ ์ฌ์ฉํ๋ฉด ์ฝ๋ฐฑ ํจ์์์ 3๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ ์ค๋ธ์ ํธ๋ฅผ ์ฐธ์กฐํ์ง ์์
  // [80, 90]
  ```

<br>

## 2. of() ํจ์

- ํ๋ผ๋ฏธํฐ ๊ฐ์ `Array`๋ก ๋ณํ, ๋ฐํ
  ```tsx
  const result = Array.of(1, 2, 3);

  console.log(result); // [1, 2, 3]
  console.log(Array.of()); // []
  ```
- ํ๋ผ๋ฏธํฐ์ ๋ณํ ๋์ ๊ฐ์ ์์ฑ
  - ์ฝค๋ง๋ก ๊ตฌ๋ถํ์ฌ ๋ค์ ์์ฑ ๊ฐ๋ฅ

```toc

```
