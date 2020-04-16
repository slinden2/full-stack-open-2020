interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  exerciseArr: Array<number>,
  target: number
): ExerciseResult => {
  const periodLength = exerciseArr.length;
  const average = exerciseArr.reduce((acc, cur) => acc + cur) / periodLength;

  const rating = Math.abs(target - average);
  const ratingDescription =
    rating <= 0.5 ? "Well done!" : "Bad. You should stick to your plans.";

  return {
    periodLength,
    trainingDays: exerciseArr.filter(hrs => hrs > 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
