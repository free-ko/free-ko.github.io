---
emoji: 👨‍💻
title: Symbol.species 오버라이드
date: '2021-10-25 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  Symbol.species 오버라이드
</h1>

<br>

## Species 오버라이드

- `Symbol.species` 는 `static` 약세서 프로퍼티 이며 `getter` 만 있고 `setter` 는 없음

  ```tsx
  class Sports extends Array {
  	statice get [Symbol.species](){
  		return Array;
  	}
  };

  const obj = new Sports(10, 20)
  ```

- `Symbol.species` 를 사용할 수 있는 빌트인 오브젝트

  - Array, Map, Set, RegExp
  - Promise, ArrayBuffer, TypedArray

- 빌트인 오브젝트를 상속받은 `class`에 `Symbol.species` 를 작성하면 빌트인 오브젝트의 `@@species`가 오라이드 됨
- 인스턴스 바꾸기

  ```tsx
  class Sports extends Array {
  	statice get [Symbol.species](){
  		return Array;
  	}
  };

  const one = new Sports(10, 20, 30);
  console.log(one instanceof Sports);  // true

  const two = one.slice(1, 2);
  console.log(two instanceof Array);   // true
  console.log(two instanceof Sports);  // false
  ```

  - `class Sports extends Array{}`
    - 빌트인 `Array` 오브젝트를 상속 받음
  - `statice get [Symbol.species](){ return Array; }`
    - 빌트인`Array` 오브젝트의 `@@species`를 오버라이드 함
  - `const one = new Sports(10, 20, 30);`
    - 인스턴스를 생성함
    - 파라미터 값이 인스턴스에 설정 됨
  - `one instanceof Sports`
    - `Sports` 로 `one` 을 만들었으므로 `true` 출력
  - `const two = one.slice(1,2);`
    - `Array` 오브젝트를 상속 받았으므로 `one` 인스턴스로 `slice()`를 호출 할 수 있음
    - `slice()` 대상은 인스턴스에 설정된 [10, 20, 30]
    - 인스턴스를 반환하며 반환되는 인스턴스에 `slice()` 결과를 설정함
  - `Symbol.species()` 로 오버라이드 했으므로
    - `static get [Symbol.species](){}` 가 호출 됨
    - 호출에 사용한 `one` 인스턴스 형태를 반환하지 않고 `Array` 인스턴스를 반환함
    - 이처럼 `Symbol.species()`로 반환할 인스턴스를 변경할 수 있음
  - `two instanceof Array`
    - `two` 인스턴스에는 `Array` 인스턴스가 할당되어 있으며
    - `Array` 오브젝트로 만들었으므로 `true` 출력
  - `two instacne of Sports`
    - `Sports` 가 아니라 `Array` 오브젝트로 `two` 인스턴스를 만들었으므로 `false` 출력

```toc

```
