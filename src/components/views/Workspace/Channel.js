import React, { useEffect, useState } from "react";
import "./Channel.css";
import Dropdown from "react-dropdown";
import axios from "axios";
import AddChannel from "./AddChannel";
const Channel = () => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    axios
      .get("api/workspaces/1", {
        headers: {
          Authorization: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        var channelArray = response.data.data.channelList;
        setChannels(
          channelArray.map((item) => {
            return <div>{item.name}</div>;
          })
        );
      });
  }, []);

  return (
    <div>
      <Dropdown
        className="toggle"
        options={channels}
        defaultOption="채널"
        // onChange={this._onSelect}
        value={"채널"}
      />
      <AddChannel />
    </div>
  );
};

export default Channel;
