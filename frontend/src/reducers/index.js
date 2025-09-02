import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import notesReducer from "./notes";

const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: notesReducer,
  },
});

export default store;
