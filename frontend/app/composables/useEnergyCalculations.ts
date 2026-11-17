export interface EnergyInput {
  sex: "male" | "female";
  age: number | null;
  heightCm: number | null;
  weightKg: number | null;
  activity: number;
}

export const activityLevels = [
  {
    value: 1.2,
    label: "Sedentary",
    desc: "Little or no exercise, desk job",
    multiplier: "×1.2",
  },
  {
    value: 1.375,
    label: "Lightly Active",
    desc: "Light exercise 1–3 days/week",
    multiplier: "×1.375",
  },
  {
    value: 1.55,
    label: "Moderately Active",
    desc: "Moderate exercise 3–5 days/week",
    multiplier: "×1.55",
  },
  {
    value: 1.725,
    label: "Very Active",
    desc: "Hard exercise 6–7 days/week",
    multiplier: "×1.725",
  },
  {
    value: 1.9,
    label: "Extremely Active",
    desc: "Very hard daily exercise + physical job",
    multiplier: "×1.9",
  },
];

export function calculateBMR(
  sex: "male" | "female",
  age: number | null,
  heightCm: number | null,
  weightKg: number | null
): number | null {
  if (!age || !heightCm || !weightKg || age <= 0 || heightCm <= 0 || weightKg <= 0) {
    return null;
  }
  // Mifflin-St Jeor Formula
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return sex === "male" ? base + 5 : base - 161;
}

export function calculateTDEE(
  sex: "male" | "female",
  age: number | null,
  heightCm: number | null,
  weightKg: number | null,
  activity: number
): number | null {
  const bmr = calculateBMR(sex, age, heightCm, weightKg);
  return bmr ? Math.round(bmr * activity) : null;
}

export function calculateGoalCalories(
  tdee: number | null,
  goal: "lose" | "maintain" | "gain"
): number | null {
  if (!tdee) return null;
  if (goal === "lose") return Math.round(tdee - 500);
  if (goal === "gain") return Math.round(tdee + 500);
  return Math.round(tdee);
}
