---
emoji: 🤔
title: 'TIL - 230119'
date: '2023-01-19 22:15:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: TIL
---

# Facts
- `Provider`에 대한 개념을 잘 알지 못했다.

<br/>

# Feelings
- 팀원분들이 개발하신 코드가 왜 좋은지 몰라 부끄러웠다.

<br/>

# Findings
- 최상단 컴포넌트에 Wrapper로 `Provider`를 사용하게 되면 이미 Provider에서 인스턴스화된 값을 내부 컴포넌트에서 사용하면 된다.
- 즉, 하나의 인스턴스만 참조하고 역할을 분리했으며, 사용부에서 필요한 요소의 의존성을 주입해서 커스텀화하게 사용할 수 있다.
- 이러한 개발적인 상식을 알아야 동료들의 코드가 왜 좋고 나쁜지 공감할 수 있고, 피드백을 줄 수 있다는 사실을 알게 되었다.
- ex) React.Context, QueryClient.Provider

<br>

### 참고