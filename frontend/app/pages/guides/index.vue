<script setup lang="ts">
import { BookOpen, ArrowRight, Activity, Flame, PieChart, Scale, Tag, Zap } from "@lucide/vue";

useSeoMeta({
  title: "Nutrition & Calorie Guides — CalorieFacts",
  description:
    "Free, evidence-based nutrition and fitness guides. Learn how to calculate TDEE, manage a calorie deficit, balance macronutrients, and analyze body fat percentage.",
});

const articles = [
  {
    slug: "how-to-calculate-tdee",
    title: "How to Calculate Your TDEE (Total Daily Energy Expenditure)",
    desc: "A complete guide to understanding BMR, activity multipliers, and finding your exact maintenance calories.",
    icon: Activity,
    iconColor: "text-blue-500 dark:text-blue-400",
    iconBg: "bg-blue-50 border-blue-100 dark:bg-blue-950/40 dark:border-blue-900/50",
    readTime: "4 min read",
  },
  {
    slug: "calorie-deficit-explained",
    title: "Calorie Deficit Explained: The Science of Weight Loss",
    desc: "Learn how energy balance works, how to set a safe deficit, and avoid common metabolic slowdown traps.",
    icon: Flame,
    iconColor: "text-orange-500 dark:text-orange-400",
    iconBg: "bg-orange-50 border-orange-100 dark:bg-orange-950/40 dark:border-orange-900/50",
    readTime: "5 min read",
  },
  {
    slug: "understanding-macros",
    title: "Understanding Macros: A Beginner's Guide to Protein, Carbs & Fat",
    desc: "Master macronutrient tracking. Learn how much protein, carbohydrates, and healthy fats you need for your goals.",
    icon: PieChart,
    iconColor: "text-purple-500 dark:text-purple-400",
    iconBg: "bg-purple-50 border-purple-100 dark:bg-purple-950/40 dark:border-purple-900/50",
    readTime: "5 min read",
  },
  {
    slug: "bmi-vs-body-fat",
    title: "BMI vs. Body Fat Percentage: Which Metric Matters More?",
    desc: "Compare BMI ratings against body fat percentage. Learn the strengths and limitations of both health metrics.",
    icon: Scale,
    iconColor: "text-teal-500 dark:text-teal-400",
    iconBg: "bg-teal-50 border-teal-100 dark:bg-teal-950/40 dark:border-teal-900/50",
    readTime: "5 min read",
  },
  {
    slug: "how-many-calories-in-a-pound-of-fat",
    title: "How Many Calories Are in a Pound of Fat?",
    desc: "Discover the science behind 3,500 calories in a pound of body fat and how to set daily deficit targets.",
    icon: Flame,
    iconColor: "text-rose-500 dark:text-rose-400",
    iconBg: "bg-rose-50 border-rose-100 dark:bg-rose-950/40 dark:border-rose-900/50",
    readTime: "5 min read",
  },
  {
    slug: "protein-intake-for-muscle-gain",
    title: "Protein Intake for Muscle Growth: How Much Do You Need?",
    desc: "Evidence-based protein guidelines for hypertrophy, optimal timing, and high-protein food sources.",
    icon: Zap,
    iconColor: "text-amber-500 dark:text-amber-400",
    iconBg: "bg-amber-50 border-amber-100 dark:bg-amber-950/40 dark:border-amber-900/50",
    readTime: "5 min read",
  },
  {
    slug: "reading-nutrition-labels-101",
    title: "Reading Nutrition Labels 101: Serving Sizes & Macros",
    desc: "Learn how to read food nutrition facts labels, evaluate serving sizes, and detect added sugars.",
    icon: Tag,
    iconColor: "text-emerald-500 dark:text-emerald-400",
    iconBg: "bg-emerald-50 border-emerald-100 dark:bg-emerald-950/40 dark:border-emerald-900/50",
    readTime: "5 min read",
  },
  {
    slug: "macros-for-weight-loss-explained",
    title: "Optimal Macro Ratios for Weight Loss Explained",
    desc: "Discover how to structure protein, carbs, and fat percentages for efficient fat loss.",
    icon: PieChart,
    iconColor: "text-indigo-500 dark:text-indigo-400",
    iconBg: "bg-indigo-50 border-indigo-100 dark:bg-indigo-950/40 dark:border-indigo-900/50",
    readTime: "5 min read",
  },
  {
    slug: "healthy-snacks-for-calorie-deficit",
    title: "Best High-Volume Low-Calorie Snacks for a Calorie Deficit",
    desc: "High-volume, low-calorie density snacks that satisfy hunger while keeping you in a deficit.",
    icon: Flame,
    iconColor: "text-emerald-500 dark:text-emerald-400",
    iconBg: "bg-emerald-50 border-emerald-100 dark:bg-emerald-950/40 dark:border-emerald-900/50",
    readTime: "5 min read",
  },
  {
    slug: "how-to-increase-neat",
    title: "How to Increase NEAT: Burn Extra Calories Without Exercise",
    desc: "Learn how Non-Exercise Activity Thermogenesis (NEAT) accounts for hundreds of daily calories.",
    icon: Activity,
    iconColor: "text-cyan-500 dark:text-cyan-400",
    iconBg: "bg-cyan-50 border-cyan-100 dark:bg-cyan-950/40 dark:border-cyan-900/50",
    readTime: "5 min read",
  },
  {
    slug: "ideal-body-weight-formulas-explained",
    title: "Ideal Body Weight Formulas Explained: Devine, Miller & Healthy BMI",
    desc: "Explore clinical equations used to calculate ideal body weight ranges for men and women.",
    icon: Scale,
    iconColor: "text-emerald-500 dark:text-emerald-400",
    iconBg: "bg-emerald-50 border-emerald-100 dark:bg-emerald-950/40 dark:border-emerald-900/50",
    readTime: "5 min read",
  },
];
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 py-10">
    <div class="mb-10 text-center sm:text-left">
      <div class="mb-2 flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 sm:justify-start">
        <BookOpen :size="20" :stroke-width="1.75" />
        <span class="text-sm font-semibold uppercase tracking-wide">
          Educational Guides
        </span>
      </div>
      <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
        Nutrition &amp; Fitness Guides
      </h1>
      <p class="mt-2 text-slate-600 dark:text-slate-400">
        Evidence-based articles to help you calculate energy needs, optimize macro splits, and achieve sustainable weight goals.
      </p>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="a in articles"
        :key="a.slug"
        :to="`/guides/${a.slug}`"
        class="card-interactive group flex flex-col p-6"
      >
        <div
          :class="[
            a.iconBg,
            'mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border',
          ]"
        >
          <component
            :is="a.icon"
            :class="[a.iconColor, 'h-6 w-6']"
            :stroke-width="1.75"
          />
        </div>
        <span class="text-xs font-semibold text-slate-400 dark:text-slate-500 mb-1">{{ a.readTime }}</span>
        <h2 class="font-bold text-slate-900 dark:text-slate-100 transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400 leading-snug">
          {{ a.title }}
        </h2>
        <p class="mt-2 flex-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{{ a.desc }}</p>
        <div class="mt-4 flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          Read article
          <ArrowRight :size="12" class="ml-1 transition-transform group-hover:translate-x-1" />
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
