---
emoji: 👨‍💻
title: Spread(스프레드)
date: '2021-09-06 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  let, const 사용 기준, spread, Array spread, String spread, Object spread, push(...spread)

</h1>

<br>

## 1. let, const 사용 기준

- `let` : 변경 할 수 있음
- `const` : 변경 할 수 없음
- `let`, `const` 변수의 시맨틱을 우선하여 사용

  - 값이 변경되면 `let`
  - 초깃값이 변경되지 않으면 `const`

  ```tsx
  // let, const 사용 기준

  const list = [10, 20];

  let value = [10, 20];

  values.push(30, 40);

  for (let k = 0; k < list.length; k++) {}

  const book = (param) => param + 10;
  ```

<br>

## 2. Spread

- Syntax: `[...iterable]`
- `[...iterable]`

  - `[...]`처럼 [ ] 안에 점`(.)` 3개를 작성하고
  - 이어서 이터러블 오브젝트 작성

    ```tsx
    const list = [21, 22];

    console.log([11, ...list, 12]); // [11, 21, 22, 12]

    const obj = { key: 50 };

    console.log({ ...obj }); // {key: 50}
    ```

- 이터러블 오브젝트를 하나씩 전개
- `{key: value}`의 `Object`가 이터러블 오브젝트는 아니지만 전개 가능

<br>

## 3. Array Speard

- `Spread` 대상 배열을 작성한 위치에 엘리머트 단위로 분리(전개)
- `Array Spread` 작성 형태

  ```tsx
  const one = [21, 22];
  const two = [31, 32];
  const result = [11, ...one, 12, ...two];

  console.log(result); // [11, 21, 22, 12, 31, 32[
  console.log(result.length); // 6
  ```

  1. `...one` : `one` 배열의 `[21, 22]`를 엘리먼트 단위로 분리(전개) 함
  2. `...two` : `two` 위치에 `two` 배열의 `[31, 32]`를 엘리먼트 단위로 분리(전개) 함

- 값이 대체되지 않고 전개

  ```tsx
  const one = [11, 12];
  const result = [11, 12, ...one];

  console.log(result); // [11, 12, 11, 12]
  console.log(result.length); // 4
  ```

  - 앞에 `11`과 `12`가 있지만 값을 대체하지 않고 `...`을 작성한 위치에 전개 함

<br>

## 4. String Spread

- `spread` 대상 문자열을 작성한 위치에 문자 단위로 전개
- `String Spread` 작성 형태

  ```tsx
  const target = 'ABC';

  console.log([...target]); // [A, B, C]
  ```

  1. `[...target];`
  2. `target`의 `"ABC"`를 문자 단위로 분리하여 `...target` 위치에 설정

<br>

## 5. Object Spread

- `Spread` 대상 `Object`를 작성한 위치에 프로퍼티 단위로 전개
- `Object Spread` 작성 형태

  ```tsx
  const one = { key1: 11, key2: 22 };
  const result = { key3: 33, ...one };

  console.log(result);

  // {key3: 33, key1: 11, key2: 22}
  ```

  1. `...one` : `one` 오브젝트의 프로퍼티를 전개

- 프로퍼티 이름이 같으면 값 대체

  ```tsx
  const one = { book: 10, music: 20 };
  const result = { book: 30, ...one };

  console.log(result); // {book: 10, music: 20}

  // const check = [...one];
  ```

  1. `{book: 30}`과 `{book: 10}`에서 프로퍼티 이름이 같으므로 30이 뒤에 작성한 `10`으로 대체됨
  2. `Object`는 이터러블 오브젝트가 아니므로 `[...one]` 형태로 작성하면 에러가 발생

<br>

## 6. Push(...spread)

- `push()` 파라미터에 `spread` 대상 작성
- 배열 끝에 대상을 분리하여 첨부

  ```tsx
  let result = [21, 22];

  const five = [51, 52];

  result.push(...five);

  console.log(result); // [21, 22, 51, 52]

  result.push(...'abc');

  console.log(result); // [21, 22, 51, 52, a, b, c]
  ```

  1. `result` 배열 끝에 첨부
  2. 배열이면 엘리먼트로 분리하여 첨부하고 문자열이면 문자 단위로 분리하여 첨부

```toc

```
