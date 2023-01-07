---
emoji: 👨‍💻
title: 변수 선언 위치
date: '2021-09-01 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋 변수 선언 위치 정리
</h1>

<br>

## 💡 요약

- 모든 `JS` 파일에서 글로벌 오브젝트에 작성한 `var` 변수와 `let` 변수를 공유
- `블록` 안에 작성하면 공유하지 않음
- 변수를 어디에 선언하냐에 따라 저장 위치가 다름

<br>

## 1) 글로벌 오브젝트에 작성

- `Scope` : `Window`, `Script`, `Block`, `Local`에 변수가 저장됨

  ```tsx
  var global = 'var 변수';
  let global = 'let 변수';

  {
    let globalBlock = 'block 변수';
  }
  ```

  - `var 변수` : `window`에 설정됨, 공유가능
  - `let 변수` : `Script`에 설정됨, 공유가능
    - `window.sports = {}`처럼 의도적으로 작성하지 않아도 됨
    - `{ let 변수 }` : `Block`에 설정됨, 공유 불가능
      - 글로벌 오브젝트에서만 사용하는 로컬 변수로 사용

<br>

## 2) 함수에 작성

```tsx
function showLocal() {
  var localVar = 'var 변수';
  let localLet = 'let 변수';

  {
    let BlockLet = 'Block 변수';
  }
}
```

- `var 변수, let 변수` : `Local`에 설정됨
- `{ let 변수 }` : `Block`에 설정됨

<br>

```toc

```
