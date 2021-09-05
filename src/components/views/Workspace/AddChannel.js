import React, { useState } from "react";
import axios from "axios";
const AddChannel = () => {
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();

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
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="channel"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            placeholder="description"
            onChange={(e) => setDes(e.target.value)}
            value={des}
          />
        </div>
        <button type="submit">+</button>
      </form>
    </div>
  );
};

export default AddChannel;
