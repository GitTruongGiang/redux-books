import { configureStore } from "@reduxjs/toolkit";
import bookSliceReducer from "../feature/bookSlice";

const store = configureStore({
  reducer: {
    books: bookSliceReducer,
  },
});

export default store;
