---
emoji: 👋
title: 'Effective TypeScript 5장'
date: '2023-05-15 16:48:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## 아이템 38: any 타입은 가능한 한 좁은 범위에서만 사용

1. any 작성 방식

   ```ts
   function f1() {
     const x: any = expressionReturningFoo(); // X
     processBar(x);
   }

   function f2() {
     const x = expressionReturningFoo(); // O
     processBar(x as any);
   }
   ```

   - any 타입이 processBar 함수의 매개변수에만 사용된 표현식이므로 다른 코드에는 영향을 미치지 않기 때문

2. TS가 함수의 반환 타입을 추론할 수 있는 경우에도 함수의 반환 타입을 명시하는 것이 좋음
3. 강제로 타입 오류 제거 시 any 대신 @ts-ignore 사용

   ```ts
   // 근본적인 문제 해결은 아님

   function f1() {
     const x = expressionReturningFoo();
     // @ts-ignore
     processBar(x);
     return x;
   }
   ```

4. 객체와 관련한 any의 사용법

   ```ts
   // 모든 속성이 타입 체크가 되지 않는 부작용 발생
   const config: Config = {
     a: 1,
     b: 2,
     c: {
       key: value,
     },
   } as any; // X

   const config: Config = {
     a: 1,
     b: 2, // 이 속성은 여전히 체크됨
     c: {
       key: value as any,
     },
   };
   ```

<br>

## 참고

- [이펙티브 타입스크립트 Study](https://github.com/pagers-org/Effective-TypeScript)
- [이펙티브 타입스크립트 책](http://www.yes24.com/Product/Goods/102124327)

```toc

```
