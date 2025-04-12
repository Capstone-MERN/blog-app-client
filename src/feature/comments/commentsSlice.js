import { createSlice } from "@reduxjs/toolkit";
import { ApiStatus } from "../../network/ApiStatus";

const commentsSlice = createSlice({
  initialState: {
    apiStatus: ApiStatus.init, // state of fetching the comments
    list: [], // defines the comments list of selected blog
    addComment: {
      apiStatus: ApiStatus.init,
    },
  },
  name: "comments",
  reducers: {
    updateApiStatus: (state, { payload }) => {
      const { apiStatus, commentsList } = payload;
      if (apiStatus === ApiStatus.success) {
        state.list = commentsList;
      }
      state.apiStatus = apiStatus;
    },
    updateStatusForCommentCreation: (state, { payload }) => {
      const { apiStatus } = payload;
      state.addComment.apiStatus = apiStatus;
    },
  },
});

export const { updateApiStatus, updateStatusForCommentCreation } =
  commentsSlice.actions;

export default commentsSlice;
