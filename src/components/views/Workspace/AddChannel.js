import React, { useEffect, useState } from "react";
import axios from "axios";
const AddChannel = () => {
  const [channel, setChannel] = useState("");
  const [des, setDes] = useState("");

  const addChannel = () => {
    axios({
      method: "post",
      url: "/api/workspaces/1/channels",
      data: {
        name: { channel },
        description: { des },
        isPrivate: true,
      },
      headers: {
        Authorization: sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }).then((response) => console.log(response));
  };

  return (
    <div>
      <form>
        <div>
          채널명
          <input value={(e) => setChannel(e.target.value)} />
          description
          <input value={(e) => setDes(e.target.value)} />
        </div>
      </form>
    </div>
  );
};

export default AddChannel;
