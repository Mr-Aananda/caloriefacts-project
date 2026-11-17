<script setup lang="ts">
import { Scale, ChevronRight, Zap } from "@lucide/vue";

useSeoMeta({
  title: "Ideal Body Weight Formulas Explained: Devine, Miller & Healthy BMI",
  description:
    "Explore the history and medical formulas used to calculate ideal body weight (Devine, Miller, Robinson, Hamwi) and healthy BMI weight ranges.",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Ideal Body Weight Formulas Explained: Devine, Miller & Healthy BMI",
  description: "A comprehensive guide to medical ideal body weight equations.",
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
      <span class="text-slate-900 font-semibold">Ideal Body Weight Formulas</span>
    </nav>

    <div class="card p-6 sm:p-8">
      <div class="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
        <Scale :size="14" />
        Clinical Formulas
      </div>

      <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Ideal Body Weight Formulas Explained: Devine, Miller &amp; Healthy BMI
      </h1>
      <p class="mt-2 text-sm text-slate-400">Published by CalorieFacts • 5 min read</p>

      <div class="mt-6 space-y-5 text-sm leading-relaxed text-slate-700">
        <p>
          Determining an "ideal" body weight has been a clinical focus since the 1970s. Medical scientists developed specific mathematical equations based on height and biological sex to standardize medication dosages and assess clinical targets.
        </p>

        <h2 class="text-xl font-bold text-slate-900 pt-3">The Most Popular IBW Formulas</h2>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Devine Formula (1974):</strong> Originally created to calculate drug dosages (e.g. theophylline). It assumes a baseline weight for 5 feet of height + additional weight per inch.</li>
          <li><strong>Miller Formula (1983):</strong> Modifies Devine's baseline to offer slightly lower weight targets for shorter statures.</li>
          <li><strong>Healthy BMI Range (18.5 – 24.9):</strong> Provides a flexible weight range based on WHO population health standards.</li>
        </ul>

        <p>
          Pairing structured ideal weight ranges with whole food nutrition like <NuxtLink to="/foods/oats" class="text-emerald-600 underline">Oats</NuxtLink> and <NuxtLink to="/foods/almonds" class="text-emerald-600 underline">Almonds</NuxtLink> supports long-term body composition management.
        </p>

        <div class="my-6 rounded-xl border border-emerald-200 bg-emerald-50/70 p-5">
          <h3 class="font-bold text-emerald-900 text-base flex items-center gap-2">
            <Zap :size="16" />
            Calculate Your Ideal Weight Range
          </h3>
          <p class="mt-1 text-xs text-emerald-800">
            Compare Devine, Miller, and Healthy BMI target ranges using our free Ideal Weight and BMI Calculators.
          </p>
          <div class="mt-3 flex flex-wrap gap-2">
            <NuxtLink to="/calculators/ideal-weight-calculator" class="btn-primary text-xs py-2 px-3">
              Ideal Weight Calculator →
            </NuxtLink>
            <NuxtLink to="/calculators/bmi" class="btn-secondary text-xs py-2 px-3">
              BMI Calculator →
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
