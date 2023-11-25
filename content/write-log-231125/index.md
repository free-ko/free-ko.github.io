---
emoji: 👋
title: '11월 4주 회고'
date: '2023-11-25 19:58:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Log
---

## 회고

### 업무 회고

- PR과 커밋단위를 팀원분들이 읽기 좋게 해야 다른 팀원분들의 리소스를 잘 활용할 수 있다.(PR Description을 자세히 작성하면, 팀원분들이 PR 리뷰하기 좋다.)
- 함수명과 변수명을 깊게 고민하자. 특히 팀 내에서 통용되어지는 단어라던가 이해를 바탕으로 이름을 짓도록 노력하자.
- React Query에서 제공해주는 useMutation hook의 return 값인 `onSettled`를 통해, mutation이 성공하든 하지 않던 결과가 전달되기 때문에 onSuccess, onError에 공용으로 사용되어지는 함수 호출이나, 로직을 `onSettled`로 빼서 코드량을 줄일 수 있다.
- tailwindCSS를 사용할 때, 스타일 클래스 이름을 동적으로 구성하지 말아야 합니다. 그 이유는 tailwindCSS는 빌드 시점 즉, 컴파일링 되는 시점에서 동적으로 할당되는 className을 인식하지 못하고 stylesheet에서 사용하지 않은 CSS라고 인식하고 지워버림

      ```html
      // NO
      <div class="text-{{ error ? 'red' : 'green' }}-600"></div>

      // YES
      <div class="{{ error ? 'text-red-600' : 'text-green-600' }}"></div>
      ```

- main, staging이든 핫픽스 또는 QA 브랜치를 만들 때 기준은 develop에서 따서 진행해야함. 여기서 문제 해결을 하고 개발계 환경에 배포 후, 확인이 되었으면 staging을 거쳐서 main으로 핫픽스로 나가는 것이 안전함
- 팀내에서 정한 컨벤션에 대해 제대로 숙지하고 꼼꼼하게 해야 한다. 잦은 실수들이 모이게되면 팀내에 신뢰가 깍겨 일을 맡길 수 없게 된다. 항상 인지하고 있자.
- 코드를 단순히 격리한다고 해서, UI 컴포넌트가 되는 것이 아님, 정말 공통적으로 사용되는 컴포넌트여야 하고 해당 컴포넌트 안에 여백을 결정하는 컴포넌트가 있으면 안됨
- 기획을 거쳐 디자인 시안이 나왔을 때, 이해하지 못 한채로 개발하면 위험함 항상 질문하고 또 질문해서 이해한 뒤에 개발을 진행해야 함
- 상용 배포 일정 이외에 추가 상용 배포를 급작스럽게 해야 하는 상황이 발생했다면, 데브옵스 팀에서 양해를 구하고 진행하는 것이 순서임. 내가 급하다고 요청부터 먼저하는 것은 배려가 없는 팀워크를 유발시킴
- mdn web docs에서 제공하는 함수중 `split`을 사용할 때, 이모지 혹은 특정 폰트에 사용하게 되면 UTF-16 코드로 나누게 됨.

<br>

## 마무리

찬 바람이 부는 겨울 속에서 내 인생까지 찬 바람이 불지 않을려면, 매일 매일 나의 실력을 갈고 닦아야 한다. 또한 내가 하는 일에 대한 자신감을 키우기 위해서는 기본적으로 내가 하는 일에 대한 이해도를 높이기 위해 최선을 다해야 한다. 당연한 것인데, 이 당연한 것을 잊고 혹은 외면하게 된다면 나는 절대로 나아지지 않을 것이다. 그러니 항상 낮은 자세로 무엇이든 배울려고 노력하자. 이번 한 주 정말 많은 일들이 일어났지만, 무엇보다 귀감이 되는 내용을 생각해보았을 때 너무나도 당연한 내용들이였다.

정말 정신 똑바로 차리자.

<br>

### 참고

- [useMutation 공식문서](https://tanstack.com/query/v4/docs/react/reference/useMutation)
- [tailwindCSS 동적 ClassName 지양](https://tailwindcss.com/docs/content-configuration#dynamic-class-names)
- [tailwindCSS 동적으로 적용하는 방법](https://velog.io/@arthur/Tailwind-CSS-%EC%97%90%EC%84%9C-%EB%8F%99%EC%A0%81%EC%9C%BC%EB%A1%9C-%ED%81%B4%EB%9E%98%EC%8A%A4-%ED%95%A0%EB%8B%B9%ED%95%98%EA%B8%B0)
- [split 예외상황](https://stackoverflow.com/questions/4547609/how-can-i-get-a-character-array-from-a-string/34717402#34717402)

```toc

```
