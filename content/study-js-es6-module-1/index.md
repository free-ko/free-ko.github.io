---
emoji: 👨‍💻
title: Module - 접근 및 바탕, 코드 형태, html 파일 작성 방법
date: '2021-12-12 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  Module - 접근 및 바탕, 코드 형태, html 파일 작성 방법
</h1>

<br>

## 1. 접근 및 바탕

- 일반 적으로 하나의 `js` 파일에 다수의 함수, 오브젝트를 작성함
- 한편, 하나의 파일에 작성하면 사용하지 않는 것도 `Compile`해야 하며 메모리를 차지하므로 비효율적
  - ex) 회원 가입(클릭 할 때만 필요한 것)
- `Module` 은 파일을 분리하여 필요한 시점에 필요한 것을 가볍게 사용하려는 목적으로 사용
- `Moduel` 을 파일이라고 할 수는 없지만 구조 측면에서보면 하나의 파일이 `Module` 임
  - 파일 확장자로 `mjs` 도 있음
    - ex) [JavaScript modules](https://v8.dev/features/modules#mjs)
- `Module` 파일 기본
  - 함수, 오브젝트를 분리하는 것이 바탕이므로 `Module` 파일은 되도록 `작아야` 함

<br>

## 2. Module 코드 형태

- `Moduel` 코드 형태

  ```tsx
  // export.mjs
  export function getPoint(id) {
    return id + 100;
  }

  // import.mjs
  import { getPoint } from './export.mjs';

  console.log(getPoint('code')); // code100
  ```

- `export` 키워드
  - 외부로 보내 줄 함수, 오브젝트를 선언함
  - `<script>` 에 `mjs` 파일을 작성하여 랜더링 하지 않음
- `import` 키워드
  - `export` 로 선언된 `mjs` 파일을 가져와서
  - 오브젝트, 함수를 사용 함

<br>

## 3. html 파일 작성법

- `html` 파일에 `module` 파일을 작성하는 방법
  - `<script type=module src="./import.mjs">`
  - 상대 경로, 절대 경로로 작성함
  - 상대 경로는 `/, ./, ../`로 시작해야 함
  - `"import.mjs"` 처럼 경로 없이 작성 불가, 추후 가능할 것으로 생각함
  - `defer` 가 디폴트이므로 `defer` 를 작성하지 않음

```toc

```
