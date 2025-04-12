import React, { useState } from "react";
import "./styles/blogs.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal } from "antd";
import Comments from "../comments/Comments";
import { getRelativeTime } from "../../utils/time";
import AddComment from "../comments/AddComment";
import CustomModal from "../../components/modal/CustomModal";

export default function BlogPosts() {
  const { genreId } = useParams();
  const blogs = useSelector((state) => state.blogs[genreId]);

  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  const openComments = (blogId) => {
    setSelectedBlogId(blogId);
    setIsCommentsModalOpen(true);
  };

  const closeCommentsModal = () => {
    setIsCommentsModalOpen(false);
    setSelectedBlogId(null);
  };

  if (!blogs) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div className="blogs-list-container">
      {blogs.map((blog) => {
        return (
          <div className="blog" key={blog.postId}>
            <div className="header">
              <span className="author">{blog.authorName}</span>
              <span className="genre">{blog.genre}</span>
            </div>
            <div className="body">
              <p>{getRelativeTime(blog.timestamp)}</p>
              <p>{blog.description}</p>
            </div>
            <div className="footer">
              <button
                className="comment-btn"
                onClick={() => openComments(blog.postId)}
              >
                Comments
              </button>
            </div>
          </div>
        );
      })}
      {isCommentsModalOpen && (
        <CustomModal onCancel={closeCommentsModal}>
          <>
            <Comments blogId={selectedBlogId} />
            <AddComment blogId={selectedBlogId} />
          </>
        </CustomModal>
      )}
    </div>
  );
}
