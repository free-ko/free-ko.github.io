---
emoji: 👨‍💻
title: get(), get() 트랩 호출, get() 트랩 준수사항
date: '2021-11-30 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 get(), get() 트랩 호출, get() 트랩 준수사항
</h1>

<br>

## 1. get()

- 값을 구하는 트랩 : `target, receiver`에서 값을 구함

- `get()` 트랩이 호출되면 엔진이 실행 환경을 분석하여 파라미터 값을 설정

  ```tsx
  const target = { point: 100 };
  const handler = {
    get(target, key, receiver) {
      return traget[key] + 200;
    },
  };

  const obj = new Proxy(target, handler);

  console.log(obj.point); // 300
  console.log(obj.bonus); // NaN

  // 1. console.log(obj.point); get() 트랩이 호출됨
  // 2. 트랩: gtet(target, key, receiver) {...} target에 target 오브젝트가 설정되고 key에 "point"가 설정됨, receiver에 Proxy 또는 Proxy를 상속받은 오브젝트가 설정됨
  // 3. 트랩: return target[key] + 200; target 오브젝트에서 point 값을 구하고 구한 값 100에 200을 더해 반환함
  // 4. console.log(obj.bonus); obj 인스턴스에 bonus가 없지만 obj에 get() 트랩이 있으면 호출함 bonus 프로퍼티의 존재를 체크하지 않음
  // 5. 트랩: return target[key] + 200; 에서 target[key]에서 "bonus"가 없으므로 undefined이며 200을 더하므로 NaN을 반환함
  ```

- `get()` 트랩 활용 형태 : 조건 체크

  ```tsx
  const target = { point: 100 };
  const handler = {
    get(target, key, receiver) {
      const value = target[key];
      return this.check ? value + 200 : value;
    },
  };

  const obj = new Proxy(target, handler);
  handler.check = true;

  console.log(obj.point); // 300

  // 1. handler.check = true; get() 트랩에서 체크 값으로 사용함
  // 2. 트랩: return this.check ? value + 200 : value; this는 handler 오브젝트를 참조 함, check 값이 true이므로 200을 더해 반환함
  // 3. 이처럼 조건을 부여하여 값을 구할 때 호출하는 곳마다 조건 코드를 작성하지 않고 get() 트랩에 조건 코드를 작성하면 깨끗하게 코드를 관리할 수 있음
  ```

- `get()` 트랩 활용 형태 : 데이터 변경

  ```tsx
  let target = { point: 100 }; // 아래에서 target 전체를 대체하므로 let 변수로 선언함

  const handler = {
    get(target, key, receiver) {
      return target[key];
    },
  };

  const proxy = new Proxy(target, handler);

  target.point = 300; // target과 proxy.[[Target]]의 point 값이 바뀜

  target = { point: 500 };

  console.log('1. target: ', target.point);
  /*
  	1. target 오브젝트 전체를 바꿈 
  		- target.point 값으로 500이 출력됨
  
  	2. 한편, proxy.[[Target]].point는 바뀌지 않음
  		- 즉, target.point는 500이고 proxy.[[Target]].point는 300임
  */

  /*
  	target = {point: 500};
  
  	1. {point: 500}은 새로운 빌트인 Object를 생성함
  
  	2. 새로운 메모리 주소를 target에 할당하므로
  		- target이 참조하는 메모리 주소가 바뀌게 됨
  	
  	3. 이때, target의 바뀐 메모리 주소가 proxy.[[Target]] 반영되지 않음
  */

  console.log('2. proxy: ', proxy.point);
  /*
  	1. get(target, key, receiver){...}에서
  		- target에 바뀌기 전의 {point: 300}이 설정됨
  		- 즉, 바뀐 target이 설정되지 않고 proxy.[[Target]]이 설정됨
  
  	2. new Proxy(target, handler)로 인스턴스를 생성할 때
  		- proxy.[[Target]]에 target의 메모리 주소를 설정하고 get() 트랩에서 이를 사용하여 target의 프로퍼티 값을 구하는 것이 됨
  */

  proxy.point = 700;

  console.log('3. proxy: ', proxy.point);
  /*
  	1. proxy.[[Target]].point 값을 바꿈
  		- 바뀐 값이 700이 출력됨
  */

  console.log('4. target: ', target.point);
  /*
  	1. proxy.point = 700;으로 바꾼 값이 target에 반영되지 않음
  
  	2. 일반적으로 target.point에도 값이 연동되어 반영되지만
  		- 지금은 proxy.[[Target]]이 참조하는 메모리 주소와
  		- target의 메모리 주소가 다르기 때문 임
  */

  /*
  	1. 결과적으로 target의 값을 프로퍼티 단위로 바꿔야 함
  
  	2. 앞의 트랩에서 체크하는 코드를 함수로 만들고 target의 프로퍼티를 변경하는 것도 함수로 만들면 프레임워크 개념으로 사용할 수 있음
  */
  ```

<br>

## 2. get() 트랩 호출

- `get()` 트랩이 호출되는 형태

  - `proxy[key]`

  - `Object.create(proxy, {프로퍼티})`

    ```tsx
    const target = { point: 600, bonus: 100 };
    const handler = {
      get(target, key, value, receiver) {
        return target[key] + 200;
      },
    };

    const proxy = new Proxy(target, handler);
    const obj = Object.create(proxy, {
      point: { value: 500 },
    });

    console.log(obj.point); // 500
    console.log(obj.bonus); // 300

    // 1. console.log(obj.point); Object.create(proxy, {...}의 두 번째 파라미터에 point를 작성했음
    // 2. 즉, point가 인스턴스 프로퍼티이므로 get() 트랩을 호출하지 않고 point 프로퍼티 값 500을 반환함
    // 3. get() 트랩을 호출하면 target에 {point: 600}이 있으므로 600이 반환됨
    // 4. console.log(obj.bonus); Object.create(proxy, {...}의 두번째 파라미터에 bonus를 작성하지 않았으므로 get(0 트랩이 호출 됨
    ```

  - `Reflect.get()`

<br>

## 3. get() 트랩 준수사항

- `target` 의 프로퍼티가 `data` 디스크립터일 때

  - `[[Writable]]: false` 또는 `[[Configurable]]: false` 이면 반환 값을 변경하여 `return` 불가

    ```tsx
    const target = {};
    Object.defineProperty(target, 'point', {
      value: 500,
      writable: false,
    });

    const handler = {
      get(target, key, receiver) {
        // return target[key] + 200;
        return target[key];
      },
    };

    const obj = new Proxy(target, handler);

    console.log(obj.point); // 500

    // 1. {value: 500, writable: false} target 오브젝트의 point 프로퍼티는 {writable: false} 임
    // 2. 트랩: // return target[key] + 200; 프로퍼티가 {writable: false}일 때 target[key]로 구한 값을 반환해야 함
    // 3. 트랩처럼 구한 값에 값을 더해 return 하면 에러가 발생 함
    // 4. {writable: true}이면 return 값을 변경할 수 있음
    // 5. get() 트랩에서 try-catch를 사용할 수 없음
    ```

- `target` 의 프로퍼티가 악세서 디스크립터일 때
  - `[[Configurable]]: false` 이면 반환 값을 변경하여 `return` 불가

```toc

```
