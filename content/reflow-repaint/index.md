---
emoji: 👋
title: 'Reflow와 Repaint 차이'
date: '2024-10-22 16:32:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: TIL
---

# 브라우저 렌더링 과정

브라우저 렌더링 과정은 웹페이지를 표시하는 데 필요한 리소스를 다운로드하고 화면에 표시하는 과정을 크게 4단계로 나눌 수 있습니다.

1. **DOM + CSSOM 생성**

- DOM (Document Object Model): HTML 파일을 분석하여 브라우저가 이해할 수 있는 DOM 트리를 만듭니다. 각 HTML 요소가 노드로 변환되어 트리 구조를 형성합니다.
- CSSOM (CSS Object Model): CSS 파일을 분석하여 CSSOM 트리를 생성합니다. 이 트리는 CSS 규칙을 이해하고 각 DOM 요소에 스타일을 적용할 수 있도록 도와줍니다.

2. **Layout**

- DOM과 CSSOM 트리를 조합하여 렌더 트리를 생성합니다.
- 각 요소의 위치와 크기를 계산하고 화면에 요소들을 배치합니다. 이 과정을 통해 브라우저는 각 요소가 화면에서 어디에 위치할지 결정합니다.

3. **Paint**

- 레이아웃 과정에서 배치된 요소에 색을 칠하고, 그림자나 테두리 같은 시각적 스타일을 적용합니다.
- 이 단계에서 레이어로 요소를 분리하여, 이후의 단계에서 더 효율적으로 합칠 수 있도록 준비합니다.

4. **Composite**

- 페인트 단계에서 분리된 레이어들을 GPU가 처리할 수 있도록 각각 합성합니다. 이 과정은 하드웨어 가속을 사용하여 더 빠르게 화면에 그려지도록 도와줍니다.

<br />

### Reflow

- 리플로우는 브라우저가 렌더링 과정을 재실행하는 과정입니다.
- 화면 요소의 크기나 위치가 변경되면, 레이아웃을 다시 계산해야 하므로 DOM과 CSSOM 트리도 다시 처리됩니다.
- 리플로우는 성능에 영향을 줄 수 있기 때문에 자주 발생하지 않도록 최적화가 필요합니다.
- 리플로우를 발생시키는 CSS 속성들
  - `position, display, width, height, margin, padding, font-size` 등 레이아웃에 영향을 미치는 속성들.

<br />

### Repaint

- 리페인트는 화면 요소의 시각적 스타일만 변경되었을 때 발생하는 과정입니다. 레이아웃을 다시 계산하지 않고, 색상이나 배경 이미지와 같은 시각적 속성만 다시 그려집니다.
- 리플로우보다 빠르지만 여전히 성능에 영향을 미칠 수 있으므로 빈번한 리페인트는 피하는 것이 좋습니다.
- 리페인트를 발생시키는 CSS 속성들

  - `background, color, border, box-shadow, outline` 등 시각적 스타일에만 영향을 미치는 속성들.

<br />

### Reflow, Repaint 줄이는 방법

**CSS 속성 활용**

1. `transform`과 `opacity` 같은 속성은 레이아웃에 영향을 주지 않으므로 리플로우나 리페인트를 발생시키지 않고 성능을 최적화할 수 있습니다.

2. `transform: translate3d()`와 `will-change` 사용

   - `transform: translate3d()` 또는 `scale3d()`를 사용하면, 브라우저는 요소를 처음부터 레이어로 분리하여 변화를 더욱 빠르게 처리할 수 있습니다.
   - `will-change` 속성을 사용하여 미리 어떤 변화가 일어날지 브라우저에 알려줌으로써 최적화를 더욱 강화할 수 있습니다. 단, 너무 많은 레이어가 있으면 메모리 사용량이 증가할 수 있으므로 주의가 필요합니다.

이러한 속성들은 브라우저가 별도의 레이어로 처리하며, 이를 GPU에 위임해 하드웨어 가속을 사용할 수 있습니다.

<br />

### 참고

- [책 - 프론트엔드 성능 최적화 가이드](https://product.kyobobook.co.kr/detail/S000200178292?utm_source=google&utm_medium=cpc&utm_campaign=googleSearch&gt_network=g&gt_keyword=&gt_target_id=aud-901091942354:dsa-435935280379&gt_campaign_id=9979905549&gt_adgroup_id=132556570510&gclid=Cj0KCQjw7PCjBhDwARIsANo7CglhTltoHznK7vMGKndqxx8dhWe4eeyj3wbqyiz3MaqZ4V8EEYQ8rRAaAjRDEALw_wcB)
