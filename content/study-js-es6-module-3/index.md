---
emoji: π¨βπ»
title: Module - export/import νν, λ³μ/ν¨μ/Class, as, *, default
date: '2021-12-14 00:00:00'
author: μ°κΈ°
tags: λΈλ‘κ·Έ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  π  Module - export/import νν, λ³μ/ν¨μ/Class, as, *, default
</h1>

<br>

## 1. export, import νν

- `export` λμμ `export` ν€μλ μμ±
  - `export function name(){...} λ³μ, function, Class, Object`
- μ€κ΄νΈ `{}` μ `import` μ΄λ¦ μμ±
  - `import {name,,, nameN} from "./export.mjs";`
- ν λ²μ `export` μ μΈ
  - `export {name1, ..., nameN};`
- `export, import` μ΄λ¦ λ³κ²½
  - `export {fromName as toName};`
  - `import {toName as name} from "./export.mjs";`
- `export` default
  - `export default function name(){...}`
  - `import name from "./export.mjs";`
- μ μ²΄ `import`
  - `import * as name from "./export.mjs";`

<br>

## 2. λ³μ, ν¨μ, Class

- λ³μ, ν¨μ `export/import`
  ```tsx
  // export.mjs

  export const point = 123;
  export function getPoint(id) {
    return id + point;
  }

  // import.mjs

  import { point, getPoint } from './export.mjs';

  console.log(point); // 123
  console.log(getPoint('code')); // code123
  ```
- `Class export/import`
  ```tsx
  // export.mjs

  export class Book {
    setPoint(point) {
      this.point = point;
    }
  }

  // import.mjs

  import { Book } from './export.mjs';

  const obj = new Book();
  obj.setPoint(700);

  console.log(obj.point); // 700
  ```
- `export` λ¦¬μ€νΈ ννλ‘ μμ±
  ```tsx
  // export.mjs

  const point = 123;

  function getPoint(id) {
    return id + poin;
  }

  export { point, getPoint };

  // import.mjs

  import { point, getPoint } from './export.mjs';

  console.log(point); // 123
  console.log(getPoint('code')); // code123
  ```

<br>

## 3. as, \*

- `as`λ‘ `export/import` μ΄λ¦ λ³κ²½
  ```tsx
  // export.mjs

  const point = 123;

  function getPoint(id) {
    return id + point;
  }

  export { point as asPoint, getPoint as asGetPoint };

  // import.js

  import { asPoint as point, asGetPoint as getPoint } from './export.mjs';

  console.log(point);
  console.log(getPoint('code'));
  ```
- `*` λ‘ `export` μ μ²΄λ₯Ό `import`
  ```tsx
  // export.mjs

  const point = 123;

  function getPoint(id) {
    return id + point;
  }

  export { point, getPoint };

  // import.js

  import * as all from './export.mjs';

  console.log(all.point); // 123
  console.log(all.getPoint('code')); // code123

  // as allμμ allμ΄ Object μ΄λ¦μ΄ λ¨
  // all = {point: κ°, getPoint: ν¨μ} ννκ° λλ―λ‘ all.pointλ‘ κ°μ κ΅¬ν  μ μμ
  ```

<br>

## 4. default

- λͺ¨λμ `export` κ° νλλ§ μλ κ²μ λͺμμ μΌλ‘ λνλΌ λ μ¬μ©
  ```tsx
  // export.mjs
  export default function getPoint(param) {
    return param + 100;
  }

  // import.js
  import getPoint from './export.mjs';

  console.log(getPoint('code')); // code100

  // λͺ¨λ νμΌμ defaultκ° μλ κ²μ κ°μ΄ μμ±ν  μ μμ§λ§ μΌλ°μ μΌλ‘ default νλλ§ μμ±ν¨
  // λͺ¨λ νμΌμ defaultλ₯Ό λ€μ μμ±νλ©΄ μλ¬ λ°μ
  ```
- `default` λ₯Ό λ¦¬μ€νΈ ννλ‘ μμ±
  ```tsx
  // export.mjs
  export default function getPoint(param) {
    return param + 100;
  }

  export { getPoint as default };

  // import.js
  import getPoint from './export.mjs';
  console.log(getPoint('code')); // code100
  ```
- ν¨μ μ΄λ¦μ μμ±νμ§ μμ νν
  ```tsx
  // export.mjs
  export default function getPoint(param) {
    return param + 100;
  }

  // import.js
  import getPoint from './export.mjs';
  console.log(getPoint('code')); // code100
  ```
- `*` λ‘ `default` λ₯Ό `import`
  ```tsx
  // export.mjs
  export default function getPoint(param) {
    return param + 100;
  }

  // import.js
  import * as all from './export.mjs';

  console.log(all.default('code')); // code100
  ```

```toc

```
