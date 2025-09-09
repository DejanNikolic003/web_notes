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
    case CREATE: {
      const newNotes = [...state.notes, action.payload];

      newNotes.sort((a, b) => {
        if (a.pinned === b.pinned) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return b.pinned - a.pinned;
      });

      return {
        ...state,
        notes: newNotes,
      };
    }
    case UPDATE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note._id === action.payload._id ? action.payload : note
        ),
      };
    case DELETE:
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== action.payload),
      };
    case START_LOADING:
      return { ...state, isLoading: true };
    case STOP_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default notesReducer;
