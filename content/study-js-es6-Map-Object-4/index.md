---
emoji: ๐จโ๐ป
title: Map๊ณผ ์ดํฐ๋ ์ดํฐ ์ค๋ธ์ ํธ - entries(), keys(), values(), Symbol.iterator()
date: '2021-11-04 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐  Map๊ณผ ์ดํฐ๋ ์ดํฐ ์ค๋ธ์ ํธ - entries(), keys(), values(), Symbol.iterator()
</h1>

<br>

## 1. entries()

- Map ์ธ์คํด์ค๋ก ์ดํฐ๋ ์ดํฐ ์ค๋ธ์ ํธ ์์ฑ, ๋ฐํ

  - Map ์ธ์คํด์ค์ ์ค์ ๋ ์์๋ก ๋ฐํ
  - `next()` ๋ก `[key, value]` ๋ฐํ

    ```tsx
    const obj = new Map([
      ['one', 100],
      ['two', 200],
    ]);

    const iter = obj.entries();

    console.log(iter.next()); // {value: [one, 100], done: false}
    console.log(iter.next()); // {value: [one, 200], done: false}
    console.log(iter.next()); // {value: undefined, done: true}
    ```

<br>

## 2. keys()

- Map ์ธ์คํด์ค์ key๋ก ์ดํฐ๋ ์ดํฐ ์ค๋ธ์ ํธ ์์ฑ, ๋ฐํ
  - value๋ ํฌํจํ์ง ์์
  - Map ์ธ์คํด์ค์ ์ค์ ๋ ์์๋ก ๋ฐํ
- `next()` ๋ก key ๋ฐํ

  ```tsx
  const obj = new Map([
    ['one', 100],
    ['two', 200],
  ]);

  const iter = obj.keys();

  console.log(iter.next()); // {value: one, done: false}
  console.log(iter.next()); // {value: two, done: false}
  console.log(iter.next()); // {value: undefined, done: true}
  ```

  <br>

## 3. values()

- Map ์ธ์คํด์ค์ value๋ก ์ดํฐ๋ ์ดํฐ ์ค๋ธ์ ํธ ์์ฑ, ๋ฐํ

  - key๋ ํฌํจํ์ง ์์
  - Map ์ธ์คํด์ค์ ์ค์ ๋ ์์๋ก ๋ฐํ

- `next()` ๋ก value ๋ฐํ

  ```tsx
  const obj = new Map([
    ['one', 100],
    ['two', 200],
  ]);

  const iter = obj.values();

  console.log(iter.next()); // {value: 100, done: false}
  console.log(iter.next()); // {value: 200, done: false}
  console.log(iter.next()); // {value: undefined, done: true}
  ```

  <br>

## 4. Symbol.iterator()

- Map ์ธ์คํด์ค๋ก ์ดํฐ๋ ์ดํฐ ์ค๋ธ์ ํธ ์์ฑ, ๋ฐํ

  - `Map.prototype.entries()` ์ ๊ฐ์
  - `next()` ๋ก `[key, value]` ๋ฐํ

    ```tsx
    const obj = new Map([
      ['one', 100],
      ['two', 200],
    ]);

    const iter = obj[Symbol.iterator]();

    console.log(iter.next()); // {value: [one, 100], done: false}
    console.log(iter.next()); // {value: [one, 200], done: false}
    console.log(iter.next()); // {value: undefined, done: true}
    ```

```toc

```
