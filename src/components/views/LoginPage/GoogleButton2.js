import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";

const CLIENT_ID =
  "1063116453176-lmh4k8kiinpm3ftp34vs05j3d180tni9.apps.googleusercontent.com";

class GoogleButton2 extends Component {
  render() {
    return (
      <div>
        <GoogleLogin buttonText="Google을(를) 사용하여 로그인?" />
      </div>
    );
  }
}

export default GoogleButton2;
