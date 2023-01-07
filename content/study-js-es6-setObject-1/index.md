---
emoji: 👨‍💻
title: Set 오브젝트 개요, new Set(), Set과 Map 비교
date: '2021-11-10 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  Set 오브젝트 개요, new Set(), Set과 Map 비교
</h1>

<br>

## 1.Set 오브젝트

- Set 오브젝트는 `value`(값)의 컬렉션

  - `[value1, ... ,valueN]` 형태로 작성

  - Set은 대괄호 `[ ]`가 하나

  - 작성한 순서로 전개됨

  ```tsx
  const obj = new Set([1, 2, 'ABC']);

  console.log(`size: ${obj.size}`);

  for (let vlaue of obj) {
    console.log(value);
  }

  // 실행 결과
  // size: 3
  // 1
  // 2
  // ABC
  ```

<br>

## 2. new Set()

- Set 인스턴스 생성, 반환

  - 파라미터에 값을 작성

  - 프리미티브, 오브젝트 타입 사용 가능

  - `size` 프로퍼티

    - Set 인스턴스의 엘리먼트 수를 반환

    ```tsx
    const obj = new Set([1, 2, 1, [], {}]);

    console.log(`size: ${obj.size}`); // size : 4

    for (let value of obj) {
      console.log(value);
    }

    // 1. 같은 값이 있으면, 첫 번째의 1을 유지하며 세 번째의 1을 설정하지 않음
    // 2. Same-Value-Zero 비교 알고리즘으로 비교
    // 3. obj.size 세 번째의 1이 설정되지 않으므로 값은 4

    // 실행 결과
    // 1
    // 2
    // []
    // {}
    ```

- Set 오브젝트 구조

  ```tsx
  const set = Set;
  /*
  	1. Set 오브젝트에 Symbol(Symbol.species)가 있음
  		- 따라서, constructor를 오버라이드 할 수 있음
  
  	2. prototype을 펼치면 Symbol.iterator가 있음
  */

  const obj = new Set(['one', 'two']);

  /*
  	1. 오른쪽의 obj를 펼치면 [[Entries]]가 있음
  
  	2. [[Entries]]를 펼치면 0: "one" 형태 임
  
    3. 인덱스를 부여하여 key로 사용하고
  	- "one", "two"를 value로 설정함
  
  	4. 인덱스를 부여하는 구조는 Map과 같음
  
  	5. 인덱스를 부여하여 저장하므로 작성한 순서로 읽혀짐
  */
  ```

<br>

## 3. Set과 Map 비교

- 저장 형태

  - `Map` : key와 value 작성, Key를 key로 사용하여 `[key, value]`로 저장
  - `Set` : `value`만 작성, `value`를 key로 사용하여 `[value]`로 저장

- 값을 구하는 형태
  - `Map` : `get(key)` 형태로 `value`를 구할 수 있음
  - `Set` : `get()` 메소드가 없음
  - 값 하나를 구할 수 없음, 반복으로 값을 구하거나 이터레이터 사용

```toc

```
