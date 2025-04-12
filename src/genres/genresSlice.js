import { createSlice } from "@reduxjs/toolkit";
import { ApiStatus } from "../network/ApiStatus";

const genresSlice = createSlice({
  name: "genres",
  initialState: {
    apiStatus: ApiStatus.init,
    genres: [],
  },
  reducers: {
    updateGenresState: (state, { payload }) => {
      const { apiStatus, data } = payload;
      if (apiStatus === ApiStatus.success) {
        state.genres = data;
      }
      state.apiStatus = apiStatus;
    },
  },
});

export const { updateGenresState } = genresSlice.actions;

export default genresSlice;
