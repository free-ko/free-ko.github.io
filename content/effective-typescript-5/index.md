---
emoji: 👋
title: 'Effective TypeScript 5장'
date: '2023-05-15 16:48:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## 아이템 38: any 타입은 가능한 한 좁은 범위에서만 사용하기

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

## 아이템 39: any를 구체적으로 변형해서 사용하기

1. 일반적인 상황에서는 any보다 더 구체적으로 표현할 수 있는 타입이 존재할 가능성이 높음

   ```ts
   function getLengthBad(array: any) {
     // X
     return array.length;
   }

   function getLength(array: any[]) {
     return array.length;
   }
   ```

2. 함수 매개변수로 객체 사용 시 타입 구체화

   ```ts
   function hasTwelveLetterKey(o: { [key: string]: any }) {
     for (const key in o) {
       if (key.length === 12) {
         return true;
       }
     }
     return false;
   }
   ```

3. 함수 타입 구체화

   ```ts
   type Fn0 = () => string; // 매개변수 없이 호출 가능한 모든 함수
   type Fn1 = (arg: string[]) => string[]; // 매개변수 1개
   type FnN = (...args: string[]) => string[]; // 모든 개수의 매개변수 ("Function" 타입과 동일)
   ```

<br>

## 아이템 40: 함수 안으로 타입 단언문 감추기

1. 함수 내부에는 타입 단언 사용하고, 함수 외부로 드러나는 타입은 정의를 정확히 명시하는 것이 좋음

- 어떤 함수든 캐싱할 수 있는 래퍼 함수 `cacheWrapper`

  ```ts
  declare function cacheWrapper<T extends Function>(fn: T): T;
  declare function shallowEqual(a: any, b: any): boolean;

  // TS는 반환문에 있는 함수와 원본 함수 T 타입이 어떤 관련이 있는지 알지 못하기 때문에 오류 발생
  function cacheWrapper<T extends Function>(fn: T): T {
    let lastArgs: any[] | null = null;
    let lastResult: any;

    return function (...args: any[]) {
      // 🚨 '(...args: any[]) => any' 형식은 'T' 형식에 할당할 수 없습니다.
      if (!lastArgs || !shallowEqual(lastArgs, args)) {
        lastResult = fn(...args);
        lastArgs = args;
      }
      return lastResult;
    };
  }
  ```

- 단언문을 추가해서 오류를 제거

  ```ts
  function cacheWrapper<T extends Function>(fn: T): T {
    let lastArgs: any[] | null = null;
    let lastResult: any;

    return (function (...args: any[]) {
      if (!lastArgs || !shallowEqual(lastArgs, args)) {
        lastResult = fn(...args);
        lastArgs = args;
      }
      return lastResult;
    } as unknown) as T;
  }
  ```

- 객체를 매개변수로 하는 shallowObjectEqual

  ```ts
  declare function shallowObjectEqual<T extends object>(a: T, b: T): boolean;

  function shallowObjectEqual<T extends object>(a: T, b: T): boolean {
    for (const [(k, value)] of Object.entries(a)) {
      if (!(k in b) || value !== (b as any)[k]) {
        // b[k] 구문에 타입 단언 필요
        return false;
      }
    }
    return Object.keys(a).length === Object.keys(b).length;
  }
  ```

<br>

## 아이템 41: Any 타입의 변환

1. 예제 코드

   ```ts
   // out의 타입은 any[]로 선언되었지만,
   // number 타입의 값을 넣는 순간부터 타입은 number[]로 변환
   function range(start: number, limit: number) {
     const out = []; // 타입이 any[]

     for (let i = start; i < limit; i++) {
       out.push(i); // out의 타입이 any[]
     }

     return out; // 타입이 number[]
   }
   ```

2. 타입의 전환

- 배열에 다양한 타입의 요소를 넣으면 배열의 타입이 변환됨

  ```ts
  const result = []; // 타입 any[]
  result.push('a'); // 타입 string[]

  result.push(1);
  result; // 타입 (string | number)[]
  ```

3. 기타

- 조건문에서는 분기에 따라 타입이 변환
- 변수의 초깃값이 null인 경우도 any의 변환 발생

4. any 타입의 변환은 noImplicitAny가 설정된 상태에서 변수의 타입이 암시적 any인 경우에만 발생한며, 명시적 any 선언 시 타입이 그대로 유지됨
5. any 타입의 변환은 암시적 any 타입에 어떤 값을 할당할 때만 발생하며, 암시적 any 타입은 함수 호출을 거쳐도 변환되지 않음
6. 타입을 안전하게 지키기 위해서는 암시적 any를 진화시키는 방식보다, 명시적 타입 구문을 사용하는 것이 좋음

<br>

## 아이템 42: 모르는 타입에는 any 대신 unknown을 사용하기

1. 함수의 반환값에 unknown 사용

   ```ts
   function parseYAML(yaml: string): any {
     // ...
   }

   function safeParseYAML(yaml: string): unknown {
     return parseYAML(yaml);
   }

   const book = safeParseYAML(`
     name: Villette
     author: Charlotte Bronte
   `) as Book;

   alert(book.title); // 🚨 'Book' 형식에 'title' 속성이 없습니다.
   book('read'); // 🚨 이 식은 호출할 수 없습니다.
   ```

2. any가 강력하면서도 위험한 이유

- 어떠한 타입이든 any 타입에 할당 가능
- 어떠한 타입이든 unknown 타입에 할당 가능
- 어떠한 타입도 never에 할당할 수 업음
- any 타입은 어떠한 타입으로도 할당 가능
- unknown은 오직 unknown과 any에만 할당 가능
- never 타입은 어떠한 타입으로도 할당 가능
  → 타입 시스템과 상충됨

3. instanceof 체크 후 unknown에서 원하는 타입으로 변환

```ts
function processValue(val: unknown) {
  if (val instanceof Date) {
    val; // 타입이 Date
  }
}
```

4. 사용자 정의 타입 가드로 unknown에서 원하는 타입으로 변환

```ts
function isBook(val: unknown): val is Book {
  return typeof val === 'object' && val !== null && 'name' in val && 'author' in val;
}

function processValue(val: unknown) {
  if (isBook(val)) {
    val; // 타입이 Book
  }
}
```

5. unknown 대신 제네릭 매개변수 사용

   ```ts
   //  타입 단언문과 똑같음
   // 제네릭보다는 unknown을 반환하고, 사용자가 직접 단언문을 사용하거나 원하는 대로 타입을 좁히도록 강제하는 것이 좋음
   function safeParseYAML<T>(yaml: string): T {
     return parseYAML(yaml);
   }
   ```

6. 단언문

   ```ts
   declare const foo: Foo;

   let barAny = (foo as any) as Bar;
   let barUnk = (foo as unknown) as Bar;
   ```

   - unknown의 경우 분리되는 즉시 오류를 발생하므로 any보다 안전(에러가 전파되지 않음)

7. 정말 null과 undefined가 불가능하다면 unknown 대신 {} 사용

<br>

## 아이템 43: 몽키 패치보다는 안전한 타입을 사용하기

1. JS는 객체나 클래스에 임의의 속성을 추가할 수 있음

   ```ts
   window.monkey = 'Tamarin';
   document.monkey = 'Howler';

   // 'Document' 유형에 'monkey' 속성이 없습니다
   document.monkey = 'Tamarin';

   // 해결
   // 단 타입 안정성을 해치는 안 좋은 코드
   (document as any).monkey = 'Tamarin'; // 정상
   ```

   - 일반적으로 좋은 설계는 아님(전역 변수 사이드 이펙트의 문제)

2. interface 의 보강(augmentation)

   - 보강은 전역적으로 적용되기 때문에, 코드의 다른 부분이나 라이브러리로부터 분리할 수 없음

     ```ts
     interface Document {
       monkey: string;
     }

     document.monkey = 'Tamarin'; // 정상

     // 모듈 관점에서라면 global 선언 추가
     export {};
     declare global {
       interface Document {
         monkey: string;
       }
     }

     document.monkey = 'Tamarin'; // 정상
     ```

3. 더 구체적인 타입 단언문 사용

   ```ts
   interface MonkeyDocument extends Document {
     monkey: string;
   }

   (document as MonkeyDocument).monkey = 'Macaque'; // 정상
   ```

<br>

## 아이템 44: 타입 커버리지를 추적하여 타입 안전성 유지하기

1. `any` 타입이 여전히 프로그램 내에 존재할 수 있는 2가지 경우

- 명시적 any 타입 ex) `any[], {[key: string]: any}`
- 서드파티 타입 선언

  - @types 선언 파일로부터 any 타입이 전파되는 경우
  - 가장 극단적인 예시는 전체 모듈에 any 타입을 부여하는 경우

        ```ts
        // my-module 에서 어떤 것이든 오류 없이 임포트할 수 있음
        declare module 'my-module';
        ```

  - 타입에 버그가 있는 경우 : 선언된 타입과 실제 반환된 타입이 맞지 않는 경우

2. npm의 type-coverage 패키지 활용하여 any 추적하기

<br>

### 참고

- [이펙티브 타입스크립트 Study](https://github.com/pagers-org/Effective-TypeScript)
- [이펙티브 타입스크립트 책](http://www.yes24.com/Product/Goods/102124327)

```toc

```
