---
emoji: 👋
title: 'Effective TypeScript 7장'
date: '2023-06-25 18:30:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## 아이템 53: TS 기능보다는 ECMAScript 기능을 사용하기

1. JS에 새로 추가된 기능은 TS의 초기 기능과 호환성 문제를 발생

   - JS의 신규 기능을 그대로 채택하고 TS 초기 버전과 호환성을 포기 그러나 이미 사용되고 있던 몇 가지 기능(호환성 문제로 지양하는 방식) 있음

2. 열거형(enum)

   - 몇몇 값의 모음을 나타내는 방식
   - 문제점
     - 숫자 열거형에 0, 1, 2 외의 다른 숫자가 할당되면 매우 위험
     - 상수 열거형(const enum)은 런타임에 완전히 제거되어, 문자열 열거형에서 문제를 일으킴
     - preserveConstEnums 플래그를 설정한 상수 열거형은 런타임 코드에 정보를 유지함
     - 문자열 열거형은 구조적 타이핑이 아닌 명목적 타이핑을 사용함
   - 문자열 열거형의 명목적 타이핑은 JS와 동작이 다르다는 문제가 있음

     ```ts
     enum Flavor {
       VANILLA = 'vanilla',
       CHOCOLATE = 'chocolate',
       STRAWBERRY = 'strawberry',
     }

     let flavor = Flavor.CHOCOLATE; // 타입이 Flavor
     flavor = 'strawberry'; // 🚨 'strawberry' 형식은 'Flavor' 형식에 할당할 수 없습니다

     // 열거형 대신 리터럴 타입의 유니온 사용을 권장
     type Flavor = 'vanilla' | 'chocolate' | 'strawberry';
     ```

3. 매개변수 속성

   - 생성자의 매개변수를 사용하여 클래스 초기화 시 TS는 간결한 문법을 제공

     ```ts
     class Person {
       constructor(public name: string) {}
     }
     ```

     - 문제점
       - 실제로는 코드가 늘어남
       - 매개변수 속성은 런타임에는 실제로 사용되지만, TS에서는 사용되지 않는 것처럼 보임
       - 매개변수 속성과 일반 속성을 섞어서 사용하면 클래스의 설계가 혼란스러워 짐

4. 네임스페이스와 트리플 슬래시 임포트

```ts
// ES2015 스타일의 모듈(import와 export) 사용을 권장

namespace foo {
  function bar() {}
}

/// <reference path="other.ts" />
foo.bar();
```

5. 데코레이터
   - 클래스, 메서드, 속성에 annotation을 붙이거나 기능을 추가하는 것
   - 문제점
     - 표준화가 완료되지 않았기 때문에 비표준으로 바뀌거나 호환성이 깨질 가능성이 있음

<br>

### 참고

- [이펙티브 타입스크립트 Study](https://github.com/pagers-org/Effective-TypeScript)
- [이펙티브 타입스크립트 책](http://www.yes24.com/Product/Goods/102124327)

```toc

```
