<script setup lang="ts">
import { PieChart, ChevronRight, Zap } from "@lucide/vue";

useSeoMeta({
  title: "Optimal Macro Ratios for Weight Loss Explained",
  description:
    "Discover how to structure protein, carbohydrates, and fat percentages for efficient fat loss while preserving lean body mass.",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Optimal Macro Ratios for Weight Loss Explained",
  description: "A practical guide to choosing the best macronutrient split for fat loss.",
  author: { "@type": "Organization", name: "CalorieFacts" },
};

useHead({ script: [{ type: "application/ld+json", innerHTML: JSON.stringify(jsonLd) }] });
</script>

<template>
  <article class="mx-auto max-w-3xl px-4 py-10">
    <nav class="mb-6 flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-500">
      <NuxtLink to="/" class="hover:text-emerald-600">Home</NuxtLink>
      <ChevronRight :size="12" />
      <NuxtLink to="/guides" class="hover:text-emerald-600">Guides</NuxtLink>
      <ChevronRight :size="12" />
      <span class="text-slate-900 font-semibold">Macros for Weight Loss</span>
    </nav>

    <div class="card p-6 sm:p-8">
      <div class="mb-3 inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
        <PieChart :size="14" />
        Fat Loss Macros
      </div>

      <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Optimal Macro Ratios for Weight Loss Explained
      </h1>
      <p class="mt-2 text-sm text-slate-400">Published by CalorieFacts • 5 min read</p>

      <div class="mt-6 space-y-5 text-sm leading-relaxed text-slate-700">
        <p>
          While creating a caloric deficit dictates weight loss, adjusting your <strong>macronutrient ratio (protein, carbs, and fat)</strong> determines whether that weight comes from body fat or muscle tissue.
        </p>

        <h2 class="text-xl font-bold text-slate-900 pt-3">Why High Protein is Crucial During Fat Loss</h2>
        <p>
          A high protein split (35% to 40% of total daily calories) is the most effective approach for fat loss. High protein keeps you full longer, has a high thermic effect, and prevents muscle breakdown. High-protein foods like <NuxtLink to="/foods/chicken-breast" class="text-emerald-600 underline">Chicken Breast</NuxtLink> and fiber-dense legumes like <NuxtLink to="/foods/black-beans" class="text-emerald-600 underline">Black Beans</NuxtLink> form ideal staples.
        </p>

        <div class="my-6 rounded-xl border border-purple-200 bg-purple-50/70 p-5">
          <h3 class="font-bold text-purple-900 text-base flex items-center gap-2">
            <Zap :size="16" />
            Calculate Your Weight Loss Macros
          </h3>
          <p class="mt-1 text-xs text-purple-800">
            Use our free Macro and Calorie Calculators to find your ideal daily gram targets.
          </p>
          <div class="mt-3 flex flex-wrap gap-2">
            <NuxtLink to="/calculators/macro-calculator" class="btn-primary text-xs py-2 px-3 bg-purple-600 hover:bg-purple-700">
              Macro Calculator →
            </NuxtLink>
            <NuxtLink to="/calculators/calorie-calculator" class="btn-secondary text-xs py-2 px-3">
              Calorie Calculator →
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
