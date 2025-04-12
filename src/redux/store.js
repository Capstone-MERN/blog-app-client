import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../feature/auth/authslice";
import blogsSlice from "../feature/home/blogsslice";
import genresSlice from "../genres/genresSlice";
import commentsSlice from "../feature/comments/commentsSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    blogs: blogsSlice.reducer,
    genres: genresSlice.reducer,
    comments: commentsSlice.reducer,
  },
});

export default store;
