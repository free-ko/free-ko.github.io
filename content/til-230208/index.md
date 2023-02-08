---
emoji: 🤔
title: 'TIL - 230208'
date: '2023-02-08 19:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: TIL
---

# Facts
- 컴포넌트 개발을 진행하면서, 타입 설계를 작성하지 않고 개발을 진행해 개발의 방향이 잘 잡히지 않았다.

<br/>

# Feelings
- 타입 설계를 먼저 잡고, 개발을 하는 부분이 많이 익숙하지 않다. 그래서 스스로 답답하다.

<br/>

# Findings
팀원분께서 타입 설계와 다른 좋은 피드백을 주셔서, 여기에 정리해 좋은 조언을 체화하고자 한다.
   
1. 개발을 할 때, `타입을 먼저 잡고 개발`을 시작해야 합니다. 
   - 예를 들어 `Props`가 어떤 값이 들어올지 모르는 상황에서 타입을 작성하고 있지 않다가 `Props`가 갑자기 많아진다면, 기존에 작성한, `Props`가 어떤 타입으로 지정해야 하는지 모르게 됩니다.
   - 또한 개발 하기 앞서 팀에서 얼라인 맞춘 내용 중 <b>타입을 먼저 설계하고 개발을 진행</b> 있는데, 그렇게 개발을 하지 않는 것은 서로의 신뢰를 깨는 행위 입니다. 
2. 재사용가능한 컴포넌트를 개발하는 과정에서 혼자서 개발하기 보다는 디자이너와 협의를 통해, <b>어떤 디자인이 지속적으로 유지되는 건지 또는 어떤 디자인은 변경 가능성이 많은지를 확인</b>하면서 컴포넌트 안에서 Default로 제공하는 디자인을 셋팅해야 합니다.
   - ex) `Search` 컴포넌트를 제공할 때, 어떤 인터페이스(Props)를 열어서 자유도를 조절해야 합니다.
     ```jsx
      // 1. 결과가 없을 때 UI
      // 2. 결과가 있을 때 UI
      // 3. 결과가 나오는 로딩 중 UI
      const Search = ({ noResultRenderProps, resultRenderProps, loadingRenderProps}) => {
      
        return (
              { loadingRenderProps && <LoadingRenderUI /> }
              { noResultRenderProps && <NoResultRenderUI /> }
              { resultRenderProps && <ResultRenderUI /> }
        )
      }
     ```
3. 컴포넌트를 나누는 이유는 각 컴포넌트의 관심사를 분리해야 하는 것입니다. 그 중 `커링`을 통해, 컴포넌트 관심사를 분리하고 Props 드릴링을 방지하는 방법이 있습니다. 사용하는 쪽에서 굳이 알 필요 없는 값을 제거하는 것이 목적입니다.
```tsx
    // A Component
    const A = () => {
        const [index, setIndex] = useState(0);
        const calClassName = (index) => (currentIdx) => index === currentIdx ? 'selected' : '';
    
        return (
            <B handleClick={calClassName(index)}>
        )
    }
        
    // B Component
    const B = ({ handleClick }) => {
        return (
            ['a', 'b'].map((item, currentIdx) => (
                <div
                    onClick={handleClick(currentIdx)}
                />
            ))
        )
    }
```

<br>

### 참고
- [커링 - 모던 JavaScript 튜토리얼](https://ko.javascript.info/currying-partials)

<br>