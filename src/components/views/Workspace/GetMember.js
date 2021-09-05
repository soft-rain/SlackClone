import React, { useState } from "react";
import "./Workspace.css";
import axios from "axios";

function GetMember() {
  var pictureArr = [];
  var memberArr = [];
  axios
    .get("api/workspaces/1", {
      headers: {
        Authorization: sessionStorage.getItem("accessToken"),
      },
    })
    .then((response) => {
      console.log(response.data);

      response.data.data.memberList.map((item) => {
        memberArr.push(
          <div>
            <img className="member-picture" src={item.picture} alt=""></img>
            &nbsp;
            {item.nickname}
          </div>
        );
      });
    });
  return memberArr;
}
export default GetMember;
