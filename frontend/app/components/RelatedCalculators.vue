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

const props = defineProps<{
  current: string; // route path, e.g. "/calculators/bmi"
}>();

const allCalculators = [
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
    desc: "Calculate healthy weight range using the Devine formula.",
    icon: Target,
    iconColor: "text-teal-600 dark:text-teal-400",
    iconBg: "bg-teal-50 border-teal-100 dark:bg-teal-950/40 dark:border-teal-900/50",
  },
];

const related = computed(() =>
  allCalculators.filter((c) => c.to !== props.current).slice(0, 3)
);
</script>

<template>
  <section class="mt-12 border-t border-slate-100 dark:border-slate-800 pt-10">
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">Related Calculators</h2>
        <p class="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Explore more health &amp; nutrition tools</p>
      </div>
      <NuxtLink
        to="/calculators"
        class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
      >
        View all calculators →
      </NuxtLink>
    </div>

    <div class="grid gap-4 sm:grid-cols-3">
      <NuxtLink
        v-for="calc in related"
        :key="calc.to"
        :to="calc.to"
        class="card-interactive group flex flex-col p-4"
      >
        <div
          :class="[
            calc.iconBg,
            'mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border',
          ]"
        >
          <component
            :is="calc.icon"
            :class="[calc.iconColor, 'h-5 w-5']"
            :stroke-width="1.75"
          />
        </div>
        <h3 class="font-bold text-sm text-slate-900 dark:text-slate-100 transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
          {{ calc.name }}
        </h3>
        <p class="mt-1 flex-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{{ calc.desc }}</p>
        <div class="mt-3 flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400">
          Try tool
          <ArrowRight :size="12" class="ml-1 transition-transform group-hover:translate-x-1" />
        </div>
      </NuxtLink>
    </div>
  </section>
</template>
