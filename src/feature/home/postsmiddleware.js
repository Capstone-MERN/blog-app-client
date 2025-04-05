import axios from "axios";
import Endpoints from "../../network/endpoints";
import { toast } from "react-toastify";
import { fetchedBlogs } from "./blogsslice";

export const fetchPostsByGenreId = (genreId) => {
  return async function (dispatch) {
    try {
      const { data } = await axios({
        url: Endpoints.posts,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      dispatch(fetchedBlogs({ posts: data.data, genreId }));
      toast(data.message);
    } catch (error) {
      toast(error.message);
    }
  };
};
