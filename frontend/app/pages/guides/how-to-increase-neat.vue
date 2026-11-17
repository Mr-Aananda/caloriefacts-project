<script setup lang="ts">
import { Activity, ChevronRight, Zap } from "@lucide/vue";

useSeoMeta({
  title: "How to Increase NEAT: Burn Extra Calories Without Exercise",
  description:
    "Learn how Non-Exercise Activity Thermogenesis (NEAT) accounts for hundreds of daily calories and how to increase non-exercise movement.",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Increase NEAT: Burn Extra Calories Without Exercise",
  description: "A guide to understanding non-exercise activity thermogenesis and increasing daily caloric burn.",
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
      <span class="text-slate-900 font-semibold">Increasing NEAT</span>
    </nav>

    <div class="card p-6 sm:p-8">
      <div class="mb-3 inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
        <Activity :size="14" />
        Metabolic Movement
      </div>

      <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        How to Increase NEAT: Burn Extra Calories Without Exercise
      </h1>
      <p class="mt-2 text-sm text-slate-400">Published by CalorieFacts • 5 min read</p>

      <div class="mt-6 space-y-5 text-sm leading-relaxed text-slate-700">
        <p>
          While intentional gym workouts burn 200 to 500 calories, your <strong>Non-Exercise Activity Thermogenesis (NEAT)</strong> can burn up to 800+ calories per day through simple daily movement.
        </p>

        <h2 class="text-xl font-bold text-slate-900 pt-3">Simple Ways to Boost NEAT Daily</h2>
        <ul class="list-disc pl-5 space-y-2">
          <li>Take 10-minute walking breaks after meals. Fuel quick energy with a <NuxtLink to="/foods/banana" class="text-emerald-600 underline">Banana</NuxtLink> or morning <NuxtLink to="/foods/black-coffee" class="text-emerald-600 underline">Black Coffee</NuxtLink>.</li>
          <li>Use a standing desk for 2–3 hours per day.</li>
          <li>Take the stairs instead of elevators whenever possible.</li>
        </ul>

        <div class="my-6 rounded-xl border border-blue-200 bg-blue-50/70 p-5">
          <h3 class="font-bold text-blue-900 text-base flex items-center gap-2">
            <Zap :size="16" />
            Calculate Your Total Energy Output
          </h3>
          <p class="mt-1 text-xs text-blue-800">
            See how your activity multiplier impacts your total energy burn using our TDEE and Calorie Calculators.
          </p>
          <div class="mt-3 flex flex-wrap gap-2">
            <NuxtLink to="/calculators/tdee" class="btn-primary text-xs py-2 px-3">
              TDEE Calculator →
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
