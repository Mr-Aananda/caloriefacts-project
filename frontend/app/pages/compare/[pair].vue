<script setup lang="ts">
import { ChevronRight, ArrowRightLeft, Trophy, Zap, ShieldCheck } from "@lucide/vue";
import { comparisonPairs } from "~/data/comparisons";

const route = useRoute();
const { getBySlug, getCategoryMeta } = useFoods();

const pairParam = route.params.pair as string;

// Find comparison pair from curated list, or attempt dynamic parse if "a-vs-b"
const pairMeta = comparisonPairs.find((p) => p.slug === pairParam);

let food1Slug = pairMeta?.food1Slug;
let food2Slug = pairMeta?.food2Slug;

if (!food1Slug || !food2Slug) {
  const parts = pairParam.split("-vs-");
  if (parts.length === 2) {
    food1Slug = parts[0];
    food2Slug = parts[1];
  }
}

const food1 = food1Slug ? getBySlug(food1Slug) : undefined;
const food2 = food2Slug ? getBySlug(food2Slug) : undefined;

if (!food1 || !food2) {
  throw createError({ statusCode: 404, statusMessage: "Comparison pair not found" });
}

const calDiff = Math.abs(food1.calories - food2.calories);
const proteinDiff = Math.round(Math.abs(food1.protein_g - food2.protein_g) * 10) / 10;
const carbsDiff = Math.round(Math.abs(food1.carbs_g - food2.carbs_g) * 10) / 10;
const fatDiff = Math.round(Math.abs(food1.fat_g - food2.fat_g) * 10) / 10;
const fiberDiff = Math.round(Math.abs(food1.fiber_g - food2.fiber_g) * 10) / 10;
const sugarDiff = Math.round(Math.abs(food1.sugar_g - food2.sugar_g) * 10) / 10;

// Feature 3: Smart Winner Computations
const calorieWinner = computed(() => {
  if (food1.calories < food2.calories) return { food: food1, diff: calDiff };
  if (food2.calories < food1.calories) return { food: food2, diff: calDiff };
  return null;
});

const proteinWinner = computed(() => {
  if (food1.protein_g > food2.protein_g) return { food: food1, diff: proteinDiff };
  if (food2.protein_g > food1.protein_g) return { food: food2, diff: proteinDiff };
  return null;
});

const fiberWinner = computed(() => {
  if (food1.fiber_g > food2.fiber_g) return { food: food1, diff: fiberDiff };
  if (food2.fiber_g > food1.fiber_g) return { food: food2, diff: fiberDiff };
  return null;
});

const title = `${food1.name} vs ${food2.name}: Calories & Nutrition Comparison`;
const description = `Compare ${food1.name} vs ${food2.name} calories, protein, carbs, fat, fiber, and sodium per 100g serving. Which is healthier for your diet goals?`;

useSeoMeta({
  title,
  description,
});

const siteUrl = "https://caloriefacts.org";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Food Database", item: `${siteUrl}/foods` },
    { "@type": "ListItem", position: 3, name: `${food1.name} vs ${food2.name}`, item: `${siteUrl}/compare/${pairParam}` },
  ],
};

useHead({
  script: [{ type: "application/ld+json", innerHTML: JSON.stringify(breadcrumbJsonLd) }],
});

const otherPairs = computed(() =>
  comparisonPairs.filter((p) => p.slug !== pairParam).slice(0, 4)
);
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-10">
    <!-- Breadcrumbs -->
    <nav class="mb-6 flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
      <NuxtLink to="/" class="hover:text-emerald-600 dark:hover:text-emerald-400">Home</NuxtLink>
      <ChevronRight :size="12" />
      <NuxtLink to="/foods" class="hover:text-emerald-600 dark:hover:text-emerald-400">Food Database</NuxtLink>
      <ChevronRight :size="12" />
      <span class="text-slate-900 dark:text-slate-100 font-semibold">{{ food1.name }} vs {{ food2.name }}</span>
    </nav>

    <!-- Header -->
    <div class="mb-8 text-center sm:text-left">
      <div class="mb-2 flex items-center justify-center gap-2 text-indigo-600 dark:text-indigo-400 sm:justify-start">
        <ArrowRightLeft :size="20" :stroke-width="1.75" />
        <span class="text-sm font-semibold uppercase tracking-wide">
          Nutrition Comparison
        </span>
      </div>
      <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
        {{ food1.name }} vs {{ food2.name }}
      </h1>
      <p class="mt-2 text-slate-600 dark:text-slate-300">
        Side-by-side calories, protein, carbs, fat, fiber, and micronutrients comparison per 100g serving.
      </p>
    </div>

    <!-- Feature 3: Smart Visual Verdict Summary Banner -->
    <div class="mb-8 rounded-2xl bg-gradient-to-br from-indigo-50/80 via-purple-50/50 to-white dark:from-indigo-950/40 dark:via-purple-950/20 dark:to-slate-900 p-6 border border-indigo-100 dark:border-indigo-900/50 shadow-sm">
      <div class="mb-4 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-sm uppercase tracking-wider">
        <Trophy :size="18" />
        <span>Quick Verdict &amp; Category Winners</span>
      </div>
      <div class="grid gap-3 sm:grid-cols-3 text-xs">
        <!-- Calorie Winner -->
        <div v-if="calorieWinner" class="rounded-xl bg-white dark:bg-slate-900 p-3.5 border border-indigo-100 dark:border-indigo-900/40 shadow-2xs">
          <span class="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <ShieldCheck :size="14" />
            Lowest Calorie Option
          </span>
          <p class="mt-1 font-extrabold text-slate-900 dark:text-slate-100 text-sm">
            {{ calorieWinner.food.icon }} {{ calorieWinner.food.name }}
          </p>
          <p class="mt-0.5 text-slate-500 dark:text-slate-400">
            Has <span class="font-bold text-emerald-600 dark:text-emerald-400">{{ calorieWinner.diff }} kcal less</span> per 100g
          </p>
        </div>

        <!-- Protein Winner -->
        <div v-if="proteinWinner" class="rounded-xl bg-white dark:bg-slate-900 p-3.5 border border-indigo-100 dark:border-indigo-900/40 shadow-2xs">
          <span class="text-[11px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
            <Zap :size="14" />
            High Protein Winner
          </span>
          <p class="mt-1 font-extrabold text-slate-900 dark:text-slate-100 text-sm">
            {{ proteinWinner.food.icon }} {{ proteinWinner.food.name }}
          </p>
          <p class="mt-0.5 text-slate-500 dark:text-slate-400">
            Provides <span class="font-bold text-blue-600 dark:text-blue-400">{{ proteinWinner.diff }}g more protein</span>
          </p>
        </div>

        <!-- Fiber Winner -->
        <div v-if="fiberWinner" class="rounded-xl bg-white dark:bg-slate-900 p-3.5 border border-indigo-100 dark:border-indigo-900/40 shadow-2xs">
          <span class="text-[11px] font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1">
            <Trophy :size="14" />
            Highest Fiber Choice
          </span>
          <p class="mt-1 font-extrabold text-slate-900 dark:text-slate-100 text-sm">
            {{ fiberWinner.food.icon }} {{ fiberWinner.food.name }}
          </p>
          <p class="mt-0.5 text-slate-500 dark:text-slate-400">
            Has <span class="font-bold text-teal-600 dark:text-teal-400">{{ fiberWinner.diff }}g more dietary fiber</span>
          </p>
        </div>
      </div>
    </div>

    <!-- Side-by-side Hero Cards -->
    <div class="grid gap-4 sm:grid-cols-2">
      <!-- Food 1 Card -->
      <div class="card p-6 border-2 border-emerald-100 bg-emerald-50/20 dark:border-emerald-900/50 dark:bg-emerald-950/20 relative">
        <div class="flex items-center gap-3 mb-4">
          <div
            class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-4xl shadow-xs"
            :class="getCategoryMeta(food1.category).cardBgClass"
          >
            {{ food1.icon }}
          </div>
          <div>
            <NuxtLink
              :to="`/foods/${food1.slug}`"
              class="font-extrabold text-xl text-slate-900 dark:text-slate-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              {{ food1.name }}
            </NuxtLink>
            <p class="text-xs text-slate-500 dark:text-slate-400">{{ food1.category }} ({{ food1.preparation }})</p>
          </div>
        </div>

        <div class="rounded-xl bg-white dark:bg-slate-900 p-4 border border-emerald-100 dark:border-emerald-900/50 text-center mb-4">
          <span class="text-xs text-slate-400 dark:text-slate-500 font-medium block">Energy per 100g</span>
          <span class="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">{{ food1.calories }}</span>
          <span class="text-xs text-slate-400 dark:text-slate-500 font-semibold ml-1">kcal</span>
        </div>

        <div class="grid grid-cols-3 gap-2 text-center text-xs">
          <div class="rounded-lg bg-white dark:bg-slate-900 p-2 border border-slate-100 dark:border-slate-800">
            <span class="text-slate-400 dark:text-slate-500 block text-[10px]">Protein</span>
            <span class="font-bold text-slate-800 dark:text-slate-200 text-sm">{{ food1.protein_g }}g</span>
          </div>
          <div class="rounded-lg bg-white dark:bg-slate-900 p-2 border border-slate-100 dark:border-slate-800">
            <span class="text-slate-400 dark:text-slate-500 block text-[10px]">Carbs</span>
            <span class="font-bold text-slate-800 dark:text-slate-200 text-sm">{{ food1.carbs_g }}g</span>
          </div>
          <div class="rounded-lg bg-white dark:bg-slate-900 p-2 border border-slate-100 dark:border-slate-800">
            <span class="text-slate-400 dark:text-slate-500 block text-[10px]">Fat</span>
            <span class="font-bold text-slate-800 dark:text-slate-200 text-sm">{{ food1.fat_g }}g</span>
          </div>
        </div>

        <div class="mt-4 text-center">
          <NuxtLink
            :to="`/foods/${food1.slug}`"
            class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
          >
            View full {{ food1.name }} nutrition →
          </NuxtLink>
        </div>
      </div>

      <!-- Food 2 Card -->
      <div class="card p-6 border-2 border-blue-100 bg-blue-50/20 dark:border-blue-900/50 dark:bg-blue-950/20 relative">
        <div class="flex items-center gap-3 mb-4">
          <div
            class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-4xl shadow-xs"
            :class="getCategoryMeta(food2.category).cardBgClass"
          >
            {{ food2.icon }}
          </div>
          <div>
            <NuxtLink
              :to="`/foods/${food2.slug}`"
              class="font-extrabold text-xl text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {{ food2.name }}
            </NuxtLink>
            <p class="text-xs text-slate-500 dark:text-slate-400">{{ food2.category }} ({{ food2.preparation }})</p>
          </div>
        </div>

        <div class="rounded-xl bg-white dark:bg-slate-900 p-4 border border-blue-100 dark:border-blue-900/50 text-center mb-4">
          <span class="text-xs text-slate-400 dark:text-slate-500 font-medium block">Energy per 100g</span>
          <span class="text-4xl font-extrabold text-blue-600 dark:text-blue-400">{{ food2.calories }}</span>
          <span class="text-xs text-slate-400 dark:text-slate-500 font-semibold ml-1">kcal</span>
        </div>

        <div class="grid grid-cols-3 gap-2 text-center text-xs">
          <div class="rounded-lg bg-white dark:bg-slate-900 p-2 border border-slate-100 dark:border-slate-800">
            <span class="text-slate-400 dark:text-slate-500 block text-[10px]">Protein</span>
            <span class="font-bold text-slate-800 dark:text-slate-200 text-sm">{{ food2.protein_g }}g</span>
          </div>
          <div class="rounded-lg bg-white dark:bg-slate-900 p-2 border border-slate-100 dark:border-slate-800">
            <span class="text-slate-400 dark:text-slate-500 block text-[10px]">Carbs</span>
            <span class="font-bold text-slate-800 dark:text-slate-200 text-sm">{{ food2.carbs_g }}g</span>
          </div>
          <div class="rounded-lg bg-white dark:bg-slate-900 p-2 border border-slate-100 dark:border-slate-800">
            <span class="text-slate-400 dark:text-slate-500 block text-[10px]">Fat</span>
            <span class="font-bold text-slate-800 dark:text-slate-200 text-sm">{{ food2.fat_g }}g</span>
          </div>
        </div>

        <div class="mt-4 text-center">
          <NuxtLink
            :to="`/foods/${food2.slug}`"
            class="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            View full {{ food2.name }} nutrition →
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Comparison Table -->
    <section class="mt-10">
      <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Detailed Nutrition Comparison (per 100g)</h2>
      <div class="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-left">
              <th class="px-4 py-3.5 font-bold text-slate-700 dark:text-slate-300">Nutrient</th>
              <th class="px-4 py-3.5 font-bold text-emerald-600 dark:text-emerald-400">{{ food1.icon }} {{ food1.name }}</th>
              <th class="px-4 py-3.5 font-bold text-blue-600 dark:text-blue-400">{{ food2.icon }} {{ food2.name }}</th>
              <th class="px-4 py-3.5 font-bold text-slate-500 dark:text-slate-400">Difference</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
            <tr>
              <td class="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200">Calories</td>
              <td class="px-4 py-3 font-extrabold text-emerald-600 dark:text-emerald-400">{{ food1.calories }} kcal</td>
              <td class="px-4 py-3 font-extrabold text-blue-600 dark:text-blue-400">{{ food2.calories }} kcal</td>
              <td class="px-4 py-3 text-xs font-semibold text-slate-500">
                {{ calDiff === 0 ? "Equal" : `${calDiff} kcal` }}
              </td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200">Protein</td>
              <td class="px-4 py-3 font-bold text-slate-900 dark:text-slate-100">{{ food1.protein_g }}g</td>
              <td class="px-4 py-3 font-bold text-slate-900 dark:text-slate-100">{{ food2.protein_g }}g</td>
              <td class="px-4 py-3 text-xs font-semibold text-slate-500">
                {{ proteinDiff === 0 ? "Equal" : `${proteinDiff}g` }}
              </td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200">Carbohydrates</td>
              <td class="px-4 py-3 text-slate-700 dark:text-slate-300">{{ food1.carbs_g }}g</td>
              <td class="px-4 py-3 text-slate-700 dark:text-slate-300">{{ food2.carbs_g }}g</td>
              <td class="px-4 py-3 text-xs font-semibold text-slate-500">
                {{ carbsDiff === 0 ? "Equal" : `${carbsDiff}g` }}
              </td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200">Dietary Fiber</td>
              <td class="px-4 py-3 text-slate-700 dark:text-slate-300">{{ food1.fiber_g }}g</td>
              <td class="px-4 py-3 text-slate-700 dark:text-slate-300">{{ food2.fiber_g }}g</td>
              <td class="px-4 py-3 text-xs font-semibold text-slate-500">
                {{ fiberDiff === 0 ? "Equal" : `${fiberDiff}g` }}
              </td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200">Sugar</td>
              <td class="px-4 py-3 text-slate-700 dark:text-slate-300">{{ food1.sugar_g }}g</td>
              <td class="px-4 py-3 text-slate-700 dark:text-slate-300">{{ food2.sugar_g }}g</td>
              <td class="px-4 py-3 text-xs font-semibold text-slate-500">
                {{ sugarDiff === 0 ? "Equal" : `${sugarDiff}g` }}
              </td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200">Total Fat</td>
              <td class="px-4 py-3 text-slate-700 dark:text-slate-300">{{ food1.fat_g }}g</td>
              <td class="px-4 py-3 text-slate-700 dark:text-slate-300">{{ food2.fat_g }}g</td>
              <td class="px-4 py-3 text-xs font-semibold text-slate-500">
                {{ fatDiff === 0 ? "Equal" : `${fatDiff}g` }}
              </td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200">Sodium</td>
              <td class="px-4 py-3 text-slate-700 dark:text-slate-300">{{ food1.sodium_mg }}mg</td>
              <td class="px-4 py-3 text-slate-700 dark:text-slate-300">{{ food2.sodium_mg }}mg</td>
              <td class="px-4 py-3 text-xs font-semibold text-slate-500">
                {{ Math.abs(food1.sodium_mg - food2.sodium_mg) }}mg
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <AdSlot />

    <!-- Other Comparisons -->
    <section class="mt-12">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">Explore Other Food Comparisons</h2>
        <NuxtLink to="/compare" class="text-xs font-bold text-indigo-600 hover:underline dark:text-indigo-400">
          View All 120+ Comparisons →
        </NuxtLink>
      </div>
      <div class="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
        <NuxtLink
          v-for="p in otherPairs"
          :key="p.slug"
          :to="`/compare/${p.slug}`"
          class="card-interactive flex items-center justify-between p-3.5 group text-xs font-semibold"
        >
          <span class="truncate">{{ p.title }}</span>
          <ChevronRight :size="14" class="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
