---
emoji: 👨‍💻
title: 함수형 프로그래밍 - Take함수
date: '2022-01-28 08:55:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

# Take

- 특정 범위까지 배열로 리턴하는 함수

```tsx
const take = (l, iter) => {
  let res = [];

  for (const a of iter) {
    res.push(a);

    if (res.length === l) {
      return res;
    }
  }

  return res;
};

console.log(take(5, range(100))); // [0,1,2,3,4]
console.log(take(5, L.range(100))); // [0,1,2,3,4]
```

<br>

## take함수 안에서 range, L.range 함수 효율성

- 마찬가지로 L.range와 range 효율성 차이발생
- 일반 range함수는 특정 범위까지 배열을 만들고 나서 take 함수 진행
- 하지만 L.range는 배열을 만들지 않고 take의 첫 번째 인자인 5개의 값만 가진 배열을 만듬

```tsx
console.time('');
console.log(take(5, range(100000))); // 9.27197265625ms
console.timeEnd('');

console.time('');
console.log(take(5, L.range(100000))); // 0.43896484374ms
console.timeEnd('');
```

<br>

## take함수에 curry 적용

```tsx
const take = curry((l, iter) => {
  let res = [];

  for (const a of iter) {
    res.push(a);

    if (res.length === l) {
      return res;
    }
  }

  return res;
});

// L.range는 제너레이터 함수 리턴
// take, reduce를 만나기 전까지는 값을 만들지 않음
// 그러다가 take, reduce에서 값을 필요하면
// 그 때, next().value로 값을 리턴함
go(L.range(100), take(5), reduce(add));
```

<br>
<br>

## 느낀점

다시 한번 함수형 프로그래밍에 대한 장점을 알게되었다. 정말 효율성이 너무 좋은 것 같다.

제대로 학습해서 실무에서 무조건 적용해야 겠다.

<br>

### 참고

```js
유인동님의 함수형 프로그래밍과 JS ES6+ 강의

```

```toc

```
