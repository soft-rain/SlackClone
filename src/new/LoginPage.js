import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendEmail } from "../_actions/user_action";
import "../components/views/Login.css";
import { withRouter, Link } from "react-router-dom";
import LoginwGoogle from "../components/views/LoginPage/LoginwGoogle.js";

function LoginPage(props) {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    let body = {
      email: Email,
    };
    dispatch(sendEmail(body)) // actions > user_action.js의 loginUser 호출
      .then((response) => {
        if (response.payload) {
          props.history.push("/authcode");
        } else {
          alert("error");
        }
      });
  };
  return (
    <div className="login">
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

      <div className="googleLogin">
        <LoginwGoogle />
      </div>

      <br></br>
      <div className="hr-sect">또는</div>
      <br></br>
      <div>
        <form onSubmit={onSubmitHandler}>
          <input
            className="emailinput"
            placeholder="name@work-email.com"
            type="email"
            value={Email}
            onChange={onEmailHandler}
          />
          <br></br>
          <Link to="/authcode">
            <button
              onSubmit={onSubmitHandler}
              type="submit"
              className="loginbutton"
            >
              이메일로 로그인
            </button>
          </Link>
        </form>
      </div>
      <div className="log-subtext">
        <span className="log-subtext1">
          비밀번호 없이 로그인할 수 있도록 매직 코드를 이메일로 보내드립니다.
          아니면 <button className="log-subtext2">수동으로 로그인</button>하셔도
          됩니다.
        </span>
      </div>

      <div>
        <br></br>
      </div>
      <div>
        <footer className="mainfooter">
          <button className="privacy">개인정보 보호 및 약관</button>
          <button className="ask">문의하기</button>
          <button className="changeregion">지역 변경</button>
        </footer>
      </div>
    </div>
  );
}
export default withRouter(LoginPage);
