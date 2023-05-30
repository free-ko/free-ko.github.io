---
emoji: 👋
title: 'Effective TypeScript 6장'
date: '2023-05-29 13:30:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## 아이템 45: devDependencies에 TS와 @types 추가하기

1. npm의 의존성 구분

   - dependencies: 현재 프로젝트 실행 시 필수적인 라이브러리
   - devDependencies: 런타임에는 필요없는 라이브러리
   - peerDependencies: 런타임에 필요하긴 하지만, 의존성을 직접 관리하지 않는 라이브러리

2. TS는 개발 도구일 뿐이고 타입 정보는 런타임에 존재하지 않기 때문에, TS와 관련된 라이브러리는 일반적으로 devDependencies에 속함
3. TS 프로젝트에서 고려해야 할 의존성

   - TS 시스템 레벨로 설치하기보다는 devDependencies에 넣는 것을 권장
     → npm install 시 팀원들 모두 항상 정확한 버전의 TS 설치 가능
   - 대부분의 TS IDE와 빌드 도구는 devDependencies를 통해 설치된 타입스크립트의 버전을 인식할 수 있음
   - DefinitelyTyped에서 라이브러리에 대한 타입 정보를 얻을 수 있음
   - @types 라이브러리는 타입 정보만 포함하고 있으며 구현체는 포함하지 않음
   - 원본 라이브러리 자체가 dependencies에 있더라도 @types 의존성은 devDependencies에 있어야 함

<br>

## 아이템 46: 타입 선언과 관련된 3가지 버전 이해하기

1.  TS 사용 시 고려해야 할 사항

    - 라이브러리의 버전
    - 타입 선언(@types)의 버전
    - 타입스크립트의 버전

2.  타입스크립트에서 의존성을 사용하는 방식

    - 특정 라이브러리는 dependencies로, 타입 정보는 devDependencies로 설치

3.  실제 라이브러리와 타입 정보의 버전이 별도로 관리되는 방식의 문제점

    - 라이브러리를 업데이트했지만 실수로 타입 선언은 업데이트하지 않은 경우

      - 타입 선언도 업데이트하여 라이브러리와 버전을 맞춘다
      - 보강 기법 또는 타입 선언의 업데이트를 직접 작성한다

    - 라이브러리보다 타입 선언의 버전이 최신인 경우

      - 라이브러리 버전을 올리거나 타입 선언의 버전을 내리기

    - 프로젝트에서 사용하는 타입스크립트 버전보다 라이브러리에서 필요로 하는 타입스크립트 버전이 최신인 경우

      - 타입스크립트의 최신 버전을 사용한다
      - 라이브러리 타입 선언의 버전을 내리거나, declare module 선언으로 라이브러리의 타입 정보를 없애 버린다

4.  @types 의존성이 중복되는 경우
    - ex) @types/bar가 현재 호환되지 않는 버전의 @types/foo에 의존하는 경우

<br>

### 참고

- [이펙티브 타입스크립트 Study](https://github.com/pagers-org/Effective-TypeScript)
- [이펙티브 타입스크립트 책](http://www.yes24.com/Product/Goods/102124327)

```toc

```
