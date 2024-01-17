---
emoji: 👋
title: 'JS 번들러 비교'
date: '2024-01-18 07:05:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## ✅ webpack

- 여러 개의 entry point로 의존성 그래프를 빌드하여, 각 모듈을 하나 이상의 모듈로 합침.
- JS 이외 파일(CSS, 애셋 파일 등) 처리 시 loader 필요
- parcel, rollup보다 code splitting 안전성 높음
- webpack-dev-server 지원 (live-reload 지원)
- 가장 역사가 깊으며, 레퍼런스가 많고 안정적이다
- tree-shaking을 ES6 모듈에서만 지원하기 때문에 SideEffects 항목 별도 기재 필요

  - { sideEffects: false } 를 표시하여 사용하지 않는 export는 제거해도 괜찮음을 webpack에게 알려줌
  - 즉 side effect가 발생해도, 해당 구문을 사용하지 않는다면 제거함

- 많은 서드파티를 필요로 하는 복잡한 애플리케이션 임

<br>

## 참고

```toc

```
