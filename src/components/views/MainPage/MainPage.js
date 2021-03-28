import React, { useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Login from "../LoginPage/Login";
import GoogleButton from "../LoginPage/GoogleButton";
import LoginPage from "../LoginPage/LoginPage";
import { bindActionCreators } from "redux";

function MainPage(props) {
  useEffect(() => {
    axios.get("/api/hello").then((response) => {
      console.log(response.data);
    });
  }, []);

  const onClickHandler = () => {
    axios.get("/api/logout").then((response) => {
      console.log(response.data);
      if (response.data.success) {
        props.history.push("/login");
      } else {
        alert("Failed to logout");
      }
    });
  };

  return <div style={{ display: "block" }}></div>;
}
export default withRouter(MainPage);
