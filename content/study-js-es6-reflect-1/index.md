---
emoji: 👨‍💻
title: Reflect 오브젝트, Proxy 사용
date: '2021-12-05 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 Reflect 오브젝트, Proxy 사용
</h1>

<br>

## 1. Reflect

- 빌트인 오브젝트
- `constructor` 가 없으므로 인스턴스를 생성 할 수 없음
- `reflect.get()` 형태로 호출

  ```tsx
  const target = { point: 100 };

  console.log(target.point); // 100
  console.log(Reflect.get(target, 'point')); // 100

  // 1. Reflect.get(target, "point") target에서 point 프로퍼티 값을 구함, target에 대상 오브젝트를 작성하고 "point"에 프로퍼티 키를 작성함
  // 2. [[Get]]("point", receiver) 형태로 target의 [[Get]]을 실행함
  // 3. 100을 반환
  // 4. 값을 구하는 것은 target.point와 같지만 Reflect.get()은 부가 기능이 있음
  ```

- 에러 대응 형태

  - `tray-catch` 로 에러 대응

    ```tsx
    const target = {};
    Object.defineProperty(target, 'point', {
      value: 100,
      writable: false,
    });

    try {
      Object.defineProperty(target, 'point', { value: 200 });
    } catch {
      console.log('에러 발생');
    }

    // 1. {value: 100, writable: false}, {writable: false}이므로 value 속성 값을 바꿀 수 없음
    // 2. try-catch에서 value: 200, value 속성 값을 바꾸면 에러가 발생함 그래서 try-catch문을 사용함
    ```

  - `true`, `false`를 반환

    ```tsx
    const target = {};
    Object.defineProperty(target, 'point', {
      value: 100,
      writable: false,
    });

    const check = Reflect.defineProperty(target, 'point', { value: 200 });

    console.log(check);

    // 1. {value: 100, writable: false}, {writable: false}이므로 value 속성 값을 바꿀 수 없음
    // 2. Reflect 오브젝트 사용, value: 200, value 속성 값을 바꾸면 에러가 발생함
    // 3. 이때, 프로그램이 중단되지 않고 처리 실패를 뜻하는 false를 반환, 성공이면 true를 반환함
    // 4. console.log(check); false가 출력됨
    ```

<br>

## 2. Proy 사용

- `Reflect` 오브젝트의 함수는 `Proxy` 트랩에 1:1로 대응하며 트랩 이름과 함수 이름이 같음
- 트랩 파라미터와 `Reflect` 함수의 파라미터가 같음

  ```tsx
  const target = { point: 100 };
  const handler = {
    get(target, key, receiver) {
      return Reflect.get(target, key, receiver) + 200;
    },
  };

  const obj = new Proxy(target, handler);

  console.log(obj.point); // 300

  // 1. console.log(obj.point); getter이므로 get() 트랩이 호출됨
  // 2. 트랩: get(target, key, receiver){...} target 파라미터에 target이 설정됨 key에 "point"가 설정되고 receiver에 Proxy 인스턴스가 설정됨
  // 3. Proxy의 get() 트랩과 Reflect.get() 함수에서 트랩 이름과 Reflect 함수 이름이 같으며 파라미터도 같음, 13개 트랩에 대응하는 Reflect 함수가 있음
  // 4. 트랩: return Reflect.get(target, key, receiver) + 200; Reflect.get()은 obj.point로 값을 구하는 본래 기능을 수행함
  // 5. 구한 값 100에 200을 더해 반환하는 것은 부가 기능으로 이것은 트랩의 기능 임
  ```

- `Reflect` 오브젝트 형태

  ```tsx
  const obj = Reflect;
  /*
    1. Reflect 오브젝트 구조를 보기 위해 obj에 할당했음
    
    2. obj에 표시된 함수를 Reflect.get() 형태로 사용할 수 있음
  
    3. 함수 이름이 Proxy 트랩 이름과 같음
  
    4. Reflect 오브젝트에
      - prototype과 prototype.constructor가 없음
      - 따라서 new 연산자로 인스턴스를 생성할 수 없으며
      - prototype에 메소드를 연결할 수 없음
  
    5. 표시된 constructor는 Reflect.constructor임
  */
  ```

```toc

```
