---
emoji: 👨‍💻
title: let vs var
date: '2021-09-01 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 let 변수와 var 변수 차이
</h1>

<br>

## 💡 요약

- `for()`문에서 반복 할 때마다
  - `var` 변수는 스코프를 갖지 않음
  - `let` 변수는 스코프를 가짐

<br>

## 1) var 변수와 스코프

```tsx
// var변수와 스코프

var node = document.querySelector('.sports');

for (var k = 0; k < node.children.length; k++) {
  node.children[k].onclick = function (event) {
    event.target.style.backgroundColor = 'yellow';
    console.log(k);
  };
}
```

1. 어떤 것을 클릭하더라도 항상 `for()`문이 끝났을 때의 값인 `3`을 출력함
   - 전체의 스코프에서 하나의 값으로 할당되기 때문
   - for문의 마지막 값인 `3`이 `var` 선언된 `k` 즉 글로벌 변수에 할당 됨.
2. `var k = 0;` 에서 k 변수의 스코프는 함수 임

<br>

## 2) let 변수와 스코프

```tsx
// let변수와 스코프

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

- 이벤트를 설정할 때의 `k`값을 출력 합니다.

<br>

```toc

```
