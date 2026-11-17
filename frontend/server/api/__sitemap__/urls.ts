import foods from "../../../app/data/foods.json";
import { comparisonPairs } from "../../../app/data/comparisons";

export default defineEventHandler(() => {
  const foodUrls = (foods as { slug: string }[]).map((f) => ({
    loc: `/foods/${f.slug}`,
    changefreq: "yearly",
  }));

  const categories = Array.from(new Set((foods as { category: string }[]).map((f) => f.category)));
  const categoryUrls = categories.map((c) => ({
    loc: `/categories/${c
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}`,
    changefreq: "monthly",
  }));

  const comparisonUrls = comparisonPairs.map((p) => ({
    loc: `/compare/${p.slug}`,
    changefreq: "monthly",
  }));

  const tags = ["high-protein", "low-calorie", "low-fat", "high-fiber", "low-carb", "calorie-dense"];
  const tagUrls = tags.map((t) => ({
    loc: `/foods/tag/${t}`,
    changefreq: "monthly",
  }));

  const guideUrls = [
    "/guides",
    "/guides/how-to-calculate-tdee",
    "/guides/calorie-deficit-explained",
    "/guides/understanding-macros",
    "/guides/bmi-vs-body-fat",
    "/guides/how-many-calories-in-a-pound-of-fat",
    "/guides/protein-intake-for-muscle-gain",
    "/guides/reading-nutrition-labels-101",
    "/guides/macros-for-weight-loss-explained",
    "/guides/healthy-snacks-for-calorie-deficit",
    "/guides/how-to-increase-neat",
    "/guides/ideal-body-weight-formulas-explained",
  ].map((url) => ({
    loc: url,
    changefreq: "monthly",
  }));

  const staticUrls = [
    { loc: "/", changefreq: "weekly" },
    { loc: "/foods", changefreq: "weekly" },
    { loc: "/compare", changefreq: "weekly" },
    { loc: "/calculators", changefreq: "monthly" },
    { loc: "/calculators/bmi", changefreq: "monthly" },
    { loc: "/calculators/tdee", changefreq: "monthly" },
    { loc: "/calculators/calorie-calculator", changefreq: "monthly" },
    { loc: "/calculators/macro-calculator", changefreq: "monthly" },
    { loc: "/calculators/body-fat-calculator", changefreq: "monthly" },
    { loc: "/calculators/ideal-weight-calculator", changefreq: "monthly" },
    { loc: "/about", changefreq: "yearly" },
    { loc: "/contact", changefreq: "yearly" },
    { loc: "/privacy-policy", changefreq: "yearly" },
    { loc: "/terms", changefreq: "yearly" },
  ];

  return [...staticUrls, ...categoryUrls, ...tagUrls, ...guideUrls, ...comparisonUrls, ...foodUrls];
});
