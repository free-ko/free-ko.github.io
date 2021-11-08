---
emoji: 👨‍💻
title: Map과 WeakMap 차이
date: '2021-11-09 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  Map과 WeakMap 차이
</h1>

<br>

## Map과 WeakMap 차이

- 참조하는 `object`를 삭제하면 `Map`은 그대로 갖고 있지만 `WeakMap`은 `GC`처리로 삭제됨

  ```tsx
  let mapObj = new Map();
  ((function(){
  	const obj = {key: "value"};
  	mapObj.set(obj, "Map");
  }());
  /*
  	- 즉시 실행 함수는 일회용으로 변수를 저장하지 않을 때 사용함
  	- 함수가 끝나면 obj 변수를 GC가 메모리에서 지움
  	- Map은 obj 변수가 지워지더라도 Map에 설정된 obj를 지우지 않고 유지 함
  	- mapObj를 펼치면 entry가 있음
  */

  let weakObj = new WeakMap();
  (function(){
  	const obj = {key: "value"};
  	weakObj.set(obj, "WeakMap");
  }());
  /*
  	- 앞의 실행 환경과 같음
  	- 다만, Map이 아닌 WeakMap에 저장함
  	- WeakMap은 obj 변수가 삭제되면 WeakMap에 설정된 obj를 삭제함
  	- weakObj를 펼치면 entry가 있음
  */

  setTimeout(function(){
  	console.log(weakObj);
  	console.log(mapObj);
  }
  /*
  	1. mapObj에는 entry가 있지만 weakObj는 없음
  	2. GC가 obj를 지우면서 WeakMap의 obj도 지우기 때문
  */
  ```

```toc

```
