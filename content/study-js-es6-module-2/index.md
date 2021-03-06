---
emoji: π¨βπ»
title: Module - μ€μ½ν, export κ° μ μ§, this μ°Έμ‘°
date: '2021-12-13 00:00:00'
author: μ°κΈ°
tags: λΈλ‘κ·Έ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  π  Module - μ€μ½ν, export κ° μ μ§, this μ°Έμ‘°
</h1>

<br>

## 1. module μ€μ½ν

- `Module` μ½λλ `"use strict"` μμ μ€νλ¨
- λ€λ₯Έ νμΌμμ λͺ¨λμ λ³μ/ν¨μ μ¬μ© λΆκ°

  - λ³λμ μ€μ½νλ₯Ό κ°κΈ° λλ¬Έ

    ```tsx
    /*
    	<script type = "module" src="./access_export.mjs"></script>
    	export function point(){};
    
    	export λͺ¨λ νμΌμ <script>μ μμ±νμ§ μμ§λ§ μμΈμ€ λΆκ°λ₯Ό μ€λͺνκΈ° μν΄ μμ±ν¨
    */

    let result;

    try {
      result = point;
    } catch {
      result = 'λͺ¨λμμ μ¬μ© λΆκ°';
    }

    documnet.getElementById('result').innerHTML = result;
    ```

  - `<script type = "module"></script>` μ `type="module"` μ μμ±νλ©΄ λ³λμ μ€μ½νλ₯Ό κ°μ

- `window` λ₯Ό μ¬μ©νμ¬ κ³΅μ ν  μ μμ§λ§, μ΄λ¦μ΄ κ°μΌλ©΄ λμ²΄λ  μ μμ
  - μν©μ λ°λΌ μ΄μ© μ μμ΄ μ¬μ©ν  λλ μ΄λ¦μ΄ μ€λ³΅λμ§ μλλ‘ ν΄μΌ ν¨

<br>

## 2. export κ° μ μ§

- `import` ν `Module` μ λ€μ `import` νλλΌλ κ°μ΄ λμ²΄λμ§ μκ³  μ΄μ μ `import`ν κ°μ΄ μ μ§ λ¨

  ```tsx
  // kee_export.mjs
  export const point = {
    value: 'μ΄κΉκ°',
  };

  // keep_one.mjs
  import { point } from './keep_export.mjs';
  documnet.getElementById('one').innerHTML = '1. ' + point.value;

  point.value = 'κ° λ³κ²½';

  // keep_two.mjs
  import { point } from './keep_export.mjs';
  documnet.getElementById('two').innerHTML = '2. ' + point.value;

  // μ€ν κ²°κ³Ό
  // 1. μ΄κΉκ°
  // 2. κ° λ³κ²½
  ```

- λΈλΌμ°μ μμ μ€νλλ νν

  ```tsx
  // keep_one.mjs

  /*
  	kee_export.mjs
  	export const point = {
  		value: "μ΄κΉκ°"
  	};
  */

  import { point } from './keep_export.mjs';
  documnet.getElementById('one').innerHTML = '1. ' + point.value;

  // {point}μ value νλ‘νΌν° κ°μ λ³κ²½ν¨
  point.value = 'κ° λ³κ²½';
  ```

  ```tsx
  // keep_two.mjs

  /*
  	kee_export.mjs
  	export const point = {
  		value: "μ΄κΉκ°"
  	};
  
  	import {point} from "./keep_export.mjs";
  	documnet.getElementById("one").innerHTML = "1. " + point.value;
  	
  	// {point}μ value νλ‘νΌν° κ°μ λ³κ²½ν¨
  	point.value = "κ° λ³κ²½";
  */

  import { point } from './keep_export.mjs';
  // {point}.value κ°μ΄ "μ΄κΉκ°"μΌλ‘ μ€μ λμ§ μκ³ 
  // "κ° λ³κ²½"μ μ μ§ ν¨

  documnet.getElementById('two').innerHTML = '2. ' + point.value;
  ```

<br>

## 3. this μ°Έμ‘°

- κΈλ‘λ² μ€λΈμ νΈμμ `this` λ `window` μ€λΈμ νΈλ₯Ό μ°Έμ‘° ν¨
- `<script type="module">` λ‘ μμ±λ νμΌμμ `this` κ°μ `undefined` μ
- `Module`κ³Ό `Global`μμ `this`

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
  		value: "μ΄κΉκ°"
  	};
  
  	<script type="module" src="./this_import.mjs"></script>
  */

  import { point } from './this_export.mjs';

  // type="module" νμΌμμ thisλ undefinedμ
  document.getElementById('one').innerHTML = this;
  ```

```toc

```
