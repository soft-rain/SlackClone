import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  SEND_EMAIL,
  CODE_CHECK,
} from "./types";

export function loginUser(dataTosubmit) {
  console.log("data to submit: ", { dataTosubmit });
  const request = axios
    .post("/api/login", dataTosubmit)
    .then((response) => response.data);

  return {
    // 다음 state
    type: LOGIN_USER,
    payload: request, // reducer로 전달하자.
  };
}

export function registerUser(dataTosubmit) {
  const request = axios
    .post("/api/register", dataTosubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios.get("/api/auth").then((response) => response.data);
  return {
    type: AUTH_USER,
    payload: request,
  };
}

export async function Googletoken(dataTosubmit) {
  try {
    // const request = axios
    //   // .post("/api/auth/login/oauth2/code/google", dataTosubmit, {
    //   .post("http://172.30.1.52:8080/api/member/login/google", dataTosubmit, {
    //     headers: { "Content-Type": `application/json` },
    //   })
    //   .then((response) => response.data);

    // console.log(request);

    // return {
    //   type: LOGIN_USER,
    //   payload: request,
    // };
    const request = await axios.post(
      "http://172.30.1.34:8080/api/member/login/google",
      dataTosubmit,
      {
        headers: { "Content-Type": `application/json` },
      }
    );
    sessionStorage.setItem("accessToken", request.data.data.accessToken); //서버로부터 받은 accessToken을 sessionStorage에 저장함
    console.log(request.data.data.accessToken);
    console.log(request.status); //200이면 성공, 400이면 실패
    // console.log(sessionStorage.getItem("accessToken"));
    return {
      type: LOGIN_USER,
      payload: request,
    };
  } catch (error) {
    console.log(error);
  }
}

export function sendEmail(dataTosubmit) {
  const result = true;
  const request = axios
    .post("/api/email", dataTosubmit)
    .then((response) => result);

  return {
    type: SEND_EMAIL,
    payload: request,
  };
}

export function codeCheck(dataTosubmit) {
  const result = true;
  const request = axios
    .post("/api/email/verify-code", dataTosubmit)
    .then((response) => result);

  return {
    type: CODE_CHECK,
    payload: request,
  };
}

// export async function workspaceAuth() {
//   // console.log(`${sessionStorage.getItem("accessToken")}`);

//   try {
//     const request = await axios
//       .get("http://a40a0b62fa76.ngrok.io/api/workspaces/1", {
//         headers: {
//           Authorization: sessionStorage.getItem("accessToken"),
//         },
//       })
//       .then((response) => {
//         console.log(response.data);
//         console.log(response.data.data.name);
//         console.log(response.data.message);
//       });

//     return {
//       payload: request,
//     };
//   } catch (error) {
//     console.log(error);
//   }
// }

// export function workspaceAuth() {
//   // console.log(`${sessionStorage.getItem("accessToken")}`);
//     const request = axios
//       .get("/api/workspaces/2", {
//         headers: {
//           Authorization: sessionStorage.getItem("accessToken"),
//         },
//       })
//       .then((response) => {
//         console.log(response.data);
//       });
//       // if(error) {
//       //   console.log(error);
//       // }
//     return {
//       payload: request,
//     };

// }
