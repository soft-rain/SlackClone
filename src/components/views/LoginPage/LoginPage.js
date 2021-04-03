import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, sendEmail } from "../../../_actions/user_action";
import axios from "axios";
import "./Login.css";
import { withRouter } from "react-router-dom";

function LoginPage(props) {
  const dispatch = useDispatch(); // dispatch 사용 (redux)
  // 이메일을 위한 state, 비밀번호를 위한 state 생성
  const [Email, setEmail] = useState(""); // 초깃값 : 빈 string
  // useState 입력 -> 자동완성

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value); // Email의 state을 변경
  };
  // const onPasswordHandler = (event) => {
  //   setPassword(event.currentTarget.value);
  // };
  const onSubmitHandler = (event) => {
    event.preventDefault(); // 안하면 누를 때마다 refresh된다. 뒤에 해야할 일들을 할 수가 없다.
    console.log("Email", Email);
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
    <div>
      <form onSubmit={onSubmitHandler}>
        <input
          className="emailinput"
          placeholder="name@work-email.com"
          type="email"
          value={Email}
          onChange={onEmailHandler}
        />
        <br />
        <button
          onSubmit={onSubmitHandler}
          type="submit"
          className="loginbutton"
        >
          이메일로 로그인
        </button>
      </form>
    </div>
  );
}
export default withRouter(LoginPage);
