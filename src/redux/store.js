import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../feature/auth/authslice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;
