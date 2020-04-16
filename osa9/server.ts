import express from "express";
import { calculateBmi } from "./bmi-calculator";

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
