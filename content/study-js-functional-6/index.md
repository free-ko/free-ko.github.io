---
emoji: π¨βπ»
title: ν¨μν νλ‘κ·Έλλ° - Reduce ν¨μ
date: '2022-01-21 08:11:00'
author: μ°κΈ°
tags: λΈλ‘κ·Έ github-pages gatsby
categories: JS
---

<br>

## νλμ κ°μΌλ‘ λμ  νλ μμ

```tsx
const nums = [1, 2, 3, 4, 5];

const total = 0;
for (const n of nums) {
  total = total + n;
}

console.log(total); // 15
```

<br>

## κΈ°λ³Έ Reduce μ¬μ© μμ

```tsx
const add = (a, b) => a + b;

console.log(reduce(add, 0, [1, 2, 3, 4, 5])); // 15
```

- `reduce`λ μ¬κ·μ μΌλ‘ μΈμλ‘ λ€μ΄μ¨ ν¨μλ₯Ό, κ³μ μ€ννλ©΄μ νλμ κ°μΌλ‘ λ§λ€μ΄μΌ ν¨

```tsx
const add = (a, b) => a + b;

console.log(reduce(add, 0, [1, 2, 3, 4, 5])); // 15

add(add(add(add(add(0, 1), 2), 3), 4), 5);
```

<br>

## Reduce ν¨μ λ΄λΆ κ΅¬μ‘°

```tsx
const reduce = (f, acc, iter) => {
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
};
```

<br>

## λμ  κ°μ μΈμλ‘ λ°μ§ μμμ κ²½μ°

- JSμμλ μμ μΈμμ€ `acc` κ°μ΄ λ€μ΄μ€μ§ μμλ κ°μ΄ μΆμ λλλ‘ κ΅¬νλμ΄ μμ

```tsx
console.log(reduce(add, [1, 2, 3, 4, 5]));

// JSκ° λ°μ μ²λΌ acc μΈμλ₯Ό λ£μ§ μμΌλ©΄ λ°μ μ²λΌ λ³νμν΄
console.log(reduce(add, 1, [2, 3, 4, 5]));
```

- λμ νλ κ°μ΄ `reduce` ν¨μ μΈμλ‘ λ€μ΄μ€μ§ μμμ κ²½μ°
- λ΄λΆμμ `iterator`λ₯Ό λ§λ€μ΄μ λ°°μ΄μ μ²« λ²μ§Έ κ°μ μν
- λ¨μν `λ°°μ΄[0]`μΌλ‘ μ κ·Όνμ§ μκ³ , λ΄λΆ μλ¦¬λ‘ μ΄κΈ°κ°μ μν

```tsx
reduce(add, [1, 2, 3, 4, 5]);

// μμ ν¨μμ²λΌ μΈμκ° λ€μ΄μ¬ κ²½μ°
const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
};
```

<br>

## Reduce μ¬μ© μμ

```tsx
const products = [
  { name: 'λ°νν°', price: 15000 },
  { name: 'κΈ΄νν°', price: 20000 },
  { name: 'νΈλν°μΌμ΄μ€', price: 15000 },
  { name: 'νλν°', price: 30000 },
  { name: 'λ°μ§', price: 25000 },
];

reduce((total_price, product) => total_price + product.price, 0, products);
```

<br>
<br>

## λλμ 

Reduceν¨μ λ΄λΆ κ΅¬μ‘° μ½λλ₯Ό μ§μ  κ΅¬ννλ©΄μ Reduce ν¨μμ μλμλ¦¬λ₯Ό μκ² λμμ, λν Reduceν¨μλ₯Ό ν΅ν΄ λ€μν κ°μ μΆμΆν  μ μλ€κ³  μκ°ν¨

<br>

### μ°Έκ³ 

```js
μ μΈλλμ ν¨μν νλ‘κ·Έλλ°κ³Ό JS ES6+ κ°μ

```

```toc

```
