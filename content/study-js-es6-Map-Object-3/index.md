---
emoji: 👨‍💻
title: 값 설정, 추출 메소드 - set(), get(), has()
date: '2021-11-03 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  값 설정, 추출 메소드 - set(), get(), has()
</h1>

## 1. set()

- Map 인스턴스에 key, value 설정

  ```tsx
  let obj = new Map();
  obj.set("one", 100);
  obj.set({}, "오브젝트");
  obj.set(function(){}, "Function");
  obj.set(new Number{"100"), "인스턴스");
  obj.set(NaN, "Not a Number");

  for (let [key, value] of obj) {
  	console.log(`${key} : ${value}`);
  };

  // [실행 결과]
  // one : 100
  // [ovbject Object] : 오브젝트
  // function(){} : Function
  // 100 : 인스턴스
  // NaN : Not a Number
  ```

  - key, value 순서로 파라미터 작성
  - key, value를 설정한 인스턴스 반환

- key 값이 같으면 value가 바뀜

  ```tsx
  let obj = new Map();
  const book = {};
  obj.set(book, '첫 번째');
  obj.set(book, '두 번째');

  for (let [key, value] of obj) {
    console.log(`${key} : ${value}`);
  }

  // 1. obj.set(book, "첫 번째"); 외부에 작성한 book 오브젝트의 메모리 주소를 key 값으로 사용함
  // 2. obj.set(book, "두 번째"); book 오브젝트의 메모리 주소와 같은 key 값이 있으므로 값이 대체 됨

  // 실행 결과
  // [object Object] : 두 번째
  ```

<br>

## 2. get()

- Map에서 Key값이 같은 `Value` 반환

  - key 값이 같지 않거나 타입이 다른 `undefined` 반환

    ```tsx
    let obj = new Map([
      ['one', 100],
      ['200', 'String 타입'],
    ]);

    console.log(obj.get('one')); // 100
    console.log(obj.get('two')); // undefined
    console.log(obj.get(200)); // undefined

    // 1. tow가 key에 없으므로 undefined을 반환
    // 2. 200이 있지만 타입이 다르므로 undefined를 반환
    ```

- 오브젝트 설정과 추출

  ```tsx
  let obj = new Map();
  const like = { sports: '스포츠' };
  obj.set(like, { value: '농구' });

  console.log(obj.get(like)); // {value: 농구}

  // 1. 같은 메모리 주소를 사용 함
  ```

<br>

## 3. has()

- Map 인스턴스에서 key의 존재 여부를 반환

  - key가 있으면 `true`, 아니면 `false`

    ```tsx
    const obj = new Map([['one', 100]]);

    console.log(obj.has('one')); // true
    console.log(obj.has('two')); // false
    ```

```toc

```
