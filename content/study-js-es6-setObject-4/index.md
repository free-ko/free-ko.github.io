---
emoji: 👨‍💻
title: 콜백 함수, 삭제, 지우기 - forEach(), delete(), clear()
date: '2021-11-13 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  콜백 함수, 삭제, 지우기 - forEach(), delete(), clear()
</h1>

<br>

## 1. forEach()

- `Set` 인스턴스를 반복하면서 `callBack` 함수 호출

  - `map()`, `filter()` 등의 `callback` 함수가 동반되는 메소드 사용 불가

- `callbak` 함수에 넘겨주는 파라미터

  - `value`, `key(value)`, `Set` 인스턴스

    ```tsx
    const obj = new Set(['one', () => {}]);

    function callback(value, key, set) {
      console.log(value);
    }

    obj.forEach(callback);

    // 실행결과
    // one
    // () => {}
    ```

  - 콜백 함수에서 `this` 사용

    ```tsx
    const obj = new Set(['one', 'two']);

    function callback(value, key, set) {
      console.log(`${value}, ${this.check}`);
    }

    obj.forEach(callback, { check: 'ABC' });
    // 콜백 함수에서 this가 forEach()의 두 번째 파라미터에 작성한 오브젝트를 참조하게 하려면
    // 일반 함수로 작성해야 함

    // 실행결과
    // one, ABC
    // two, ABC
    ```

<br>

## 2. delete()

- `Set` 인스턴스에서 파라미터 갑솨 같은 엘리먼트 삭제

- 같은 `value` 가 있어 삭제에 성공하면 `true` 반환

  - 삭제에 실패하면 `false` 반환

    ```tsx
    const obj = new Set(['one', 'two']);

    console.log(obj.delete('one')); // true
    console.log(obj.delete('one')); // false
    ```

<br>

## 3. clear()

- `Set` 인스턴스의 모든 엘리먼트를 지움

  - `Set` 인스턴스를 삭제하는 것은 아님, 따라서 `value`를 추가할 수 있음

    ```tsx
    const obj = new Set(['one', 'two']);

    console.log(obj.size); // 2

    obj.clear();
    console.log(obj.size); // 0

    obj.add('one');
    console.log(obj.size); // 1
    ```

```toc

```
