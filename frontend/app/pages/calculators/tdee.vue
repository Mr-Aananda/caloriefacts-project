<script setup lang="ts">
import { User, Calendar, Ruler, Weight, Zap, Activity } from "@lucide/vue";
import {
  calculateBMR,
  calculateTDEE,
  activityLevels,
} from "~/composables/useEnergyCalculations";

useSeoMeta({
  title: "TDEE Calculator — Total Daily Energy Expenditure",
  description:
    "Free TDEE calculator. Estimate your Total Daily Energy Expenditure using the Mifflin-St Jeor formula and your activity level.",
});

const sex = ref<"male" | "female">("male");
const age = ref<number | null>(30);
const heightCm = ref<number | null>(170);
const weightKg = ref<number | null>(70);
const activity = ref(1.55);

const bmr = computed(() =>
  calculateBMR(sex.value, age.value, heightCm.value, weightKg.value)
);

const tdee = computed(() =>
  calculateTDEE(sex.value, age.value, heightCm.value, weightKg.value, activity.value)
);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is TDEE?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TDEE stands for Total Daily Energy Expenditure, the total number of calories you burn in a day including activity.",
      },
    },
    {
      "@type": "Question",
      name: "How is TDEE calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TDEE is calculated by first estimating your Basal Metabolic Rate (BMR) and then multiplying it by an activity factor that reflects how much you move during the day.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Calculate Your TDEE",
  description: "Calculate your Total Daily Energy Expenditure in three steps.",
  step: [
    {
      "@type": "HowToStep",
      name: "Input Biometrics",
      text: "Select sex and enter age, height, and body weight.",
    },
    {
      "@type": "HowToStep",
      name: "Select Activity Level",
      text: "Choose the physical activity multiplier that best matches your weekly movement.",
    },
    {
      "@type": "HowToStep",
      name: "View Maintenance Calories",
      text: "Get your exact BMR and TDEE maintenance calorie target per day.",
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
      <div class="mb-2 flex items-center gap-2 text-blue-600 dark:text-blue-400">
        <Activity :size="20" :stroke-width="1.75" />
        <span class="text-sm font-semibold uppercase tracking-wide">
          Energy Expenditure
        </span>
      </div>
      <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
        TDEE Calculator
      </h1>
      <p class="mt-2 text-slate-600 dark:text-slate-400">
        Estimate your Total Daily Energy Expenditure using the Mifflin-St Jeor
        formula and your activity level.
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

      <!-- Activity level radio cards -->
      <div class="mt-5">
        <label class="form-label mb-3">
          <Zap :size="15" class="text-slate-400 dark:text-slate-500" />
          Activity Level
        </label>
        <div class="space-y-2">
          <label
            v-for="lvl in activityLevels"
            :key="lvl.value"
            :class="[
              'activity-card',
              activity === lvl.value
                ? 'activity-card-active'
                : 'activity-card-inactive',
            ]"
          >
            <input
              type="radio"
              :value="lvl.value"
              v-model="activity"
              class="accent-emerald-600 shrink-0"
            />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-slate-900 dark:text-slate-100">{{ lvl.label }}</p>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{{ lvl.desc }}</p>
            </div>
            <span
              class="shrink-0 rounded-md px-2 py-0.5 text-xs font-mono font-medium"
              :class="
                activity === lvl.value
                  ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              "
            >
              {{ lvl.multiplier }}
            </span>
          </label>
        </div>
      </div>

      <!-- Result -->
      <Transition name="fade" mode="out-in">
        <div v-if="tdee && bmr" class="mt-6 grid grid-cols-2 gap-3">
          <div class="rounded-xl bg-slate-50 dark:bg-slate-800/80 p-4 text-center ring-1 ring-slate-100 dark:ring-slate-800">
            <p class="stat-label">BMR</p>
            <p class="mt-1 text-3xl font-extrabold text-slate-700 dark:text-slate-200">
              {{ Math.round(bmr) }}
            </p>
            <p class="mt-0.5 text-xs text-slate-400 dark:text-slate-500">kcal / day at rest</p>
          </div>
          <div class="rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-4 text-center ring-2 ring-emerald-200 dark:ring-emerald-800">
            <p class="stat-label">Your TDEE</p>
            <p class="mt-1 text-3xl font-extrabold text-emerald-700 dark:text-emerald-400">
              {{ tdee }}
            </p>
            <p class="mt-0.5 text-xs text-slate-400 dark:text-slate-500">kcal / day with activity</p>
          </div>
        </div>
      </Transition>
    </div>

    <AdSlot />

    <!-- FAQ -->
    <section class="mt-10 space-y-5">
      <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">Frequently Asked Questions</h2>
      <div class="card p-5">
        <h3 class="font-semibold text-slate-900 dark:text-slate-100">What is TDEE?</h3>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          TDEE stands for Total Daily Energy Expenditure — the total number of
          calories you burn in a day, including all activity.
        </p>
      </div>
      <div class="card p-5">
        <h3 class="font-semibold text-slate-900 dark:text-slate-100">How is TDEE calculated?</h3>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          TDEE is calculated by first estimating your Basal Metabolic Rate
          (BMR) using the Mifflin-St Jeor formula, then multiplying by an
          activity factor that reflects how much you move during the day.
        </p>
      </div>
    </section>

    <!-- Related Calculators -->
    <RelatedCalculators current="/calculators/tdee" />

    <RelatedGuides />
  </div>
</template>
