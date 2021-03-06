---
emoji: ๐จโ๐ป
title: Proxy ์ธ์คํด์ค ์์ฑ - new Proxy(), Proxy.revocable()
date: '2021-11-27 00:00:00'
author: ์ฐ๊ธฐ
tags: ๋ธ๋ก๊ทธ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  ๐   Proxy ์ธ์คํด์ค ์์ฑ - new Proxy(), Proxy.revocable()
</h1>

<br>

## 1. new Proxy()

- `Proxy` ์ธ์คํด์ค๋ฅผ ์์ฑํ์ฌ ๋ฐํ ํจ
- ์ฒซ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ

  - `Proxy` ๋์ `target` ์ค๋ธ์ ํธ๋ฅผ ์์ฑ
  - Object, Array, Function ๋ฑ

- ๋ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ

  - ํธ๋ค๋ฌ๋ฅผ ์์ฑํจ

    ```tsx
    const target = ['A', 'B'];
    const handler = {
      get(target, key) {
        return target[key] + ', ์ฒซ ๋ฒ์งธ';
      },
    };

    const obj = new Proxy(target, handler);

    console.log(obj[0]); // A, ์ฒซ ๋ฒ์งธ

    // 1. const handler = {...} [[Get]] ๋์ ์ ์คํ๋  ํธ๋ค๋ฌ ์
    // 2. Proxy ์ธ์คํด์ค๋ฅผ ์์ฑํ๋ฉด์ target๊ณผ handler๋ฅผ ์ฐ๊ฒฐ ํจ
    // 3. new ์ฐ์ฐ์๋ฅผ ์ฌ์ฉํ์ง ์๊ณ  Proxy()๋ก ํธ์ถํ๋ฉด TypeError๊ฐ ๋ฐ์ํจ
    // 4. handler๋ฅผ ์ฌ์ฉํ์ง ์๋๋ผ๋ handler๋ฅผ ์์ฑํ์ง ์์ผ๋ฉด ์๋ฌ๊ฐ ๋ฐ์ํ๋ฏ๋ก new Proxy(target, {}) ํํ์ฒ๋ผ ๋ ๋ฒ์งธ ํ๋ผ๋ฏธํฐ์ ๋น Object{}๋ฅผ ์์ฑํจ
    // 5. obj[0] ๊ฐ์ ๊ตฌํ๋ ๊ฒ์ด๋ฏ๋ก ํธ๋ค๋ฌ์ get() ํธ๋ฉ์ด ํธ์ถ๋จ
    ```

- Proxy ํํ

  ```tsx
  const obj = Proxy; // Proxy ์ค๋ธ์ ํธ ๊ตฌ์กฐ๋ฅผ ์ดํด๋ณด๊ธฐ ์ํด obj์ ํ ๋น ํจ

  /*
  	1. Proxy ์ค๋ธ์ ํธ ์์ฒด๋ฅผ obj์ ํ ๋นํ์ผ๋ฏ๋ก prototype๊ณผ constructor๊ฐ ์์ด์ผ ํ๋๋ฐ ์์
  
  	2. new ์ฐ์ฐ์๋ก ์ธ์คํด์ค๋ฅผ ์์ฑํ๋ ค๋ฉด constructor๊ฐ ์์ด์ผ ํ๋๋ฐ ์์
  		- ๊ทธ๋ฐ๋ฐ๋ ์์ new ์ฐ์ฐ์๋ก ์ธ์คํด์ค๋ฅผ ์์ฑํ์
  		- Proxy(target, {}) ํํ๋ก ์คํํ๋ฉด ์๋ฌ๊ฐ ๋๋ค๊ณ  ํ์
  	
  	3. obj.__proto__๋ฅผ ํผ์น๋ฉด apply(), call()์ด ์์ผ๋ฉฐ ์ด๊ฒ์ Function ์ค๋ธ์ ํธ์ ๋ฉ์๋๋ก
  		- Proxy์์ ์ ์ํ ๊ฒ์ด ์๋
  
  	4. ํํธ, ์ด๋ฐ ๊ตฌ์กฐ๋ Proxy ์ค๋ธ์ ํธ๊ฐ Function ์ค๋ธ์ ํธ ํน์ฑ์ ๊ฐ๊ณ  ์๋ค๋ ๊ฒ์ ๋ปํจ
  
  	5. Proxy ์ค๋ธ์ ํธ๋ ์ผ๋ฐ์ ์ธ ํํ๊ฐ ์๋ ํน๋ณํ ํํ์ ์ค๋ธ์ ํธ์
  
  	6. ES6 ์คํ์ ์๋์ ๊ฐ์ด ์์ฑ๋์ด ์์
  		- A proxy object is an exotic object
  
  	7. exotic object๋ ๋ฒ์ฉ์ฑ์ ์ํ ํน๋ณํ ์ค๋ธ์ ํธ๋ฅผ ๋ปํจ
  
  	8. revocable():
  		- ์ทจ์ ๊ฐ๋ฅํ ์ค๋ธ์ ํธ๋ฅผ ์์ฑํ๋ฉฐ Proxy ์ค๋ธ์ ํธ์๋ ํจ์ ํ๋๋ง ์์
  */
  ```

- Proxy ์ธ์คํด์ค ํํ

  ```tsx
  const target = { point: 100 };

  const handler = {
    get(target, key) {
      return target[key] + 200;
    },
  };

  const obj = new Proxy(target, handler);
  /*
  	1. obj๋ฅผ ํผ์น๋ฉด [[Handler]]๊ฐ ์์ผ๋ฉฐ, ์ด๊ฒ์ ํธ๋ค๋ฌ๋ฅผ ๋ปํจ
  
  	2. [[Handler]]๋ฅผ ํผ์น๋ฉด get()์ด ์์ผ๋ฉฐ ์ด๊ฒ์ handler ์ค๋ธ์ ํธ์ ์์ฑํ ํธ๋ฉ์
  
  	3. [[Handler]].__proto__๋ฅผ ํผ์น๋ฉด get, set์ด ์์ ์ด๊ฒ์ด [[Get]], [[Set]]์
  
  	4. get() ํธ๋ฉ ์๋์ __proto__๊ฐ ์๊ณ  ๊ฑฐ๊ธฐ์ [[Get]]์ด ์์ผ๋ฏ๋ก get() ํธ๋ฉ์ด ์คํ๋จ
  		
  	5. [[Target]]์ ํผ์น๋ฉด {point: 100}์ด ํ์๋๋ฉฐ ์ด๊ฒ์ target ์ค๋ธ์ ํธ ์
  
  	6. [[Target]].__proto__๋ฅผ ํผ์น๋ฉด get, set์ด ์์ ์ด๊ฒ์ด [[Get], [[Set]]์
  */

  console.log(obj.point);
  /*
  	1. obj.point๋ getter์
  
  	2. obj Proxy ์ธ์คํด์ค์์ point ํ๋กํผํฐ ๊ฐ์ ๊ตฌํจ
  		- ํธ๋ค๋ฌ์ get() ํธ๋ฉ์ ์์ฑํ์ผ๋ฏ๋ก get() ํธ๋ฉ์ด ํธ์ถ๋จ
  
  	return target[key] + 200;
  
  	3. target์์ point ํ๋กํผํฐ ๊ฐ์ ๊ตฌํ๊ณ  200์ ๋ํด ๋ฐํ ํจ
  */
  ```

  <br>

## 2. Proxy.revocable()

- `Proxy` ๋ฅผ ์ฌ์ฉํ  ์ ์๋ ์ํ๋ก ๋ฐ๊ฟ ์ ์๋ ์ค๋ธ์ ํธ๋ฅผ ์์ฑ, ๋ฐํ

  ```tsx
  cosnt target = {point: 100};

  const handler = {
  	get(target, key) {
  		return target[key];
  	}
  };

  const obj = Proxy.revocable(target, handler);
  console.log(obj.proxy.point);   // 100

  obj.revoke();

  try {
  	obj.proxy.point;
  } catch {
  	console.log("Proxy ๊ธฐ๋ฅ ์ฌ์ฉ ๋ถ๊ฐ");
  }

  // 1. const obj = Proxy.revocable(target, handler), new Proxy(target, handler)์ ๊ฐ์ ๋ฐ๋ผ์ Proxy๋ฅผ ์ฒ๋ฆฌํ  ์ ์์
  // 2. ๋ค๋ง obj.proxy์ Proxy ์ธ์คํด์ค๊ฐ ์ค์ ๋จ
  // 3. console.log(obj.proxy.point); getter์ด๋ฏ๋ก ํธ๋ค๋ฌ์ get() ํธ๋ฉ์ด ํธ์ถ๋จ, obj.proxy์ Proxy ์ธ์คํด์ค๊ฐ ์์ผ๋ฏ๋ก obj.proxy.point ํํ๋ก ์์ฑํจ
  // 4. get() ํธ๋ฉ์์ 100์ ๋ฐํ
  // 5. obj.revoke(); obj.proxy์ Proxy๋ฅผ ์ฌ์ฉํ  ์ ์๊ฒ ๋ง๋ฌ
  // 6. obj.proxy.point; obj.proxy์ Proxy๋ฅผ ์ฌ์ฉํ  ์ ์์ผ๋ฏ๋ก ์๋ฌ๊ฐ ๋ฐ์ํจ
  ```

- ์์ฑํ ์ค๋ธ์ ํธ ๊ตฌ์กฐ

  ```tsx
  const traget = { point: 100 };
  const handler = {
    get(target, key) {
      return target[key];
    },
  };

  const obj = Proxy.revocable(target, handler);
  /*
  	1. obj๋ฅผ ํผ์น๋ฉด, proxy์ revoke()๊ฐ ์์
  
  	2. obj.proxy๋ฅผ ํผ์น๋ฉด [[Handler]]์ [[Target]]์ด ์์ ์ฆ, Proxy ์ธ์คํด์ค์
  
  	3. ์ด๋ฐ ๊ตฌ์กฐ๋ก ์ธํ [[Target]]์ point ํ๋กํผํฐ ๊ฐ์ ๊ตฌํ  ๋, obj.proxy.point ํํ๋ก ์์ฑํด์ผ ํจ
  
  	4. [[IsRevoked]]๊ฐ ์์ผ๋ฉฐ ๊ฐ์ false ์
  */

  obj.revoke();
  /*
  	1. obj.proxy๋ฅผ ํผ์น๋ฉด, [[IsRevoked]] ๊ฐ์ด false์์ true๋ก ๋ฐ๋
  
  	2. ์ด ๊ฐ์ด true์ผ ๋, obj.proxy.point๋ฅผ ์คํํ๋ฉด ์๋ฌ๊ฐ ๋ฐ์ํจ
  
  	3. revoke() ๋ฉ์๋๋ [[IsRevoked]] ๊ฐ์ true๋ก ์ค์ ํ์ฌ Proxy๊ฐ ์คํ๋์ง ์๋๋ก ํจ
  */
  ```

```toc

```
