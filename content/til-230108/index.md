---
emoji: 🤔
title: 'TIL - 230108'
date: '2023-01-08 13:38:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: TIL
---

# Facts
이번 스프린트 개발 속에서 `GraphQL Codegen`를 사용하고 있지만, 작동원리를 제대로 알지 못해 기획의 추가 요구사항에 제대로 대응하지 못했습니다. 

<br/>

# Feelings
그래서 스스로 답답함을 느껴 팀원분들이 작성하시는 코드를 보면서 이해할려고 노력했습니다.

<br/>

# Findings
### GraphQL Code Generator 정의
- Generation of typed queries, mutations, subscriptions and typed GraphQL resolvers
- 즉, GraphQL에서 가져온 스키마 중에 우리가 필요한 Query에 맞게 타입을 생성해주는 역할

### graphql-codegen 의 config 내부 설정 요소
- `schema` : 재료(GraphQL로 가져온 타입들)
- `documents` : 레시피(어떤 타입을 추출할지 알려주는 것)
- `generates` : 결과물(필요한 타입들)

<br>

### 참고
[GraphQL Code Generator Doc](https://the-guild.dev/graphql/codegen/docs/config-reference/codegen-config)
