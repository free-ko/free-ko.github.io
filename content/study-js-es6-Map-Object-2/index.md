---
emoji: 👨‍💻
title: Map과 Object 비교
date: '2021-11-02 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  Map과 Object 비교
</h1>

## Map과 Object 비교

- Map 오브젝트 구조

  ```tsx
  const map = Map;
  /*
  	1. Map 오브젝트에 get Symbol(Symbol.species)가 있음
  		- 따라서, constructor를 오버라이드할 수 있음
  
  	2. prototype을 펼치면 Symbol.iterator가 있음
  */

  const list = [1, 2];
  const obj = new Map([
    ['one', '첫 번째'],
    ['two', '두 번째'],
  ]);
  /*
  	1. 오른쪽의 Obj를 펼치면 [[Entries]]가 있음
  		- 대괄호[[]] 두 개는 엔진에서 설정하는 것을 뜻함
  
  	2. [[Entries]]를 펼치면 0: {"one" => "첫 번째"} 형태임
  
  	3. 인덱스를 부여하여 key로 사용하고
  		- {"one: "첫 번째"}를 value로 설정함
  
  	4. 이것은 배열 형태와 구조가 비슷 함
  		- size가 length 기능을 함
  
  	5. 인덱스를 부여하여 저장하므로 작성한 순서로 읽혀짐
  */
  ```

- key

  - Map: 타입 제약 없음
  - Object: `String`, `Symbol`

- `{key: value}` 수

  - Map: `size` 프로퍼티로 구함
  - Object: 전체를 읽어 구해야 함

- 처리 시간 : MDN
  - 빈번하게 key, value를 추가/삭제 할 때는 Map이 Object보다 좋은 경우가 있다고 함

```toc

```
