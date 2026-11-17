<script setup lang="ts">
import { Zap, ChevronRight } from "@lucide/vue";

useSeoMeta({
  title: "Protein Intake for Muscle Gain: How Much Do You Really Need?",
  description:
    "Evidence-based guide on daily protein requirements for hypertrophy, optimal timing, and top protein food sources for lean muscle growth.",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Protein Intake for Muscle Gain: How Much Do You Really Need?",
  description: "Optimal daily protein recommendations for muscle hypertrophy and strength training.",
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
      <span class="text-slate-900 font-semibold">Protein for Muscle Gain</span>
    </nav>

    <div class="card p-6 sm:p-8">
      <div class="mb-3 inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
        💪 Hypertrophy &amp; Nutrition
      </div>

      <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Protein Intake for Muscle Growth: How Much Do You Need?
      </h1>
      <p class="mt-2 text-sm text-slate-400">Published by CalorieFacts • 5 min read</p>

      <div class="mt-6 space-y-5 text-sm leading-relaxed text-slate-700">
        <p>
          Protein is the primary macronutrient responsible for repairing microscopic muscle damage induced by resistance training and stimulating muscle protein synthesis (MPS). But how much protein is optimal for maximum muscle growth?
        </p>

        <h2 class="text-xl font-bold text-slate-900 pt-3">Optimal Protein Range for Athletes</h2>
        <p>
          Multiple sports nutrition meta-analyses demonstrate that consuming <strong>1.6 to 2.2 grams of protein per kilogram of body weight</strong> (0.7 to 1.0 grams per pound) per day maximizes muscle hypertrophy in weightlifters.
        </p>

        <div class="my-6 rounded-xl border border-purple-200 bg-purple-50/70 p-5">
          <h3 class="font-bold text-purple-900 text-base flex items-center gap-2">
            <Zap :size="16" />
            Calculate Your Protein Target
          </h3>
          <p class="mt-1 text-xs text-purple-800">
            Use our interactive Macro Calculator to compute your daily protein, carbohydrate, and fat gram targets.
          </p>
          <div class="mt-3 flex flex-wrap gap-2">
            <NuxtLink to="/calculators/macro-calculator" class="btn-primary text-xs py-2 px-3 bg-purple-600 hover:bg-purple-700">
              Macro Calculator →
            </NuxtLink>
            <NuxtLink to="/calculators/tdee" class="btn-secondary text-xs py-2 px-3">
              TDEE Calculator →
            </NuxtLink>
          </div>
        </div>

        <h2 class="text-xl font-bold text-slate-900 pt-3">Top High-Protein Food Sources</h2>
        <p>
          Hitting high protein targets is easiest when incorporating complete, high-quality whole foods:
        </p>

        <ul class="list-disc pl-5 space-y-2">
          <li><NuxtLink to="/foods/chicken-breast" class="text-emerald-600 underline">Chicken Breast</NuxtLink> — 31g protein per 100g serving</li>
          <li><NuxtLink to="/foods/greek-yogurt" class="text-emerald-600 underline">Greek Yogurt</NuxtLink> — 10g–16g protein per serving</li>
          <li><NuxtLink to="/foods/egg" class="text-emerald-600 underline">Boiled Eggs</NuxtLink> — 13g protein per 100g portion</li>
          <li><NuxtLink to="/foods/whey-protein-powder" class="text-emerald-600 underline">Whey Protein Powder</NuxtLink> — 24g protein per scoop</li>
        </ul>
      </div>
    </div>
  </article>
</template>
