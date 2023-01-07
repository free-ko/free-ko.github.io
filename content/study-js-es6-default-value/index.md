---
emoji: 👨‍💻
title: Default Value
date: '2021-09-11 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 Default Value
</h1>

<br>

## Default Value

- 값을 할당하지 않으면 사전에 정의된 값을 할당
  - default value : 사전에 정의된 값
- 할당할 값이 없으면 디폴트 값을 할당

  ```tsx
  const [one, two, fiv = 50] = [10, 20];

  console.log(five); // 50
  ```

  1. `one`에 10을, `two`에 20을 분할 할당 함
  2. `five`에 할당할 값이 없으며, 이 때 `five = 50`에서 `50`을 `five`에 할당함
  3. 이것을 `default value`라고 함
  4. `=`의 왼쪽에 이름을 작성하고 오른쪽에 값을 작성

<br>

- 할당할 값이 있으면 디폴트 값을 무시

  ```tsx
  const [one, two, five = 50] = [10, 20, 70];

  console.log(five); // 70
  ```

  1. 왼쪽과 오른쪽 모두 값이 3개 임
  2. 값(70)이 있으므로 `five`에 `70`을 할당함 `five = 50`에서 `50`을 할당하지 않음

<br>

- Object는 프로퍼티 이름으로 체크

  ```tsx
  const { one, two = 20 } = { one: 10 };

  console.log(two); // 20
  ```

  1. 오른쪽에 `one`의 값인 `10`을 왼쪽의 `one` 프로퍼티 값으로 분할 할당함
  2. `two`에 할당할 값이 없으며 `two = 20`에서 `20`을 `two`에 할당 함

<br>

- 디폴트 값 적용 순서

  - 왼쪽에서 오른쪽으로 적용

  ```tsx
  const [one, two = one + 20, five = two + 50] = [10];

  console.log(two); // 30
  console.log(five); // 80
  ```

  1. 오른쪽 one의 값인 10을 왼쪽의 one 프로퍼티 값으로 분할 할당함
  2. 오른쪽에 값이 없으므로 디폴트 값을 할당, 왼쪽에서 오른쪽으로 할당
  3. `two = one + 20`, one의 값이 10이므로 30이 two에 설정됨
  4. `five = two + 50`, two의 값이 30이므로 80이 five에 설정됨

<br>

- 함수의 파라미터에 디폴트 값 적용

  - 넘겨 받은 파라미터 값이 없으면 디폴트 값을 할당

  ```tsx
  const add = (ten, two = 20) => ten + two;
  const result = add(10);

  console.log(result); // 30
  ```

  - 넘겨받은 파라미터 값이 있으면 디폴트 값을 무시

    ```tsx
    const add = (ten, two = 20) => ten + two;
    const result = add(10, 50);

    console.log(result); // 60
    ```

<br>

- 호출한 함수의 파라미터 값이 `undefined`일 때

  ```tsx
  const point = () => 20;
  const add = (one, two = point()) => one + two;
  const result = add(10, undefined);

  console.log(result); // 30
  ```

  - 파라미터를 넘겨주지 않았기 때문에 디폴트 값 실행

```toc

```
