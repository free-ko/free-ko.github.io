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

5. `for(;;)` 대신 `for-of` 또는 배열 메서드 사용

   - `for-of` 루프는 코드가 짧고 인덱스 변수를 사용하지 않아 실수를 줄일 수 있음
   - 인덱스 변수가 필요한 경우엔 `forEach` 메서드 사용 권장

6. 함수 표현식보다 화살표 함수 사용

   - 상위 스코프의 this를 유지할 수 있음
   - 코드를 더 직관적이고 간결하게 작성할 수 있음

7. 단축 객체 표현과 구조 분해 할당 사용

   - 변수와 객체 속성의 이름이 같은 경우

     ```js
     const x = 1,
       y = 2,
       z = 3;

     const pt = { x, y, z };
     ```

   - 객체 속성 중 함수를 축약해서 표현하는 방법

     ```js
     const obj = {
       onClickLong: function (e) {
         // ...
       },
       onClickCompact(e) {
         // ...
       },
     };
     ```

   - 객체 구조 분해

     ```js
     const {
       props: { a, b },
     } = obj;
     ```

8. 함수 매개변수 기본값 사용

   - 기본값을 기반으로 타입 추론이 가능하기 때문에, 타입스크립트로 마이그레이션 시 매개변수에 타입 구문을 쓰지 않아도 됨

9. 저수준 프로미스나 콜백 대신 `async / await` 사용

   - 버그나 실수를 방지할 수 있고, 비동기 코드에 타입 정보가 전달되어 타입 추론을 가능하게 함

10. 연관 배열에 객체 대신 Map과 Set 사용

    - 인덱스 시그니처 사용 시 : `constructor` 등의 특정 문자열이 주어지는 경우 예약어로 인식하는 문제
    - Map 사용

      ```ts
      function countWordsMap(text: string) {
        const counts = new Map<string, number>();

        for (const word of text.split(/[\s,.]+/)) {
          counts.set(word, 1 + (counts.get(word) || 0));
        }

        return counts;
      }
      ```

11. 타입스크립트에 use strict 넣지 않기

    - 타입스크립트는 기본적으로 'use strict'를 사용
    - alwaysStrict 또는 strict 컴파일러 옵션 설정 권장

12. TC39나 타입스크립트 릴리즈 노트를 통해 최신 기능 확인 가능

<br>

## 아이템 59: 타입스크립트 도입 전에 @ts-check와 JSDoc으로 시험해 보기

1. `@ts-check` 지시자를 사용하여 타입 체커가 파일을 분석하고, 발견된 오류를 보고하도록 지시할 수 있음

   - 매우 느슨한 수준으로 타입 체크를 수행
   - 타입 불일치나 함수의 매개변수 개수 불일치 등

2. 선언되지 않은 전역 변수

   - 숨어 있는 변수라면 변수를 제대로 인식할 수 있게 별도로 타입 선언 파일을 만들기

   ```ts
   // @ts-check
   console.log(user.firstName);

   // types.d.ts
   interface UserData {
     firstName: string;
     lastName: string;
   }

   declare let user: UserData;

   // 선언 파일을 찾지 못하는 경우 ‘트리플 슬래시’ 참조를 사용하여 명시적으로 import
   // @ts-check
   // <reference path="./types.d.ts" />
   console.log(user.firstName); // 정상
   ```

3. 알 수 없는 라이브러리

   - 서드파티 라이브러리의 타입 정보
   - `@types/xxx` 설치하기

4. DOM 문제

   ```ts
   // @ts-check
   const ageEl = /** @type {HTMLInputElement} */ document.getElementById('age');
   ageEl.value = '12'; // 정상
   ```

5. 부정확한 JSDoc

   - 타입스크립트 언어 서비스는 타입을 추론해서 JSDoc을 자동으로 생성

   ```ts
   // @ts-check
   /**
    * @param {number} val
    */
   function double(val) {
     return 2 * val;
   }
   ```

<br>

### 참고

- [이펙티브 타입스크립트 Study](https://github.com/pagers-org/Effective-TypeScript)
- [이펙티브 타입스크립트 책](http://www.yes24.com/Product/Goods/102124327)

```toc

```
