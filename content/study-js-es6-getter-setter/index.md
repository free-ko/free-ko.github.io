---
emoji: π¨βπ»
title: Getter, Setter
date: '2021-09-14 00:00:00'
author: μ°κΈ°
tags: λΈλ‘κ·Έ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  π  Getter, Setter
</h1>

<br>

## 1. Getter

- `getter`λ‘ μ μΈλ ν¨μλ₯Ό μλμΌλ‘ νΈμΆ
  - κ°μ λ°ννλ μλ§¨ν±μ κ°κ³  μμΌλ―λ‘ `getter` ν¨μμμ κ°μ λ°νν΄μΌ ν¨
- ES5 νν

  ```tsx
  var book = {};

  Object.defineProperty(book, 'title', {
    get: function () {
      return 'μ±';
    },
  });

  console.log(book.title);
  ```

  1. `book.title`μ μ€ννλ©΄ `title` νλ‘νΌν°μμ `get` μμ±μ μ‘΄μ¬λ₯Ό μ²΄ν¬ ν¨
  2. μμΌλ©΄, `get()` ν¨μλ₯Ό νΈμΆνλ©° `"μ±"`μ΄ λ°νλμ΄ μΆλ ₯ λ¨
  3. `book.title.get()` μ²λΌ ν¨μλ‘ νΈμΆνλ©΄ μλ¬κ° λ°μν¨
  4. ES5μ `Descriptor`λ₯Ό μ°Έμ‘°νμΈμ

- ES6 νν

  ```tsx
  const book = {
  	point: 100,
  	get getPint() {
  		return this.point;
  	}
  };

  console.log(book.**getPoint**);   // 100
  ```

  1. `get getPoint(){}` μ²λΌ `getPoint()` μμ `get`μ μμ±νλ©΄ `getter`λ‘ μ μΈλ¨
  2. `getPoint()` ν¨μκ° μλμΌλ‘ νΈμΆ λ¨

- ES6 μ₯μ 

  - ES5μ²λΌ νλ‘νΌν°μ μμ± κ΅¬μ‘°κ° μλ
  - μμ± νΈλ¦¬
  - λ€μμ `getter` μ¬μ© κ°λ₯

    ```tsx
    const book = {
    	get getPoint() {
    		return "ν¬μΈνΈ";
    	}

    	get getTitle() {
    		return "μ λͺ©";
    	}
    }

    console.log(book.**getPoint**);   // ν¬μΈνΈ
    console.log(book.**getTitle**);   // μ λͺ©
    ```

  <br>

  ## 2. Setter

  - νλ‘νΌν°μ κ°μ ν λΉνλ©΄
    - `setter`λ‘ μ μΈλ ν¨μ μλ νΈμΆ
    - κ°μ μ€μ νλ μλ§¨ν±μ κ°κ³  μμΌλ―λ‘ `setter` ν¨μμμ κ°μ μ€μ ν΄μΌ ν¨

  <br>

  - ES5 νν

    ```tsx
    var book = { title: 'HTML' };

    Object.defineProperty(book, 'change', {
      set: function (param) {
        this.title = param;
      },
    });

    book.change = 'JS';

    console.log(book); // {title: "JS"};
    ```

    1. `book.change = "JS"`λ₯Ό μ€ννλ©΄ `change` νλ‘νΌν°μ `set` μμ±μ μ‘΄μ¬ μ¬λΆλ₯Ό μ²΄ν¬
    2. μμΌλ©΄, `set()` ν¨μλ₯Ό νΈμΆ
    3. `"JS"`λ₯Ό νλΌλ―Έν° κ°μΌλ‘ λκ²¨ μ€

  <br>

  - ES6 νν

    ```tsx
    const bookt = {
      point: 100,
      set setPoint(param) {
        this.point = param;
      },
    };

    book.setPoint = 200;

    console.log(book.point); // 200
    ```

    1. `setPoint(`) μμ `set`μ μμ±νλ©΄ `setter`λ‘ μ μΈλ¨
    2. `book.setPoint = 200;` `setPoint`μ κ°μ ν λΉνλ©΄ `setPoint()`κ° μλμΌλ‘ νΈμΆ λ¨
    3. νλΌλ―Έν° κ°μΌλ‘ `200`μ λκ²¨μ€

  <br>

  - λ³μ«κ°μ ν¨μ μ΄λ¦μΌλ‘ μ¬μ©

    ```tsx
    const name = 'setPoint';
    const book = {
      point: 100,
      set [name](param) {
        this.point = param;
      },
    };

    book[name] = 200;

    console.log(book.point); // 200
    ```

    1. `name` λ³μ«κ°μΈ "setPoint"κ° ν¨μ μ΄λ¦μΌλ‘ μ¬μ©λ¨
    2. `getter`λ κ°μ λ°©λ²μΌλ‘ μ¬μ© ν  μ μμ

  <br>

  - setter μ­μ 

    ```tsx
    const name = 'setPoint';
    const book = {
      set [name](param) {
        this.point = param;
      },
    };

    delete book[name];

    console.log(book[name]); // undefined
    ```

    - `delete` μ°μ°μλ‘ `setter`λ₯Ό μ­μ  ν  μ μμ

```toc

```
