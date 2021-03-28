import React, { Component } from "react";
import "./AuthCode.css";

class AuthCode extends React.Component {
  render() {
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
            <strong>yurimplus@naver.com</strong>에 6자리 코드를 전송했습니다.
            코드는 잠시 후에 만료되니 서둘러 입력하세요.
          </div>
        </div>
        <form class="confirmation_code">
          <div className="confirmation_code_input_cont">
            <fieldset class="confirmation_code_input_cont_fieldset">
              <legend className="offscreen">6자 확인 코드</legend>
              <div
                className="display_flex_align_items"
                data-qa="confirmation_code_input"
                data-state=""
              >
                <div className="display_flex">
                  <div class="split_input_item">
                    <input
                      type="text"
                      maxLength="1"
                      aria-label="6의 숫자 1"
                      aria-disabled="false"
                      value=""
                    ></input>
                  </div>
                  <div class="split_input_item">
                    <input
                      type="text"
                      maxLength="1"
                      aria-label="6의 숫자 2"
                      aria-disabled="false"
                      value=""
                    ></input>
                  </div>
                  <div class="split_input_item">
                    <input
                      type="text"
                      maxLength="1"
                      aria-label="6의 숫자 3"
                      aria-disabled="false"
                      value=""
                    ></input>
                  </div>
                </div>
                <div class="confirmation_code_dash">—</div>
                <div className="display_flex">
                  <div class="split_input_item">
                    <input
                      type="text"
                      maxLength="1"
                      aria-label="6의 숫자 4"
                      aria-disabled="false"
                      value=""
                    ></input>
                  </div>
                  <div class="split_input_item">
                    <input
                      type="text"
                      maxLength="1"
                      aria-label="6의 숫자 5"
                      aria-disabled="false"
                      value=""
                    ></input>
                  </div>
                  <div class="split_input_item">
                    <input
                      type="text"
                      maxLength="1"
                      aria-label="6의 숫자 6"
                      aria-disabled="false"
                      value=""
                    ></input>
                  </div>
                </div>
              </div>
            </fieldset>
            <br></br>
            {/* <div className="checkerbox">
              <div className="confirm_checker" data-state="">
                <p className="alert_message_box">
                  <i className="alert_icon"></i>
                  <span className="alert_msg">
                    그 코드는 유효하지 않습니다. 다시 시도해보세요!
                  </span>
                </p>
              </div>
            </div> */}
          </div>
        </form>
      </section>
    );
  }
}

export default AuthCode;
