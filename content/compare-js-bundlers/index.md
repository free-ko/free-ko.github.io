---
emoji: 👋
title: 'JS 번들러 비교'
date: '2024-01-18 07:05:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## ✅ Webpack

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

## ✅ Parcel

- zero-configuration

- 빠른 빌드 속도

  - parcel의 JS 컴파일러, CSS transformer, sourcemap은 성능을 위해 Rust로 작성되었으ㅁ
  - parcel의 JS 컴파일러는 SWC를 기반으로 트리셰이킹, 핫-리로딩 등을 지원
    - SWC는 Rust 기반
    - ES6 및 CommonJS 모듈 모두에 대해 tree-shaking을 지원
  - 워커 쓰레드를 사용한 병렬 빌드
  - 캐싱을 사용한 빠른 빌드 속도
    - 모든 것은 캐시됨(transformation, dependency resolution, bundling, optimizing 등)
    - 코드가 바뀌면 부분적으로 캐시를 무효화. → webpack보다 최대 20배 빠름 (캐시 사용 시)

- 플러그인 없이 JS, CSS, HTML, 파일 애셋, 그 외 많은 것들에 대한 지원을 기본으로 제공

  - JS 이외 파일 처리 시에도 별도의 loader 불필요
  - 앱 진입을 위한 HTML을 직접 읽을 수 있음
    -0 JS 엔트리포인트를 지정할 필요가 없음

- 필요하다면 Babel, PostCSS, PostHTML같은 트랜스파일러들을 기본으로 지원

  - .babelrc, .postcssrc 등의 파일을 발견하면 자동으로 변환(node_modules까지도)

- 동적 import 문을 사용해서 output 번들을 분할 할 수 있음
  - 이를 통해 초기 로드시 필요한 것들만 로드할 수 있음
  - dev에서는, 브라우저에서 요청이 있을 때까지 번들링을 지연할 수 있음
    - 실제 필요한 페이지만 로드하며, 적절하게 code split 시 dev server 실행 시간을 줄여줌
- HMR 기본 지원
  - React, Vue 사용 시에도 fast refresh 가능
- dev server 기본 제공
- 프로덕션 자동 최적화
  - tree shaking: 동적 모듈 import, 공용 모듈, CSS 모듈에 대해서도 적용됨
  - 최소화 및 난독화: JS, CSS, HTML, SVG minifier를 제공
  - 이미지 최적화 지원
- 코드 스플리팅
  - 앱의 여러 파트에서 동일한 모듈에 의존하고 있다면, 해당 모듈을 자동으로 별도의 번들로 분리해줌
  - CSS도 마찬가지로 지원
- 모든 output 파일에 대해 content hash를 제공함
- 브라우저 캐시에 유리

<br>

## 참고

```toc

```
