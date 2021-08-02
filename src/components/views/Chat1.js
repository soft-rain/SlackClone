import React from "react";
// import SockJS from "react-stomp";
import SockJS from "sockjs-client";

import { Stomp } from "@stomp/stompjs";
import "./Chat.css";
import $ from "jquery";
var stompClient = null;

const Chat1 = () => {
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
    var socket = new SockJS("http://172.30.1.34:8080/socket");
    // console.log("socket : ", socket);
    //var socket = new SockJS('/slack');
    stompClient = Stomp.over(socket);
    // console.log("stompClient : ", stompClient);
    socket.onopen = function () {
      console.log("open");
    };
    stompClient.connect(
      {
        Authorization: sessionStorage.getItem("accessToken"),
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
        console.log("Hello전");

        sendHello();
        console.log("Hello다음");
      }
    );
    // console.log("setConnected: ", setConnected());
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
    // $(".chat").append(html);
    // $(".panel-body").scrollTop($(".chat")[0].scrollHeight);
    return (
      <div>
        <li className="left clearfix">
          <div className="chat-body clearfix">
            <div className="header">
              <strong className="pull-right primary-font">
                +{message.sender.username}
              </strong>
              <small className="text-muted">
                <i className="fa fa-clock-o fa-fw"></i>
                {message.sendDate}
              </small>
            </div>
            <p>{message.content}</p>
          </div>
        </li>
      </div>
    );
  }
  function showHello(message) {
    console.log(message);
    // $(".chat").append(html);
    // $(".panel-body").scrollTop($(".chat")[0].scrollHeight);
    return (
      <div>
        <li className="left clearfix">
          <div className="chat-body clearfix">
            <div className="header">
              <strong className="primary-font">
                {message.sender.username}
              </strong>
              <small className="pull-right text-muted">
                <i className="fa fa-clock-o fa-fw"></i>
                {message.sendDate}
              </small>
            </div>
            <p>{message.sender.username}님이 입장하셨습니다</p>
          </div>
        </li>
      </div>
    );
  }
  function showBye(message) {
    // $(".chat").append(html);
    // $(".panel-body").scrollTop($(".chat")[0].scrollHeight);
    return (
      <div>
        <li className="left clearfix">
          <div className="chat-body clearfix">
            <div className="header">
              <strong className="primary-font">
                {message.sender.username}
              </strong>
              <small className="pull-right text-muted">
                <i className="fa fa-clock-o fa-fw"></i>
                {message.sendDate}
              </small>
            </div>
            <p>{message.sender.username}님이 퇴장하였습니다</p>
          </div>
        </li>
      </div>
    );
  }
  //   $(function () {
  //     $("form").on("submit", function (e) {
  //       e.preventDefault();
  //     });
  //     $("#connect").click(function () {
  //       // 소켓 연결
  //       console.log("전");
  //       connect();
  //       console.log("여기");
  //     });
  //     $("#disconnect").click(function () {
  //       // 소켓 연결 끊음
  //       disconnect();
  //     });
  //     $("#btn-chat").click(function () {
  //       // 메시지 전달

  //       sendDetail();
  //       console.log("send부분");
  //       $("#btn-input").val("");
  //     });
  //   });
  return (
    <div>
      <script src="Chat1.js"></script>
      <script
        type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.1.5/sockjs.min.js"
      ></script>
      <script src="/webjars/jquery/jquery.min.js"></script>
      <script src="/webjars/sockjs-client/sockjs.min.js"></script>
      <script src="/webjars/stomp-websocket/stomp.min.js"></script>
      <div id="main-content" className="container">
        <p>
          <div className="row">
            <div className="col-md-6">
              <form className="form-inline">
                <div className="form-group">
                  <label for="senderId">이름</label>
                  <input
                    type="text"
                    id="senderId"
                    className="form-control input-sm"
                    placeholder="이름을 적어주세요"
                  ></input>
                </div>
              </form>
            </div>
            <div className="col-md-6" align="right">
              <form className="form-inline">
                <div className="form-group">
                  <label for="connect">채팅</label>
                  <button
                    id="connect"
                    className="btn btn-xs btn-danger"
                    type="submit"
                    onClick={((e) => e.preventDefault(), connect)}
                  >
                    ON
                  </button>
                  <button
                    id="disconnect"
                    className="btn btn-xs"
                    type="submit"
                    disabled="disabled"
                    onClick={disconnect}
                  >
                    OFF
                  </button>
                </div>
              </form>
            </div>
          </div>
        </p>
        <div className="row">
          <div className="col-md-12">
            <div className="chat-panel panel panel-default">
              <div className="panel-heading">
                <i className="fa fa-comments fa-fw"></i> Chat
              </div>
              <div className="panel-body">
                <ul className="chat" id="chat"></ul>
              </div>
              <div className="panel-footer">
                <form className="form">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        id="btn-input"
                        type="text"
                        className="form-control input-sm"
                        placeholder="메세지를 적어주세요"
                        autoComplete="off"
                      ></input>
                      <span className="input-group-btn">
                        <button
                          className="btn btn-info btn-sm"
                          id="btn-chat"
                          type="submit"
                          onClick={sendDetail}
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
      </div>
    </div>
  );
};
export default Chat1;
