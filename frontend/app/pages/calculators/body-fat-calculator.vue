<script setup lang="ts">
import { User, Ruler, Percent } from "@lucide/vue";

useSeoMeta({
  title: "Body Fat Calculator — Estimate Body Fat Percentage (U.S. Navy Method)",
  description:
    "Free body fat percentage calculator using the official U.S. Navy circumference method. Calculate your body fat percentage and see your fitness category.",
});

const unit = ref<"metric" | "imperial">("metric");
const sex = ref<"male" | "female">("male");

// Metric (cm)
const heightCm = ref<number | null>(175);
const neckCm = ref<number | null>(38);
const waistCm = ref<number | null>(85);
const hipCm = ref<number | null>(95); // for females

// Imperial (inches)
const heightIn = ref<number | null>(69);
const neckIn = ref<number | null>(15);
const waistIn = ref<number | null>(33.5);
const hipIn = ref<number | null>(37.5); // for females

const bodyFat = computed(() => {
  let h: number, n: number, w: number, hp: number;

  if (unit.value === "metric") {
    if (!heightCm.value || !neckCm.value || !waistCm.value) return null;
    h = heightCm.value;
    n = neckCm.value;
    w = waistCm.value;
    hp = hipCm.value || 0;
  } else {
    if (!heightIn.value || !neckIn.value || !waistIn.value) return null;
    h = heightIn.value * 2.54;
    n = neckIn.value * 2.54;
    w = waistIn.value * 2.54;
    hp = (hipIn.value || 0) * 2.54;
  }

  if (h <= 0 || n <= 0 || w <= 0) return null;

  let bf: number;
  if (sex.value === "male") {
    if (w <= n) return null;
    bf = 86.01 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76;
  } else {
    if (!hp || w + hp <= n) return null;
    bf = 163.205 * Math.log10(w + hp - n) - 97.684 * Math.log10(h) - 78.387;
  }

  return bf > 0 && bf < 60 ? Math.round(bf * 10) / 10 : null;
});

const category = computed(() => {
  if (bodyFat.value === null) return null;
  const bf = bodyFat.value;

  if (sex.value === "male") {
    if (bf < 6) return { label: "Essential Fat (2–5%)", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-950/40", ring: "ring-blue-200 dark:ring-blue-800" };
    if (bf <= 13) return { label: "Athletes (6–13%)", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/40", ring: "ring-emerald-200 dark:ring-emerald-800" };
    if (bf <= 17) return { label: "Fitness (14–17%)", color: "text-teal-600 dark:text-teal-400", bg: "bg-teal-50 dark:bg-teal-950/40", ring: "ring-teal-200 dark:ring-teal-800" };
    if (bf <= 24) return { label: "Average (18–24%)", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/40", ring: "ring-amber-200 dark:ring-amber-800" };
    return { label: "Obese (25%+)", color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-950/40", ring: "ring-red-200 dark:ring-red-800" };
  } else {
    if (bf < 14) return { label: "Essential Fat (10–13%)", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-950/40", ring: "ring-blue-200 dark:ring-blue-800" };
    if (bf <= 20) return { label: "Athletes (14–20%)", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/40", ring: "ring-emerald-200 dark:ring-emerald-800" };
    if (bf <= 24) return { label: "Fitness (21–24%)", color: "text-teal-600 dark:text-teal-400", bg: "bg-teal-50 dark:bg-teal-950/40", ring: "ring-teal-200 dark:ring-teal-800" };
    if (bf <= 31) return { label: "Average (25–31%)", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/40", ring: "ring-amber-200 dark:ring-amber-800" };
    return { label: "Obese (32%+)", color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-950/40", ring: "ring-red-200 dark:ring-red-800" };
  }
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How accurate is the U.S. Navy body fat calculator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The U.S. Navy circumference method is generally accurate within 3–4% for most adults when measurements are taken precisely.",
      },
    },
    {
      "@type": "Question",
      name: "What is a healthy body fat percentage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For men, a healthy range is typically 10–20%. For women, a healthy range is typically 18–28%.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Estimate Body Fat Percentage",
  description: "Calculate body fat % using the U.S. Navy tape measure method.",
  step: [
    {
      "@type": "HowToStep",
      name: "Select Gender & Units",
      text: "Choose metric or imperial units and select biological sex.",
    },
    {
      "@type": "HowToStep",
      name: "Measure Circumferences",
      text: "Enter height, neck, waist, and hip (for women) measurements.",
    },
    {
      "@type": "HowToStep",
      name: "Get Body Fat Category",
      text: "View your estimated body fat percentage and fitness classification.",
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
      <div class="mb-2 flex items-center gap-2 text-pink-600 dark:text-pink-400">
        <Percent :size="20" :stroke-width="1.75" />
        <span class="text-sm font-semibold uppercase tracking-wide">
          Body Composition
        </span>
      </div>
      <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
        Body Fat Calculator
      </h1>
      <p class="mt-2 text-slate-600 dark:text-slate-400">
        Estimate your body fat percentage using the official U.S. Navy circumference method.
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
          Imperial (inches)
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

      <!-- Metric inputs -->
      <div v-if="unit === 'metric'" class="grid gap-4 sm:grid-cols-2">
        <div>
          <label class="form-label">
            <Ruler :size="15" class="text-slate-400 dark:text-slate-500" />
            Height (cm)
          </label>
          <input v-model.number="heightCm" type="number" min="100" max="250" class="form-input" placeholder="175" />
        </div>
        <div>
          <label class="form-label">
            <Ruler :size="15" class="text-slate-400 dark:text-slate-500" />
            Neck Circumference (cm)
          </label>
          <input v-model.number="neckCm" type="number" min="20" max="80" class="form-input" placeholder="38" />
        </div>
        <div>
          <label class="form-label">
            <Ruler :size="15" class="text-slate-400 dark:text-slate-500" />
            Waist Circumference (cm)
          </label>
          <input v-model.number="waistCm" type="number" min="40" max="200" class="form-input" placeholder="85" />
        </div>
        <div v-if="sex === 'female'">
          <label class="form-label">
            <Ruler :size="15" class="text-slate-400 dark:text-slate-500" />
            Hip Circumference (cm)
          </label>
          <input v-model.number="hipCm" type="number" min="40" max="200" class="form-input" placeholder="95" />
        </div>
      </div>

      <!-- Imperial inputs -->
      <div v-else class="grid gap-4 sm:grid-cols-2">
        <div>
          <label class="form-label">
            <Ruler :size="15" class="text-slate-400 dark:text-slate-500" />
            Height (inches)
          </label>
          <input v-model.number="heightIn" type="number" min="40" max="100" class="form-input" placeholder="69" />
        </div>
        <div>
          <label class="form-label">
            <Ruler :size="15" class="text-slate-400 dark:text-slate-500" />
            Neck Circumference (in)
          </label>
          <input v-model.number="neckIn" type="number" min="8" max="30" class="form-input" placeholder="15" />
        </div>
        <div>
          <label class="form-label">
            <Ruler :size="15" class="text-slate-400 dark:text-slate-500" />
            Waist Circumference (in)
          </label>
          <input v-model.number="waistIn" type="number" min="15" max="80" class="form-input" placeholder="33.5" />
        </div>
        <div v-if="sex === 'female'">
          <label class="form-label">
            <Ruler :size="15" class="text-slate-400 dark:text-slate-500" />
            Hip Circumference (in)
          </label>
          <input v-model.number="hipIn" type="number" min="15" max="80" class="form-input" placeholder="37.5" />
        </div>
      </div>

      <!-- Result Card -->
      <Transition name="fade" mode="out-in">
        <div v-if="bodyFat && category" class="mt-6 rounded-xl p-5 ring-2" :class="[category.bg, category.ring]">
          <div class="flex items-end justify-between">
            <div>
              <p class="stat-label">Estimated Body Fat</p>
              <p class="stat-number" :class="category.color">
                {{ bodyFat }}<span class="text-2xl font-bold ml-0.5">%</span>
              </p>
            </div>
            <span
              class="rounded-full px-3.5 py-1 text-sm font-semibold"
              :class="[category.color, category.bg]"
            >
              {{ category.label }}
            </span>
          </div>
        </div>
      </Transition>
    </div>

    <AdSlot />

    <!-- Body Fat Categories Table -->
    <section class="mt-10">
      <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">ACE Body Fat Standards</h2>
      <div class="mt-4 overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-left text-slate-600 dark:text-slate-300">
              <th class="px-4 py-3 font-semibold">Description</th>
              <th class="px-4 py-3 font-semibold">Women</th>
              <th class="px-4 py-3 font-semibold">Men</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-slate-50 dark:border-slate-800/50">
              <td class="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">Essential Fat</td>
              <td class="px-4 py-3 text-blue-600 dark:text-blue-400 font-semibold">10–13%</td>
              <td class="px-4 py-3 text-blue-600 dark:text-blue-400 font-semibold">2–5%</td>
            </tr>
            <tr class="border-b border-slate-50 dark:border-slate-800/50">
              <td class="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">Athletes</td>
              <td class="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-semibold">14–20%</td>
              <td class="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-semibold">6–13%</td>
            </tr>
            <tr class="border-b border-slate-50 dark:border-slate-800/50">
              <td class="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">Fitness</td>
              <td class="px-4 py-3 text-teal-600 dark:text-teal-400 font-semibold">21–24%</td>
              <td class="px-4 py-3 text-teal-600 dark:text-teal-400 font-semibold">14–17%</td>
            </tr>
            <tr class="border-b border-slate-50 dark:border-slate-800/50">
              <td class="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">Average</td>
              <td class="px-4 py-3 text-amber-600 dark:text-amber-400 font-semibold">25–31%</td>
              <td class="px-4 py-3 text-amber-600 dark:text-amber-400 font-semibold">18–24%</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">Obese</td>
              <td class="px-4 py-3 text-red-600 dark:text-red-400 font-semibold">32%+</td>
              <td class="px-4 py-3 text-red-600 dark:text-red-400 font-semibold">25%+</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mt-10 space-y-5">
      <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">Frequently Asked Questions</h2>
      <div class="card p-5">
        <h3 class="font-semibold text-slate-900 dark:text-slate-100">How accurate is the U.S. Navy body fat calculator?</h3>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          The U.S. Navy circumference method is one of the most reliable home estimation methods, accurate within 3–4% of DEXA scans when measurements are taken accurately with a flexible tape measure.
        </p>
      </div>
      <div class="card p-5">
        <h3 class="font-semibold text-slate-900 dark:text-slate-100">Where should I measure?</h3>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Measure neck just below the larynx, waist horizontally at the navel (for men) or narrowest point (for women), and hips at the widest point around the buttocks.
        </p>
      </div>
    </section>

    <!-- Related Calculators -->
    <RelatedCalculators current="/calculators/body-fat-calculator" />

    <RelatedGuides />
  </div>
</template>
