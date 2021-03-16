import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";

function LoginPage(props) {
  const dispatch = useDispatch(); // dispatch 사용 (redux)

  // 이메일을 위한 state, 비밀번호를 위한 state 생성
  const [Email, setEmail] = useState(""); // 초깃값 : 빈 string
  // useState 입력 -> 자동완성
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value); // Email의 state을 변경
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault(); // 안하면 누를 때마다 refresh된다. 뒤에 해야할 일들을 할 수가 없다.

    console.log("Email", Email);
    console.log("Password", Password);

    let body = {
      email: Email,
      password: Password,
    };

    loginUser(body) // actions > user_action.js의 loginUser 호출
      .then((response) => {
        if (response.payload.loginSuccess) {
          props.history.push("/");
        } else {
          alert("error");
        }
      });
    // .then(response => {
    //     if(response.payload.loginSuccess){
    //         props.history.push('/'); // 페이지 이동
    //     }else{
    //         alert('error!');
    //     }
    // });

    // axios.post('/api/login', body) // redux 아닌 경우이다. 지금은 user_action.js로 이동
    // .then(response => {

    // })
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
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        {/* typing을 할 때 onChange라는 이벤트를 발생시켜서 state을 바꾸도록 하여, value를 바꾸도록 함.
                    Handler를 넣어야 입력이 가능 */}
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <br />
        <button>Login</button>
      </form>
    </div>
  );
}

export default withRouter(LoginPage);
