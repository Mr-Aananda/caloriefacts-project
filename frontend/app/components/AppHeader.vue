<script setup lang="ts">
import { Flame, Calculator, Apple, Scale, BookOpen, Info, Menu, X, Zap, Sun, Moon } from "@lucide/vue";

const { isDark, toggleTheme, initTheme } = useTheme();

const mounted = ref(false);
const open = ref(false);
const scrolled = ref(false);
const route = useRoute();

function onScroll() {
  scrolled.value = window.scrollY > 10;
}

onMounted(() => {
  mounted.value = true;
  initTheme();
  window.addEventListener("scroll", onScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});

watch(
  () => route.path,
  () => {
    open.value = false;
  }
);

const links = [
  { to: "/foods", label: "Food Database", icon: Apple },
  { to: "/compare", label: "Compare Foods", icon: Scale },
  { to: "/calculators", label: "Calculators", icon: Calculator },
  { to: "/guides", label: "Guides", icon: BookOpen },
  { to: "/about", label: "About", icon: Info },
];

function active(path: string) {
  return route.path === path || route.path.startsWith(path + "/");
}
</script>

<template>
  <header
    class="sticky top-0 z-50 transition-all duration-200"
    :class="
      scrolled
        ? 'bg-white dark:bg-[#07172b] shadow-md dark:shadow-[#020a14]/80 border-b border-slate-200 dark:border-slate-800/80'
        : 'bg-slate-50 dark:bg-[#030F1D] border-b border-slate-200/60 dark:border-slate-800/60'
    "
  >
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
      <!-- Logo -->
      <NuxtLink to="/" class="group flex items-center gap-2.5">
        <img
          src="/logo.png"
          alt="Calereno Logo"
          class="h-9 w-9 rounded-xl object-contain shadow-sm transition-all group-hover:scale-105"
        />
        <span class="text-lg font-extrabold tracking-tight leading-none">
          <span class="text-emerald-600 dark:text-emerald-500">Cale</span><span class="text-slate-900 dark:text-slate-100">reno</span>
        </span>
      </NuxtLink>

      <!-- Desktop nav -->
      <nav class="hidden items-center gap-0.5 md:flex">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
          :class="
            active(link.to)
              ? 'bg-emerald-50 text-emerald-700 font-bold dark:bg-emerald-950/60 dark:text-emerald-400'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
          "
        >
          <component :is="link.icon" :size="15" :stroke-width="2" />
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-2">
        <!-- Theme Toggle Button -->
        <button
          type="button"
          class="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          :aria-label="mounted && isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click.stop="toggleTheme()"
        >
          <Sun v-if="mounted && isDark" :size="17" :stroke-width="1.75" class="text-amber-300/90" />
          <Moon v-else :size="17" :stroke-width="1.75" class="text-slate-600" />
        </button>

        <!-- Desktop CTA -->
        <NuxtLink
          to="/calculators/calorie-calculator"
          class="hidden items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-700 hover:shadow-md md:inline-flex"
        >
          <Zap :size="14" :stroke-width="2.5" />
          Get Started
        </NuxtLink>

        <!-- Mobile hamburger -->
        <button
          class="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors md:hidden"
          :aria-label="open ? 'Close navigation menu' : 'Open navigation menu'"
          @click="open = !open"
        >
          <Transition name="icon" mode="out-in">
            <X v-if="open" :key="'c'" :size="20" />
            <Menu v-else :key="'o'" :size="20" />
          </Transition>
        </button>
      </div>
    </div>

    <!-- Click-outside capture (invisible full-page layer) -->
    <div
      v-if="open"
      class="fixed inset-x-0 bottom-0 top-16 z-40 md:hidden"
      @click="open = false"
    />

    <!-- Mobile slide-down menu panel -->
    <Transition name="slide-down">
      <div
        v-if="open"
        class="absolute inset-x-0 top-full z-50 border-t border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-xl md:hidden"
      >
        <nav class="mx-auto max-w-6xl space-y-0.5 px-4 py-3">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors"
            :class="
              active(link.to)
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                : 'text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800'
            "
            @click="open = false"
          >
            <component :is="link.icon" :size="18" class="opacity-80" />
            {{ link.label }}
          </NuxtLink>
        </nav>
        <div class="border-t border-slate-100 dark:border-slate-800 px-4 pb-4 pt-3 space-y-2">
          <!-- Mobile menu theme toggle button -->
          <button
            type="button"
            class="flex w-full items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 cursor-pointer"
            @click.stop="toggleTheme()"
          >
            <span class="flex items-center gap-2">
              <Sun v-if="mounted && isDark" :size="18" class="text-amber-400" />
              <Moon v-else :size="18" class="text-slate-700 dark:text-slate-200" />
              <span>Appearance</span>
            </span>
            <span class="text-xs font-semibold px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">
              {{ mounted && isDark ? 'Dark Mode' : 'Light Mode' }}
            </span>
          </button>

          <NuxtLink
            to="/calculators/calorie-calculator"
            class="btn-primary w-full justify-center"
            @click="open = false"
          >
            <Zap :size="16" />
            Get Started Free
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </header>
</template>
