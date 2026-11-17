<script setup lang="ts">
import { PieChart, ChevronRight, Zap } from "@lucide/vue";

useSeoMeta({
  title: "Understanding Macros: A Beginner's Guide to Protein, Carbs & Fat",
  description:
    "Learn how macronutrients function in the body, how to calculate your ideal macro ratio, and how to track protein, carbohydrates, and fats.",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Understanding Macros: A Beginner's Guide to Protein, Carbs & Fat",
  description:
    "An introductory guide to macronutrient splits, caloric densities, and optimizing protein, carbohydrate, and fat intake for nutrition goals.",
  author: {
    "@type": "Organization",
    name: "CalorieFacts",
  },
};

useHead({
  script: [{ type: "application/ld+json", innerHTML: JSON.stringify(jsonLd) }],
});
</script>

<template>
  <article class="mx-auto max-w-3xl px-4 py-10">
    <!-- Breadcrumbs -->
    <nav class="mb-6 flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-500">
      <NuxtLink to="/" class="hover:text-emerald-600">Home</NuxtLink>
      <ChevronRight :size="12" />
      <NuxtLink to="/guides" class="hover:text-emerald-600">Guides</NuxtLink>
      <ChevronRight :size="12" />
      <span class="text-slate-900 font-semibold">Understanding Macros</span>
    </nav>

    <div class="card p-6 sm:p-8">
      <div class="mb-3 inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
        <PieChart :size="14" />
        Macronutrient Tracking
      </div>

      <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Understanding Macros: A Beginner's Guide to Protein, Carbs &amp; Fat
      </h1>
      <p class="mt-2 text-sm text-slate-400">Published by CalorieFacts • 5 min read</p>

      <div class="mt-6 space-y-5 text-sm leading-relaxed text-slate-700">
        <p>
          While counting calories determines whether you lose, maintain, or gain weight, tracking <strong>macronutrients ("macros")</strong> determines the quality of your body composition changes—specifically whether you lose fat or muscle, and how energetic you feel throughout the day.
        </p>

        <h2 class="text-xl font-bold text-slate-900 pt-3">The Three Main Macronutrients</h2>
        <p>
          Macronutrients are nutrients that the human body requires in large daily amounts to yield energy and maintain bodily structures:
        </p>

        <div class="space-y-4">
          <div class="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <h3 class="font-bold text-purple-700 text-base">1. Protein (4 Calories per Gram)</h3>
            <p class="mt-1 text-xs text-slate-600">
              Protein supplies amino acids—the building blocks for skeletal muscle tissue, enzymes, immune cells, and hormones. Adequate protein intake is vital during a calorie deficit to prevent muscle wasting and maintain metabolic rate.
            </p>
          </div>

          <div class="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <h3 class="font-bold text-blue-700 text-base">2. Carbohydrates (4 Calories per Gram)</h3>
            <p class="mt-1 text-xs text-slate-600">
              Carbohydrates are converted into glucose, serving as your brain and central nervous system's preferred energy source, as well as glycogen stores for intense physical workouts.
            </p>
          </div>

          <div class="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <h3 class="font-bold text-amber-700 text-base">3. Fats (9 Calories per Gram)</h3>
            <p class="mt-1 text-xs text-slate-600">
              Dietary fats are essential for hormone synthesis (including testosterone and estrogen), cell membrane integrity, and fat-soluble vitamin absorption (Vitamins A, D, E, K).
            </p>
          </div>
        </div>

        <h2 class="text-xl font-bold text-slate-900 pt-3">How to Determine Your Macro Split</h2>
        <p>
          A standard balanced macro split for general health and fitness is <strong>30% Protein, 40% Carbohydrates, and 30% Fat</strong>. However, macro ratios can be adjusted depending on specific goals:
        </p>

        <ul class="list-disc pl-5 space-y-2">
          <li>
            <strong>Fat Loss &amp; Retention:</strong> 40% Protein / 30% Carbs / 30% Fat (higher protein increases satiety and preserves muscle).
          </li>
          <li>
            <strong>Endurance Performance:</strong> 25% Protein / 50% Carbs / 25% Fat (higher carbs replenish muscle glycogen for prolonged workouts).
          </li>
          <li>
            <strong>Keto / Low Carb:</strong> 35% Protein / 15% Carbs / 50% Fat.
          </li>
        </ul>

        <!-- CTA Box -->
        <div class="my-6 rounded-xl border border-purple-200 bg-purple-50/70 p-5">
          <h3 class="font-bold text-purple-900 text-base flex items-center gap-2">
            <Zap :size="16" />
            Calculate Your Custom Macro Grams
          </h3>
          <p class="mt-1 text-xs text-purple-800">
            Use our interactive Macro Calculator to compute exact target grams of protein, carbs, and fat tailored to your body weight and goals.
          </p>
          <NuxtLink
            to="/calculators/macro-calculator"
            class="btn-primary mt-3 text-xs py-2 px-4 inline-flex bg-purple-600 hover:bg-purple-700"
          >
            Open Macro Calculator →
          </NuxtLink>
        </div>

        <h2 class="text-xl font-bold text-slate-900 pt-3">How to Calculate Macro Grams From Calories</h2>
        <p>
          To convert your daily calorie target into macro grams, follow these simple formulas:
        </p>

        <div class="rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs text-slate-800">
          <p>Protein Grams = (Total Calories × % Protein) ÷ 4</p>
          <p class="mt-1">Carb Grams = (Total Calories × % Carbs) ÷ 4</p>
          <p class="mt-1">Fat Grams = (Total Calories × % Fat) ÷ 9</p>
        </div>
      </div>
    </div>
  </article>
</template>
