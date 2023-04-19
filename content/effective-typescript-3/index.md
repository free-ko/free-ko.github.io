---
emoji: 👋
title: 'Effective TypeScript 3장'
date: '2023-04-19 16:54:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## ✏️ 아이템 19: 추론 가능한 타입을 사용해 장황한 코드 방지하기
1. 코드의 모든 변수에 타입을 선언하는 것은 비 생산적
2. 객체는 비구조화 할당문 사용 지향
    - 모든 지역 변수의 타입이 추론되도록 해야 함
   ```ts
      function logProduct(product: Product) {
          const { id, name, price } = product;
          console.log(id, name, price);
      }
   ```
3. 타입 구문을 생략하는 경우
   - 함수 내에서 생성된 지역 변수
   - 함수 파라미터에 기본 값이 있는 경우
4. 타입을 명시하면 좋은 경우
   - 객체 리터럴을 정의할 때, 잉여 속성 체크가 동작 함
   - 함수의 반환 타입
      - 함수의 입출력 타입에 대해 더욱 명확하게 알 수 있음
      - 명명된 타입을 사용할 수 있음
      ```ts
          interface Vector2D {
              x: number;
              y: number;
          }
          
          // 이 함수의 반환 타입은 Vector2D 와 호환되지 않음         
          function add(a: Vector2D, b: Vector2D) {
              return { x: a.x + b.x, y: a.y + b.y };
          }
      ```
5. cf) eslint 규칙 중 `no-inferrable-types` 사용 가능
   - 작성된 모든 타입 구문이 정말로 필요한지 확인

<br>

## ✏️ 아이템 20: 다른 타입에는 다른 변수 사용하기
1. 변수의 값은 바뀔 수 있지만, 그 타입은 바뀌지 않음
2. 타입 확장하기 - 유니온 타입
```ts
    let id: string | number = "12-34-56";

    // 개선 - let 대신 const 사용
    const newId = "12-34-56";
    const serial = 123456;
```

<br>

## ✏️ 아이템 21: 타입 넓히기
1. TS가 작성된 코드를 체크하는 정적 분석 시점에, 변수는 `가능한` 값들의 집합인 타입을 가짐
2. TS의 `넓히기`
   - 지정된 단일 값을 가지고 할당 가능한 값들의 집합을 유추하는 것
   ```ts
      // 변수 x는 할당 시점에 넓히기가 동작해서 string으로 추론 됨
      // const 사용 지향
      let x = "x";
   ```
3. 넓히기를 제어하는 방법
    - `const`로 변수 선언
    - 객체에서 TS의 넓히기 알고리즘은 각 요소를 let으로 할당된 것처럼 다룸
   ```ts
      const v = { x: 1 };
    
      v.x = 3; // 정상
      v.x = "3"; // 🚨 '3' 형식은 'number' 형식에 할당할 수 없음
      v.y = 4; // 🚨 '{ x: number; }' 형식에 'y' 속성이 없음
      v.name = "Kay"; // 🚨 '{ x: number; }' 형식에 'name' 속성이 없음
   ```
4. TS의 기본 동작 재 정의
    - 명시적 타입 구문 제공
   ```ts
        const v: { x: 1 | 3 | 5 } = {
          x: 1,
        }; // 타입이 { x: 1 | 3 | 5; }
   ```
5. 타입 체커에 추가적인 문맥 제공 ex) 함수의 매개변수로 값을 전달
6. `const` 단언문 사용하기 (`as const`)
```ts
   const v1 = {
       x: 1,
       y: 2,
   } // 타입은 { x: number, y: number; }
   
   const v2 = {
       x: 1 as const;
       y: 2,
   }; // 타입은 { x: 1, y: number; }
   
   const v3 = {
       x: 1,
       y: 2,
   } as const; // 타입은 { readonly x: 1; readonly y: 2; }
```

<br>

## ✏️ 아이템 22: 타입 좁히기
1. 분기문에서 예외를 던지거나, 함수를 반환하여 블록의 나머지 부분에서 변수의 타입 좁히기
2. `instanceof` 으로 타입 좁히기
3. 속성 체크로 타입 좁히기
```ts
   interface A {
     a: number;
   }
   
   interface B {
     b: number;
   }
   
   function pickAB(ab: A | B) {
     if ("a" in ab) {
       ab; // 타입이 A
     } else {
       ab; // 타입이 B
     }
     ab; // 타입이 a | B
   }
```
4. `Array.isArray` 등의 내장 함수로 타입 좁히기
5. null 체크 시 `typeof null === 'object'`가 됨
6. 명시적 ‘태그’ 붙이기 (tagged union)
```ts
   function handleEvent(e: AppEvent) {
     switch (e.type) {
       case "download":
         e;
         break;
       case "upload":
         e;
         break;
     }
   }
```
7. TS를 돕기 위해 커스텀 함수 도입(사용자 정의 타입 가드)
```ts
   function isInputElement(el: HTMLElement): el is HTMLInputElement {
     return "value" in el;
   }
```
8. 배열에서 `undefined` 걸러내기
```ts
   function isDefined<T>(x: T | undefined): x is T {
     return x !== undefined;
   }
   
   const members = ["Janet", "Michael"]
     .map((who) => jackson5.find((n) => n === who))
     .filter(isDefined); // 타입이 string[]
```

<br>

## ✏️ 아이템 23: 한꺼번에 객체 생성하기
1. TS의 타입은 일반적으로 변경되지 않음. 따라서 객체를 생성할 때는 속성을 하나씩 추가하기보다는 여러 속성을 포함해서 한꺼번에 생성해야 타입 추론에 유리
2. 객체를 제 각각 나눠야 한다면, 타입 단언문(as)을 사용
```ts
   interface Point {
     x: number;
     y: number;
   }
   
   const pt = {} as Point;
   pt.x = 3;
   pt.y = 4; // 정상
```
   - 객체 전개 연산자(...) 사용
3. 선택적 필드 방식으로 표현
```ts
   function addOptional<T extends object, U extends object>(
     a: T,
     b: U | null
   ): T & Partial<U> {
     return { ...a, ...b };
   }
   
   const nameTitle = { name: "Kay", title: "Dev" };
   
   const ko = addOptional(
     nameTitle,
     hasDates ? { start: -1589, end: -1566 } : null
   );
```

<br>

## ✏️ 아이템 24: 일관성 있는 별칭 사용하기
1. 별칭을 남발하면 제어 흐름을 분석하기 어려움
2. 객체의 속성을 별칭에 할당하면 `strictNullChecks`에서 걸릴 위험이 있음
```ts
   interface Polygon {
     exterior: Coordinate[];
     holes: Coordinate[][];
     bbox?: BoundingBox;
   }
   
   // 속성 체크는 polygon.bbox의 타입을 정제했지만 box는 그렇지 않음
   function isPointInPolygon(polygon: Polygon, pt: Coordinate) {
     polygon.bbox; // 타입이 BoundingBox | undefined
     const box = polygon.bbox;
     box; // 타입이 BoundingBox | undefined
     if (polygon.bbox) {
       polygon.bbox; // 타입이 BoundingBox
       box; // 타입이 BoundingBox | undefined
     }
   }
   
   // 객체 비 구조화 할당 이용
   function isPointInPolygon(polygon: Polygon, pt: Coordinate) {
      const { bbox } = polygon;
      if (bbox) {
         const { x, y } = bbox;
         // ...
      }
   }

   // 객체 비구조화 이용 시 주의사항
   // - 전체 bbox 속성이 아니라 x와 y가 선택적 속성일 경우 속성 체크가 더 필요 함
   // - bbox에는 선택적 속성이 적합했지만 holes에는 그렇지 않음
   // - 런타임에도 혼동을 야기할 가능성
   // - 속성보다 지역 변수 사용 
```

<br>

## ✏️ 아이템 25: 비동기 코드에는 콜백 대신 async 함수 사용하기
1. 과거 JS의 비동기 콜백 지옥 발생
   - ES2015는 Promise 개념을 도입
   - ES2017에서는 `async/await` 도입\
   - TS 런타임에 관계없이 `async/await` 사용 가능
   - TS의 프로미스 반환 타입은 `Promise<Response>`
2. 일반적으로 프로미스보다는 `async/await`을 권장
   - 더 간결하고 직관적
   - `async` 함수는 항상 프로미스를 반환하도록 강제 됨
   ```ts
      // function getNumber(): Promise<number>
      async function getNumber() {
          return 42;
      }
   ```
3. 콜백이나 프로미스를 사용하면 실수로 반(half)동기 코드를 작성할 수 있지만, `async`를 사용하면 항상 비동기 코드를 작성할 수 있음
```ts
   const _cache: { [url: string]: string } = {};
   async function fetchWithCache(url: string) {
     if (url in _cache) {
       return _cache[url];
     }
     const response = await fetch(url);
     const text = await response.text();
     _cache[url] = text;
     return text;
   }
   
   let requestStatus: "loading" | "success" | "error";
   async function getUser(userId: string) {
     requestStatus = "loading";
     const profile = await fetchWithCache(`/user/${userId}`);
     requestStatus = "success";
   }
```
4. `async` 함수에서 프로미스를 반환하면 반환 타입은 `Promise<Promise<T>>`가 아닌 `Promise<T>`가 됨
```ts
   // function getJSON(url: string): Promise<any>
   async function getJSON(url: string) {
     const response = await fetch(url);
     const jsonPromise = response.json(); // 타입이 Promise<any>
     return jsonPromise;
   }
```

<br>

## ✏️ 아이템 26: 타입 추론에 문맥이 어떻게 사용되는지 이해하기
1. 문자열 타입을 문자열 리터럴 타입의 유니온으로 사용하는 경우
```ts
   type Language = "JavaScript" | "TypeScript" | "Python";
   function setLanguage(language: Language) {
     /* ... */
   }
   
   setLanguage("JavaScript"); // 정상
   
   let language = "JavaScript";
   setLanguage(language); // 🚨 에러 language는 string type
```
   - 해결 방법
     - 타입 선언에서 language의 가능한 값을 제한
     ```ts
        let language: Language = "JavaScript";
         setLanguage(language); // 정상
     ```
     - const를 사용하여 타입 체커에게 변경할 수 없다고 할 수 있음
2. 튜플 사용 시 주의점
    - 위와 마찬가지로 값을 분리 당함
    ```ts
        function panTo(where: [number, number]) {
          /* ... */
        }
    
        panTo([10, 20]); // 정상
    
        const loc = [10, 20];
   
        // 🚨 'number[]' 형식의 인수는 '[number, number]' 형식의 매개변수에 할당될 수 없음
        panTo(loc);
    ```
    - 해결 방법
      - 타입 선언 제공
        ```ts
           const loc: [number, number] = [10, 20];
           panTo(loc); // 정상
        ```
      - 상수 문맥 제공
        ```ts
           const loc = [10, 20] as const;
      
           // 🚨 에러: 'readonly [10, 20]' 형식은 '[number, number]'에 할당할 수 없음
           panTo(loc);
        ```
      - 최선의 해결책
      ```ts
          function panTo(where: readonly [number, number]) {
              /* ... */
          }
    
          const loc = [10, 20] as const;
          panTo(loc); // 정상
      ```
3. 객체 사용 시 주의점
    - 문자열 리터럴이나 튜플을 포함하는 큰 객체에서 상수를 뽑아낼 때, 프로퍼티 타입이 string으로 추론되는 경우 타입 단언이나 상수 단언을 사용할 수 있음
4. 콜백 사용 시 주의점
    - 콜백을 다른 함수로 전달할 때, TS는 콜백의 매개변수 타입을 추론하기 위해 문맥을 사용. 이 경우 넘겨주는 함수의 매개변수에 타입 구문을 추가해서 해결할 수 있음.

<br>

## ✏️ 아이템 27: 함수형 기법과 라이브러리로 타입 흐름 유지하기
1. 함수형 프로그래밍을 지원하는 최근의 라이브러리
    - ex) map, flatMap, filter, reduce 등
    - 타입 정보가 그대로 유지되면서 타입 흐름(flow)이 계속 전달 됨
2. lodash의 Dictionary 타입
```ts
    // 타입이 _.Dictionary<string>[]
    const rows = rawRows
      .slice(1)
      .map((rowStr) => _.zipObject(headers, rowStr.split(",")));
```
    - `Dictionary<string>`은 `{[key: string]: string}` 또는 `Record<string, string>`과 동일
3. flat 메서드
    - `T[][] => T[]`
   ```ts
      declare const rosters: { [team: string]: BasketBallPlayer[] };

      // 타입이 BasketBallPlayer[]   
      const allPlayers = Object.values(rosters).flat();
   ```
4. TS의 많은 부분이 JS 라이브러리의 동작을 정확히 모델링하기 위해서 개발되었으므로, 라이브러리 사용 시 타입 정보가 잘 유지되는 점을 활용

<br>

## 참고
- [이펙티브 타입스크립트 Study](https://github.com/pagers-org/Effective-TypeScript)
- [이펙티브 타입스크립트 책](http://www.yes24.com/Product/Goods/102124327)

```toc