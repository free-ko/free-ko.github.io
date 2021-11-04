---
emoji: 👨‍💻
title: 콜백 함수, 삭제, 지우기 - forEach(), delete(), clear()
date: '2021-11-05 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  콜백 함수, 삭제, 지우기: forEach(), delete(), clear()
</h1>

<br>

## 1. forEach()

- Map 인스턴스를 반복하면서 `callback` 함수 호출
  - `map()`, `filter()` 등의 `callback` 함수가 동반되는 메소드 사용 불가
- callback 함수에서 넘겨주는 파라미터

  - value, key, Map 인스턴스 key, value 순서가 아님

    ```tsx
    const obj = new Map([
      ['one', 100],
      ['two', 200],
    ]);

    const callback = (value, key, map) => {
      console.log(`${key}, ${value}`);
    };

    obj.forEach(callback);

    // 실행결과
    // one, 100
    // two, 200
    ```

  - 콜백 함수에서 `this` 사용

    ```tsx
    const obj = new Map([
    	["one", 100],
    	["two", 200]
    ]);

    function callback = (value, key, map) => {
    	console.log(`${key}, ${value}, ${this.check}`);
    };

    obj.forEach(callback, {check: 50});

    // 1. 콜백 함수를 일반 함수로 작성했음
    // 2. 콜백 함수를 화살표 함수로 작성하면 this가 window 오브젝트를 참조함
    // 3. 콜백 함수에서 this가 forEach()의 두 번째 파라미터에 작성한 오브젝틀 참조 함

    // 실행결과
    // one, 100, 50
    // two, 200, 50
    ```

<br>

## 2. delete()

- Map 인스턴스에 파라미터 값과 같은 entry 삭제

  - 같은 key가 있으면 `true` 반환 없으면 `false` 반환

    ```tsx
    const obj = new Map([
    	["one", 100],
    	[{}, "오브젝트"]
    ]};

    console.log(obj.delete("one"));   // true
    console.log(obj.delete({}));      // false

    const sports = {};
    obj.set(sports, "스포츠");

    console.log(obj.delte(sports));   // true
    ```

<br>

## 3. clear()

- Map 인스턴스의 모든 entry를 지움

  - Map 인스턴스를 삭제하는 것은 아님
  - 따라서 `[key, value]`를 추가할 수 있음

    ```tsx
    const obj = new Map([
      ['one', 100],
      ['two', 200],
    ]);

    console.log(obj.size); // 2

    obj.clear();
    console.log(obj.size); // 0

    obj.set('add', '추가');
    console.log(obj.size); // 1
    ```

- Size 프로퍼티
  - Map 인스턴스의 entry 수를 반환
  - 개발자 코드로 수정 할 수 없음

```toc

```
