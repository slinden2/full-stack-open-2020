import React from "react";
import { CoursePart } from "../types";

const Part: React.FC<CoursePart> = props => {
  switch (props.name) {
    case "Fundamentals":
      return (
        <p>
          {props.name} {props.description} {props.exerciseCount}
        </p>
      );
    case "Using props to pass data":
      return (
        <p>
          {props.name} {props.groupProjectCount} {props.exerciseCount}
        </p>
      );
    case "Deeper type usage":
      return (
        <p>
          {props.name} {props.description} {props.exerciseSubmissionLink}{" "}
          {props.exerciseCount}
        </p>
      );
    case "Lighter type style":
      return (
        <p>
          {props.name} {props.description} {props.exerciseStyle}{" "}
          {props.exerciseCount}
        </p>
      );
    default:
      return null;
  }
};

export default Part;
