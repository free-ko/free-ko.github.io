---
emoji: 👋
title: '2월 4주 회고'
date: '2023-02-26 20:49:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Log
---

# ✏️ 배운 내용
- 아래와 같이 타입을 함께 반환해서 특정 상황에 맞는 로직을 작성 할 수 있음

```jsx
const getErrorText = (data) => {
  if (data.type === 'string') {
    return {
      type: 'string',
      text: 'string error'
    }
  }
  
  if (data.type === 'number') {
    return {
      type: 'number',
      text: 'number error'
    }
  }
}

const getData = async () => {
  const data = await fetchData();
  const errorObj = getErrorText(data);
  if (errorObj.type === 'string') {
    // string일 때, 처리
  }

  if (errorObj.type === 'number') {
    // nubmer일 때, 처리
  }
}
```
- `Next.js` 프로젝트에서 웹팩으로 번들을 할 때, 특정 폴더를 번들시 내부에 선언되지 않은 값을 접근해 번들 실패 에러가 발생 했음
- Next.js에서는 `optimization`이라는 설정을 통해 번들시 폴더 접근 순서를 정해줄 수 있음
  ```jsx
     module.exports = {
      optimization: {
     // 특정 기준에 따라 코드를 chunk로 분할하는 기능을 사용
      splitChunks: { 
        chunks: 'all',
        // 밑에 옵션을 사용하면, 동일한 chunk에 포함되어야 하는 모듈 그룹을 정의함
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            priority: 20,
            enforce: true,
          }
        },
      },
     },
   };
  ```
- 순수 UI Component는 외부 Props로 정보를 받아서 언제든지 확장이 가능함
  - 만약에 Link 컴포넌트 or A태그 속성에 넣어야 하는 값을 Props로 전달 받으면 UI Component이지만, 그렇지 않고 Component에 Link or A 태그 내부 값을 작성하면 순수 UI Component가 아님
- CSS 속성 중 `flex-shrink`를 적용하기 위해서는 부모 태그에 `display: flex`가 존재 해야 함
  - 애초에 Default 값이 `flex-shrink: 1;`이기 때문에 언제든지 외부 상황에 따라 영역 넓이가 줄어들 수 있음. 
- `map`함수를 통해, React 컴포넌트를 조건별로 랜더링하게 된다면, 추상화된 컴포넌트를 사용하면 좋습니다.
- 아래와 같이 컴포넌트를 리턴하는 객체에 대해 살펴보겠습니다. `<Horse />` prop은 return 시, 컴포넌트를 랜더링 해서 return합니다. `<Bird />` props은 사용하는 시점에서 컴포넌트를 랜더링 합니다.
    ```jsx
    // DataComponent가 return할 때, Horse를 그려서 return하기 때문에 순서가 얽힐 수 있습니다.
    // 그러나 새 처럼 return하면 새 컴포넌트를 그리지 않고, 리턴합니다.
    const DataComponent = () => {
        return {
            말: <Horse />,
            새: () => <Bird /> 
        }
    }
    
    const UIAnimal = () => {
        const data = DataComponent();
    
        return (
            {Object.entries(data).map(({말, 새}) => {
                <>
                    <UIComponent animalUI={<새 />} />
                    <UIComponent animalUI={말} />
                </>
            })}
        )
    }
    
    // Hook이 순서 보장이 안될 때
    const UIAnimal = () => {
        if (isFetching) {
            showToast();		
        }
    
        // 이렇게 되면 Hook 원칙은 최상위에서 훅이 호출되어야 하는데 위 if문 이 실행되기 때문에
        // 컴포넌트 '말'에서 Hook 에러가 발생할 수 있습니다.
        const data = DataComponent();
    
        return (
            {Object.entries(data).map(({말, 새}) => {
                <>
                    <UIComponent animalUI={<새 />} />
                    <UIComponent animalUI={말} />
                </>
            })}
        )
    }
    ```
- `import type`과 `import` 차이
  - `import type`
    - 오직 타입 체커를 위해서만 사용되고 JS를 Generate를 할 때 포함이 되지 않음
    - 타입체킹을 하기 위한 정보 타입만 오직 필요할 때 사용(런타임 구현 때 필요하지 않은 경우)
  - `import`
  - 가져온 타입은 JS를 Generate할 때 포함 됨
  - 값과 관련된 구현체와 타입 정보 둘다 가져옴
- 결론: 일반적으로 `import type` 을 사용함으로써 JS코드의 크기를 줄이고 성능 개선에 도움을 중
  ```tsx
  // 특정 컴포넌트에서 타입과 로직을 import 할 때, 조금 더 명시 적으로 타입을 구분 할 수 있고
  // 위에 처럼 TS코드를 -> JS로 만들 때, improt type은 애초에 포함시키기지 않음
  
  import { fetchCompany, type ResultCompany } from '~/features/company';
  ```
<br>

# 👍 마무리
체력을 키우자. 특히 사고하는 체력을 기르자. 삶을 살아 갈 때에도 일을 할 때에도 사고하는 힘의 중요함을 매번 느낀다. 그러니 매일 조금이라도 깊게 생각하는 연습을
의식적으로 하자. 

그리고 배움보다 중요한 것은 배움의 이유를 아는 것이라고 생각한다. 가끔은 내가 왜 배워야 하고 성장을 해야 하는지 돌아보는 시간도 가져 보면 좋을 것 같다.

<br>

### 참고

```toc
```
