---
emoji: 👨‍💻
title: Built-in 오브젝트 상속, Object 상속, Image 오브젝트 상속, Audio 오브젝트 상속
date: '2021-11-22 00:00:00'
author: 우기
tags: 블로그 github-pages gatsby
categories: JS
---

<br>

<h1 align="center">
  👋  Built-in 오브젝트 상속, Object 상속, Image 오브젝트 상속, Audio 오브젝트 상속
</h1>

<br>

## 1. Built-in 오브젝트 상속

- 빌트인 오브젝트를 상속받을 수 있음

  - 인스턴스가 빌트인 오브젝트의 특징을 갖게 되며 `this` 로 빌트인 오브젝트에 접근할 수 있음
  - `extends` 키워드로 구현함

    ```tsx
    class Point extends Array {
    	constructor() {
    		super();
    	}

    	getTotal() {
    		let total = 0;
    		for (const value of this) {
    			total += value;
    		};
    		retru total;
    	}
    }

    const obj = new Point();
    obj.push(10,20,30);

    console.log(obj.getTotal());   // 60

    // 1. 빌트인 Array 오브젝트를 상속받음
    // 2. 빌트인 오브젝트의 constructor를 호출 함, 생성하는 인스턴스의 __proto__.__proto__에 Array.prototype의 메소드가 설정됨
    // 3. obj가 Point 인스턴스이지만 Array 오브젝트를 상속 받았으므로 push() 메모스를 호출 할 수 있음
    // 4. 인스턴스 프로퍼티로 {0: 10, 1: 20, 2: 30, length:3}이 설정됨
    // 5. obj에 [10, 20, 30]이 있으며 obj.__proto__에 getTotal()이 있고 obj.__proto__.__proto__에 Array 오브젝트의 메소드가 있으므로 값과 메소드를 모두 사용할 수 있음
    // 6. this가 obj 인스턴스를 참조하여 Array [10, 20, 30]은 이터러블 오브젝트이므로 for-of로 반복 할 수 있음
    ```

- 코드 프로세스

  - `class Point extends Array {...}`
  - `const obj = new Point()`
  - `constructor() { super() }`
  - `obj.push(10, 20, 30)`
  - `obj.getTotal()`
  - `for (const value of this) {...}`

<br>

## 2. Object 상속

- `Object`는 클래스가 아니므로 다른 `Object`를 상속 받을 수 없지만 상속 받으면 `__proto__` 구조가 되는 것을 활용하여 상속을 구현 할 수 있음
- `Object` 상속

  - `Object.setPrototypeOf()`로 `__proto__` 구조를 만듬

  ```tsx
  const Book = {
    getTitle() {
      console.log('Book');
    },
  };

  const Point = {
    getTitle() {
      super.getTitle();
    },
  };

  Object.setPrototypeOf(Point, Book);

  Point.getTitle(); // Book

  // 1. Book과 Point는 Object임, getTitle()은 함수이며 각 Object에 있음
  // 2. Object.setPrototypeOf(Point, Book); Point에 getTitle()이 있고 Point.__proto__에 Book의 getTitle()이 있는 구조가 됨
  // 3. Point.getTitle(); Point 오브젝트의 getTitle()이 호출 됨
  // 4. super.getTitle(); super()가 아니라 super임
  // 5. super는 한 단계 아래의 __proto__를 참조함, 아래는 __proto__에 연결되어 있다는 뜻 Book 오브젝트의 getTitle()을 호출 함
  ```

<br>

## 3. Image 오브젝트 상속

- `Image` 오브젝트 상속 코드

  ```tsx
  class Home extends Image {
    constructor() {
      super();
    }

    setAttr() {
      this.src = '../../image/rainbow.png';
      this.alt = '집과 나무가 있고' + '무지개가 있는 모습';
      this.title = '무지개';
    }
  }

  const obj = new Home();
  obj.setAttr();

  documnet.querySelector('#show').appendChild(obj);
  ```

- `super();`
  - `Image` 오브젝트의 `constructor`를 호출
- `this.src`, `this.alt`, `this.title`
  - `Image` 오브젝트를 `this`로 참조
  - `Image` 속성에 값을 할당 함

<br>

## 4. Audio 오브젝트 상속

- `Audio` 오브젝트 상속

  ```tsx
  class Music extends Audio {
    constructor() {
      super();
    }

    setAttr(src, controls, muted, loop) {
      this.src = src;
      this.controls = controls;
      this.muted = muted;
      this.loop = loop;
    }
  }

  const obj = new Music();
  const src = '../../image/Beet5.png';
  obj.setAttr(src, true, true, true);

  doccument.querySelector('#show').appendChild(obj);
  ```

- `super()`
  - `Audio` 오브젝트의 `constructor`를 호출
- `this.src`, `this.controls`
  - `Audio` 오브젝트를 `this`로 참조
  - `Audio` 속성에 값을 할당함
  - 파라미터 값을 받아 속성값을 설정하면 범용 클래스로 사용할 수 있음

```toc

```
