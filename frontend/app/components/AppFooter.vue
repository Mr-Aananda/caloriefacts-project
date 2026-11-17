<script setup lang="ts">
import { Flame, Mail, Globe, Rss, Heart, ArrowRight } from "@lucide/vue";

const email = ref("");
const subscribed = ref(false);
const year = new Date().getFullYear();

function subscribe() {
  if (!email.value.trim()) return;
  subscribed.value = true;
  email.value = "";
}

const cols = [
  {
    heading: "Calculators",
    links: [
      { to: "/calculators/calorie-calculator", label: "Calorie Calculator" },
      { to: "/calculators/tdee", label: "TDEE Calculator" },
      { to: "/calculators/bmi", label: "BMI Calculator" },
      { to: "/calculators/macro-calculator", label: "Macro Calculator" },
    ],
  },
  {
    heading: "Food Database",
    links: [
      { to: "/foods", label: "Browse All Foods" },
      { to: "/compare", label: "Food Comparisons" },
      { to: "/categories/fruits", label: "Fruits" },
      { to: "/categories/meat-poultry", label: "Meat & Poultry" },
    ],
  },
  {
    heading: "Company",
    links: [
      { to: "/about", label: "About Us" },
      { to: "/contact", label: "Contact" },
      { to: "/guides", label: "Guides" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { to: "/privacy-policy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms of Use" },
    ],
  },
];
</script>

<template>
  <footer class="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
    <div class="mx-auto max-w-6xl px-4 py-12">
      <!-- Top grid: brand + link columns -->
      <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
        <!-- Brand column -->
        <div class="lg:col-span-1">
          <NuxtLink to="/" class="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="Calereno Logo"
              class="h-8 w-8 rounded-xl object-contain shadow-sm"
            />
            <span class="text-lg font-extrabold tracking-tight">
              <span class="text-emerald-600 dark:text-emerald-500">Cale</span><span class="text-slate-900 dark:text-slate-100">reno</span>
            </span>
          </NuxtLink>
          <p class="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            Free, professional-grade nutrition tools. No signup needed.
          </p>
          <!-- Social placeholders -->
          <div class="mt-4 flex items-center gap-2">
            <a
              href="#"
              aria-label="Website"
              class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 dark:text-slate-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200"
            >
              <Globe :size="16" />
            </a>
            <a
              href="#"
              aria-label="Feed"
              class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 dark:text-slate-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200"
            >
              <Rss :size="16" />
            </a>
            <a
              href="#"
              aria-label="Newsletter"
              class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 dark:text-slate-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200"
            >
              <Heart :size="16" />
            </a>
          </div>
        </div>

        <!-- Link columns -->
        <div
          v-for="col in cols"
          :key="col.heading"
          class="lg:col-span-1"
        >
          <h3 class="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {{ col.heading }}
          </h3>
          <ul class="mt-3 space-y-2.5">
            <li v-for="link in col.links" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="text-sm text-slate-600 dark:text-slate-300 transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Newsletter section -->
      <div class="mt-10 rounded-xl border border-slate-100 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950/60">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Stay up to date
            </h3>
            <p class="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
              Get nutrition tips and feature updates in your inbox.
            </p>
          </div>
          <Transition name="fade" mode="out-in">
            <p
              v-if="subscribed"
              key="thanks"
              class="shrink-0 text-sm font-semibold text-emerald-600 dark:text-emerald-400"
            >
              ✓ You're subscribed!
            </p>
            <form
              v-else
              key="form"
              class="flex gap-2 sm:w-80"
              @submit.prevent="subscribe"
            >
              <div class="relative flex-1">
                <Mail
                  :size="15"
                  class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
                />
                <input
                  v-model="email"
                  type="email"
                  placeholder="your@email.com"
                  class="form-input pl-9"
                  aria-label="Email address"
                />
              </div>
              <button type="submit" aria-label="Subscribe to newsletter" class="btn-primary shrink-0 px-3.5">
                <ArrowRight :size="16" />
              </button>
            </form>
          </Transition>
        </div>
      </div>

      <!-- Bottom bar -->
      <div
        class="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800 pt-6 text-xs text-slate-400 dark:text-slate-500"
      >
        <p>© {{ year }} Calereno. All rights reserved.</p>
        <p>
          Nutrition figures are estimates for informational purposes — not
          medical advice.
        </p>
      </div>
    </div>
  </footer>
</template>
