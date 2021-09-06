import React, { useEffect, useState } from "react";
import "./Channel.css";
import Dropdown from "react-dropdown";
import axios from "axios";
import AddChannel from "./AddChannel";
import styled from "styled-components";
import { Collapse } from "@material-ui/core";

const Channel = () => {
  const [channels, setChannels] = useState([]);
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("#3f0e40");
  const [btnColor, setBtnColor] = useState("#3f0e40");
  var channelArray = [];
  useEffect(() => {
    axios
      .get("api/workspaces/1", {
        headers: {
          Authorization: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        channelArray = response.data.data.channelList;
        setChannels(
          channelArray.map((item) => {
            return <div>{item.name}</div>;
          })
        );
      });
  }, []);
  const onClick = () => {
    color === "#3f0e40" ? setColor("#1164A3") : setColor("#3f0e40");
  };
  const btnOnClick = () => {
    btnColor === "#3f0e40" ? setBtnColor("gray") : setBtnColor("#3f0e40");
  };
  return (
    <div>
      <div style={{ display: "inline-flex", textAlign: "center" }}>
        <div
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
          className="collapseMenu"
        >
          채널
        </div>
        <AddChannel />
      </div>
      <Collapse in={open}>
        <Div color={color} onClick={onClick}>
          {/* {channels.map((item) => {
            return (
              <Div color={color} onClick={onClick}>
                {item}
              </Div>
            );
          })} */}
          {channels}
        </Div>
      </Collapse>
    </div>
  );
};

export default Channel;
const Div = styled.div`
  border: none;
  color: white;
  background-color: ${(props) => props.color};
  display: block;
`;
