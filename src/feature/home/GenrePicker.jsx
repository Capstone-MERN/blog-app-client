import React, { useEffect } from "react";
import "./styles/genres.scss";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsByGenreId } from "./blogsMiddleware";

export default function GenrePicker() {
  const { genreId } = useParams();
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres.genres);

  useEffect(() => {
    dispatch(fetchPostsByGenreId(genreId));
  }, [genreId, dispatch]);

  return (
    <div className="genres-container">
      {genres.map((genre) => {
        return (
          <Link
            to={{
              pathname: `/genres/${genre.id}`,
            }}
            className={`link ${genreId === genre.id && "active-genre"}`}
            key={genre.id}
          >
            {genre.title}
          </Link>
        );
      })}
    </div>
  );
}
