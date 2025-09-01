// Mirrors your Python data & logic 1:1

export const diseasesData = {
  Diabetes: {
    avoid: ["White rice", "Sugar", "Sweets", "Soft drinks", "Refined flour"],
    foods: ["Brown rice", "Oats", "Green leafy vegetables", "Berries", "Nuts"],
    tips: ["Check blood sugar regularly", "Exercise 30 mins daily", "Eat small frequent meals"],
    checkup: "Quarterly blood sugar check, annual eye exam",
    donts: ["Don’t skip meals", "Don’t overeat carbs", "Don’t ignore foot care"],
    warning: ["Excessive thirst/urination", "Sudden vision problems", "Unexplained fatigue"],
    mental: "Engage in hobbies, mindfulness meditation, talk with loved ones",
  },
  Hypertension: {
    avoid: ["Salty snacks", "Pickles", "Red meat", "Fried food"],
    foods: ["Bananas", "Oats", "Spinach", "Beetroot", "Garlic"],
    tips: ["Reduce salt intake", "Practice yoga", "Maintain healthy weight"],
    checkup: "Blood pressure check every 3–6 months",
    donts: ["Don’t add extra salt to meals", "Don’t consume excessive alcohol"],
    warning: ["Severe headache", "Chest pain", "Blurred vision"],
    mental: "Practice deep breathing and light yoga daily",
  },
  Obesity: {
    avoid: ["Fast food", "Sugary drinks", "White bread", "Chips"],
    foods: ["Vegetables", "Fruits", "Whole grains", "Green tea"],
    tips: ["Walk 10,000 steps daily", "Avoid late night eating", "Control portion size"],
    checkup: "Annual BMI and cholesterol check",
    donts: ["Don’t crash diet", "Don’t stay sedentary"],
    warning: ["Breathlessness", "Knee/joint pain", "Snoring or sleep apnea"],
    mental: "Celebrate small fitness wins to stay motivated",
  },
  Depression: {
    avoid: ["Alcohol", "Processed food", "Excess caffeine"],
    foods: ["Salmon", "Eggs", "Walnuts", "Dark chocolate", "Green tea"],
    tips: ["Practice meditation", "Connect with friends/family", "Sleep 7–8 hours"],
    checkup: "Seek mental health professional guidance if persistent",
    donts: ["Don’t isolate yourself", "Don’t overuse gadgets"],
    warning: ["Persistent sadness", "Loss of interest", "Thoughts of self-harm"],
    mental: "Journaling, gratitude practice, spend time outdoors",
  },
  Asthma: {
    avoid: ["Dairy in excess", "Fried foods", "Processed meats"],
    foods: ["Apples", "Carrots", "Spinach", "Omega-3 rich fish"],
    tips: ["Avoid allergens", "Do breathing exercises", "Stay hydrated"],
    checkup: "Pulmonary function test yearly",
    donts: ["Don’t forget inhaler", "Don’t smoke"],
    warning: ["Severe wheezing", "Blue lips", "Difficulty speaking"],
    mental: "Stay calm during attacks with slow breathing",
  },
  Arthritis: {
    avoid: ["Red meat", "Fried foods", "Sugary drinks"],
    foods: ["Olive oil", "Fatty fish", "Turmeric", "Broccoli"],
    tips: ["Stay active", "Do joint exercises", "Maintain healthy weight"],
    checkup: "Joint X-ray or physical exam yearly",
    donts: ["Don’t overexert joints", "Don’t stay inactive"],
    warning: ["Severe joint swelling", "Sudden immobility"],
    mental: "Engage in gentle yoga or meditation",
  },
  Thyroid: {
    avoid: ["Soy", "Processed foods", "Sugary snacks"],
    foods: ["Eggs", "Seafood", "Brazil nuts", "Yogurt"],
    tips: ["Take medicine on time", "Eat iodine-rich foods", "Get regular checkups"],
    checkup: "TSH test every 6–12 months",
    donts: ["Don’t skip thyroid medicine", "Don’t self-adjust dosage"],
    warning: ["Sudden weight changes", "Extreme fatigue", "Swelling in neck"],
    mental: "Stay positive with affirmations and relaxation",
  },
  CancerRisk: {
    avoid: ["Smoked meats", "Alcohol", "Excess sugar"],
    foods: ["Broccoli", "Berries", "Tomatoes", "Green tea"],
    tips: ["Avoid smoking", "Exercise regularly", "Eat antioxidant-rich foods"],
    checkup: "Annual cancer screening (depending on risk factors)",
    donts: ["Don’t ignore warning lumps", "Don’t neglect yearly checkups"],
    warning: ["Unexplained weight loss", "Persistent cough", "Unusual bleeding"],
    mental: "Maintain hope, connect with support groups",
  },
};

export function getRiskScore(age, diseases) {
  let score = diseases.length * 10;
  if (age > 50) score += 20;
  if (diseases.includes("Diabetes") && diseases.includes("Hypertension")) score += 20;
  if (diseases.includes("CancerRisk")) score += 15;

  if (score < 20) return "Low";
  if (score < 50) return "Medium";
  return "High";
}

export function dailyRoutine(activityLevel, stressLevel) {
  const routine = [];
  routine.push("🌅 Morning: Wake up early, drink warm water with lemon");

  if (activityLevel === "low") routine.push("🚶 Light walk (15–20 mins)");
  else if (activityLevel === "medium") routine.push("🏃 Jog or yoga (30 mins)");
  else routine.push("💪 Gym workout or running (45–60 mins)");

  routine.push("🥗 Balanced breakfast (oats, fruits, eggs, or smoothie)");
  if (stressLevel === "high") routine.push("🧘 Practice 10 mins meditation or breathing exercises");
  routine.push("🍲 Lunch: Whole grains + veggies + protein source");
  routine.push("☕ Evening: Green tea, light snack");
  routine.push("🌙 Dinner: Early & light (soup/salad/veggies)");
  routine.push("💤 Sleep 7–8 hours daily");

  return routine;
}

export function motivationBoost() {
  const quotes = [
    "🌟 Every small step counts towards a healthier you!",
    "💪 Your health is your wealth – protect it daily!",
    "🌿 A positive mindset fuels a strong body.",
    "🏃 Consistency beats intensity – keep moving!",
    "☀ Believe in progress, not perfection.",
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export function computeReport({ name, age, gender, diseases, activityLevel, stressLevel }) {
  // Aggregate advice
  const foods_to_avoid = new Set();
  const recommended_foods = new Set();
  const health_tips = new Set();
  const checkups = new Set();
  const donts = new Set();
  const warnings = new Set();
  const mental_tips = new Set();

  diseases.forEach((d) => {
    const info = diseasesData[d];
    if (!info) return;
    info.avoid.forEach((x) => foods_to_avoid.add(x));
    info.foods.forEach((x) => recommended_foods.add(x));
    info.tips.forEach((x) => health_tips.add(x));
    checkups.add(info.checkup);
    info.donts.forEach((x) => donts.add(x));
    info.warning.forEach((x) => warnings.add(x));
    mental_tips.add(info.mental);
  });

  const risk = getRiskScore(age, diseases);
  const routine = dailyRoutine(activityLevel, stressLevel);
  const motivation = motivationBoost();

  return {
    header: { name, age, gender, diseases, risk },
    foods_to_avoid: [...foods_to_avoid],
    recommended_foods: [...recommended_foods],
    health_tips: [...health_tips],
    checkups: [...checkups],
    donts: [...donts],
    warnings: [...warnings],
    mental_tips: [...mental_tips],
    routine,
    motivation,
  };
}
