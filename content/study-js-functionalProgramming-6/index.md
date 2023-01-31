---
emoji: 👨‍💻
title: 함수형 프로그래밍 - 스터디 6주차
date: '2023-01-31 10:11:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

# 💻 함수형 프로그래밍 복습
1. 프로그래밍
    - 데이터 = State
    - 데이터 → 데이터 → …(반복)
    - 데이터(State)를 관리하는 것
2. 함수형 프로그래밍
    - 상태의 변화를 바라보는 즉 변화시키는 함수를 분리
    - 상태를 변화시키는 것 = 액션
    - 상태를 변화시키지 않은 것 = 계산(계층을 나눔 - `비즈니스, 스키마, 유틸`)
        - 비즈니스, 스키마는 해당 도메인과 연관됨 즉, 좋은 유틸을 많이 만들어서 수정을 최소화 시켜서 개발을 진행해야 합니다.
        - 스키마 : 데이터 구조 ex) `TS, caclutateArg`
        - 비즈니스 : 요구사항 ex) 가격 15,000원 이하 상품을 찾아주세요.
        - ex) 좋은 유틸 - `reduce, filter, map` 등
    - JS가 함수형프로그래밍을 지원하는 것 중 하나는 `일급개념`(인자로 함수를 넣을 수 있고, 리턴을 함수로 할 수 있는 것)
    - DRY → 함수형프로그래밍에서 <b>반복적인 코드</b>를 어떻게 제거하는지 기법을 알아보자
3. 일급 함수(JS가 지원)
    - 입력값과, 반환값이 모두 들어올 수 있다는 것이 `일급` 입니다.(즉, 함수도 포함)
4. 불변성(JS는 지원해주지 않음)
5. 결국 `for, if`문을 쓰지 않고, 계산 함수를 사용

<br/>

# ✏️ 배운 내용
- 커링
  - 함수로 반환해서, 나중에 얻어지는 값을 나중에 인자로 넣을 수 있음
  - 지연평가를 가능함 `Redux MiddleWare`
    ```js
    const sum = (a, b) => a + b
    sum(3,5)
    
    const sum = (a) => (b) => a + b
    sum(3)(5)
    
    const sum3 = sum(3);
    sum3(5);
    ```
- 함수의 합성(체이닝 - Pipe)
  - Pipe와 커링이 합쳐진 형태
    ```js
    // 데이터를 먼저 넣지 않고 원하는 동작을 먼저 만들 수 있습니다.
    const fgz = pipe(f,g,z);
    
    // 나중에 데이터를 사용할 수 있습니다.
    const result = fgz(data);
    ```
- 커링과 함수의 합성을 통해, 유틸 함수를 만들어서 계산만 뽑아서 사용하는 계산 함수를 만들 수 있음
  ```js
    const add5 = (a) => a + 5;
    const dobule = (a) => a * a;
    const actions = pipe(add5, dobule);
  
    actions(5) // 100
  ```

<br/>

### 참고
- [함수형 프로그래밍 스터디](https://github.com/FECrash/FunctionalProgramming)

```toc
```
