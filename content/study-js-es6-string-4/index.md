---
emoji: 👨‍💻
title: 길이 늘리기, 공백 삭제
date: '2021-09-21 00:00:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  padStart(), padEnd(), trimStart(), trimEnd()
</h1>

<br>

## 1. padStart()

- 첫 번째 파라미터 값 만큼 길이를 늘리고
  - 늘어난 끝에 대상 문자열을 설정한 후
  - 앞의 남은 공간에 두 번째 파라미터를 채움
- 두 번째 파라미터에 채울 문자열 작성

```tsx
console.log('ABC'.padStar(10, '123')); // 1231231ABC
console.log('ABC'.padStar(6, '123456')); // 123ABC
console.log('ABCDE'.padStar(3, '123')); // ABCDE
console.log('ABC'.padStar(6, length)); // 6
```

1. `console.log("ABC".padStar(10, "123"));` 10자리로 늘리고 8/9/10 번째에 "ABC"를 설정, 남은 7자리에 "123"을 왼쪽부터 반복하여 채움
2. `console.log("ABC".padStar(6, "123456"));` 6자리 끝에 ABC를 설정하면 3자리가 남음, 123456을 왼쪽부터 채우고 123이 채워짐
3. `console.log("ABCDE".padStar(3, "123"));` 전체 길이가 대상 문자열보다 작으면 길이를 줄이지 않고 대상 문자열을 반환
4. `console.log("ABC".padStar(6, length));` 두 번째 파라미터를 작성하지 않으면 남은 앞에 빈문자열을 채움

<br>

## 2. padEnd()

- 첫 번째 파라미터 값 만큼 길이를 늘리고
  - 늘어난 끝에 대상 문자열을 설정한 후
  - 뒤의 남은 공간에 두 번째 파라미터를 채움
- 두 번째 파라미터에 채울 문자열 작성

```tsx
console.log('ABC'.padEnd(10, '123')); // ABC1231231
console.log('ABC'.padEnd(6, '123456')); // ABC123
console.log('ABCDE'.padEnd(3, '123')); // ABCDE
console.log('ABC'.padEnd(6, length)); // 6
```

1. `console.log("ABC".padStar(10, "123"));` 10자리로 늘리고 1/2/3 번째에 "ABC"를 설정, 남은 7자리에 "123"을 왼쪽부터 반복하여 채움
2. `console.log("ABC".padStar(6, "123456"));` 6자리 앞자리에 ABC를 설정하면 3자리가 남음, 123456을 왼쪽부터 채우고 123이 채워짐
3. `console.log("ABCDE".padStar(3, "123"));` 전체 길이가 대상 문자열보다 작으면 길이를 줄이지 않고 대상 문자열을 반환
4. `console.log("ABC".padStar(6, length));` 두 번째 파라미터를 작성하지 않으면 남은 뒤에 빈문자열을 채움

<br>

## 3.trimStart()

- 문자열 앞의 공백 삭제

  ```tsx
  const value = '  123';
  console.log(value.length); // 5
  console.log(value.trimStart().length); // 3

  const split = 'a, b, c'.split(',');
  for (let value of split) {
    console.log(`${value}, ${value.length}`);
    console.log(value.trimStart().length);
  }

  // a, 1
  // 1
  // b, 2
  // 1
  // c, 2
  // 1
  ```

<br>

## 4. trimEnd()

- 문자열 끝의 공백 삭제

```tsx
const value = '123   ';
console.log(value.length); // 5
console.log(value.trimEnd().length); // 3
```

```toc

```
