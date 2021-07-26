import React from "react";
// import SockJS from "react-stomp";
import SockJS from "sockjs-client";

import { Stomp } from "@stomp/stompjs";
import "./Chat.css";
import $ from "jquery";
var stompClient = null;

const Chat2 = () => {
  function setConnected(connected) {
    console.log("connect?");
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    console.log("connected?????????");

    if (connected) {
      $("#chat").show();
      console.log("connected됨!");
    } else {
      $("#chat").hide();
      console.log("connected안됨...");
    }
    $("#chat").html("");
  }
  //소켓 연결
  function connect() {
    // ws://127.0.0.1:8080/slack
    var socket = new SockJS("http://172.30.1.14:8080/socket");
    console.log("socket : ", socket);
    //var socket = new SockJS('/slack');
    stompClient = Stomp.over(socket);
    console.log("stompClient : ", stompClient);
    stompClient.connect(
      {
        Authorization: sessionStorage.getItem("accessToken"),
        chatId: 1,
      },
      function (msg) {
        stompClient.connect(function (msg) {
          setConnected(true);
          console.log("Connected: " + msg);
        });
        // 입장에 대한 구독
        stompClient.subscribe("/topic/on", function (msg) {
          console.log(msg);
          showHello(JSON.parse(msg.body));
        });
        // 입장에 대한 메시지 전달
        stompClient.subscribe("/topic/1/message", function (msg) {
          console.log(msg);
          showDetail(JSON.parse(msg.body));
        });
        // 퇴장에 대한 구독
        stompClient.subscribe("/topic/off", function (msg) {
          console.log(msg);
          showBye(JSON.parse(msg.body));
        });
        sendHello();
      }
    );
    console.log(setConnected());
    console.log("setConnected: ", setConnected());
  }
  //소켓 연결 끊음
  function disconnect() {
    if (stompClient != null) {
      sendBye();
      stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
  }
  function sendHello() {
    stompClient.send("/app/on", {}, JSON.stringify({}));
    console.log("sendHello");
  }
  function sendDetail() {
    console.log($("#btn-input").val());
    stompClient.send(
      "/app/chat.1",
      {},
      JSON.stringify({
        content: $("#btn-input").val(),
      })
    );
    console.log("send다음부분");
  }
  function sendBye() {
    stompClient.send("/app/off", {}, JSON.stringify({}));
  }
  function showDetail(message) {
    console.log("message :", message);
    var html = "";
    html += '<li class="left clearfix">';
    html += '	<div class="chat-body clearfix">';
    html += '		<div class="header">';
    html +=
      '		<strong class="pull-right primary-font">' +
      message.sender.username +
      "</strong>";
    html += '		<small class="text-muted">';
    html += '			<i class="fa fa-clock-o fa-fw"></i>' + message.sendDate;
    html += "		</small>";
    html += "	</div>";
    html += "	<p>";
    html += message.content;
    html += "	</p>";
    html += "	</div>";
    html += "</li>";
    $(".chat").append(html);
    $(".panel-body").scrollTop($(".chat")[0].scrollHeight);
  }
  function showHello(message) {
    var html = "";
    html += '<li class="left clearfix">';
    html += '	<div class="chat-body clearfix">';
    html += '	<div class="header">';
    html +=
      '		<strong class="primary-font">' + message.sender.username + "</strong>";
    html += '		<small class="pull-right text-muted">';
    html += '			<i class="fa fa-clock-o fa-fw"></i>' + message.sendDate;
    html += "		</small>";
    html += "	</div>";
    html += "	<p>";
    html += message.sender.username + "님이 입장하였습니다";
    html += "	</p>";
    html += "	</div>";
    html += "</li>";
    $(".chat").append(html);
    $(".panel-body").scrollTop($(".chat")[0].scrollHeight);
  }
  function showBye(message) {
    var html = "";
    // var date = message.sendDate;
    html += '<li class="left clearfix">';
    html += '	<div class="chat-body clearfix">';
    html += '	<div class="header">';
    html +=
      '		<strong class="primary-font">' + message.sender.username + "</strong>";
    html += '		<small class="pull-right text-muted">';
    html += '			<i class="fa fa-clock-o fa-fw"></i>' + message.sendDate;
    html += "		</small>";
    html += "	</div>";
    html += "	<p>";
    html += message.sender.username + "님이 퇴장하였습니다";
    html += "	</p>";
    html += "	</div>";
    html += "</li>";
    $(".chat").append(html);
    $(".panel-body").scrollTop($(".chat")[0].scrollHeight);
  }
  $(function () {
    $("form").on("submit", function (e) {
      e.preventDefault();
    });
    $("#connect").click(function () {
      // 소켓 연결
      console.log("전");
      connect();
      console.log("여기");
    });
    $("#disconnect").click(function () {
      // 소켓 연결 끊음
      disconnect();
    });
    $("#btn-chat").click(function () {
      // 메시지 전달

      sendDetail();
      console.log("send부분");
      $("#btn-input").val("");
    });
  });
  return (
    // <div>
    //   <script src="Chat2.js"></script>
    //   <script
    //     type="text/javascript"
    //     src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.1.5/sockjs.min.js"
    //   ></script>
    //   <script src="/webjars/jquery/jquery.min.js"></script>
    //   <script src="/webjars/sockjs-client/sockjs.min.js"></script>
    //   <script src="/webjars/stomp-websocket/stomp.min.js"></script>
    //   <div id="main-content" class="container">
    //     <p>
    //       <div class="row">
    //         <div class="col-md-6">
    //           <form class="form-inline">
    //             <div class="form-group">
    //               <label for="senderId">이름</label>
    //               <input
    //                 type="text"
    //                 id="senderId"
    //                 class="form-control input-sm"
    //                 placeholder="이름을 적어주세요"
    //               ></input>
    //             </div>
    //           </form>
    //         </div>
    //         <div class="col-md-6" align="right">
    //           <form class="form-inline">
    //             <div class="form-group">
    //               <label for="connect">채팅</label>
    //               <button
    //                 id="connect"
    //                 class="btn btn-xs btn-danger"
    //                 type="submit"
    //               >
    //                 ON
    //               </button>
    //               <button
    //                 id="disconnect"
    //                 class="btn btn-xs"
    //                 type="submit"
    //                 disabled="disabled"
    //               >
    //                 OFF
    //               </button>
    //             </div>
    //           </form>
    //         </div>
    //       </div>
    //     </p>
    //     <div class="row">
    //       <div class="col-md-12">
    //         <div class="chat-panel panel panel-default">
    //           <div class="panel-heading">
    //             <i class="fa fa-comments fa-fw"></i> Chat
    //           </div>
    //           <div class="panel-body">
    //             <ul class="chat" id="chat"></ul>
    //           </div>
    //           <div class="panel-footer">
    //             <form class="form">
    //               <div class="form-group">
    //                 <div class="input-group">
    //                   <input
    //                     id="btn-input"
    //                     type="text"
    //                     class="form-control input-sm"
    //                     placeholder="메세지를 적어주세요"
    //                     autocomplete="off"
    //                   ></input>
    //                   <span class="input-group-btn">
    //                     <button
    //                       class="btn btn-info btn-sm"
    //                       id="btn-chat"
    //                       type="submit"
    //                     >
    //                       Send
    //                     </button>
    //                   </span>
    //                 </div>
    //               </div>
    //             </form>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // );
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
export default Chat2;
