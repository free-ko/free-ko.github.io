---
emoji: 👨‍💻
title: String.raw, String.raw()
date: '2021-09-29 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  String.raw, String.raw()
</h1>

<br>

## 1. String.raw

- `String` 오브젝트에 속하지만
  - `Template`을 사용하므로 여기서 다룸
- `String.raw`에 이어서 `Template` 작성

  ```tsx
  const one = 1,
    two = 2;
  const result = String.raw`1+2=${one + two}`;

  console.log(result); // 1+2=3
  ```

  - 줄 바꿈을 문자로 처리

  ```tsx
  console.log(`one₩ntwo`);
  // one
  // two

  console.log(String.raw`one₩ntwo`);
  ```

  - 유니코드의 코드 포인트 처리

  ```tsx
  console.log(`₩u{31}₩u{32}`); // 12
  console.log(String.raw`₩u{31}₩u{32}`); // \u{31}\u{32}
  ```

<br>

## 2. String.raw()

- `raw`의 문자열을 문자 하나씩 전개 하면서 두 번째 파라미터 부터 조합하고 연결

  - 문자열

    ```tsx
    const one = 1,
      two = 2;

    console.log(STring.raw({ raw: 'ABCD' }, one, two, 3));

    // A를 반환 버퍼에 넣고
    // raw() 2번째 파라미터 값을 버퍼에 첨부 즉, one 변숫값인 1을 첨부하며 A1이 됨
    // B를 반환 버퍼 끝에 첨부
    // raw()의 3번째 파라미터 값을 버퍼에 첨부 즉, two 변숫값인 2를 첨부
    // 현재까지 모습은 A1B2
    // C를 반환 버퍼 끝에 첨부
    // 4번째 파라미터 값인 3을 버퍼에 첨부
    // D를 반환 버퍼 끝에 첨부, 5번째 파라미터는 값이 없어서 첨부하지 않는 것이 아니라 값 자체를 첨부하지 않음
    // 좁합한 결과를 반환
    // A1B2C3D
    ```

  - 배열

    ```tsx
    const rawValue = { raw: ['A', 'B', 'C'] };

    console.log(String.raw(rawValue, 1, 2, 3));

    // `A${1}B${2}C`
    // C 뒤에는 표현식이 없는 것으로 처리함 따라서 3이 첨부되지 않음
    // A1B2C
    ```

- 첫 번째 파라미터는 `{raw: 값}` 형태
- 두 번째 파라미터 부터 조합할 값 작성
  - `({raw: "ABCD"}, 1, 2, 3)`

```toc

```
