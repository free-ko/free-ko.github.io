---
emoji: 🔥
title: '1월 5주 회고'
date: '2022-01-30 18:42:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Log
---

<br>

# 책임

새해가 된지 어느덧 한 달이 지났다. 그런데 스스로 나를 되돌아보면 아직도 많이 부족한 것 같다.
그중에 말과 행동에 무게를 많이 두고 싶은데, 잘 그렇지 못하는 것 같다.
어떻게 하면 나의 말과 행동의 무게를 둘 수 있을까?

개인적으로는 `책임` 인 것 같다.
무언가를 할 때에 `책임`을 생각한다면 조금은 말과 행동에 무게를 높일 수 있지 않을까 생각을 해보았다.
나이가 한 살 한 살 먹으면서 자연스럽게 어른이 될 줄 알았는데...
매 순간순간 `책임`을 생각하며 노력해야 어른이 되지 않을까 생각해 본다.

소중한 사람들, 그리고 내가 해야 하는 업무에 `책임`을 조금 더 지며, 성장하는 한 해가 되었으면 좋겠다.

<br>
<br>

# 의식적 노력

최근 `React-Native` 프로젝트를 시작하면서 다양한 경험을 하고 있다.

스스로 놀랐던 점이, 단순히 기능 구현을 넘어 Doc에 제공한 대로 API를 사용하지 않았을 때, 발생하지 않은 문제들을 곰곰히 생각해보고, console창에 발생한 경고나 에러를 보면서, 어떻게 하면 성능 좋은 개발을 할 수 있을 지 의식적 노력을 하고 있었다.

그 중에 `FlatList`를 통해, 무한 스크롤 기능을 구현하면서 어떻게하면 성능적으로 또는 사용자 입장에서 좋은 개발을 할 수 있을지 고민하기 시작하였다.
먼저 Doc에서 제공하는 대로 코드를 작성했다.

```jsx
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => {
  const renderItem = ({ item }) => <Item title={item.title} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={DATA} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </SafeAreaView>
  );
};
```

그리고 사용자 화면에 보여지지 않는 데이터를 굳이 랜더링 하여 보여질 필요가 없어서 5개 정도만 보여질 수 있도록 하여 성능을 개선시켰다.

```jsx
const App = () => {
  const renderItem = ({ item }) => <Item title={item.title} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList initialNumToRender={5} .../>
    </SafeAreaView>
  );
};
```

<br>
<br>

# 무거움

개발을 배울 때마다 매번 `아직 나는 멀었구나...`라는 생각을 한다. 스스로 조급하지 말아야지라고 다짐하지만, 업무를 진행할 때마다 답답함을 많이 느낀다.
그럼에도 불구하고 차분히 임해야 한다는 것을 안다. 그러니 조급함이 올 때마다 심호흡하면서 실력을 제대로 쌓아가자.

<br>
<br>

### 도움 되었던 자료

```js
1. FlatList 성능 최적화 하기 -> https://maruzzing.github.io/study/rnative/React-Native-FlatList-%EC%B5%9C%EC%A0%81%ED%99%94-%ED%95%98%EA%B8%B0/
2. useCallback/useRef란 --> https://gist.github.com/ninanung/767ca722befa8b0affe51ffa0064296b
```

```toc

```
