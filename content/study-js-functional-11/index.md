---
emoji: ๐จโ๐ป
title: ํจ์ํ ํ๋ก๊ทธ๋๋ฐ - ์ง์ฐ์ฑ(takeํจ์)
date: '2022-01-28 08:55:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

# Take

- ํน์  ๋ฒ์๊น์ง ๋ฐฐ์ด๋ก ๋ฆฌํดํ๋ ํจ์

```tsx
const take = (l, iter) => {
  let res = [];

  for (const a of iter) {
    res.push(a);

    if (res.length === l) {
      return res;
    }
  }

  return res;
};

console.log(take(5, range(100))); // [0,1,2,3,4]
console.log(take(5, L.range(100))); // [0,1,2,3,4]
```

<br>

## takeํจ์ ์์์ range, L.range ํจ์ ํจ์จ์ฑ

- ๋ง์ฐฌ๊ฐ์ง๋ก L.range์ range ํจ์จ์ฑ ์ฐจ์ด๋ฐ์
- ์ผ๋ฐ rangeํจ์๋ ํน์  ๋ฒ์๊น์ง ๋ฐฐ์ด์ ๋ง๋ค๊ณ  ๋์ take ํจ์ ์งํ
- ํ์ง๋ง L.range๋ ๋ฐฐ์ด์ ๋ง๋ค์ง ์๊ณ  take์ ์ฒซ ๋ฒ์งธ ์ธ์์ธ 5๊ฐ์ ๊ฐ๋ง ๊ฐ์ง ๋ฐฐ์ด์ ๋ง๋ฌ

```tsx
console.time('');
console.log(take(5, range(100000))); // 9.27197265625ms
console.timeEnd('');

console.time('');
console.log(take(5, L.range(100000))); // 0.43896484374ms
console.timeEnd('');
```

<br>

## takeํจ์์ curry ์ ์ฉ

```tsx
const take = curry((l, iter) => {
  let res = [];

  for (const a of iter) {
    res.push(a);

    if (res.length === l) {
      return res;
    }
  }

  return res;
});

// L.range๋ ์ ๋๋ ์ดํฐ ํจ์ ๋ฆฌํด
// take, reduce๋ฅผ ๋ง๋๊ธฐ ์ ๊น์ง๋ ๊ฐ์ ๋ง๋ค์ง ์์
// ๊ทธ๋ฌ๋ค๊ฐ take, reduce์์ ๊ฐ์ ํ์ํ๋ฉด
// ๊ทธ ๋, next().value๋ก ๊ฐ์ ๋ฆฌํดํจ
go(L.range(100), take(5), reduce(add));
```

<br>
<br>

## ๋๋์ 

๋ค์ ํ๋ฒ ํจ์ํ ํ๋ก๊ทธ๋๋ฐ์ ๋ํ ์ฅ์ ์ ์๊ฒ๋์๋ค. ์ ๋ง ํจ์จ์ฑ์ด ๋๋ฌด ์ข์ ๊ฒ ๊ฐ๋ค.

์ ๋๋ก ํ์ตํด์ ์ค๋ฌด์์ ๋ฌด์กฐ๊ฑด ์ ์ฉํด์ผ ๊ฒ ๋ค.

<br>

### ์ฐธ๊ณ 

```js
์ ์ธ๋๋์ ํจ์ํ ํ๋ก๊ทธ๋๋ฐ๊ณผ JS ES6+ ๊ฐ์

```

```toc

```
