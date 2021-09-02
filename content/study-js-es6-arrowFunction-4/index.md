---
emoji: 👨‍💻
title: Arrow Function과 인스턴스
date: '2021-09-02 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 화살표 함수와 인스턴스, 화살표 함수 특징
</h1>

<br>

## 1. 화살표 함수와 인스턴스

- 인스턴스에서 화살표 함수의 `작성 위치`에 따라 `this`가 참조하는 오브젝트가 다름

### 1). `prototype`에 메소드로 작성

```tsx
var point = 200;

// 생성자 함수
const Point = function () {
  this.point = 100;
};

Point.prototype.getPoint = () => {
  console.log(this.point);
};

// new 연산자로 인스턴스를 만든 후 getPoint() 메소드를 호출 합니다.
new Point().getPoint(); // 200
```

1. `prototype`에 화살표 함수를 연결하면 함수 안에서 `this`가 글로벌 오브젝트를 참조 함
2. `console.log(this.point)` 에서 글로벌 오브젝트의 `point` 값이 200을 출력

<br>

### 2). `prototype`의 메소드 안에 작성

```tsx
const Point = function () {
  this.point = 100;
};

Point.prototpe.getPoint = function () {
  const add = () => this.point + 20;

  console.log(add());

  [1.2].forEach((value) => {
    console.log(this.point + value);
  });
};

new Point().getPoint();

// 120
// 101
// 102
```

1. `prototype`에 일반 함수를 연결하고, 함수 안에 화살표 함수를 작성한 형태 임.
2. `getPoint()`가 일반 함수 이므로 `this`가 생성한 인스턴스 참조
3. 또한, 화살표 함수에서도 `this`가 생성한 인스턴스를 참조 함
4. 화살표 함수의 스코프인 `getPoint()`의 `this`를 사용하기 때문

<br>

## 2. 화살표 함수 특징

- `function` 대신 `=>` 를 사용, 함수 표현식 형태

  - `prototype`이 없으므로 함수가 가벼움
  - `constructor`가 없으므로 `new` 연산자로 인스턴스를 생성할 수 없음

- 화살표 함수에 `this`가 없음
  - 화살표 함수로 `Function` 오브젝트를 생성할 때
  - 정적으로 화살표 함수가 속한 스코프의 `this`를 화살표 함수에 바인딩 함
  - 바인딩 된 `this` 참조가 바뀌지 않으며 화살표 함수에서 `this`로 사용 함
  - 일반 함수는 `call()` 등으로 바꿀 수 있음
- 메소드보다 함수로 사용하는 것이 효율 성이 높음

```toc

```
