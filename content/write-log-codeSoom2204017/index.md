---
emoji: 🔥
title: '코드숨 7기 - 4주차 회고'
date: '2022-04-17 16:02:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

# ✅ Facts(사실, 객관)

### 1. Redux 

- Flux Architecture의 개념
- Redux 상태관리하는 이유와 장점
- Recat 프로젝트에서 Redux 사용 방법

### 2. 추가 공부

- JS 기본기가 많이 부족한 것 같아, 엘리님의 JS 기본 개념 강의를 수강하기 시작했다.

<br>

# 🙋‍♂️ Feelings(느낌, 주관)

- 이번 주는 개인적으로 몸 컨디션이 좋지 않았다. 또한 업무적으로 새로운 기능 배포 때문에 야근도 많았다. 그럼에도 코드숨 과제를 할려고 노력은 했으나, 조급한 마음때문에 과제의 의도를 잘 파악하지 못하고 답을 내기 급급했다. 또한 TDD에대한 학습 시간이 부족해 다른 수강생들이 작성한 코드를 많이 참고했지만, 과제를 진행하는데 많은 어려움이 있었다. 그래도 매일 퇴근 후, 짬을 내서 과제를 진행했다. 남들보다 많이 부족하지만 이번 과제 풀이 영상을 보면서 조금은 `TDD란 이런 것이구나`라는 감각이 생긴 것 같아 뿌듯하다.
- TDD를 하는 과정에서 사고력이 늘어나는 느낌이 든다.


<br>

# 😋 Findings(배운점)
- 로컬에서 테스트가 통과하더라도, Git 원격에서 파일명(대소구문)이 제대로 적용되지 않으면 CI에 문제가 생기는 경우 발생한다.(이럴 때 git mv 명령어를 통해 파일명 변경해야 함)
- `beforeEach`구문 안에 `afterEach` 사용하지 않고, 독립적으로 사용하자.
- `event`객체 전체를 전달하는 것이 아닌, 필요한 `value`를 하위 컴포넌트에게 전달(의존성 끊어주기 위해)
- 코드 블록을 아무생각 없이 감싸지 말자.
- 테스트 작성 후, 셀프 리뷰를 통해 테스트 구문이 영문법 적으로 맞는지 확인 하자.
- 테스트 작성 시 문맥 또는 전제 조건에 맞게 테스트 상황을 나누고 싶을 때, `context`를 통해 작성하자. ex) when, with id, without id 등
- `given2`를 통해 test해야 할 상태 값을 lazy하게 할당하면서 테스트 가능(`given2`은 `context` 아래에 써주는게 직관적임)

  ```js
  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      tasks: given2.tasks,
    }));
  });

  given2('tasks', () => [
    { id: 1, title: '아무 것도 하지 않기 #1' },
    { id: 2, title: '아무 것도 하지 않기 #2' },
  ]);

  given2('tasks', () => []);

  ```



<br>

# 👨‍💻 Affirmation(자기 선언)
- 코드를 작성할 때, 스스로 `왜`라는 질문을 자주 하자.
- PR을 보내기 전에 셀프리뷰를 진행하자.
- 남들과 비교하지 말고 나의 속도로 학습 하자.


<br>
<br>

### 📕 참고
[Flux Architecture](https://haruair.github.io/flux/docs/overview.html)

[리덕스 3가지 원칙](https://redux.js.org/understanding/thinking-in-redux/three-principles)

[Usage with React](https://redux.js.org/tutorials/fundamentals/part-5-ui-react)

[Mac용 디스크 유틸리티에서 사용 가능한 파일 시스템 포맷
](https://support.apple.com/ko-kr/guide/disk-utility/dsku19ed921c/mac)


```toc

```
