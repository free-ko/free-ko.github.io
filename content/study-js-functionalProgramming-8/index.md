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

# # 🚩태오의 정리
- 2부에 들어서는 1급함수에서 `콜백`에서 `제네레이터`와 `이터레이션` 그리고 `Promise`에 이어 `Observable`를 학습
- JS에서 `시간`을 다루는 법에 대해서 학습
   - JS서는 즉시 값을 반환하지 못하고 일정 시간이 필요한 기능 ex) 파일 읽기나, 서버 요청 응답
   - `callback`을 통해서 다음과 같이 일을 처리 그러나 `액션 - 계산 - 데이터`의 관점에서 보면 위 함수는 `"액션"`이기에 좋은 함수가 아님
       ```tsx
       const asyncFn = (a) => {
        return setTimeout(() => {
          doAction(res)
        }, 1000)
       }
       ```
   - 차선으로 생각해볼 수 있는 것은 `callback을 함수의 인자`로 넣고, 외부에서 관리를 할 수 있도록 만듬
   - 이러한 방식을 통해 조금 더 나은 형태의 함수를 작성할 수 있음 그러나 이와 같은 방식도 **반환값이 없고 시간을 컨트롤 할 수 없기 때문**에 여전히 좋지 않은 함수
       ```tsx
       const asyncFn = (a, callback) => {
        return setTimeout(() => {
          callback(res)
        }, 1000)
       }
       asyncFn(res => doAction(res));
       ```
   - 순차적으로 시간을 관리하려면 아래처럼 복잡한 코드가 만들어짐

       ```tsx
       asyncFn(res => {
           asyncFn(res, res2 => {
               asyncFn(res2, res3 => {
                   doAction(res3);
               })
           })
       })
       ```
   - 결국 작업은 따로 실행하고, 순서대로 작성하려면? 콜백을 어떻게 코드를 작성해야하는지를 고민해야 함
- 액션보다 계산을, 계산 보다는 데이터를 활용하는 것이 좋은 방식이라고 배움
- callback방식을 통해 계산을 밖으로 빼내었지만, 여전히 callback과 시간은 액션이기에 액션 범벅으로는 좋은 코드를 만들 수 없음 결국 이러한 액션을 데이터로 만드는 방법을 고안함 이러한 패턴을 모나드 패턴이라고 함(Promise나, 액션을 객체로 감싸서 데이터로 다루려고 하는 방법)
- 우리는 `액션을 어떻게 감싸서 데이터로 만들 수 있는지`, `시간을 어떻게 다룰 수 있는지` , `이러한 작업들이 얼마나 코드를 더 낫게 만들어 주는지` 를 고민해야 함.
- 그래서 `Promise`를 직접 구현하는 시간을 갖음
   - `async - await`과 `Promise`가 함수형 프로그래밍 관점에서는 이게 어떤 의미를 가지는지 이해해보는 시간을 갖음
   - 즉,**액션을 감싸서 데이터로 관리하여 파이프라인 체인으로 연결하는 관점**이 얼마나 프로그램 작성을 더 좋게 만들어주는지 이해해봄(callback보다는 `then` 체인이 왜 더 나은 방식인지 이해하는 하는 시간을 갖음)
   - 추가로 Array의 method 체인이 얼마나 좋은 방법인지만 알아도 좋음
- Promise과 Iterator의 개념을 모두 결합한 `Observable`이라는 것을 알아봄
   - 여러개의 데**이터를 동기/비동기 관계없이 전파하면서 계산을 통해 원하는 결과를 만들어 내고 최소한의 액션을 결합**하는 함수형 프로그래밍의 궁극적 지향점
   - 실제로 현업에서는 Observable이나 Rx가 활용되는 빈도는 매우 낮음
   - 우리는 함수형 프로그래밍을 배우는 것이지 해당 라이브러리를 배우는 것이 아닌 만큼 라이브러리의 이해보다는 어떤한 관점에서 이러한 라이브러리가 만들어졌는지 어떠한 관점으로 프로그래밍을 하면 좋은지 아키텍쳐적인 관점에 더 맞춰서 학습 방향을 정함
   - `FLUX`와 같은 현대의 프론트엔드 상태관리 개념이 왜 함수형 프로그래밍 개념과 가까우며 현실에서 Rx가 아니라, 함수형 프로그래밍 감각으로 코딩을 잘 하기 위해서 어떻게 하면 좋을지에 대해서 논의함

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
