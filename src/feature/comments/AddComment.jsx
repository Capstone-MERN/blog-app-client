import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "./commentsmiddleware";
import { ApiStatus } from "../../network/ApiStatus";

export default function AddComment({ blogId }) {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  const { apiStatus } = useSelector((state) => state.comments.addComment);

  const addComment = () => {
    const commentText = inputRef.current.value.trim();
    if (!commentText) {
      return alert("Please enter some text before creating comment");
    }
    dispatch(createComment({ postId: blogId, commentText }));
  };

  useEffect(() => {
    if (apiStatus === ApiStatus.success) {
      inputRef.current.value = "";
    } else if (apiStatus === ApiStatus.error) {
      setError(true);
    } else if (apiStatus === ApiStatus.pending) {
      // while the user retries to send the comment again ..
      setError(false);
    }
  }, [apiStatus]);

  return (
    <div>
      <div className="add-comment-container">
        <input placeholder="Enter comment" ref={inputRef} />
        <span className="material-icons add-icon" onClick={addComment}>
          maps_ugc
        </span>
      </div>
      {error && (
        <p
          style={{
            fontSize: "0.7rem",
            color: "red",
            margin: 0,
            textAlign: "center",
          }}
        >
          Failed to send comment ! please try again ...
        </p>
      )}
    </div>
  );
}
