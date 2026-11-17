<script setup lang="ts">
import { ChevronRight } from "@lucide/vue";

const route = useRoute();
const { all, categories, categorySlug, getCategoryMeta } = useFoods();

const categoryName = categories.find(
  (c) => categorySlug(c) === (route.params.category as string)
);

if (!categoryName) {
  throw createError({ statusCode: 404, statusMessage: "Category not found" });
}

const catMeta = computed(() => getCategoryMeta(categoryName!));
const foods = computed(() => all.filter((f) => f.category === categoryName));

// Static per-category descriptions for fast SSR and SEO keyword density
const categoryDescriptions: Record<string, string> = {
  Fruits:
    "Explore complete nutrition facts and calorie breakdowns for fresh, frozen, and dried fruits per 100g serving. Fruits are natural sources of essential vitamins, dietary fiber, antioxidants, and quick energy. Use this database to compare sugar content, calories, and macronutrients across popular fruits for your diet goals.",
  Vegetables:
    "Discover detailed calorie, fiber, and micronutrient profiles for raw, cooked, and fresh vegetables per 100g. Low in calories yet packed with dietary fiber, vitamins, and minerals, vegetables are fundamental for healthy weight management. Search and compare nutrient values to build nutrient-dense meal plans.",
  "Meat & Poultry":
    "Compare protein, fat, and calorie counts for lean meats, poultry cuts, and prepared meats per 100g serving. High-protein foods like chicken breast, steak, turkey, and pork are crucial for muscle repair, satiety, and body recomposition. Find accurate nutritional data to balance your daily macro targets.",
  Seafood:
    "Find detailed calorie, protein, and healthy omega-3 fatty acid profiles for fresh fish and shellfish per 100g. Seafood provides high-quality protein and essential healthy fats beneficial for cardiovascular and metabolic health. Browse nutrition figures for salmon, tuna, shrimp, cod, and tilapia.",
  "Dairy & Eggs":
    "Browse complete nutrition breakdowns for eggs, milk, Greek yogurt, cheeses, and butter per 100g portion. Dairy and egg products deliver essential dietary protein, calcium, healthy fats, and key vitamins. Compare caloric density and macro ratios to easily fit dairy items into your meal plan.",
  "Grains & Bread":
    "View calorie counts, carbohydrates, dietary fiber, and protein values for whole grains, breads, rice, oats, and pasta per 100g. Grains serve as primary energy sources for physical activity and daily metabolism. Evaluate nutritional differences between refined and whole grain options for optimal fueling.",
  "Legumes & Nuts":
    "Analyze nutrition facts for beans, lentils, peanuts, tree nuts, seeds, and plant-based protein alternatives like tofu per 100g. Legumes and nuts offer rich plant-based protein, healthy fats, complex carbs, and high dietary fiber. Discover macro splits to support vegetarian, vegan, or balanced diets.",
  "Fast Food":
    "Check accurate calories, macros, and sodium levels for popular restaurant and fast food items per serving. Fast food meals can vary significantly in caloric density, fats, and sodium content. Use these nutritional profiles to make informed choices or fit takeout into your daily calorie budget.",
  Beverages:
    "Compare calories, sugar, and hydration metrics across soft drinks, juices, coffees, teas, energy drinks, and protein shakes. Liquid calories can accumulate rapidly without providing satiety. Review drink nutrition facts to manage sugar intake and optimize your daily energy balance.",
  Snacks:
    "Explore nutritional profiles for chips, chocolates, ice cream, energy bars, and popular packaged snacks. Snack foods provide quick energy but vary widely in caloric density, sugars, and fats. Access serving size data to track portion control while enjoying your favorite treats.",
  "Supplements & Fitness":
    "Examine nutrition details for whey protein powders, protein bars, amino acids, and workout supplements per serving. Workout supplements help meet specific daily protein goals and support athletic recovery. Compare protein content, calories, and macros to choose the right supplement for your fitness regimen.",
  "Bakery & Breakfast":
    "View nutritional data for breakfast pastries, donuts, croissants, waffles, pancakes, and breakfast bagels. Bakery items often combine carbohydrates and fats for rich flavor and high calorie density. Access clear macro breakdowns to manage energy intake during morning meals.",
};

const introText = computed(
  () =>
    categoryDescriptions[categoryName!] ||
    `Browse complete calorie counts, protein, carbs, fat, fiber, and nutritional values for ${categoryName}.`
);

const siteUrl = "https://caloriefacts.org";

useSeoMeta({
  title: `${categoryName} Calories & Nutrition Database`,
  description: `${categoryName} calories, protein, carbs, fat, and fiber per 100g serving. ${introText.value.slice(0, 140)}...`,
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
      name: categoryName,
      item: `${siteUrl}/categories/${catMeta.value.slug}`,
    },
  ],
};

useHead({
  script: [{ type: "application/ld+json", innerHTML: JSON.stringify(breadcrumbJsonLd) }],
});
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 py-10">
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
      <span class="text-slate-900 dark:text-slate-100 font-semibold">{{ categoryName }}</span>
    </nav>

    <!-- Category Header Hero -->
    <div class="card mb-8 p-6 sm:p-8">
      <div class="flex items-start gap-4">
        <div
          class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-4xl shadow-xs"
          :class="catMeta.cardBgClass"
        >
          {{ catMeta.icon }}
        </div>
        <div class="flex-1">
          <span
            class="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold mb-1"
            :class="catMeta.badgeClass"
          >
            Category
          </span>
          <h1 class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
            {{ categoryName }} Calories &amp; Nutrition Facts
          </h1>
          <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {{ introText }}
          </p>
        </div>
      </div>
    </div>

    <!-- Foods Grid -->
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
            :class="catMeta.cardBgClass"
          >
            {{ food.icon }}
          </div>
          <span class="text-xs font-semibold text-slate-400 dark:text-slate-500">
            100g
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
