---
emoji: 👨‍💻
title: Module - export/import 형태, 변수/함수/Class, as, *, default
date: '2021-12-14 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  Module - export/import 형태, 변수/함수/Class, as, *, default
</h1>

<br>

## 1. export, import 형태

- `export` 대상에 `export` 키워드 작성
  - `export function name(){...} 변수, function, Class, Object`
- 중괄호 `{}` 에 `import` 이름 작성
  - `import {name,,, nameN} from "./export.mjs";`
- 한 번에 `export` 선언
  - `export {name1, ..., nameN};`
- `export, import` 이름 변경
  - `export {fromName as toName};`
  - `import {toName as name} from "./export.mjs";`
- `export` default
  - `export default function name(){...}`
  - `import name from "./export.mjs";`
- 전체 `import`
  - `import * as name from "./export.mjs";`

<br>

## 2. 변수, 함수, Class

- 변수, 함수 `export/import`
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
- `export` 리스트 형태로 작성
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

- `as`로 `export/import` 이름 변경
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
- `*` 로 `export` 전체를 `import`
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

  // as all에서 all이 Object 이름이 됨
  // all = {point: 값, getPoint: 함수} 형태가 되므로 all.point로 값을 구할 수 있음
  ```

<br>

## 4. default

- 모듈에 `export` 가 하나만 있는 것을 명시적으로 나타낼 때 사용
  ```tsx
  // export.mjs
  export default function getPoint(param) {
    return param + 100;
  }

  // import.js
  import getPoint from './export.mjs';

  console.log(getPoint('code')); // code100

  // 모듈 파일에 default가 아닌 것을 같이 작성할 수 있지만 일반적으로 default 하나만 작성함
  // 모듈 파일에 default를 다수 작성하면 에러 발생
  ```
- `default` 를 리스트 형태로 작성
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
- 함수 이름을 작성하지 않은 형태
  ```tsx
  // export.mjs
  export default function getPoint(param) {
    return param + 100;
  }

  // import.js
  import getPoint from './export.mjs';
  console.log(getPoint('code')); // code100
  ```
- `*` 로 `default` 를 `import`
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
