---
emoji: 🌈
title: 'Emotion을 사용할 때 발생하는 FOUC 문제 해결 방법'
date: '2024-11-09 10:39:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Log
---

<br>

# 1. FOUC(Flash of Unstyled Content)란?

FOUC란 `Flash of Unstyled Content`의 약자로, 페이지가 로드될 때 스타일이 적용되지 않은 상태의 콘텐츠가 잠깐 깜빡이는 현상을 뜻합니다. 주로 서버 사이드 렌더링(SSR) 환경에서 발생하며, HTML이 먼저 렌더링되고 이후에 CSS가 로드되기 때문에 발생합니다.

예시: 로딩 애니메이션이 있는 페이지가 있을 때, FOUC가 발생하면 스타일이 적용되지 않은 HTML이 잠깐 노출될 수 있습니다. 이는 사용자 경험에 좋지 않은 영향을 줄 수 있어, 초기 스타일을 잘 적용해 깜빡임을 최소화하는 것이 중요합니다.

<br>

# 2. Emotion 사용 시 FOUC 발생 원인

Emotion과 같은 CSS-in-JS 라이브러리는 SSR 환경에서 자주 FOUC 문제를 일으킵니다. SSR에서는 서버가 HTML을 먼저 렌더링한 후, 클라이언트에서 JavaScript로 CSS를 동적으로 로드합니다. 이 때문에 초기 렌더링 시 클라이언트와 서버 간의 스타일 불일치가 발생하여 스타일이 적용되지 않은 콘텐츠가 노출됩니다.

<br>

# 3. FOUC 해결 방법

FOUC 문제를 해결하기 위해 두 가지 방법을 함께 사용합니다. 하나는 `DisableTransitionsOnLoad` 컴포넌트를 사용하여 초기 css의 `transition(전환)`효과를 비활성화하는 것이고, 다른 하나는 NextJS `_document.tsx`에서 Emotion의 SSR 설정을 최적화하여 서버에서 스타일을 미리 추출하는 방법입니다.

<br>

# 4. DisableTransitionsOnLoad 컴포넌트로 초기 전환 효과 비활성화

전환 효과는 요소의 스타일이 변경될 때 시각적으로 부드럽게 보이도록 돕는 CSS 효과입니다. 그러나 초기 로딩 시 전환 효과가 활성화되어 있으면 FOUC와 겹쳐 보이면서 깜빡임 현상이 더욱 두드러질 수 있습니다. 이를 방지하기 위해, 초기 로딩 시 전환 효과를 비활성화하고 이후 활성화하여 깔끔한 화면을 제공할 수 있습니다.

```tsx
import React, { useEffect, useState } from 'react';

const DisableTransitionsOnLoad = () => {
  const [isTransitionAllowed, setIsTransitionAllowed] = useState(false);

  useEffect(() => {
    setIsTransitionAllowed(true); // 컴포넌트가 마운트된 후 전환 효과 활성화
  }, []);

  if (isTransitionAllowed) return null; // 전환 효과 활성화 시 스타일 제거

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: '*, *::before, *::after { transition: none !important; }',
      }}
    />
  );
};

export default DisableTransitionsOnLoad;
```

- 구현 설명:

  1. 초기 전환 비활성화: `dangerouslySetInnerHTML`로 모든 요소에 대해 `transition: none` 스타일을 적용하여 전환 효과를 비활성화합니다.
  2. `useEffect`로 전환 활성화: useEffect로 컴포넌트가 처음 로드된 후 `isTransitionAllowed` 상태를 true로 설정하여 스타일 비활성화를 해제합니다.
  3. 조건부 렌더링: `isTransitionAllowed`가 `true`가 되면 `<style>` 태그가 제거되고 전환 효과가 다시 활성화됩니다.

- 이 컴포넌트를 초기 로딩에 적용하면, 로딩 중에는 전환 효과가 비활성화되며, 이후에는 원래 전환 스타일로 복구됩니다.

<br>

# 5. `_document.tsx` 설정으로 SSR 스타일 최적화

SSR 환경에서 Emotion의 스타일을 미리 추출하여 클라이언트와 동일한 스타일을 제공하면 초기 스타일 불일치로 인한 FOUC 문제를 완화할 수 있습니다. 이를 위해 `_document.tsx`에서 캐시와 스타일을 미리 설정합니다.

1. `createCache`와 `CacheProvider`로 Emotion 캐시 생성

   - Emotion에서 SSR 환경에서 스타일을 캐시하여 일관된 스타일을 유지하려면 `CacheProvider`와 `createCache`를 사용합니다. 이를 통해 동일한 캐시가 클라이언트와 서버에서 공유됩니다.

2. `extractCritical`을 사용하여 서버에서 CSS 추출
   - `@emotion/server`의 `extractCritical` 메서드를 사용하면, HTML에서 필요한 스타일만 추출하여 초기 로딩 시 클라이언트에 전달할 수 있습니다.

아래는 Next.js 프로젝트에서 `_document.tsx`를 설정하는 방법입니다.

```tsx
// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cache = createCache({ key: 'next' }); // 캐시 생성
const { extractCritical } = createEmotionServer(cache);

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx); // 기본 초기 속성 가져오기
    const page = await ctx.renderPage(); // 페이지 렌더링
    const emotionStyles = extractCritical(page.html); // 스타일 추출

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style
            data-emotion={`css ${emotionStyles.ids.join(' ')}`}
            dangerouslySetInnerHTML={{ __html: emotionStyles.css }}
          />
        </>
      ),
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <CacheProvider value={cache}>
            <Main />
          </CacheProvider>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

1. 캐시 생성 및 설정:

   - `createCache`로 'next'라는 키로 Emotion 캐시를 생성합니다.
   - 캐시를 `<CacheProvider value={cache}>`로 감싸 Next.js와 Emotion이 SSR에서도 동일한 캐시를 사용하도록 설정합니다.

2. 스타일 추출 및 삽입:

   - `extractCritical` 메서드로 HTML에서 필요한 스타일만 추출하여 CSS와 ID 목록을 반환합니다.
   - `getInitialProps` 메서드에서 `<style>` 태그를 생성하고, `dangerouslySetInnerHTML`을 사용해 CSS를 HTML에 직접 삽입해 클라이언트에서 동일한 스타일을 바로 적용하도록 합니다.

3. FOUC 방지:

   - `data-emotion="css ..."` 속성으로 클라이언트와 서버가 동일한 스타일을 참조하게 하여, 초기 로딩 시 FOUC 현상을 방지합니다.

<br>

# 6. 적용 및 요약

- `DisableTransitionsOnLoad` 컴포넌트를 통해 초기 로딩 중 전환 효과를 비활성화하여 깜빡임 현상을 줄입니다.
- `_document.tsx` 설정에서 Emotion의 SSR 스타일을 미리 추출하여 클라이언트와 서버의 스타일 불일치를 방지합니다.

<br>
