<script setup lang="ts">
import {
  User,
  Calendar,
  Ruler,
  Weight,
  Zap,
  Target,
  Flame,
} from "@lucide/vue";
import {
  calculateTDEE,
  calculateGoalCalories,
  activityLevels,
} from "~/composables/useEnergyCalculations";

useSeoMeta({
  title: "Calorie Calculator — Daily Calorie Needs for Weight Loss & Gain",
  description:
    "Free calorie calculator. Find out how many calories you need per day to maintain, lose, or gain weight, based on your age, sex, height, weight and activity level.",
});

const sex = ref<"male" | "female">("male");
const age = ref<number | null>(30);
const heightCm = ref<number | null>(170);
const weightKg = ref<number | null>(70);
const activity = ref(1.55);
const goal = ref<"lose" | "maintain" | "gain">("maintain");

const tdee = computed(() =>
  calculateTDEE(sex.value, age.value, heightCm.value, weightKg.value, activity.value)
);

const goalCalories = computed(() => calculateGoalCalories(tdee.value, goal.value));

interface Scenario {
  key: "lose" | "maintain" | "gain";
  label: string;
  calories: number;
  change: string;
  textColor: string;
  bgActive: string;
  ringActive: string;
}

const scenarios = computed<Scenario[] | null>(() => {
  if (!tdee.value) return null;
  const m = tdee.value;
  return [
    {
      key: "lose",
      label: "Lose Weight",
      calories: Math.round(m - 500),
      change: "−500 kcal/day deficit",
      textColor: "text-blue-600 dark:text-blue-400",
      bgActive: "bg-blue-50 dark:bg-blue-950/40",
      ringActive: "ring-blue-200 dark:ring-blue-800",
    },
    {
      key: "maintain",
      label: "Maintain",
      calories: Math.round(m),
      change: "Your TDEE",
      textColor: "text-emerald-600 dark:text-emerald-400",
      bgActive: "bg-emerald-50 dark:bg-emerald-950/40",
      ringActive: "ring-emerald-200 dark:ring-emerald-800",
    },
    {
      key: "gain",
      label: "Gain Weight",
      calories: Math.round(m + 500),
      change: "+500 kcal/day surplus",
      textColor: "text-orange-500 dark:text-orange-400",
      bgActive: "bg-orange-50 dark:bg-orange-950/40",
      ringActive: "ring-orange-200 dark:ring-orange-800",
    },
  ];
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How many calories should I eat to lose weight?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A common approach is a deficit of about 500 calories per day below your maintenance level, which can lead to roughly 0.5 kg (about 1 lb) of weight loss per week.",
      },
    },
    {
      "@type": "Question",
      name: "How many calories do I need to maintain my weight?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your maintenance calories equal your Total Daily Energy Expenditure (TDEE), which depends on your age, sex, height, weight, and activity level.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Calculate Daily Calorie Needs",
  description: "Find your daily calorie targets for weight loss, maintenance, or gain.",
  step: [
    {
      "@type": "HowToStep",
      name: "Enter Personal Details",
      text: "Provide your age, sex, height, and current body weight.",
    },
    {
      "@type": "HowToStep",
      name: "Set Activity & Goal",
      text: "Select your daily activity level and choose weight loss, maintenance, or gain.",
    },
    {
      "@type": "HowToStep",
      name: "Get Calorie Target",
      text: "Instantly view your recommended daily calorie intake for your goal.",
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
    <!-- Page header -->
    <div class="mb-8">
      <div class="mb-2 flex items-center gap-2 text-orange-500 dark:text-orange-400">
        <Flame :size="20" :stroke-width="1.75" />
        <span class="text-sm font-semibold uppercase tracking-wide">
          Daily Calorie Needs
        </span>
      </div>
      <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
        Calorie Calculator
      </h1>
      <p class="mt-2 text-slate-600 dark:text-slate-400">
        Find out how many calories you need per day to maintain, lose, or gain
        weight.
      </p>
    </div>

    <!-- Calculator card -->
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

      <!-- Goal selector + result -->
      <Transition name="fade" mode="out-in">
        <div v-if="scenarios">
          <!-- Clickable scenario cards -->
          <div class="mt-6">
            <label class="form-label mb-3">
              <Target :size="15" class="text-slate-400 dark:text-slate-500" />
              Your Goal — click to select
            </label>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="s in scenarios"
                :key="s.key"
                type="button"
                class="rounded-xl p-4 text-center ring-2 transition-all duration-150"
                :class="
                  goal === s.key
                    ? [s.bgActive, s.ringActive]
                    : 'bg-slate-50 dark:bg-slate-800/60 ring-slate-100 dark:ring-slate-800 hover:ring-slate-200 dark:hover:ring-slate-700'
                "
                @click="goal = s.key"
              >
                <p class="text-xs font-medium text-slate-500 dark:text-slate-400">{{ s.label }}</p>
                <p
                  class="mt-1 text-2xl font-extrabold"
                  :class="goal === s.key ? s.textColor : 'text-slate-400 dark:text-slate-500'"
                >
                  {{ s.calories }}
                </p>
                <p class="text-xs text-slate-400 dark:text-slate-500">kcal/day</p>
                <p class="mt-1 text-xs text-slate-400 dark:text-slate-500">{{ s.change }}</p>
              </button>
            </div>
          </div>

          <!-- Big highlighted result -->
          <div
            class="mt-4 rounded-xl p-5 text-center"
            :class="
              goal === 'lose'
                ? 'bg-blue-50 dark:bg-blue-950/40'
                : goal === 'gain'
                ? 'bg-orange-50 dark:bg-orange-950/40'
                : 'bg-emerald-50 dark:bg-emerald-950/40'
            "
          >
            <p class="text-sm font-medium text-slate-500 dark:text-slate-400">
              Your daily target
            </p>
            <p
              class="mt-1 text-5xl font-extrabold tracking-tight"
              :class="
                goal === 'lose'
                  ? 'text-blue-600 dark:text-blue-400'
                  : goal === 'gain'
                  ? 'text-orange-500 dark:text-orange-400'
                  : 'text-emerald-600 dark:text-emerald-400'
              "
            >
              {{ Math.round(goalCalories!) }}
            </p>
            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">kcal / day</p>
          </div>
        </div>
      </Transition>
    </div>

    <AdSlot />

    <!-- FAQ -->
    <section class="mt-10 space-y-5">
      <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">Frequently Asked Questions</h2>
      <div class="card p-5">
        <h3 class="font-semibold text-slate-900 dark:text-slate-100">
          How many calories should I eat to lose weight?
        </h3>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          A common approach is a deficit of about 500 calories per day below
          your maintenance level, which can lead to roughly 0.5 kg (about 1 lb)
          of weight loss per week.
        </p>
      </div>
      <div class="card p-5">
        <h3 class="font-semibold text-slate-900 dark:text-slate-100">
          How many calories do I need to maintain my weight?
        </h3>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Your maintenance calories equal your Total Daily Energy Expenditure
          (TDEE), which depends on your age, sex, height, weight, and activity
          level.
        </p>
      </div>
    </section>

    <!-- Related Calculators -->
    <RelatedCalculators current="/calculators/calorie-calculator" />

    <RelatedGuides />
  </div>
</template>
