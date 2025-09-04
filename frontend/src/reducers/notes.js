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
      // console.log(action.payload);
      return {
        ...state,
        notes: action.payload,
      };
    default:
      return state;
  }
};

export default notesReducer;
