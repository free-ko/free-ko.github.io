---
emoji: 👨‍💻
title: 함수형 프로그래밍 - 예시를 통해 복습
date: '2022-01-26 08:20:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

## 지금까지 학습한 함수들

```tsx
const curry = (f) => (a, ..._) => (_.length ? f(a, ..._) : (..._) => f(a, ..._));

const map = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
});

const filter = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
});

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
});

const go = (...args) => reduce((a, f) => f(a), args);

const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);
```

<br>
<br>

## 총 수량 구하기

```tsx
const products = [
  {name: '반팔티', price: 15000, quantity: 1},
  {name: '긴팔티', price: 20000, quantity: 2},
  {name: '핸드폰케이스', price: 15000, quantity: 3},
  {name: '후드티', price: 30000, quantity: 4},
  {name: '바지', price: 25000, quantity: 5}
];

go(
	products,
	map(p => p.quantity);    // [1,2,3,4,5]
	reduce((a,b) => a + b),  // 15
)

// 코드 정리
const add = (a, b) => a + b;

// 총 수량
const total_quantity = product => go(product,
	map(p => p.quantity),
	reduce(add);

// Pipe 적용
const total_quantity = pipe(
	map(p => p.quantity),
	reduce(add);

console.log(total_quantity(products));  // 15

```

<br>
<br>

## 총 금액 구하기

```tsx
const products = [
  {name: '반팔티', price: 15000, quantity: 1},
  {name: '긴팔티', price: 20000, quantity: 2},
  {name: '핸드폰케이스', price: 15000, quantity: 3},
  {name: '후드티', price: 30000, quantity: 4},
  {name: '바지', price: 25000, quantity: 5}
];

const total_price = pipe(
	map(p => p.price * p.quantity),
	reduce(a

console.log(total_price(products));  // 345000
```

<br>
<br>

## 리팩토링 해보기

- `total_quantity`, `total_price` 내부에 map 함수 인자에 전달하는 부분을 제외하고는 동일한 코드
- 현재, `map` 함수 실행 후 `reduce` 실행하는 과정이 특정 도메인(products)에 의존하고 있음
- 결국 `total_quantity`, `total_price` 은 특정 도메인(products)을 위한 코드 임
- 추상화 레벨을 높여, 많은 곳에 사용할 수 있도록 리팩토링 진행

```tsx
const products = [
  { name: '반팔티', price: 15000, quantity: 1 },
  { name: '긴팔티', price: 20000, quantity: 2 },
  { name: '핸드폰케이스', price: 15000, quantity: 3 },
  { name: '후드티', price: 30000, quantity: 4 },
  { name: '바지', price: 25000, quantity: 5 },
];

// 첫 번째 인자로 함수를 받아서 외부에서 위임하는 방식
// 즉, 파라미터에 전달할 때 결정할 수 있도록 리팩토링 가능
const sum = (f, iter) => go(iter, map(f), reduce(add));

// 총 수량
const total_quantity = (products) => sum((p) => p.quantity, products);

// 총 금액
const total_price = (products) => sum((p) => p.price * p.quantity, products);
```

<br>
<br>

## 커링을 이용해 더 리팩토링 해보기

```tsx
const sum = curry((f, iter) => go(iter, map(f), reduce(add)));

// curry으로 sum함수를 감싸게 되면
// 밑에처럼 실행 가능
const total_quantity = (products) => sum((p) => p.quantity)(products);

// 즉, products를 받는 함수가
// 바로 sum이 리턴하는 함수에 products를 전달하고만 있기 때문에
// products를 받는 자리에 sum(p => p.quantity) 이 코드를 대신해서 평가해도
// 똑같이 동작 함
const total_quantity = sum((p) => p.quantity);
```

- 다른 도메인에서도 사용

```tsx
// sum은 다른 도메인에서도 사용 가능 하기때문에
// 추상화 레벨이 높음
sum((user) => user.age, [{ age: 30 }, { age: 20 }, { age: 10 }]);
```

<br>
<br>

## 함수형 프로그래밍으로 HTML로 출력하기

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>HTML 출력해보기 - 장바구니</title>
  </head>

  <body>
    <div id="cart"></div>
  </body>
</html>
```

- `JS`를 통해서 HTML 랜더링
- 템플릿 리터럴을 통해서 동적으로 표현
- `Sum`이라는 함수를 통해 다양한 곳에서 사용 가능
- `Reduce`를 통해 HTML을 하나의 문자열로 합침

```tsx
const products = [
  { name: '반팔티', price: 15000, quantity: 1, is_selected: true },
  { name: '긴팔티', price: 20000, quantity: 2, is_selected: false },
  { name: '핸드폰케이스', price: 15000, quantity: 3, is_selected: true },
  { name: '후드티', price: 30000, quantity: 4, is_selected: false },
  { name: '바지', price: 25000, quantity: 5, is_selected: false },
];

const add = (a, b) => a + b;

const sum = curry((f, iter) => go(iter, map(f), reduce(add)));

const total_quantity = sum((p) => p.quantity);

const total_price = sum((p) => p.price * p.quantity);

document.querySelector('#cart').innerHTML = `
    <table>
      <tr>
        <th></th>
        <th>상품 이름</th>
        <th>가격</th>
        <th>수량</th>
        <th>총 가격</th>
      </tr>
      ${go(
        products,
        sum(
          (p) => `
          <tr>
            <td><input type="checkbox" ${p.is_selected ? 'checked' : ''}></td>
            <td>${p.name}</td>
            <td>${p.price}</td>
            <td><input type="number" value="${p.quantity}"></td>
            <td>${p.price * p.quantity}</td>
          </tr>
      `,
        ),
      )}
      <tr>
        <td colspan="3">합계</td>
        <td>${total_quantity(filter((p) => p.is_selected, products))}</td>
        <td>${total_price(filter((p) => p.is_selected, products))}</td>
      </tr>
    </table>
  `;
```

<br>

<br>
<br>

## 느낀점

이번 학습을 통해 함수형 프로그래밍으로 HTML을 출력하는 내용을 학습하면서 추상화가 높다는 의미가 어떤 것인지 다시 한번 알게 되었다. 결국 코드를 재 사용할 수 있는 범위가 높을 수록 효율적이고 생산적으로 일 할 수 있다는 것도 깨닫게 되었다. 더 제대로 학습해서 실무에서 적용할 수 있도록 해야 겠다.

<br>

### 참고

```js
유인동님의 함수형 프로그래밍과 JS ES6+ 강의

```

```toc

```
