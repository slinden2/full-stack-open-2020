interface BmiValues {
  height: number;
  weight: number;
}

const parseArgs = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error("not enough arguments!");
  if (args.length > 4) throw new Error("too many arguments!");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("provided values were not numbers!");
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);

  if (bmi < 0)
    throw new Error(
      "BMI can't be negative. Provide correct height and weight."
    );
  else if (bmi > 0 && bmi < 15) return "Very severely underweight";
  else if (bmi >= 15 && bmi < 16) return "Severely underweight";
  else if (bmi >= 16 && bmi < 18.5) return "Underweight";
  else if (bmi >= 18.5 && bmi < 25) return "Normal (healthy weight)";
  else if (bmi >= 25 && bmi < 30) return "Overweight";
  else if (bmi >= 30 && bmi < 35) return "Obese Class I (Moderately obese)";
  else if (bmi >= 35 && bmi < 40) return "Obese Class II (Severely obese)";
  else return "Obese Class III (Very severely obese)";
};

if (require.main === module) {
  try {
    const { height, weight } = parseArgs(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (err) {
    console.log("Error, something went wrong: ", err.message);
  }
}
