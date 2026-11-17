<script setup lang="ts">
import {
  Flame,
  Activity,
  Scale,
  Apple,
  ArrowRight,
  ChevronRight,
  Zap,
} from "@lucide/vue";
import type { Food } from "~/composables/useFoods";

const { categories, all, categorySlug, getCategoryMeta, getBySlug } = useFoods();

import { comparisonPairs } from "~/data/comparisons";

const popularSlugs = [
  "chick-fil-a-chicken-sandwich",
  "banana",
  "chicken-breast",
  "chipotle-chicken-bowl",
  "oreo-cookies",
  "greek-yogurt",
  "starbucks-caramel-frappuccino",
  "in-n-out-double-double",
];

const featured = computed(() => {
  const selected = popularSlugs
    .map((slug) => getBySlug(slug))
    .filter((f): f is Food => f !== undefined);

  if (selected.length < 8) {
    const remaining = all.filter((f) => !selected.includes(f));
    return [...selected, ...remaining.slice(0, 8 - selected.length)];
  }
  return selected;
});

const homeComparisons = computed(() => {
  return comparisonPairs.slice(0, 6).map((pair) => {
    const f1 = getBySlug(pair.food1Slug);
    const f2 = getBySlug(pair.food2Slug);
    return {
      slug: pair.slug,
      name1: f1?.name || pair.food1Slug,
      icon1: f1?.icon || "🍽️",
      cal1: f1?.calories ?? 0,
      name2: f2?.name || pair.food2Slug,
      icon2: f2?.icon || "🍽️",
      cal2: f2?.calories ?? 0,
    };
  });
});

useSeoMeta({
  title:
    "Free Calorie Calculator, BMI Calculator & Food Nutrition Database",
  description:
    "Free online calorie calculator, TDEE calculator, BMI calculator, and a nutrition database with calories, protein, carbs and fat for 300+ common foods.",
});

const calculators = [
  {
    to: "/calculators/calorie-calculator",
    name: "Calorie Calculator",
    desc: "Find how many calories you need per day to maintain, lose, or gain weight.",
    icon: Flame,
    iconColor: "text-orange-500 dark:text-orange-400",
    iconBg: "bg-orange-50 border-orange-100 dark:bg-orange-950/40 dark:border-orange-900/50",
  },
  {
    to: "/calculators/tdee",
    name: "TDEE Calculator",
    desc: "Estimate your Total Daily Energy Expenditure based on your activity level.",
    icon: Activity,
    iconColor: "text-blue-500 dark:text-blue-400",
    iconBg: "bg-blue-50 border-blue-100 dark:bg-blue-950/40 dark:border-blue-900/50",
  },
  {
    to: "/calculators/bmi",
    name: "BMI Calculator",
    desc: "Check your Body Mass Index and see which weight category you fall into.",
    icon: Scale,
    iconColor: "text-emerald-600 dark:text-emerald-400",
    iconBg: "bg-emerald-50 border-emerald-100 dark:bg-emerald-950/40 dark:border-emerald-900/50",
  },
];
</script>

<template>
  <div>
    <!-- ── Hero ────────────────────────────────────────── -->
    <section
      class="relative overflow-hidden bg-slate-50 dark:bg-[#030F1D] pb-20 pt-16 transition-colors duration-200"
    >
      <!-- Glowing ambient background light blur orbs -->
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 flex justify-center overflow-hidden"
      >
        <div
          class="h-[320px] w-[640px] rounded-full bg-gradient-to-tr from-emerald-400/20 to-teal-400/30 dark:from-emerald-600/20 dark:to-teal-500/10 blur-3xl opacity-80 dark:opacity-50 transform -translate-y-10"
        />
      </div>

      <!-- Crisp, professional dot pattern overlay with fade mask -->
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(#059669_1.25px,transparent_1.25px)] dark:bg-[radial-gradient(#34d399_1.25px,transparent_1.25px)] [background-size:24px_24px] opacity-30 dark:opacity-25 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000_60%,transparent_100%)]"
      />

      <div class="relative mx-auto max-w-5xl px-4 text-center">
        <!-- Badge -->
        <div
          class="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/90 dark:border-emerald-800 dark:bg-emerald-950/60 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-300 shadow-xs"
        >
          <Zap :size="14" :stroke-width="2.5" />
          Free forever · No account required
        </div>

        <!-- Heading -->
        <h1
          class="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl lg:text-6xl"
        >
          Track Nutrition.<br />
          <span
            class="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-300 bg-clip-text text-transparent"
          >
            Reach Your Goals.
          </span>
        </h1>

        <p class="mx-auto mt-5 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          Professional-grade calorie calculators, TDEE &amp; BMI tools, and a
          database of
          <strong class="font-semibold text-slate-800 dark:text-slate-100">{{ all.length }}+ foods</strong>
          with complete macro breakdowns — all free.
        </p>

        <!-- CTA buttons -->
        <div
          class="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <NuxtLink
            to="/calculators/calorie-calculator"
            class="btn-primary px-6 py-3 text-base"
          >
            <Flame :size="18" />
            Calculate My Calories
          </NuxtLink>
          <NuxtLink to="/foods" class="btn-secondary px-6 py-3 text-base">
            <Apple :size="18" />
            Browse Food Database
          </NuxtLink>
        </div>

        <!-- Stats row -->
        <div
          class="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500 dark:text-slate-400"
        >
          <div class="flex items-center gap-1.5">
            <span class="text-2xl font-bold text-slate-900 dark:text-slate-100">{{ all.length }}+</span>
            <span>Foods tracked</span>
          </div>
          <div class="h-4 w-px bg-slate-200 dark:bg-slate-800" />
          <div class="flex items-center gap-1.5">
            <span class="text-2xl font-bold text-slate-900 dark:text-slate-100">6</span>
            <span>Free calculators</span>
          </div>
          <div class="h-4 w-px bg-slate-200 dark:bg-slate-800" />
          <div class="flex items-center gap-1.5">
            <span class="text-2xl font-bold text-slate-900 dark:text-slate-100">100%</span>
            <span>Free, no signup</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Calculator cards ───────────────────────────── -->
    <section class="mx-auto max-w-5xl px-4 py-16">
      <div class="mb-8 text-center">
        <h2 class="text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
          Health Calculators
        </h2>
        <p class="mt-2 text-slate-500 dark:text-slate-400">Instant results, no account required.</p>
      </div>
      <div class="grid gap-5 sm:grid-cols-3">
        <NuxtLink
          v-for="calc in calculators"
          :key="calc.to"
          :to="calc.to"
          class="card-interactive group flex flex-col p-6"
        >
          <div
            :class="[
              calc.iconBg,
              'mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border',
            ]"
          >
            <component
              :is="calc.icon"
              :class="[calc.iconColor, 'h-6 w-6']"
              :stroke-width="1.75"
            />
          </div>
          <h3
            class="font-semibold text-slate-900 dark:text-slate-100 transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
          >
            {{ calc.name }}
          </h3>
          <p class="mt-1 flex-1 text-sm text-slate-500 dark:text-slate-400">{{ calc.desc }}</p>
          <div
            class="mt-4 flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-400"
          >
            Try it free
            <ArrowRight
              :size="14"
              class="ml-1 transition-transform group-hover:translate-x-1"
            />
          </div>
        </NuxtLink>
      </div>
    </section>

    <AdSlot />

    <!-- ── Popular foods ──────────────────────────────── -->
    <section class="mx-auto max-w-5xl px-4 pb-16">
      <div class="mb-6 flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold text-slate-900 dark:text-slate-100">Popular Foods</h2>
          <p class="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
            Calories &amp; macros per 100g serving
          </p>
        </div>
        <NuxtLink
          to="/foods"
          class="flex items-center gap-0.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
        >
          View all <ChevronRight :size="16" />
        </NuxtLink>
      </div>
      <div class="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
        <NuxtLink
          v-for="food in featured"
          :key="food.slug"
          :to="`/foods/${food.slug}`"
          class="card-interactive group flex items-center gap-3.5 p-4"
        >
          <div
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-3xl shadow-xs transition-transform group-hover:scale-110"
            :class="getCategoryMeta(food.category).cardBgClass"
          >
            {{ food.icon }}
          </div>
          <div class="min-w-0 flex-1">
            <p class="truncate font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {{ food.name }}
            </p>
            <p class="text-xs text-slate-400 dark:text-slate-500 truncate">{{ food.preparation || food.category }}</p>
            <p class="mt-1 text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
              {{ food.calories }} <span class="text-xs font-normal text-slate-400 dark:text-slate-500">kcal</span>
            </p>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- ── Food Comparisons (VS) ────────────────────── -->
    <section class="mx-auto max-w-5xl px-4 pb-16">
      <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Scale :size="24" class="text-emerald-600 dark:text-emerald-400" />
            Popular Food Comparisons (VS)
          </h2>
          <p class="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
            Side-by-side nutrition, calories &amp; macro comparisons
          </p>
        </div>
        <NuxtLink
          to="/compare"
          class="inline-flex items-center gap-0.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
        >
          View all 120+ comparisons <ChevronRight :size="16" />
        </NuxtLink>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="pair in homeComparisons"
          :key="pair.slug"
          :to="`/compare/${pair.slug}`"
          class="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-700"
        >
          <!-- Side-by-side Showcase -->
          <div class="flex items-center justify-between gap-2 mb-4">
            <!-- Food 1 -->
            <div class="flex flex-1 flex-col items-center text-center">
              <div class="mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-3xl shadow-sm transition-transform group-hover:scale-110 dark:bg-emerald-950/40">
                {{ pair.icon1 }}
              </div>
              <span class="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight">
                {{ pair.name1 }}
              </span>
              <span class="mt-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                {{ pair.cal1 }} kcal
              </span>
            </div>

            <!-- Glowing Emerald VS Badge -->
            <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-black text-white shadow-md shadow-emerald-500/20 group-hover:scale-110 transition-transform dark:bg-emerald-500">
              VS
            </div>

            <!-- Food 2 -->
            <div class="flex flex-1 flex-col items-center text-center">
              <div class="mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50/60 text-3xl shadow-sm transition-transform group-hover:scale-110 dark:bg-slate-800">
                {{ pair.icon2 }}
              </div>
              <span class="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight">
                {{ pair.name2 }}
              </span>
              <span class="mt-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                {{ pair.cal2 }} kcal
              </span>
            </div>
          </div>

          <!-- Bottom Action Link -->
          <div class="flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-bold text-emerald-600 dark:border-slate-800 dark:text-emerald-400 group-hover:text-emerald-700">
            <span>Compare Nutrition</span>
            <ArrowRight :size="14" class="transition-transform group-hover:translate-x-1" />
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- ── Browse by category ─────────────────────────── -->
    <section class="border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 py-16">
      <div class="mx-auto max-w-5xl px-4">
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-slate-900 dark:text-slate-100">Browse by Category</h2>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {{ categories.length }} food categories
          </p>
        </div>
        <div class="flex flex-wrap gap-2">
          <NuxtLink
            v-for="cat in categories"
            :key="cat"
            :to="`/categories/${categorySlug(cat)}`"
            class="inline-flex items-center rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:border-emerald-600 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300 hover:shadow-sm"
          >
            {{ cat }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <AdSlot />
  </div>
</template>
