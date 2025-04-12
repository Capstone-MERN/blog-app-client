import { ApiStatus } from "../../network/ApiStatus";
import Endpoints from "../../network/endpoints";
import request, { RequestMethod } from "../../network/request";
import {
  updateApiStatus,
  updateStatusForCommentCreation,
} from "./commentsSlice";
import { toast } from "react-toastify";

export function fetchComments(postId) {
  return async function (dispatch) {
    dispatch(updateApiStatus({ apiStatus: ApiStatus.pending }));
    const { success, data } = await request({
      url: `${Endpoints.comments}?postId=${postId}`,
    });
    if (success) {
      dispatch(
        updateApiStatus({
          apiStatus: ApiStatus.success,
          commentsList: data.comments,
        })
      );
    } else {
      console.log("failed to fetch comments");
      dispatch(updateApiStatus({ apiStatus: ApiStatus.error }));
    }
  };
}

export function createComment({ postId, commentText }) {
  return async function (dispatch) {
    dispatch(updateStatusForCommentCreation({ apiStatus: ApiStatus.pending }));
    const { success, data } = await request({
      url: `${Endpoints.createComment}?postId=${postId}`,
      method: RequestMethod.POST,
      data: { comment: commentText },
    });
    if (success) {
      toast("Comment addedd successfully");
      // TODO: make sure to add this new comment to the list.
      dispatch(
        updateStatusForCommentCreation({ apiStatus: ApiStatus.success })
      );
    } else {
      toast("Failed to add comment");
      dispatch(updateStatusForCommentCreation({ apiStatus: ApiStatus.error }));
    }
  };
}
