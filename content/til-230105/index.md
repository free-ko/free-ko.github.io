---
emoji: ✏️
title: 'TIL - 230105'
date: '2023-01-05 22:51:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: TIL
---

# Facts
`ts-routes`를 사용하면서 왜 사용하는지 의문이 들었습니다.

<br>

# Feelings
막연하게 사용하고 싶지 않았습니다. 왜 사용하는지 궁금했습니다.

<br>

# Findings
가장 큰 이유는 직관적인 인터페이스 입니다. 
예를 들어 이동하고자 하는 path을 하드 코딩으로 아래와 같이 표현 할 수도 있지만, constructing을 사용해서 path를 표현 할 수 있다는 사실을 알게 되었습니다.
  ```js
    path: 'insight/company/12341234'
    path: insightRoutes.company({ id: '12341234' }) 
  ```
또한, 공식문서에서도 <b>강력한 형식의 매개 변수화된 라우팅 경로를 구성하기 위한 도구이며, 하드 코딩된 문자열을 경로로 전달하는 것을 방지하는데 도움을 주는 라이브러리</b>라고 소개되어 있습니다.

<br>

### 참고
- [ts-routes 공식 문서](https://github.com/leancodepl/ts-routes)
