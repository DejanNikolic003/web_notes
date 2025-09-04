import * as api from "../api/auth";
import { AUTH, AUTH_ERROR } from "../constants/actionTypes";

export const register = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.register(formData);
    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      message: error.response?.data?.message || error.message,
    });
  }
};

export const login = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);
    console.log(data);
    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      message: error.response?.data?.message || error.message,
    });
  }
};

export const me = () => async (dispatch) => {
  try {
    const { data: tokenData } = await api.refreshToken();
    if (!tokenData) return null;

    dispatch({
      type: "AUTH",
      data: { token: tokenData.accessToken },
    });

    const { data: profile } = await api.me();
    dispatch({
      type: "AUTH",
      data: {
        user_id: profile.user_id,
        username: profile.username,
        token: tokenData.accessToken,
      },
    });

    return tokenData.accessToken;
  } catch (error) {
    dispatch({
      type: "AUTH_ERROR",
      message: error.response?.data?.message || error.message,
    });
    return null;
  }
};
