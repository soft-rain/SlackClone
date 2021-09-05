import React, { useState } from "react";
import "./Workspace.css";
import axios from "axios";
import Chat from "./Chat";
import Channel from "./Channel";
var memberArr = [];
var channelArr = [];
var desArr = [];
function NewWorkspace() {
  const [channel, setChannel] = useState("");
  const [nickname, setNickname] = useState("");
  const [chDes, setChDes] = useState("");
  const [userpic, setUserpic] = useState("");
  axios
    .get("api/workspaces/1", {
      headers: {
        Authorization: sessionStorage.getItem("accessToken"),
      },
    })
    .then((response) => {
      response.data.data.memberList.map((member) => {
        memberArr.push(
          <div>
            <img className="member-picture" src={member.picture} alt=""></img>
            &nbsp;
            {member.nickname}
          </div>
        );
      });
      response.data.data.channelList.map((channel) => {
        channelArr.push(channel.name);
        desArr.push(channel.description);
      });
      setChannel(channelArr);
      setNickname(memberArr);
      setChDes(desArr);
    });

  return (
    <div className="fullbox">
      <div className="top-bar">
        <div className="top-bar-left"></div>
        <div className="top-bar-wrap">
          <div className="top-bar-search">
            <input
              className="searchInput"
              type="text"
              placeholder="워크스페이스이름 + 검색"
            ></input>
            <button className="searchButton" type="submit">
              S
            </button>
          </div>
        </div>

        <div className="top-bar-right">
          <div className="profile-wrap">
            <img //여기는 추후에 구글 계정 프로필 받고 수정해야함!
              className="profile-icon"
              src={userpic}
              aria-hidden="true"
              role="img"
              alt=""
            ></img>
          </div>
        </div>
      </div>
      <div className="workspace">
        <div className="sub-bar">
          <div className="sub-bar1">
            <div className="sub-bar1-wrap">
              <div className="sub-bar1-text">슬클</div>
            </div>
          </div>

          {/* <div className="sub-bar2">{message}</div> */}
        </div>
        <div className="main-workspace">
          <div className="side-bar">
            <div className="menu-list">
              <Channel />
            </div>
            <div className="member-list">
              {/* <img className="member-picture" src={profilepic} alt=""></img> */}
              {nickname}
            </div>
          </div>
          <div className="chat">
            <div className="chatInfoBox">
              <span style={{ whiteSpace: "pre-wrap", fontWeight: "800" }}>
                # {channel[0]}
              </span>
              <span style={{ fontWeight: "500" }}>
                을 찾으셨습니다.<br></br>
              </span>
              <div style={{ fontWeight: "500" }}>{/* {channel} */}</div>
            </div>

            <Chat />
            {/* <div className="send-message-box">
              #{channel[0]}에게 메시지 보내기 부분
            </div> */}
          </div>
        </div>
      </div>

      <div>Workspace</div>
    </div>
  );
}
export default NewWorkspace;
