---
emoji: 👨‍💻
title: Operator
date: '2021-09-13 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 Trailing commas, 거듭 제곱, try-catch, 함수 작성 형태
</h1>

<br>

## 1. Trailing Commas

- 배열 끝에 콤바 사용 가능
  - `]` 앞에 콤마 사용 가능
- `Object` 끝에 콤바 사용

  - `}` 앞에 콤마 사용 가능

  ```tsx
  const obj = {
    book: 100,
    point: 200,
  };

  const list = [100, 200];
  ```

<br>

## 2. 거듭 제곱

- 좌결 합성
  - 왼쪽에서 오른쪽으로 계산
  - `1 + 2 + 3`은 `(1 + 2) + 3`으로 계산
- 우결 합성(거듭제곱 계산 할 때만)
  - 오른쪽에서 왼쪽으로 계산
  - `A ** B ** C`에서 `A ** (B ** C)`로 계산

```tsx
console.log(2 ** 3);
console.log(3 ** 2);

console.log(2 ** (3 ** 2)); // 512
console.log(2 ** (3 ** 2));
console.log((2 ** 3) ** 2);
```

1. `2 ** 3 ** 2`은 2의 3승의 2승이 아니라
2. 먼저 3의 2승을 구하며(9) 2의 9승으로 512가 됨

<br>

## 2. Try-Catch

- `tyr-catch`의 `catch(error)`에서
  - `catch`처럼 (error)를 생략 가능
  - ES2019
- `(error)`에서 메시지를 받아 사용하지 않을 때 편리 함
- 타이핑 실수를 방지 할 수 있음

```tsx
const sports = '스포츠';

try {
  sports = '축구';
} catch (error) {
  console.log('(error) 작성');
}

// catch만 작성

try {
  sports = '축구';
} catch {
  console.log('(error) 생략');
}

// (error) 작성
// (error) 생략
```

<br>

## 3. 함수 작성 형태

- `Object`에 함수를 작성할 때
  - `function` 키워드를 작성하지 않아도됨
- 참고 : `Object`에 함수를 작성하는 이유
  - 함수에서 `this`로 `Object` 전체 참조
  - `new` 연산자로 인스턴스를 생성하지 않음, 메소드가 아닌 함수로 접근
  - `Object` 전체가 하나의 묶음 접근성, 가독성이 좋음
  - `sports`에 시맨틱을 부여할 수 있으며 다른 오브젝트와 이름과 프로퍼티 이름이 충돌되지 않음

```tsx
const sports = {
  point: 100,
  // ES5 형태
  getValue: function () {
    return this.point;
  },

  // ES6 형태
  getPoint() {
    return this.point;
  },
};

console.log(sports.getPoint());
```

- `getPoint(){}`처럼 `function` 키워드를 사용하지 않음

```toc

```
