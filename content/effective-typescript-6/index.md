---
emoji: 👋
title: 'Effective TypeScript 6장'
date: '2023-05-29 13:30:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## 아이템 45: devDependencies에 TS와 @types 추가하기

1. npm의 의존성 구분

   - dependencies: 현재 프로젝트 실행 시 필수적인 라이브러리
   - devDependencies: 런타임에는 필요없는 라이브러리
   - peerDependencies: 런타임에 필요하긴 하지만, 의존성을 직접 관리하지 않는 라이브러리

2. TS는 개발 도구일 뿐이고 타입 정보는 런타임에 존재하지 않기 때문에, TS와 관련된 라이브러리는 일반적으로 devDependencies에 속함
3. TS 프로젝트에서 고려해야 할 의존성

   - TS 시스템 레벨로 설치하기보다는 devDependencies에 넣는 것을 권장
     → npm install 시 팀원들 모두 항상 정확한 버전의 TS 설치 가능
   - 대부분의 TS IDE와 빌드 도구는 devDependencies를 통해 설치된 타입스크립트의 버전을 인식할 수 있음
   - DefinitelyTyped에서 라이브러리에 대한 타입 정보를 얻을 수 있음
   - @types 라이브러리는 타입 정보만 포함하고 있으며 구현체는 포함하지 않음
   - 원본 라이브러리 자체가 dependencies에 있더라도 @types 의존성은 devDependencies에 있어야 함

<br>

## 아이템 46: 타입 선언과 관련된 3가지 버전 이해하기

1.  TS 사용 시 고려해야 할 사항

    - 라이브러리의 버전
    - 타입 선언(@types)의 버전
    - 타입스크립트의 버전

2.  타입스크립트에서 의존성을 사용하는 방식

    - 특정 라이브러리는 dependencies로, 타입 정보는 devDependencies로 설치

3.  실제 라이브러리와 타입 정보의 버전이 별도로 관리되는 방식의 문제점

    ```md
    1.  라이브러리를 업데이트했지만 실수로 타입 선언은 업데이트하지 않은 경우

        - 타입 선언도 업데이트하여 라이브러리와 버전을 맞춤
        - 보강 기법 또는 타입 선언의 업데이트를 직접 작성

    2.  라이브러리보다 타입 선언의 버전이 최신인 경우

        - 라이브러리 버전을 올리거나 타입 선언의 버전을 내리기

    3.  프로젝트에서 사용하는 타입스크립트 버전보다 라이브러리에서 필요로 하는 타입스크립트 버전이 최신인 경우

        - 타입스크립트의 최신 버전을 사용
        - 라이브러리 타입 선언의 버전을 내리거나, declare module 선언으로 라이브러리의 타입 정보를 없애 버림

    4.  @types 의존성이 중복되는 경우

        a. ex) @types/bar가 현재 호환되지 않는 버전의 @types/foo에 의존하는 경우

        - 전역 네임스페이스에 있는 타입 선언 모듈인 경우 중복 문제가 발생
          → 서로 버전이 호환되도록 업데이트

        b. 일부 라이브러리는 자체적으로 타입 선언을 포함(번들링)

        - package.json 의 types 필드가 .d.ts 파일을 가리키도록 되어 있음
        - 버전 불일치 문제를 해결할 수 있지만, 네 가지 부수적인 문제점이 있음
          - 번들된 타입 선언에 보강 기법으로 해결할 수 없는 오류가 있는 경우, 또는 공개 시점에는 잘 동작했지만 타입스크립트 버전이 올라가면서 오류가 발생하는 경우(번들된 타입에서는 @types의 버전 선택 불가능)
          - 프로젝트 내의 타입 선언이 다른 라이브러리의 타입 선언에 의존하는 경우(devDependencies에 들어간 의존성을 다른 사용자는 설치할 수 없기 때문)
            → DefinitelyTyped에 타입 선언을 공개하여 타입 선언을 @types로 분리
          - 프로젝트의 과거 버전에 있는 타입 선언에 문제가 있는 경우
            → 과거 버전으로 돌아가서 패치 업데이트를 함
          - 타입 선언의 패치 업데이트를 자주 하기 어렵다는 문제
    ```

4.  잘 작성된 타입 선언은 라이브러리를 올바르게 사용하는 방법에 도움이 되며 생산성을 크게 향상시킴

5.  라이브러리 공개 시, 타입 선언을 자체적으로 포함하는 것과 타입 정보만 분리하여 DefinitelyTyped에 공개하는 것의 장단점을 비교 해야 함

6.  라이브러리가 타입스크립트로 작성된 경우만 타입 선언을 라이브러리에 포함하는 것을 권장

<br>

## 아이템 47: 공개 API에 등장하는 모든 타입을 익스포트하기

1.  라이브러리 제작자는 프로젝트 초기에 타입 익스포트부터 작성해야 함

    - 타입을 익스포트하지 않았을 경우

           ```ts
           // 해당 라이브러리 사용자는 SecretName 또는 SecretSanta 를 직접 임포트할 수 없고, getGift만 임포트할 수 있음

           interface SecretName {
             first: string;
             last: string;
           }

           interface SecretSanta {
             name: SecretName;
             gift: string;
           }

           export function getGift(name: SecretName, gift: string): SecretSanta {
             // ...
           }
           ```

    - Parameters와 ReturnType을 이용해 추출

          ```ts
          type MySanta = ReturnType<typeof getGift>; // SecretSanta
          type MyName = Parameters<typeof getGift>[0]; // SecretName
          ```

      → 사용자가 추출하기 전에 공개 메서드에 사용된 타입은 익스포트 지향

<br>

## 아이템 48: API 주석에 TSDoc 사용하기

1.  함수 주석에 `// ...` 대신 JSDoc 스타일의 `/** ... **/` 을 사용하면 대부분의 편집기는 함수 사용부에서 주석을 툴팁으로 표시해 줌
2.  타입스크립트 관점의 TSDoc

    ```ts
    /**
     * Generate a greeting
     * @param name Name of the person to greet
     * @param title ...
     * returns ...
     */
    function greetFullTSDoc(name: string, title: string) {
      return `Hello ${title} ${name}`;
    }
    ```

3.  타입 정의에 TSDoc 사용하기

    ```ts
    /** 특정 시간과 장소에서 수행된 측정 */
    interface Measurement {
      /** 어디에서 측정되었나? */
      position: Vector3D;

      /** 언제 측정되었나? */
      time: number;

      /** 측정된 운동량 */
      momentum: Vector3D;
    }

    // Measurement 객체의 각 필드에 마우스를 올려 보면 필드별로 설명을 볼 수 있음
    ```

4.  타입스크립트에서는 타입 정보가 코드에 있기 때문에 TSDoc에서는 타입 정보를 명시하면 안 됨(주의)

<br>

## 아이템 49: 콜백에서 this에 대한 타입 제공하기

1. JS에서 this는 다이나믹 스코프

- ‘정의된’ 방식이 아니라 ‘호출된’ 방식에 따라 달라짐

2.  TS는 JS의 this 바인딩을 그대로 모델링 함
3.  this를 사용하는 콜백 함수에서 this 바인딩 문제 해결

    - 콜백 함수의 매개변수에 this를 추가하고, 콜백 함수를 call로 호출하는 방법

      ```ts
      // 이때 반드시 call 을 사용해야 함
      function addKeyListener(el: HTMLElement, fn: (this: HTMLElement, e: KeyboardEvent) => void) {
        el.addEventListener('keydown', (e) => {
          fn.call(el, e);
        });
      }
      ```

    - 만약 라이브러리 사용자가 콜백을 화살표 함수로 작성하고 this를 참조하려고 하면 TS가 문제를 잡아 냄

      ```ts
      class Foo {
        registerHandler(el: HTMLElement) {
          addKeyListener(el, (e) => {
            this.innerHTML; // 'Foo' 유형에 'innerHTML' 속성이 없음
          });
        }
      }
      ```

4.  콜백 함수에서 this 값을 사용해야 한다면, this는 API의 일부가 되는 것이기 때문에 반드시 타입 선언에 포함해야 함

<br>

### 참고

- [이펙티브 타입스크립트 Study](https://github.com/pagers-org/Effective-TypeScript)
- [이펙티브 타입스크립트 책](http://www.yes24.com/Product/Goods/102124327)

```toc

```
