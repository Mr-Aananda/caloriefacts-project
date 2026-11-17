<script setup lang="ts">
import { Search, Apple, ArrowRight, Scale, ChevronDown } from "@lucide/vue";
import { comparisonPairs } from "~/data/comparisons";

const { all, categories, getCategoryMeta, getBySlug } = useFoods();
const query = ref("");
const displayLimit = ref(24);

watch(query, () => {
  displayLimit.value = 24;
});

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return all;
  return all.filter(
    (f) =>
      f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q)
  );
});

const visibleFoods = computed(() => {
  return filtered.value.slice(0, displayLimit.value);
});

function loadMore() {
  displayLimit.value += 24;
}

const topComparisons = computed(() => {
  return comparisonPairs.slice(0, 8).map((pair) => {
    const f1 = getBySlug(pair.food1Slug);
    const f2 = getBySlug(pair.food2Slug);
    return {
      slug: pair.slug,
      name1: f1?.name || pair.food1Slug,
      icon1: f1?.icon || "🍽️",
      name2: f2?.name || pair.food2Slug,
      icon2: f2?.icon || "🍽️",
    };
  });
});

useSeoMeta({
  title: "Food Calorie Database — Calories, Protein, Carbs & Fat",
  description:
    "Browse calories and nutrition facts (protein, carbs, fat, fiber, sugar, sodium) for 325+ common foods including fruits, vegetables, meat, dairy, fast food, and fitness snacks.",
});
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-10">
    <!-- Header -->
    <div class="mb-8 text-center sm:text-left">
      <div class="mb-2 flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 sm:justify-start">
        <Apple :size="20" :stroke-width="1.75" />
        <span class="text-sm font-semibold uppercase tracking-wide">
          Nutrition Database
        </span>
      </div>
      <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
        Food Calorie &amp; Nutrition Database
      </h1>
      <p class="mt-2 text-slate-600 dark:text-slate-400">
        Nutritional breakdown for {{ all.length }} common foods per 100g serving.
      </p>
    </div>

    <!-- Search Bar -->
    <div class="relative mb-6">
      <Search
        :size="18"
        class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
      />
      <input
        v-model="query"
        type="text"
        placeholder="Search foods or categories, e.g. Banana, Chicken, Fruits..."
        class="form-input pl-11 py-3 text-base shadow-sm"
      />
    </div>

    <!-- Categories Filter Chips with Custom Colors & Icons -->
    <div class="mb-8 flex flex-wrap gap-2">
      <NuxtLink
        v-for="cat in categories"
        :key="cat"
        :to="`/categories/${getCategoryMeta(cat).slug}`"
        class="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold shadow-xs transition-all hover:scale-105 hover:shadow-sm"
        :class="getCategoryMeta(cat).badgeClass"
      >
        <span class="text-sm leading-none">{{ getCategoryMeta(cat).icon }}</span>
        <span>{{ cat }}</span>
      </NuxtLink>
    </div>

    <!-- Food Cards Grid -->
    <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <NuxtLink
        v-for="food in visibleFoods"
        :key="food.slug"
        :to="`/foods/${food.slug}`"
        class="card-interactive group flex flex-col p-4"
      >
        <div class="mb-3 flex items-start justify-between">
          <div
            class="flex h-14 w-14 items-center justify-center rounded-2xl text-4xl shadow-xs transition-transform group-hover:scale-110"
            :class="getCategoryMeta(food.category).cardBgClass"
          >
            {{ food.icon }}
          </div>
          <span
            class="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold"
            :class="getCategoryMeta(food.category).badgeClass"
          >
            {{ food.category }}
          </span>
        </div>

        <h2 class="font-bold text-slate-900 dark:text-slate-100 transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
          {{ food.name }}
        </h2>
        <p class="text-xs text-slate-400 dark:text-slate-500 mb-3">{{ food.preparation }}</p>

        <div class="mt-auto border-t border-slate-100 dark:border-slate-800 pt-3">
          <div class="flex items-baseline justify-between">
            <span class="text-xs font-medium text-slate-500 dark:text-slate-400">Calories</span>
            <span class="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
              {{ food.calories }} <span class="text-xs font-normal text-slate-400 dark:text-slate-500">kcal</span>
            </span>
          </div>

          <div class="mt-2 grid grid-cols-3 gap-1 text-center text-[11px] font-medium text-slate-500 dark:text-slate-400">
            <div class="rounded bg-slate-50 dark:bg-slate-800/80 p-1">
              <span class="block text-[10px] text-slate-400 dark:text-slate-500">Protein</span>
              <span class="font-bold text-slate-700 dark:text-slate-200">{{ food.protein_g }}g</span>
            </div>
            <div class="rounded bg-slate-50 dark:bg-slate-800/80 p-1">
              <span class="block text-[10px] text-slate-400 dark:text-slate-500">Carbs</span>
              <span class="font-bold text-slate-700 dark:text-slate-200">{{ food.carbs_g }}g</span>
            </div>
            <div class="rounded bg-slate-50 dark:bg-slate-800/80 p-1">
              <span class="block text-[10px] text-slate-400 dark:text-slate-500">Fat</span>
              <span class="font-bold text-slate-700 dark:text-slate-200">{{ food.fat_g }}g</span>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- Empty state -->
    <div
      v-if="filtered.length === 0"
      class="mt-12 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-8"
    >
      <span class="text-4xl">🔍</span>
      <p class="mt-3 text-base font-semibold text-slate-800 dark:text-slate-200">
        No foods found matching "{{ query }}"
      </p>
      <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
        Try searching for something else or browse by category above.
      </p>
    </div>

    <!-- Load More Section & AdSlot -->
    <div v-if="displayLimit < filtered.length" class="mt-10 flex flex-col items-center justify-center gap-4">
      <AdSlot label="Food Database In-Feed Ad" />

      <p class="text-xs font-medium text-slate-500 dark:text-slate-400">
        Showing {{ visibleFoods.length }} of {{ filtered.length }} foods
      </p>
      <button
        @click="loadMore"
        class="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow-md dark:bg-emerald-500 dark:hover:bg-emerald-600"
      >
        <span>Load More Foods</span>
        <ChevronDown :size="18" />
      </button>
    </div>

    <!-- Popular Comparisons Section -->
    <section class="mt-16 border-t border-slate-100 dark:border-slate-800 pt-12">
      <div class="mb-6 flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Scale :size="20" class="text-emerald-600 dark:text-emerald-400" />
            Popular Food Comparisons
          </h2>
          <p class="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
            Side-by-side nutrition, calories &amp; macro comparisons
          </p>
        </div>
        <NuxtLink to="/compare" class="text-xs font-bold text-emerald-600 hover:underline dark:text-emerald-400">
          View All Comparisons →
        </NuxtLink>
      </div>
      <div class="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
        <NuxtLink
          v-for="pair in topComparisons"
          :key="pair.slug"
          :to="`/compare/${pair.slug}`"
          class="card-interactive flex items-center justify-between p-3.5 group"
        >
          <div class="flex items-center gap-1 text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
            <span class="truncate">{{ pair.icon1 }} {{ pair.name1 }}</span>
            <span class="text-emerald-600 dark:text-emerald-400 font-extrabold px-1">vs</span>
            <span class="truncate">{{ pair.icon2 }} {{ pair.name2 }}</span>
          </div>
          <ArrowRight :size="14" class="text-slate-400 dark:text-slate-500 shrink-0 group-hover:translate-x-0.5 transition-transform" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
