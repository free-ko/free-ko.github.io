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

## 7.2 컬렉션 캡슐화하기

- 컬렉션 변수로의 접근을 캡슐화하면서 게터가 컬렉션 자체를 반환하도록 한다면, 그 컬렉션을 감싼 클래스가 눈치채지 못하는 상태에서 컬렉션의 원소들이 바뀌어버릴 수 있음
- 컬렉션 게터가 원본 컬렉션을 반환하지 않게 만들어서 클라이언트가 실수로 컬렉션을 바꿀 가능성을 차단하는 것이 좋음
- 내부 컬렉션을 직접 수정하지 못하게 막는 방법 중 하나로, 절대로 컬렉션 값을 반환하지 않게 할 수 있음
- 컬렉션에 접근하려면 컬렉션이 소속된 클래스의 적절한 메서드를 반드시 거치게 하는 것
- 또 다른 방법은 컬렉션을 읽기전용으로 제공할 수 있음
- 프락시가 내부 컬렉션을 읽는 연산은 그대로 전달하고, 쓰기는 모두 막는 것
- 가장 흔히 사용하는 방식은 아마도 컬렉션 게터를 제공하되 내부 컬렉션의 복제본을 반환하는 것
- 복제본을 수정해도 캡슐화된 원본 컬렉션에는 아무런 영향을 주지 않음
- 여기서 중요한 점은 코드베이스에 일관성을 주는 것. 컬렉션 접근 함수의 동작 방식을 통일해야 함

### 절차

1. 아직 컬렉션을 캡슐화하지 않았다면 변수 캡슐화하기부터 함
2. 컬렉션에 원소를 추가/제거하는 함수를 추가함
3. 정적 검사를 수행함
4. 컬렉션을 참조하는 부분을 모두 찾음. 컬렉션의 변경자를 호출하는 코드가 모두 앞에서 추가한 추가/제거 함수를 호출하도록 수정함
5. 컬렉션 게터를 수정해서 원본 내용을 수정할 수 없는 읽기전용 프락시나 복제본을 반환하게 함
6. 테스트함

## 예시

```ts
// before
class Person {
  constructor(name) {
    this._name = name;
    this._courses = [];
  }

  get name() {
    return this._name;
  }
  get courses() {
    return this._courses;
  }
  set courses(aList) {
    this._courses = aList;
  }
}

class Course {
  constructor(name, isAdvanced) {
    this._name = name;
    this._isAdvanced = isAdvanced;
  }

  get name() {
    return this._name;
  }
  get isAdvanced() {
    return this._isAdvanced;
  }
}
```

- 모든 필드가 접근자 메서드로 보호받고 있으나, 세터를 이용해 수업 컬렉션을 통째로 설정한 클라이언트는 누구든 이 컬렉션을 마음대로 수정할 수 있음. 캡슐화가 깨지는 것

```ts
// after
class Person {
  // setter 제거

  get courses() {
    return this._courses.slice();
  }

  addCourse(aCourse) {
    this._courses.push(aCourse);
  }

  removeCourse(
    aCourse,
    fnIfAbsent = () => {
      throw new RangeError();
    },
  ) {
    const index = this._courses.indexOf(aCourse);
    if (index === -1) fnIfAbsent();
    else this._courses.splice(index, 1);
  }
}
```

<br>

### 참고

- [리팩터링 2판 책](https://www.yes24.com/Product/Goods/89649360)

```toc

```
