import { createSlice } from "@reduxjs/toolkit";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: {
    // [politics]: [post1, post2, post3]
    // [sports] : [post1, post2, post3]
    generes: [],
  },
  reducers: {
    fetchedBlogs: (state, { payload }) => {
      const { genreId, posts } = payload;
      state[genreId] = posts;
    },
  },
});

export const { fetchedBlogs } = blogsSlice.actions;

export default blogsSlice;
