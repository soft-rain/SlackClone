import React, { useState } from "react";
import "./Workspace.css";
<<<<<<< HEAD
import axios from "axios";
const memberarr = [];
const menuarr = [];
export default function Workspace() {
  const [message, setMessage] = useState("");
  const [menu, setMenu] = useState("");
  const [nickname, setNickname] = useState("");
  const [profilepic, setProfilepic] = useState("");
  axios
    .get("api/workspaces/1", {
      headers: {
        Authorization: sessionStorage.getItem("accessToken"),
      },
    })
    .then((response) => {
      console.log(response.data);
      setMessage(response.data.message);
      for (var i = 0; i < response.data.data.workspaceMemberList.length; i++) {
        if (response.data.data.workspaceMemberList[i] === undefined) break;
        else {
          memberarr.push(
            <div>
              {response.data.data.workspaceMemberList[i].member.nickname}
            </div>
          );
        }
        console.log(memberarr[i]);
      }
      setNickname(memberarr);

      for (var i = 0; i < response.data.data.channelList.length; i++) {
        if (response.data.data.channelList[i] === undefined) break;
        else {
          menuarr.push(<div>{response.data.data.channelList[i].name}</div>);
        }
        console.log(menuarr[i]);
      }
      setMenu(menuarr);
      setProfilepic(response.data.data.workspaceMemberList[0].member.picture);
    });

=======
import { workspaceAuth } from "../../_actions/user_action";
import axios from "axios";

export default function Workspace() {
  // const [message, setMessage] = useState(null);
  // async function workspaceAuth() {
  //   // console.log(`${sessionStorage.getItem("accessToken")}`);
  //   try {
  //     const request = await axios
  //       .get("/api/workspaces/1", {
  //         headers: {
  //           Authorization: sessionStorage.getItem("accessToken"),
  //         },
  //       })
  //       .then((response) => {
  //         setMessage(response.message);
  //         console.log(message);
  //       });

  //     return {
  //       payload: request,
  //     };
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
>>>>>>> 4b7fd40beea92f018751f8add6fe46499c4b098a
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
              B
            </button>
          </div>
        </div>

        <div className="top-bar-right">
          <div className="profile-wrap">
            <img //여기는 추후에 구글 계정 프로필 받고 수정해야함!
              className="profile-icon"
<<<<<<< HEAD
              src={profilepic}
=======
              // src={workspaceAuth().data.workspaceMemberList[0].member.picture}

>>>>>>> 4b7fd40beea92f018751f8add6fe46499c4b098a
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
              <div
                className="sub-bar1-down"
                type="chevron-down"
                aria-hidden="true"
              >
                ^
              </div>
            </div>
          </div>

          <div className="sub-bar2">
            {workspaceAuth().data.data.channelList[0].name}
            {/* # {workspaceAuth().data.channelList[0].name} */}

            {message}
          </div>
        </div>
        <div className="main-workspace">
          <div className="side-bar">
            <div className="menu-list">
              {menu}
              <br></br>
            </div>
            <div className="member-list">
              <img
                className="member-picture"
                src={profilepic}
                alt="profile-pic"
              ></img>
              {nickname}
            </div>
          </div>
          <div className="chat">
            chat-space
            <div className="send-message-box">#일반에게 메시지 보내기 부분</div>
          </div>
        </div>
      </div>

      <div>Workspace</div>
    </div>
  );
}
