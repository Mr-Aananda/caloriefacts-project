<script setup lang="ts">
import {
  Flame,
  Activity,
  Scale,
  PieChart,
  Percent,
  Target,
  ArrowRight,
} from "@lucide/vue";

useSeoMeta({
  title: "Free Health & Nutrition Calculators — Calorie, TDEE, BMI, Macros",
  description:
    "Free online health calculators: daily calorie needs, TDEE, BMI, macro breakdown, U.S. Navy body fat %, and ideal body weight range. Accurate & mobile-friendly.",
});

const calcs = [
  {
    to: "/calculators/calorie-calculator",
    name: "Calorie Calculator",
    desc: "Daily calories needed to maintain, lose, or gain weight.",
    icon: Flame,
    iconColor: "text-orange-500 dark:text-orange-400",
    iconBg: "bg-orange-50 border-orange-100 dark:bg-orange-950/40 dark:border-orange-900/50",
  },
  {
    to: "/calculators/tdee",
    name: "TDEE Calculator",
    desc: "Total Daily Energy Expenditure based on your activity level.",
    icon: Activity,
    iconColor: "text-blue-500 dark:text-blue-400",
    iconBg: "bg-blue-50 border-blue-100 dark:bg-blue-950/40 dark:border-blue-900/50",
  },
  {
    to: "/calculators/bmi",
    name: "BMI Calculator",
    desc: "Body Mass Index and standard weight category.",
    icon: Scale,
    iconColor: "text-emerald-600 dark:text-emerald-400",
    iconBg: "bg-emerald-50 border-emerald-100 dark:bg-emerald-950/40 dark:border-emerald-900/50",
  },
  {
    to: "/calculators/macro-calculator",
    name: "Macro Calculator",
    desc: "Daily protein, carbs, and fat breakdown for your goals.",
    icon: PieChart,
    iconColor: "text-purple-600 dark:text-purple-400",
    iconBg: "bg-purple-50 border-purple-100 dark:bg-purple-950/40 dark:border-purple-900/50",
  },
  {
    to: "/calculators/body-fat-calculator",
    name: "Body Fat Calculator",
    desc: "Estimate body fat percentage using the U.S. Navy method.",
    icon: Percent,
    iconColor: "text-pink-600 dark:text-pink-400",
    iconBg: "bg-pink-50 border-pink-100 dark:bg-pink-950/40 dark:border-pink-900/50",
  },
  {
    to: "/calculators/ideal-weight-calculator",
    name: "Ideal Weight Calculator",
    desc: "Calculate target healthy weight range using the Devine formula.",
    icon: Target,
    iconColor: "text-teal-600 dark:text-teal-400",
    iconBg: "bg-teal-50 border-teal-100 dark:bg-teal-950/40 dark:border-teal-900/50",
  },
];
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 py-10">
    <div class="mb-10 text-center">
      <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
        Free Health &amp; Nutrition Calculators
      </h1>
      <p class="mt-3 text-lg text-slate-600 dark:text-slate-400">
        Instant, accurate results — no account or registration required.
      </p>
    </div>

    <div class="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
      <NuxtLink
        v-for="c in calcs"
        :key="c.to"
        :to="c.to"
        class="card-interactive group flex flex-col p-6"
      >
        <div
          :class="[
            c.iconBg,
            'mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border',
          ]"
        >
          <component
            :is="c.icon"
            :class="[c.iconColor, 'h-6 w-6']"
            :stroke-width="1.75"
          />
        </div>
        <h2
          class="font-semibold text-slate-900 dark:text-slate-100 transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
        >
          {{ c.name }}
        </h2>
        <p class="mt-1 flex-1 text-sm text-slate-500 dark:text-slate-400">{{ c.desc }}</p>
        <div
          class="mt-4 flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-400"
        >
          Open calculator
          <ArrowRight
            :size="14"
            class="ml-1 transition-transform group-hover:translate-x-1"
          />
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
