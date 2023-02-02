---
emoji: 👨‍💻
title: 함수형 프로그래밍 - 스터디 8주차
date: '2023-02-02 10:26:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

# 💪 배운 내용
### 함수형 관점에서 시간(비동기) 바라보기
시간(액션) → 데이터로 생각해보기 → 중간에 분기 역할을 하는 것이 존재 하고 이러한 것을 모나드라고 한다. Promise의 구현된 코드를 파악해보자
1. `callback`

    ```tsx
    const fn = (callback) => setTimeout(() => { callback() }, 1000)
    ```
2. 함수형 관점에서 callback의 문제점은?
    - 위의 코드는 명시적 출력이 없기 때문에 액션임
3. `promise`로 만들게 되면 명시적 출력을 통해 값을 만들 수 있음
    - 액션(동작)을 값(데이터)로 만들 수 있음
    - 즉, 액션을 계산으로 그리고 계산으로 생각하는 것이 모나드 개념
4. **액션 → 계산 → 액션 → 계산 → 액션 → 데이터**와 같은 과정에성 중간에 시간과 같은 액션이 들어올 때 처리 하는 방법 중 하나가 `Promise`이다.(`try - catch`)
   
<br/>

# ⭐️ 실습
1. `Promise` 구현하기
    - 성공 Case와 실패 Case를 구분

 <br/>

# 🌈 정리
1. 우리는 액션을 계산으로 분리시키는 작업을 진행
2. 계산을 명시적 입력과 출력으로 바꾸는 리팩토링 과정을 진행
3. 계산들을 모아서 하나의 계산으로 만들고 나중에 인자를 넣는 Pipe 함수를 실습함
4. 제너레이터를 만들어서 순차적인 계산 함수를 실행하는 것이 아니라, 병렬적으로 계산 함수들을 실행시켜 실행 속도를 급격히 증가시키는 실습을 함
5. 계산들 안에서 시간(Promise)의 개념이 존재하는 Obserable(Array, Iterator, Promise)를 통해 3번의 Click 이벤트를 실행할 수 있음
—> `Obserable`를 통해 실무에 적용할 수 있도록 하는 것이 우리의 목표
   - ex) 백엔드로 부터 8초 이내의 데이터를 가져오지 못할 경우 retry를 3회 하고 데이터가 진짜 안오면 특정 데이터를 셋팅한다
   - ex) React Query - retry
6. 백엔드는 하나의 인풋이 존재하지만, 프론트 엔드 유저의 행동에 따라 다양한 인풋이 존재 하게 된다. 그러면 시간의 개념이 들어가게되면 이 때, `Obserable` 를 통해 처리 가능

<br/>

### 참고
- [함수형 프로그래밍 스터디](https://github.com/FECrash/FunctionalProgramming)
- [모나드와 함수형 아키텍처](https://teamdable.github.io/techblog/Moand-and-Functional-Architecture)
- [JS에서 Promise 관련 자료](https://medium.com/@linlinghao/async-code-from-vanilla-javascript-to-promises-to-async-await-fc440d9818dd)
- [Custom Promise 구현으로 프로미스 파혜치기](https://p-iknow.netlify.app/js/custom-promise)
- [자바스크립트의 Promise 직접 구현하기](https://blog.hyunmin.dev/14)
- [[JS] 자바스크립트 Promise 객체 직접 구현해보기](https://velog.io/@turtle601/JS-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-Promise-%EA%B0%9D%EC%B2%B4-%EC%A7%81%EC%A0%91-%EA%B5%AC%ED%98%84%ED%95%B4%EB%B3%B4%EA%B8%B0)
- [Oberable](https://github.com/tc39/proposal-observable/blob/master/src/Observable.js)

```toc
```
