---
emoji: 👋
title: '2월 2주 회고'
date: '2023-02-11 13:30:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Log
---

# ✏️ 배운 내용
- 외부`ReactSearchAutoComplete`를 리팩터링 및 테스트 코드 작성을 했습니다. 그리고 작성한 이 코드가 위치한 폴더는 `libs`입니다. 
  - libs의 역할은 외부 라이브러리를 관리하거나, 사내 프로젝트 사용에 용이하기 위해 랩핑을 통해 인터페이스를 제공하기 위한 장소입니다.(여기서 중요한 점은 libs의 해당 라이브러리를
  이해 하지 못한 채, 랩핑을 통해 인터페이스를 제공하게 된다면, 오히려 다른 팀원분들에게 혼란을 줄 수 있어 적절한 회의를 가진 후, 개발해야합니다.)
  - 만약에 사내에 사용하기 위한 라이브러리로 리팩토링 되어진다면 즉, 외부 라이브러리의 의존성이 사라지고 다른 팀원분이 사용하는 순간 `components`
  폴더로 이동되어 사용되어진다는 사실에 대해 알게 되었습니다.
  - 이 과정에서 많은 사람과 개발을 하기 위해서는 폴더의 이름 및 역할이 분명해야 개발의 혼란을 줄일 수 있음을 알게 되었습니다.
- 추가로 `modules` 폴더는 서버의 데이터 스키마와 필드에 의존하는 폴더라는 사실도 알게 되었습니다.
- [Schema.org](https://schema.org/) 규격에 맞게 검색엔진에서 해당 규격에 맞는 구조화 데이터를 크롤링 합니다. 그렇기 때문에 우리가 개발하는 사이트에 구조화된 데이터를 셋팅해야 검색 엔진에 제대로 노출이 된다는 사실을 알게되었습니다. [Next-SEO](https://github.com/garmeeh/next-seo)에서 제공해주는 `ArticleJsonLd`를 통해(구조화 데이터 타입 중 Article) 구조화 데이터 셋팅을 진행할 수 있었습니다.
   ```jsx
   import { ArticleJsonLd } from 'next-seo';
   
   const Page = () => (
   <>
   <h1>Article JSON-LD</h1>
   <ArticleJsonLd
   url="https://example.com/article"
   title="Article headline"
   images={[
   'https://example.com/photos/1x1/photo.jpg',
   'https://example.com/photos/4x3/photo.jpg',
   'https://example.com/photos/16x9/photo.jpg',
   ]}
   datePublished="2015-02-05T08:00:00+08:00"
   dateModified="2015-02-05T09:00:00+08:00"
   authorName={[
   {
   name: 'Jane Blogs',
   url: 'https://example.com',
   },
   {
   name: 'Mary Stone',
   url: 'https://example.com',
   },
   ]}
   publisherName="Gary Meehan"
   publisherLogo="https://www.example.com/photos/logo.jpg"
   description="This is a good description of this article."
   isAccessibleForFree={true}
   />
   </>
   );
   
   export default Page;
   ```
- React에서 구조화 데이터를 셋팅할 때에는 `React-Helemt` 컴포넌트 내부에 작성해서 진행했다.
   ```js
   <Helmet>
     <script type="application/ld+json">{`
       {
         "@type": "WebSite",
         "@context": "http://schema.org",
         "name": "${title}"
       }
     `}</script>
   </Helmet>
   ```
- 개발을 할 때, `타입을 먼저 잡고 개발`을 시작해야 함. 예를 들어 Props가 어떤 값이 들어올지 모르는 상황에서 타입을 먼저 설계하고 있지 않다가 Props가 많아 지게 된다면, 기존에 Props가 어떤 타입을 지정해야할지 모르게 됨. 또한 팀원분과 타입을 먼저 설계하고 개발을 진행하자는 코드 얼라인을 맞췄는데, 그렇게 개발을 하지 않는 것은 서로의 신뢰를 깨는 행위라는 사실을 배움.
- 재사용가능한 컴포넌트를 개발하는 과정에서 혼자서 개발하기 보다는 디자이너와 협의를 통해, 어떤 디자인이 지속적으로 유지되는 건지 또는 어떤 디자인은 변경 가능성이 많은지를 확인하면서 컴포넌트 내부의 `Default`로 제공하는 디자인을 지정해야 함
  - ex) ReactAutoCompleteSearch 컴포넌트를 제공할 때, 결과 UI(결과가 없을 때 = noResultRenderProps, 결과가 있을 때 = resultRenderProps, 로딩 중일 때 = loadingRenderProps) 중 어느정도 자유도를 줘야 할지 판단을 해야 합니다.
  - 컴포넌트를 나누는 이유는 각 컴포넌트의 관심사를 분리해야 하는 것. 그 중 `커링`을 통해, 컴포넌트 관심사를 분리하고 `Props 드릴링`을 방지하는 방법이 있음. 즉, 사용하는 쪽에서 굳이 알 필요 없는 값을 제거하는 방법
      ```tsx
      // A Component
      const A = () => {
          const [index, setIndex] = useState(0);
          const calClassName = (index) => (currentIdx) 
            => index === currentIdx ? 'selected' : '';
    
          return (
              <B handleClick={handleClick}>
          )
      }
    
      // B Component
      const B = ({ handleClick }) => {
          return (
              ['a', 'b'].map((item, index) => (
                  <div
                      onClick={handleClick(index)}
                  />
              ))
          )
      }
      ``` 

<br>

# 👍 마무리
개발을 한 다는 것은 단순히 코드를 많이 작성하는 것이 아니라, 갸벌운 80% 고민과 20% 코드가 개발임을 다시 한번 느낀다.

80% 고민 속에, <b>어떻게하면 재사용 가능하게 개발 할 수 있을까?, 어떻게 하면 팀원분들이 내 코드를 잘 읽히도록 할 수 있을까?, 이 코드가 과연 최선일까?
이 코드가 사용자에게 최적화 된 코드일까??, 내가 지금 막코딩하는 것은 아닐까?, 놓치고 있는 기획 요구 사항은 없나?</b> 등의 수만가지의 고민 끝에 나온 것이 코드여야 하는데,
자꾸만 고민보다는 손이 먼저 간 것 같다. 

물로 먼저 개발하고 다른 팀원분에게 빠르게 피드백 받는 것도 중요하다고 말씀해주신 팀원분도 있었다. 그것도 맞는 것 같다.
하지만 빠르게 피드백 받기 전에 최소한의 고민과 노력은 있어야 한다고 본다. 아무런 고민과 노력없이 피드백 받는 것, 피드백을 주는 사람과 피드백을 받는 사람에게 아무런 도움이 되지 못하는 행동인 것 같다.

그렇기 때문에 조급함 속에서도 차분히 고민과 노력을 하면서 개발을 진행하자. 다시 한번 고민 없는 코드는 그냥 죽은 텍스트에 불과하다는 사실을 다시 한번 깨닫는다.  




<br>

### 참고
[Schema.org](https://schema.org/)

```toc
```
