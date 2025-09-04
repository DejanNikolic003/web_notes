import { AUTH, AUTH_ERROR, LOGOUT } from "../constants/actionTypes";

const authReducer = (state = { data: null, message: "" }, action) => {
  switch (action.type) {
    case AUTH:
      return {
        ...state,
        data: {
          user_id: action.data.user_id,
          username: action.data.username,
          token: action.data.token,
        },
        message: action.data.message || "",
      };
    case AUTH_ERROR:
      return {
        ...state,
        data: null,
        message: action.message,
      };
    case LOGOUT:
      return { ...state, data: null, message: action.message };
    default:
      return state;
  }
};

export default authReducer;
