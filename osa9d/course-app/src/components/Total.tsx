import React from "react";
import { CourseParts, CoursePartsArray } from "../types";

const countTotal = (courseParts: CoursePartsArray): number => {
  return courseParts.reduce((carry, part) => carry + part.exerciseCount, 0);
};

const Total: React.FC<CourseParts> = ({ courseParts }) => {
  return <p>Number of exercises {countTotal(courseParts)}</p>;
};

export default Total;
