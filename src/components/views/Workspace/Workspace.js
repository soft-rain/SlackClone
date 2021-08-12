import React, { useState } from "react";
import "./Workspace.css";
import axios from "axios";
import Chat from "./Chat";
const memberarr = [];
const menuarr = [];
// const picarr = [];
export default function Workspace() {
  const [message, setMessage] = useState("");
  const [menu, setMenu] = useState("");
  const [nickname, setNickname] = useState("");
  // const [profilepic, setProfilepic] = useState("");
  const [channel, setChannel] = useState("");
  const [userpic, setUserpic] = useState("");
  axios
    .get("api/workspaces/1", {
      headers: {
        Authorization: sessionStorage.getItem("accessToken"),
      },
    })
    .then((response) => {
      // console.log(response.data);
      setMessage(response.data.message);
      for (var i = 0; i < response.data.data.memberList.length; i++) {
        if (response.data.data.memberList[i] === undefined) break;
        else {
          memberarr.push(
            <div>
              <img
                className="member-picture"
                src={response.data.data.memberList[i].picture}
                alt=""
              ></img>
              &nbsp;
              {response.data.data.memberList[i].nickname}
            </div>
          );
        }
      }
      setNickname(memberarr);
      // setProfilepic(picarr);
      setUserpic(response.data.data.memberList[0].picture);
      for (var j = 0; j < response.data.data.channelList.length; j++) {
        if (response.data.data.channelList[j] === undefined) break;
        else {
          menuarr.push(response.data.data.channelList[j].name);
        }
      }
      setMenu(menuarr);
      setChannel(response.data.data.channelList[0].description);
    });
  const DisplayMenu = () => {
    const menuList = menuarr.map((item) => <div> # {item}</div>);
    return menuList;
  };
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
              // srcSet="https://ca.slack-edge.com/T01Q7MA3XGR-U01PE9HCWH5-gf381af91724-72 2x"
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

          <div className="sub-bar2">{message}</div>
        </div>
        <div className="main-workspace">
          <div className="side-bar">
            <div className="toggle">채널</div>
            <div className="menu-list">
              <DisplayMenu />
              <br></br>
            </div>
            <div className="member-list">
              {/* <img className="member-picture" src={profilepic} alt=""></img> */}
              {nickname}
            </div>
          </div>
          <div className="chat">
            <div className="chatInfoBox">
              <span style={{ whiteSpace: "pre-wrap", fontWeight: "800" }}>
                # {menu[0]}
              </span>
              <span style={{ fontWeight: "500" }}>
                을 찾으셨습니다.<br></br>
              </span>
              <div style={{ fontWeight: "500" }}> {channel}</div>
            </div>

            <Chat />
            {/* <div className="send-message-box">
              #{menu[0]}에게 메시지 보내기 부분
            </div> */}
          </div>
        </div>
      </div>

      <div>Workspace</div>
    </div>
  );
}
