import React from "react";
import "./index.scss";
export default function Index(props: { prev: () => void; next: () => void }) {
  const { prev, next } = props;
  return (
    <div className="arrow-container">
      <div className="left-arrow" onClick={prev}></div>
      <div className="right-arrow" onClick={next}></div>
    </div>
  );
}
