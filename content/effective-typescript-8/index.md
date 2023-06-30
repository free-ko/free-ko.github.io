---
emoji: 👋
title: 'Effective TypeScript 8장'
date: '2023-06-30 22:30:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## 아이템 58: 모던 자바스크립트로 작성하기

1. 타입스크립트의 컴파일러를 자바스크립트의 ‘트랜스파일러’로 사용

   - 타입스크립트는 자바스크립트의 상위집합이므로 타입스크립트를 자바스크립트로 컴파일할 수 있음

2. ECMAScript 모듈 사용

   - ES2015에 등장한 import와 export 를 사용하는 모듈이 표준이 되었음

3. 프로토타입 대신 클래스 사용

   ```ts
   class Person {
     first: string;
     last: string;

     constructor(first: string, last: string) {
       this.first = first;
       this.last = last;
     }

     getName() {
       return this.first + ' ' + this.last;
     }
   }

   const marie = new Person('Marie', 'Curie');
   const personName = marie.getName();
   ```

4. `var` 대신 `let / const` 사용
   - 스코프 문제 피하기
   - 함수 선언문 대신 함수 표현식을 사용하여 호이스팅 문제 피하기

<br>

### 참고

- [이펙티브 타입스크립트 Study](https://github.com/pagers-org/Effective-TypeScript)
- [이펙티브 타입스크립트 책](http://www.yes24.com/Product/Goods/102124327)

```toc

```
