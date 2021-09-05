import React, { useEffect, useState } from "react";
import "./Channel.css";
import Dropdown from "react-dropdown";
import axios from "axios";
import AddChannel from "./AddChannel";
const Channel = () => {
  const [channels, setChannels] = useState([]);

  const [values, setValues] = useState({
    name: "",
    description: "",
  });
  const [name, setName] = useState("");
  const [des, setDes] = useState("");

  const handleChange = (event) => {
    // const { name, value } = event.target;
    // setValues({ ...values, [name]: value });
    setName(event.target.value);
    setDes(event.target.value);
    console.log(values);
  };
  console.log("1");
  useEffect(() => {
    axios
      .get("api/workspaces/1", {
        headers: {
          Authorization: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        var channelArray = response.data.data.channelList;
        console.log(channelArray);
        setChannels(
          channelArray.map((item) => {
            return <div>{item.name}</div>;
          })
        );
      });
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("2");

    axios({
      method: "post",
      url: "/api/workspaces/1/channels",
      data: {
        name: `${name}`,
        description: `${des}`,
        isPrivate: true,
      },
      headers: {
        Authorization: sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }).then((response) => console.log(response));
    console.log(values);
  };

  // axios({
  //   method: "post",
  //   url: "/api/workspaces/1/channels",
  //   data: {

  //     isPrivate: true,
  //   },
  //   headers: {
  //     Authorization: sessionStorage.getItem("accessToken"),
  //     "Content-Type": "application/json",
  //   },
  // }).then((response) => console.log(response));
  // console.log(values);

  return (
    <>
      <Dropdown
        className="toggle"
        options={channels}
        defaultOption="채널"
        // onChange={this._onSelect}
        value={"채널"}
      />
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            채널
            <input value={name} onChange={handleChange} />
            description
            <input value={des} onChange={handleChange} />
          </div>
          <button type="submit">+</button>
        </form>
      </div>
    </>
  );
};

export default Channel;
