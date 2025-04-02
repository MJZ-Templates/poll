// src/services/socket.js
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;

export function connectSocket(pollId, onMessageReceived) {
    stompClient = new Client({
      webSocketFactory: () => new SockJS(import.meta.env.VITE_SOCKET_URL),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("[WebSocket] Connected");
        stompClient.subscribe(`/topic/polls/${pollId}`, (message) => {
          console.log("[WebSocket] Message received:", message.body);
          const updatedPoll = JSON.parse(message.body);
          onMessageReceived(updatedPoll);
        });
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
