import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  SEND_EMAIL,
} from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload }; // ...stae: state을 똑같이 가져옴
    // 다음 state return

    case REGISTER_USER:
      return { ...state, success: action.payload };

    case AUTH_USER:
      return { ...state, userData: action.payload };

    case SEND_EMAIL:
      return { ...state, success: action.payload }; //success 쓰는게 맞는지

    default:
      return state;
  }
}
