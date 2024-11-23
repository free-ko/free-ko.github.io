---
emoji: 🔥
title: '대규모 트래픽 대응을 위한 WebSocket 대기룸 개발기'
date: '2024-11-23 22:47:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Study
---

## 1. 들어가며

사용자 경험(UX)에서 실시간성은 이제 필수적인 요구사항입니다. 특히 대기룸과 같은 기능은 즉각적인 피드백과 안정적인 통신이 필수적입니다. 이번 글에서는 대규모 트래픽을 처리할 수 있는 WebSocket 기반 대기룸을 프론트엔드 관점에서 설계하고 구현한 경험을 공유합니다. 또한 개발 과정에서 직면한 메모리 릭 발생 위험과 이를 해결하기 위한 접근 방법도 포함합니다.

<br />

## 2. WebSocket이 필요한 이유

기존의 HTTP 폴링 방식은 실시간 상태를 확인하기 위해 정기적으로 요청을 보내는 방식입니다. 그러나 이는 다음과 같은 문제가 있습니다

- 네트워크 과부하: 요청-응답 간의 불필요한 데이터 전송
- 응답 지연: 실시간성을 요구하는 시스템에서 한계

이에 비해 WebSocket은 지속적인 양방향 연결을 제공하며, 클라이언트와 서버 간의 실시간 데이터 전송이 가능합니다. 대기 상태를 실시간으로 사용자에게 전달하는 대기룸의 특성상 WebSocket이 적합하다고 판단했습니다.

<br />

## 3. 프론트엔드 설계

### 3.1 대기룸 UI의 주요 기능

1. 실시간 대기 상태 표시

   - 남은 대기 인원과 예상 대기 시간을 사용자에게 제공.

2. 부드러운 애니메이션 처리

   - 대기 상태가 변경될 때 UI 요소에 자연스러운 전환 효과 추가.

3. 서버와 안정적인 연결 관리

   - WebSocket 연결 상태를 모니터링하여 연결 끊김 발생 시 재연결 시도.

<br />

## 3. WebSocket 구현

### 3.1 WebSocket 연결과 상태 관리

WebSocket 연결과 상태는 커스텀 훅으로 분리하여 재사용성과 유지보수를 높였습니다.

```tsx
import { useEffect, useRef, useState } from 'react';

export const useWebSocket = (url: string) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socketRef.current = new WebSocket(url);

    socketRef.current.onopen = () => setIsConnected(true);
    socketRef.current.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };
    socketRef.current.onclose = () => setIsConnected(false);

    return () => {
      socketRef.current?.close(); // 컴포넌트 언마운트 시 연결 종료
    };
  }, [url]);

  return { socket: socketRef.current, messages, isConnected };
};
```

### 3.2 대기 상태를 실시간으로 UI에 반영

수신된 데이터를 상태에 반영하고, 이를 UI에서 표시합니다.

```tsx
import { useWebSocket } from './useWebSocket';

const QueueStatus = () => {
  const { messages, isConnected } = useWebSocket('ws://localhost:8080');

  return (
    <div className="queue-status">
      {isConnected ? (
        <ul>
          {messages.map((msg, idx) => (
            <li key={idx}>{msg}</li>
          ))}
        </ul>
      ) : (
        <p>서버와 연결되지 않았습니다.</p>
      )}
    </div>
  );
};

export default QueueStatus;
```

<br />

## 4. WebSocket 메모리 릭 방지

### 4.1 위험 요인

1. 이벤트 리스너의 과도한 등록

   - 연결이 반복되면서 새로운 이벤트 리스너가 누적될 위험.

2. 연결 누수

   - 컴포넌트 언마운트 시 WebSocket 연결이 닫히지 않으면 메모리 릭 발생.

3. 대규모 메시지 관리

   - 불필요하게 많은 데이터를 클라이언트 메모리에 저장할 경우 성능 저하.

### 4.2 방지 방안

1. 리스너 제거 cleanup 함수를 사용하여 컴포넌트 언마운트 시 이벤트 리스너를 제거합니다.

```tsx
useEffect(() => {
  const ws = new WebSocket(url);

  const handleMessage = (event: MessageEvent) => {
    setMessages((prev) => [...prev, event.data]);
  };

  ws.addEventListener('message', handleMessage);

  return () => {
    ws.removeEventListener('message', handleMessage);
    ws.close(); // 연결 종료
  };
}, [url]);
```

2. 메시지 크기 제한 대기열 상태를 클라이언트에 전달할 때 메시지 크기를 제한하거나 데이터를 압축합니다.

   - WebSocket 메시지의 크기가 지나치게 크면 클라이언트 메모리에 불필요한 데이터가 쌓이고, 메모리 사용량이 과도하게 증가할 수 있습니다. 이를 방지하기 위해 메시지 크기 제한과 같은 검증 로직을 추가해야 합니다.

   - 이 방식은 클라이언트가 너무 큰 데이터를 처리하지 않도록 방지하여 성능 저하와 메모리 낭비를 예방합니다. 또한 필요 시 데이터를 압축하거나 가공하여 효율적으로 관리할 수 있습니다.

```tsx
const MAX_MESSAGE_SIZE = 1024; // 메시지 크기 제한 (1KB)

const handleIncomingMessage = (message: string) => {
  if (message.length > MAX_MESSAGE_SIZE) {
    console.warn('메시지가 너무 큽니다. 처리하지 않습니다.');
    return;
  }

  // 메시지 크기가 적절한 경우에만 처리
  const parsedData = JSON.parse(message); // 예: JSON 형식의 데이터
  updateState(parsedData);
};

// 적용 이유
// - 클라이언트가 처리할 수 없는 대형 메시지가 전송될 경우 발생할 수 있는 메모리 과부하를 방지.
// - GC(Garbage Collection)의 부하를 줄여 브라우저 성능을 안정적으로 유지.
// - 필요 시 데이터를 압축하거나 가공하여 효율적으로 처리.
```

3. 최적화된 상태 관리 불필요한 상태 업데이트를 줄이기 위해 React.memo 또는 zustand의 셀렉터 기능을 활용합니다.

   - WebSocket에서 많은 메시지가 들어오면 상태 업데이트가 자주 발생할 수 있습니다. 상태 업데이트가 많아지면 불필요한 리렌더링이 빈번하게 발생, 상태가 계속 누적되면서 메모리가 점차 증가, 이를 방지하기 위해 상태 업데이트를 최적화해야 합니다.
   - 최적화 방법: React.memo: 리렌더링을 최소화, 상태 관리 라이브러리 (예: zustand)의 셀렉터 기능: 특정 상태 변화에만 의존하여 불필요한 업데이트 방지, 오래된 상태를 주기적으로 정리하여 메모리 누적 방지

```tsx
import { create } from 'zustand';

const useQueueStore = create((set) => ({
  messages: [],
  addMessage: (msg) =>
    set((state) => {
      const newMessages = [...state.messages, msg];

      // 최대 메시지 50개만 유지
      if (newMessages.length > 50) {
        newMessages.shift();
      }

      return { messages: newMessages };
    }),
}));

// React.memo로 불필요한 리렌더링 방지
const MessageList = React.memo(() => {
  const messages = useQueueStore((state) => state.messages); // 셀렉터로 messages만 의존

  return (
    <ul>
      {messages.map((msg, idx) => (
        <li key={idx}>{msg}</li>
      ))}
    </ul>
  );
});
```

<br />

## 5. 결론

WebSocket 대기룸 개발은 실시간성과 안정성이 중요한 기능이었습니다. 특히 메모리 릭 방지 및 상태 관리 최적화를 통해 프론트엔드 성능을 크게 향상시킬 수 있었습니다. 이 경험을 바탕으로 실시간 시스템 개발에 대한 이해를 더 깊게 할 수 있었습니다.

<br />
