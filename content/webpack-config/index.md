---
emoji: 👋
title: 'webpack config 설정'
date: '2024-01-07 11:19:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## ✅ webpack dev prod config 분리

- development와 production의 빌드 목표는 서로 다름.
- development에서는 강력한 소스 매핑, localhost 서버에서는 라이브 리로딩이나 HMR(Hot Module Replacement) 기능을 원함.
- production의 목표는 로드 시간을 줄이기 위해 번들 최소화, 가벼운 소스맵 및 에셋 최적화에 초점을 맞춰야 함. 공식 문서에서는 webpack 설정을 분리하여 작성하는 것을 권장하고 있음
- dev와 prod에서 공통으로 사용하는 설정들은 `webpack.common.js`에 작성하고, webpack-merge를 사용하여 common의 설정 내용을 dev와 prod에서 확장하여 사용할 수 있음

<br>

## 참고

```toc

```
