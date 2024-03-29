---
emoji: 👋
title: '12월 1주 회고'
date: '2023-12-02 16:28:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Log
---

## 회고

### 업무 회고

- 내가 작성한 코드에 대해서는 누구보다 책임을 지고 이해하며, 설명할 수 있어야 함.
- 업무를 하면서 어려움에 직면했을 때, 스스로 마인드 컨트롤을 통해 냉정함을 유지 필요.
- 문제를 해결했으면, 다음부터 이 문제를 겪지 않기 위해서 시스템을 만들던 어떠한 방법을 만들어 놔야, 나중에 가서도 같은 실수를 반복하지 않음
- 개발 하는 것 보다 중요한 것은, 해당 개발을 왜 하는지 그리고 어떠한 정책을 기반으로 개발을 해야 하는지 그리고 백엔드로 부터 전달 받은 값들은 어떠한 값이며 이 값들을 통해 해당 정책 사항을 어떻게 개발해야할지 스스로 로드맵을 만들고 개발을 진행해야 함
- 위 내용의 연장선으로 FE에서 로직 개발할 때, BE로 전달 받은 데이터를 정확하게 이해해야 정책 상황에 맞게 BE 데이터를 가지고 정확한 분기문 처리를 할 수 있음. 만약 이해를 잘 하지 못한 채로 분기문을 작성하면, 그 하위에 있는 분기문 혹은 다른 로직들의 Flow가 엉켜 레거시가 될 수 있음
- 업로드한 이미지 파일을 Binary로 변경하는 방법

      ```ts

      // type은 다양할 수 있음
      new Blob([{파일객체}, { type: "image/png" }

      ```

- Swagger를 통해서 직접 API 호출을 할 수 있으며, 내가 개발한 로직이 정상적으로 API가 호출되지 않았을 때, 비교하면서 파악할 수 있음

<br>

## 마무리

이번 한 주도 어김없이 빡셌다. 특히 업무를 하면서 갑작스러운 상황에 대해 감정적으로 일일히 다 반응 했던 것 같았다. 그래서 체력적인 소모뿐만 아니라, 정신적인 에너지도 많이 소모되었던 것 같다.

앞으로는 업무를 대할 때, 나의 감정 보다는 이성으로 업무를 해결하는데 노력해야 겠다. 계속 인지하고 노력하다보면, 어떠한 상황에서 어떻게든 슬기롭게 해결할 수 있지 않을 까 싶다.

이 과정 중에는 다른 팀원분과 커뮤니케이션 하는 능력이 필요할 것 같다는 생각이 든다. 다시 한번 팀원분들과 의사소통 할 때에는 내가 이해한 내용을 바탕으로 정확하게 전달해야 한다는 게 기본이라는 것을 다시 한번 생각해 본다.

<br>

### 참고

- [MDN Blob 자료](https://developer.mozilla.org/ko/docs/Web/API/Blob/Blob)
- [MIME type 자료](https://developer.mozilla.org/ko/docs/Glossary/MIME_type)

```toc

```
