---
emoji: 👋
title: '리팩터링 7장'
date: '2023-09-13 21:33:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## 7.1 레코드 캡슐화하기

### 캡슐화

- 모듈을 분리할 때는 각 모듈이 자신을 제외한 다른 부분에 드러내지 않아야 할 비밀을 잘 숨겨야 함
- 이때 레코드 캡슐화, 컬렉션 캡슐화, 기본형을 객체로 바꿔 캡슐화하는 방법 등이 많이 쓰임
- 클래스를 이용하면 내부 정보를 숨길 수 있을 뿐 아니라 위임 숨기기를 통해 클래스 사이의 연결 관계를 숨길 수도 있음
- 알고리즘을 함수로 추출하여 구현을 캡슐화하는 방법도 있음

### 레코드 캡슐화

- 가변 데이터를 저장할 때는 레코드보다 객체를 선호
- 객체를 사용하면 어떻게 저장했는지를 숨긴 채 각각의 값을 서로 다른 메서드로 제공할 수 있음
- 레코드 구조는 필드 이름을 노출하는 형태와 필드를 외부로부터 숨겨서 원하는 이름을 쓸 수 있는 형태 두 가지로 구분할 수 있음
- 후자는 주로 라이브러리에서 해시(hash), 맵(map), 해시맵(hashmap), 딕셔너리(dictionary), 연관 배열(associative array) 등의 이름으로 제공

### 절차

1. 레코드를 담은 변수를 캡슐화
2. 레코드를 감싼 단순한 클래스로 해당 변수의 내용을 교체한 이 클래스에 원본 레코드를 반환하는 접근자도 정의하고, 변수를 캡슐화하는 함수들이 이 접근자를 사용하도록 수정
3. 테스트
4. 원본 레코드 대신 새로 정의한 클래스 타입의 객체를 반환하는 함수들을 새로 만듦
5. 레코드를 반환하는 예전 함수를 사용하는 코드를 4에서 만든 새 함수를 사용하도록 바꿈. 필드에 접근할 때는 객체의 접근자를 사용함
6. 클래스에서 원본 데이터를 반환하는 접근자와 원본 레코드를 반환하는 함수들을 제거함
7. 테스트
8. 레코드의 필드도 데이터 구조인 중첩 구조라면 레코드 캡슐화하기와 컬렉션 캡슐화하기를 재귀적으로 적용함

### 예시: 간단한 레코드 캡슐화하기

```ts
// before
const organization = { name: '에크미 구스베리', country: 'GB' };

result += `<h1>${organization.name}</h1>`; // 읽기 예
organization.name = newName; // 쓰기 예
```

- 레코드를 캡슐화하는 목적은 변수 자체는 물론 그 내용을 조작하는 방식도 통제하기 위함이므로, 레코드를 클래스로 바꿈

```ts
class Organization {
  constructor(data) {
    this._name = data.name;
    this._country = data.country;
  }

  set name(aString) {
    this._data.name = aString;
  }

  get name() {
    return this._data.name;
  }
}

const organization = new Organization({
  name: '에크미 구스베리',
  country: 'GB',
});
function getOrganization() {
  return organization;
}

getOrganization().name = newName;
result += `<h1>${getOrganization().name}</h1>`;
```

<br>

### 참고

- [리팩터링 2판 책](https://www.yes24.com/Product/Goods/89649360)

```toc

```
