<script setup lang="ts">
import { User, Ruler, Target } from "@lucide/vue";

useSeoMeta({
  title: "Ideal Weight Calculator — Healthy Weight Range by Height & Sex",
  description:
    "Free ideal body weight calculator. Calculate your ideal weight range in kg and lb based on the Devine formula, Miller formula, and healthy BMI range.",
});

const unit = ref<"metric" | "imperial">("metric");
const sex = ref<"male" | "female">("male");

// Metric
const heightCm = ref<number | null>(170);

// Imperial
const heightFt = ref<number | null>(5);
const heightIn = ref<number | null>(7);

const heightInInches = computed(() => {
  if (unit.value === "metric") {
    return heightCm.value ? heightCm.value / 2.54 : null;
  } else {
    if (!heightFt.value) return null;
    return heightFt.value * 12 + (heightIn.value || 0);
  }
});

const calculations = computed(() => {
  if (!heightInInches.value || heightInInches.value < 36 || heightInInches.value > 96) {
    return null;
  }

  const inchesOver5ft = Math.max(0, heightInInches.value - 60);
  const heightM = (heightInInches.value * 2.54) / 100;

  // Devine Formula
  const devineKg =
    sex.value === "male"
      ? 50 + 2.3 * inchesOver5ft
      : 45.5 + 2.3 * inchesOver5ft;

  // Miller Formula
  const millerKg =
    sex.value === "male"
      ? 56.2 + 1.41 * inchesOver5ft
      : 53.1 + 1.36 * inchesOver5ft;

  // Healthy BMI Range (18.5 - 24.9)
  const bmiMinKg = 18.5 * (heightM * heightM);
  const bmiMaxKg = 24.9 * (heightM * heightM);

  const kgToLb = (kg: number) => Math.round(kg * 2.20462);

  return {
    devine: {
      kg: Math.round(devineKg * 10) / 10,
      lb: kgToLb(devineKg),
    },
    miller: {
      kg: Math.round(millerKg * 10) / 10,
      lb: kgToLb(millerKg),
    },
    bmiRange: {
      minKg: Math.round(bmiMinKg * 10) / 10,
      maxKg: Math.round(bmiMaxKg * 10) / 10,
      minLb: kgToLb(bmiMinKg),
      maxLb: kgToLb(bmiMaxKg),
    },
  };
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the Devine formula for ideal body weight?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Devine formula calculates ideal weight as 50 kg + 2.3 kg per inch over 5 feet for men, and 45.5 kg + 2.3 kg per inch over 5 feet for women.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a single perfect weight for everyone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No single number fits everyone perfectly. Ideal weight formulas provide a target reference point, while the healthy BMI range offers a broader spectrum for different body frames.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Calculate Your Ideal Weight Range",
  description: "Find your ideal body weight target using medical formulas.",
  step: [
    {
      "@type": "HowToStep",
      name: "Input Height and Sex",
      text: "Select your sex and enter your height in cm or ft/in.",
    },
    {
      "@type": "HowToStep",
      name: "Calculate Target Formulas",
      text: "The tool evaluates Devine, Miller, and Healthy BMI Range formulas.",
    },
    {
      "@type": "HowToStep",
      name: "View Weight Range",
      text: "See your recommended ideal body weight range in both kg and lbs.",
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
      <div class="mb-2 flex items-center gap-2 text-teal-600 dark:text-teal-400">
        <Target :size="20" :stroke-width="1.75" />
        <span class="text-sm font-semibold uppercase tracking-wide">
          Weight Target Reference
        </span>
      </div>
      <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
        Ideal Weight Calculator
      </h1>
      <p class="mt-2 text-slate-600 dark:text-slate-400">
        Find your target weight range in kg and lb based on medical formulas and healthy BMI standards.
      </p>
    </div>

    <!-- Calculator Card -->
    <div class="card p-6">
      <!-- Unit toggle -->
      <div class="pill-toggle mb-5">
        <button
          :class="[
            'pill-toggle-btn',
            unit === 'metric' ? 'pill-toggle-btn-active' : 'pill-toggle-btn-inactive',
          ]"
          @click="unit = 'metric'"
        >
          Metric (cm)
        </button>
        <button
          :class="[
            'pill-toggle-btn',
            unit === 'imperial' ? 'pill-toggle-btn-active' : 'pill-toggle-btn-inactive',
          ]"
          @click="unit = 'imperial'"
        >
          Imperial (ft / in)
        </button>
      </div>

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

      <!-- Height inputs -->
      <div v-if="unit === 'metric'" class="mb-5">
        <label class="form-label">
          <Ruler :size="15" class="text-slate-400 dark:text-slate-500" />
          Height (cm)
        </label>
        <input
          v-model.number="heightCm"
          type="number"
          min="120"
          max="250"
          class="form-input"
          placeholder="170"
        />
      </div>

      <div v-else class="grid gap-4 sm:grid-cols-2 mb-5">
        <div>
          <label class="form-label">
            <Ruler :size="15" class="text-slate-400 dark:text-slate-500" />
            Height (ft)
          </label>
          <input
            v-model.number="heightFt"
            type="number"
            min="4"
            max="8"
            class="form-input"
            placeholder="5"
          />
        </div>
        <div>
          <label class="form-label">
            <Ruler :size="15" class="text-slate-400 dark:text-slate-500" />
            Height (in)
          </label>
          <input
            v-model.number="heightIn"
            type="number"
            min="0"
            max="11"
            class="form-input"
            placeholder="7"
          />
        </div>
      </div>

      <!-- Result Card -->
      <Transition name="fade" mode="out-in">
        <div v-if="calculations" class="mt-6 space-y-4">
          <!-- Primary: Healthy BMI Range -->
          <div class="rounded-xl bg-teal-50 dark:bg-teal-950/40 p-5 text-center ring-2 ring-teal-200 dark:ring-teal-800">
            <p class="stat-label text-teal-800 dark:text-teal-300">Healthy Weight Range (BMI 18.5–24.9)</p>
            <p class="mt-1 text-4xl font-extrabold text-teal-700 dark:text-teal-400">
              {{ calculations.bmiRange.minKg }} – {{ calculations.bmiRange.maxKg }}
              <span class="text-xl font-semibold text-slate-500 dark:text-slate-400">kg</span>
            </p>
            <p class="mt-1 text-sm font-semibold text-teal-600 dark:text-teal-400">
              ({{ calculations.bmiRange.minLb }} – {{ calculations.bmiRange.maxLb }} lbs)
            </p>
          </div>

          <!-- Formula Comparisons Grid -->
          <div class="grid grid-cols-2 gap-3 text-center">
            <div class="rounded-xl bg-slate-50 dark:bg-slate-800/80 p-4 border border-slate-100 dark:border-slate-800">
              <span class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Devine Formula</span>
              <p class="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
                {{ calculations.devine.kg }} <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">kg</span>
              </p>
              <p class="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                {{ calculations.devine.lb }} lbs
              </p>
            </div>

            <div class="rounded-xl bg-slate-50 dark:bg-slate-800/80 p-4 border border-slate-100 dark:border-slate-800">
              <span class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Miller Formula</span>
              <p class="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
                {{ calculations.miller.kg }} <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">kg</span>
              </p>
              <p class="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                {{ calculations.miller.lb }} lbs
              </p>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <AdSlot />

    <!-- FAQ -->
    <section class="mt-10 space-y-5">
      <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">Frequently Asked Questions</h2>
      <div class="card p-5">
        <h3 class="font-semibold text-slate-900 dark:text-slate-100">What is the Devine formula?</h3>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Developed in 1974 by Dr. B.J. Devine, this formula is widely used in medical settings to determine ideal body weight for medication dosing and health benchmarks.
        </p>
      </div>
      <div class="card p-5">
        <h3 class="font-semibold text-slate-900 dark:text-slate-100">Does muscle mass affect ideal weight?</h3>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Yes. Ideal weight formulas estimate body weight for average muscle mass. Muscular individuals may safely weigh more than the formula estimates.
        </p>
      </div>
    </section>

    <!-- Related Calculators -->
    <RelatedCalculators current="/calculators/ideal-weight-calculator" />

    <RelatedGuides />
  </div>
</template>
