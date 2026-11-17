<script setup lang="ts">
import {
  User,
  Calendar,
  Ruler,
  Weight,
  Zap,
  Target,
  PieChart,
} from "@lucide/vue";
import {
  calculateTDEE,
  calculateGoalCalories,
  activityLevels,
} from "~/composables/useEnergyCalculations";

useSeoMeta({
  title: "Macro Calculator — Calculate Protein, Carbs & Fat Intake",
  description:
    "Free macronutrient calculator. Determine your daily protein, carbs, and fat targets in grams based on your weight goals, age, sex, height, and activity level.",
});

const sex = ref<"male" | "female">("male");
const age = ref<number | null>(30);
const heightCm = ref<number | null>(170);
const weightKg = ref<number | null>(70);
const activity = ref(1.55);
const goal = ref<"lose" | "maintain" | "gain">("maintain");

// Macro Split percentages (must sum to 100)
const proteinPct = ref(30);
const carbsPct = ref(40);
const fatPct = ref(30);

const presets = [
  { name: "Balanced", p: 30, c: 40, f: 30, desc: "30% P / 40% C / 30% F" },
  { name: "High Protein", p: 40, c: 30, f: 30, desc: "40% P / 30% C / 30% F" },
  { name: "Low Carb / Keto", p: 35, c: 15, f: 50, desc: "35% P / 15% C / 50% F" },
];

function applyPreset(p: number, c: number, f: number) {
  proteinPct.value = p;
  carbsPct.value = c;
  fatPct.value = f;
}

const tdee = computed(() =>
  calculateTDEE(sex.value, age.value, heightCm.value, weightKg.value, activity.value)
);

const dailyCalories = computed(() => calculateGoalCalories(tdee.value, goal.value));

const macros = computed(() => {
  if (!dailyCalories.value) return null;
  const cal = dailyCalories.value;
  const pGrams = Math.round((cal * (proteinPct.value / 100)) / 4);
  const cGrams = Math.round((cal * (carbsPct.value / 100)) / 4);
  const fGrams = Math.round((cal * (fatPct.value / 100)) / 9);

  return {
    protein: { grams: pGrams, cal: Math.round(pGrams * 4), pct: proteinPct.value },
    carbs: { grams: cGrams, cal: Math.round(cGrams * 4), pct: carbsPct.value },
    fat: { grams: fGrams, cal: Math.round(fGrams * 9), pct: fatPct.value },
  };
});

const totalPct = computed(() => proteinPct.value + carbsPct.value + fatPct.value);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are macros?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Macros (macronutrients) are the primary nutrients your body needs in large quantities: protein, carbohydrates, and fats.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best macro ratio for weight loss?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A common macro ratio for weight loss is 30–40% protein, 30–40% carbohydrates, and 20–30% fat, while maintaining a daily calorie deficit.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Calculate Daily Macronutrients",
  description: "Calculate your daily protein, carbs, and fat target grams.",
  step: [
    {
      "@type": "HowToStep",
      name: "Enter Biometrics & Goal",
      text: "Provide sex, age, height, weight, activity level, and weight goal.",
    },
    {
      "@type": "HowToStep",
      name: "Customize Macro Ratio",
      text: "Choose a preset ratio or adjust percentage sliders for protein, carbs, and fat.",
    },
    {
      "@type": "HowToStep",
      name: "Review Macro Grams",
      text: "Get your exact daily gram intake for each macronutrient.",
    },
  ],
};

useHead({
  script: [
    { type: "application/ld+json", innerHTML: JSON.stringify(jsonLd) },
    { type: "application/ld+json", innerHTML: JSON.stringify(howToJsonLd) },
  ],
});
</script>

<template>
  <div class="mx-auto max-w-2xl px-4 py-10">
    <!-- Header -->
    <div class="mb-8">
      <div class="mb-2 flex items-center gap-2 text-purple-600 dark:text-purple-400">
        <PieChart :size="20" :stroke-width="1.75" />
        <span class="text-sm font-semibold uppercase tracking-wide">
          Macronutrient Breakdown
        </span>
      </div>
      <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
        Macro Calculator
      </h1>
      <p class="mt-2 text-slate-600 dark:text-slate-400">
        Calculate your ideal daily grams of protein, carbs, and fat tailored to your goals.
      </p>
    </div>

    <!-- Calculator Card -->
    <div class="card p-6">
      <!-- Sex toggle -->
      <div class="mb-5">
        <label class="form-label mb-2">
          <User :size="15" class="text-slate-400 dark:text-slate-500" />
          Biological Sex
        </label>
        <div class="pill-toggle">
          <button
            :class="[
              'pill-toggle-btn',
              sex === 'male' ? 'pill-toggle-btn-active' : 'pill-toggle-btn-inactive',
            ]"
            @click="sex = 'male'"
          >
            Male
          </button>
          <button
            :class="[
              'pill-toggle-btn',
              sex === 'female' ? 'pill-toggle-btn-active' : 'pill-toggle-btn-inactive',
            ]"
            @click="sex = 'female'"
          >
            Female
          </button>
        </div>
      </div>

      <!-- Biometric inputs -->
      <div class="grid gap-4 sm:grid-cols-3">
        <div>
          <label class="form-label">
            <Calendar :size="15" class="text-slate-400 dark:text-slate-500" />
            Age (years)
          </label>
          <input
            v-model.number="age"
            type="number"
            min="15"
            max="100"
            class="form-input"
            placeholder="30"
          />
        </div>
        <div>
          <label class="form-label">
            <Ruler :size="15" class="text-slate-400 dark:text-slate-500" />
            Height (cm)
          </label>
          <input
            v-model.number="heightCm"
            type="number"
            min="50"
            max="300"
            class="form-input"
            placeholder="170"
          />
        </div>
        <div>
          <label class="form-label">
            <Weight :size="15" class="text-slate-400 dark:text-slate-500" />
            Weight (kg)
          </label>
          <input
            v-model.number="weightKg"
            type="number"
            min="20"
            max="500"
            class="form-input"
            placeholder="70"
          />
        </div>
      </div>

      <!-- Activity level -->
      <div class="mt-5">
        <label class="form-label mb-2">
          <Zap :size="15" class="text-slate-400 dark:text-slate-500" />
          Activity Level
        </label>
        <select v-model.number="activity" class="form-select">
          <option
            v-for="lvl in activityLevels"
            :key="lvl.value"
            :value="lvl.value"
          >
            {{ lvl.label }} — {{ lvl.desc }}
          </option>
        </select>
      </div>

      <!-- Weight Goal -->
      <div class="mt-5">
        <label class="form-label mb-2">
          <Target :size="15" class="text-slate-400 dark:text-slate-500" />
          Weight Goal
        </label>
        <div class="pill-toggle">
          <button
            :class="[
              'pill-toggle-btn',
              goal === 'lose' ? 'pill-toggle-btn-active text-blue-600 dark:text-blue-400' : 'pill-toggle-btn-inactive',
            ]"
            @click="goal = 'lose'"
          >
            Weight Loss (−500 kcal)
          </button>
          <button
            :class="[
              'pill-toggle-btn',
              goal === 'maintain' ? 'pill-toggle-btn-active text-emerald-600 dark:text-emerald-400' : 'pill-toggle-btn-inactive',
            ]"
            @click="goal = 'maintain'"
          >
            Maintain Weight
          </button>
          <button
            :class="[
              'pill-toggle-btn',
              goal === 'gain' ? 'pill-toggle-btn-active text-orange-600 dark:text-orange-400' : 'pill-toggle-btn-inactive',
            ]"
            @click="goal = 'gain'"
          >
            Weight Gain (+500 kcal)
          </button>
        </div>
      </div>

      <!-- Macro Ratio Presets & Custom Sliders -->
      <div class="mt-6 border-t border-slate-100 dark:border-slate-800 pt-5">
        <div class="flex items-center justify-between mb-3">
          <label class="form-label mb-0">
            <PieChart :size="15" class="text-slate-400 dark:text-slate-500" />
            Macro Ratio Split
          </label>
          <span
            class="text-xs font-semibold px-2 py-0.5 rounded"
            :class="totalPct === 100 ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-300'"
          >
            Total: {{ totalPct }}%
          </span>
        </div>

        <!-- Presets Buttons -->
        <div class="flex flex-wrap gap-2 mb-4">
          <button
            v-for="p in presets"
            :key="p.name"
            type="button"
            class="rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all"
            :class="
              proteinPct === p.p && carbsPct === p.c && fatPct === p.f
                ? 'border-purple-300 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950/60 dark:text-purple-300 shadow-xs'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            "
            @click="applyPreset(p.p, p.c, p.f)"
          >
            {{ p.name }} ({{ p.desc }})
          </button>
        </div>

        <!-- Individual Sliders -->
        <div class="space-y-3">
          <div>
            <div class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Protein (4 kcal/g)</span>
              <span class="text-purple-600 dark:text-purple-400">{{ proteinPct }}%</span>
            </div>
            <input
              v-model.number="proteinPct"
              type="range"
              min="10"
              max="70"
              step="5"
              class="w-full accent-purple-600"
            />
          </div>

          <div>
            <div class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Carbohydrates (4 kcal/g)</span>
              <span class="text-blue-600 dark:text-blue-400">{{ carbsPct }}%</span>
            </div>
            <input
              v-model.number="carbsPct"
              type="range"
              min="5"
              max="80"
              step="5"
              class="w-full accent-blue-600"
            />
          </div>

          <div>
            <div class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Fats (9 kcal/g)</span>
              <span class="text-amber-600 dark:text-amber-400">{{ fatPct }}%</span>
            </div>
            <input
              v-model.number="fatPct"
              type="range"
              min="10"
              max="70"
              step="5"
              class="w-full accent-amber-600"
            />
          </div>
        </div>
      </div>

      <!-- Result Display -->
      <Transition name="fade" mode="out-in">
        <div v-if="dailyCalories && macros" class="mt-6">
          <div class="rounded-xl bg-purple-50/60 dark:bg-purple-950/40 p-4 text-center border border-purple-100 dark:border-purple-900/50 mb-4">
            <span class="text-xs font-semibold text-purple-700 dark:text-purple-300">Target Daily Calories</span>
            <p class="text-4xl font-extrabold text-purple-700 dark:text-purple-300 mt-1">
              {{ dailyCalories }} <span class="text-sm font-normal text-slate-500 dark:text-slate-400">kcal/day</span>
            </p>
          </div>

          <!-- Macro Cards Grid -->
          <div class="grid grid-cols-3 gap-3">
            <div class="rounded-xl border border-purple-100 dark:border-purple-900/50 bg-purple-50/30 dark:bg-purple-950/20 p-4 text-center">
              <span class="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider block">Protein</span>
              <p class="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
                {{ macros.protein.grams }}<span class="text-xs font-semibold text-slate-500 dark:text-slate-400 ml-0.5">g</span>
              </p>
              <p class="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1">
                {{ macros.protein.cal }} kcal ({{ macros.protein.pct }}%)
              </p>
            </div>

            <div class="rounded-xl border border-blue-100 dark:border-blue-900/50 bg-blue-50/30 dark:bg-blue-950/20 p-4 text-center">
              <span class="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider block">Carbs</span>
              <p class="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
                {{ macros.carbs.grams }}<span class="text-xs font-semibold text-slate-500 dark:text-slate-400 ml-0.5">g</span>
              </p>
              <p class="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1">
                {{ macros.carbs.cal }} kcal ({{ macros.carbs.pct }}%)
              </p>
            </div>

            <div class="rounded-xl border border-amber-100 dark:border-amber-900/50 bg-amber-50/30 dark:bg-amber-950/20 p-4 text-center">
              <span class="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider block">Fats</span>
              <p class="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
                {{ macros.fat.grams }}<span class="text-xs font-semibold text-slate-500 dark:text-slate-400 ml-0.5">g</span>
              </p>
              <p class="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1">
                {{ macros.fat.cal }} kcal ({{ macros.fat.pct }}%)
              </p>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <AdSlot />

    <!-- FAQ Section -->
    <section class="mt-10 space-y-5">
      <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">Frequently Asked Questions</h2>
      <div class="card p-5">
        <h3 class="font-semibold text-slate-900 dark:text-slate-100">What are macros?</h3>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Macros (short for macronutrients) are the essential nutrients your body requires in large quantities to produce energy: Protein (4 calories/gram), Carbohydrates (4 calories/gram), and Fats (9 calories/gram).
        </p>
      </div>
      <div class="card p-5">
        <h3 class="font-semibold text-slate-900 dark:text-slate-100">What is the best macro ratio for weight loss?</h3>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          A balanced ratio for weight loss is 30–40% protein, 30–40% carbs, and 20–30% fat. High protein preserves lean muscle mass while operating at a caloric deficit.
        </p>
      </div>
    </section>

    <!-- Related Calculators -->
    <RelatedCalculators current="/calculators/macro-calculator" />

    <RelatedGuides />
  </div>
</template>
