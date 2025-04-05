import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../feature/auth/authslice";
import blogsSlice from "../feature/home/blogsslice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    blogs: blogsSlice.reducer,
  },
});

export default store;
