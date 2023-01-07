---
emoji: 👨‍💻
title: Symbol.match
date: '2021-10-29 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 Symbol.match
</h1>

<br>

## 1. Well-Known Symbol

- Well-Known Symbol을 지원하는 String 메소드

  - `match()`
  - `replace()`
  - `search()`
  - `split()`

- `String.prototype.match()`

  - 문자열에 패턴을 매치하고
  - 매치된 결과를 배열로 반환

    ```tsx
    const result = 'Sports'.match(/s/);

    console.log(result); // [s]

    // 1. 문자열 "Sports"에 패턴 /s/를 매치합니다. 처음 S는 대문자이므로 매치가 되지 않지만 끝 s는 소문자이므로 매치가 됨
    // 2. 매치된 결과를 배열로 반환
    ```

<br>

## 2. Symbol.match()

- `Symbol.match()`

  - 개발자 코드를 함수 블록에 작성
  - `String.prototype.match()` 대신에 `Symbol.match()` 대신에 `Symbol.match()`가 실행됨

    ```tsx
    const sports = {
      base: 'ball',
      [Symbol.match](value) {
        return this.base.indexOf(value) < 0 ? '없음' : '있음';
      },
    };

    console.log('al'.match(sports)); // 있음

    // 1. 'ball'에 'al'이 있으면 '있음'을 반환하고 없으면 '없음'을 반환함
    // 2. 'al'.match(sports)
    // 3. sports 오브젝트에서 Symbol.match 작성 체크 없으면 String.prototype.match()를 호출하고 있으면 Symbol.match()를 호출 함
    // 4. Symbol.match(value)를 호출하면서 'al'를 파라미터 값으로 넘겨 줌
    ```

- `Symbol.match = false`

  - `//`를 패턴으로 인식하지 않고 문자열로 인식

    ```tsx
    try {
      '/book/'.startsWith(/book/);
    } catch {
      console.log('정규 표현식으로 처리');
    }

    let check = /book/;
    check[Symbol.match] = false;

    console.log('/book/'.startsWith(check));

    // 1. 파라미터 /book/을 패턴으로 처리 함, 정규 표현식을 사용할 수 없으므로 에러 발생
    // 2. check[Symbol.match] = false; 정규 표현식으로 인식하지 않도록 설정
    // 3. "/book/".startWith(check) 파라미터 check 값을 문자열로 인식 함
    // 4. endsWith()도 값음

    // 실행 결과
    // 정규 표현식으로 처리
    // true
    ```

- 메소드를 오버라이드 하는 것이므로 메소드의 시맨틱은 유지해야 함

```toc

```
