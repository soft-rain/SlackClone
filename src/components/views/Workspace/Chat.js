import React, { useState } from "react";
// import SockJS from "react-stomp";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import "./Workspace.css";
import "./Chat.css";
function Chat() {
  var stompClient = null;
  connect();
  const Form = () => {
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
      const DisplayMessage = () => {
        return <div className="chatBox">MESSAGEEEE</div>;
      };
      e.preventDefault();
      console.log(`Message Sent: ${message}`);
      sendMessage(message);
      DisplayMessage();
      e.target.reset(); //form 초기화하기
    };

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="#00에게 메시지 보내기"
            className="send-message-box"
            onChange={(e) => setMessage(e.target.value)}
            // onKeyPress={(e) => (message) => sendMessage(message)}
          ></input>
          <span>
            <button
              type="submit"
              className="sendbutton"
              // onClick={(message) => sendMessage(message)} =>오류뜸!!
            >
              Send
            </button>
          </span>
        </div>
      </form>
    );
  };

  // function setConnected(connected) {
  //   console.log("connected?");
  //   if (connected) {
  //     console.log("연결 완료");
  //   } else {
  //     console.log("연결 안됨");
  //   }
  // }
  function connect() {
    var socket = new SockJS("http://172.16.101.28:8080/socket");
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
          console.log("1");
        });

        //입장 메시지 전달
        stompClient.subscribe("/topic/1/message", function (msg) {
          console.log(msg);
          printMessage(JSON.parse(msg.body));
          console.log("2");
        });
        stompClient.subscribe("/topic/off", function (msg) {
          printMessage(JSON.parse(msg.body));
          console.log("3");
        });
        //입장글
        stompClient.send("/app/on", {});
        console.log("4");
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
    stompClient.send("/app/chat.1", {}, JSON.stringify({ content: text }));
  }
  function printMessage(msg) {
    console.log("메시지: ", msg);
  }
  // function displayMessage(msg) {
  //   console.log("채팅박스: ", msg);
  //   return (
  //     <div>
  //       <h1 className="chatBox">{msg}</h1>
  //     </div>
  //   );
  // }
  return (
    <div>
      <script src="Chat.js"></script>
      <script src="http://cdn.sockjs.org/sockjs-0.3.min.js"></script>
      {/* <form>
        <label className="username">이름</label>
        <input
          className="usernameForm"
          type="text"
          placeholder="이름을 적어주세요"
        ></input>
      </form> */}
      {/* <form>
        <div>
          <button
            id="connect"
            className="onbutton"
            type="button"
            // onClick={connect}
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
      </form> */}
      <Form />
    </div>
  );
}

export default Chat;
