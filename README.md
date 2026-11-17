# CalorieFacts — Nuxt + Laravel Nutrition & Calculator Site

A production-ready starter for a low-maintenance, AdSense-friendly niche site:
free health calculators (BMI, TDEE, Calorie Calculator) + a seeded food calorie
database (91 foods, more can be added anytime).

```
project/
├── frontend/   ← Nuxt 4 site (this is what you deploy first)
└── backend/    ← Optional Laravel API (add later, not required to launch)
```

---

## 1. What's already built

**Pages (18 total, all SEO-optimized, all pass a local production build):**
- `/` — Home
- `/calculators`, `/calculators/bmi`, `/calculators/tdee`, `/calculators/calorie-calculator`
- `/foods` — searchable database index
- `/foods/[slug]` — 91 individual food pages (e.g. `/foods/banana`) with
  Nutrition schema.org markup, macro breakdown, and per-portion tables
- `/categories/[category]` — 10 category pages (Fruits, Vegetables, Meat &
  Poultry, Seafood, Dairy & Eggs, Grains & Bread, Legumes & Nuts, Fast Food,
  Beverages, Snacks)
- `/about`, `/contact`, `/privacy-policy`, `/terms` — required for AdSense review

**Technical:**
- Nuxt 4 + Tailwind CSS, fully SSR (good for SEO and Core Web Vitals)
- Auto-generated `/sitemap.xml` (111 URLs) via `@nuxtjs/sitemap`
- `robots.txt` and `ads.txt` placeholders
- JSON-LD structured data (NutritionInformation, FAQPage) on key pages
- `AdSlot.vue` component: shows a placeholder box until you add your AdSense
  client ID, then automatically serves real ads — no code change needed later
- Laravel backend skeleton (model, migration, seeder, API controller) that
  seeds from the exact same data, ready to plug in later for an admin panel

---

## 2. Run it locally

```bash
cd frontend
npm install
npm run dev
# open http://localhost:3000
```

Production build check (already verified to pass):
```bash
npm run build
node .output/server/index.mjs
```

---

## 3. Before you deploy — required edits

1. **Domain**: create `frontend/.env` from `.env.example`, set
   `NUXT_PUBLIC_SITE_URL=https://yourdomain.com`
2. **robots.txt**: update the `Sitemap:` line in `frontend/public/robots.txt`
   with your real domain
3. **Contact email**: update `frontend/app/pages/contact.vue`
4. **Privacy Policy / Terms**: fill in the `[DATE]` placeholders in
   `privacy-policy.vue` and `terms.vue`. These are templates — have a lawyer
   review them if you'll have EU/UK or California visitors (GDPR/CCPA).
5. **Branding**: replace "CalorieFacts" in `AppHeader.vue`, `nuxt.config.ts`
   (`siteName`), and page titles if you want a different name/domain.

---

## 4. Deployment roadmap (step by step)

**Step 1 — Buy a domain** (Namecheap, Porkbun, etc.) — pick something
brandable and keyword-relevant, e.g. containing "calorie" or "calc".

**Step 2 — Deploy the frontend.** Easiest options for a Nuxt site:
- **Vercel** or **Netlify**: connect your Git repo, framework preset "Nuxt",
  it builds automatically. Free tier is enough to start.
- Or your own VPS: `npm run build` then run `.output/server/index.mjs` behind
  Nginx + PM2.

**Step 3 — Point your domain** to the host (DNS records as instructed by
Vercel/Netlify/your VPS provider).

**Step 4 — Verify indexing basics**
- Visit `https://yourdomain.com/sitemap.xml` — confirm it loads
- Submit the sitemap in **Google Search Console** (Search Console → Sitemaps)
- Check `https://yourdomain.com/robots.txt` is correct

**Step 5 — Wait for indexing + get some organic pageviews.** Google generally
wants to see a real, navigable site with original content and some traffic
history before AdSense approval — a few weeks of existing, indexed content
helps.

**Step 6 — Apply for Google AdSense** (adsense.google.com):
- Add your site, verify ownership (usually an HTML tag or file — add it to
  `frontend/public/` or `app.vue`'s `<head>` when they give it to you)
- AdSense checklist your site should already satisfy:
  - ✅ Privacy Policy page
  - ✅ About / Contact pages
  - ✅ Original, useful content (calculators + 91 food pages)
  - ✅ Mobile-friendly, fast-loading (SSR + Tailwind, minimal JS)
  - ✅ Clear navigation
  - ⚠️ You should still have **some real traffic and a few weeks of history**
    — approval is much less likely for a same-day-launched, zero-traffic site

**Step 7 — After approval**, set `NUXT_PUBLIC_ADSENSE_CLIENT_ID` in your
hosting provider's environment variables to your real `ca-pub-XXXXXXXXXXXX`
ID, and put your real `ads.txt` line (given by AdSense) into
`frontend/public/ads.txt`. Redeploy — ads now show automatically wherever
`<AdSlot />` is placed.

---

## 5. Growing the site after launch (low-maintenance content plan)

You said you want something that's mostly "seed once" — here's how to keep
that true while still growing:

- **Add more foods**: append entries to `scripts/build-foods.mjs`'s `raw`
  array, then run `node scripts/build-foods.mjs` to regenerate
  `app/data/foods.json`. No code changes needed elsewhere — new food and
  category pages appear automatically, and so do their sitemap entries.
- **Add more calculators** (good next candidates: Macro Calculator, Body Fat
  % Calculator, Water Intake Calculator, Ideal Weight Calculator) — each is
  its own low-competition, evergreen keyword with no data-maintenance burden.
- **Long-tail keyword strategy**: instead of competing for "calories"
  (dominated by MyFitnessPal, Nutritionix), target specific long-tail
  queries — "[specific food] calories per 100g", "[fast food item] calories",
  "TDEE calculator [activity type]" — which is exactly what the current page
  structure is built for.

---

## 6. Optional: the Laravel backend

Not required to launch or get AdSense-approved. See `backend/README.md` when
you're ready to add an admin panel or move past a few hundred food entries.
