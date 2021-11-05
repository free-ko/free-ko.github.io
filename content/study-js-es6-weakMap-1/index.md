---
emoji: 👨‍💻
title: WeakMap 오브젝트 개요, new WeakMap()
date: '2021-11-06 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  WeakMap 오브젝트 개요, new WeakMap()
</h1>

<br>

## 1. WeakMap 오브젝트

- WeakMap: 약한 Map?
- WeakMap은 Object만 `Key`로 사용 가능
  - number 등의 프리미티브 타입 사용 불가
  - value는 제한 없음
- Map에서 key로 참조한 Object를 삭제하면 object를 사용할 수 없게 되지만 Map에 object가 남음

  ```tsx
  let sports = {like: "축구"};
  const obj = new Map([
  	[sports, "like: 축구"]
  )];

  sports = {like: "농구"}
  ```

  - 메모리 릭 발생

- WeakMap의 object를 GC가 지움
  - GC: Garbage Collection
  - 그래서(약한, 부서지기 쉬운) WeakMap?
- WeakMap 오브젝트 메소드
  - `set()`, `get()`, `has()`, `delete()`
  - CRUD와 관련된 메소드만 있음
- WeakMap entry의 열거 불가
- 이터레이션 불가

<br>

## 2. new WeakMap()

- WeakMap 인스턴스 생성, 반환
- 파라미터 작성

  - 대괄호 `[ ]` 안에 이터러블 오브젝트 작성

    ```tsx
    const empty = new WeakMap();

    const sports = {};
    const obj = new WeakMap([[sports, 'sports 오브젝트']]);

    console.log(typeof obj); // object

    // 1. 파라미터를 작성하지 않아도 됨
    // 2. new 연산자를 사용함
    // 3. 인스턴스이므로 타입은 object
    ```

- WeakMap 오브젝트 구조

  ```tsx
  const map = Map;
  const weakmap = WeakMap;
  /*
  	1. map과 weakmap이 구조에서 크게 다르지 않지만
  		
  	2. Map 오브젝트에 Symbol(Symbol.species)가 있지만
  		- WeakMap 오브젝트에는 없음
  
  	3. map.prototype에 Symbol.iterator가 있지만
  		- weakmap.prototype에는 Symbol.iterator가 없음
  
  	4. map.prototype에는 forEach()가 있지만
  		- weakmap.prototype에는 forEach()가 없음
  */

  const sports = {};
  const obj = new WeakMap([[sports, '종목']]);
  /*
  	1. 오른쪽의 obj를 펼치면 [[Entries]]가 있음
  		- 이것은 엔진에서 설정하는 것을 뜻함
  
  	2. [[Entries]]를 펼치면 0: {Object => "종목"} 형태 임
  		- [Object, "종목"] 형태로 작성한 것을
  		- 인덱스를 부여하여 배열로 만들고
  		- 엘리먼트에 {Object: "종목"} 형태로 변환 함
  
  	3. Map 인스턴스와 구조가 같음
  */
  ```

```toc

```
