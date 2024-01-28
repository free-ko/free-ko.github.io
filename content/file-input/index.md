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

<br>

## 참고

```toc

```
