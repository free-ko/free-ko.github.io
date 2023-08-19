---
emoji: 👋
title: '8월 3주 회고'
date: '2023-08-19 12:05:00'
author: Kay
tags: 블로그 github-pages gatsby
categories: Log
---

## 업무 회고

- 개발하는 환경이 어떤 환경인지 정확하게 인지하고 개발 및 다른 팀원분들과 협업을 진행 하자

### 웹 소켓

- 지속적인 양방향 통신을 제공하여 서버와 클라이언트 간에 데이터를 실시간으로 주고받을 수 있게 해주는 프로토콜( 실시간 채팅, 실시간 업데이트, 협업 도구, 알림기능,실시간 게임)
- 예시 코드(채팅)

  ```jsx
  // 클라이언트
  import React, { useState, useEffect } from 'react';

  const ChatApp = () => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const socket = new WebSocket('ws://your-websocket-server-url');

    useEffect(() => {
      socket.addEventListener('message', (event) => {
        const newMessage = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => {
        socket.close();
      };
    }, []);

    const sendMessage = () => {
      const newMessage = { text: messageInput };
      socket.send(JSON.stringify(newMessage));
      setMessageInput('');
    };

    return (
      <div>
        <div>
          {messages.map((message, index) => (
            <div key={index}>{message.text}</div>
          ))}
        </div>
        <input type="text" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </div>
    );
  };

  export default ChatApp;
  ```

  ```js
  // 서버
  const http = require('http');
  const WebSocket = require('ws');

  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket server is running');
  });

  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });
  });

  server.listen(8080, () => {
    console.log('WebSocket server is listening on port 8080');
  });
  ```

<br>

## 한 주 회고

오랜만에 고향에 내려와 주말을 껴서 3일 정도 쉬었습니다. 그러나 생각보다 회복이 되지 않았습니다.

요즘 특히 고민이 어떻게 하면 잘 쉬고 회복해서 더 좋은 퍼포먼스를 낼 수 있을 지 고민을 많이 합니다.
이러한 고민을 하지 않으면 주체적이지 못한 삶을 살아갈 것 같은 느낌이 많이 들어 조금이라도 삶의 본질에 대해 질문을 던지고 어떻게 하면 더 좋은 삶을 살 수 있고 지금의 커리어를 잘 갈고 닦을 수 있을 지 생각해보는 좋은 동기라고 생각이 됩니다.

그리고 요즘 업무 집중도가 많이 떨어진 것 같은 생각이 듭니다. 특히 문제에 직면했을 때, 근시안적으로 문제를 바라보고 있고 문제의 원인을 제대로 이해하지 못한 채로 문제 해결에 급급한 것 같습니다.

정말 이 부분은 어떻게든 슬기롭게 극복해서 업무의 효율성을 높이고 싶습니다.

먼저 최대한 불필요한 곳에 에너지를 쏟지 않는 의식적 연습을 하고 어떻게 하면 업무의 집중력을 높일 수 있을 지 고민하고 리서치 해서 찾은 자료를 바탕으로 실천해 봐야 겠다.

<br>

### 참고

- [직장인 개발자의 업무 생산성을 높이는 방법](https://www.youtube.com/watch?v=vutA66CGm4c)

```toc

```
