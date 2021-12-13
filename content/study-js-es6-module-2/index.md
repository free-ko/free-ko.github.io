---
emoji: 👨‍💻
title: Module - 스코프, export 값 유지, this 참조
date: '2021-12-13 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  Module - 스코프, export 값 유지, this 참조
</h1>

<br>

## 1. module 스코프

- `Module` 코드는 `"use strict"` 에서 실행됨
- 다른 파일에서 모듈의 변수/함수 사용 불가

  - 별도의 스코프를 갖기 때문

    ```tsx
    /*
    	<script type = "module" src="./access_export.mjs"></script>
    	export function point(){};
    
    	export 모듈 파일을 <script>에 작성하지 않지만 악세스 불가를 설명하기 위해 작성함
    */

    let result;

    try {
      result = point;
    } catch {
      result = '모듈에서 사용 불가';
    }

    documnet.getElementById('result').innerHTML = result;
    ```

  - `<script type = "module"></script>` 에 `type="module"` 을 작성하면 별도의 스코프를 갖음

- `window` 를 사용하여 공유할 수 있지만, 이름이 같으면 대체될 수 있음
  - 상황에 따라 어쩔 수 없이 사용할 때는 이름이 중복되지 않도록 해야 함

<br>

## 2. export 값 유지

- `import` 한 `Module` 을 다시 `import` 하더라도 값이 대체되지 않고 이전에 `import`한 값이 유지 됨

  ```tsx
  // kee_export.mjs
  export const point = {
    value: '초깃값',
  };

  // keep_one.mjs
  import { point } from './keep_export.mjs';
  documnet.getElementById('one').innerHTML = '1. ' + point.value;

  point.value = '값 변경';

  // keep_two.mjs
  import { point } from './keep_export.mjs';
  documnet.getElementById('two').innerHTML = '2. ' + point.value;

  // 실행 결과
  // 1. 초깃값
  // 2. 값 변경
  ```

- 브라우저에서 실행되는 형태

  ```tsx
  // keep_one.mjs

  /*
  	kee_export.mjs
  	export const point = {
  		value: "초깃값"
  	};
  */

  import { point } from './keep_export.mjs';
  documnet.getElementById('one').innerHTML = '1. ' + point.value;

  // {point}의 value 프로퍼티 값을 변경함
  point.value = '값 변경';
  ```

  ```tsx
  // keep_two.mjs

  /*
  	kee_export.mjs
  	export const point = {
  		value: "초깃값"
  	};
  
  	import {point} from "./keep_export.mjs";
  	documnet.getElementById("one").innerHTML = "1. " + point.value;
  	
  	// {point}의 value 프로퍼티 값을 변경함
  	point.value = "값 변경";
  */

  import { point } from './keep_export.mjs';
  // {point}.value 값이 "초깃값"으로 설정되지 않고
  // "값 변경"을 유지 함

  documnet.getElementById('two').innerHTML = '2. ' + point.value;
  ```

<br>

## 3. this 참조

- 글로벌 오브젝트에서 `this` 는 `window` 오브젝트를 참조 함
- `<script type="module">` 로 작성된 파일에서 `this` 값은 `undefined` 임
- `Module`과 `Global`에서 `this`

  ```tsx
  // this_js.js

  const win = this;

  document.getElementById('js').innerHTML = this.Array.name;
  ```

  ```tsx
  // this_import.mjs

  /*
  	this.export.mjs
  	export const point = {
  		value: "초깃값"
  	};
  
  	<script type="module" src="./this_import.mjs"></script>
  */

  import { point } from './this_export.mjs';

  // type="module" 파일에서 this는 undefined임
  document.getElementById('one').innerHTML = this;
  ```

```toc

```
