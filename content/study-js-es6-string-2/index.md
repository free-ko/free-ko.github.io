---
emoji: 👨‍💻
title: Unicode 함수
date: '2021-09-19 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  fromCodePoint(), codePointAt(), normalize()
</h1>

<br>

## 1. fromCodePoint()

- 유니코드의 코드 포인트에 해당하는 문자 반환
- 파라미터에 다수의 코드 포인트 작성 가능

  - 문자를 연결하여 반환

  ```tsx
  const point = String.fromCodePoint;

  console.log(point(49, 50, 51)); // 123
  console.log(point(44032, 44033)); // 가각
  console.log(point(0x31, 0x32, 0x33)); // 123
  console.log(point(0x1f4118)); // 코끼리 이모지
  ```

- ES5의 `fromCahrCode()`사용

  - `Surrogate pair`로 작성

  ```tsx
  console.log(String.fromCharCode(0x1f418)); // 네모 아이콘
  console.log(String.fromCharCode(0xd83d, 0xdc18)); // 코끼리 아이콘

  // 1. fromCharCode()ㅇㅔ서는 0x1f418형태를 지원하지 않으므로
  // 2. fromCharCode(0xD83D, 0xDc18)처럼 Surrogate pair로 작성함
  ```

<br>

## 2. codePointAt()

- 대상 문자열에서

  - 파라미터에 작성한 인덱스 번째 문자를
  - 유니코드 코드 포인트로 변환하여 반환
  - 코드 포인트는 UTF-16으로 인코딩된 값

  ```tsx
  const result = '가나다'.codePointAt(2);

  console.log(result); // 45796
  console.log(typeof result); // number

  console.log('가나다'.codePointAt(3)); // undefined
  console.log(String.fromCodePoint(result)); // 다

  // 1. "가나다".codePointAt(2) 문자열 "가나다"에서 3번째의 코드 포인트를 구해 반환함
  // 2. 반환된 코드 포인트 타입은 number임
  // 3. 인덱스 번째에 문자가 없으면 undefined를 반환함
  // 4. codePointAt(2)의 값은 45796이고 fromCodePoint(45796)의 값은 "다"임
  ```

  <br>

  ## 3. normalize()

  - 대상 문자열을 파라미터에 지정한

    - 유니코드 정규화 형식으로 반환하여 반환

    ```tsx
    console.log('ㄱ'.codePointAt().toString(16)); // 3131
    console.log('ㅏ'.codePointAt().toString(16)); // 314f
    console.log('₩u{3131}₩u{314F}'); // ㄱ ㅏ
    ```

    ```tsx
    const point = '₩u{3131}₩u{314F}';

    console.log(point.noormalize('NFC')); // ㄱ ㅏ
    console.log(point.normalize('NFD')); // ㄱ ㅏ

    console.log(point.normalize('NFKD')); // 가
    console.log(point.normalize('NFKC')); // 가
    ```

```toc

```
