---
emoji: 👋
title: '4월 1주 회고'
date: '2023-04-02 12:55:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Log
---

## 한 주 느낀점
혼자서 사이드 프로젝트를 진행하면서, 회사에서 제공하는 디자인 시스템, 패키지, 그리고 모듈들의 가치를 깨달았습니다.
이 과정에서, 회사에서 제공해주는 코드 덕분에 빠른 개발을 할 수 있었다는 것을 깨닫게 되었습니다. 이에 대해 감사한 마음을 팀원들에게 전합니다.

프로젝트를 시작하기 전, ESLint, Husky, tsconfig 설정, 그리고 디자인 시스템 개발 등을 직접 셋팅하고 개발하는 과정에서,
당연하게 여겼던 코드들을 의심하고 이해하는 시간을 가졌습니다. 

혼자서 하나씩 이해하면서 고민하는 행위가 중요하다는 것을 깨달았습니다.
앞으로도, 당연하다고 생각하는 코드들에 대해서도 의심하는 습관을 가지도록 노력하겠습니다.

<br>

## 새로 알게된 내용 및 더 고민해야 할 부분
1. 구글 개발자 도구에서 Network 탭에 이미지가 있는 이유는, 브라우저가 API에서 가져온 데이터 중 이미지가 있다면, 이미지를 렌더링 하기 위해 해당 이미지 URL로 요청해서 데이터를 가져오는 것이지 React Query가 이미지를 캐싱하는 것이 아님
   - 이 때, Image URL의 유효성을 처리하는 로직을 따로 만들어야 한다는 것을 알게 됨
     ```jsx
        const Image = ({url}) => {
          const [error, setError] = useState(false);
          
          const handleClick = () => {
            setError(true)
          }    
     
          return (
            {error ? (
              <DefaultImg />
            ) : (
              <img 
                src={url} 
                onerror={handleClick}
              />
            )} 
            
          )
        } 
     ```
2. `CallBackRef` 사용법
   - React에서 사용되는 콜백 함수를 전달하여 DOM 요소에 접근하는 기술
   - 일반적으로 React에서는 `useState`와 같은 훅을 사용하여 상태 값을 관리하고, `useEffect` 훅을 사용하여 컴포넌트가 마운트/언마운트/업데이트될 때 일부 로직을 수행.
   - 외부 라이브러리를 사용해서 특정 DOM 요소를 조작해야 하는 경우 DOM 요소에 직접 접근해야 하는데, 이 때 `CallBackRef`를 사용하면 해당 DOM 요소에 접근할 수 있음.
   - `CallBackRef`는 `useRef`와 달리, DOM 요소에 직접 접근하기 위한 참조를 생성하는 것이 아니라, 콜백 함수를 전달하여 해당 요소에 접근함.
   - 스크롤 위치를 조작해야 하는 경우 `useEffect` 훅에서 콜백 함수를 호출하여 스크롤 위치를 조작할 수 있음(DOM 요소 조작)
    ```tsx
      const callBackref = useCallback(node => {
      // node는 div 요소를 가리킴.
        if (node !== null) {
          // 스크롤 위치를 200으로 설정.
          node.scrollTo(0, 200);
        }
      }, []);
    
        return (
          <div ref={callBackref}>
          {/* 내용 */}
          </div>
        )
    ```

4. `useInfiniteQuery`와 `useQuery`의 차이점
    - `useInfiniteQuery`
        - 무한 스크롤 또는 페이지네이션과 같이 페이지가 존재하는 경우 사용(순서와 페이지가 보장된 데이터)
        - 호출에서 반환된 데이터를 이전 호출에서 반환된 데이터와 연결하여 단일 배열로 반환
        - 이전에 캐시된 데이터가 있는 경우, 이를 사용하여 요청을 수행하지 않고 캐시된 데이터를 반환
        - 엘라스틱 서치의 리턴 데이터 타입(표준)에 관한 처리와 비슷
5. useErrorBoundary와 ErrorBoundary 개발 고민
    - QueryClient 기본 디폴트 옵션을 `useErrorBoundary=true`로 잡아 놓고 개발하면 useQuery를 통해 Fetch한 경우 에러가 발생했을 때, 최상한 ErrorBoundary에서 에러가 잡힘
    - 만약에 외부 에러 바운더리에서 에러를 공용으로 처리하는 경우가 아니라면, 개별적으로 `useErrorBoudary=false`를 해서 onError로 에러 처리 진행

<br>


### 참고
- [CallBackRef](https://legacy.reactjs.org/docs/refs-and-the-dom.html#callback-refs)
- [CallBackRef 관련 글](https://velog.io/@cnsrn1874/%EB%B2%88%EC%97%AD-callback-refs-%EC%82%AC%EC%9A%A9%EC%9C%BC%EB%A1%9C-useEffect-%EB%B0%A9%EC%A7%80%ED%95%98%EA%B8%B0)
- [useInfiniteQuery 관련 글](https://velog.io/@vanillovin/react-query-infinite-scroll)
- [에러 바운더리 관련 글](https://velog.io/@suyeon9456/React-Query-Error-Boundary-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0)

```toc
```
