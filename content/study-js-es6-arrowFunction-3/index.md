---
emoji: 👨‍💻
title: Arrow Function와 this
date: '2021-09-02 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 화살표 함수와 this, this가 정적 스코프 참조
</h1>

<br>

## 1. 화살표 함수와 this

### 1). `Strict` 모드에서 함수를 호출할 때

- 함수 앞에 오브젝트 작성은 필수

```tsx
// 오브젝트 작성은 필수

'use strict';

function book() {
  function getPoint() {
    console.log(this);
  }

  getPoint();
  // window.getPoint();
}

window.book(); // undefined
```

1. `strict` 모드에서는 `window.book()` 처럼 호출하는 함수 앞에 오브젝트를 작성해야 함, 이렇게 하지 않으면 `book()` 함수 안에서 `this` 값이 `undefined`
2. 또한, `getPoint()` 처럼 `window`를 앞에 작성하지 않으면 `getPoint()` 안에서 `this` 값이 `undefined` 임
3. 이를 피하기 위해 `window.getPoint()`로 호출하면 `window` 오브젝트에 `getPoint()`가 없으므로 에러가 남(현재 `book` 함수 블록 안에 `getPoint()`가 있음)
4. `strict` 모드의 함수에서 `this`를 참조하기 위해서는 `this`를 별도로 저장한 후 사용해야 하는 번거로움이 있음

—> 화살표 함수로 해결 가능

<br>

### 2). 화살표 함수에서 `this`가 글로벌 오브젝트 참조

```tsx
// 화살표 함수 사용

'use strict';

var point = 100;

function sports() {
  const getPoint = () => {
    console.log(this.point);
  };

  getPoint();
}

window.sports();
```

1. 화살표 함수로 작성하면 `getPoint()`로 호출할 수 있음
2. 또한, `getPoint()` 화살표 함수 안에서 `this`가 `undefined`가 아니라 글로벌(`window`) 오브젝트를 참조 함
3. `var point = 100`을 작성했으므로 100이 출력됨

<br>

### 3). `this`값이 `undefined`

```tsx
'use strict';

const book = {
  point: 500,
  getPoint: function () {
    console.log(this.point);
  },
};

book.getPoint();

/*
1. 일반 함수인 book.getPoint()를 호출하면
- 함수 안에서 this가 book 오브젝트를 참조 함
- 따라서 console.log에 500이 출력됨
*/

var point = 100;

const sports = {
  getPoint: () => {
    console.log('this.point', this.point);
  },
};

sports.getPoint(); // 100이 출력됨

/*
1. 화살표 함수인 sports.getPoint()를 호출하면
- 오른쪽 Local에 this:undefined가 표시됨

2. 이것은, 화살표 함수는 함수에 this를 갖고 있지 않기 때문

3. 이때, this가 window 오브젝트를 참조 함
*/

// 정리
/*
1. console.log("this.point", this.point);
- var point = 100;에서 var 키워드를 사용했으므
- poinrt 변수가 window 오브젝트에 설정됨
- 따라서 console.log에 100이 출력됨

2. 지금부터 this가 window 오브젝트를 참조하는 논리를 살펴봄
- 어떻게 화살표 함수는 this가 undefined인데 window를 참조하여 this에 값을 할당 할 수 있는지 파악
*/
```

<br>

## 2. `this`가 정적 스코프 참조

- 화살표 함수에서 정적 스코프의 `this`를 사용
- 정적(Lexical)스코프란
  - 엔진이 해석할 때, 화살표 함수를 만나면
  - `function object`를 생성하고
  - 화살표 함수가 속한 스코프를 생성한 함수 오브젝트 스코프에 바인딩
- 오브젝트에 바인딩된 스코프의 `this`를 화살표 함수에서 `this`로 사용

  ```tsx
  var title = "책";

  const book = {
  	show: () => console.log(this.title);
  }

  book.show();  // 책
  ```

  1. `show()` 화살표 함수에서 `this`가 `window` 오브젝트를 참조하는 것은
  2. 함수 밖 스코프의 변수를 사용하듯이 `show()`의 스코프인 `book` 함수 오브젝트에 설정된 스코프(글로벌 스코프)의 `this`를 화살표 함수에서 `this`로 사용하기 때문
  3. `book` 오브젝트가 글로벌 오브젝트에 설정되므로 `this`가 `window` 오브젝트를 참조 함

```toc

```
