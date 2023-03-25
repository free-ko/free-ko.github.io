---
emoji: 👋
title: '3월 4주 회고'
date: '2023-03-25 16:26:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Log
---

## 배운 내용
- DTO(계층간의 데이터 교환을 위해 사용하는 객체), Entity(실체), 단일 책임원칙(객체는 단 하나의 책임만 가져야 한다)
- 웹접근성을 향상시키는 방법 : 적절한 HTML 태그 사용, 이미지에 대체 텍스트 제공(alt 속성), 적절한 색상 대비 사용, 키보드 사용에 대한 고려(탭키), 웹 폰트 사용에 대한 고려, 자막 및 수화 제공
- 웹에서 GPU를 가속시키는 방법 : video나 canvas 태그를 사용하는 경우, 하드웨어 가속 플러그인을 사용하는 경우, 3d transform 속성이 존재하는 경우, 하드웨어 가속이 된 2D canvas 요소인 경우, backface-visibility attribute가 hidden인 경우, transition, animation 속성이 있는 경우, will-change를 설정한 경우 (opacity, transform, top, left 등..)
    - 가장 흔히 사용되는 방법은 translateZ(0) 옵션을 적용하는 것입니다. 또한 GPU를 가속시키기 위해 적용한 부분을 다른 DOM 요소와 별개로 렌더링되어야 합니다.
- 구조화된 데이터가 무엇인지, 구조화 데이터를 Next.js에서 적용하는 방법과 적용했을 때 어떠한 장점이 있는지 알게되었습니다.(https://free-ko.github.io/apply-articlejsonld/)

<br/>

## 생각
겨울이 지나 봄이 찾아왔습니다.

봄은 언제나 설레이는 계절입니다.

그러나 저에게는 봄이 설렘보다는 반성을 위한 계절로 기억됩니다.

작년을 돌아보며 후회한 일과 잘한 일을 생각하고, 올해는 어떻게 살아야 할지 고민하는 시간을 갖습니다.

올해는 작은 것이라도 제대로 이해하고 체화하는 노력을 하겠습니다.(때론 힘들고 지치면, 잠시 내려놓는 연습도 해야겠습니다.)

저만의 철학과 가치관을 바탕으로 살아가며, 외부 상황에 반응하지 않고 대응할 수 있는 사람이 되고자 합니다.

<br>


### 참고
- [GPU를 가속시키는 요소](https://ssocoit.tistory.com/259)
- [구조화된 데이터](https://developers.google.com/search/docs/advanced/structured-data/intro-structured-data?hl=ko)

```toc
```
