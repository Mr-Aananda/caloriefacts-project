<script setup lang="ts">
import { Flame, Home, Calculator, Apple, BookOpen, Search, ArrowLeft } from "@lucide/vue";

const props = defineProps({
  error: Object,
});

const is404 = computed(() => props.error?.statusCode === 404);

function handleError() {
  clearError({ redirect: "/" });
}

useSeoMeta({
  title: is404.value ? "Page Not Found — Calereno" : "An Error Occurred — Calereno",
  description: "Sorry, the page you are looking for does not exist or has been moved.",
});
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
    <!-- Header -->
    <header class="border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 py-4 px-4">
      <div class="mx-auto max-w-6xl flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2.5">
          <img src="/logo.png" alt="Calereno Logo" class="h-8 w-8 rounded-xl object-contain shadow-sm" />
          <span class="text-base font-extrabold tracking-tight">
            <span class="text-emerald-600 dark:text-emerald-500">Cale</span><span class="text-slate-900 dark:text-slate-100">reno</span>
          </span>
        </NuxtLink>
        <button
          type="button"
          class="btn-secondary text-xs py-1.5 px-3"
          @click="handleError"
        >
          <Home :size="14" />
          Back to Home
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="mx-auto max-w-2xl px-4 py-16 text-center my-auto">
      <div class="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-400 mb-6 text-4xl shadow-sm">
        🔍
      </div>

      <h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl">
        {{ is404 ? "Page Not Found (404)" : "Something Went Wrong" }}
      </h1>
      
      <p class="mt-3 text-base text-slate-600 dark:text-slate-400 max-w-md mx-auto">
        {{
          is404
            ? "Sorry, we couldn't find the page or food item you were looking for. It might have been moved or updated."
            : "An unexpected error occurred. Please try returning to the home page or exploring our popular tools below."
        }}
      </p>

      <!-- Useful quick action links -->
      <div class="mt-8 grid gap-3 sm:grid-cols-3 max-w-lg mx-auto">
        <NuxtLink
          to="/"
          class="card-interactive p-4 flex flex-col items-center justify-center text-center"
          @click="clearError()"
        >
          <Home :size="20" class="text-emerald-600 dark:text-emerald-400 mb-1" />
          <span class="font-bold text-xs">Home Page</span>
        </NuxtLink>

        <NuxtLink
          to="/calculators"
          class="card-interactive p-4 flex flex-col items-center justify-center text-center"
          @click="clearError()"
        >
          <Calculator :size="20" class="text-blue-500 dark:text-blue-400 mb-1" />
          <span class="font-bold text-xs">Calculators</span>
        </NuxtLink>

        <NuxtLink
          to="/foods"
          class="card-interactive p-4 flex flex-col items-center justify-center text-center"
          @click="clearError()"
        >
          <Apple :size="20" class="text-rose-500 dark:text-rose-400 mb-1" />
          <span class="font-bold text-xs">Food Database</span>
        </NuxtLink>
      </div>

      <div class="mt-8">
        <button
          type="button"
          class="btn-primary"
          @click="handleError"
        >
          <ArrowLeft :size="16" />
          Return to Homepage
        </button>
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-slate-100 dark:border-slate-800 py-6 text-center text-xs text-slate-400 dark:text-slate-500">
      &copy; {{ new Date().getFullYear() }} Calereno. All rights reserved.
    </footer>
  </div>
</template>
