import React from "react";
import NavigationBar from "../navbar";
import GenrePicker from "./GenrePicker";
import BlogPosts from "./BlogPosts";

export default function Home() {
  return (
    <div>
      <NavigationBar />
      <GenrePicker />
      <BlogPosts />
    </div>
  );
}
