<script setup lang="ts">
import { Scale, ChevronRight, Zap } from "@lucide/vue";

useSeoMeta({
  title: "BMI vs Body Fat Percentage: Which Health Metric Matters More?",
  description:
    "Compare Body Mass Index (BMI) and body fat percentage. Learn the strengths and limitations of both health metrics for fitness and weight management.",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "BMI vs Body Fat Percentage: Which Health Metric Matters More?",
  description: "An evidence-based comparison of BMI vs Body Fat percentage for assessing health and body composition.",
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
      <span class="text-slate-900 font-semibold">BMI vs Body Fat</span>
    </nav>

    <div class="card p-6 sm:p-8">
      <div class="mb-3 inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
        <Scale :size="14" />
        Body Composition
      </div>

      <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        BMI vs. Body Fat Percentage: Which Metric Matters More?
      </h1>
      <p class="mt-2 text-sm text-slate-400">Published by CalorieFacts • 5 min read</p>

      <div class="mt-6 space-y-5 text-sm leading-relaxed text-slate-700">
        <p>
          When tracking health progress, two metrics dominate the conversation: <strong>Body Mass Index (BMI)</strong> and <strong>Body Fat Percentage</strong>. While both provide valuable insight into physical health, they measure distinctly different aspects of human body composition.
        </p>

        <h2 class="text-xl font-bold text-slate-900 pt-3">Understanding Body Mass Index (BMI)</h2>
        <p>
          BMI is a simple mathematical ratio that calculates your body weight relative to your height squared. Developed in the 19th century, it is used worldwide by healthcare organizations as a rapid screening tool to categorize population risk for obesity-related conditions.
        </p>

        <p>
          <strong>Pros of BMI:</strong> Fast, non-invasive, requires only a scale and tape measure, and correlates strongly with health risks across large general populations.
        </p>
        <p>
          <strong>Limitations of BMI:</strong> BMI does not distinguish between muscle mass and fat tissue. An athlete with high muscularity (such as someone eating <NuxtLink to="/foods/chicken-breast" class="text-emerald-600 underline">Chicken Breast</NuxtLink> and heavy strength training) may be classified as "overweight" by BMI standards despite having very low body fat.
        </p>

        <h2 class="text-xl font-bold text-slate-900 pt-3">Understanding Body Fat Percentage</h2>
        <p>
          Body fat percentage measures the exact portion of your weight composed of adipose tissue relative to your total weight (which includes muscle, bones, organs, and water). High body fat—particularly visceral fat around abdominal organs—is directly linked to metabolic health risks.
        </p>

        <!-- CTA Box linking to calculators -->
        <div class="my-6 rounded-xl border border-teal-200 bg-teal-50/70 p-5">
          <h3 class="font-bold text-teal-900 text-base flex items-center gap-2">
            <Zap :size="16" />
            Check Both Health Metrics Free
          </h3>
          <p class="mt-1 text-xs text-teal-800">
            Compare your standard BMI rating against your official U.S. Navy estimated body fat percentage using our free tools.
          </p>
          <div class="mt-3 flex flex-wrap gap-2">
            <NuxtLink to="/calculators/bmi" class="btn-primary text-xs py-2 px-3">
              BMI Calculator →
            </NuxtLink>
            <NuxtLink to="/calculators/body-fat-calculator" class="btn-secondary text-xs py-2 px-3">
              Body Fat Calculator →
            </NuxtLink>
          </div>
        </div>

        <h2 class="text-xl font-bold text-slate-900 pt-3">Which Metric Should You Focus On?</h2>
        <p>
          For general health screening, BMI is an excellent initial reference point. However, if your fitness program involves strength training or building lean body mass with nutrient-dense foods like <NuxtLink to="/foods/avocado" class="text-emerald-600 underline">Avocado</NuxtLink>, body fat percentage is a far more accurate gauge of your true body composition and athletic progress.
        </p>
      </div>
    </div>
  </article>
</template>
