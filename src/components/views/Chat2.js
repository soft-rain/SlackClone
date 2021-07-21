import React from "react";
import SockJS from "react-stomp";
import { Stomp } from "@stomp/stompjs";
// import jquery from "jquery";
import "./Chat.css";
// import $ from "jquery";

function Chat2() {
  var usernamePage = document.querySelector("#username-page");
  var chatPage = document.querySelector("#chat-page");
  var usernameForm = document.querySelector("#usernameForm");
  var messageForm = document.querySelector("#messageForm");
  var messageInput = document.querySelector("#message");
  var messageArea = document.querySelector("#messageArea");
  var connectingElement = document.querySelector(".connecting");

  var stompClient = null;
  var username = null;

  var colors = [
    "#2196F3",
    "#32c787",
    "#00BCD4",
    "#ff5652",
    "#ffc107",
    "#ff85af",
    "#FF9800",
    "#39bbb0",
  ];

  function connect(event) {
    username = document.querySelector("#name").value.trim();

    if (username) {
      usernamePage.classList.add("hidden");
      chatPage.classList.remove("hidden");

      var socket = new SockJS("/ws");
      stompClient = Stomp.over(socket);

      stompClient.connect({}, onConnected, onError);
    }
    event.preventDefault();
  }

  function onConnected() {
    // Subscribe to the Public Topic
    stompClient.subscribe("/topic/public", onMessageReceived);

    // Tell your username to the server
    // stompClient.send(
    //   "/app/chat.addUser",
    //   {},
    //   JSON.stringify({ sender: username, type: "JOIN" })
    // );

    connectingElement.classList.add("hidden");
  }

  function onError(error) {
    connectingElement.textContent =
      "Could not connect to WebSocket server. Please refresh this page to try again!";
    connectingElement.style.color = "red";
  }

  function sendMessage(event) {
    var messageContent = messageInput.value.trim();
    if (messageContent && stompClient) {
      var chatMessage = {
        sender: username,
        content: messageInput.value,
        type: "CHAT",
      };
      stompClient.send("/app/chat.1", {}, JSON.stringify(chatMessage));
      messageInput.value = "";
    }
    event.preventDefault();
  }

  function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);

    var messageElement = document.createElement("li");

    if (message.type === "JOIN") {
      messageElement.classList.add("event-message");
      message.content = message.sender + " joined!";
    } else if (message.type === "LEAVE") {
      messageElement.classList.add("event-message");
      message.content = message.sender + " left!";
    } else {
      messageElement.classList.add("chat-message");

      var avatarElement = document.createElement("i");
      var avatarText = document.createTextNode(message.sender[0]);
      avatarElement.appendChild(avatarText);
      avatarElement.style["background-color"] = getAvatarColor(message.sender);

      messageElement.appendChild(avatarElement);

      var usernameElement = document.createElement("span");
      var usernameText = document.createTextNode(message.sender);
      usernameElement.appendChild(usernameText);
      messageElement.appendChild(usernameElement);
    }

    var textElement = document.createElement("p");
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);

    messageElement.appendChild(textElement);

    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
  }

  function getAvatarColor(messageSender) {
    var hash = 0;
    for (var i = 0; i < messageSender.length; i++) {
      hash = 31 * hash + messageSender.charCodeAt(i);
    }
    var index = Math.abs(hash % colors.length);
    return colors[index];
  }

  //   usernameForm.addEventListener("submit", connect, true);
  //   messageForm.addEventListener("submit", sendMessage, true);

  var socket = new SockJS("http://172.30.1.23:8080/socket/");
  stompClient = Stomp.over(socket);

  stompClient.connect({}, onConnected, onError);
  //~ (void) connect(headers, connectCallback, errorCallback)
  //onConnected - connect 콜백 함수
  //onError - error 콜백 함수
  //   var stompClient = null;
  //   function setConnected(connected) {
  //     console.log("connect?");
  //     $("#connect").prop("disabled", connected);
  //     $("#disconnect").prop("disabled", !connected);
  //     if (connected) {
  //       $("#chat").show();
  //     } else {
  //       $("#chat").hide();
  //     }
  //     $("#chat").html("");
  //   }
  //   //소켓 연결
  //   function connect() {
  //     // ws://127.0.0.1:8080/slack
  //     var socket = new SockJS("ws://172.30.1.23:8080/socket");
  //     console.log("socket : ", socket);
  //     //var socket = new SockJS('/slack');
  //     stompClient = Stomp.over(socket);
  //     console.log("stompClient : ", stompClient);
  //     stompClient.connect(
  //       {
  //         Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
  //         chatId: 1,
  //       },
  //       function (msg) {
  //         //stompClient.connect(function(msg) {
  //         setConnected(true);
  //         console.log("Connected: " + msg);
  //         // 입장에 대한 구독
  //         stompClient.subscribe("/topic/on", function (msg) {
  //           console.log(msg);
  //           showHello(JSON.parse(msg.body));
  //         });
  //         // 입장에 대한 메시지 전달
  //         stompClient.subscribe("/topic/1/message", function (msg) {
  //           console.log(msg);
  //           showDetail(JSON.parse(msg.body));
  //         });
  //         // 퇴장에 대한 구독
  //         stompClient.subscribe("/queue/off", function (msg) {
  //           console.log(msg);
  //           showBye(JSON.parse(msg.body));
  //         });
  //         sendHello();
  //       }
  //     );
  //   }
  //   //소켓 연결 끊음
  //   function disconnect() {
  //     if (stompClient != null) {
  //       sendBye();
  //       stompClient.disconnect();
  //     }
  //     setConnected(false);
  //     console.log("Disconnected");
  //   }
  //   function sendHello() {
  //     stompClient.send("/app/on", {}, JSON.stringify({}));
  //     console.log("sendHello");
  //   }
  //   function sendDetail() {
  //     console.log($("#btn-input").val());
  //     stompClient.send(
  //       "/app/chat.1",
  //       {},
  //       JSON.stringify({
  //         content: $("#btn-input").val(),
  //       })
  //     );
  //   }
  //   function sendBye() {
  //     stompClient.send("/app/off", {}, JSON.stringify({}));
  //   }
  //   function showDetail(message) {
  //     console.log("message :", message);
  //     var html = "";
  //     html += '<li class="left clearfix">';
  //     html += '	<div class="chat-body clearfix">';
  //     html += '		<div class="header">';
  //     html +=
  //       '		<strong class="pull-right primary-font">' +
  //       message.sender.username +
  //       "</strong>";
  //     html += '		<small class="text-muted">';
  //     html += '			<i class="fa fa-clock-o fa-fw"></i>' + message.sendDate;
  //     html += "		</small>";
  //     html += "	</div>";
  //     html += "	<p>";
  //     html += message.content;
  //     html += "	</p>";
  //     html += "	</div>";
  //     html += "</li>";
  //     $(".chat").append(html);
  //     $(".panel-body").scrollTop($(".chat")[0].scrollHeight);
  //   }
  //   function showHello(message) {
  //     var html = "";
  //     html += '<li class="left clearfix">';
  //     html += '	<div class="chat-body clearfix">';
  //     html += '	<div class="header">';
  //     html +=
  //       '		<strong class="primary-font">' + message.sender.username + "</strong>";
  //     html += '		<small class="pull-right text-muted">';
  //     html += '			<i class="fa fa-clock-o fa-fw"></i>' + message.sendDate;
  //     html += "		</small>";
  //     html += "	</div>";
  //     html += "	<p>";
  //     html += message.sender.username + "님이 입장하였습니다";
  //     html += "	</p>";
  //     html += "	</div>";
  //     html += "</li>";
  //     $(".chat").append(html);
  //     $(".panel-body").scrollTop($(".chat")[0].scrollHeight);
  //   }
  //   function showBye(message) {
  //     var html = "";
  //     // var date = message.sendDate;
  //     html += '<li class="left clearfix">';
  //     html += '	<div class="chat-body clearfix">';
  //     html += '	<div class="header">';
  //     html +=
  //       '		<strong class="primary-font">' + message.sender.username + "</strong>";
  //     html += '		<small class="pull-right text-muted">';
  //     html += '			<i class="fa fa-clock-o fa-fw"></i>' + message.sendDate;
  //     html += "		</small>";
  //     html += "	</div>";
  //     html += "	<p>";
  //     html += message.sender.username + "님이 퇴장하였습니다";
  //     html += "	</p>";
  //     html += "	</div>";
  //     html += "</li>";
  //     $(".chat").append(html);
  //     $(".panel-body").scrollTop($(".chat")[0].scrollHeight);
  //   }
  //   $(function () {
  //     $("form").on("submit", function (e) {
  //       e.preventDefault();
  //     });
  //     $("#connect").click(function () {
  //       // 소켓 연결
  //       connect();
  //     });
  //     $("#disconnect").click(function () {
  //       // 소켓 연결 끊음
  //       disconnect();
  //     });
  //     $("#btn-chat").click(function () {
  //       // 메시지 전달
  //       sendDetail();
  //       $("#btn-input").val("");
  //     });
  //   });
  return (
    <div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.4.0/sockjs.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"></script>
      <script src="Chat2.js"></script>
      {/* <div id="username-page">
        <div class="username-page-container">
          <h1 class="title">username을 입력하세요</h1>
          <form id="usernameForm" name="usernameForm">
            <div class="form-group">
              <input
                type="text"
                id="name"
                placeholder="Username"
                autocomplete="off"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <button type="submit" class="accent username-submit">
                채팅 시작하기
              </button>
            </div>
          </form>
        </div>
      </div> */}

      <div id="chat-page">
        <div class="chat-container">
          <div class="chat-header">
            <h2>Spring WebSocket Chat Demo</h2>
          </div>
          <div class="connecting">연결중...</div>
          <ul id="messageArea"></ul>
          <form id="messageForm" name="messageForm">
            <div class="form-group">
              <div class="input-group clearfix">
                <input
                  type="text"
                  id="message"
                  placeholder="Type a message..."
                  autocomplete="off"
                  class="form-control"
                />
                <button type="submit" class="primary">
                  보내기
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* <script src="Chat2.js"></script>
      <div id="main-content" class="container">
        <p>
          <div class="row">
            <div class="col-md-6">
              <form class="form-inline">
                <div class="form-group">
                  <label for="senderId">이름</label>
                  <input
                    type="text"
                    id="senderId"
                    class="form-control input-sm"
                    placeholder="이름을 적어주세요"
                  ></input>
                </div>
              </form>
            </div>
            <div class="col-md-6" align="right">
              <form class="form-inline">
                <div class="form-group">
                  <label for="connect">채팅</label>
                  <button
                    id="connect"
                    class="btn btn-xs btn-danger"
                    type="submit"
                  >
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
                </div>
              </form>
            </div>
          </div>
        </p>
        <div class="row">
          <div class="col-md-12">
            <div class="chat-panel panel panel-default">
              <div class="panel-heading">
                <i class="fa fa-comments fa-fw"></i> Chat
              </div>
              <div class="panel-body">
                <ul class="chat" id="chat"></ul>
              </div>
              <div class="panel-footer">
                <form class="form">
                  <div class="form-group">
                    <div class="input-group">
                      <input
                        id="btn-input"
                        type="text"
                        class="form-control input-sm"
                        placeholder="메세지를 적어주세요"
                        autocomplete="off"
                      ></input>
                      <span class="input-group-btn">
                        <button
                          class="btn btn-info btn-sm"
                          id="btn-chat"
                          type="submit"
                        >
                          Send
                        </button>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
export default Chat2;
