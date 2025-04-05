import React from "react";
import "./styles/blogs.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const getRelativeTime = (timestamp) => {
  const createdDate = new Date(timestamp);
  const currentDate = new Date();
  const difference = (currentDate - createdDate) / 1000;
  // 24 * 60 * 60 = 86400
  const days = parseInt(difference / 86400);
  if (days > 0) return `${days} ${days > 1 ? "days" : "day"} ago`;
  const hrs = parseInt(difference / 3600);
  if (hrs > 0) return `${hrs} ${hrs > 1 ? "hrs" : "hr"} ago`;
  const minutes = parseInt(hrs / 60);
  if (minutes > 0) return `${minutes} ${minutes > 1 ? "mins" : "min"} ago`;
  const seconds = parseInt(minutes / 60);
  return `${seconds} ${seconds > 1 ? "seconds" : "second"} ago`;
};

export default function BlogPosts() {
  const { genreId } = useParams();
  const blogs = useSelector((state) => state.blogs[genreId]);

  if (!blogs) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div className="blogs-list-container">
      {blogs.map((blog) => {
        return (
          <div className="blog" key={blog.blogId}>
            <div className="header">
              <span className="author">{blog.authorName}</span>
              <span className="genre">{blog.genre}</span>
            </div>
            <div className="body">
              <p>{getRelativeTime(blog.timestamp)}</p>
              <p>{blog.description}</p>
            </div>
            <div className="footer">
              <button className="comment-btn">Comments</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
