import React, { useState } from "react";
import { withRouter } from "react-router";
import "./AuthCode.css";

// class AuthCode extends React.Component {
//   render() {
function AuthCode(props) {
  const AuthenticationCode = () => {
    const [value, setValue] = useState("");
    const onChange = (event) => {
      setValue(event.target.value);
    };

    return (
      <section>
        <header>
          <div className="left-col"></div>
          <div className="slacklogo">
            <img
              src="https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg"
              alt="Slack"
            ></img>
            <div className="right-col"></div>
          </div>
        </header>
        <div className="content">
          <h1 className="headerText">코드는 이메일에서 확인하세요</h1>
          <div className="subText">
            <strong>{}</strong>에 6자리 코드를 전송했습니다. 코드는 잠시 후에
            만료되니 서둘러 입력하세요.
          </div>
        </div>
        <form className="confirmation_code">
          <div className="confirmation_code_input_cont">
            <fieldset className="confirmation_code_input_cont_fieldset">
              <legend className="offscreen">6자 확인 코드</legend>
              <div
                className="display_flex_align_items"
                data-qa="confirmation_code_input"
                data-state=""
              >
                <div className="display_flex">
                  <div className="split_input_item">
                    <input
                      type="text"
                      maxLength="1"
                      aria-label="6의 숫자 1"
                      aria-disabled="false"
                      value={value}
                      onChange={onChange}
                    ></input>
                  </div>
                  <div className="split_input_item">
                    <input
                      type="text"
                      maxLength="1"
                      aria-label="6의 숫자 2"
                      aria-disabled="false"
                      value={value}
                      onChange={onChange}
                    ></input>
                  </div>
                  <div className="split_input_item">
                    <input
                      type="text"
                      maxLength="1"
                      aria-label="6의 숫자 3"
                      aria-disabled="false"
                      value={value}
                      onChange={onChange}
                    ></input>
                  </div>
                </div>
                <div className="confirmation_code_dash">—</div>
                <div className="display_flex">
                  <div className="split_input_item">
                    <input
                      type="text"
                      maxLength="1"
                      aria-label="6의 숫자 4"
                      aria-disabled="false"
                      value={value}
                      onChange={onChange}
                    ></input>
                  </div>
                  <div className="split_input_item">
                    <input
                      type="text"
                      maxLength="1"
                      aria-label="6의 숫자 5"
                      aria-disabled="false"
                      value={value}
                      onChange={onChange}
                    ></input>
                  </div>
                  <div className="split_input_item">
                    <input
                      type="text"
                      maxLength="1"
                      aria-label="6의 숫자 6"
                      aria-disabled="false"
                      value={value}
                      onChange={onChange}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="checkerbox">
                <div className="confirm_checker" data-state="">
                  <p className="alert_message_box">
                    <i className="alert_icon"></i>
                    {/* <span className="alert_msg">
                    그 코드는 유효하지 않습니다. 다시 시도해보세요!
                  </span> */}
                  </p>
                </div>
              </div>
            </fieldset>
            <br></br>
          </div>
        </form>
        <div className="display_flex">
          <a
            target="_blank"
            className="gmailbutton"
            //   href="https://mail.google.com/mail/u/0/"
            useref="noopener noreferrer"
          >
            <img
              className="margin_right_50"
              alt=""
              srcSet="https://a.slack-edge.com/bv1-9/get-started-icon-gmail-b3b3a57.png, https://a.slack-edge.com/bv1-9/get-started-icon-gmail@2x-e80b706.png 2x"
            ></img>
            Gmail 열기
            <span aria-label="(새 탭에서 열기)"></span>
          </a>
          <a
            target="_blank"
            className="outlookbutton"
            //   href="https://outlook.live.com/mail/0/inbox/"
            useref="noopener noreferrer"
          >
            <img
              className="margin_right_50"
              alt=""
              srcSet="https://a.slack-edge.com/bv1-9/get-started-icon-outlook-55f9ac5.png, https://a.slack-edge.com/bv1-9/get-started-icon-outlook@2x-4cc97d5.png 2x"
            ></img>
            Outlook 열기
            <span aria-label="(새 탭에서 열기)"></span>
          </a>
        </div>
        <div className="code_hint">
          고객님의 코드를 찾을 수 없나요? 스팸 폴더를 확인해 보세요!
        </div>
        <footer className="footer_text">
          <a
            target="_blank"
            className="footer_link"
            href="/intl/ko-kr/legal"
            rel="noopener noreferrer"
          >
            개인정보 보호 및 약관
          </a>
          <a
            target="_blank"
            className="footer_link"
            href="/intl/ko-kr/help/contact"
            rel="noopener noreferrer"
          >
            문의하기
          </a>
        </footer>
      </section>
    );
  };
}

export default withRouter(AuthCode);
