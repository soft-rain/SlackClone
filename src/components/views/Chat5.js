import React from "react";
// import SockJS from "react-stomp";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

var stompClient = null;

function Chat5() {
  // function setConnected(connected) {
  //   console.log("connected?");
  //   if (connected) {
  //     console.log("연결 완료");
  //   } else {
  //     console.log("연결 안됨");
  //   }
  // }
  function connect() {
    var socket = new SockJS("http://172.30.1.34:8080/socket");
    stompClient = Stomp.over(socket); //STOMP 초기화

    socket.onopen = function () {
      console.log("open");
    };
    stompClient.connect(
      { Authorization: sessionStorage.getItem("accessToken") },
      function (msg) {
        // stompClient.connect(function (msg) {
        //   setConnected(true);
        //   console.log("CONNECTED: " + msg);
        // });
        //메세지를 받는다. (각각 구독하기)
        stompClient.subscribe("/topic/on", function (msg) {
          printMessage(JSON.parse(msg.body));
          console.log("connect1");
        });

        //입장 메시지 전달
        stompClient.subscribe("/topic/1/message", function (msg) {
          console.log(msg);
          printMessage(JSON.parse(msg.body));
          console.log("connect2");
        });
        stompClient.subscribe("/topic/off", function (msg) {
          printMessage(JSON.parse(msg.body));
          console.log("connect3");
        });
        //입장글
        stompClient.send("/app/on", {}, JSON.stringify({ content: "아영" }));
        console.log("connect4");
      }
    );
  }
  //연결 해제
  function disconnect() {
    if (stompClient !== null) {
      stompClient.send("/app/off", {}, "퇴장하였습니다");
      console.log("disconnect");

      stompClient.disconnect();
    }
  }
  //메시지 전송
  function sendMessage(text) {
    stompClient.send("/app/chat.1", {}, JSON.stringify({ sendMessage: text }));
    console.log("send");
  }
  function printMessage(msg) {
    return <div>{msg}</div>;
  }
  return (
    <div>
      <script src="Chat5.js"></script>
      <script src="http://cdn.sockjs.org/sockjs-0.3.min.js"></script>;
      <form>
        <label>이름</label>
        <input type="text" placeholder="이름을 적어주세요"></input>
      </form>
      <form>
        <div>
          <button
            id="connect"
            className="onbutton"
            type="button"
            onClick={connect}
          >
            ON
          </button>
          <button
            id="disconnect"
            className="offbutton"
            type="button"
            disabled="disabled"
            onClick={disconnect}
          >
            OFF
          </button>
        </div>
      </form>
      <input type="text" placeholder="메시지 입력"></input>
      <div>
        <button type="submit" className="sendbutton" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat5;
