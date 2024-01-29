---
emoji: 👋
title: 'File Input 다루는 법'
date: '2024-01-29 08:05:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## ✅ File Input 다루는 법

`<input type="file" />`

- 리액트 앱에서 다루기 어려운 것 중 하나가 바로 form.
- form 안의 input 값의 상태를 일일히 관리해주어야 하고, 각각 validation까지 해준다면 더욱 복잡해짐
- React Hook Form을 통해서 한번에 form 안의 모든 input 값들을 관리할 수 있음.
- 그러나 file 타입의 input 값을 가져오는 일은 쉽지 않음.

| 파일 타입의 인풋은 애플리케이션 계층에서 관리가 되어야 합니다. 파일 선택을 취소할 수도 있고 FileList 객체도 있기 때문입니다. (출처: react-hook-form 공식 문서)

- 위와 같은 이유로 react-hook-form을 사용한 다른 input들과 같은 방식으로 file input을 작성할 수 없었음
- 그리고 아래 이유로 value와 onChange 등을 이용하여 file input에 들어온 값을 바로 가져오기도 힘듦

| React에서 `<input type="file" />`은 프로그래밍적으로 값을 설정 할 수 없고 사용자만이 값을 설정할 수 있기 때문에 항상 비제어 컴포넌트임 (출처 - react 공식 문서)

- 실제로 React 공식문서에서 file input은 아래와 같이 ref를 걸어 비제어 컴포넌트로 사용하고 있음

```jsx
class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }
  handleSubmit(event) {
    event.preventDefault();
    alert(`Selected file - ${this.fileInput.current.files[0].name}`);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input type="file" ref={this.fileInput} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
```

- React Hook Form의 watch는 인자로 원하는 input 이름을 넣어주면, 해당 input의 값을 관찰하여 값이 바뀔 때 업데이트된 값을 즉시 알아챌 수 있음

```jsx
// Upload.tsx

const Upload = () => {
  const { register, handleSubmit, setValue, watch } = useForm<FeedToUpload>();
  const watchThumbnailImage = watch("thumbnailImage");

  return (
    // ...
    <FileInput
      fileName={watchThumbnailImage?.name}
      onChange={(event) =>
        setValue("thumbnailImage", event.currentTarget.files[0])
      }
    />
    // ...
  );
};
// FileInput.tsx
const FileInput = ({ fileName, ...options }: Props) => {
  return (
    <Styled.Root>
      <Styled.Label>
        <input type="file" {...options} />
        <span>파일 선택</span>
      </Styled.Label>
      <Styled.FileNameText>
        {fileName || "파일을 선택해주세요."}
      </Styled.FileNameText>
    </Styled.Root>
  );
};
```

<br>

## 참고

```toc

```
