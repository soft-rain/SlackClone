import React, { useState } from "react";
import axios from "axios";
import "./Modal.css";
import "./Channel.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const Modal = (props) => {
  const { open, close, header } = props;
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [privacy, setPrivacy] = useState("");

  const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    console.log(event.target.checked);
    if (event.target.checked === true) {
      setPrivacy(true);
    } else {
      setPrivacy(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios({
      method: "post",
      url: "/api/workspaces/1/channels",
      data: {
        name: `${name}`,
        description: `${des}`,
        isPrivate: `${privacy}`,
      },
      headers: {
        Authorization: sessionStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }).then((response) => console.log(response));
  };
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              x
            </button>
          </header>
          <main>
            <div className="addChannelDes">
              채널은 팀이 소통하는 공간입니다. 채널은 주제(예: 마케팅)를
              중심으로 구성하는 것이 가장 좋습니다.
            </div>
            <form className="addChannelInput" onSubmit={handleSubmit}>
              <div style={{ display: "block", justifyContent: "flex-start" }}>
                <div>
                  <div
                    style={{
                      color: "black",
                      fontWeight: "700",
                      fontSize: "15px",
                      marginBottom: "10px",
                    }}
                  >
                    이름
                  </div>
                  <input
                    className="channelInput"
                    placeholder="# 예: 플랜 예산"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>
                <div>
                  <div
                    style={{
                      color: "black",
                      fontWeight: "700",
                      fontSize: "15px",
                      marginBottom: "10px",
                    }}
                  >
                    설명
                    <span style={{ color: "black", fontWeight: "300" }}>
                      {" "}
                      (옵션)
                    </span>
                  </div>
                  <input
                    className="channelInput"
                    onChange={(e) => setDes(e.target.value)}
                    value={des}
                  />
                  <div
                    style={{
                      fontSize: "10px",
                      color: "gray",
                      marginBottom: "10px",
                    }}
                  >
                    무엇에 대한 채널인가요?
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      color: "black",
                      fontWeight: "700",
                      fontSize: "15px",
                    }}
                  >
                    비공개로 만들기
                  </div>
                  <div
                    className="new"
                    style={{ display: "flex", width: "450px" }}
                  >
                    <div
                      style={{
                        width: "80%",
                        color: "black",
                        fontWeight: "500",
                        fontSize: "13px",
                        paddingRight: "10px",
                      }}
                    >
                      채널이 비공개로 설정된 경우 초대를 통해서만 조회 또는
                      참여할 수 있습니다.
                    </div>
                    <FormControlLabel
                      style={{ float: "right" }}
                      control={<Switch />}
                      label="Uncontrolled"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <footer>
                <button type="submit" onClick={close}>
                  생성
                </button>
              </footer>
            </form>
            {/* {props.children} */}
          </main>
        </section>
      ) : null}
    </div>
  );
};
export default Modal;
