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

export function Googletoken(dataTosubmit) {
  const request = axios
    // .post("/api/auth/login/oauth2/code/google", dataTosubmit, {
    .post("/api/member/login/google", dataTosubmit, {
      headers: { "Content-Type": `application/json` },
    })
    .then((response) => response.data);

  console.log(request);
  return {
    type: LOGIN_USER,
    payload: request,
  };
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
