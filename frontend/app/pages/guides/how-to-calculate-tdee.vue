<script setup lang="ts">
import { Activity, ChevronRight, Zap } from "@lucide/vue";

useSeoMeta({
  title: "How to Calculate Your TDEE (Total Daily Energy Expenditure)",
  description:
    "Learn what Total Daily Energy Expenditure (TDEE) is, how BMR and activity multipliers work, and how to accurately estimate your daily maintenance calories.",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Calculate Your TDEE (Total Daily Energy Expenditure)",
  description:
    "A guide to understanding BMR, physical activity levels, and calculating daily energy expenditure for weight management.",
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
    <nav class="mb-6 flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
      <NuxtLink to="/" class="hover:text-emerald-600 dark:hover:text-emerald-400">Home</NuxtLink>
      <ChevronRight :size="12" />
      <NuxtLink to="/guides" class="hover:text-emerald-600 dark:hover:text-emerald-400">Guides</NuxtLink>
      <ChevronRight :size="12" />
      <span class="text-slate-900 dark:text-slate-100 font-semibold">Calculating TDEE</span>
    </nav>

    <div class="card p-6 sm:p-8">
      <div class="mb-3 inline-flex items-center gap-1.5 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300">
        <Activity :size="14" />
        Energy Balance &amp; Metabolism
      </div>

      <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
        How to Calculate Your TDEE (Total Daily Energy Expenditure)
      </h1>
      <p class="mt-2 text-sm text-slate-400 dark:text-slate-500">Published by CalorieFacts • 5 min read</p>

      <div class="mt-6 space-y-5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        <p>
          Understanding your <strong>Total Daily Energy Expenditure (TDEE)</strong> is the foundational step for any successful weight loss, maintenance, or muscle building program. TDEE represents the estimated total number of calories your body burns in a full 24-hour period, taking into account both internal physiological functions and external physical movement.
        </p>

        <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100 pt-3">The Four Components of TDEE</h2>
        <p>
          Your total energy expenditure consists of four main energy components:
        </p>

        <ul class="list-disc pl-5 space-y-2">
          <li>
            <strong>Basal Metabolic Rate (BMR):</strong> The baseline energy required to keep vital organs functioning at complete rest (lungs, heart, brain, cellular repair). BMR accounts for roughly 60% to 70% of total daily calories.
          </li>
          <li>
            <strong>Thermic Effect of Food (TEF):</strong> The energy used to digest, absorb, and metabolize the nutrients in your food. Protein has the highest thermic effect (20–30%), while carbs (5–10%) and fats (0–3%) require less digestion energy.
          </li>
          <li>
            <strong>Non-Exercise Activity Thermogenesis (NEAT):</strong> Energy expended for daily subconscious movement like walking around the house, standing, fidgeting, and cleaning.
          </li>
          <li>
            <strong>Exercise Energy Expenditure (EEE):</strong> Calories burned during intentional physical exercise, such as weightlifting, running, cycling, or playing sports.
          </li>
        </ul>

        <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100 pt-3">How TDEE is Calculated Mathematically</h2>
        <p>
          Most accurate mathematical models calculate TDEE in two steps. First, your <strong>Basal Metabolic Rate (BMR)</strong> is calculated using the scientifically validated <em>Mifflin-St Jeor equation</em>:
        </p>

        <div class="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4 font-mono text-xs text-slate-800 dark:text-slate-200">
          <p><strong>Men:</strong> BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in yrs) + 5</p>
          <p class="mt-1"><strong>Women:</strong> BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in yrs) - 161</p>
        </div>

        <p>
          Second, your calculated BMR is multiplied by an <strong>Activity Factor multiplier</strong> matching your weekly movement routine:
        </p>

        <ul class="list-disc pl-5 space-y-1">
          <li><strong>Sedentary (1.2):</strong> Little to no exercise, desk job</li>
          <li><strong>Light Activity (1.375):</strong> Light exercise 1–3 days/week</li>
          <li><strong>Moderate Activity (1.55):</strong> Moderate exercise 3–5 days/week</li>
          <li><strong>Very Active (1.725):</strong> Hard exercise 6–7 days/week</li>
          <li><strong>Extremely Active (1.9):</strong> Physical job + daily intense training</li>
        </ul>

        <!-- Callout box linking to calculator -->
        <div class="my-6 rounded-xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/70 dark:bg-blue-950/40 p-5">
          <h3 class="font-bold text-blue-900 dark:text-blue-200 text-base flex items-center gap-2">
            <Zap :size="16" />
            Calculate Your TDEE Instantly
          </h3>
          <p class="mt-1 text-xs text-blue-800 dark:text-blue-300">
            Skip the manual math! Use our free online TDEE calculator to estimate your daily calorie burn in under 10 seconds.
          </p>
          <NuxtLink
            to="/calculators/tdee"
            class="btn-primary mt-3 text-xs py-2 px-4 inline-flex"
          >
            Open TDEE Calculator →
          </NuxtLink>
        </div>

        <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100 pt-3">How to Use Your TDEE Figure</h2>
        <p>
          Once you know your TDEE maintenance calories, you can adjust your calorie intake depending on your target body composition:
        </p>

        <ul class="list-disc pl-5 space-y-1">
          <li><strong>To Maintain Weight:</strong> Consume calories equal to your TDEE.</li>
          <li><strong>To Lose Fat:</strong> Create a moderate deficit of 300 to 500 calories below TDEE.</li>
          <li><strong>To Gain Muscle:</strong> Eat a slight surplus of 250 to 500 calories above TDEE.</li>
        </ul>

        <p>
          Remember that TDEE is an estimate. Monitor your average weight trend over 2 to 3 weeks and make minor 100-calorie adjustments based on real-world weight changes.
        </p>
      </div>
    </div>
  </article>
</template>
