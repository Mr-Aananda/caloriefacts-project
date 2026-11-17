<script setup lang="ts">
const config = useRuntimeConfig();

const antiFlashScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark');document.body&&document.body.classList.add('dark');document.documentElement.style.colorScheme='dark';}else{document.documentElement.classList.remove('dark');document.body&&document.body.classList.remove('dark');document.documentElement.style.colorScheme='light';}}catch(e){}})()`;

// Load Google AdSense script & theme anti-flash script site-wide
useHead({
  script: [
    {
      innerHTML: antiFlashScript,
      type: "text/javascript",
    },
    ...(config.public.adsenseClientId
      ? [
          {
            src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.public.adsenseClientId}`,
            async: true,
            crossorigin: "anonymous",
          },
        ]
      : []),
  ],
});

// Site-wide Open Graph and Twitter Card defaults (overridable per-page)
useSeoMeta({
  titleTemplate: (title) => (title ? `${title} | Calereno` : "Calereno"),
  ogSiteName: "Calereno",
  ogType: "website",
  ogImage: "/og-image.svg",
  twitterCard: "summary_large_image",
  twitterImage: "/og-image.svg",
});
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <NuxtRouteAnnouncer />
    <AppHeader />
    <main class="flex-1">
      <NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />
    </main>
    <AppFooter />
  </div>
</template>
