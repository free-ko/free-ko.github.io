---
emoji: 👋
title: '11월 2주 회고'
date: '2023-11-12 20:57:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Log
---

## 회고

### 1. Blob 객체란

1.  Blob(Binary Large Object)이란

    - 바이너리 형태로 큰 객체를 저장(이미지, 비디오, 사운등 등 멀티미디어 객체들에서 사용)
    - 4GB의 이진 데이터를 저장(DB에 직접 저장하는 것이 아닌, Large Object의 위치 포인터만 저장)
    - 데이터를 간접적으로 접근하기 위한 객체
    - 웹에서 사용되는 데이터 형식으로, 이진 데이터를 나타내며, 텍스트, 이미지, 오디오, 비디오 등 다양한 형식을 지원(파일 업로드, 이미지 프로세싱, 미디어 처리 등에 사용)
    - JS에서 Blob 객체는ㄴ 데이터 덩어리를 참조하는 용도로 사용
    - 메모리상의 데이터(바이트 배열)도 참조할 수 있으며 파일의 데이터도 참조할 수 있음
    - 웹브라우저는 메모리 또는 디스크에 Blob을 저장할 수 있으며, Blob은 비디오 파일과 같이 매우 커서, 메모리에 적재하려면 `slice()`를 활용하여 작은 조각으로 먼저 분리해야 할 수도 있음
    - Blob API 는 비동기 방식으로 동작

2.  Blob 객체 생성하는 방법
    `new Blob()` 생성자를 사용하여 Blob 객체를 만들 수 있으며, 이 생성자는 데이터와 해당 데이터의 `MIME`(인터넷에서 다양한 종류의 데이터를 표현하고 전송하기 위한 표준 방식) 타입을 인자로 받음

    - Blob 객체 생성자 구조

          ```ts
          // data: Blob 객체에 들어갈 데이터.
          // mimeType: 데이터의 MIME 타입을 나타내는 문자열.
          // - Blob 객체를 생성할 때 MIME 타입을 지정하는 것은 해당 데이터의 형식을 명시하는 중요한 부분.
          // - MIME 타입을 올바르게 설정하면 브라우저나 다른 소프트웨어가 데이터를 올바르게 처리하고 해석할 수 있음
          let myBlob = new Blob([data], { type: mimeType });
          ```

    - 데이터 타입

      - 문자열, ArrayBuffer, TypedArray, DataView, Blob, String 등 다양한 데이터 타입 사용 가능.

      - String은 UTF-8 바이너리로 변환됨.

    - 예시

      ```ts
      // 텍스트 데이터로 Blob 객체 생성
      let textBlob = new Blob(['Hello, World!'], { type: 'text/plain' });

      // 형식화 배열로 Blob 객체 생성
      let dataArray = new Uint8Array([0, 1, 2, 3]);
      let arrayBlob = new Blob([dataArray], { type: 'application/octet-stream' });
      ```

    - Blob 객체의 프로퍼티 및 메서드

      - size: Blob 객체가 참조하는 데이터 크기(바이트 단위).
      - type: Blob 객체가 참조하는 데이터의 MIME 타입을 나타내는 문자열.
      - slice(start, end, contentType): Blob 객체의 일부를 MIME 타입이 contentType인 새로운 Blob 객체로 반환.

    - 활용 예시

      ```ts
      // JSON 객체를 문자열로 Blob 객체 생성
      const jsonObj = { hello: 'world' };
      const jsonBlob = new Blob([JSON.stringify(jsonObj)], { type: 'application/json' });

      // 빈 Blob 객체 생성
      const emptyBlob = new Blob();
      ```

### CSV 파일 다운로드 로직 구현

- `responseType: blob`을 통해서 서버로부터 받아온 데이터를 `Blob` 객체로 처리해서 Blob 객체를 CSV 파일을 생성하고 다운로드하는 로직을 아래와 같이 구현
- `content-disposition`은 HTTP 헤더 중 하나로, 컨텐츠의 표현 방식과 전송 방법을 지정. 주로 파일 다운로드에 활용되며, 클라이언트에게 전송된 파일의 이름을 지정하는 데 사용됨

```ts
const downloadFile = (response: AxiosResponse<Blob, any>) => {
  const link = document.createElement('a');
  const url = window.URL.createObjectURL(response.data);
  const contentDisposition = response.headers['content-disposition'];
  const csvFileName = contentDisposition.split('filename=')[1];

  link.href = url;
  link.setAttribute('download', csvFileName);
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
```

### 2. 피드백을 받고 스스로 생각 정리

- 이제는 단순히 동작을 구현하는 것을 넘어서 협업하기 좋은 코드, 비즈니스 적으로 도움을 줄 수 있는 코드를 적용하자
- 순수한 컴포넌트 UI는 내가 생각할 때 어떤 역할만 해야 하는지 정보를 찾아보고 스스로 정리를 해보자 그래야 남들에게 설득을 할 수 있다.(팀원분들께서는 순수한 UI 컴포넌트를 만드는 목적부터 생각을 해봐야 한다고 말씀해주셨다. 순수한 컴포넌트 UI를 만드는 목적은 테스트 하기 위함인데 실제로 테스트를 하지 않고 있는 상황은 순수한 UI 컴포넌트를 만드는 이유가 없는 것과 마찬가지라고 이야기를 나누어주셨다.)
- 코드리뷰를 받기 위해서는 PR 단위와 커밋을 정말 잘 분리해야 한다.
- 정말 쉬우면서도 놓치기 쉬운 변수명과 함수명을 정말 여러번 고민하자.

<br>

## 마무리

갑자기 추워진 날씨 때문에 마음이 움추러든다. 이럴 때 일 수록 따뜻한 커피와 함께 따뜻한 위로를 스스로에게 주는 시간들이 필요하지 않을 까 생각해 본다.

<br>

### 참고

- [Blob 객체란](https://velog.io/@minh0518/Blob%EA%B0%9D%EC%B2%B4%EB%9E%80)

```toc

```
