import Endpoints from "../network/endpoints";
import request from "../network/request";
import { updateGenresState } from "./genresSlice";
import { ApiStatus } from "../network/ApiStatus";
import { toast } from "react-toastify";

export const fetchAllGenres = async (dispatch) => {
  dispatch(updateGenresState({ apiStatus: ApiStatus.pending }));
  const { success, data } = await request({ url: Endpoints.allGenres });
  if (success) {
    dispatch(
      updateGenresState({ apiStatus: ApiStatus.success, data: data.genres })
    );
  } else {
    dispatch(updateGenresState({ apiStatus: ApiStatus.error }));
    toast("Failed to fetch genres");
  }
};
