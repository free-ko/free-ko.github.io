---
emoji: 👋
title: '2024년 1월 4주차 회고'
date: '2024-01-27 20:12:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Log
---

## 회고

### 1. 업무 회고

1.  Nullish Coalescing Operator (`??`)와 Logical OR Operator (`||`)

    - ?? 연산자는 왼쪽 피연산자가 null 또는 undefined인 경우에만 오른쪽 피연산자를 사용
    - || 연산자는 왼쪽 피연산자가 false, 0, '', null, undefined, NaN과 같은 falsy 값일 때 오른쪽 피연산자를 사용

      ```js
      const defaultValue = 'defaultValue';

      // ?? 연산자
      const A = null;
      const B = undefined;

      const result1 = A ?? defaultValue; // 'defaultValue'
      const result2 = B ?? defaultValue; // 'defaultValue'

      // || 연산자
      const C = false;
      const D = NaN;

      const result3 = C || defaultValue; // 'defaultValue'
      const result4 = D || defaultValue; // 'defaultValue'
      ```

2.  API를 통해서 데이터를 가져올 때, `timeout`에 대한 처리를 사용자 관점에서 고려하자. 예를 들어서 20000 값을 주었을 때, 사용자 입장에서는 20초동안 API의 호출에 대한 응답값이 없을 경우 사용자는 데이터가 오지 안왔기 때문에 로딩 애니메이션을 보고 있어야 한다. 단순히 FE에서 API의 성능이 안 좋아, timeout 값을 20000으로 수정해서 처리하는 것은 UX관점에서는 완전한 해결을 한 것이 아니다. 그래서 항상 유저 관점에서 개발을 할 수 있도록 노력하자.
3.  PM, PD로 부터 전달받은 유저플로우 혹은 디자인 시안을 보고 개발 공수가 그려질 수 있도록 경험과 실력을 겸비해야 한다. 그래야 개발 단에서 일정관리를 명확하게 가시화를 하여 비즈니스 영역에서도 사용자에게 정확한 일정을 토대로 서비스를 선사할 수 있기 때문이다.
4.  항상 '왜?'를 가슴에 품고 내가 이해하지 못한 부분에 대해서는 집요하게 이해 할 수 있도록 노력해야 한다. 그것이 나뿐만 아니라, 팀 동료에게 정확한 의사소통을 하는데 도움을 줄 수 있기 때문이다.
5.  시뮬레이터에서 동작되는 웹뷰를 디버깅하는 방법
    - `webviewDebuggingEnabled={true}`는 React Native에서 사용되는 이 속성은 WebView 컴포넌트 내에서의 웹 콘텐츠 디버깅을 활성화하는 데 사용.
    - `webviewDebuggingEnabled={true}`를 설정하면 개발자는 크롬 개발자 도구(Chrome DevTools)를 사용하여 WebView 내부의 HTML, CSS, JavaScript 등을 검사하고 디버깅할 수 있음. 이를 통해 웹 콘텐츠의 레이아웃 문제를 해결하거나 JavaScript 코드의 오류를 찾는 등의 작업을 용이하게 할 수 있음
6.  AWS의 서버를 통해 유저 정보를 조회하는 쿼리를 실행 했을 때, 로컬에서 동작이 되었어도 문제가 발생한다면 이는 AWS의 컴퓨터 성능이 낮아서 발생한 이유일 수 있다.
7.  Redux Persist는 Redux의 확장 기능으로써 Redux 스토어의 상태를 브라우저의 로컬 스토리지나, 세션 스토리지에 저장할 수 있도록 해주는 도구. 이를 통해 새로고침을 했을 때, Redux 스토어의 상태를 유지할 수 있음
8.  TailwindCSS에서 이미지 비율을 1:1로 적용할려면 `aspect-square`를 적용하면 됨
9.  ErrorBoundary([React-Error-Boundary 라이브러리](https://github.com/bvaughn/react-error-boundary#readme))

    - Error Fallback 컴포넌트에서 만약 데이터 가져오는 훅이 있을 경우, 데이터를 가져오는 과정에서 에러가 나면 ErrorBoundary는 자식 컴포넌트의 에러만 감지할 수 있기 때문에 ErrorFallback 내부 컴포넌트의 에러를 잡지 못해서 해당 컴포넌트가 UI를 렌더링을 하는 경우라면 UI를 렌더링 하지 못할 수 있음

      ```jsx
      const AllCollectionsWithErrorBoundary = () => {
        const { reset } = useQueryErrorResetBoundary();
        return (
          <ErrorBoundary FallbackComponent={AllCollections.ErrorFallback} onReset={reset}>
            <Suspense fallback={<AllCollections.Skeleton />}>
              <AllCollections />
            </Suspense>
          </ErrorBoundary>
        );
      };
      ```

<br>

### 2. 일상 회고

일을하면서 불필요한 말을 많이 했던 것 같습니다. 다양한 상황 속에서 대응하기 보다는 반응을 해서 그런 것 같습니다. 굳이 하지 말아도 되는 말들을 해서, 많이 후회스러운 날들이 많았습니다.

조금씩 개선하기 위해서 말을 하기 전에 3초 생각하고 말을 하는 연습을 의식적으로 해볼려고 합니다.

2024년도 벌써 1개월이 다 가는 이 때, 그냥 주어진 시간 속에서 살아가는 것이 아닌, 0.001%라도 의식적으로 어제보다 나은 날을 만들기 위해 노력하는 자신이 되고 싶다는 생각을 해보며 이번 한 주 회고를 마무리해봅니다.

이번 한 주도 수고했습니다.

<br>

### 참고

```toc

```
