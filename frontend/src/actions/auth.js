import * as api from "../api/auth";
import { AUTH, AUTH_ERROR } from "../constants/actionTypes";

export const register = (formData) => async (dispatch) => {
  try {
    const { data } = await api.register(formData);
    dispatch({ type: AUTH, data });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      message: error.response?.data?.message || error.message,
    });
  }
};

export const login = (formData) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);
    dispatch({ type: AUTH, data });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      message: error.response?.data?.message || error.message,
    });
  }
};

export const test = () => async (dispatch) => {
  try {
    const { data } = await api.test();
    console.log(data);
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      message: error.response?.data?.message || error.message,
    });
  }
};

export const me = () => async (dispatch) => {
  try {
    const { data: token } = await api.refreshToken();
    console.log(token);
    if (!token) return null;

    dispatch({ type: AUTH, data: { token: token.accessToken } });

    const { data: profile } = await api.me();

    dispatch({
      type: AUTH,
      data: {
        username: profile.username,
        token: token.accessToken,
      },
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      message: error.response?.data?.message || error.message,
    });
  }
};
