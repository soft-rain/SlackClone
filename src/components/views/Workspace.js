import React, { useEffect, useState } from "react";
import "./Workspace.css";
import { workspaceAuth } from "../../_actions/user_action";

export default function Workspace() {
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
              // src={workspaceAuth().data.workspaceMemberList[0].member.picture}
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
            {/* # {workspaceAuth().data.channelList[0].name} */}
          </div>
        </div>
        <div className="main-workspace">
          <div className="side-bar">
            <div className="menu-list">
              {/* {workspaceAuth().data.channelList[0].name} */}
              <br></br>
              {/* {workspaceAuth().data.channelList[1].name} */}
            </div>
            <div className="member-list">
              <img
                className="member-picture"
                // src={workspaceAuth().data.workspaceMemberList[0].member.picture}
                alt="profile-pic"
              ></img>
              {/* {memName()} */}
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
