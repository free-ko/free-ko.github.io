---
emoji: 👨‍💻
title: yield 분할 할당, for-of 반복
date: '2021-10-15 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  yield 분할 할당, for-of 반복
</h1>

## 1. yield 분할 할당

```tsx
function* sports() {
  return [yield yield];
}

const obj = sports();

console.log(obj.next()); // {value: undefined, done: false}
console.log(obj.next(10)); // {value: 10, done: false}

const last = obj.next(20);

console.log(last); // {value: [20], done: true}
console.log(last.value); // [20]
```

- 대괄호`[ ]` 안에 다수의 `yield` 작성
  - `return [yield yield];`
- `next()`, `next(10)` 호출
  - `yield` 를 연속해서 작성한 것과 같음
  - `yield` 를 2개 모두 수행했으므로 더 이상 처리할 `yield` 가 없음
- 세 번째 `next(20)` 호출
  - 파라미터 값 : 20
  - `return [yield, yield]`에서
  - `{value: [20], done: true}` 형태로 반환
  - `[20]`처럼 `[ ]` 안에 파라미터 값 20을 넣어서 반환
- `console.log()` 에 `{value: Array(1)}` 형태로 표시되지만 가독성을 위해 편집 함

<br>

## 2. for-of 문으로 반복

```tsx
function* sports(count) {
  while (true) {
    yield ++count;
  }
}

for (let point of sports(10)) {
  console.log(point);
  if (point > 12) {
    break;
  }
}

// 11
// 12
// 13
```

- `for-of` 문으로 제너레이터를 반복 호출
- 처음 `for-of` 문을 시작하면
  - `sports(10)` 으로 제너레이터 오브젝트를 생성함
  - 제너레이터 오브젝트에 10이 설정됨
  - 생성한 제너레이터 오브젝트를 저장할 변수가 없으며 엔진 내부에 저장함
  - `const engine = sports(10);` 과 같으며 `engine`이 엔진 내부의 이름으로 가정함
- 다시 `sports*()` 를 호출 함
  - `engine.next()` 와 같지만 반환 값이 다름
  - `while(true){ yield ++count }`를 실행 함
  - `{value: 11, done: false}` 를 반환하지 않고 `value` 만 `point` 변수에 설정함
- `{done: true}` 로 종료 처리를 할 수 없으므로
  - `break;` 를 사용하여 종료시켜야 함
- `for-of` 블록을 실행함
  - 11을 출력 함
  - `value` 값이 11이므로 다시 `for-of` 문을 수행
  - `while(true){ yield ++count}` 를 수행
- 이렇게 `break;` 를 만날 때 까지
  - 반복하여 `yield ++count;` 를 실행 함

<br>

```toc

```
