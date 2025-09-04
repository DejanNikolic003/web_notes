import {
  FETCH_ALL,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  START_LOADING,
  STOP_LOADING,
} from "../constants/actionTypes";

const notesReducer = (state = { isLoading: true, notes: [] }, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        notes: action.payload,
      };
    case CREATE:
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case DELETE:
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== action.payload),
      };
    default:
      return state;
  }
};

export default notesReducer;
