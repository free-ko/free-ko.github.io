---
emoji: 👋
title: '10월 3주 회고'
date: '2023-10-14 12:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Log
---

## 한주 회고

### 1. 짜릿한 도커 이미지 줄인 경험

결론부터 말하자면 Next에서 제공하는 [standalone](https://nextjs.org/docs/pages/api-reference/next-config-js/output#automatically-copying-traced-files)과 [Docker 멀티 스테이지 빌드](https://docs.docker.com/build/building/multi-stage/)를 DevOps팀과 함께 협업해서 기존에 약 1GB가 넘는 도커 이미지 파일을 약 60MB 정도까지 줄였다.(약 94% 줄임)

<br>

Next Stand Alone

- Next에서 아래와 같이 `next.config.js` 파일에 코드를 실행하면, 자동으로 Production 배포 환경에 `node_modules`에서 필요한 파일들만 추출해준다.
- 그러면 `.next/standalone` 이라는 폴더가 생성되고, 이 폴더는 `node_modules`를 설치하지 않고도 자체적으로 배포할 수 있다.
- 또한 `next start` 대신 사용할 수 있는 최소한의 코드가 있는 `server.js` 파일도 생성이 된다. 이 때, `server.js` 파일 안에는 `public`과 `.next/static` 폴더를 복사하지 않는다.

  ```js
  module.exports = {
    output: 'standalone',
  };
  ```

<br>

Dockerfile - Multi-stage build

- 컨테이너 이미지를 만들면서 빌드 등에는 필요하지만, 최종 컨테이너 이미지에는 필요 없는 환경을 제거할 수 있도록 단계를 나누어 기반 이미지를 만드는 방법이다.

<br>

위 경험을 통해 단순히 용량을 줄이는 것을 넘어서 회사 비즈니스 지출 비용과 더 나아가 지구 온난화에 좋은 영향을 주어서 신기하면서도 보람찬 경험을 했다고 생각한다.

<br>

### 2. 커피쳇

이번 주에 팀 리더분과 함께 저녁을 먹으면서 이런저런 이야기를 했다.
그 가운데 개인적으로 인사이트가 있어 글을 작성하면서 반성도 하고 다시 한번 생각해보는 시간을 가져보고자 한다.

Q) 시니어 개발자가 되기 위해 필요한 것들은 무엇일까?

- 함께 일하는 팀원분들이 더욱 시너지를 낼 수 있도록 도와줄 수 있어야 한다.
- 빠르고 정확하게 문제를 파악하고 해결할 수 있어야 한다.
- 개발하고 있는 코드가 회사 비즈니스에 어떤 영향을 주는지 더 나아가 사용자에게 어떤 가치를 주는지 항상 고민해야 한다.
- 연차가 쌓일 수록 기본기가 중요하다(CS, NetWork 등)
- 협업을 하는 과정에서 정확하게 의사 전달을 해야 한다.(이 부분은 너무 중요하다는 사실을 이번에 매우 깨닫게 되었다. 그 이유는 잘못 의사 전달하면 다른 팀원분의 업무가 늘어날 수 있기 때문이다. 이렇게 되면 팀원분의 컨디션에 악영향을 미칠 수 있다는 생각이 많이 들었다.)
- 스스로 목표설정을 통해 동기부여를 할 줄 알아야 한다.

이렇게 시간을 내어서 인사이트를 주신 팀 리더분께 매우 감사함을 전하고 싶다.

<br>

### 마무리

결혼 일주일을 앞두고 최대한 일을 잘 매듭지고 가고 싶다. 정신이 많이 없지만 하나씩 잘 정리 정돈해서 결혼 이후에 더 멋있게 성장하고 싶다.

<br>

### 참고

- [Next 프로젝트 Docker 이미지 크기 줄이기](https://velog.io/@jadenkim5179/Next.js-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-docker-%EB%B0%B0%ED%8F%AC-%EC%9D%B4%EB%AF%B8%EC%A7%80-%ED%81%AC%EA%B8%B0-%EC%A4%84%EC%9D%B4%EA%B8%B0)
- [프론트엔드 로드맵 관련 글](https://steady-study.super.site/frontend-engineer-career-roadmap)
- [멀티스테이지 빌드란](https://kimjingo.tistory.com/63)

```toc

```
