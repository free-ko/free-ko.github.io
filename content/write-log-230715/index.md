---
emoji: 👋
title: '7월 3주 회고'
date: '2023-07-15 13:03:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Log
---

## 한 주 회고

## Error Boundary & Suspense

이번 스프린트에서는 하나의 컴포넌트 안에 Error Boundary와 Suspense를 감싸는 구조로 만드는 작업을 함께 진행했습니다.
이렇게 하게 되면, 컴포넌트 안에서 API 실패 및 로딩을 컴포넌트 마다 커스텀하게 관리할 수 있는 장점과 이번 스프린트의 요구사항에 적합했기에 적용하게 되었습니다. 이 과정에서 `react-error-boundary`외부 라이브러와 React 18버젼부터 제공하는 `Suspense` 기능을 함께 도입해 적용하게 되었습니다.

`react-error-boundary`의 가장 큰 장점은 React에서 Error Boundary를 재사용과 커스텀하게 관리 할 수 있다는 점입니다.
fallback 구조가 Suspense와 비슷해서 사용하기 편리 했습니다.

또한 useQuery와 함께 사용할 때 `useQueryErrorResetBoundary`를 통해 API를 재호출 할 때 함께 사용할 수 있어서 너무 좋았습니다.
참고로 useQuery를 작성할 때, 옵션으로 `useErrorBoundary: true & suspense: true`로 지정해야 아래와 같이 사용할 수 있습니다.

즉, 아래와 같이 코드를 작성함으로써 API 호출 상태에 따른 UI를 제공해서 사용자의 경험을 해치지 않도록 할 수 있었습니다.

```tsx
'use client';

import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query'

const { reset } = useQueryErrorResetBoundary()

const UIComponent = () => {
  return (
    <ErrorBoundary onReset={reset} fallback={UI.ErrorFallbackUI}>
      <Suspense fallback={<UI.Skeleton />}>
          <UI />
      </Suspense>
    </ErrorBoundary>;
  )
}
```

<br>

## 생각

사는대로 생각하는 것이 아니라, 생각한 대로 살 수 있도록 의식적으로 연습하자.

삶을 만들어 가는 것이다.

주어진 환경 속에서도 어떻게든 배울 수 있는 것들을 배워서 내것으로 만들어 나만의 삶을 만들어 가자.

비가 와서 그런가 생각이 많아지는 날들이 많다.

<br>

### 참고

- [React Suspense 소개](https://www.daleseo.com/react-suspense/)
- [React-Error-Boundary](https://www.npmjs.com/package/react-error-boundary)
- [useQueryErrorResetBoundary](https://tanstack.com/query/v4/docs/react/reference/useQueryErrorResetBoundary)

```toc

```
