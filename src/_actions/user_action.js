import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types";

export function loginUser(dataTosubmit) {
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
    .post(
      "https://slack-clone-0.herokuapp.com/api/auth/login/oauth2/code/google",
      dataTosubmit
    )
    .then((response) => response.data);
  return {
    type: LOGIN_USER,
    payload: request,
  };
}
