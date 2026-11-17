<script setup lang="ts">
import { Scale, Search, ArrowRight, ChevronDown } from "@lucide/vue";
import { comparisonPairs } from "~/data/comparisons";

const { getBySlug } = useFoods();
const searchQuery = ref("");
const selectedCategory = ref("All");
const displayLimit = ref(18);

watch([searchQuery, selectedCategory], () => {
  displayLimit.value = 18;
});

const categories = [
  "All",
  "Fast Food",
  "Meat & Poultry",
  "Dairy & Eggs",
  "Snacks & Desserts",
  "Grains & Fruits",
];

const mappedPairs = computed(() => {
  return comparisonPairs.map((pair) => {
    const f1 = getBySlug(pair.food1Slug);
    const f2 = getBySlug(pair.food2Slug);
    return {
      slug: pair.slug,
      title: pair.title,
      food1: {
        name: f1?.name || pair.food1Slug,
        icon: f1?.icon || "🍽️",
        calories: f1?.calories ?? 0,
        protein: f1?.protein_g ?? 0,
        category: f1?.category || "Other",
      },
      food2: {
        name: f2?.name || pair.food2Slug,
        icon: f2?.icon || "🍽️",
        calories: f2?.calories ?? 0,
        protein: f2?.protein_g ?? 0,
        category: f2?.category || "Other",
      },
    };
  });
});

const filteredPairs = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  return mappedPairs.value.filter((pair) => {
    const matchesSearch =
      !q ||
      pair.title.toLowerCase().includes(q) ||
      pair.food1.name.toLowerCase().includes(q) ||
      pair.food2.name.toLowerCase().includes(q);

    if (!matchesSearch) return false;

    if (selectedCategory.value === "All") return true;
    if (selectedCategory.value === "Fast Food")
      return pair.food1.category === "Fast Food" || pair.food2.category === "Fast Food";
    if (selectedCategory.value === "Meat & Poultry")
      return pair.food1.category === "Meat & Poultry" || pair.food2.category === "Meat & Poultry";
    if (selectedCategory.value === "Dairy & Eggs")
      return pair.food1.category === "Dairy & Eggs" || pair.food2.category === "Dairy & Eggs";
    if (selectedCategory.value === "Snacks & Desserts")
      return pair.food1.category === "Snacks" || pair.food2.category === "Snacks";
    if (selectedCategory.value === "Grains & Fruits")
      return (
        pair.food1.category === "Fruits" ||
        pair.food1.category === "Grains & Bread" ||
        pair.food2.category === "Fruits" ||
        pair.food2.category === "Grains & Bread"
      );

    return true;
  });
});

const visiblePairs = computed(() => {
  return filteredPairs.value.slice(0, displayLimit.value);
});

function loadMore() {
  displayLimit.value += 18;
}

useSeoMeta({
  title: "Food Nutrition Comparisons — Compare Calories & Macros Side by Side",
  description:
    "Compare calories, protein, carbs, fat, sugar, and fiber side-by-side across 120+ popular food pairs including McDonald's, Chipotle, Starbucks, meats, dairy, and snacks.",
});

useHead({
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://caloriefacts.org" },
          { "@type": "ListItem", position: 2, name: "Compare Foods", item: "https://caloriefacts.org/compare" },
        ],
      }),
    },
  ],
});
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-10">
    <!-- Header -->
    <div class="mb-8 text-center sm:text-left">
      <div class="mb-2 flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 sm:justify-start">
        <Scale :size="22" :stroke-width="2" />
        <span class="text-sm font-bold uppercase tracking-wider">Side-by-Side Analysis</span>
      </div>
      <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
        Food Nutrition Comparisons
      </h1>
      <p class="mt-2 text-slate-600 dark:text-slate-400">
        Compare calories, macros, and nutrients side-by-side across {{ mappedPairs.length }} popular food pairs.
      </p>
    </div>

    <!-- Search Bar -->
    <div class="relative mb-6">
      <Search :size="18" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search comparison (e.g. Big Mac vs Whopper, Banana vs Apple)..."
        class="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-emerald-400"
      />
    </div>

    <!-- Category Filter Chips -->
    <div class="mb-8 flex flex-wrap gap-2">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="selectedCategory = cat"
        class="rounded-xl px-4 py-2 text-xs font-bold transition"
        :class="
          selectedCategory === cat
            ? 'bg-emerald-600 text-white shadow-sm dark:bg-emerald-500'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
        "
      >
        {{ cat }}
      </button>
    </div>

    <!-- Grid of Comparisons -->
    <div v-if="filteredPairs.length > 0" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="pair in visiblePairs"
        :key="pair.slug"
        :to="`/compare/${pair.slug}`"
        class="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-700"
      >
        <div class="flex items-center justify-between gap-3">
          <!-- Food 1 -->
          <div class="flex flex-1 flex-col items-center text-center">
            <span class="mb-1 text-3xl transition group-hover:scale-110">{{ pair.food1.icon }}</span>
            <span class="line-clamp-1 text-xs font-bold text-slate-800 dark:text-slate-200">{{ pair.food1.name }}</span>
            <span class="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">{{ pair.food1.calories }} kcal</span>
          </div>

          <!-- Emerald VS Badge -->
          <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-extrabold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            VS
          </div>

          <!-- Food 2 -->
          <div class="flex flex-1 flex-col items-center text-center">
            <span class="mb-1 text-3xl transition group-hover:scale-110">{{ pair.food2.icon }}</span>
            <span class="line-clamp-1 text-xs font-bold text-slate-800 dark:text-slate-200">{{ pair.food2.name }}</span>
            <span class="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">{{ pair.food2.calories }} kcal</span>
          </div>
        </div>

        <div class="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-bold text-emerald-600 transition group-hover:text-emerald-700 dark:border-slate-800 dark:text-emerald-400">
          <span>Compare Nutrition</span>
          <ArrowRight :size="14" class="transition group-hover:translate-x-1" />
        </div>
      </NuxtLink>
    </div>

    <!-- Empty Search State -->
    <div v-else class="rounded-2xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-800">
      <p class="text-slate-500 dark:text-slate-400">No comparison pairs match your search query.</p>
    </div>

    <!-- Load More Section & AdSlot -->
    <div v-if="displayLimit < filteredPairs.length" class="mt-10 flex flex-col items-center justify-center gap-4">
      <AdSlot label="Food Comparisons In-Feed Ad" />

      <p class="text-xs font-medium text-slate-500 dark:text-slate-400">
        Showing {{ visiblePairs.length }} of {{ filteredPairs.length }} comparisons
      </p>
      <button
        @click="loadMore"
        class="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow-md dark:bg-emerald-600 dark:hover:bg-emerald-500"
      >
        <span>Load More Comparisons</span>
        <ChevronDown :size="18" />
      </button>
    </div>
  </div>
</template>
