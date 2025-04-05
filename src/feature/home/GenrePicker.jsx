import React, { useEffect } from "react";
import "./styles/genres.scss";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchPostsByGenreId } from "./postsmiddleware";

const genres = [
  { id: "politics", title: "Politics" },
  { id: "science", title: "Science" },
  { id: "history", title: "History" },
  { id: "technology", title: "Technology" },
  { id: "art", title: "Art" },
  { id: "literature", title: "Literature" },
  { id: "sports", title: "Sports" },
  { id: "music", title: "Music" },
  { id: "travel", title: "Travel" },
  { id: "food", title: "Food" },
];

export default function GenrePicker() {
  const { genreId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostsByGenreId(genreId));
  }, [genreId, dispatch]);

  return (
    <div className="genres-container">
      {genres.map((genre) => {
        return (
          <Link
            to={{
              pathname: `/${genre.id}`,
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
