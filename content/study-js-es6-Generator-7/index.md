---
emoji: π¨βπ»
title: μ λλ μ΄ν° μ€λΈμ νΈ λ©μλ - return(), throw()
date: '2021-10-16 00:00:00'
author: μ°κΈ°
tags: λΈλ‘κ·Έ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  π  μ λλ μ΄ν° μ€λΈμ νΈ λ©μλ: return(), throw()
</h1>

## 1. return()

```tsx
function* sports(count) {
  while (true) {
    yield ++count;
  }
}

const obj = sports(10);

console.log(obj.next()); // {value: 11, done: false}
console.log(obj.return(70)); // {value: 70, done: true}
console.log(obj.next(50)); // {value: undefined, done: true}

// 1. obj.return(70) μ΄ν°λ μ΄ν°λ₯Ό μ’λ£ μν€λ©° νλΌλ―Έν° κ° 70μ λ°ν
// 2. obj.next(50) μ΄ν°λ μ΄ν°κ° μ’λ£λμμΌλ―λ‘ {value: undefined, done: true} λ°ν
// 3. νλΌλ―Έν° κ° 50μ λ°ννμ§ μμ
```

- μ΄ν°λ μ΄ν°λ₯Ό μ’λ£ μν΄
- `return()` νλΌλ―Έν° κ°μ `{ value: κ°, done: true }`
- `value` νλ‘νΌν° κ°μΌλ‘ μ€μ 

<br>

## 2. throw()

- `Error`λ₯Ό μλμ μΌλ‘ λ°μ μν΄

- μ λλ μ΄ν° ν¨μμ `catch()` λ¬Έμμ μλ¬λ₯Ό λ°μ

  ```tsx
  function* sports() {
  	try {
  		tield 10;
  	} catch (message) {
  		yield message;
  	};
  	yield 20;
  };

  const obj = sports();

  console.log(obj.next());
  console.log(obj.throw("μλ¬ λ°μ"));
  console.log(obj.next());

  // 1. obj.throw("μλ¬ λ°μ")λ₯Ό μ€ννλ©΄ sports()μ catch(message)κ° μ€νλκ³  "μλ¬ λ°μ"μ΄ messageμ μ€μ λ¨
  // 2. catch()μ yield messageλ₯Ό μννκ² λλ©° {value: "μλ¬ λ°μ", done: false}λ₯Ό λ°νν¨ μ λλ μ΄ν°κ° μ’λ£λμ§ μμ
  // 3. λ€μμ obj.next() νΈμΆ throw() νΈμΆλ‘ μΈν΄ μλ¬κ° λ°μνμ§λ§ {done: false}μ΄λ―λ‘ next()λ₯Ό νΈμΆν  μ μμ
  // 4. yeild 20;μ μ€ννκ² λλ©° {value: 20, done: flase}λ₯Ό λ°νν¨
  ```

- μ λλ μ΄ν° ν¨μμ `throw` λ¬Έμ μμ±

  ```tsx
  function* sports() {
    throw 'μλ¬ λ°μ';
    yield 10;
  }

  const obj = sports();

  try {
    const result = obj.next();
  } catch (message) {
    console.log(message);
  }

  console.log(obj.next());

  // 1. const result = obj.next();λ₯Ό μ€ννλ©΄ μ λλ μ΄ν° ν¨μμμ throwλ‘ μΈν΄ μλ¬κ° λ°μ
  // 2. κ·Έλμ next()λ₯Ό tryλ¬Έμ μμ±νμ
  // 3. tryλ¬Έμ catch(message)μμ μλ¬λ₯Ό λ°μ
  // 4. throw "μλ¬ λ°μ"μμ "μλ¬ λ°μ"μ΄ messageμ μ€μ λ¨
  // 5. μ λλ μ΄ν° ν¨μμμ μλ¬κ° λ°μνλ©΄ μ΄ν°λ μ΄ν°κ° μ’λ£λ¨
  // 6. λ§μ§λ§ μ€μμ obj.next()λ₯Ό νΈμΆνλ©΄ μ λλ μ΄ν°κ° μ€νλμ§ μμ
  // 7. μ λλ μ΄ν° ν¨μμ yield 10μ΄ μμ§λ§ {value: undefined, done: true} λ°ν
  ```

```toc

```
