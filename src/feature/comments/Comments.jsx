import React, { useEffect } from "react";
import "./comments.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "./commentsmiddleware";
import { ApiStatus } from "../../network/ApiStatus";
import { getRelativeTime } from "../../utils/time";

export default function Comments({ blogId }) {
  const dispatch = useDispatch();
  const { apiStatus, list = [] } = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(fetchComments(blogId));
  }, []);

  if (apiStatus === ApiStatus.pending || apiStatus === ApiStatus.init) {
    return <p className="error-text">Fetching comments ...</p>;
  }

  if (apiStatus === ApiStatus.error) {
    return <p className="error-text">Error in fetching comments</p>;
  }

  if (list.length === 0) {
    return <p className="error-text">No comments for this post</p>;
  }

  return (
    <div className="post-comments-container">
      {list.map((comment) => {
        return (
          <div className="comment-card">
            <div className="header">
              <span className="author">{comment.username}</span>
              <span className="created-timestamp">
                {getRelativeTime(comment.createdAt)}
              </span>
            </div>
            <p>{comment.commentText}</p>
          </div>
        );
      })}
    </div>
  );
}
