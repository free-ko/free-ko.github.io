---
emoji: 👋
title: '2월 3주 회고'
date: '2023-02-18 12:54:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Log
---

# ✏️ 배운 내용
- 리팩토링에 대한 개념을 다른 팀원분에게 물어보았고, 내가 놓치고 있던 부분을 밑에 정리 했다.
  - 기능은 변하지 않지만, 코드 구조가 변하는 것(불필요한 코드 제거, 유지 보수성에 용이한 코드)
  - 리팩토링 하기 전에 테스트 코드를 먼저 작성하는 것이 안전(테스트 코드 작성하지 못하는 상황에 자체 QA를 돌리면서 유연하게 리팩토링 하는 것도 방법)
  - 리팩토링을 진행하는 과정에서 코드를 고칠 때마다 더욱 이상해진다고 판단되면, 다른 사람들이 개발한 라이브러리 코드를 보거나, 리팩토링 책, 함수형 프로그래밍 책, OOP 관련 책을 보면 좋음
- `section` 태그
  - 내용이 서로 관계가 있는 경우 사용
  - section 태그 안에 article 태그가 여러개 들어 갈 수 있음
- `article` 태그
    - 내용이 독립적이고 스스로 설 수 있는 내용
    - article 태그 안에 관련 없는 article 태그가 올 수 없음
    - SEO 접근 향상에 `article` 태그가 영향을 줌
- `div` 태그 : 의미없는 태그
- SEO 측면에서 HTML 속성에 `lang="ko"`를 적용하는 것이 좋다.
  - lang 속성은 검색엔진이 특정 언어의 웹페이지를 검색할때 도움을 줌
  - 스크린리더기 사용자들이 어떤 음성 엔진을 선택해야 하는지 도움을 줌
- 공통적인 스타일을 밖으로 빼서 적용하는 방법
    ```jsx
      import styled from '@emotion/styled'
      import { css } from '@emotion/react'
  
      const Divide = styled.div`
        width: 100%;
        height: auto;
      `;  
    
      // 이렇게 공통 스타일을 적용하면, LoginDivide가 어떤 태그인지 알 수 없음.
      const LoginDivide = stylde(Divid)`
        color: 'blue';
      ` 
   
      const Text = css`
        font-size: 10px;
        font-weight: 'bold';
      `;
  
      // 이렇게 작성하게 되면 LoginText가 h1 태그라는 사실을 알 수 있음.
      const LoginText = styled.h1`
        ${Text};
        color: 'blue';
      `    
    ```
- 계산에 따라 디바이스벼로 스타일 컴포넌트를 적용하는 방법
  ```jsx
  export const calcAttr = (sizeProp, attribute) => css`
    ${attribute}: ${Array.isArray(sizeProp) ? sizeProp[0] : sizeProp}px;
  
    @media (max-width: 767px) {
      ${Array.isArray(sizeProp) && sizeProp[1] && `${attribute}: ${sizeProp[1]}px`}
    } 
  
    @media (max-width: 1207px) {
      ${Array.isArray(sizeProp) && sizeProp[2] && `${attribute}: ${sizeProp[2]}px`}
    }
  `
  
  // 사용 부
  const MarqueeWrapper = styled.article`
      overflow: hidden;
      text-align: center;
  
      ${({ $width }) => calcAttr($width, 'width')};
      ${({ $height }) => calcAttr($height, 'height')};
  `;
  
  <MarqueeWrapper $width={[100,80,60] $height={[100,80,60]} />
  ```
- 추상화 수준이 낮은 곳에 높은 것을 가져다가 사용해야 참조 순서를 지킬 수 있음 
  - ex) types 폴더는 추상화 수준이 매우 높기때문에 types 폴더보다 낮은 UIComponent 폴더에서 types 폴더를 가져다가 사용해야 함
  - eslint로 폴더 역참조 하지 못하게 막는 방법
    ```jsx
        'import/no-restricted-paths': [
         'error',
         {
           basePath: './src',
           zones: [
             { target:'./types', from: './UIComponents' }
           ],
    ```
- `cacheTime`
  - 특정 값의 만료와 관련된 것
  - 새로고침 했을 때, 서버에 Refetch 해야하는 시간 ex) cacheTime: 1000의 의미는 1초 후, 새로고침 진행시 서버에 refetch 진행
- `staleTime`
  - 특정 쿼리의 유효기간 만료와 관련된 것
  - query 결과를 stale 상태까지(기본 5초) cache로 유지하는 시간, 쿼리 결과가 stale 상태가 되어도 여전히 캐시 값을 리턴함 만약에 쿼리가 자동적으로 refetche 되었다면, 캐시 안에 있는 새로운 데이터를 리턴함
- `query instance`
  - query instance를 성생했다는 것은 useQuery 훅을 사용했다는 것
  - query instance는 React Query의 Cache에 의해 관리됨
  - query instance를 **Unmounting** 의 의미
    - query instance가 더 이상 컴포넌트에서 사용되어지 않을 때
    - Cache로 부터 제거 되었을 때 ex) `queryClient.removeQueries`(쿼리 키를 통해, 쿼리 인스턴스를 캐시에서 제거)로 쿼리 인스턴스를 수동으로 제거할 때
- Next.js에서 `pages/posts/[...all].tsx`는 /posts/1, /posts/1/2, /posts/1/2/3 와 같은 URL로 이동됨


<br>

# 👍 마무리
이번 주는 리팩토링에 대한 작업을 했습니다. 이 과정에서 팀원분들과 프로젝트 전반의 폴더 구조에 대해 논의 하면서, 프로젝트에 관한 전반적인 이해도를 높일 수 있었습니다.
또한 어떻게 하면 좋은 폴더 구조를 통해 팀원분들과 좋은 협업을 할 수 있을지 고민도 해보았습니다. 이 부분은 아직 까지 정답은 없다고 생각합니다. 지속적인 고민과 노력이 필요할 것 같습니다.

이번 한 주를 돌이켜 보았을 때, 여전히 배울 것이 많다고 생각됩니다. 다만 생각으로 그치지 않고 잘 정리해서 습득하는 연습에 노력을 해야 할 것 같습니다.

<br>

### 참고
- [SEO를 알아보자](https:velog.io/@jtwjs/SEO)
- [Emotion Introduction](https://emotion.sh/docs/introduction)
- [eslint 폴더 역참조 제어 설정](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-restricted-paths.md)
- React Query관련 참고 자료
  - https://react-query-v3.tanstack.com/guides/caching
  - https://medium.com/doctolib/react-query-cachetime-vs-staletime-ec74defc483e
  - https://velog.io/@yrnana/React-Query%EC%97%90%EC%84%9C-staleTime%EA%B3%BC-cacheTime%EC%9D%98-%EC%B0%A8%EC%9D%B4
  - https://devkkiri.com/post/e2b6fe00-df76-4b97-af2a-65bd3c79021b
  - https://blog.getliner.com/front-react-query-quiz/
  - https://2ham-s.tistory.com/407




```toc
```
