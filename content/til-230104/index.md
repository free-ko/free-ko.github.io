---
emoji: ✏️
title: 'TIL - 230104'
date: '2023-01-04 20:52:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: TIL
---

# Facts
`Component`개발을 하는 과정에서 `export`와 `export default`를 사용하는 데, 상황에 따라 어떤 것을 써야 하는지 의문이 들었음. 

<br>

# Fellings
그래서 개발하면서 아무 생각없이 개발하고 있는 내 자신을 보면서, 올 해에는 이렇게 개발하면 안되겠다는 생각을 하게 됨.

즉, 의식적 노력을 동반한 개발을 해야겠다고 생각함.

<br>

# Findings

### export
- 한 파일 내에서 여러 변수들을 export하는 것이 가능
- import할 때에는 export할때 사용된 변수명을 동일하게 설정해야한다.
- 다른 이름으로 `alias`할때에는 `as`를 사용한다


<br>

### export default
- `import` 하는 곳에서 자유자재로 이름을 붙여 줄 수 있기 때문에, 위험
- 밑에 처럼 거대한 객체를 내보낼 때, 웹팩에서 `tree-shaking`이 안됨 즉, 웹팩 입장에서는 다 사용하는 줄 알고 다 번들링 진행(메모리 낭비)
    ```js
    export default {
      propertyA: "A",
      propertyB: "B",
    }
    ```
- `export default`도 웹팩의 `sideEffect: false` 옵션을 통해, `tree-shaking`을 해줄 수 있다.
  - `sideEffect`:사용하지는 않지만 번들에 포함되는 코드들
  - 직접적으로 사용하진 않지만, 다른 코드에 영향을 끼칠 수 있다고 판단되면 `sideEffect가 발생했다`고 한다.
이를 false로 표시해준다는 건, package와 dependency들이 sideEffect를 일으키지 않는다고 알려주는 것.
- 

<br>

### 참고
- https://iborymagic.tistory.com/113
- https://eundol1113.tistory.com/292
