---
emoji: 👋
title: 'Effective TypeScript 4장'
date: '2023-04-23 17:40:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## ✏️ 아이템 28: 유효한 상태만 표현하는 타입을 지향하기
1. 애플리케이션의 상태 표현하기
```ts
   interface RequestPending {
     state: "pending";
   }
   
   interface RequestError {
     state: "error";
     error: string;
   }
   
   interface RequestSuccess {
     state: "ok";
     pageText: string;
   }
   
   type RequestState = RequestPending | RequestError | RequestSuccess;
   
   interface State {
     currentPage: string;
     requests: { [page: string]: RequestState };
   }
```
   - 모든 상황 고려하기
   - 어떤 값들을 포함하고 어떤 값들을 제외할지 신중하기 생각하기



<br>

## 참고
- [이펙티브 타입스크립트 Study](https://github.com/pagers-org/Effective-TypeScript)
- [이펙티브 타입스크립트 책](http://www.yes24.com/Product/Goods/102124327)

```toc