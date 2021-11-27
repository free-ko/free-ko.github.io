---
emoji: 👨‍💻
title: Proxy 인스턴스 생성 - new Proxy(), Proxy.revocable()
date: '2021-11-27 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋   Proxy 인스턴스 생성 - new Proxy(), Proxy.revocable()
</h1>

<br>

## 1. new Proxy()

- `Proxy` 인스턴스를 생성하여 반환 함
- 첫 번째 파라미터

  - `Proxy` 대상 `target` 오브젝트를 작성
  - Object, Array, Function 등

- 두 번째 파라미터

  - 핸들러를 작성함

    ```tsx
    const target = ['A', 'B'];
    const handler = {
      get(target, key) {
        return target[key] + ', 첫 번째';
      },
    };

    const obj = new Proxy(target, handler);

    console.log(obj[0]); // A, 첫 번째

    // 1. const handler = {...} [[Get]] 대신에 실행될 핸들러 임
    // 2. Proxy 인스턴스를 생성하면서 target과 handler를 연결 함
    // 3. new 연산자를 사용하지 않고 Proxy()로 호출하면 TypeError가 발생함
    // 4. handler를 사용하지 않더라도 handler를 작성하지 않으면 에러가 발생하므로 new Proxy(target, {}) 형태처럼 두 번째 파라미터에 빈 Object{}를 작성함
    // 5. obj[0] 값을 구하는 것이므로 핸들러의 get() 트랩이 호출됨
    ```

- Proxy 형태

  ```tsx
  const obj = Proxy; // Proxy 오브젝트 구조를 살펴보기 위해 obj에 할당 함

  /*
  	1. Proxy 오브젝트 자체를 obj에 할당했으므로 prototype과 constructor가 있어야 하는데 없음
  
  	2. new 연산자로 인스턴스를 생성하려면 constructor가 있어야 하는데 없음
  		- 그런데도 앞에 new 연산자로 인스턴스를 생성했음
  		- Proxy(target, {}) 형태로 실행하면 에러가 난다고 했음
  	
  	3. obj.__proto__를 펼치면 apply(), call()이 있으며 이것은 Function 오브젝트의 메소드로
  		- Proxy에서 정의한 것이 아님
  
  	4. 한편, 이런 구조는 Proxy 오브젝트가 Function 오브젝트 특성을 갖고 있다는 것을 뜻함
  
  	5. Proxy 오브젝트는 일반적인 형태가 아닌 특별한 형태의 오브젝트임
  
  	6. ES6 스펙에 아래와 같이 작성되어 있음
  		- A proxy object is an exotic object
  
  	7. exotic object는 범용성을 위한 특별한 오브젝트를 뜻함
  
  	8. revocable():
  		- 취소 가능한 오브젝트를 생성하며 Proxy 오브젝트에는 함수 하나만 있음
  */
  ```

- Proxy 인스턴스 형태

  ```tsx
  const target = { point: 100 };

  const handler = {
    get(target, key) {
      return target[key] + 200;
    },
  };

  const obj = new Proxy(target, handler);
  /*
  	1. obj를 펼치면 [[Handler]]가 있으며, 이것은 핸들러를 뜻함
  
  	2. [[Handler]]를 펼치면 get()이 있으며 이것은 handler 오브젝트에 작성한 트랩임
  
  	3. [[Handler]].__proto__를 펼치면 get, set이 있음 이것이 [[Get]], [[Set]]임
  
  	4. get() 트랩 아래에 __proto__가 있고 거기에 [[Get]]이 있으므로 get() 트랩이 실행됨
  		
  	5. [[Target]]을 펼치면 {point: 100}이 표시되며 이것은 target 오브젝트 임
  
  	6. [[Target]].__proto__를 펼치면 get, set이 있음 이것이 [[Get], [[Set]]임
  */

  console.log(obj.point);
  /*
  	1. obj.point는 getter임
  
  	2. obj Proxy 인스턴스에서 point 프로퍼티 값을 구함
  		- 핸들러에 get() 트랩을 작성했으므로 get() 트랩이 호출됨
  
  	return target[key] + 200;
  
  	3. target에서 point 프로퍼티 값을 구하고 200을 더해 반환 함
  */
  ```

  <br>

## 2. Proxy.revocable()

- `Proxy` 를 사용할 수 없는 상태로 바꿀 수 있는 오브젝트를 생성, 반환

  ```tsx
  cosnt target = {point: 100};

  const handler = {
  	get(target, key) {
  		return target[key];
  	}
  };

  const obj = Proxy.revocable(target, handler);
  console.log(obj.proxy.point);   // 100

  obj.revoke();

  try {
  	obj.proxy.point;
  } catch {
  	console.log("Proxy 기능 사용 불가");
  }

  // 1. const obj = Proxy.revocable(target, handler), new Proxy(target, handler)와 같음 따라서 Proxy를 처리할 수 있음
  // 2. 다만 obj.proxy에 Proxy 인스턴스가 설정됨
  // 3. console.log(obj.proxy.point); getter이므로 핸들러의 get() 트랩이 호출됨, obj.proxy에 Proxy 인스턴스가 있으므로 obj.proxy.point 형태로 작성함
  // 4. get() 트랩에서 100을 반환
  // 5. obj.revoke(); obj.proxy의 Proxy를 사용할 수 없게 만듬
  // 6. obj.proxy.point; obj.proxy의 Proxy를 사용할 수 없으므로 에러가 발생함
  ```

- 생성한 오브젝트 구조

  ```tsx
  const traget = { point: 100 };
  const handler = {
    get(target, key) {
      return target[key];
    },
  };

  const obj = Proxy.revocable(target, handler);
  /*
  	1. obj를 펼치면, proxy와 revoke()가 있음
  
  	2. obj.proxy를 펼치면 [[Handler]]와 [[Target]]이 있음 즉, Proxy 인스턴스임
  
  	3. 이런 구조로 인행 [[Target]]의 point 프로퍼티 값을 구할 때, obj.proxy.point 형태로 작성해야 함
  
  	4. [[IsRevoked]]가 있으며 값은 false 임
  */

  obj.revoke();
  /*
  	1. obj.proxy를 펼치면, [[IsRevoked]] 값이 false에서 true로 바뀜
  
  	2. 이 값이 true일 때, obj.proxy.point를 실행하면 에러가 발생함
  
  	3. revoke() 메소드는 [[IsRevoked]] 값을 true로 설정하여 Proxy가 실행되지 않도록 함
  */
  ```

```toc

```
