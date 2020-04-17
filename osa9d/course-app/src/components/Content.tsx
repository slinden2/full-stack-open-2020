import React from "react";
import { CourseParts } from "../types";

const Content: React.FC<CourseParts> = ({ courseParts }) => {
  return (
    <>
      {courseParts.map((p, i) => (
        <p key={i}>
          {p.name} {p.exerciseCount}
        </p>
      ))}
    </>
  );
};

export default Content;
