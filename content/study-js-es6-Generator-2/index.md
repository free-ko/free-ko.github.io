---
emoji: 👨‍💻
title: GeneratorFunction
date: '2021-10-11 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋   GeneratorFunction
</h1>

<br>

## GenratorFunction

- `GeneratorFunction.constructor` 를 사용하여

  - 제너레이터 함수를 생성
  - 파라미터를 문자열로 작성
  - 마지막 파라미터가 함수 코드가 되고 앞은 파라미터 이름이 됨

  ```tsx
  const fn = new Function('one', 'return one');
  console.log(fn(100)); // 100

  const create = Object.getPrototypeOf(function* () {}).constructor;

  const sports = new create('one', 'yield one');
  const obj = sports(100);
  console.log(obj.next()); // {value: 100, done: false}
  ```

  ```tsx
  const gen = function* () {};
  /*
  	1. 오른쪽 gen을 펼치면 prototype이 있음
  	- 이것을 펼치면 constructor가 있어야 하는데 없음
  	- 또한 메소드로 없음
  
  	2. __proto__가 있으며 이것을 펼치면 constructor가 있음
  	- __proto__에 다른 오브젝트의 prototype에 연결된 프로퍼티를
  	- 인스턴스 개념으로 생성하여 첨부한 것이 표시 됨
  
  	3. 즉, GeneratorFunction의 constructor가 첨부된 것
  */
  ```

  <br>

  - 예시

    ```tsx
      const create = Object.getPrototypeOf(
        function*(){}).constructor;
      console.log(create);       // function GeneratorFunction() {[native code]}

      const sprots = new create("one", "yield one;");
      console.log(typeof sports);   // function

      const obj = sports(100);
      console.log(obj.next();     // {value: 100, done: false}

      /*

        1. create = (function*(){}).constructor;
            - 제너레이터 함수를 생성하는
            - constructor(생성자)를 할당 함

        2. constructor가 할당되므로
            - new 연산자로 생성자 함수를 호출할 수 있음

        3. console.log(create);
            - function GeneratorFunction() {} 출력
            - function 오브젝트 형태

        4. sports = new create(param)
            - GeneratorFunction을 사용하여 제너레이터 함수를 생성하고 sports 변수에 할당 함
            - param 에 파라미터와 함수 코드를 작성 one: 파라미터 이름, yield one: 함수 코드

        5. console.log(typeof sports)
            - new  연산자를 사용했는데
            - sports가 Object가 아니라 function임

        6. function이라는 것은
            - function* sports() 로 제너레이터 함수를 선언한 것을 뜻함
            - 즉, 지금까지 제너레이터 함수를 선언하는 처리를 한 것

        7. const obj = sports(100);
            - 제너레이터 함수를 호출 함
            - 제너레이터 오브젝트 생성, 반환
            - 함수 코드를 실행하지 않음
            - 100이 one에 매핑 됨

        8. obj.next()
            - 제너레이터 오브젝트는 이터레이터 오브젝트이며
            - obj에 이터레이터 오브젝트가 할당되어 있으므로
            - `next()`를 호출 할 수 있음
            - {value: 100, done: false} 출력
      */
    ```

```toc

```
