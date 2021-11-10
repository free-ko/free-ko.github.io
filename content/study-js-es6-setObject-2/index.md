---
emoji: 👨‍💻
title: 값  설정, 추출 메소드 - add(), has()
date: '2021-11-11 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  값  설정, 추출 메소드 - add(), has()
</h1>

<br>

## 1. add()

- `Set` 인스턴스 끝에 `value` 추가

  ```tsx
  let obj = new Set();
  obj.add('축구').add('농구');
  obj.add('축구');

  for (let value of obj) {
    console.log(value);
  }

  // add()를 실행한 후 인스턴스를 반환하므로 method chain 형태로 add()를 작성할 수 있음
  // add()에서 "축구"가 있으므로 첨부되지 않음

  // 실행 결과
  // 축구
  // 농구
  ```

- 사용 형태

  - 함수를 생성하여 `value`로 사용

    ```tsx
    let obj = new Set();
    obj.add(function sports() {
      return 100;
    });
    obj.add(function sports() {
      return 200;
    });

    for (let value of obj) {
      console.log(value);
    }

    // 1. 같은 이름의 function을 작성한 형태
    // 2. Function 오브젝트의 메모리 주소가 다르므로 이름이 같더라도 설정됨
    // 3. for-of로 전개된 value에 함수가 설정되므로 호출할 수 있음, 출력된 값은 함수에서 return 값임

    // 실행결과
    // 100
    // 200
    ```

  - `value`에 생성한 함수 이름 작성

    ```tsx
    const sports = () => {
      return 100;
    };
    let obj = new Set();

    obj.add(sports);
    obj.add(sports);

    for (let value of obj) {
      console.log(value());
    }

    // 1. Function 오브젝트를 새엇ㅇ한 후 함수 이름으로 등록하면 하나만 설정 됨
    // 2. 이것은 함수 이름으로 참조하는 Function 오브젝트의 메ㅐ모리 주소가 같이 때문

    // 실행 결과
    // 100
    ```

  - `Object`를 `value`로 사용

    ```tsx
    const sports = {
      축구: 11,
      야구: 9,
    };

    let obj = new Set();
    obj.add(sports);

    for (let value of obj) {
      console.log(value);
    }

    // 실행결과
    // { 축구 : 11, 야구 : 9 }
    ```

<br>

## 2. has()

- `Set` 인스턴스에서 값의 존재 여부를 반환

  - 존재하면 `true`, 아니면 `false` 반환

    ```tsx
    const sports = () => {};
    const obj = new Set([sports]);

    console.log(obj.has(sports)); // true
    console.log(obj.has('book')); // false
    ```

- `get()` 메소드가 없으므로
  - `has()` 로 값의 존재 여부를 체크 한 후 존재하면 체크한 값을 값으로 사용

```toc

```
