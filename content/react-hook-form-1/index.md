---
emoji: 🤔
title: 'React Hook Form을 알게 되다.'
date: '2023-02-08 22:20:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: TIL
---

# 인트로
[저희 서비스](https://www.nextunicorn.kr/)는 전문투자자와 스타트업 관련 서비스를 제공해주는 플랫폼 입니다.
플랫폼을 이용하기 앞서, 먼저 스타트업 종사자 혹은 전문 투자자를 인증하는 페이지가 존재 합니다.
그 페이지에는 다양한 Form과 Validation이 존재합니다. 이번 스프린트에서 저는 기존에 React로 개발된 페이지를 Next로 마이그레이션 하는 작업을 맡게 되었습니다.
이번 스프린트을 통해 `React Hook Form`을 알게 되었고, 왜 `React Hook Form`을 선택해 개발하게 되었는지 정리하고자 이 글을 작성합니다.
또한 이번 스프린트를 통해 스스로 되돌아 보는 시간을 갖기 위해 글을 작성합니다.

<br/>

# 요구사항




### 참고
- [React Hook Form vs Formik 비교 번역글](https://free-ko.github.io/)
- [인프런 - React Form 컴포넌트 개발기](https://tech.inflab.com/202207-rallit-form-refactoring/colocation/)

```toc
```