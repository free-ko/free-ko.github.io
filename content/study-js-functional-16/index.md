---
emoji: 👨‍💻
title: 함수형 프로그래밍 - 값으로써 Promise
date: '2022-02-12 15:10:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

# 🤫 '값'으로써 Promise

## 목표

- 값으로써 Promise의 의미를 알아보자
- 함수 합성 관점에서 Promise의 의미를 알아보자
- Kleisli Composition 규칙 관점에서의 Promise의 의미를 알아보자
- 위의 개념을 학습한 뒤에, reduce함수를 리팩토링 해보자

<br>

## 값으로서의 Promise 활용

- `go1` 함수가 제대로 작동될려면, 인자 `a`와 `f`가 동기적으로 값을 확인할 수 있어야 함
- 즉, 비동기 상황이 일어나지 않는(일급 값이 아닌) 값이 들어와야 함 = `Promise`가 아닌 값이 들어와야 함

```tsx
const go1 = (a, f) => f(a);
const add5 = (a) => a + 5;

go1(10, add5); // 15
```

<br>

- 만약 `go1` 인자 `a` 자리에 시간이 지난 후, 값이 들어오면 어떻게 될까?
- 정상적인 연산 불가

```tsx
const go1 = (a, f) => f(a);
const add5 = (a) => a + 5;

go1(Promise.resolve(10), add5); // [object Promise]5
```

<br>

- 그러면 어떻게 하면 위의 코드를 정상적으로 동작하게 할 수 있을까?

```tsx
const delay100 = (a) => new Promise((resolve) => setTimeout(() => resolve(a), 100));

const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));
const add5 = (a) => a + 5;

// Promise{<pending>} 값(15를 담아서)으로 나옴
go1(Promise.resolve(10), add5);

const result = go1(10, add5);
console.log(result); // 15

const resultPromise = go1(delay100(10), add5);
resultPromise.then((a) => {
  console.log(a); // 15
});
```

<br>

- go1함수를 일반 코드 평가와 Promise를 값으로 코드 평가 하는 함수를 동일한 상황에서 사용할 수 있도록 코드 수정

```tsx
const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));

const n1 = 10;
go1(go1(n1, add5), log); // 15

const n2 = delay100(10);
go1(go1(n2, add5), log); // 15
```

<br>

## 함수 합성 관점에서 Promise

- Promise는 비동기 상황에서 함수 합성을 안전하게 해주는 도구
- 비동기 값을 가지고 연속적인 함수 합성 실행을 할 수 있음(모나드)

```tsx
// 안전하게 함수 합성하는 도구 = 모나드
// f . g
// f(g(x))
```

- 모나드 = Box
- 밑에 코드 처럼 `g`함수에 안전한 인자가 들어올 수 있도록 하는 것이 모나드 개념임

```tsx
const g = (a) => a + 1;
const f = (a) => a * a;

log(f(g(1))); // 4

// 밑에 코드는 안전한 코드가 아님
log(f(g())); // NaN

// 함수 합성을 map함수를 통해 만들기
// 여기서 [1] Array 값은, 필요한 값이 아님
// 다시 말하면, 개발자가 특정 효과를 만들거나 값을 다룰 때 사용하는 도구이지
// 사용자 화면에 노출되는 실제 결론 값은 아님
// 여기서 실제 결론 값은 밑에 배열에 들어있는 '4'가 필요한 값임
// 즉, Array 상태로 HTML에 렌더링 하지 않음
[1].map(g).map(f);
```

<br>

- 밑에 `[1]` Array 값은, 필요한 값이 아님
- 다시 말하면, 개발자가 특정 효과를 만들거나 값을 다룰 때 사용하는 도구이지
- 사용자 화면에 노출되는 실제 결론 값은 아님
- 여기서 실제 결론 값은 밑에 배열에 들어있는 '`4`'가 필요한 값임
- 즉, Array 상태로 HTML에 렌더링 하지 않음

```tsx
const g = (a) => a + 1;
const f = (a) => a * a;

// 함수 합성을 map함수를 통해 만들기
console.log([1].map(g).map(f)); // [4]
```

<br>

- 그래서 밑에 코드 처럼 `forEach`함수를 통해 필요한 값을 추출함
- 이렇게 작성했을 때의 이점은 만약 배열 `[]`안에 아무 값도 들어오지 않는 나면 함수 합성을 하지 않음
- 하지만 `log(f(g()));` 함수는 인자에 값이 안들어와도, `NaN`이라는 값을 리턴 함
- 즉 `배열`을 사용함에 있어 함수 합성을 진행할 때 안전하게 함수 합성을 할 수 있음

```tsx
const g = a => a + 1;
const f = a => a * a;

console.log([1].map(g).map(f).forEach(r => console.log(r));  // 4
console.log([].map(g).map(f).forEach(r => console.log(r));   // 아무것도 없음
log(f(g()));  // NaN

```

<br>

- 그러면 Promise는 어떠한 값을 함수 합성으로 진행하는 가
- 위의 배열은 `map`을 통해 함수 합성하는 것처럼, Promise는 `then`을 통해 함수 합성을 진행함
- Promise는 비동기(대기)상황에서 안전하게 함수를 합성하기 위한 도구
- Promise는 resolve안의 인자가 있는지 없는지에대한 안전하게 함수 합성을 하는 것이 아니라,
- 비동기 상황(대기가 일어난 상황)에서 안전한 함수 합성을 하기 위해 사용

```tsx
const g = (a) => a + 1;
const f = (a) => a * a;

Promise.resolve(1)
  .then(g)
  .then(f)
  .then((r) => log(r)); // 4
Promise.resolve()
  .then(g)
  .then(f)
  .then((r) => log(r)); // NaN

new Promise((resolve) => setTimeout(() => resolve(2), 100))
  .then(g)
  .then(f)
  .then((r) => log(r));
```

<br>

## Kleisli Composition 관점에서의 Promise

- Promise는 Kleisli Composition를 지원하는 도구
- Kleisli Composition(Arrow) 함수 합성 방법은 오류가 있을 수 있는 상황에서 함수 합성을 안전하게 하는 하나의 규칙
- 예를 들어, 함수의 인자가 잘못 들어와 함수 안에서 오류가 발생하는 지, 정확한 인자가 들어왔더라도 외부에 의존하고 있는 함수가 외부의 상태때문에 무언가를 정확하게 전달할 수 없는 상황을 해결하기 위해서 `Kleisli Composition` 사용

```tsx
// f . g

// 양 변에 x값이 같다면 이 식은 항상 같음
// 그러나 실무에서는 왼쪽 g함수가 옳바른 값을 리턴해도
// 오른쪽 항의 g 함수 내부 코드 안 상태가 변했을 경우, 리턴 값이 달라질 수 있음
// 그래서 특정한 규칙을 만들어 안전한 합성을 만드는 것이 Kleisli Composition 함수 합성임
f(g(x)) = f(g(x))

// Kleisli Composition 규칙
// 만약에 오른쪽 g(x)에서 에러가 발생해도
// 왼쪽 f(g(x))도 같은 에러가 발생하게 하는 것
f(g(x)) = g(x),
```

<br>

## Kleisli Composition을 사용해야 하는 이유

```tsx
// 상태
const users = [
  { id: 1, name: 'aa' },
  { id: 2, name: 'bb' },
  { id: 3, name: 'cc' },
];

// id값 찾는 함수
const getUserById = (id) => find((u) => u.id == id, users) || Promise.reject('없어요!');

// 객체에서 Name을 추출해서 Name을 리턴함
const f = ({ name }) => name;

const g = getUserById;

const fg = (id) => f(g(id));

log(fg(2)); // bb'
log(fg(2) == fg(2)); // true
```

<br>

- 실무에서 users에 상태는 계속 변할 때 예시 : `users.pop()`
- 그렇기 때문에 f,g 함수가 안전하지 않음
- f는 객체에 `name`이라는 값이 있어야 하며, g는 객체 안에 `id`값이 무조건 있어야 함
- 이렇게 에러를 발생시키지 않는 규칙이 `Kleisli Composition` 임

```tsx
const users = [
  { id: 1, name: 'aa' },
  { id: 2, name: 'bb' },
  { id: 3, name: 'cc' },
];

const getUserById = (id) => find((u) => u.id == id, users) || Promise.reject('없어요!');

const f = ({ name }) => name;
const g = getUserById;
const fg = (id) => f(g(id));

// 사용자가 사용자 정보를 지웠을 경우
const r = fg(2);
console.log(r); // bb

users.pop();
users.pop();

const r2 = fg(2);
console.log(r2); // 에러발
```

<br>

## Kleisli Composition 사용

- 예외처리 같은 개념

```tsx
const users = [
  { id: 1, name: 'aa' },
  { id: 2, name: 'bb' },
  { id: 3, name: 'cc' },
];

const getUserById = (id) => find((u) => u.id == id, users) || Promise.reject('없어요!');

const f = ({ name }) => name;
const g = getUserById;

const fg = (id) =>
  Promise.resolve(id)
    .then(g)
    .then(f)
    .catch((a) => a);

fg(2).then(log); // bb

users.pop();
users.pop();

fg(2).then(log); // 없어요!
```

<br>

## go, pipe, reduce에서 비동기 제어

- 비동기를 값으로 다루는 Promise 성질을 이용해서 `go1`이라는 함수를 만들어서 동기상황과 비동기 상황을 대응 하는 함수를 만들었음

```tsx
const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));
```

- go, pipe, reduce는 함수를 연속적으로 사용하는 함수 합성에 대한 함수들임
- go, pipe함수에서도 비동기를 값으로 다루는 Promise를 이용해, 비동기적인 상황에서도 잘대응하는 함수를 만들 수도 있고
- kleisli Composition처럼 중간에 에러(reject포함)가 발생했을 때, 이후 대기중인 함수들을 실행하지 않게 할 수 있음

- 현재 밑에는 에러가 발생함
- 그러면 중간에 Promise가 와도 정상적인 작동을 하는 코드를 만들려면 어떻게 해야 할까?
- 또한 처음 시작 하는 값이 `Promise.resolve(1)` 일경우에는?
- 마지막으로 Promise 이후에 값들을 동기적으로 즉 하나의 콜스택에 작동할려면 어떻게 해야 할까?

```tsx
go(
  1,
  (a) => a + 10,
  a + Promise.resolve(a + 100),
  (a) => a + 1000,
  log,
); // [object Promise]1000
```

<br>

- go함수를 수정해보자
- go, pipe함수 내부에 `reduce`함수를 다루기 때문에 `reduce`함수를 수정하면 됨

```tsx
const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  } else {
    iter = iter[Symbol.iterator]();
  }

  return go1(acc, function recur(acc) {
    let cur;

    while (!(cur = iter.next()).done) {
      const a = cur.value;
      acc = f(acc, a);

      if (acc instanceof Promise) {
        return acc.then(recur);
      }
    }

    return acc;
  });
});

// 사용
go(
  Promise.resolve(1),
  (a) => a + 10,
  a + Promise.resolve(a + 100),
  (a) => a + 1000,
  (a) => a + 10000,
);

go(
  Promise.resolve(1),
  (a) => a + 10,
  a + Promise.reject('Error!!'), // 여기서  끝남
  (a) => a + 1000,
  (a) => a + 10000,
).catch((error) => console.log(error)); // Error!!
```

- Promise를 단순히 콜백지옥을 해결하는 용도로 사용하는 걸 넘어서
- 내가 원하는 시점에 함수 처리 및 에러 대응을 할 수 있음

<br>

## Promise.then의 중요한 규칙

- Promise.then으로 값을 꺼냈을 때는 반드시 Promise 값이 아님
- Promise가 중첩되어도 한 번의 `then`으로 꺼내서 사용 가능

```tsx
Promise.resolve(Promise.resolve(1)).then(function (a) {
  log(a);
});

new Promise((resolve) => resolve(new Promise((resolve) => resolve(1)))).then(log);
```

<br>
<br>

## 느낀점

단순히 비동기 상황에서 사용했던 Promise를 다양한 관점에서 Promise를 바라보는 시간을 가졌다.
Promise가 실무에서 너무나 중요한 것은 잘 알고 있었지만, 정말 제대로 사용하고 있는지에 대한 스스로 의심이 있었는데
이렇게 학습을 통해서 Promise의 사용 용도와 의미를 제대로 알게 되어 너무 기쁘다.
이제 실무에서 개발할 때 Promise에 대해 조금은 이해를 하며 개발 할 수 있겠다는 기대가 생겼다.

<br>

## 참고

```js
유인동님의 함수형 프로그래밍과 JS ES6+ 강의

```

```toc

```
