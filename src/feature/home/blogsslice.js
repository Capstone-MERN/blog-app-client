import { createSlice } from "@reduxjs/toolkit";
import { ApiStatus } from "../../network/ApiStatus";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: {
    // [politics]: [post1, post2, post3]
    // [sports] : [post1, post2, post3]
    // generes: [],
    create: {
      apiStatus: ApiStatus.init,
    },
  },
  reducers: {
    fetchedBlogs: (state, { payload }) => {
      const { genreId, posts } = payload;
      state[genreId] = posts;
    },
    updatePostCreationStatus: (state, { payload }) => {
      state.create = payload;
    },
  },
});

export const { fetchedBlogs, updatePostCreationStatus } = blogsSlice.actions;

export default blogsSlice;
