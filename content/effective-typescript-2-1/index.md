---
emoji: 👋
title: 'Effective TypeScript 2장-1'
date: '2023-04-17 14:24:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## ✏️ 아이템 6: 편집기를 사용하여 타입 시스템 탐색하기
1. TS에서 실행할 수 있는 프로그램
   - TS 컴파일러(tsc)
   - 단독 실행 가능한 TS 서버(tsserver)
2. TS 서버에서 제공하는 언어 서비스를 사용 권장
3. 많은 편집기에서 TS가 그 타입을 어떻게 판단하는지 확인 가능
4. 편집기 타입 오류를 살펴보는 것도 타입 시스템을 파악하는 데 좋은 방법
5. 라이브러리와 라이브러리의 타입 선언
   - Go to Definition 옵션으로 `d.ts`에서 타입 정의 확인 가능


<br>

## ✏️ 아이템 7: 타입이 값들의 집합이라고 생각하기
1. 런타임시 모든 변수는 JS로 정해진 고유한 값 존재
2. 코드가 실행되기 전 TS가 오류를 체크하는 순간에는 타입을 가지고 있으며, 이는 할당 가능한 값들의 집합
3. 집합의 종류
   - `never` : 아무것도 포함하지 않는 공집합(아무 값도 할당 불가) cf) `void`는 undefined 반환
     ```ts 
     // 🚨 '12' 형식은 'never' 형식에 할당할 수 없습니다.
     const x: never = 12;
     ```
   - 리터럴(유닛)타입 : 한 가지 값만 포함하는 타입
      ```ts
     type A = "A"; 
     ```
   - 유니온 타입 : 두 개 혹은 세 개 값 포함하는 집합들의 합집합
      ```ts
     type AB = "A" | "B"; 
     ```
4. '할당 가능'하다는 뜻 -> '부분 집합'
    ```ts
    // 'A'는 집합 {'A', 'B'}의 원소
    const a: AB = "A"; 
    ```
5. 실제 다루게 되는 타입은 대부분 범위가 무한대
    ```ts
    type Int = 1 | 2 | 3 | 4 | 5; // | ...
    ```
6. 원소를 서술하는 방법
    ```ts
    interface Identified {
      id: string;
    }
    ```
7. 타입(값의 집합)
   - `&` 연산자는 두 타입의 인터섹션(교집합)을 계산
   - `|` 연산자는 두 인터페이스의 유니온, 교집합이 없는 두 개 이상의 타입에서 사용 시 주의
       ```ts
         interface Person {
            name: string;
         }
         interface Lifespan {
            birth: Date;
            death?: Date;
         }
    
         type PersonSpan = Person & Lifespan;
         type K = keyof (Person | Lifespan); // 타입이 never
       ```
8. `extends` : ~에 할당 가능한, ~의 부분집합
    - 서브타입 : 어떤 집합이 다른 집합의 부분집합
    ```ts
       interface Vector1D {
           x: number;
       }
   
       // Vector2D는 Vector1D의 서브타입
       interface Vector2D extends Vector1D {
          y: number;
       }
       
       // Vector3D는 Vector2D의 서브타입
       interface Vector3D extends Vector2D {
          z: number;
       }
    ```
9. 제네릭에서 `extends`
```ts
 // K는 집합 관점에서 string을 상속
 // string 리터럴 타입, string 리터럴 타입의 유니온, string 자신을 포함
function getKey<K extends string>(val: string, key: K) {
 // ...
}
```
10. 타입이 집합이라는 관점에서 배열과 튜플의 관계 확인
    ```ts
    // 타입은 number[]
    const list = [1, 2];
    
    // 🚨 'number[]' 타입이 '[number, number]'타입 보다 큰 집합이여서
    // 에러 발생 
    // Target requires 2 element(s) but source may have fewer
    const tuple: [number, number] = list;
    ```
11. 트리플

```ts
const triple: [number, number, number] = [1, 2, 3];

// 🚨 숫자의 length값이 맞지 않기 때문에 할당문에 오류 발생
const doulbe: [number, number] = triple;
```

12. 타입이 값의 집합이라는 뜻은, 동일한 값의 집합을 가지는 두 타입은 같다는 의미

<br>

## ✏️ 아이템 8: 타입 공간과 값 공간의 심벌 구분하기
1. TS 심벌(symbol)은 타입 공간이나 값 공간 중 한 곳에 존재
    
    ```ts
    interface Cylinder {
      radius: number;
      height: number;
    }
    
    const Cylinder = (radius: number, height: number) 
      => ({ radius, height });
    ```
    - interface Cylinder는 타입, const Cylinder는 변수
    - 일반적으로 type이나 interface 다음에 나오는 심벌은 타입, const나 let 선언에 쓰이는 것은 값
2. class와 enum 은 상황에 따라 타입과 값 두 가지 모두 가능
   - 클래스가 타입으로 쓰일 때는 형태(속성과 메서드)가 사용되는 반면, 값으로 쓰일 때는 생성자가 사용됨

    ```ts
    // 타입으로 쓰인 Cylinder 클래스
    class Cylinder {
      radius = 1;
      height = 1;
    }
    
    function calculateVolume(shape: unknown) {
      if (shape instanceof Cylinder) {
        shape; // 정상, 타입은 Cylinder
        shape.radius; // 정상, 타입은 number
      }
    }
    ```
3. `typeof` : 타입에서 쓰일 때와 값에서 쓰일 때가 다름
   - 타입의 관점에서 typeof는 값을 읽어서 TS 타입을 반환
   - 값의 관점에서 typeof는 JS 런타임의 typeof 연산자를 반환(심벌의 런타임 타입을 가리킴)

       ```ts
      // 타입은 Person
       type T1 = typeof p;
   
      // 타입은 (p: Person, subject: string, body: string) => Response
       type T2 = typeof email; 
    
      // 값은 'object'
       const v1 = typeof p; 
   
      // 값은 'function'
       const v2 = typeof email; 
       ```
4. 클래스

    ```ts
   // 타입이 typeof Cylinder
    type T = typeof Cylinder; 

    declare let fn: T;
    const c = new fn(); // 타입이 Cylinder
    ```
    - InstanceType 제너릭을 사용해 생성자 타입과 인스턴스 타입 전환 가능
        ```ts
       type C = InstanceType<typeof Cylinder>; // 타입이 Cylinder
       ```
5. 속성 접근자 []
    - `obj['field']`와 `obj.field`는 값이 동일하더라도 타입은 다를 수 있으므로, 타입의 속성을 얻을 때는 `obj['field']`를 지향


<br>

## ✏️ 아이템 9: 타입 단언보다는 타입 선언을 사용하기
1. 타입 단언은 오류를 발견하지 못 함
    ```ts
   interface Person {
      name: string;
   }
   
   // 🚨 'Person' 유형에 필요한 'name' 속성이 '{}' 유형에 없습니다.
   const kay: Person = {}; 
   const bob = {} as Person; // 오류 없음
    ```
   - 속성을 추가할 때도 마찬가지(타입 선언문에서는 잉여 속성 체크가 동작하지만, 단언문에서는 적용되지 않음)

2. 화살표 함수의 타입 선언
   ```ts
   const people = ["kay", "bob", "jun"].map((name) => ({ name }));
   
   // Person[]을 원했지만 결과는 { name: string; }[]...
   ```
   - 단언문 대신 화살표 함수의 반환 타입을 선언
      ```ts
      // 타입은 Person[]
      const people = ["kay", "bob", "jun"].map((name): Person => ({ name }));
     ```
        - 그러나 함수 호출 체이닝이 연속되는 곳에서는 체이닝 시작에서부터 명명된 타입을 가져야 오류가 정확하게 표시 됨
3. 타입 단언이 꼭 필요한 경우
    - 타입 체커가 추론한 타입보다 개발자가 판단하는 타입이 더 정확할 때
     
    ```ts
    document.querySelector("#myButton").addEventListener("click", (e) => {
    e.currentTarget; // 타입은 EventTarget
       
   // 타입은 HTMLButtonElement
    const button = e.currentTarget as HTMLButtonElement;
    });
    ```
4. `!` 문법을 사용해서 `null`이 아님을 단언하는 경우

    ```ts
    // 타입은 HTMLElement | null
    const elNull = document.getElementById("foo");
   
    // 타입은 HTMLElement 
    const el = document.getElementById("foo")!;
    ```
5. 타입 단언문으로 임의의 타입 간에 변환
    - `A`가 `B`의 부분집합(서브타입)인 경우 사용

<br>

## ✏️ 아이템 10 : 객체 래퍼 타입 피하기
1. JS는 기본형과 객체 타입을 서로 자유롭게 변환 가능(래퍼 객체)
2. string 기본형과 String 래퍼 객체가 항상 동일하게 동작하는 것은 아님
    - String 객체는 오직 자기 자신하고만 동일하다
        ```ts
        "hello" === new String("hello"); // false
        new String("hello") === new String("hello"); // false
       ```
3. TS는 기본형과 객체 래퍼 타입을 별도로 모델링 함
   ```ts
   // 🚨 'String' 형식의 인수는 'string' 형식의 매개변수에 할당될 수 없습니다.
   // 'String'은 Object 임
   function isGreeting(phrase: String) {
     return ["hello", "good day"].includes(phrase);
   }
   ```
   - string은 String에 할당할 수 있지만, String은 string에 할당할 수 없음
   - TS가 제공하는 타입 선언은 전부 기본형 타입

   
<br>

## ✏️ 아이템 11: 잉여 속성 체크의 한계 인지하기
1. 타입이 명시된 변수에 객체 리터럴을 할당할 때 TS는 해당 타입의 속성이 있는지, 그리고 ‘그 외의 속성은 없는지’ 확인

   ```ts
   interface Room {
      numb: number;
      size: number;
   }
   
   const room = {
      numb: 1,
      size: 10,
      bed: 4,
   };
   
   const secondRoom: Room = room; // 정상
   ```
   - room 타입은 Room 타입의 부분 집합을 포함하므로, Room에 할당 가능하며 타입 체커도 통과 함
   - 잉여 속성 체크는 할당 가능 검사와는 별도의 과정

2. TS는 런타임 오류 뿐 아니라, 의도와 다르게 작성된 코드까지 찾음
   ```ts
   interface Options {
      title: string;
      darkMode?: boolean;
   }
   
   function createWindow(options: Options) {
      if (options.darkMode) {
        setDarkMode();
      }
   }
   
   createWindow({
      title: "Spider Solitaire",
      darkmode: true, // 🚨 에러 darkMode 아님?
   });
   ```
      - 런타임에 에러가 발생하지 않지만, TS에서 에러가 발생 함

3. `Options`는 넓은 타입으로 해석 됨

   ```ts
   interface Options {
      title: string;
      darkMode?: boolean;
   }
   
   const o1: Options = document; // 정상
   const o2: Options = new HTMLAnchorElement(); // 정상
   ```
   - `document`와 `HTMLAnchorElement`의 인스턴스 모두 string 타입인 title 속성을 갖고 있기 때문에 할당문 정상

4. 잉여 속성 체크는 객체 리터럴만 체크 함
 
   ```ts
      interface Options {
        title: string;
        darkMode?: boolean;
      }
   
      // 🚨 에러 - darkMode 아님?
      const o1: Options = { darkmode: true, title: "Ski Free" };
      
      const intermediate = { darkmode: true, title: "Ski Free" };
      const o2: Options = intermediate; // 정상
      
      // 타입 단언문을 사용할 때도 적용되지 않는다
      const o3: Options = { darkmode: true, title: "Ski Free" } as Options; // 정상
      ```

<br>

## ✏️ 아이템 12: 함수 표현식에 타입 적용하기
1. TS는 함수 선언문이 아닌 함수 표현식을 권장
   - 함수의 매개변수부터 반환값까지 전체를 함수 타입으로 선언하여 함수 표현식에 재사용할 수 있다는 장점 존재(시그니처)
     ```ts
        type DiceRollFn = (sides: number) => number;
        const rollDice: DiceRollFn = (sides) => { };
     ```
2. 반복되는 함수 시그니처를 하나의 함수로 통합하여 불필요한 코드의 반복을 줄일 수 있음
   - 라이브러리는 공통 함수 시그니처를 타입으로 제공 ex) 리액트 MouseEventHandler
3. 시그니처가 일치하는 다른 함수가 있을 때도 함수 표현식에 타입 적용 가능
   - ex) fetch 함수
   ```ts
    // 타입이 Promise<Response>
    const responsePromise = fetch("/search?by=Kay");
   ```
   - 응답의 데이터를 추출
   ```ts
   async function getSearch() {
      const response = await fetch("/search?by=Kay");
      const data = await response.json();
   
      return data;
   }
   ```
      - 이때 /search가 존재하지 않는 API거나 fetch가 실패하는 경우 버그가 발생 함
      - 상태 체크를 수행해 줄 checkedFetch 함수 작성
      - 함수 선언문을 함수 표현식으로 바꾸고, 함수 전체에 타입을 적용
   
      ```ts
      // lib.dom.d.ts
      declare function fetch(
        input: RequestInfo,
        init?: RequestInit
      ): Promise<Response>

       const checkedFetch: typeof fetch = async (input, init) => {
         const response = await fetch(input, init);

         if (!response.ok) {
          throw new Error("Request failed: " + response.status);
        }
          return response;
       };
    ```

<br>

## 참고
- [이펙티브 타입스크립트 Study](https://github.com/pagers-org/Effective-TypeScript)
- [이펙티브 타입스크립트 책](http://www.yes24.com/Product/Goods/102124327)
- [타입을 집합의 관점에서 바라보기](https://yozm.wishket.com/magazine/detail/1661/)
- [타입을 집합으로 생각하기](https://velog.io/@dltlsgh5/typescript%ED%83%80%EC%9E%85%EC%9D%84-%EC%A7%91%ED%95%A9%EC%9C%BC%EB%A1%9C-%EC%83%9D%EA%B0%81%ED%95%98%EA%B8%B0)

```toc