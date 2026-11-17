// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2026-07-23",
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/sitemap",
    "@nuxt/icon",
    "@vueuse/nuxt",
  ],

  css: ["~/assets/css/main.css"],

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon.png" },
        { rel: "icon", type: "image/svg+xml", href: "/icon.svg" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://calereno.com",
      siteName: "Calereno",
      adsenseClientId: process.env.NUXT_PUBLIC_ADSENSE_CLIENT_ID || "",
    },
  },

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || "https://calereno.com",
    name: "Calereno",
  },

  sitemap: {
    sources: ["/api/__sitemap__/urls"],
  },

  typescript: { strict: true },
});
