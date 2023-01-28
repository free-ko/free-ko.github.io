---
emoji: 👋
title: '1월 4주 회고'
date: '2023-01-28 14:36:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Log
---

# ✏️ 배운 내용
먼저 설날 연휴가 있다보니, 업무 보다는 개인 공부를 통해 배운 내용들을 적어본다.
1. Code Spliting
   - SPA 번들 사이즈가 커지면, 로딩 속도나 성능면에서 문제가 생기기 때문에 이것들을 여러개의 번들로 나누거나 동적으로 import 하는 기법
2. Loadable Components
   - 필요한 모듈만 import해서 성능을 좋게 하는 방법
   - React.lazy, React.suspense도 존재하지만, SSR까지 커버 가능
3. Stacking Context
   - 가상의 Z축을 사용한 HTML 요소의 3차원 개념
   - 즉, Z축을 사용할 때, 우선순위를 결정하는 개념 
   - 예를 들어 `z-index`를 비교하기 전에, 비교하는 Element의 부모에 `z-index`가 있는지 판단해야 하며, 부모의 `z-index`가 있다면 부모의 `z-index`와 비교해야 한다.
4. 좋은 함수란
   - 테스트 하기 쉽고, 파악하기 좋은 코드
   - 명시적 인풋과 아웃풋이 있다.
5. react-slick 와 keen-slider 차이
   - `react-slick`
      - React 기반으로 만든 carousel component이며 Slick.js 라이브러리로 만들어짐
      - React를 통해 carousel과 slider를 쉽게 만들 수 있도록 제공
   - `keen-slider`
      - 가볍고 반응형 slider 라이브러리이며, 바닐라 JS와 CSS로 만들어짐
      - React 의존성이 없음
      - JS 프레임워크와 순수 JS로 사용할 수 있음
6. ReactSearchAutocomplete를 가져와 프로젝트 내부에 맞게 커스텀해서 작업을 했다. 그러나 리팩토링하기 전에 테스트 코드를 작성하는 과정에서 ReactSearchAutocomplete 자체에 <b>수많은 상태와 액션 함수</b>가 얽혀 있음을 알게 되었다. 즉, 테스트 코드 작성을 하기 너무 어려웠다. 또한 통합테스트에 대한 정확한 이해가 없어서 팀원분들에게 물어봐 알게된 내용을 밑에 정리했다.
   - 현재 테스트 하고자 하는, `ReactSearchAutocomplete` 안에 있는 `SearchInput` 와 `SearchResults` 컴포넌트를 테스트 하는 것보다는 `ReactSearchAutocomplete` 컴포넌트를 테스트 하는 것이 더 좋습니다. 왜냐하면 `SearchInput` 와 `SearchResults` 컴포넌트 사이의 관계가 너무 밀집되어 있기 때문
   - FE 환경에서는 계산 테스트(유닛 테스트) 보다는, 액션에 대한 통합 테스트(E2E)가 더 중요
   - 계산에 대한 테스트 코드는 언제든지 변할 수 있지만, 통합테스트는 기획 요구사항과 맞닿아 있기 때문에, 잘 변하지 않음
   - 통합테스트를 하는 과정에서 MSW(API의 결과 or API 자체 Mocking)를 사용해서 특정 `액션`에 대한 원하는 요구사항(기획단계)을 테스트 하는 것
   - 특정 API가 성공 혹은 실패 할 때, 테스트 코드를 작성해야 함
   - 테스트 코드를 짤 때, <b>Given & When & Then</b> 의 시나리오로 테스트 코드 작성
   - 리팩토링의 중점은 액션을 밖으로 빼서 공통적으로 사용할 수 있도록 해야 합니다.

<br>

# 🤔 반성
익숙하지 않은 것들을 접할 때마다, 조급함이 먼저 일어나는 것 같다. <b>왜 그럴까? 무의식적으로 내가 남들보다 뒤쳐져 있다는 불안감</b>이 있어서 그런 것 같다.

사실 나만 그런 것이 아닌데, 모두가 다 그러한 것인데. 특히 요즘들어 멘탈 관리의 중요성을 많이 생각하게 된다. `일희일비`하지 않고 묵묵히 내가 해야 할 것들을 하자.
쉽지 않지만, 그렇게 노력해야 나를 잃지 않을 것 겉다. 

지금까지 일을 하면서, 나도 모르게 아무것도 아닌 것에도 `죄송합니다`라는 말을 남용한 것 같다. 정작 주변은 아무것도 아닌 데, 괜히 나 혼자 죄송하다고 이게 겸손이라고 크게 착각 한 것 같다.

<b>죄송하다고 표현할 때<b/>는 정말 내가 누군가에게 피해를 입혀서, 그 사람이 마음과 몸이 상할 때 인것 같다. 그게 아니라면 굳이 죄송하다는 표현을 하지 말자.

결국 별것도 아닌 것에 대해 죄송하다고 했던 표현들이, 지금까지 일으켰던 나의 자존감과 자의식을 갉아먹어버린 건 아닌가 싶다.

그리고 타인을 위해, <b>일을 잘 하고 싶다</b>는 순수한 욕망보다는, 새로운 나의 가능성을 확인하는 순수한 욕망을 가진채 살아가고 싶다.

<br>

### 참고
- [React.lazy](https://reactjs.org/docs/code-splitting.html#reactlazy)
- [loadable Components 사용 방법](https://medium.com/greendatakr/loadable-components-881e936aa8fa)
- [Staking Context](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context)
- [좋은 함수 만들기](https://jojoldu.tistory.com/697)

```toc
```
