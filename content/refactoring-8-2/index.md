---
emoji: 👋
title: '리팩터링 8장-2'
date: '2023-09-27 10:50:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## 8.5 인라인 코드를 함수 호출로 바꾸기

- 함수는 동작의 목적을 말해주기 때문에 코드를 이해하기 쉽게 해주고, 중복을 없애줌
- 이미 존재하는 함수와 똑같은 일을 하는 인라인 코드를 발견하면 해당 코드를 함수 호출로 대체할 수 있음. 특히 라이브러리가 제공하는 함수로 대체할 수 있다면 훨씬 좋음

### 절차

1. 인라인 코드를 함수 호출로 대체
2. 테스트

### 예시

```ts
// before
let appliesToMass = false;
for (const s of states) {
  if (s === 'MA') appliesToMass = true;
}
```

```ts
// after
appliesToMass = states.includes('MA');
```

<br>

### 참고

- [리팩터링 2판 책](https://www.yes24.com/Product/Goods/89649360)

```toc

```

```

```
