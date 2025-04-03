import React from "react";
import "./button.scss";

export default function Button({ text, isLoading = false }) {
  return (
    <button className="api-loading-btn" disabled={isLoading}>
      <div className="loader" />
      <span>{text}</span>
    </button>
  );
}
