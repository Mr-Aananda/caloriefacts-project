<script setup lang="ts">
import { ChevronRight, Zap } from "@lucide/vue";

useSeoMeta({
  title: "Reading Nutrition Labels 101: Serving Sizes, Calories & Macros",
  description:
    "Learn how to accurately read food nutrition facts labels, evaluate serving sizes, detect hidden sugars, and calculate macronutrients.",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Reading Nutrition Labels 101: Serving Sizes, Calories & Macros",
  description: "A beginner's guide to deciphering nutrition facts labels and serving sizes.",
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
      <span class="text-slate-900 font-semibold">Nutrition Labels 101</span>
    </nav>

    <div class="card p-6 sm:p-8">
      <div class="mb-3 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
        🏷️ Label Reading &amp; Awareness
      </div>

      <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Reading Nutrition Labels 101: Serving Sizes &amp; Macros
      </h1>
      <p class="mt-2 text-sm text-slate-400">Published by CalorieFacts • 5 min read</p>

      <div class="mt-6 space-y-5 text-sm leading-relaxed text-slate-700">
        <p>
          Understanding food labels is essential for accurately tracking daily calorie and macronutrient intake. Misreading serving sizes or ignoring added sugars can easily throw off your nutrition targets.
        </p>

        <h2 class="text-xl font-bold text-slate-900 pt-3">Key Elements of a Nutrition Label</h2>
        <ul class="list-disc pl-5 space-y-2">
          <li>
            <strong>Serving Size &amp; Servings Per Container:</strong> All listed values (calories, protein, carbs, fat) correspond to ONE serving size—not necessarily the entire package! For example, a bag of <NuxtLink to="/foods/oreo-cookies" class="text-emerald-600 underline">Oreo Cookies</NuxtLink> lists nutrition for 3 cookies (34g), not the whole box.
          </li>
          <li>
            <strong>Calories:</strong> Indicates total energy yielded per single serving.
          </li>
          <li>
            <strong>Total Carbohydrates &amp; Added Sugars:</strong> Distinguishes between complex carbs, dietary fiber, and added refined sugars found in items like <NuxtLink to="/foods/cheerios" class="text-emerald-600 underline">Cheerios</NuxtLink>.
          </li>
        </ul>

        <div class="my-6 rounded-xl border border-emerald-200 bg-emerald-50/70 p-5">
          <h3 class="font-bold text-emerald-900 text-base flex items-center gap-2">
            <Zap :size="16" />
            Track Calories &amp; Macros Accurately
          </h3>
          <p class="mt-1 text-xs text-emerald-800">
            Compare packaged food labels against your individual calorie and macronutrient targets using our calculators.
          </p>
          <div class="mt-3 flex flex-wrap gap-2">
            <NuxtLink to="/calculators/calorie-calculator" class="btn-primary text-xs py-2 px-3">
              Calorie Calculator →
            </NuxtLink>
            <NuxtLink to="/calculators/macro-calculator" class="btn-secondary text-xs py-2 px-3">
              Macro Calculator →
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
