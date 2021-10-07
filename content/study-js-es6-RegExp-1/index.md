---
emoji: 👨‍💻
title: lastIndex
date: '2021-10-07 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  lastIndex
</h1>

<br>

## lastIndex

- 정규 표현식 사용 형태

  ```tsx
  const value = 'ABC';
  const obj = new RegExp('A', 'g');
  console.log(obj.text(value));

  const reg = /A/g;
  console.log(reg.test(value));

  // 1. const obj = new RegExp("A", "g"); RegExp 인스턴스를 생성함
  // A로 매치 대상에 매치 함
  // g 플래그는 모두 매치 함
  // 2. obj.text(value) obj에 설정된 A를 ABC에 매치하며 A가 있으므로 true를 반환
  // 3. const reg = /A/g 정규 표현식 리터럴을 사용한 형태 임
  // new 연산자를 사용하지 않았을 뿐, 1번과 같음
  ```

- 매치 시작 위치를
  - lastIndex 프로퍼티에 설정
  - 디폴트 값 : 0
- g 플래그를 사용하면

  - `lastIndex` 프로퍼티 위치부터 매치

    ```tsx
    const value = 'ABABAB',
      obj = /B/g;

    console.log(obj.test(value) + ': ' + obj.lastIndex); // true: 2
    console.log(obj.test(value) + ': ' + obj.lastIndex); // true: 4
    console.log(obj.test(value) + ': ' + obj.lastIndex); // false: 0

    // 1. obj.test(value) B가 ABABAB 있으므로 매치되며 true 반환
    // 2. obj.lastIndex lastIndex 값으로 2가 출력 됨
    // B가 매치된 인덱스는 1이며 1을 더한 값임
    // 2가 다음에 매치를 시작 할 위치

    // 3. obj.test(value), lastIndex 값이 2이므로 대상 문자열의 2번 인덱스부터 B를 매치 함
    // 4. obj.lastIndex lastIndex 값으로 4가 출력 됨
    // B가 매치된 인덱스는 3이며 1을 더한 값
    // 5. g 플래그는 매치가 되면 lastIndex 값에 1을 더함

    // 6. obj.test(value) 대상 문자열의 4번 인덱스부터 B를 매치하며 매치가 되지 않아 false가 출력 됨
    // 7. obj.lastIndex 매치가 되지 않으면 lastIndex 값은 0이 됨
    ```

- g 플래그를 사용하지 않으면

  - `lastIndex` 프로퍼티 값이 바뀌지 않음

    ```tsx
    const value = 'ABABAB',
      obj = /B/;

    console.log(obj.test(value) + ': ' + obj.lastIndex); // true: 0
    console.log(obj.test(value) + ': ' + obj.lastIndex); // true: 0

    // 1. obj = /B/ g플래그를 사용하지 않았음
    // 2. obj.test(value) B가 ABABAB에 있으므로 매치되며 true 반환
    // 3. obj.lastIndex lastIndex 값이므로 0이 출력 됨, 0은 디폴트 값으로 값이 바뀌지 않음, g 플래그를 작성하지 않으면 값이 바뀌지 않음
    // 4. obj.test(value) 매치가 되어 true가 출력됨
    // 5. obj.lastIndex lastIndex 값으로 0이 출력됨
    ```

  - lastIndex 값을 지정해도 적용되지 않고 0 번 인덱스부터 배치

    ```tsx
    const value = 'ABABAB',
      obj = /B/g;
    console.log(obj.test(value) + ': ' + obj.lastIndex); // true: 0

    obj.lastIndex = 2;
    console.log(obj.test(value) + ': ' + obj.lastIndex); // true: 2
    console.log(obj.test(value) + ': ' + obj.lastIndex); // true: 2

    // 1. true: 0 매치가 되었으므로 1이 출력 되어야 함
    // 2. obj.lastIndex = 2 lastIndex에 2를 설정했으므로
    // 3. obj.test(value) 2번 인덱스부터 매치를 해야 하지만, 0번 인덱스부터 매치 해야 함
    // 4. 2번 인덱스부터 매치하면 B가 없으므로  false가 반환됨
    ```

```toc

```
