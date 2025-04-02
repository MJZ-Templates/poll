// src/services/socket.js
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;

export function connectSocket(pollId, onMessageReceived) {
  console.log("여기까지 오긴 했음");
  stompClient = new Client({
    webSocketFactory: () => new SockJS('/ws'),
    reconnectDelay: 5000,
    debug: (str) => console.log('[STOMP DEBUG]', str),
    onConnect: () => {
      console.log('[WebSocket] ✅ Connected');
    },
    onStompError: (frame) => {
      console.error('[WebSocket] 💥 STOMP ERROR:', frame);
    },
    onWebSocketError: (err) => {
      console.error('[WebSocket] ❌ WebSocket Error:', err);
    },
  });
  

  stompClient.activate();
}

export function sendVote(pollId, optionId) {
  console.log("send called");
  if (!stompClient || !stompClient.connected) return;

  const payload = JSON.stringify({ pollId, optionId });
  stompClient.publish({ destination: '/app/vote', body: payload });
}

export function disconnectSocket() {
  if (stompClient) stompClient.deactivate();
}
