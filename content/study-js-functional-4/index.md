---
emoji: π¨βπ»
title: ν¨μν νλ‘κ·Έλλ° - Mapν¨μ
date: '2022-01-17 12:09:00'
author: μ°κΈ°
tags: λΈλ‘κ·Έ github-pages gatsby
categories: JS
---

<br>

## Mapν¨μμ κ΅¬μ‘°

- ν¨μν νλ‘κ·Έλλ°μμλ `μΈμ`μ `return`κ°μΌλ‘ μν΅νλ κ²μ κΆμ₯
- `μΈμ`λ λ³΄μ‘° ν¨μλ₯Ό λ£μ΄μ μ¬μ©
- `return` κ°μ ν΅ν΄ λ€λ₯Έ κ³³μμ μ¬μ©

```tsx
const map = (fun, iter) => {
  const result = [];

  for (const a of iter) {
    // μμ§ν  κ°μ fun ν¨μλ₯Ό ν΅ν΄ λ€μν κ²°κ³Ό κ°μ΄ λμ¬ μ μλλ‘,
    // mapν¨μ μ¬μ©νλ μ¬λμκ² μμ
    result.push(fun(a));
  }
};
```

<br>

### μ΄λ¦λ§ μΆμΆ

```tsx
const products = [
  { name: 'λ°νν°', price: 15000 },
  { name: 'κΈ΄νν°', price: 20000 },
  { name: 'νΈλν°μΌμ΄μ€', price: 15000 },
  { name: 'νλν°', price: 30000 },
  { name: 'λ°μ§', price: 25000 },
];
```

- Map ν¨μ μ¬μ©X

```tsx
const names = [];

for (const p of products) {
  names.push(p.name);
}
```

- Mapν¨μ μ¬μ©O

```tsx
map(p => p.name, products));
```

<br>

### κ°κ²©λ§ μΆμΆ

```tsx
const products = [
  { name: 'λ°νν°', price: 15000 },
  { name: 'κΈ΄νν°', price: 20000 },
  { name: 'νΈλν°μΌμ΄μ€', price: 15000 },
  { name: 'νλν°', price: 30000 },
  { name: 'λ°μ§', price: 25000 },
];
```

- Map ν¨μ μ¬μ©X

```tsx
const prices = [];

for (const p of products) {
  prices.push(p.price);
}
```

- Mapν¨μ μ¬μ©O

```tsx
map(p => p.price, products));
```

<br>
<br>

## μ΄αα₯αα₯αα³α― αα³αα©αα©αα©α―αα³α― αα‘αα³α« mapαα΄ αα‘αα§αΌαα₯αΌ 1

### μΌλ° Mapν¨μλ Arrayλ§ μν κ°λ₯

- `document.querySelectorAll`μ `Array`λ₯Ό μμλ°μ κ°μ²΄κ° μλκΈ° λλ¬Έμ mapν¨μλ₯Ό μ¬μ©ν  μ μμ

```tsx
console.log([1,2,3].map(a => a+1));  // [2,3,4]

// .map is not a function
console.log(
	document.querySelectorAll('*').map(el => el.nodeName);
)
```

<br>

### νμ§λ§ λ°μμ λ§λ  Mapν¨μλ μ΄ν°λ¬λΈλ μ¬μ© κ°λ₯

- `document.querySelectorAll`μ΄ μ΄ν°λ¬λΈ νλ‘ν μ½μ λ°λ₯΄κΈ° λλ¬Έμ
- λ°μ `Map`μ¬μ© κ°λ₯
- μ¦, λ°μ μμ±ν `Map`ν¨μλ **λ°°μ΄** λΏλ§μλλΌ **μ΄ν°λ¬λΈ νλ‘ν μ½**μ λ°λ₯΄λ κ²λ€λ μνκ° κ°λ₯ν¨

```tsx
const map = (fun, iter) => {
	const result = [];

	for(const a of iter) {
		result.push(fun(a));
	}
}

// ["HTML", "HEAD", "SCRIPT", "SCRIPT", "BODY", "SCRIPT"]
console.log(
	map(el => el.nodeName, document.querySelectorAll('*'));
)

const it = document.querySelectorAll('*')[Symbol.iterator]();
console.log(it.next());   // {vale:html, done:false}
console.log(it.next());   // {vale:head, done:false}
```

<br>

### λν μ λλ μ΄ν°μμλ μ¬μ© κ°λ₯

```tsx
function* gen() {
  yield 2;
  yield 3;
  yield 4;
}

log(map((a) => a * a, gen())); //
```

- μ λλ μ΄ν° μμ μ½λ λ¬Έμ₯λ μ¬μ© κ°λ₯

```tsx
function* gen() {
  yield 2;
  if (false) yield 3;
  yield 4;
}

log(map((a) => a * a, gen()));
```

<br>

### μ€μ

- μΉ APIλ ECMAScriptμ μ΄ν°λ¬λΈ νλ‘ν μ½μ λ°λ₯΄κ³  μκΈ° λλ¬Έμ, λ€μν μ‘°ν©μ±μ κ°μ μ μμ
- ν΄λμ€, νλ‘ν νμμ λΏλ¦¬λ‘ κ°μ§ μΉ΄νκ³ λ¦¬ μμ μλ κ°λ§ μ¬μ©ν  μ μλ κ²λ³΄λ€, μμ λ°©λ²μ΄ μ μ°νκ³  λ€νμ±μ΄ λμ

<br>
<br>

## μ΄αα₯αα₯αα³α― αα³αα©αα©αα©α―αα³α― αα‘αα³α« mapαα΄ αα‘αα§αΌαα₯αΌ 2

### Map κ°μ²΄λ₯Ό μλ‘ λ§λ€ μ μλ λ€νμ±

```tsx
let m = new Map();

m.set('a', 10);
m.set('b', 20);

const it = m[Symbol.iterator]();

console.log(it.next()); // {value:['a', 10], done: false}
console.log(it.next()); // {value:['b', 20], done: false}

log(map(([k, a]) => [k, a * 2], m)); // [['a', 20], ['b', 40]]

// mapν¨μλ₯Ό ν΅ν΄ μλ‘μ΄ κ°μΌλ‘ map κ°μ²΄λ₯Ό λ§λ€ μ μμ
// // {"a" => 20, "b" => 40}
log(new Map(map(([k, a]) => [k, a * 2], m)));
```

## λλμ 

`map` ν¨μμ λ΄λΆ κ΅¬μ‘°λ₯Ό μκ²λμμΌλ©°, μ΄ν°λ¬λΈ νλ‘ν μ½μ λ°λ₯΄λ κ²λ€μ μννμ¬ μλ‘μ΄ λ€μν μ‘°ν©μ λ§λ€ μ μλ€λ μ¬μ€μ μκ²λμμ΅λλ€. λν μ΄λ¬ν `map`ν¨μλ₯Ό μ¬μ©νλ©΄ μ½λ κ°λμ± μΈ‘λ©΄μ΄λ μ±λ₯ μΈ‘λ©΄μ μ’λ€λ κ²λ μκ² λμμ΅λλ€.

<br>

### μ°Έκ³ 

```js
μ μΈλλμ ν¨μν νλ‘κ·Έλλ°κ³Ό JS ES6+ κ°μ

```

```toc

```
