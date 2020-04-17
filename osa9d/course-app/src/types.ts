export interface Part {
  name: string;
  exerciseCount: number;
}

export type CoursePartsArray = Array<Part>;

export interface CourseParts {
  courseParts: CoursePartsArray;
}
