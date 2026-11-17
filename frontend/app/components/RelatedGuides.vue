<script setup lang="ts">
import { BookOpen, ArrowRight } from "@lucide/vue";

const props = defineProps<{
  guides?: { slug: string; title: string; desc: string }[];
}>();

const defaultGuides = [
  {
    slug: "how-to-calculate-tdee",
    title: "How to Calculate Your TDEE",
    desc: "Understand BMR and activity multipliers for maintenance calories.",
  },
  {
    slug: "calorie-deficit-explained",
    title: "Calorie Deficit Explained",
    desc: "The science of energy balance and sustainable weight loss.",
  },
  {
    slug: "understanding-macros",
    title: "Understanding Macros 101",
    desc: "Learn how to balance daily protein, carbs, and fat targets.",
  },
];

const list = computed(() => props.guides || defaultGuides);
</script>

<template>
  <section class="mt-12 border-t border-slate-100 dark:border-slate-800 pt-10">
    <div class="mb-6 flex items-center justify-between">
      <div class="flex items-center gap-2 text-slate-900 dark:text-slate-100">
        <BookOpen :size="20" class="text-emerald-600 dark:text-emerald-400" />
        <h2 class="text-xl font-bold">Related Educational Guides</h2>
      </div>
      <NuxtLink
        to="/guides"
        class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
      >
        View all guides →
      </NuxtLink>
    </div>

    <div class="grid gap-4 sm:grid-cols-3">
      <NuxtLink
        v-for="g in list"
        :key="g.slug"
        :to="`/guides/${g.slug}`"
        class="card-interactive group flex flex-col p-4"
      >
        <h3 class="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {{ g.title }}
        </h3>
        <p class="mt-1 flex-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{{ g.desc }}</p>
        <div class="mt-3 flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          Read guide
          <ArrowRight :size="12" class="ml-1 transition-transform group-hover:translate-x-1" />
        </div>
      </NuxtLink>
    </div>
  </section>
</template>
