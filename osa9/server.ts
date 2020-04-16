import express from "express";
import { calculateBmi } from "./bmi-calculator";
import { calculateExercises } from "./exercise-calculator";
import { isArray } from "util";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight) || !height || !weight) {
    return res.status(400).send({
      error: "malformatted parameters",
    });
  }

  const resObj = {
    weight,
    height,
    bmi: calculateBmi(Number(height), Number(weight)),
  };

  return res.json(resObj);
});

app.post("/exercises", (req, res) => {
  const { daily_exercises: dailyExercises, target } = req.body;

  if (!dailyExercises || !target) {
    res.status(400).json({ error: "missing parameters" });
  }

  const invalidTarget = isNaN(target) || target < 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dailyExerNums = dailyExercises.map((exer: any) => Number(exer));
  const hasMalformattedParams =
    !isArray(dailyExercises) || dailyExerNums.includes(NaN) || invalidTarget;

  if (hasMalformattedParams) {
    res.status(400).json({ error: "malformatted parameters" });
  }

  const result = calculateExercises(dailyExercises, target);
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
