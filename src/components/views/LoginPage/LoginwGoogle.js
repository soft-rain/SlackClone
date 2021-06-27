import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { Googletoken } from "../../../_actions/user_action";

function LoginwGoogle(props) {
  const googleLoginBtn = useRef(null);
  // const [token, setToken] = useState("");
  const dispatch = useDispatch(); // dispatch 사용 (redux)

  useEffect(() => {
    googleSDK();
  }, []);

  //SDK 초기 설정 및 내 API초기화
  const googleSDK = () => {
    window.googleSDKLoaded = () => {
      console.log(window.gapi);
      window.gapi.load("auth2", () => {
        const auth2 = window.gapi.auth2.init({
          client_id:
            "1063116453176-lmh4k8kiinpm3ftp34vs05j3d180tni9.apps.googleusercontent.com",
          scope: "profile email",
        });
        //버튼 클릭시 사용자 정보 불러오기
        auth2.attachClickHandler(
          googleLoginBtn.current,
          {},
          (googleUser) => {
            const profile = googleUser.getBasicProfile();
            sendToken(googleUser.getAuthResponse().access_token);
            console.log(`ID: ${profile.getId()}`);
            console.log(`Name: ${profile.getName()}`);
            console.log(`Image URL: ${profile.getImageUrl()}`);
            console.log(`Email: ${profile.getEmail()}`);
            // sendToken(googleUser.getAuthResponse().access_token);
          },
          (error) => {
            alert(JSON.stringify(error, undefined, 2));
          }
        );
      });
    };
    //구글 SDK 불러오기
    (function (d, s, id) {
      let js;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "google-jssdk");
  };

  //백엔드로 token 보내기
  const sendToken = (googletoken) => {
    let body = {
      accessToken: googletoken,
    };

    console.log(body);
    dispatch(Googletoken(body)).then((response) => {
      if (response.payload) {
        props.history.push("/workspace"); //이동할 페이지
      } else {
        alert("error");
      }
    });
  };
  return (
    <button className="gSignInWrapper">
      <div ref={googleLoginBtn} className="customGPlusSignIn">
        <div className="login-con">
          <img
            className="google-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          ></img>
          <div className="buttonText">Login with Google</div>
        </div>
      </div>
    </button>
  );
}

export default withRouter(LoginwGoogle);
