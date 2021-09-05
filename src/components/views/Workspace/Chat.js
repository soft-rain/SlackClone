import React, { useEffect, useState } from "react";
// import SockJS from "react-stomp";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import "./Workspace.css";
import "./Chat.css";
import axios from "axios";

function Chat() {
  var stompClient = null;
  connect();
  const [msgData, setMsgData] = useState([]);
  const [curmsg, setCurmsg] = useState("");
  const [sender, setSender] = useState("");
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
            <span>
              <button type="submit" className="sendbutton" onClick={PrevChat}>
                Send
              </button>
              {/* <button onClick={PrevChat}>모르겠다</button> */}
            </span>
          </div>
        </form>
        {/* <DisplayMessage /> */}
      </div>
    );
  };
  async function PrevChat() {
    const res = await axios.get("/api/channels/1/messages");
    // console.log("RES : ", res);
    // setMsgData(res.data.data[res.data.data.length - 2].content);
    // setMsgData(res.data.data[res.data.length - 1].content);

    // console.log(res.data.data[0]);
    // console.log("sender", res.data.data[0].member.nickname);
    // console.log("message", res.data.data[0].content);

    return sender;
  }

  function connect() {
    var socket = new SockJS("http://b454-222-107-16-12.ngrok.io/socket");
    stompClient = Stomp.over(socket); //STOMP 초기화

    socket.onopen = function () {
      console.log("open");
    };
    stompClient.connect(
      { Authorization: sessionStorage.getItem("accessToken") },
      function (msg) {
        //메세지를 받는다. (각각 구독하기)
        stompClient.subscribe("/topic/on", function (msg) {
          console.log(JSON.parse(msg.body));
        });
        //입장 메시지 전달
        stompClient.subscribe("/topic/1/message", function (msg) {
          console.log(JSON.parse(msg.body));
          console.log(JSON.parse(msg.body).createdAt);
          console.log(JSON.parse(msg.body).content);
          console.log(JSON.parse(msg.body).member.nickname);
          if (JSON.parse(msg.body).createdAt !== undefined) {
            setCurmsg(JSON.parse(msg.body).content);
            // setSender(JSON.parse(msg.body).member);
          } else {
            setCurmsg("에러");
          }
          setSender(JSON.parse(msg.body).member.nickname);
        });
        stompClient.subscribe("/topic/off", function (msg) {
          // PrintMessage(JSON.parse(msg.body));
          console.log(JSON.parse(msg.body));
        });
        //입장글
        stompClient.send("/app/on", {});
      }
    );
  }
  //메시지 전송
  function sendMessage(text) {
    stompClient.send("/app/chat.1", {}, JSON.stringify({ content: text }));
    setCurmsg(text);
    console.log("curmsg", curmsg);
  }
  const ChatBox = () => {
    return (
      <div>
        <h2>{/* <PrevChat /> */}</h2>
        <h2>
          {" "}
          {sender} {curmsg}
        </h2>
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
