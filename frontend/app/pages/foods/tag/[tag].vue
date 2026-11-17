<script setup lang="ts">
import { ChevronRight, Tag } from "@lucide/vue";

const route = useRoute();
const { all, getCategoryMeta } = useFoods();

const rawTag = route.params.tag as string;

const tagDescriptions: Record<string, { title: string; desc: string }> = {
  "high-protein": {
    title: "High Protein Foods Database",
    desc: "Discover foods containing 20g or more of protein per 100g serving. High protein foods promote satiety, support lean muscle retention, and boost metabolic rate during weight loss or athletic training.",
  },
  "low-calorie": {
    title: "Low Calorie Foods Database",
    desc: "Browse nutrient-rich foods with 50 calories or fewer per 100g serving. Ideal for high-volume eating during a calorie deficit without sacrificing volume or feeling restricted.",
  },
  "low-fat": {
    title: "Low Fat Foods Database",
    desc: "Explore foods containing 1g of fat or less per 100g portion. Perfect for building lean meal plans or managing dietary fat intake for medical or digestive goals.",
  },
  "high-fiber": {
    title: "High Fiber Foods Database",
    desc: "View whole foods containing 5g or more of dietary fiber per 100g. Dietary fiber supports gut digestive health, blood sugar stability, and sustained appetite control.",
  },
  "low-carb": {
    title: "Low Carb Foods Database",
    desc: "Find foods with 5g of carbohydrates or fewer per 100g. Great for ketogenic diets, diabetic meal management, or carb-conscious nutrition protocols.",
  },
  "calorie-dense": {
    title: "Calorie Dense Foods Database",
    desc: "Examine energy-dense foods providing 400 calories or more per 100g portion. Excellent sources for healthy weight gain, athletic bulking, or compact endurance energy.",
  },
};

const tagMeta = computed(() => {
  const info = tagDescriptions[rawTag] || {
    title: `${rawTag.replace("-", " ")} Foods Database`,
    desc: `Browse all foods tagged as ${rawTag.replace("-", " ")} per 100g serving.`,
  };
  return info;
});

const foods = computed(() => all.filter((f) => f.tags.includes(rawTag)));

if (foods.value.length === 0) {
  throw createError({ statusCode: 404, statusMessage: "Tag not found" });
}

const siteUrl = "https://caloriefacts.org";

useSeoMeta({
  title: `${tagMeta.value.title} — Calories & Nutrition`,
  description: `${tagMeta.value.desc.slice(0, 150)}...`,
});

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Food Database",
      item: `${siteUrl}/foods`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: `Tag: ${rawTag}`,
      item: `${siteUrl}/foods/tag/${rawTag}`,
    },
  ],
};

useHead({
  script: [{ type: "application/ld+json", innerHTML: JSON.stringify(breadcrumbJsonLd) }],
});
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-10">
    <!-- Breadcrumb -->
    <nav class="mb-6 flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
      <NuxtLink to="/" class="hover:text-emerald-600 dark:hover:text-emerald-400">Home</NuxtLink>
      <ChevronRight :size="12" />
      <NuxtLink to="/foods" class="hover:text-emerald-600 dark:hover:text-emerald-400">Food Database</NuxtLink>
      <ChevronRight :size="12" />
      <span class="text-slate-900 dark:text-slate-100 font-semibold capitalize">{{ rawTag.replace("-", " ") }}</span>
    </nav>

    <!-- Header Hero -->
    <div class="card mb-8 p-6 sm:p-8">
      <div class="flex items-start gap-4">
        <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-2xl border border-emerald-100 dark:border-emerald-900/50">
          <Tag :size="24" />
        </div>
        <div>
          <span class="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 text-xs font-semibold mb-1 capitalize">
            {{ rawTag.replace("-", " ") }}
          </span>
          <h1 class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
            {{ tagMeta.title }}
          </h1>
          <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {{ tagMeta.desc }}
          </p>
        </div>
      </div>
    </div>

    <!-- Food Cards Grid -->
    <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <NuxtLink
        v-for="food in foods"
        :key="food.slug"
        :to="`/foods/${food.slug}`"
        class="card-interactive group flex flex-col p-4"
      >
        <div class="mb-3 flex items-start justify-between">
          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl text-3xl shadow-xs transition-transform group-hover:scale-110"
            :class="getCategoryMeta(food.category).cardBgClass"
          >
            {{ food.icon }}
          </div>
          <span
            class="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold"
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
  </div>
</template>
