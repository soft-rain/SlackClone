import React, { useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Login from "../LoginPage/Login";
function LandingPage(props) {
  useEffect(() => {
    axios.get("/api/hello").then((response) => {
      console.log(response.data);
    });
  }, []);

  const onClickHandler = () => {
    axios.get("/api/logout").then((response) => {
      console.log(response.data);
      if (response.data.success) {
        props.history.push("/login"); // react-router-dom 을 이용함
      } else {
        alert("Failed to logout");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Login />
      {/* <h2>시작 페이지</h2> */}

      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  );
}

export default withRouter(LandingPage);
