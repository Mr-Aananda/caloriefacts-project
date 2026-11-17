<script setup lang="ts">
import { Ruler, Weight, Scale } from "@lucide/vue";

useSeoMeta({
  title: "BMI Calculator — Check Your Body Mass Index Free",
  description:
    "Free BMI calculator for adults. Enter your height and weight to instantly see your Body Mass Index and weight category.",
});

const unit = ref<"metric" | "imperial">("metric");
const heightCm = ref<number | null>(170);
const weightKg = ref<number | null>(70);
const heightFt = ref<number | null>(5);
const heightIn = ref<number | null>(7);
const weightLb = ref<number | null>(154);

const bmi = computed(() => {
  let hM: number, wKg: number;
  if (unit.value === "metric") {
    if (!heightCm.value || !weightKg.value) return null;
    hM = heightCm.value / 100;
    wKg = weightKg.value;
  } else {
    if (!heightFt.value || !weightLb.value) return null;
    const totalInches = heightFt.value * 12 + (heightIn.value || 0);
    hM = totalInches * 0.0254;
    wKg = weightLb.value * 0.453592;
  }
  if (hM <= 0) return null;
  return wKg / (hM * hM);
});

const category = computed(() => {
  if (bmi.value === null) return null;
  if (bmi.value < 18.5)
    return {
      label: "Underweight",
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/40",
      ring: "ring-blue-200 dark:ring-blue-800",
      hex: "#2563eb",
    };
  if (bmi.value < 25)
    return {
      label: "Normal weight",
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
      ring: "ring-emerald-200 dark:ring-emerald-800",
      hex: "#059669",
    };
  if (bmi.value < 30)
    return {
      label: "Overweight",
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/40",
      ring: "ring-amber-200 dark:ring-amber-800",
      hex: "#d97706",
    };
  return {
    label: "Obese",
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/40",
    ring: "ring-red-200 dark:ring-red-800",
    hex: "#dc2626",
  };
});

// Gauge: BMI scale 10–40 mapped to 0–100%
const gaugePos = computed(() => {
  if (!bmi.value) return 0;
  return Math.min(Math.max((bmi.value - 10) / 30, 0), 1) * 100;
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a healthy BMI range?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most adults, a BMI between 18.5 and 24.9 is considered a normal weight range.",
      },
    },
    {
      "@type": "Question",
      name: "Is BMI accurate for everyone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BMI is a general screening tool and does not directly measure body fat, so it can be less accurate for athletes, older adults, and some other groups.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Calculate Your Body Mass Index (BMI)",
  description: "Calculate your BMI score and weight classification in three simple steps.",
  step: [
    {
      "@type": "HowToStep",
      name: "Select Measurement Unit",
      text: "Choose metric (cm/kg) or imperial (ft/in/lb) units.",
    },
    {
      "@type": "HowToStep",
      name: "Enter Height and Weight",
      text: "Input your height and current body weight.",
    },
    {
      "@type": "HowToStep",
      name: "Read BMI Result",
      text: "View your calculated BMI number and medical weight category on the visual scale.",
    },
  ],
};

useHead({
  script: [
    { type: "application/ld+json", innerHTML: JSON.stringify(faqJsonLd) },
    { type: "application/ld+json", innerHTML: JSON.stringify(howToJsonLd) },
  ],
});
</script>

<template>
  <div class="mx-auto max-w-2xl px-4 py-10">
    <!-- Page header -->
    <div class="mb-8">
      <div class="mb-2 flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
        <Scale :size="20" :stroke-width="1.75" />
        <span class="text-sm font-semibold uppercase tracking-wide">
          Body Mass Index
        </span>
      </div>
      <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
        BMI Calculator
      </h1>
      <p class="mt-2 text-slate-600 dark:text-slate-400">
        Body Mass Index is a quick screening measure based on your height and
        weight.
      </p>
    </div>

    <!-- Calculator card -->
    <div class="card p-6">
      <!-- Unit toggle -->
      <div class="pill-toggle mb-6">
        <button
          :class="[
            'pill-toggle-btn',
            unit === 'metric' ? 'pill-toggle-btn-active' : 'pill-toggle-btn-inactive',
          ]"
          @click="unit = 'metric'"
        >
          Metric (cm / kg)
        </button>
        <button
          :class="[
            'pill-toggle-btn',
            unit === 'imperial' ? 'pill-toggle-btn-active' : 'pill-toggle-btn-inactive',
          ]"
          @click="unit = 'imperial'"
        >
          Imperial (ft / lb)
        </button>
      </div>

      <!-- Metric inputs -->
      <div v-if="unit === 'metric'" class="grid gap-4 sm:grid-cols-2">
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
            placeholder="e.g. 170"
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
            placeholder="e.g. 70"
          />
        </div>
      </div>

      <!-- Imperial inputs -->
      <div v-else class="grid gap-4 sm:grid-cols-3">
        <div>
          <label class="form-label">
            <Ruler :size="15" class="text-slate-400 dark:text-slate-500" />
            Height (ft)
          </label>
          <input
            v-model.number="heightFt"
            type="number"
            min="1"
            max="9"
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
        <div>
          <label class="form-label">
            <Weight :size="15" class="text-slate-400 dark:text-slate-500" />
            Weight (lb)
          </label>
          <input
            v-model.number="weightLb"
            type="number"
            min="50"
            max="1000"
            class="form-input"
            placeholder="154"
          />
        </div>
      </div>

      <!-- Result -->
      <Transition name="fade" mode="out-in">
        <div v-if="bmi && category" class="mt-6 rounded-xl p-5 ring-2" :class="[category.bg, category.ring]">
          <div class="flex items-end justify-between">
            <div>
              <p class="stat-label">Your BMI</p>
              <p class="stat-number" :class="category.color">
                {{ bmi.toFixed(1) }}
              </p>
            </div>
            <span
              class="rounded-full px-3 py-1 text-sm font-semibold"
              :class="[category.color, category.bg]"
            >
              {{ category.label }}
            </span>
          </div>

          <!-- Gauge bar -->
          <div class="mt-5">
            <div
              class="relative h-3 overflow-hidden rounded-full"
              style="
                background: linear-gradient(
                  to right,
                  #93c5fd 0%,
                  #6ee7b7 28%,
                  #6ee7b7 50%,
                  #fcd34d 67%,
                  #f87171 100%
                );
              "
            >
              <div
                class="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white dark:bg-slate-900 shadow-md ring-2 transition-all duration-500"
                :class="category.ring"
                :style="{ left: `${gaugePos}%` }"
              />
            </div>
            <div class="mt-2 grid grid-cols-4 text-center text-xs text-slate-400 dark:text-slate-400">
              <span>Underweight</span>
              <span>Normal</span>
              <span>Overweight</span>
              <span>Obese</span>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <AdSlot />

    <!-- BMI table -->
    <section class="mt-10">
      <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">BMI Categories</h2>
      <div class="mt-4 overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-left">
              <th class="px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">BMI Range</th>
              <th class="px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Category</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-slate-50 dark:border-slate-800/50">
              <td class="px-4 py-3 text-slate-600 dark:text-slate-300">Below 18.5</td>
              <td class="px-4 py-3 font-medium text-blue-600 dark:text-blue-400">Underweight</td>
            </tr>
            <tr class="border-b border-slate-50 dark:border-slate-800/50 bg-emerald-50/30 dark:bg-emerald-950/20">
              <td class="px-4 py-3 text-slate-600 dark:text-slate-300">18.5 – 24.9</td>
              <td class="px-4 py-3 font-medium text-emerald-600 dark:text-emerald-400">
                Normal weight ✓
              </td>
            </tr>
            <tr class="border-b border-slate-50 dark:border-slate-800/50">
              <td class="px-4 py-3 text-slate-600 dark:text-slate-300">25.0 – 29.9</td>
              <td class="px-4 py-3 font-medium text-amber-600 dark:text-amber-400">Overweight</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-slate-600 dark:text-slate-300">30.0 and above</td>
              <td class="px-4 py-3 font-medium text-red-600 dark:text-red-400">Obese</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- FAQ -->
    <section class="mt-10 space-y-5">
      <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">Frequently Asked Questions</h2>
      <div class="card p-5">
        <h3 class="font-semibold text-slate-900 dark:text-slate-100">
          What is a healthy BMI range?
        </h3>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          For most adults, a BMI between 18.5 and 24.9 is considered a normal
          weight range.
        </p>
      </div>
      <div class="card p-5">
        <h3 class="font-semibold text-slate-900 dark:text-slate-100">
          Is BMI accurate for everyone?
        </h3>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          BMI is a general screening tool and does not directly measure body
          fat, so it can be less accurate for athletes, older adults, and some
          other groups.
        </p>
      </div>
    </section>

    <!-- Related Calculators -->
    <RelatedCalculators current="/calculators/bmi" />

    <RelatedGuides />
  </div>
</template>
