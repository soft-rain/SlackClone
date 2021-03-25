import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { Googletoken } from "../../../_actions/user_action";
import "./Login.css";
import "./googlelogo.png";
import { GoogleLogin } from "react-google-login";

function Google(props) {
  const googleLoginBtn = useRef(null);
  const [token, setToken] = useState("");
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
            console.log(profile);
            console.log(`Token || ${googleUser.getAuthResponse().id_token}`);
            setToken(googleUser.getAuthResponse().id_token);
            console.log(`ID: ${profile.getId()}`);
            console.log(`Name: ${profile.getName()}`);
            console.log(`Image URL: ${profile.getImageUrl()}`);
            console.log(`Email: ${profile.getEmail()}`);
            sendToken(googleUser.getAuthResponse().id_token);
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
  const sendToken = (token) => {
    let body = {
      token: token,
    };

    dispatch(Googletoken(body)).then((response) => {
      if (response.payload) {
        props.history.push("/");
      } else {
        alert("error");
      }
    });
  };

  return (
    <div>
      <button id="gSignInWrapper">
        <span className="label" />
        <div ref={googleLoginBtn} id="customBtn" className="customGPlusSignIn">
          <span className="icon"></span>
          <span className="buttonText">Google을(를) 사용하여 로그인</span>
          {/* <GoogleLogin className="googleloginbutton" /> */}
        </div>
      </button>
    </div>
  );
}

export default withRouter(Google);
