import * as api from "../api/notes";
import {
  FETCH_ALL,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  START_LOADING,
  STOP_LOADING,
} from "../constants/actionTypes";

export const getNotes = () => async (dispatch) => {
  try {
    const { data } = await api.getNotes();
    console.log(data.notes);
    dispatch({ type: FETCH_ALL, payload: data.notes });
  } catch (error) {
    console.error(error);
  }
};
