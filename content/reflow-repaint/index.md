---
emoji: 👋
title: 'Reflow와 Repaint 차이'
date: '2023-06-04 16:32:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: TIL
---

## 브라우저 렌더링 과정(요약)

1. DOM + CSSOM
   - 웹 브라우저 화면을 그리는데 필요한 리소스(HTML, CSS)를 다운로드 하여 브라우저가 이해할 수 있는 형태(관계 트리)로 변환하는 과정
2. 레이아웃
   - 화면 구성 요소의 위차나 크기를 계산하고, 해당 위치에 요소를 배치하는 과정
3. 페인트
   - 화면에 배치된 요소에 색을 채워 넣는 과정(이때, 레이어를 분리해서 작업)
4. 컴포지트
   - 페인트 단계에서 쪼개 놓는 레이어를 합치는 과정

<br>

## Reflow

- 브라우저 렌더링 `주요 과정`을 재 실행하는 과정
  - CSSOM과 레이아웃을 재설정 해야 하는 상황일 때, 브라우저 랜더링 주요 과정이 재 실행
- 리플로우 발생시키는 CSS 속성
  - position, display, width, float, height, font-family, top, left, font-size, font-weight, line-height, margin, padding, border 등

<br>

## Repaint

- 브라우저 렌더링 과정 중 `일부`를 재 실행하는 과정
  - CSSOM만 재설정 해야 하는 상황일 때, 브라우저 랜더링 일부 과정이 재 실행(레이아웃 과정 생략)
  - 레이아웃 과정을 생략하기 때문에 리플로우 보다 조금 빠름
- 리페인트 발생시키는 CSS 속성
  - background, background-image, background-position, border-radius, border-style, box-shadow, color, line-style, outline 등

<br>

## Reflow, Repaint 피하는 방법

- `transform, opacity`와 같은 CSS 속성 사용
  - 이러한 속성을 사용하면 해당 요소를 별도의 레이어로 분리하고 작업을 GPU에게 위임하여 처리함으로써 레이아웃 단계와 페인트 단계를 건너 뛸 수 있음 → 하드웨어 가속
  - 참고
    - `transform: translate()`
      - 처음부터 레이어를 분리하지 않고 변화가 일어나는 순간 레이어를 분리
    - `transform: translate3d() or scaled3d()` and `will-change`
      - 처음부터 레이어를 분리해 두기 때문에 변화에 더욱 빠르게 처첳할수ㅇ있으음
      - 단 레이어가 너무 많으면 그만큼 메모리를 많이 사용하기 때문에 주의

<br>

### 참고

- [책 - 프론트엔드 성능 최적화 가이드](https://product.kyobobook.co.kr/detail/S000200178292?utm_source=google&utm_medium=cpc&utm_campaign=googleSearch&gt_network=g&gt_keyword=&gt_target_id=aud-901091942354:dsa-435935280379&gt_campaign_id=9979905549&gt_adgroup_id=132556570510&gclid=Cj0KCQjw7PCjBhDwARIsANo7CglhTltoHznK7vMGKndqxx8dhWe4eeyj3wbqyiz3MaqZ4V8EEYQ8rRAaAjRDEALw_wcB)

```toc

```
