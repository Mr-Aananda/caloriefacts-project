<script setup lang="ts">
import { Flame, ChevronRight, Zap } from "@lucide/vue";

useSeoMeta({
  title: "Calorie Deficit Explained: The Science of Fat Loss",
  description:
    "Learn how a calorie deficit drives sustainable weight loss, how to calculate your daily deficit target, and how to avoid metabolic adaptation.",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Calorie Deficit Explained: The Science of Fat Loss",
  description:
    "An evidence-based guide explaining energy balance, weight loss mechanics, and how to maintain a healthy caloric deficit.",
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
      <span class="text-slate-900 font-semibold">Calorie Deficit Explained</span>
    </nav>

    <div class="card p-6 sm:p-8">
      <div class="mb-3 inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
        <Flame :size="14" />
        Weight Loss Science
      </div>

      <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Calorie Deficit Explained: The Science of Weight Loss
      </h1>
      <p class="mt-2 text-sm text-slate-400">Published by CalorieFacts • 5 min read</p>

      <div class="mt-6 space-y-5 text-sm leading-relaxed text-slate-700">
        <p>
          Regardless of the diet protocol you choose—whether it is low-carb, keto, intermittent fasting, or plant-based—the underlying physiological driver of body fat loss is always a <strong>calorie deficit</strong>. Understanding the science of energy balance allows you to achieve weight loss predictably without sacrificing health or muscle mass.
        </p>

        <h2 class="text-xl font-bold text-slate-900 pt-3">What Is a Calorie Deficit?</h2>
        <p>
          A calorie deficit occurs when you consume fewer calories through food and drink than your body expends to sustain biological life and daily movement (your Total Daily Energy Expenditure, or TDEE). 
        </p>

        <p>
          When an energy deficit is present, your body cannot meet its metabolic energy demands from food intake alone. To make up the shortfall, it mobilizes energy stored in endogenous tissue—primarily adipose body fat stores.
        </p>

        <h2 class="text-xl font-bold text-slate-900 pt-3">The 3,500 Calorie Rule &amp; Safe Weight Loss Rates</h2>
        <p>
          Historically, one pound of human adipose tissue is estimated to contain approximately 3,500 kilocalories of energy. Based on this standard benchmark:
        </p>

        <ul class="list-disc pl-5 space-y-2">
          <li>
            <strong>500 Calorie Daily Deficit:</strong> Results in roughly 3,500 kcal deficit per week, producing approximately <strong>0.5 kg (1 lb)</strong> of fat loss per week.
          </li>
          <li>
            <strong>250 Calorie Daily Deficit:</strong> Results in roughly 1,750 kcal deficit per week, producing approximately <strong>0.25 kg (0.5 lb)</strong> of weight loss per week.
          </li>
        </ul>

        <p>
          Medical experts generally recommend a gradual, sustainable weight loss rate of <strong>0.5% to 1.0% of total body weight per week</strong>. Overly aggressive deficits can trigger excessive muscle loss, nutrient deficiencies, severe fatigue, and hormonal disruptions.
        </p>

        <!-- CTA Box -->
        <div class="my-6 rounded-xl border border-orange-200 bg-orange-50/70 p-5">
          <h3 class="font-bold text-orange-900 text-base flex items-center gap-2">
            <Zap :size="16" />
            Find Your Calorie Deficit Target
          </h3>
          <p class="mt-1 text-xs text-orange-800">
            Use our interactive Calorie Calculator to automatically compute your daily target for weight loss based on your age, weight, and activity.
          </p>
          <NuxtLink
            to="/calculators/calorie-calculator"
            class="btn-primary mt-3 text-xs py-2 px-4 inline-flex bg-orange-600 hover:bg-orange-700"
          >
            Calculate Deficit Calories →
          </NuxtLink>
        </div>

        <h2 class="text-xl font-bold text-slate-900 pt-3">Tips for Maintaining a Calorie Deficit Effortlessly</h2>
        <p>
          Sustaining an energy deficit requires strategies that manage hunger and satiety effectively:
        </p>

        <ol class="list-decimal pl-5 space-y-2">
          <li>
            <strong>Prioritize Dietary Protein:</strong> High protein intake (1.6g to 2.2g per kg of body weight) elevates satiety hormones and protects lean muscle tissue during fat loss.
          </li>
          <li>
            <strong>Eat High-Volume, Low-Calorie Foods:</strong> Fill your plate with non-starchy vegetables, berries, and whole foods that offer volume without excessive calories.
          </li>
          <li>
            <strong>Track Liquid Calories:</strong> Sugary sodas, fancy coffee drinks, and fruit juices add calories rapidly without providing feeling of fullness.
          </li>
          <li>
            <strong>Maintain Physical Movement (NEAT):</strong> Don't reduce daily walking or general movement when eating fewer calories.
          </li>
        </ol>
      </div>
    </div>
  </article>
</template>
