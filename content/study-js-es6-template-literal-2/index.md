---
emoji: 👨‍💻
title: tagged Template
date: '2021-09-28 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  tagged Template
</h1>

<br>

## tagged Template

- 템플릿에 함수 이름을 작성한 형태

```tsx
const one = 1, two = 2;
const show = (text, value) => {
  console.log(`${text[0] $(value)`);   // 1 + 2 = 3
  console.log(text[1]);                // ""
}

show `1+ 2 = ${one + two}`;

// 1. Template에서 문자열과 표현식을 분리 함
// 2. "1 + 2 = "가 문자열이고  ${one + two}가 표현식이며 펴악하면 3이 됨
// 3. show()함수를 호출 함
// 4. 문자열을 배열로 넘겨줌, 왼쪽에서 오른쪽으로 배열 엘리먼트로 추가, 마지막에 빈 문자열을 엘리먼트로 추가
// 5. 표현식은 평가 결과를 넘겨 줌
// 6. console.log(text[1]), 호출하는 함수에서 넘겨 준 빈 문자열, text[1]이 없으면 undefined가 출력됨
```

- 호출되는 함수를 `태그 함수`라고 부름
- `show()` 함수를 호출하면서
  - 문자열을 배열로 파라미터로 넘기고
  - 표현식 결과를 하나씩 파라미터로 넘김
- 호출하는 곳에서

  - 표현식을 평가한 값을 다수 넘겨 줄 때
  - 태그 함수에 대응하는 파라미터 이름을 작성한 형태

  ```tsx
  const one = 1,
    two = 2;
  const show = (text, plus, minus) => {
    console.log(`${text[0]} ${plus}`); // 1 + 2 = 3
    console.log(`${text[1]} ${minus}`); // 이고 1 - 2 = -1
    console.log(`${text[2]} ${text[3]}`); // 이다 undefined
  };

  show`1+2=${one + two}이고 1-2=${one - two}이다`;
  ```

- 문자열을 분리하면
  - `["1+2 = ", 이고 1-2 = ", "이다"]`
  - 3개의 배열 엘리먼트가 됨
- 표현식을 분리하면
  - `${one + two}`와 `${one - two}`
- show 태그 함수를 호출
- 태그 함수에 Rest 파라미터 작성

  ```tsx
  const one = 1, two = 2;
  const show = (text, ...rest) => {
  	console.log(`${text[0] ${rest[0]}}`);
  	console.log(`${text[1] ${rest[1]} ${test[2]}}`);
  }

  show `1+2 = ${one + two}이고 1 -2 = ${one - two}이다`;
  ```

- 문자열을 분리하면
  - `["1+2=", "이고 1-2=", "이다"]`
  - 3개의 배열 엘리먼트가 됨
- 표현식을 분리하면
  - `${one + two}`와 `${one - two}`
  - `[3, -1]`
  - show 태그 함수를 호출

```toc

```
