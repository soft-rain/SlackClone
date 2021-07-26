import React, { useState } from "react";
import SockJsClient from "react-stomp";

const SOCKET_URL = "http://172.30.1.14:8080/socket";

const Chat5 = () => {
  const [message, setMessage] = useState("You server message here.");

  let onConnected = () => {
    console.log("Connected!!");
  };

  let onMessageReceived = (msg) => {
    setMessage(msg.message);
  };

  return (
    <div>
      <SockJsClient
        url={SOCKET_URL}
        topics={["/topic/1/message"]}
        onConnect={onConnected}
        onDisconnect={console.log("Disconnected!")}
        onMessage={(msg) => onMessageReceived(msg)}
        debug={false}
      />
      <div>{message}</div>
    </div>
  );
};

export default Chat5;
