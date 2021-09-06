import React, { useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import "./Workspace.css";
import "./Chat.css";

function Chat() {
  var stompClient = null;
  connect();
  const [sender, setSender] = useState("");
  const [time, setTime] = useState("");
  const [content, setContent] = useState("");

  //Socket과 연결하기
  function connect() {
    var socket = new SockJS("http://192.168.0.5:8080/socket");
    stompClient = Stomp.over(socket); //STOMP 초기화

    socket.onopen = function () {
      console.log("open");
    };
    stompClient.connect(
      { Authorization: sessionStorage.getItem("accessToken") },
      function (msg) {
        stompClient.subscribe("/topic/on", function (msg) {
          // 연결 성공
          //   console.log(JSON.parse(msg.body));
        });
        //입장 메시지 전달
        stompClient.subscribe("/topic/1/message", function (msg) {
          setSender(JSON.parse(msg.body).member.nickname);
          setTime(JSON.parse(msg.body).createdAt);
          setContent(JSON.parse(msg.body).content);
        });
        // stompClient.subscribe("/topic/off", function (msg) {
        //   console.log(JSON.parse(msg.body));
        // });
        //입장글
        // stompClient.send("/app/on", {});
      }
    );
  }

  //메시지 전송
  function sendMessage(text) {
    stompClient.send("/app/chat.1", {}, JSON.stringify({ content: text }));
    // setCurmsg(text);
    // console.log("curmsg", curmsg);
  }

  //입력창
  const Form = () => {
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(`Message Sent: ${message}`);
      sendMessage(message);
      e.target.reset(); //form 초기화하기
    };

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="#00에게 메시지 보내기"
              className="send-message-box"
              onChange={(e) => setMessage(e.target.value)}
              // onKeyPress={(e) => (message) => sendMessage(message)}
            ></input>
            <span></span>
          </div>
        </form>
      </div>
    );
  };

  //채팅창
  const ChatBox = () => {
    return (
      <div>
        <h2>{/* <PrevChat /> */}</h2>
        <span>
          {sender}
          {"   "}
        </span>
        <span>
          {content}
          {"    "} {time}
        </span>
      </div>
    );
  };
  return (
    <div>
      <script src="Chat.js"></script>
      <script src="http://cdn.sockjs.org/sockjs-0.3.min.js"></script>
      <ChatBox />
      <Form />
    </div>
  );
}

export default Chat;
