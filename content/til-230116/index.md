---
emoji: 🤔
title: 'TIL - 230116'
date: '2023-01-16 21:19:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: TIL
---

# Facts
- 컴포넌트 사이 간격을 조절하는 과정에서 반응형일 때, 지정한 간격 값이 외부에 의해 변하는 문제에 직면했습니다. 

<br/>

# Feelings
- CSS를 중요시 여기지 않고 개발한 자신이 부끄러웠습니다.

<br/>

# Findings
- Flex 박스의 유연한 레이아웃을 가능하게 하는 요소는 `flex-grow`와 `flex-shrink`
- 그 중 `flex-shrink`는 `flex-wrap: wrap` 속성을 부여한 경우 적용되지 않음.
- `flex-shrink` 기본 값이 1이기 때문에 자동으로 외부에 의해 아이템이 축소될 수 있음.
- 축소되는 것을 방지 하기 위해 `flex-shrink:0`을 선언 하면 됨

<br>

### 참고