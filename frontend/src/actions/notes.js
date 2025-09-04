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
    dispatch({ type: FETCH_ALL, payload: data.notes });
  } catch (error) {
    console.error(error);
  }
};

export const createNote = (formData) => async (dispatch) => {
  try {
    console.log(formData);
    const { data } = await api.createNote(formData);
    console.log(data);
    dispatch({ type: CREATE, payload: data.note });
  } catch (error) {
    console.error(error);
  }
};

export const deleteNote = (noteId) => async (dispatch) => {
  try {
    await api.deleteNote(noteId);

    dispatch({ type: DELETE, payload: noteId });
  } catch (error) {
    console.error(error);
  }
};
