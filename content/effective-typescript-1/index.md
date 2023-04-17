---
emoji: 👋
title: 'Effective TypeScript 1장'
date: '2023-04-16 20:26:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## ✏️ 아이템 1: 타입스크립트와 자바스크립트의 관계 
> “타입스크립트는 자바스크립트의 상위집합(superset)이다”

1. 그렇기 때문에 JS 코드는 이미 TS다.
   - 기존 JS 코드를 타입스크립트로 마이그레이션하는데 큰 이점
   - 타입 구문을 사용하는 순간부터 JS는 TS 영역으로 들어가게 됨

2. 타입 시스템에서는 런타임에 오류를 발생시킬 코드를 미리 찾아낸다.
   ```ts
   const city = [
     { name: "jeon-ju", food: "kong-na-mul-kook-bob" },
     { name: "seoul", food: "none" },
     // ...
   ];
   
   for (const localCity of city) {
     console.log(localCity.size); // JS에서는 undefined, TS에서는 에러
   }
   ```

3. 타입을 명시적으로 선언하여 의도를 분명하게 하면 오류를 구체적으로 알 수 있다.
   ```ts
   interface City {
     name: string;
     food: string;
   }
   
   const city: City[] = [
     { name: "jeon-ju", food: "kong-na-mul-kook-bob" },
     { name: "seoul", food: "none" },
   ];
   
   // 🚨 Error
   // 'City' 형식에 'size'이 없습니다.
   for (const localCity of city) {
     console.log(state.size);
   }
   ```
   
<br>

## ✏ 아이템 2: 타입스크립트 설정
1. `tsconfig.json`으로 타입스크립트 설정 작성
   ```js
   {
     "compilerOptions": {
       // ...
     }
   }
   ```
2. `noImplicitAny` : 변수들이 미리 정의된 타입을 가져야 하는지 여부를 제어(any 타입을 사용하면 에러 설정)
   ```js
   function add(a, b) {
     return a + b;
   }
   
   // 이를 암시적 any라고 부른다
   // noImplicitAny가 설정되었다면 오류 발생
   function add(a: any, b: any): any;
   ```
3. strictNullChecks
   - `null`과 `undefined`가 모든 타입에서 허용되는지 설정
   ```js
      // strictNullChecks 해제 시
      const x: number = null; // 정상

      // strictNullChecks 설정 시
      // 🚨 에러: 'null' 형식은 'number' 형식에 할당할 수 없습니다.
      const x: number = null; 
   ```

<br>

## ✏ 아이템 3: 코드 생성과 타입은 관계가 없음
1. TS 컴파일러는 2가지 역할을 수행
   - 최신 TS,JS를 브라우저에서 동작할 수 있도록 구버전 JS로 트랜스파일 함
   - 코드의 타입 오류를 체크 함
2. 타입 오류가 있는 코드도 컴파일 가능
   - 컴파일은 타입 체크와 독립적으로 동작하기 때문
   - 작성한 TS가 유효한 JS라면 TS 컴파일러는 컴파일 진행
3. 런타임에는 타입 체크가 불가능
   - TS의 타입은 ‘제거 가능’ 즉, JS로 컴파일되는 과정에서 모든 인터페이스, 타입, 타입 구문은 그냥 사라짐
   - 런타임에 타입 정보를 유지하는 방법
      - 특정 속성이 존재하는지 체크
      - `태그`기법 : 런타임에 접근 가능한 타입 정보를 명시적으로 저장
         ```ts
             interface Square {
                kind: "square";
                width: number;
             }
           
             interface Rectangle {
                kind: "rectangle";
                height: number;
                width: number;
             }
           
             // '태그된 유니온(tagged union)'
             type Shape = Square | Rectangle;
         
             function calculateArea(shape: Shape) {
                 if (shape.kind === "rectangle") {
                   shape; // 타입이 Rectangle
                   return shape.width * shape.height;
                 } else {
                   shape; // 타입이 Square
                   return shape.width * shape.width;
                 }
             }
        ```
4. 타입 연산은 런타임에 영향을 주지 않음
   - 값을 정제하기 위해서는 런타임의 타입을 체크해야 하고 JS 연산을 통해 변환을 수행해야 함
5. 런타임 타입은 선언된 타입과 다를 수 있음
   - `switch~case` 구문의 `default` 구문
   - API 요청의 반환값을 사용하는 경우
6. TS 타입으로는 함수를 오버로드할 수 없음
      ```js
      function add(a: number, b: number) {
        return a + b;
      } // 🚨 에러: 중복된 함수 구현입니다.
      
      function add(a: string, b: string) {
        return a + b;
      } // 🚨 에러: 중복된 함수 구현입니다.
      ```
   - TS 함수 오버로딩은 타입 수준에서만 가능(구현체는 불가)
      ```ts
        function add(a: number, b: number): number;
        function add(a: string, b: string): string;
      ```
7. TS 타입은 런타임 성능에 영향을 주지 않음
   - 타입과 타입 연산자는 JS 변환 시점에 제거되기 때문
   - 런타임 오베허드가 없는 대신, TS 컴파일러는 ‘빌드타임’ 오버헤드가 있음
   - TS 컴파일하는 코드는 오래된 런타임 환경을 지원하기 위해 호환성을 높이고 성능 오버헤드를 감안할지, 호환성을 포기하고 성능 중심의 네이티브 구현체를 선택할지의 문제에 맞닥뜨릴 수도 있음

<br>

## ✏ 아이템 4: 구조적 타이핑에 익숙해지기
1. JS는 본질적으로 덕 타이핑(duck typing) 기반
   - 덕 타이핑 : 객체가 어떤 타입에 부합하는 변수와 메서드를 가질 경우 객체를 해당 타입에 속하는 것으로 간주하는 방식
2. TS도 JS 처럼 덕 타이핑 동작을 그대로 모델링 함

   ```ts
   interface Vector2D {
      x: number;
      y: number;
   }
   
   function calculateLength(v: Vector2D) {
      return Math.sqrt(v.x * v.x + v.y * v.y);
   }
   
   // Vector2D 인터페이스를 확장하며, name 프로퍼티를 추가로 가지고 있음
   // 구조적 타이핑 때문에, Vector2D 인터페이스와 호환
   // NamedVector 인터페이스의 x,y와 Vector2D의 x와 y 동일
   // 따라서 NamedVector 인터페이스를 구현한 객체도
   // calculateLength 함수의 인자로 사용할 수 있음
   interface NamedVector {
      name: string;
      x: number;
      y: number;
   }
   
    let v: NamedVector = { name: 'vec1', x: 3, y: 4 };
    calculateLength(v); // 5
   ```
3. 구조적 타이핑을 사용하면 유닛 테스트를 쉽게 할 수 있음
   - TS는 테스트 DB가 특정 인터페이스를 충족하는지 확인
   - 추상화(DB)를 함으로써, 로직과 테스트를 특정한 구현으로부터 분리 가능
      ```ts
         interface DB {
           runQuery: (sql: string) => any[];
         }
   
         function getAuthors(database: DB): Author[] {
           const authorRows = database.runQuery(`SELECT FIRST, LAST FROM AUTHORS`);
           return authorRows.map((row) => ({ first: row[0], last: row[1] }));
         }
      ```

<br>

## ✏ 아이템 5: any 타입 지양하기
1. any 타입에는 타입 안정성이 없음
   ```ts
   let age: number;
   age = "12" as any; // 정상
   age += 1; // 런타임에 정상, 🚨 age는 '121'
   ```
2. any는 함수 시그니처를 무시 함
   ```ts
   function calculateAge(birthDate: Date): number {
    // ...
   }
       
   let birthDate: any = "1592-05-11";
   calculateAge(birthDate); // 정상 (🚨 추후 에러 발생 가능)
   ```
3. any 타입에는 언어 서비스가 적용되지 않음
   - IDE의 자동완성 기능과 적절한 도움말 제공 불가
4. any 타입은 코드 리팩터링 때 버그를 감춤
   - any가 아닌 구체적인 타입을 사용하여 타입 체커가 오류를 발견하도록 해야 함
5. any는 타입 설계를 감춤
   - 애플리케이션 상태 등의 객체 설계 시 any 사용을 지양
6. any는 타입시스템의 신뢰도를 떨어뜨림
   - 사람은 항상 실수를 함
   - any 타입을 쓰지 않으면 런타임에 발견될 오류를 미리 잡을 수 있고 신뢰도를 높일 수 있음

<br>

## 참고
- [이펙티브 타입스크립트 Study](https://github.com/pagers-org/Effective-TypeScript)
- [이펙티브 타입스크립트 책](http://www.yes24.com/Product/Goods/102124327)
- [구조적 타이핑](https://yozm.wishket.com/magazine/detail/1661/)

```toc
```
