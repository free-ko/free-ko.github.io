---
emoji: π¨βπ»
title: let vs var
date: '2021-09-01 00:00:00'
author: μ°κΈ°
tags: λΈλ‘κ·Έ github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  π let λ³μμ var λ³μ μ°¨μ΄
</h1>

<br>

## π‘ μμ½

- `for()`λ¬Έμμ λ°λ³΅ ν  λλ§λ€
  - `var` λ³μλ μ€μ½νλ₯Ό κ°μ§ μμ
  - `let` λ³μλ μ€μ½νλ₯Ό κ°μ§

<br>

## 1) var λ³μμ μ€μ½ν

```tsx
// varλ³μμ μ€μ½ν

var node = document.querySelector('.sports');

for (var k = 0; k < node.children.length; k++) {
  node.children[k].onclick = function (event) {
    event.target.style.backgroundColor = 'yellow';
    console.log(k);
  };
}
```

1. μ΄λ€ κ²μ ν΄λ¦­νλλΌλ ν­μ `for()`λ¬Έμ΄ λλ¬μ λμ κ°μΈ `3`μ μΆλ ₯ν¨
   - μ μ²΄μ μ€μ½νμμ νλμ κ°μΌλ‘ ν λΉλκΈ° λλ¬Έ
   - forλ¬Έμ λ§μ§λ§ κ°μΈ `3`μ΄ `var` μ μΈλ `k` μ¦ κΈλ‘λ² λ³μμ ν λΉ λ¨.
2. `var k = 0;` μμ k λ³μμ μ€μ½νλ ν¨μ μ

<br>

## 2) let λ³μμ μ€μ½ν

```tsx
// letλ³μμ μ€μ½ν

var node = document.querySelector('.sports');

for (let k = 0; k < node.children.length; k++) {
  node.children[k].onclick = function (event) {
    event.target.style.backgroundColor = 'yellow';
    console.log(k);
  };
}

// 0
// 1
// 2
```

- μ΄λ²€νΈλ₯Ό μ€μ ν  λμ `k`κ°μ μΆλ ₯ ν©λλ€.

<br>

```toc

```
