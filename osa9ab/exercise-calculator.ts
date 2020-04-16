export {};

interface ExerciseParam {
  target: number;
  exerHrs: Array<number>;
}

const parseArgs = (args: Array<string>): ExerciseParam => {
  if (args.length < 4) throw new Error("not enough arguments!");

  const target = Number(args[2]);
  if (isNaN(target)) throw new Error("target must be a number!");

  const exerHrs = args.slice(3).map(hr => Number(hr));
  exerHrs.forEach(hr => {
    if (isNaN(hr) || hr < 0)
      throw new Error("daily hours must be positive numbers!");
  });

  return {
    target,
    exerHrs,
  };
};

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
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

if (require.main === module) {
  try {
    const { target, exerHrs } = parseArgs(process.argv);
    console.log(calculateExercises(exerHrs, target));
  } catch (err) {
    console.log("Error, something went wrong: ", err.message);
  }
}
