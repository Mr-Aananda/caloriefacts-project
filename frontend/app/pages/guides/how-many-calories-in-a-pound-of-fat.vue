<script setup lang="ts">
import { Flame, ChevronRight, Zap } from "@lucide/vue";

useSeoMeta({
  title: "How Many Calories in a Pound of Fat? The 3,500 Calorie Rule",
  description:
    "Discover the science behind 3,500 calories in a pound of fat, how fast you can safely burn body fat, and how to set daily calorie deficit targets.",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How Many Calories in a Pound of Fat? The 3,500 Calorie Rule",
  description: "An in-depth explanation of energy stored in human fat tissue and calculating safe weight loss deficits.",
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
      <span class="text-slate-900 font-semibold">Calories in a Pound of Fat</span>
    </nav>

    <div class="card p-6 sm:p-8">
      <div class="mb-3 inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
        <Flame :size="14" />
        Energy Balance Science
      </div>

      <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        How Many Calories Are in a Pound of Fat?
      </h1>
      <p class="mt-2 text-sm text-slate-400">Published by CalorieFacts • 5 min read</p>

      <div class="mt-6 space-y-5 text-sm leading-relaxed text-slate-700">
        <p>
          In nutritional science, the standard rule of thumb states that <strong>one pound of body fat contains approximately 3,500 calories</strong>. Understanding this figure helps put caloric deficits into practical daily context.
        </p>

        <h2 class="text-xl font-bold text-slate-900 pt-3">Why Is a Pound of Fat Worth 3,500 Calories?</h2>
        <p>
          Pure dietary fat yields 9 calories per gram. Since 1 pound equals 454 grams, pure fat would technically equal 4,086 calories. However, human adipose (fat) tissue is not 100% pure fat—it contains roughly 87% lipid droplets alongside water, blood vessels, and connective proteins. This yields approximately 3,500 usable kilocalories per pound of adipose tissue.
        </p>

        <h2 class="text-xl font-bold text-slate-900 pt-3">Calculating Your Daily Calorie Deficit</h2>
        <p>
          Using the 3,500 calorie benchmark, you can plan weekly fat loss targets by dividing by 7 days:
        </p>

        <ul class="list-disc pl-5 space-y-2">
          <li><strong>1 lb Fat Loss / Week:</strong> Requires a 500 calorie daily deficit below maintenance.</li>
          <li><strong>0.5 lb Fat Loss / Week:</strong> Requires a 250 calorie daily deficit below maintenance.</li>
          <li><strong>2 lbs Fat Loss / Week:</strong> Requires a 1,000 calorie daily deficit below maintenance.</li>
        </ul>

        <div class="my-6 rounded-xl border border-orange-200 bg-orange-50/70 p-5">
          <h3 class="font-bold text-orange-900 text-base flex items-center gap-2">
            <Zap :size="16" />
            Calculate Your Deficit Calories
          </h3>
          <p class="mt-1 text-xs text-orange-800">
            Find out your exact daily calorie deficit target using our free TDEE and Calorie Calculators.
          </p>
          <div class="mt-3 flex flex-wrap gap-2">
            <NuxtLink to="/calculators/calorie-calculator" class="btn-primary text-xs py-2 px-3 bg-orange-600 hover:bg-orange-700">
              Calorie Calculator →
            </NuxtLink>
            <NuxtLink to="/calculators/tdee" class="btn-secondary text-xs py-2 px-3">
              TDEE Calculator →
            </NuxtLink>
          </div>
        </div>

        <p>
          While high calorie-dense items like <NuxtLink to="/foods/bacon" class="text-emerald-600 underline">Bacon</NuxtLink> add calories rapidly, nutrient-rich foods like <NuxtLink to="/foods/salmon" class="text-emerald-600 underline">Grilled Salmon</NuxtLink> provide essential proteins and healthy fats that support metabolic health during weight loss.
        </p>
      </div>
    </div>
  </article>
</template>
