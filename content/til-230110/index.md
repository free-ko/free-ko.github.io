---
emoji: 🤔
title: 'TIL - 230110'
date: '2023-01-10 23:38:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: TIL
---

# Facts
`queryClient.preFetch`를 하는 과정 중에 에러가 발생하면 `catch`구문 안 로직이 실행되지 않았다.

<br/>

# Feelings
일단 당황스러웠다. 하지만 차분히 하나씩 찾아보았고, 팀원분들과 함께 분석하였다.

<br/>

# Findings
- `queryClient.fetchQuery`와 다르게, return 타입이 `Promise<void>`라는 사실을 알게 되었다.
- 그래서 `queryClient.preFetch` 대신에, `queryClient.fetchQuery`를 사용해서 에러가 발생했을 때, catch구문에서 원하는 로직을 작성할 수 있었다. 
- 또한 Catch 구문의 로직을 작동시키기 위해 fetcher 함수 내부에서 fetcher가 실패했을 때, `return throw new Error`와 `throw newError`는 다르다는 사실을 알게 되었다.
- 결론만 말하면 `return throw new Error` 일 경우에는 Catch구문에 들어가지 않습니다.
- return을 붙이면 에러의 값을 `Wrapping`해서 값을 return하기 때문에 Catch구문으로 가지 않게 된다.

<br>

### 참고
- [queryClient.prefetch 내용](https://tanstack.com/query/v4/docs/react/reference/QueryClient#queryclientprefetchquery)