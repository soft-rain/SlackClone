import React from "react";
// import SockJS from "react-stomp";
import SockJS from "sockjs-client";
import "./Chat.css";
import { Stomp } from "@stomp/stompjs";
var stompClient = null;

const Chat6 = () => {
  var socket = new SockJS("http://172.30.1.14:8080/socket");
  console.log(socket);
  stompClient = Stomp.over(socket);
  socket.onopen = function () {
    console.log("open");
  };

  stompClient.connect(
    { Authorization: sessionStorage.getItem("accessToken") },
    function (frame) {
      console.log("Connected: " + frame);
      stompClient.subscribe("/topic/on", function (greeting) {
        console.log("온");
        console.log(frame);
        console.log(greeting);
        //you can execute any function here
      });
      stompClient.subscribe("topic/1/message", function (frame) {
        console.log("메시지");
        console.log(frame);
      });
      stompClient.subscribe("/topic/off", function (msg) {
        console.log(msg);
        console.log("바이");
      });
    }
  );
  return (
    <div>
      <form>
        <label>이름</label>
        <input type="text" placeholder="이름을 적어주세요"></input>
      </form>
      <form>
        <button id="connect" class="btn btn-xs btn-danger" type="submit">
          ON
        </button>
        <button
          id="disconnect"
          class="btn btn-xs"
          type="submit"
          disabled="disabled"
        >
          OFF
        </button>
      </form>
      <input type="text" placeholder="메시지 입력"></input>
      <button type="submit">Send</button>
    </div>
  );
};

export default Chat6;
