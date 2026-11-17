<script setup lang="ts">
import { ChevronRight, Scale, PieChart } from "@lucide/vue";

const route = useRoute();
const { getBySlug, getByCategory, categorySlug, getCategoryMeta } = useFoods();

const food = getBySlug(route.params.slug as string);

if (!food) {
  throw createError({ statusCode: 404, statusMessage: "Food not found" });
}

// Serving size switcher state
const currentGrams = ref(100);

const portionOptions = [
  { label: "100g (Standard)", grams: 100 },
  { label: "1 oz (28g)", grams: 28.35 },
  { label: "150g (Medium)", grams: 150 },
  { label: "200g (Large)", grams: 200 },
];

function scaleVal(value: number) {
  return Math.round((value / food!.servingSizeG) * currentGrams.value * 10) / 10;
}

const currentCalories = computed(() => scaleVal(food!.calories));
const currentProtein = computed(() => scaleVal(food!.protein_g));
const currentCarbs = computed(() => scaleVal(food!.carbs_g));
const currentFat = computed(() => scaleVal(food!.fat_g));
const currentFiber = computed(() => scaleVal(food!.fiber_g));
const currentSugar = computed(() => scaleVal(food!.sugar_g));
const currentSodium = computed(() => scaleVal(food!.sodium_mg));

// Macro percentage calculations
const macroRatios = computed(() => {
  const pCal = currentProtein.value * 4;
  const cCal = currentCarbs.value * 4;
  const fCal = currentFat.value * 9;
  const totalMacroCal = pCal + cCal + fCal || 1;

  return {
    proteinPct: Math.round((pCal / totalMacroCal) * 100),
    carbPct: Math.round((cCal / totalMacroCal) * 100),
    fatPct: Math.round((fCal / totalMacroCal) * 100),
    pCal: Math.round(pCal),
    cCal: Math.round(cCal),
    fCal: Math.round(fCal),
  };
});

const related = computed(() =>
  getByCategory(food.category)
    .filter((f) => f.slug !== food.slug)
    .slice(0, 6)
);

const title = `${food.name} Calories & Nutrition Facts (${currentGrams.value}g)`;
const description = `${food.name} (${food.preparation || "typical serving"}) nutrition facts: ${food.calories} calories, ${food.protein_g}g protein, ${food.carbs_g}g carbs, and ${food.fat_g}g fat per 100g.`;

useSeoMeta({
  title,
  description,
});

const siteUrl = "https://caloriefacts.org";

const nutritionJsonLd = {
  "@context": "https://schema.org",
  "@type": "NutritionInformation",
  name: food.name,
  calories: `${food.calories} calories`,
  proteinContent: `${food.protein_g} g`,
  carbohydrateContent: `${food.carbs_g} g`,
  fatContent: `${food.fat_g} g`,
  fiberContent: `${food.fiber_g} g`,
  sugarContent: `${food.sugar_g} g`,
  sodiumContent: `${food.sodium_mg} mg`,
  servingSize: "100 g",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Food Database", item: `${siteUrl}/foods` },
    { "@type": "ListItem", position: 3, name: food.category, item: `${siteUrl}/categories/${categorySlug(food.category)}` },
    { "@type": "ListItem", position: 4, name: food.name, item: `${siteUrl}/foods/${food.slug}` },
  ],
};

useHead({
  script: [
    { type: "application/ld+json", innerHTML: JSON.stringify(nutritionJsonLd) },
    { type: "application/ld+json", innerHTML: JSON.stringify(breadcrumbJsonLd) },
  ],
});
</script>

<template>
  <div v-if="food" class="mx-auto max-w-4xl px-4 py-10">
    <!-- Breadcrumb UI -->
    <nav class="mb-6 flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
      <NuxtLink to="/" class="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
        Home
      </NuxtLink>
      <ChevronRight :size="12" />
      <NuxtLink to="/foods" class="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
        Food Database
      </NuxtLink>
      <ChevronRight :size="12" />
      <NuxtLink
        :to="`/categories/${categorySlug(food.category)}`"
        class="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
      >
        {{ food.category }}
      </NuxtLink>
      <ChevronRight :size="12" />
      <span class="text-slate-900 dark:text-slate-100 font-semibold">{{ food.name }}</span>
    </nav>

    <!-- Header card -->
    <div class="card p-6 sm:p-8">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-4">
          <div
            class="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl text-5xl shadow-sm"
            :class="getCategoryMeta(food.category).cardBgClass"
          >
            {{ food.icon }}
          </div>
          <div>
            <div class="mb-1 flex items-center gap-2">
              <span
                class="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                :class="getCategoryMeta(food.category).badgeClass"
              >
                {{ food.category }}
              </span>
              <span v-if="food.preparation" class="text-xs text-slate-400 dark:text-slate-500">
                ({{ food.preparation }})
              </span>
            </div>
            <h1 class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
              {{ food.name }}
            </h1>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Nutrition facts for selected portion</p>
          </div>
        </div>

        <div class="rounded-xl bg-emerald-50 dark:bg-emerald-950/50 px-5 py-3 text-center sm:text-right border border-emerald-100 dark:border-emerald-900/50">
          <span class="text-xs font-medium text-emerald-700 dark:text-emerald-400 block">Energy</span>
          <span class="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">{{ currentCalories }}</span>
          <span class="ml-1 text-xs font-semibold text-slate-500 dark:text-slate-400">kcal / {{ currentGrams }}g</span>
        </div>
      </div>

      <!-- Feature 1: Interactive Serving Size Unit Switcher -->
      <div class="mt-8 rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-4 border border-slate-100 dark:border-slate-800">
        <div class="mb-3 flex items-center justify-between">
          <span class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Scale :size="14" class="text-emerald-600 dark:text-emerald-400" />
            Select Portion Size
          </span>
          <span class="text-xs font-medium text-slate-400 dark:text-slate-500">
            Calculated: {{ currentGrams }} grams
          </span>
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="opt in portionOptions"
            :key="opt.grams"
            @click="currentGrams = opt.grams"
            class="rounded-xl px-3.5 py-2 text-xs font-bold transition-all"
            :class="
              currentGrams === opt.grams
                ? 'bg-emerald-600 text-white shadow-sm dark:bg-emerald-500'
                : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            "
          >
            {{ opt.label }}
          </button>
        </div>
      </div>

      <!-- Feature 2: Visual Macro Percentage Progress Bar -->
      <div class="mt-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-4 border border-slate-100 dark:border-slate-800">
        <div class="mb-2 flex items-center justify-between">
          <span class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <PieChart :size="14" class="text-emerald-600 dark:text-emerald-400" />
            Calorie Ratio Breakdown
          </span>
        </div>

        <!-- Stacked progress bar -->
        <div class="h-4 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700 flex shadow-inner">
          <div
            class="bg-emerald-500 transition-all duration-300"
            :style="{ width: `${macroRatios.proteinPct}%` }"
            :title="`Protein: ${macroRatios.proteinPct}% (${macroRatios.pCal} kcal)`"
          />
          <div
            class="bg-amber-400 transition-all duration-300"
            :style="{ width: `${macroRatios.carbPct}%` }"
            :title="`Carbs: ${macroRatios.carbPct}% (${macroRatios.cCal} kcal)`"
          />
          <div
            class="bg-rose-500 transition-all duration-300"
            :style="{ width: `${macroRatios.fatPct}%` }"
            :title="`Fat: ${macroRatios.fatPct}% (${macroRatios.fCal} kcal)`"
          />
        </div>

        <!-- Progress bar legend -->
        <div class="mt-3 flex items-center justify-around text-xs font-bold text-slate-700 dark:text-slate-300">
          <div class="flex items-center gap-1.5">
            <span class="h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
            <span>Protein {{ macroRatios.proteinPct }}%</span>
            <span class="text-[10px] font-normal text-slate-400">({{ macroRatios.pCal }} kcal)</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="h-2.5 w-2.5 rounded-full bg-amber-400 shrink-0" />
            <span>Carbs {{ macroRatios.carbPct }}%</span>
            <span class="text-[10px] font-normal text-slate-400">({{ macroRatios.cCal }} kcal)</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="h-2.5 w-2.5 rounded-full bg-rose-500 shrink-0" />
            <span>Fat {{ macroRatios.fatPct }}%</span>
            <span class="text-[10px] font-normal text-slate-400">({{ macroRatios.fCal }} kcal)</span>
          </div>
        </div>
      </div>

      <!-- Dynamic Macros breakdown cards -->
      <div class="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-6 text-center">
        <div class="rounded-xl bg-slate-50 dark:bg-slate-800/80 p-3 border border-slate-100 dark:border-slate-800">
          <p class="text-xs font-medium text-slate-500 dark:text-slate-400">Protein</p>
          <p class="mt-1 text-xl font-extrabold text-slate-900 dark:text-slate-100">{{ currentProtein }}g</p>
        </div>
        <div class="rounded-xl bg-slate-50 dark:bg-slate-800/80 p-3 border border-slate-100 dark:border-slate-800">
          <p class="text-xs font-medium text-slate-500 dark:text-slate-400">Carbs</p>
          <p class="mt-1 text-xl font-extrabold text-slate-900 dark:text-slate-100">{{ currentCarbs }}g</p>
        </div>
        <div class="rounded-xl bg-slate-50 dark:bg-slate-800/80 p-3 border border-slate-100 dark:border-slate-800">
          <p class="text-xs font-medium text-slate-500 dark:text-slate-400">Fat</p>
          <p class="mt-1 text-xl font-extrabold text-slate-900 dark:text-slate-100">{{ currentFat }}g</p>
        </div>
        <div class="rounded-xl bg-slate-50 dark:bg-slate-800/80 p-3 border border-slate-100 dark:border-slate-800">
          <p class="text-xs font-medium text-slate-500 dark:text-slate-400">Fiber</p>
          <p class="mt-1 text-xl font-extrabold text-slate-900 dark:text-slate-100">{{ currentFiber }}g</p>
        </div>
        <div class="rounded-xl bg-slate-50 dark:bg-slate-800/80 p-3 border border-slate-100 dark:border-slate-800">
          <p class="text-xs font-medium text-slate-500 dark:text-slate-400">Sugar</p>
          <p class="mt-1 text-xl font-extrabold text-slate-900 dark:text-slate-100">{{ currentSugar }}g</p>
        </div>
        <div class="rounded-xl bg-slate-50 dark:bg-slate-800/80 p-3 border border-slate-100 dark:border-slate-800">
          <p class="text-xs font-medium text-slate-500 dark:text-slate-400">Sodium</p>
          <p class="mt-1 text-xl font-extrabold text-slate-900 dark:text-slate-100">{{ currentSodium }}mg</p>
        </div>
      </div>

      <!-- Highlights tags -->
      <div v-if="food.tags.length" class="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
        <span class="text-xs font-medium text-slate-400 dark:text-slate-500">Highlights:</span>
        <NuxtLink
          v-for="tag in food.tags"
          :key="tag"
          :to="`/foods/tag/${tag}`"
          class="rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-3 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 capitalize hover:scale-105 transition-transform"
        >
          {{ tag.replace("-", " ") }}
        </NuxtLink>
      </div>
    </div>

    <AdSlot />

    <!-- Portion table -->
    <section class="mt-10">
      <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">Calories by Common Serving Portions</h2>
      <div class="mt-4 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-left text-slate-600 dark:text-slate-300">
              <th class="px-4 py-3 font-semibold">Portion</th>
              <th class="px-4 py-3 font-semibold">Calories</th>
              <th class="px-4 py-3 font-semibold">Protein</th>
              <th class="px-4 py-3 font-semibold">Carbs</th>
              <th class="px-4 py-3 font-semibold">Fat</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="opt in portionOptions"
              :key="opt.grams"
              class="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
            >
              <td class="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">{{ opt.label }}</td>
              <td class="px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">{{ Math.round((food.calories / food.servingSizeG) * opt.grams) }} kcal</td>
              <td class="px-4 py-3 text-slate-600 dark:text-slate-300">{{ (Math.round((food.protein_g / food.servingSizeG) * opt.grams * 10) / 10) }}g</td>
              <td class="px-4 py-3 text-slate-600 dark:text-slate-300">{{ (Math.round((food.carbs_g / food.servingSizeG) * opt.grams * 10) / 10) }}g</td>
              <td class="px-4 py-3 text-slate-600 dark:text-slate-300">{{ (Math.round((food.fat_g / food.servingSizeG) * opt.grams * 10) / 10) }}g</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Related Foods -->
    <section v-if="related.length" class="mt-12">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">More in {{ food.category }}</h2>
        <NuxtLink
          :to="`/categories/${categorySlug(food.category)}`"
          class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
        >
          View all {{ food.category }} →
        </NuxtLink>
      </div>
      <div class="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        <NuxtLink
          v-for="r in related"
          :key="r.slug"
          :to="`/foods/${r.slug}`"
          class="card-interactive flex items-center gap-3 p-3.5"
        >
          <div
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-2xl"
            :class="getCategoryMeta(r.category).cardBgClass"
          >
            {{ r.icon }}
          </div>
          <div class="min-w-0">
            <p class="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">{{ r.name }}</p>
            <p class="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              {{ r.calories }} <span class="font-normal text-slate-400 dark:text-slate-500">kcal/100g</span>
            </p>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Related Guides -->
    <RelatedGuides />
  </div>
</template>
