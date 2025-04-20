import React, { Fragment, useState } from "react";
import "./styles/blogs.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Comments from "../comments/Comments";
import { getRelativeTime } from "../../utils/time";
import AddComment from "../comments/AddComment";
import CustomModal from "../../components/modal/CustomModal";
import { Button, Empty, Skeleton } from "antd";
import { ApiStatus } from "../../network/ApiStatus";
import { fetchPostsByGenreId } from "./blogsMiddleware";

const skeletonLength = [1, 2];

export default function BlogPosts() {
  const { genreId } = useParams();
  const dispatch = useDispatch();
  const { apiStatus } = useSelector((state) => state.blogs.read);
  const blogs = useSelector((state) => state.blogs[genreId]);

  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  const retryFetchingPosts = () => {
    dispatch(fetchPostsByGenreId(genreId));
  };

  const openComments = (blogId) => {
    setSelectedBlogId(blogId);
    setIsCommentsModalOpen(true);
  };

  const closeCommentsModal = () => {
    setIsCommentsModalOpen(false);
    setSelectedBlogId(null);
  };

  if (apiStatus === ApiStatus.init || apiStatus === ApiStatus.pending) {
    return (
      <div className="blogs-list-container skeleton-loader">
        {skeletonLength.map((_, index) => {
          return (
            <Fragment key={index.toString()}>
              <div className="header">
                <Skeleton
                  title={false}
                  paragraph={false}
                  active
                  avatar={{ shape: "circle" }}
                  loading
                />
              </div>
              <div className="body">
                <Skeleton paragraph={false} title={{ width: "100px" }} />
                <Skeleton />
              </div>
              <div className="footer">
                <Skeleton paragraph={false} title={{ width: "50px" }} />
              </div>
            </Fragment>
          );
        })}
      </div>
    );
  }

  if (apiStatus === ApiStatus.error) {
    return (
      <div className="blogs-list-container error-container">
        <p>Something went wrong !!!</p>
        <Button className="btn" type="default" onClick={retryFetchingPosts}>
          Retry
        </Button>
      </div>
    );
  }

  if (!blogs?.length) {
    return (
      <Empty description="No blogs found for the selected topic ! please try changing the topic" />
    );
  }

  return (
    <div className="blogs-list-container">
      {blogs.map((blog) => {
        return (
          <div
            className={`blog ${blog.sentiment?.toLowerCase()}`}
            key={blog.postId}
          >
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
