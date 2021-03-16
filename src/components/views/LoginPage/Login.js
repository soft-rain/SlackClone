import React from "react";
import GoogleButton from "./GoogleButton.js";
import "./Login.css";
import Login2 from "./Login2.js";

class Login extends React.Component {
  render() {
    return (
      <div className="login">
        {/*로그인로고*/}
        <div>
          <img
            src="https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg"
            className="loginlogo"
            alt="Slack"
          />
        </div>
        <br></br>
        <br></br>
        <div className="loginheader">Slack에 로그인</div>
        <br></br>
        <div className="logintext">
          로그인하려면 사용하는 Google계정이나 이메일 주소로 계속해 주세요.
        </div>
        <br></br>
        <br></br>
        <br></br>
        {/* 구글로그인 버튼 */}

        <div className="googleLogin">
          {/* <GoogleButton /> */}
          <Login2 />
        </div>

        <br></br>
        <div className="hr-sect">또는</div>
        <br></br>
        <input
          className="emailinput"
          placeholder="name@work-email.com"
          type="text"
        ></input>
        <br></br>
        <button type="button" className="loginbutton">
          이메일로 로그인
        </button>
        <div className="log-subtext">
          비밀번호 없이 로그인할 수 있도록 매직 코드를 이메일로 보내드립니다.
          아니면 수동으로 로그인하셔도 됩니다.
        </div>
      </div>
    );
  }
}
export default Login;
