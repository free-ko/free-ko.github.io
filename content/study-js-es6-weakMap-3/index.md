---
emoji: 👨‍💻
title: 가비지 컬렉션 처리
date: '2021-11-08 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  가비지 컬렉션 처리
</h1>

<br>

## 가비지 컬렉션

- 참조하는 object가 바뀌면 참조했던 오브젝트가 가비지 컬렉션 처리 됨

- 가비지 컬렉션 처리

  ```tsx
  let obj = new WeakMap();
  let sports = () => {
    point: 1;
  };
  obj.set(sports, '변경 전');
  // sports에 Function 오브젝트를 할당하고 이것을 WeakMap 인스턴스에 key로 설정

  sports = () => {
    point: 2;
  };
  // 새로운 함수를 생성하여 할당함
  // 바로 위의 sports가 참조하는 메모리 주소가 바뀜
  // sprots가 참조하는 메모리 주소가 바뀌면 앞의 sports가 참조했던 오브젝트를 호출할 수 없게 됨
  // 이렇게 사용할 수 없게 된 {point: 1} 오브젝트는 GC대상이 됨
  // 엔진이 주기적으로 GC처리를 함

  obj.set(sports, '변경 후');
  // sports를 key로 하여 WeakMap에 설정함
  // 앞에서 sports를 key로 하여 설정했으며 여기서도 sports를 key로 하여 설정하므로 값이 대체되어야 하지만
  // 두 개의 sports가 참조하는 주소가 다르므로 sports가 추가됨
  ```

<br>

- WeakMap 인스턴스의 GC상태

  ```tsx
  let obj = new WeakMap();
  let sports = () => {
    point: 1;
  };
  obj.set(sports, '변경 전');
  /*
  	1. 아래에서 sports 변수에 {point: 2}를 할당하므로
  		- sports가 참조하는 오브젝트가 바뀜
  */

  sports = () => {
    point: 2;
  };
  obj.set(sports, '변경 후');
  /*
  	1. obj의 [[Entries]]를 펼치면 0과 1이 있음
  		- 변숫값은 바뀌어 하나이지만
  		- WeakMap 인스턴스에는 두 개가 있음
  
  	2. {point: 1}과 {point: 2}의 메모리 주소가 다르며
  		- sports는 사람이 보는 것으로
  		- WeakMap은 값인 메모리 주소가 다르므로 각각 저장 합니다.
  
  3. 그래서 sports로 저장하지 않고 
  		- 인덱스를 부여하여 저장하는 것
  		- 엔진은 인덱스가 key이며
  		- sports는 프로퍼티 value에서 프로퍼티 키 임
  */

  setTimout(function () {
    debugger;
    console.log(obj.get(sports));
  }, 4000);
  debugger;
  /*
  	1. {point: 1}의 sports를 사용할 수 없으므로
  		- GC가 {point: 1}의 sports를 메모리에서 지움
  		- 또한 obj의 "변경 전"도 삭제 함
  
  	2. 인덱스 1번이 0번이 됨
  
  	3. Map 오브젝트에서 entry를 삭제해도 인덱스를 정리 함
  */
  ```

```toc

```
